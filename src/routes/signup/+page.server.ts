import { fail, redirect } from '@sveltejs/kit';
import { callbackUrl, safeNext } from '$lib/redirects';
import type { Actions, PageServerLoad } from './$types';

function roundMs(value: number) {
	return Math.round(value * 10) / 10;
}

function emailDomain(email: string) {
	return email.includes('@') ? email.split('@').at(-1)?.toLowerCase() : undefined;
}

function originOf(value: string) {
	try {
		return new URL(value).origin;
	} catch {
		return value.startsWith('/') ? 'same-origin' : undefined;
	}
}

function requestTrace(request: Request) {
	return {
		vercelId: request.headers.get('x-vercel-id'),
		forwardedHost: request.headers.get('x-forwarded-host'),
		forwardedProto: request.headers.get('x-forwarded-proto'),
		host: request.headers.get('host'),
		userAgent: request.headers.get('user-agent')
	};
}

function safeErrorDetails(error: unknown) {
	if (!error || typeof error !== 'object') return {};

	const details: Record<string, unknown> = {};

	for (const [key, value] of Object.entries(error)) {
		if (['string', 'number', 'boolean'].includes(typeof value) || value === null) {
			details[key] = value;
		}
	}

	return details;
}

function logSignup(payload: Record<string, unknown>, level: 'info' | 'error' = 'info') {
	const message = `[AUTH_SIGNUP] ${JSON.stringify({
		tag: 'AUTH_SIGNUP',
		...payload
	})}`;

	if (level === 'error') {
		console.error(message);
		return;
	}

	console.info(message);
}

export const load: PageServerLoad = async ({ locals, url }) => {
	const next = safeNext(url.searchParams.get('next'));

	if (locals.session) {
		throw redirect(303, next);
	}

	return { next };
};

export const actions: Actions = {
	default: async ({ request, locals, url }) => {
		const startedAt = performance.now();
		const traceId = crypto.randomUUID();
		const formData = await request.formData();
		const fullName = String(formData.get('fullName') ?? '');
		const email = String(formData.get('email') ?? '');
		const password = String(formData.get('password') ?? '');
		const confirmPassword = String(formData.get('confirmPassword') ?? '');
		const next = safeNext(String(formData.get('next') ?? url.searchParams.get('next') ?? ''));
		const emailRedirectTo = callbackUrl(url.origin);
		const logBase = {
			traceId,
			type: 'email_signup',
			appMethod: request.method,
			appPath: url.pathname,
			search: url.search,
			origin: url.origin,
			nextOrigin: originOf(next),
			emailRedirectTo,
			formFields: Array.from(formData.keys()).sort(),
			hasFullName: Boolean(fullName.trim()),
			hasEmail: Boolean(email.trim()),
			hasPassword: Boolean(password),
			hasConfirmPassword: Boolean(confirmPassword),
			emailDomain: emailDomain(email),
			request: requestTrace(request)
		};

		if (password !== confirmPassword) {
			logSignup({
				...logBase,
				result: 'validation_error',
				reason: 'password_mismatch',
				durationMs: roundMs(performance.now() - startedAt)
			});
			return fail(400, { message: 'Passwords do not match', fullName, email, next });
		}

		if (password.length < 8) {
			logSignup({
				...logBase,
				result: 'validation_error',
				reason: 'password_too_short',
				durationMs: roundMs(performance.now() - startedAt)
			});
			return fail(400, { message: 'Password must be at least 8 characters long', fullName, email, next });
		}

		const { data, error } = await locals.supabase.auth.signUp({
			email,
			password,
			options: {
				data: { name: fullName },
				emailRedirectTo
			}
		});

		if (error) {
			logSignup({
				...logBase,
				result: 'supabase_error',
				durationMs: roundMs(performance.now() - startedAt),
				errorName: error.name,
				errorCode: error.code,
				errorStatus: error.status,
				errorMessage: error.message,
				errorDetails: safeErrorDetails(error)
			}, 'error');
			return fail(400, { message: error.message, fullName, email, next });
		}

		logSignup({
			...logBase,
			result: 'success',
			durationMs: roundMs(performance.now() - startedAt),
			hadUser: Boolean(data.user),
			hadSession: Boolean(data.session),
			requiresEmailConfirmation: Boolean(data.user && !data.session)
		});

		return { success: true, email, next };
	}
};

import { fail, redirect } from '@sveltejs/kit';
import { callbackUrl, safeNext } from '$lib/redirects';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, url }) => {
	const next = safeNext(url.searchParams.get('next'));

	if (locals.session) {
		throw redirect(303, next);
	}

	return { next };
};

export const actions: Actions = {
	email: async ({ request, locals, url }) => {
		const formData = await request.formData();
		const email = String(formData.get('email') ?? '');
		const password = String(formData.get('password') ?? '');
		const next = safeNext(String(formData.get('next') ?? url.searchParams.get('next') ?? ''));

		const { error } = await locals.supabase.auth.signInWithPassword({ email, password });

		if (error) {
			return fail(401, { message: error.message, email, next });
		}

		throw redirect(303, next);
	},
	google: async ({ request, locals, url, cookies }) => {
		const formData = await request.formData();
		const next = safeNext(String(formData.get('next') ?? url.searchParams.get('next') ?? ''));
		const secure = url.protocol === 'https:';

		cookies.set('linkio-auth-next', next, {
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
			secure,
			maxAge: 60 * 10
		});

		const { data, error } = await locals.supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				redirectTo: callbackUrl(url.origin)
			}
		});

		if (error || !data.url) {
			return fail(400, { message: error?.message ?? 'Could not start Google sign in', next });
		}

		throw redirect(303, data.url);
	}
};

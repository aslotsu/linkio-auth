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
	default: async ({ request, locals, url }) => {
		const formData = await request.formData();
		const fullName = String(formData.get('fullName') ?? '');
		const email = String(formData.get('email') ?? '');
		const password = String(formData.get('password') ?? '');
		const confirmPassword = String(formData.get('confirmPassword') ?? '');
		const next = safeNext(String(formData.get('next') ?? url.searchParams.get('next') ?? ''));

		if (password !== confirmPassword) {
			return fail(400, { message: 'Passwords do not match', fullName, email, next });
		}

		if (password.length < 8) {
			return fail(400, { message: 'Password must be at least 8 characters long', fullName, email, next });
		}

		const { error } = await locals.supabase.auth.signUp({
			email,
			password,
			options: {
				data: { name: fullName },
				emailRedirectTo: callbackUrl(url.origin)
			}
		});

		if (error) {
			return fail(400, { message: error.message, fullName, email, next });
		}

		return { success: true, email, next };
	}
};

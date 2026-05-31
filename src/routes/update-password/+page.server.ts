import { fail, redirect } from '@sveltejs/kit';
import { safeNext } from '$lib/redirects';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = ({ locals, url }) => {
	const next = safeNext(url.searchParams.get('next'));

	if (!locals.session) {
		throw redirect(303, `/login?next=${encodeURIComponent(url.pathname + url.search)}`);
	}

	return { next };
};

export const actions: Actions = {
	default: async ({ request, locals, url }) => {
		const formData = await request.formData();
		const password = String(formData.get('password') ?? '');
		const confirmPassword = String(formData.get('confirmPassword') ?? '');
		const next = safeNext(String(formData.get('next') ?? url.searchParams.get('next') ?? ''));

		if (password !== confirmPassword) {
			return fail(400, { message: 'Passwords do not match', next });
		}

		if (password.length < 8) {
			return fail(400, { message: 'Password must be at least 8 characters long', next });
		}

		const { error } = await locals.supabase.auth.updateUser({ password });

		if (error) {
			return fail(400, { message: error.message, next });
		}

		throw redirect(303, next);
	}
};

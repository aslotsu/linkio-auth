import { fail } from '@sveltejs/kit';
import { callbackUrl, safeNext } from '$lib/redirects';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = ({ url }) => {
	return { next: safeNext(url.searchParams.get('next')) };
};

export const actions: Actions = {
	default: async ({ request, locals, url }) => {
		const formData = await request.formData();
		const email = String(formData.get('email') ?? '');
		const next = safeNext(String(formData.get('next') ?? url.searchParams.get('next') ?? ''));
		const updateUrl = new URL('/update-password', url.origin);
		updateUrl.searchParams.set('next', next);

		const { error } = await locals.supabase.auth.resetPasswordForEmail(email, {
			redirectTo: updateUrl.toString()
		});

		if (error) {
			return fail(400, { message: error.message, email, next });
		}

		return { success: true, email, next };
	}
};

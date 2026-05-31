import { redirect } from '@sveltejs/kit';
import type { EmailOtpType } from '@supabase/supabase-js';
import { safeNext } from '$lib/redirects';

export const GET = async ({ url, locals }) => {
	const tokenHash = url.searchParams.get('token_hash');
	const type = url.searchParams.get('type') as EmailOtpType | null;
	const next = safeNext(url.searchParams.get('next'));

	if (tokenHash && type) {
		const { error } = await locals.supabase.auth.verifyOtp({ token_hash: tokenHash, type });

		if (!error) {
			throw redirect(303, next);
		}

		console.error('Supabase email confirmation failed', {
			type,
			next,
			error: error.message
		});
	}

	throw redirect(303, `/login?next=${encodeURIComponent(next)}&error=confirm`);
};

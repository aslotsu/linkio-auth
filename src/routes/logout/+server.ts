import { redirect } from '@sveltejs/kit';
import { safeNext } from '$lib/redirects';

export const GET = async ({ url, locals }) => {
	const next = safeNext(url.searchParams.get('next'), '/login');
	await locals.supabase.auth.signOut();
	throw redirect(303, next);
};

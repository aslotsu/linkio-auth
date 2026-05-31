import { redirect } from '@sveltejs/kit';
import { safeNext } from '$lib/redirects';

export const GET = async ({ url, locals, cookies }) => {
	const code = url.searchParams.get('code');
	const next = safeNext(url.searchParams.get('next') ?? cookies.get('linkio-auth-next'));

	if (code) {
		const { error } = await locals.supabase.auth.exchangeCodeForSession(code);

		if (!error) {
			cookies.delete('linkio-auth-next', { path: '/' });
			throw redirect(303, next);
		}

		console.error('Supabase OAuth callback exchange failed', {
			origin: url.origin,
			pathname: url.pathname,
			next,
			error: error.message
		});
	} else {
		console.error('Supabase OAuth callback missing code', {
			origin: url.origin,
			pathname: url.pathname,
			params: Object.fromEntries(url.searchParams)
		});
	}

	throw redirect(303, `/login?next=${encodeURIComponent(next)}&error=callback`);
};

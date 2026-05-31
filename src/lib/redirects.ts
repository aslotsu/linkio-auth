import { env } from '$env/dynamic/public';

const localAppOrigins = new Set(['http://localhost:5173', 'http://127.0.0.1:5173']);

export function appUrl() {
	return env.PUBLIC_APP_URL || 'https://app.linkio.ca';
}

export function authUrl(origin: string) {
	return env.PUBLIC_AUTH_URL || origin;
}

export function defaultNext() {
	return `${appUrl().replace(/\/$/, '')}/`;
}

export function safeNext(value: string | null | undefined, fallback = defaultNext()) {
	if (!value) return fallback;

	if (value.startsWith('/') && !value.startsWith('//')) return value;

	try {
		const url = new URL(value);
		const configuredApp = new URL(appUrl());
		const isConfiguredApp = url.origin === configuredApp.origin;
		const isLocalApp = localAppOrigins.has(url.origin);
		const isLinkioSubdomain = url.protocol === 'https:' && url.hostname.endsWith('.linkio.ca');

		if (isConfiguredApp || isLocalApp || isLinkioSubdomain) {
			return url.toString();
		}
	} catch {
		return fallback;
	}

	return fallback;
}

export function callbackUrl(origin: string) {
	const url = new URL('/auth/callback', authUrl(origin));
	return url.toString();
}

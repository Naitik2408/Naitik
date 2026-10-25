/// <reference types="vite/client" />

type HorizonsBannerAttrs = {
	src: string;
	'template-redirect-url': string;
	'template-main-text'?: string;
	'template-cta-text'?: string;
	'template-theme'?: string;
};

declare module 'virtual:horizons-banner' {
	export const bannerAttrs: HorizonsBannerAttrs | null;
	export const isDev: boolean;
}

declare module 'virtual:horizons-runtime';
declare module 'virtual:horizons-edit-mode';
declare module 'virtual:horizons-iframe-route-restoration';
declare module 'virtual:horizons-pocketbase-auth';
declare module 'virtual:session-journal-client';

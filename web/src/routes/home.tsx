import type { Route } from './+types/home';
import { seo } from '@/lib/seo';
import HomePage from '@/components/HomePage';

const AVATAR_URL = 'https://images.hostinger.com/55b39dfa-e1a3-42e3-8918-6ca5f790ad20.png';

export function meta({ matches, location }: Route.MetaArgs) {
	return seo({ matches, location }, {
		title: 'Alice Mercer — UX Designer Portfolio',
		description:
			'Alice Mercer is a UX designer crafting digital products that feel effortless — interaction design, UX research, and design systems.',
		image: AVATAR_URL,
	});
}

export default function Home() {
	return <HomePage />;
}

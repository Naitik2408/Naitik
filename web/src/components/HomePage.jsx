import { useMemo, useState } from 'react';
import {
	ArrowUpRight,
	ArrowDown,
	Play,
	Pause,
	Dribbble,
	Instagram,
	Linkedin,
	Twitter,
	Mail,
	ArrowUp,
} from 'lucide-react';
import Reveal from '@/components/Reveal';
import CountUp from '@/components/CountUp';

const AVATAR_URL = 'https://images.hostinger.com/55b39dfa-e1a3-42e3-8918-6ca5f790ad20.png';
const PROJECT_LAUNCHFAST = '/launchfast-mockup.png';
const PROJECT_WAYPOINT = 'https://images.hostinger.com/b55da466-c086-49ad-b47d-0c7c1d0429e8.png';
const PROJECT_PULSEBOARD = 'https://images.hostinger.com/c290ea5c-f229-4e6c-9679-375959e37ea1.png';
const PROJECT_HAVEN = 'https://images.hostinger.com/b5de57f6-bb27-4952-b052-c858b4b2ddc8.png';

const EXPERTISE = [
	'Full Stack Development',
	'React.js & Next.js',
	'Node.js & Express',
	'REST APIs & WebSockets',
	'MongoDB & PostgreSQL',
	'System Architecture',
	'Database Modeling',
	'Performance Tuning',
	'Tailwind CSS & UI',
	'Docker & CI/CD Pipelines',
];

const PROJECTS = [
	{
		id: '01',
		title: 'Launchfast',
		category: 'Next.js SaaS Boilerplate',
		tags: 'Full Stack & Product',
		year: '2026',
		image: PROJECT_LAUNCHFAST,
	},
];

const SOCIALS = [
	{ label: 'Dribbble', icon: Dribbble },
	{ label: 'Instagram', icon: Instagram },
	{ label: 'LinkedIn', icon: Linkedin },
	{ label: 'Twitter', icon: Twitter },
];

function Pill({ children, className = '', ...props }) {
	return (
		<span
			className={`inline-flex items-center rounded-full border border-border bg-card px-5 py-2.5 text-xs font-medium uppercase tracking-[0.12em] text-foreground ${className}`}
			{...props}
		>
			{children}
		</span>
	);
}

function CardHeader({ children }) {
	return (
		<div className="border-b border-border px-6 py-4 text-sm font-medium text-muted-foreground">
			{children}
		</div>
	);
}

function PodcastCard() {
	const [playing, setPlaying] = useState(false);
	const bars = useMemo(
		() =>
			Array.from({ length: 34 }, (_, i) => ({
				height: 18 + Math.abs(Math.sin(i * 0.85)) * 62 + (i % 4) * 6,
				delay: (i % 9) * 0.09,
				duration: 0.7 + (i % 5) * 0.12,
			})),
		[]
	);

	return (
		<div className="relative flex h-full min-h-[220px] flex-col justify-between overflow-hidden rounded-3xl bg-[#ff5a36] p-5 text-white">
			<button
				type="button"
				onClick={() => setPlaying((p) => !p)}
				aria-label={playing ? 'Pause interview preview' : 'Play interview preview'}
				className="absolute right-4 top-4 z-10 flex size-11 items-center justify-center rounded-full bg-white text-[#ff5a36] transition-transform duration-200 hover:scale-105 active:scale-95"
			>
				{playing ? <Pause className="size-4" /> : <Play className="size-4 translate-x-px" />}
			</button>
			<div className="flex h-24 items-center gap-[3px] pt-8" aria-hidden="true">
				{bars.map((bar, i) => (
					<span
						key={i}
						className="eq-bar w-[3px] shrink-0 rounded-full bg-white/90"
						style={{
							height: `${bar.height}%`,
							animation: `eq ${bar.duration}s ease-in-out ${bar.delay}s infinite alternate`,
							animationPlayState: playing ? 'running' : 'paused',
							transform: 'scaleY(0.3)',
						}}
					/>
				))}
			</div>
			<div>
				<p className="text-base font-semibold leading-tight">Engineering for Scale</p>
				<p className="mt-1 text-sm text-white/80">Listen to my tech talk</p>
			</div>
		</div>
	);
}

function CvCard() {
	return (
		<div className="flex h-full min-h-[220px] flex-col justify-between rounded-3xl border border-border bg-card p-5">
			<span className="text-[4.5rem] font-medium leading-none tracking-[-0.04em] text-foreground">
				CV
			</span>
			<a
				href="/cv.html"
				target="_blank"
				rel="noreferrer"
				className="group inline-flex items-center justify-between gap-3 rounded-full border border-border bg-background px-5 py-3 text-sm font-medium text-foreground transition-colors duration-200 hover:bg-foreground hover:text-background"
			>
				Download
				<ArrowDown className="size-4 transition-transform duration-200 group-hover:translate-y-0.5" />
			</a>
		</div>
	);
}

function ProjectImage({ src, alt, label, className = '' }) {
	return (
		<div className={`group relative overflow-hidden rounded-3xl border border-border ${className}`}>
			<img
				src={src}
				alt={alt}
				loading="lazy"
				className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
			/>
			<span className="absolute bottom-4 left-4 inline-flex items-center rounded-full bg-white/85 px-4 py-2 text-xs font-medium text-foreground backdrop-blur-sm">
				{label}
			</span>
		</div>
	);
}

export default function HomePage() {
	const year = new Date().getFullYear();

	return (
		<div className="min-h-screen bg-background text-foreground">
			{/* Header */}
			<header className="sticky top-0 z-50 border-b border-border/60 bg-background/75 backdrop-blur-md">
				<div className="mx-auto flex max-w-[1440px] items-center justify-between gap-3 px-4 py-4 md:px-6">
					<Pill className="shrink-0">
						Naitik Kumar
						<span className="ml-2 hidden text-muted-foreground sm:inline">/ Full-Stack Developer</span>
					</Pill>
					<nav className="flex items-center gap-2 md:gap-3" aria-label="Primary">
						{[
							{ label: 'Work', href: '#work' },
							{ label: 'About', href: '#about' },
							{ label: 'Contact', href: '#contact' },
						].map((item) => (
							<a
								key={item.label}
								href={item.href}
								className="inline-flex items-center rounded-full border border-border bg-card px-4 py-2.5 text-xs font-medium uppercase tracking-[0.12em] text-foreground transition-colors duration-200 hover:bg-foreground hover:text-background md:px-5"
							>
								{item.label}
							</a>
						))}
					</nav>
				</div>
			</header>

			<main className="mx-auto max-w-[1440px] px-4 pb-6 pt-4 md:px-6 md:pt-6">
				{/* Bento grid */}
				<section className="grid gap-4 lg:grid-cols-3" aria-label="Introduction">
					{/* Column A — hero + expertise */}
					<div className="flex flex-col gap-4">
						<Reveal>
							<div className="overflow-hidden rounded-3xl border border-border bg-card">
								<div className="hero-gradient relative h-60 md:h-72">
									<div className="dot-grid absolute inset-0" aria-hidden="true" />
									<img
										src={AVATAR_URL}
										alt="Portrait of Naitik Kumar"
										className="absolute -bottom-10 left-6 size-20 rounded-full border-4 border-card object-cover md:size-24"
									/>
								</div>
								<div className="px-6 pb-8 pt-14 md:pt-16">
									<h1 className="max-w-[14ch] text-4xl font-medium leading-[1.04] tracking-[-0.03em] md:text-[2.9rem]">
										Building Scalable Web Products That Perform Fast
									</h1>
								</div>
							</div>
						</Reveal>

						<Reveal delay={0.1}>
							<div className="rounded-3xl border border-border bg-card" id="expertise">
								<CardHeader>Expertise</CardHeader>
								<div className="flex flex-wrap gap-2.5 p-6">
									{EXPERTISE.map((skill) => (
										<span
											key={skill}
											className="cursor-default rounded-full border border-border px-4 py-2 text-sm text-foreground transition-colors duration-200 hover:bg-foreground hover:text-background"
										>
											{skill}
										</span>
									))}
								</div>
							</div>
						</Reveal>
					</div>

					{/* Column B — about + project image */}
					<div className="flex flex-col gap-4">
						<Reveal delay={0.05}>
							<div className="rounded-3xl border border-border bg-card" id="about">
								<CardHeader>About</CardHeader>
								<div className="p-6">
									<p className="text-[1.05rem] leading-relaxed text-foreground/90">
										Hi, I'm Naitik. I'm a full-stack engineer building scalable web
										applications with React, Node.js, and modern cloud databases. My
										focus is turning complex business needs into clean, dependable
										solutions that don't just solve problems — they run efficiently. My
										goal is to craft thoughtful, optimized architectures, so high-traffic
										digital tools feel fast and effortless.
									</p>
									<a
										href="#work"
										className="group mt-8 flex items-center justify-between rounded-xl bg-foreground px-5 py-4 text-sm font-medium text-background transition-colors duration-200 hover:bg-foreground/85"
									>
										View My Work
										<ArrowUpRight className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
									</a>
								</div>
							</div>
						</Reveal>

						<Reveal delay={0.15} className="flex-1">
							<ProjectImage
								src={PROJECT_LAUNCHFAST}
								alt="Launchfast Next.js SaaS boilerplate website"
								label="Launchfast — SaaS Boilerplate"
								className="h-full min-h-[300px]"
							/>
						</Reveal>
					</div>

					{/* Column C — podcast + CV + map project */}
					<div className="flex flex-col gap-4">
						<div className="grid grid-cols-2 gap-4">
							<Reveal delay={0.1}>
								<PodcastCard />
							</Reveal>
							<Reveal delay={0.15}>
								<CvCard />
							</Reveal>
						</div>
						<Reveal delay={0.2} className="flex-1">
							<ProjectImage
								src={PROJECT_WAYPOINT}
								alt="Waypoint navigation app interface with route map"
								label="Waypoint — Mobility App"
								className="h-full min-h-[420px]"
							/>
						</Reveal>
					</div>
				</section>

				{/* Selected work */}
				<section className="mt-20 md:mt-28" id="work" aria-label="Selected work">
					<Reveal>
						<div className="mb-8 flex items-end justify-between">
							<h2 className="text-3xl font-medium tracking-[-0.02em] md:text-5xl">
								Selected Work
								<span className="ml-3 align-top text-sm tabular-nums text-muted-foreground">(01)</span>
							</h2>
							<span className="hidden text-sm text-muted-foreground md:block">
								2023 — 2025
							</span>
						</div>
					</Reveal>
					<div className="border-t border-border">
						{PROJECTS.map((project, index) => (
							<Reveal key={project.id} delay={index * 0.06}>
								<a
									href="#top"
									onClick={(event) => {
										event.preventDefault();
										window.scrollTo({ top: 0, behavior: 'smooth' });
									}}
									className="group flex items-center gap-5 border-b border-border px-2 py-5 transition-colors duration-200 hover:bg-card md:gap-8 md:px-4 md:py-7"
								>
									<span className="w-8 shrink-0 text-sm tabular-nums text-muted-foreground">
										{project.id}
									</span>
									<span className="hidden h-16 w-24 shrink-0 overflow-hidden rounded-xl border border-border md:block">
										<img
											src={project.image}
											alt=""
											loading="lazy"
											className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
										/>
									</span>
									<span className="min-w-0 flex-1">
										<span className="block truncate text-xl font-medium tracking-[-0.02em] md:text-3xl">
											{project.title}
										</span>
										<span className="mt-1 block text-sm text-muted-foreground md:hidden">
											{project.category} · {project.year}
										</span>
									</span>
									<span className="hidden shrink-0 text-right md:block">
										<span className="block text-sm text-foreground/80">
											{project.category}
										</span>
										<span className="mt-0.5 block text-sm tabular-nums text-muted-foreground">
											{project.year}
										</span>
									</span>
									<span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-border transition-colors duration-200 group-hover:border-foreground group-hover:bg-foreground group-hover:text-background">
										<ArrowUpRight className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
									</span>
								</a>
							</Reveal>
						))}
					</div>
				</section>

				{/* Stats */}
				<section className="mt-20 md:mt-28" aria-label="Experience in numbers">
					<Reveal>
						<div className="grid overflow-hidden rounded-3xl border border-border bg-card sm:grid-cols-3 sm:divide-x sm:divide-border">
							{[
								{ value: 2, suffix: '+', label: 'Years of experience' },
								{ value: 15, suffix: '+', label: 'Products shipped' },
								{ value: 6, suffix: '', label: 'Successful contributions' },
							].map((stat) => (
								<div key={stat.label} className="border-b border-border p-8 last:border-b-0 sm:border-b-0 md:p-10">
									<div className="text-5xl font-medium tracking-[-0.03em] tabular-nums md:text-6xl">
										<CountUp value={stat.value} suffix={stat.suffix} />
									</div>
									<p className="mt-3 text-sm text-muted-foreground">{stat.label}</p>
								</div>
							))}
						</div>
					</Reveal>
				</section>

				{/* Contact / footer */}
				<footer className="mt-20 md:mt-28" id="contact">
					<Reveal>
						<div className="overflow-hidden rounded-3xl bg-[#141414] text-white">
							<div className="p-8 md:p-14">
								<p className="text-xs font-medium uppercase tracking-[0.16em] text-white/50">
									Contact
								</p>
								<h2 className="mt-6 max-w-[16ch] text-4xl font-medium leading-[1.05] tracking-[-0.03em] md:text-6xl">
									Let's make something people love to use.
								</h2>
								<div className="mt-10 flex flex-wrap items-center gap-4">
									<a
										href="mailto:naitikkumar2408@gmail.com"
										className="inline-flex items-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-[#141414] transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]"
									>
										<Mail className="size-4" />
										naitikkumar2408@gmail.com
									</a>
									<div className="flex items-center gap-2.5">
										{SOCIALS.map((social) => (
											<a
												key={social.label}
												href="#contact"
												aria-label={social.label}
												className="flex size-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors duration-200 hover:bg-white hover:text-[#141414]"
											>
												<social.icon className="size-4" />
											</a>
										))}
									</div>
								</div>
							</div>
							<div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-8 py-5 text-xs text-white/50 md:px-14">
								<span>© {year} Naitik Kumar. All rights reserved.</span>
								<span>India</span>
								<a
									href="#"
									className="inline-flex items-center gap-1.5 transition-colors duration-200 hover:text-white"
								>
									Back to top
									<ArrowUp className="size-3.5" />
								</a>
							</div>
						</div>
					</Reveal>
				</footer>
			</main>
		</div>
	);
}

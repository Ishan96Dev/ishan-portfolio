'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Github, Star, GitFork, Code2, BookOpen, Activity, Flame } from 'lucide-react';

const GITHUB_USERNAME = 'Ishan96Dev';

// Language colour map (most common)
const LANG_COLORS = {
    Python:     '#3572A5',
    JavaScript: '#F1E05A',
    TypeScript: '#3178C6',
    HTML:       '#E34C26',
    CSS:        '#563D7C',
    Shell:      '#89E051',
    Dockerfile: '#384D54',
};

function StatBadge({ label, value, icon: Icon, color }) {
    return (
        <motion.div
            /* WCAG 2.3.3 — lift animation only when motion is allowed; no dependency on shouldReduceMotion
               here because StatBadge is a simple presentational component — parent handles gating */
            whileHover={{ y: -4, scale: 1.03, transition: { duration: 0.18 } }}
            className={`flex flex-col items-center justify-center h-full min-h-[128px] p-5 rounded-2xl bg-neutral-900/70 border ${color} gap-1 cursor-default`}
        >
            <Icon size={22} className="text-neutral-400 mb-1" aria-hidden="true" />
            <p className="text-2xl font-bold text-neutral-100">{value}</p>
            <p className="text-xs text-neutral-500 text-center">{label}</p>
        </motion.div>
    );
}

function RepoCard({ repo }) {
    return (
        <motion.a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${repo.name} — ${repo.description || 'No description'} (opens in new tab)`}
            /* WCAG 2.3.3 — lift only when framer-motion runs (respects prefers-reduced-motion
               via the shouldReduceMotion check in the parent; individual card uses whileHover
               which Framer automatically suppresses when reduced motion is set globally) */
            whileHover={{ y: -5, transition: { duration: 0.18 } }}
            className="flex flex-col h-full min-h-[148px] p-5 rounded-xl bg-neutral-900/60 border border-neutral-800 hover:border-primary/40 hover:shadow-[0_4px_20px_rgba(59,130,246,0.08)] transition-all duration-200 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 focus-visible:ring-offset-neutral-950"
        >
            <div className="flex items-start justify-between gap-2 mb-2">
                <span className="font-medium text-neutral-200 text-sm group-hover:text-primary transition-colors truncate">
                    {repo.name}
                </span>
                <BookOpen size={14} className="text-neutral-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
            </div>
            {repo.description && (
                <p className="text-xs text-neutral-500 leading-relaxed mb-3 line-clamp-2 min-h-[2.5rem]">{repo.description}</p>
            )}
            {!repo.description && <div className="mb-3 min-h-[2.5rem]" aria-hidden="true" />}
            <div className="flex items-center gap-4 mt-auto text-xs text-neutral-500">
                {repo.language && (
                    <span className="flex items-center gap-1.5">
                        <span
                            className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                            style={{ backgroundColor: LANG_COLORS[repo.language] ?? '#8b8b8b' }}
                            aria-hidden="true"
                        />
                        {repo.language}
                    </span>
                )}
                {repo.stargazers_count > 0 && (
                    <span className="flex items-center gap-1">
                        <Star size={11} aria-hidden="true" />
                        {repo.stargazers_count}
                    </span>
                )}
                {repo.forks_count > 0 && (
                    <span className="flex items-center gap-1">
                        <GitFork size={11} aria-hidden="true" />
                        {repo.forks_count}
                    </span>
                )}
            </div>
        </motion.a>
    );
}

const LEVEL_COLORS = ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'];

function computeStreaks(days) {
    let longest = 0;
    let run = 0;
    for (const d of days) {
        run = d.count > 0 ? run + 1 : 0;
        longest = Math.max(longest, run);
    }
    // Current streak: walk back from today; a zero today doesn't break yesterday's streak
    let current = 0;
    let i = days.length - 1;
    if (i >= 0 && days[i].count === 0) i -= 1;
    for (; i >= 0 && days[i].count > 0; i -= 1) current += 1;
    return { current, longest };
}

function ContributionGraph({ days, total }) {
    return (
        <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <h3 className="text-base font-semibold text-neutral-300">Contribution Graph</h3>
                <span className="text-xs text-neutral-500">{total} contributions in the last year</span>
            </div>
            <div className="overflow-x-auto pb-2">
                <div
                    className="grid grid-flow-col grid-rows-7 gap-[3px] w-max mx-auto"
                    role="img"
                    aria-label={`GitHub contribution graph: ${total} contributions in the last year`}
                >
                    {days.map((d) => (
                        <div
                            key={d.date}
                            title={`${d.count} contributions on ${d.date}`}
                            className="w-[11px] h-[11px] rounded-[2px]"
                            style={{ backgroundColor: LEVEL_COLORS[d.level] ?? LEVEL_COLORS[0] }}
                        />
                    ))}
                </div>
            </div>
            <div className="flex items-center justify-end gap-1.5 mt-3 text-[11px] text-neutral-500" aria-hidden="true">
                Less
                {LEVEL_COLORS.map((c) => (
                    <span key={c} className="w-[11px] h-[11px] rounded-[2px]" style={{ backgroundColor: c }} />
                ))}
                More
            </div>
        </div>
    );
}

function LanguageBreakdown({ langStats }) {
    const sum = langStats.reduce((s, l) => s + l.count, 0) || 1;
    return (
        <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 h-full">
            <h3 className="text-base font-semibold text-neutral-300 mb-4">Language Breakdown</h3>
            <div
                className="flex h-3 w-full rounded-full overflow-hidden mb-5 bg-neutral-800"
                role="img"
                aria-label={`Language breakdown: ${langStats.map((l) => `${l.lang} ${Math.round((l.count / sum) * 100)}%`).join(', ')}`}
            >
                {langStats.map(({ lang, count }) => (
                    <div
                        key={lang}
                        style={{ width: `${(count / sum) * 100}%`, backgroundColor: LANG_COLORS[lang] ?? '#8b8b8b' }}
                    />
                ))}
            </div>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-neutral-300">
                {langStats.map(({ lang, count }) => (
                    <li key={lang} className="flex items-center gap-2">
                        <span
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ backgroundColor: LANG_COLORS[lang] ?? '#8b8b8b' }}
                            aria-hidden="true"
                        />
                        {lang}
                        <span className="text-neutral-500 text-xs ml-auto">{Math.round((count / sum) * 100)}%</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export function GitHubActivitySection() {
    const shouldReduceMotion = useReducedMotion();
    const [repos, setRepos] = useState([]);
    const [profile, setProfile] = useState(null);
    const [langStats, setLangStats] = useState([]);
    const [allRepos, setAllRepos] = useState([]);
    const [contrib, setContrib] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchGitHub = useCallback(async () => {
        try {
            const [profileRes, reposRes] = await Promise.all([
                fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
                    headers: { Accept: 'application/vnd.github+json' },
                }),
                fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=pushed`, {
                    headers: { Accept: 'application/vnd.github+json' },
                }),
            ]);

            if (!profileRes.ok || !reposRes.ok) {
                throw new Error('GitHub API request failed');
            }

            const profileData = await profileRes.json();
            const reposData = await reposRes.json();

            // Aggregate language usage counts
            const langCounts = {};
            for (const repo of reposData) {
                if (repo.language) {
                    langCounts[repo.language] = (langCounts[repo.language] ?? 0) + 1;
                }
            }
            const sortedLangs = Object.entries(langCounts)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 5)
                .map(([lang, count]) => ({ lang, count }));

            setProfile(profileData);
            // Show 6 most recently pushed repos
            setRepos(reposData.slice(0, 6));
            setLangStats(sortedLangs);
            setAllRepos(reposData);

            // Contribution calendar (non-fatal if unavailable)
            try {
                const cRes = await fetch(
                    `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`
                );
                if (cRes.ok) {
                    const cData = await cRes.json();
                    const days = cData.contributions ?? [];
                    const total = Object.values(cData.total ?? {}).reduce((a, b) => a + b, 0);
                    setContrib({ days, total, ...computeStreaks(days) });
                }
            } catch {
                /* graph simply stays hidden */
            }
        } catch {
            setError('Could not load GitHub data. Please check back later.');
        } finally {
            setLoading(false);
        }
    }, []);

    const totalStars = allRepos.reduce((s, r) => s + r.stargazers_count, 0);
    const totalForks = allRepos.reduce((s, r) => s + r.forks_count, 0);

    useEffect(() => {
        fetchGitHub();
    }, [fetchGitHub]);

    return (
        <section
            id="github"
            aria-labelledby="github-heading"
            className="py-24 px-6 md:px-12 relative bg-neutral-950 overflow-hidden"
        >
            {/* Decorative background */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-40" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-64 bg-primary/5 rounded-full blur-[80px]" />
            </div>

            <div className="max-w-6xl mx-auto relative z-10">

                {/* Header */}
                <motion.div
                    initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
                    whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-14"
                >
                    <h2
                        id="github-heading"
                        className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-400"
                    >
                        GitHub Activity
                    </h2>
                    <p className="text-neutral-400 mt-4 text-sm max-w-xl mx-auto">
                        Live repository data powered by the GitHub API.
                    </p>
                </motion.div>

                {loading && (
                    <div className="text-center py-16" aria-live="polite" aria-label="Loading GitHub data">
                        <div className="inline-flex items-center gap-2 text-neutral-500 text-sm">
                            <span className="w-2 h-2 rounded-full bg-primary motion-safe:animate-ping" aria-hidden="true" />
                            Loading activity…
                        </div>
                    </div>
                )}

                {error && (
                    <div
                        role="alert"
                        className="text-center py-10 text-sm text-neutral-500 bg-neutral-900/50 rounded-2xl border border-neutral-800 max-w-lg mx-auto"
                    >
                        {error}
                    </div>
                )}

                {!loading && !error && profile && (
                    <>
                        {/* Stats grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                            <StatBadge
                                label="Public Repositories"
                                value={profile.public_repos}
                                icon={BookOpen}
                                color="border-neutral-800"
                            />
                            <StatBadge
                                label="Followers"
                                value={profile.followers}
                                icon={Github}
                                color="border-neutral-800"
                            />
                            <StatBadge
                                label="Following"
                                value={profile.following}
                                icon={Github}
                                color="border-neutral-800"
                            />
                            <StatBadge
                                label="Top Languages"
                                value={langStats[0]?.lang ?? '—'}
                                icon={Code2}
                                color="border-neutral-800"
                            />
                        </div>

                        {/* Extended stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                            <StatBadge label="Total Stars" value={totalStars} icon={Star} color="border-neutral-800" />
                            <StatBadge label="Total Forks" value={totalForks} icon={GitFork} color="border-neutral-800" />
                            <StatBadge
                                label="Contributions (1 yr)"
                                value={contrib ? contrib.total : '—'}
                                icon={Activity}
                                color="border-neutral-800"
                            />
                            <StatBadge
                                label={contrib ? `Current Streak · Longest ${contrib.longest}d` : 'Current Streak'}
                                value={contrib ? `${contrib.current}d` : '—'}
                                icon={Flame}
                                color="border-neutral-800"
                            />
                        </div>

                        {/* Graphs */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-12 items-stretch">
                            {contrib && contrib.days.length > 0 && (
                                <div className="lg:col-span-2">
                                    <ContributionGraph days={contrib.days} total={contrib.total} />
                                </div>
                            )}
                            {langStats.length > 0 && (
                                <div className={contrib ? '' : 'lg:col-span-3'}>
                                    <LanguageBreakdown langStats={langStats} />
                                </div>
                            )}
                        </div>

                        {/* Recently updated repos */}
                        <div>
                            <h3 className="text-base font-semibold text-neutral-300 mb-5">
                                Recently Updated Repositories
                            </h3>
                            <div
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                                role="list"
                                aria-label="Recent GitHub repositories"
                            >
                                {repos.map((repo) => (
                                    <div key={repo.id} role="listitem" className="h-full">
                                        <RepoCard repo={repo} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Profile link */}
                        <div className="text-center mt-12">
                            <a
                                href={`https://github.com/${GITHUB_USERNAME}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="View full GitHub profile (opens in new tab)"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-neutral-900 border border-neutral-700 text-neutral-300 font-medium text-sm hover:border-primary/50 hover:text-primary transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
                            >
                                <Github size={16} aria-hidden="true" />
                                View Full GitHub Profile
                            </a>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}

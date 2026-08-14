"use client";

import { useEffect, useState } from "react";

type IconName = "grid" | "pulse" | "people" | "reports" | "settings" | "bell" | "menu" | "close" | "arrow" | "check";

function Icon({ name, className = "h-5 w-5" }: { name: IconName; className?: string }) {
  const paths: Record<IconName, React.ReactNode> = {
    grid: <><rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/></>,
    pulse: <path d="M3 12h4l2.2-5 4.1 10 2.2-5H21"/>,
    people: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></>,
    reports: <><path d="M4 19V9M10 19V5M16 19v-7M22 19V2"/><path d="M2 22h22"/></>,
    settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.83 2.83-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6 1.7 1.7 0 0 0-.4 1.1V21H9.6v-.1A1.7 1.7 0 0 0 8.5 19.4a1.7 1.7 0 0 0-1.88.34l-.06.06-2.83-2.83.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.6-1 1.7 1.7 0 0 0-1.1-.4H3V9.6h.1A1.7 1.7 0 0 0 4.6 8.5a1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.83-2.83.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-.6 1.7 1.7 0 0 0 .4-1.1V3h4v.1A1.7 1.7 0 0 0 15.5 4.6a1.7 1.7 0 0 0 1.88-.34l.06-.06 2.83 2.83-.06.06A1.7 1.7 0 0 0 19.4 9c.12.38.34.72.65 1 .3.25.68.4 1.05.4h.1v4h-.1A1.7 1.7 0 0 0 19.4 15Z"/></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16"/></>,
    close: <><path d="m6 6 12 12M18 6 6 18"/></>,
    arrow: <><path d="M5 12h14M13 6l6 6-6 6"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
  };
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

const navItems: { label: string; icon: IconName }[] = [
  { label: "Overview", icon: "grid" },
  { label: "Live usage", icon: "pulse" },
  { label: "Customers", icon: "people" },
  { label: "Reports", icon: "reports" },
];

const metrics = [
  { label: "Active workspaces", value: "1,284", change: "+12.4%", note: "vs previous period", tone: "text-[var(--good)]" },
  { label: "Tasks completed", value: "38.6k", change: "+8.1%", note: "across all teams", tone: "text-[var(--good)]" },
  { label: "Median response", value: "1m 42s", change: "−18s", note: "faster this week", tone: "text-[var(--good)]" },
  { label: "Needs attention", value: "17", change: "+3", note: "since yesterday", tone: "text-[var(--warn)]" },
];

const rows = [
  { team: "Northstar Studio", plan: "Scale", usage: 86, status: "Healthy", updated: "4 min ago" },
  { team: "Lumen Research", plan: "Pro", usage: 64, status: "Healthy", updated: "18 min ago" },
  { team: "Kiteworks", plan: "Scale", usage: 93, status: "Review", updated: "31 min ago" },
  { team: "Fieldnote Labs", plan: "Pro", usage: 48, status: "Healthy", updated: "1 hr ago" },
];

function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <>
      {open && <button className="fixed inset-0 z-30 bg-slate-950/45 lg:hidden" onClick={onClose} aria-label="Close navigation overlay" />}
      <aside id="primary-navigation" className={`fixed inset-y-0 left-0 z-40 w-[17rem] flex-col border-r border-white/10 bg-[#17192d] px-4 py-5 text-slate-200 lg:flex ${open ? "flex" : "hidden"}`} aria-label="Primary navigation">
        <div className="mb-8 flex items-center justify-between px-2">
          <a href="#main" className="flex items-center gap-3 rounded-lg text-lg font-bold tracking-tight text-white">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#7771f5] shadow-lg shadow-indigo-950/40"><span className="h-3 w-3 rotate-45 rounded-sm bg-white" /></span>
            Orbit Ops
          </a>
          <button className="rounded-lg p-2 text-slate-300 hover:bg-white/10 lg:hidden" onClick={onClose} aria-label="Close navigation"><Icon name="close" /></button>
        </div>
        <nav className="space-y-1">
          {navItems.map((item, index) => <a key={item.label} href={`#${item.label.toLowerCase().replace(" ", "-")}`} onClick={onClose} aria-current={index === 0 ? "page" : undefined} className={`flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold ${index === 0 ? "bg-white/12 text-white" : "text-slate-400 hover:bg-white/7 hover:text-white"}`}><Icon name={item.icon} />{item.label}</a>)}
        </nav>
        <div className="mt-auto rounded-2xl border border-white/10 bg-white/6 p-4">
          <p className="text-xs font-bold uppercase tracking-[.16em] text-indigo-300">Demo workspace</p>
          <p className="mt-2 text-sm leading-6 text-slate-300">Fictional data for responsive interface testing.</p>
          <a className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-white hover:text-indigo-200" href="https://github.com/fablgen-agent/responsive-saas-proof">View source <Icon name="arrow" className="h-4 w-4" /></a>
        </div>
      </aside>
    </>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [period, setPeriod] = useState("30 days");
  useEffect(() => {
    if (!menuOpen) return;
    const close = (event: KeyboardEvent) => event.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [menuOpen]);

  return (
    <div className="min-h-screen">
      <a href="#main" className="fixed left-4 top-3 z-50 -translate-y-20 rounded-lg bg-white px-4 py-2 font-bold shadow-lg focus:translate-y-0">Skip to dashboard</a>
      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
      <div className="lg:pl-[17rem]">
        <header className="sticky top-0 z-20 flex min-h-16 items-center justify-between border-b border-[var(--line)] bg-white/90 px-4 backdrop-blur sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button className="rounded-xl border border-[var(--line)] bg-white p-2 text-slate-700 lg:hidden" onClick={() => setMenuOpen(true)} aria-expanded={menuOpen} aria-controls="primary-navigation" aria-label="Open navigation"><Icon name="menu" /></button>
            <span className="hidden text-sm font-semibold text-[var(--muted)] sm:block">Workspace / <strong className="text-[var(--ink)]">Operations</strong></span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <button className="relative rounded-xl border border-[var(--line)] bg-white p-2.5 text-slate-600 hover:bg-slate-50" aria-label="Notifications"><Icon name="bell"/><span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white" /></button>
            <button className="flex items-center gap-2 rounded-xl p-1.5 text-left hover:bg-slate-100" aria-label="Open account menu"><span className="grid h-9 w-9 place-items-center rounded-xl bg-indigo-100 text-sm font-extrabold text-indigo-700">AO</span><span className="hidden sm:block"><span className="block text-sm font-bold">Alex Ortiz</span><span className="block text-xs text-[var(--muted)]">Operator</span></span></button>
          </div>
        </header>

        <main id="main" className="mx-auto max-w-[96rem] px-4 py-6 sm:px-6 lg:px-8 lg:py-9">
          <section className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between" aria-labelledby="overview-title">
            <div><p className="text-sm font-bold text-[var(--brand)]">Friday, 14 August</p><h1 id="overview-title" className="mt-1 text-3xl font-black tracking-[-.04em] sm:text-4xl">Operations overview</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted)] sm:text-base">A focused view of usage, customer health, and work needing attention.</p></div>
            <div className="inline-flex self-start rounded-xl border border-[var(--line)] bg-white p-1 shadow-sm" aria-label="Reporting period">{["7 days", "30 days", "Quarter"].map(item => <button key={item} onClick={() => setPeriod(item)} aria-pressed={period === item} className={`min-h-9 rounded-lg px-3 text-xs font-bold sm:px-4 sm:text-sm ${period === item ? "bg-[#272940] text-white" : "text-[var(--muted)] hover:bg-slate-100"}`}>{item}</button>)}</div>
          </section>

          <section className="metric-grid mt-7 grid gap-4" aria-label={`Key metrics for ${period}`}>
            {metrics.map(metric => <article key={metric.label} className="min-w-0 rounded-2xl border border-[var(--line)] bg-white p-5 shadow-[0_8px_30px_rgba(30,40,70,.05)]"><div className="flex items-start justify-between gap-3"><p className="text-sm font-semibold text-[var(--muted)]">{metric.label}</p><span className={`rounded-full bg-slate-50 px-2 py-1 text-xs font-extrabold ${metric.tone}`}>{metric.change}</span></div><p className="mt-4 text-3xl font-black tracking-[-.04em]">{metric.value}</p><p className="mt-1 text-xs text-[var(--muted)]">{metric.note}</p></article>)}
          </section>

          <div className="mt-4 grid min-w-0 gap-4 xl:grid-cols-[minmax(0,1.65fr)_minmax(18rem,.8fr)]">
            <section className="min-w-0 rounded-2xl border border-[var(--line)] bg-white shadow-[0_8px_30px_rgba(30,40,70,.05)]" aria-labelledby="accounts-title">
              <div className="flex flex-col gap-3 border-b border-[var(--line)] p-5 sm:flex-row sm:items-center sm:justify-between"><div><h2 id="accounts-title" className="text-lg font-extrabold">Workspace health</h2><p className="mt-1 text-sm text-[var(--muted)]">Usage and recent activity by customer</p></div><button className="self-start rounded-lg border border-[var(--line)] px-3 py-2 text-sm font-bold hover:bg-slate-50">Export report</button></div>
              <div className="overflow-x-auto" tabIndex={0} aria-label="Scrollable workspace health table">
                <table className="w-full min-w-[44rem] border-collapse text-left text-sm">
                  <thead><tr className="text-xs uppercase tracking-[.1em] text-[var(--muted)]"><th className="px-5 py-4 font-bold">Workspace</th><th className="px-4 py-4 font-bold">Plan</th><th className="px-4 py-4 font-bold">Usage</th><th className="px-4 py-4 font-bold">Status</th><th className="px-5 py-4 text-right font-bold">Updated</th></tr></thead>
                  <tbody>{rows.map(row => <tr key={row.team} className="border-t border-[var(--line)]"><th scope="row" className="px-5 py-4 font-bold">{row.team}</th><td className="px-4 py-4 text-[var(--muted)]">{row.plan}</td><td className="px-4 py-4"><div className="flex items-center gap-3"><div className="h-2 w-24 overflow-hidden rounded-full bg-slate-100"><div className={`h-full rounded-full ${row.usage > 90 ? "bg-amber-500" : "bg-indigo-500"}`} style={{width:`${row.usage}%`}} /></div><span className="font-bold">{row.usage}%</span></div></td><td className="px-4 py-4"><span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ${row.status === "Review" ? "bg-amber-50 text-amber-800" : "bg-emerald-50 text-emerald-800"}`}><span className={`h-1.5 w-1.5 rounded-full ${row.status === "Review" ? "bg-amber-500" : "bg-emerald-500"}`} />{row.status}</span></td><td className="px-5 py-4 text-right text-[var(--muted)]">{row.updated}</td></tr>)}</tbody>
                </table>
              </div>
            </section>

            <section className="rounded-2xl border border-[var(--line)] bg-white p-5 shadow-[0_8px_30px_rgba(30,40,70,.05)]" aria-labelledby="attention-title">
              <div className="flex items-center justify-between"><div><h2 id="attention-title" className="text-lg font-extrabold">Attention queue</h2><p className="mt-1 text-sm text-[var(--muted)]">Ordered by impact</p></div><span className="rounded-lg bg-rose-50 px-2.5 py-1 text-xs font-extrabold text-rose-700">3 open</span></div>
              <ul className="mt-5 space-y-3">
                {[{title:"Usage threshold reached",detail:"Kiteworks · 93% of monthly quota",tone:"bg-amber-100 text-amber-800"},{title:"Two exports delayed",detail:"Retry window opens in 12 minutes",tone:"bg-rose-100 text-rose-800"},{title:"Quarterly review ready",detail:"Northstar Studio · awaiting approval",tone:"bg-indigo-100 text-indigo-800"}].map((item,index)=><li key={item.title} className="flex gap-3 rounded-xl border border-[var(--line)] p-3"><span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg text-xs font-black ${item.tone}`}>{index+1}</span><div className="min-w-0"><p className="text-sm font-bold">{item.title}</p><p className="mt-1 text-xs leading-5 text-[var(--muted)]">{item.detail}</p></div></li>)}
              </ul>
              <button className="mt-5 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[var(--brand)] px-4 text-sm font-bold text-white hover:bg-[var(--brand-dark)]">Review all items <Icon name="arrow" className="h-4 w-4" /></button>
            </section>
          </div>

          <section className="mt-4 grid gap-4 md:grid-cols-3" aria-label="Delivery checks">
            {["No horizontal page overflow", "Keyboard-visible navigation", "Reduced-motion preference honored"].map(item => <div key={item} className="flex items-center gap-3 rounded-2xl border border-[var(--line)] bg-white px-4 py-4 text-sm font-bold"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-emerald-50 text-emerald-700"><Icon name="check" className="h-4 w-4" /></span>{item}</div>)}
          </section>
        </main>
      </div>
    </div>
  );
}

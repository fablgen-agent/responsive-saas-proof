"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type IconName = "inventory" | "search" | "dealers" | "chart" | "menu" | "close" | "arrow" | "check" | "map" | "fuel" | "gauge" | "bell" | "car";
type PreviewState = "ready" | "loading" | "error";
type View = "inventory" | "admin";

type Vehicle = {
  id: number;
  year: number;
  make: string;
  model: string;
  body: string;
  fuel: string;
  price: number;
  mileage: string;
  dealer: string;
  location: string;
  status: "Live" | "Review";
  accent: string;
};

const vehicles: Vehicle[] = [
  { id: 1042, year: 2024, make: "Toyota", model: "RAV4 Hybrid", body: "SUV", fuel: "Hybrid", price: 34800, mileage: "8,200 mi", dealer: "Northline Motors", location: "Leeds", status: "Live", accent: "from-emerald-100 to-slate-200" },
  { id: 1038, year: 2023, make: "Honda", model: "Civic Sport", body: "Hatchback", fuel: "Petrol", price: 26450, mileage: "12,900 mi", dealer: "Citygate Auto", location: "Manchester", status: "Live", accent: "from-blue-100 to-slate-200" },
  { id: 1031, year: 2022, make: "Volvo", model: "XC40 Recharge", body: "SUV", fuel: "Electric", price: 31900, mileage: "19,100 mi", dealer: "Northline Motors", location: "Leeds", status: "Live", accent: "from-violet-100 to-slate-200" },
  { id: 1027, year: 2024, make: "Ford", model: "Focus Active", body: "Hatchback", fuel: "Petrol", price: 28750, mileage: "4,600 mi", dealer: "Riverside Cars", location: "York", status: "Review", accent: "from-amber-100 to-slate-200" },
  { id: 1019, year: 2021, make: "Kia", model: "Niro 3", body: "Crossover", fuel: "Hybrid", price: 21950, mileage: "26,400 mi", dealer: "Citygate Auto", location: "Manchester", status: "Live", accent: "from-rose-100 to-slate-200" },
  { id: 1012, year: 2023, make: "Tesla", model: "Model 3", body: "Saloon", fuel: "Electric", price: 29900, mileage: "14,300 mi", dealer: "Riverside Cars", location: "York", status: "Live", accent: "from-cyan-100 to-slate-200" },
];

const navItems: { label: string; icon: IconName; view: View }[] = [
  { label: "Inventory", icon: "inventory", view: "inventory" },
  { label: "Admin dashboard", icon: "chart", view: "admin" },
];

function Icon({ name, className = "h-5 w-5" }: { name: IconName; className?: string }) {
  const paths: Record<IconName, React.ReactNode> = {
    inventory: <><path d="M3 7h18M5 7l1-3h12l1 3v13H5Z"/><path d="M8 11h8M8 15h5"/></>,
    search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
    dealers: <><path d="M4 21v-9l8-5 8 5v9"/><path d="M9 21v-5h6v5M3 21h18"/></>,
    chart: <><path d="M4 20V10M10 20V4M16 20v-7M22 20V7"/><path d="M2 22h22"/></>,
    menu: <path d="M4 7h16M4 12h16M4 17h16"/>,
    close: <path d="m6 6 12 12M18 6 6 18"/>,
    arrow: <><path d="M5 12h14M13 6l6 6-6 6"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
    map: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
    fuel: <><path d="M5 22V4h9v18M3 22h13M7 8h5M14 7h2l3 3v7a2 2 0 0 0 4 0v-6l-2-2"/></>,
    gauge: <><path d="M4 17a8 8 0 1 1 16 0"/><path d="m12 13 4-4M8 18h8"/></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/></>,
    car: <><path d="m5 11 2-5h10l2 5M3 14h18v5H3Z"/><circle cx="7" cy="19" r="2"/><circle cx="17" cy="19" r="2"/><path d="M5 14h14"/></>,
  };
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

function Sidebar({ open, onClose, view, onView }: { open: boolean; onClose: () => void; view: View; onView: (view: View) => void }) {
  return <>
    {open && <button className="fixed inset-0 z-30 bg-slate-950/45 lg:hidden" onClick={onClose} aria-label="Close navigation overlay" />}
    <aside id="primary-navigation" className={`fixed inset-y-0 left-0 z-40 w-[17rem] flex-col border-r border-white/10 bg-[#13231e] px-4 py-5 text-slate-200 lg:flex ${open ? "flex" : "hidden"}`} aria-label="Primary navigation">
      <div className="mb-8 flex items-center justify-between px-2">
        <a href="#main" className="flex items-center gap-3 rounded-lg text-lg font-black tracking-tight text-white"><span className="grid h-9 w-9 place-items-center rounded-xl bg-[#f2b84b] text-[#17251f]"><Icon name="car" /></span>AutoLane</a>
        <button className="rounded-lg p-2 text-slate-300 hover:bg-white/10 lg:hidden" onClick={onClose} aria-label="Close navigation"><Icon name="close" /></button>
      </div>
      <nav className="space-y-1">{navItems.map(item => <button key={item.label} onClick={() => { onView(item.view); onClose(); }} aria-current={view === item.view ? "page" : undefined} className={`flex min-h-11 w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold ${view === item.view ? "bg-white/12 text-white" : "text-slate-400 hover:bg-white/7 hover:text-white"}`}><Icon name={item.icon} />{item.label}</button>)}</nav>
      <div className="mt-auto rounded-2xl border border-white/10 bg-white/6 p-4">
        <p className="text-xs font-black uppercase tracking-[.16em] text-amber-300">Capability proof</p>
        <p className="mt-2 text-sm leading-6 text-slate-300">Original fictional inventory data. No enquiry is transmitted or stored.</p>
        <div className="mt-3 flex flex-col items-start gap-2">
          <a className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-amber-200" href="https://github.com/fablgen-agent/responsive-saas-proof">View source <Icon name="arrow" className="h-4 w-4" /></a>
          <a className="inline-flex items-center gap-2 text-sm font-bold text-amber-200 hover:text-white" href="https://github.com/fablgen-agent/fablgen-agent/issues/new?template=work-request.yml">Request this workflow <Icon name="arrow" className="h-4 w-4" /></a>
        </div>
      </div>
    </aside>
  </>;
}

function VehicleCard({ vehicle, onEnquire }: { vehicle: Vehicle; onEnquire: (vehicle: Vehicle) => void }) {
  return <article className="min-w-0 overflow-hidden rounded-2xl border border-[var(--line)] bg-white shadow-[0_10px_34px_rgba(24,45,37,.06)]">
    <div className={`grid h-36 place-items-center bg-gradient-to-br ${vehicle.accent}`} aria-hidden="true"><Icon name="car" className="h-20 w-20 text-slate-700/70" /></div>
    <div className="p-5">
      <div className="flex items-start justify-between gap-3"><div className="min-w-0"><p className="text-xs font-black uppercase tracking-[.12em] text-[var(--brand)]">Stock #{vehicle.id}</p><h3 className="mt-1 text-xl font-black tracking-[-.03em]">{vehicle.year} {vehicle.make} {vehicle.model}</h3></div><span className="whitespace-nowrap rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-black text-emerald-800">{vehicle.status}</span></div>
      <p className="mt-4 text-2xl font-black">£{vehicle.price.toLocaleString("en-GB")}</p>
      <dl className="mt-4 grid grid-cols-2 gap-2 text-sm text-[var(--muted)]"><div className="flex items-center gap-2"><Icon name="gauge" className="h-4 w-4" /><dt className="sr-only">Mileage</dt><dd>{vehicle.mileage}</dd></div><div className="flex items-center gap-2"><Icon name="fuel" className="h-4 w-4" /><dt className="sr-only">Fuel</dt><dd>{vehicle.fuel}</dd></div></dl>
      <div className="mt-4 border-t border-[var(--line)] pt-4"><p className="font-bold">{vehicle.dealer}</p><p className="mt-1 flex items-center gap-1.5 text-sm text-[var(--muted)]"><Icon name="map" className="h-4 w-4" />{vehicle.location}</p></div>
      <button onClick={() => onEnquire(vehicle)} className="mt-5 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[var(--brand)] px-4 text-sm font-black text-white hover:bg-[var(--brand-dark)]">Enquire about {vehicle.year} {vehicle.make} {vehicle.model}<Icon name="arrow" className="h-4 w-4" /></button>
    </div>
  </article>;
}

function EnquiryDialog({ vehicle, onClose }: { vehicle: Vehicle; onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setSubmitted(true); }
  return <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/60 p-4" role="presentation" onMouseDown={event => event.target === event.currentTarget && onClose()}>
    <section role="dialog" aria-modal="true" aria-labelledby="enquiry-title" className="max-h-[calc(100vh-2rem)] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">
      <div className="flex items-start justify-between gap-4"><div><p className="text-xs font-black uppercase tracking-[.12em] text-[var(--brand)]">Demo enquiry</p><h2 id="enquiry-title" className="mt-1 text-2xl font-black">{vehicle.year} {vehicle.make} {vehicle.model}</h2></div><button onClick={onClose} className="rounded-lg p-2 hover:bg-slate-100" aria-label="Close enquiry"><Icon name="close" /></button></div>
      {submitted ? <div className="mt-6 rounded-xl bg-emerald-50 p-5" role="status"><p className="font-black text-emerald-900">Demo enquiry validated</p><p className="mt-2 text-sm leading-6 text-emerald-900">Nothing was transmitted or stored. A production version would wait for an API response before confirming delivery.</p><button onClick={onClose} className="mt-4 rounded-lg bg-emerald-800 px-4 py-2 text-sm font-bold text-white">Close</button></div> : <form onSubmit={submit} className="mt-6 space-y-4">
        <label className="block text-sm font-bold">Name<input name="name" required autoFocus className="mt-1.5 min-h-11 w-full rounded-lg border border-[var(--line)] px-3 font-normal" /></label>
        <label className="block text-sm font-bold">Email<input name="email" type="email" required className="mt-1.5 min-h-11 w-full rounded-lg border border-[var(--line)] px-3 font-normal" /></label>
        <label className="block text-sm font-bold">Message<textarea name="message" required defaultValue={`Is the ${vehicle.year} ${vehicle.make} ${vehicle.model} still available?`} className="mt-1.5 min-h-28 w-full rounded-lg border border-[var(--line)] p-3 font-normal" /></label>
        <p className="text-xs leading-5 text-[var(--muted)]">Fictional demonstration only. This form makes no network request.</p>
        <button className="min-h-11 w-full rounded-xl bg-[var(--brand)] px-4 font-black text-white hover:bg-[var(--brand-dark)]">Validate demo enquiry</button>
      </form>}
    </section>
  </div>;
}

function AdminPreview() {
  return <>
    <section className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between" aria-labelledby="admin-title"><div><p className="text-sm font-black text-[var(--brand)]">Fictional dealer workspace</p><h1 id="admin-title" className="mt-1 text-3xl font-black tracking-[-.04em] sm:text-4xl">Inventory operations</h1><p className="mt-2 max-w-2xl text-[var(--muted)]">Stock health, enquiry demand, and publishing state in one responsive view.</p></div><button className="min-h-11 self-start rounded-xl bg-[var(--brand)] px-4 text-sm font-black text-white">Add vehicle</button></section>
    <section className="metric-grid mt-7 grid gap-4" aria-label="Inventory metrics">{[
      ["Live vehicles", "142", "+8 this week"], ["Open enquiries", "18", "6 need a reply"], ["Avg. days listed", "21", "−3 vs last month"], ["Needs review", "5", "Price or media"],
    ].map(([label, value, note]) => <article key={label} className="rounded-2xl border border-[var(--line)] bg-white p-5"><p className="text-sm font-bold text-[var(--muted)]">{label}</p><p className="mt-3 text-3xl font-black">{value}</p><p className="mt-1 text-xs text-[var(--muted)]">{note}</p></article>)}</section>
    <div className="mt-4 grid min-w-0 gap-4 xl:grid-cols-[minmax(0,1.6fr)_minmax(18rem,.75fr)]">
      <section className="min-w-0 overflow-hidden rounded-2xl border border-[var(--line)] bg-white" aria-labelledby="stock-title"><div className="border-b border-[var(--line)] p-5"><h2 id="stock-title" className="text-lg font-black">Recent inventory</h2><p className="mt-1 text-sm text-[var(--muted)]">Publication state and buyer interest</p></div><div className="overflow-x-auto" tabIndex={0} aria-label="Scrollable inventory table"><table className="w-full min-w-[46rem] border-collapse text-left text-sm"><thead><tr className="text-xs uppercase tracking-[.1em] text-[var(--muted)]"><th className="px-5 py-4">Vehicle</th><th className="px-4 py-4">Dealer</th><th className="px-4 py-4">Price</th><th className="px-4 py-4">Enquiries</th><th className="px-5 py-4">Status</th></tr></thead><tbody>{vehicles.slice(0, 4).map((vehicle, index) => <tr key={vehicle.id} className="border-t border-[var(--line)]"><th scope="row" className="px-5 py-4 font-black">{vehicle.year} {vehicle.make} {vehicle.model}</th><td className="px-4 py-4 text-[var(--muted)]">{vehicle.dealer}</td><td className="px-4 py-4 font-bold">£{vehicle.price.toLocaleString("en-GB")}</td><td className="px-4 py-4">{[4, 7, 2, 1][index]}</td><td className="px-5 py-4"><span className={`rounded-full px-2.5 py-1 text-xs font-black ${vehicle.status === "Live" ? "bg-emerald-50 text-emerald-800" : "bg-amber-50 text-amber-800"}`}>{vehicle.status}</span></td></tr>)}</tbody></table></div></section>
      <section className="rounded-2xl border border-[var(--line)] bg-white p-5" aria-labelledby="queue-title"><div className="flex items-center justify-between"><h2 id="queue-title" className="text-lg font-black">Enquiry queue</h2><span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-black text-amber-800">6 open</span></div><ul className="mt-5 space-y-3">{[["RAV4 availability", "12 min ago"], ["Civic finance question", "31 min ago"], ["Model 3 test drive", "1 hr ago"]].map(([title, time], index) => <li key={title} className="flex gap-3 rounded-xl border border-[var(--line)] p-3"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-slate-100 text-xs font-black">{index + 1}</span><div><p className="text-sm font-black">{title}</p><p className="mt-1 text-xs text-[var(--muted)]">{time}</p></div></li>)}</ul><button className="mt-5 min-h-11 w-full rounded-xl border border-[var(--line)] text-sm font-black hover:bg-slate-50">Review enquiries</button></section>
    </div>
  </>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [view, setView] = useState<View>("inventory");
  const [query, setQuery] = useState("");
  const [make, setMake] = useState("All makes");
  const [body, setBody] = useState("All body styles");
  const [previewState, setPreviewState] = useState<PreviewState>("ready");
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  useEffect(() => { if (!menuOpen) return; const close = (event: KeyboardEvent) => event.key === "Escape" && setMenuOpen(false); document.addEventListener("keydown", close); return () => document.removeEventListener("keydown", close); }, [menuOpen]);
  useEffect(() => { if (!selectedVehicle) return; const close = (event: KeyboardEvent) => event.key === "Escape" && setSelectedVehicle(null); document.addEventListener("keydown", close); return () => document.removeEventListener("keydown", close); }, [selectedVehicle]);

  const filtered = useMemo(() => vehicles.filter(vehicle => {
    const text = `${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.dealer} ${vehicle.location}`.toLowerCase();
    return text.includes(query.trim().toLowerCase()) && (make === "All makes" || vehicle.make === make) && (body === "All body styles" || vehicle.body === body);
  }), [query, make, body]);
  function resetFilters() { setQuery(""); setMake("All makes"); setBody("All body styles"); }

  return <div className="min-h-screen">
    <a href="#main" className="fixed left-4 top-3 z-[60] -translate-y-20 rounded-lg bg-white px-4 py-2 font-bold shadow-lg focus:translate-y-0">Skip to content</a>
    <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} view={view} onView={setView} />
    <div className="lg:pl-[17rem]">
      <header className="sticky top-0 z-20 flex min-h-16 items-center justify-between border-b border-[var(--line)] bg-white/90 px-4 backdrop-blur sm:px-6 lg:px-8"><div className="flex items-center gap-3"><button className="rounded-xl border border-[var(--line)] bg-white p-2 text-slate-700 lg:hidden" onClick={() => setMenuOpen(true)} aria-expanded={menuOpen} aria-controls="primary-navigation" aria-label="Open navigation"><Icon name="menu" /></button><span className="hidden text-sm font-bold text-[var(--muted)] sm:block">AutoLane / <strong className="text-[var(--ink)]">Fictional demo</strong></span></div><div className="inline-flex rounded-xl border border-[var(--line)] bg-slate-50 p-1" aria-label="Preview mode"><button onClick={() => setView("inventory")} aria-pressed={view === "inventory"} className={`min-h-9 rounded-lg px-3 text-xs font-black sm:px-4 sm:text-sm ${view === "inventory" ? "bg-[#19392f] text-white" : "text-[var(--muted)]"}`}>Inventory preview</button><button onClick={() => setView("admin")} aria-pressed={view === "admin"} className={`min-h-9 rounded-lg px-3 text-xs font-black sm:px-4 sm:text-sm ${view === "admin" ? "bg-[#19392f] text-white" : "text-[var(--muted)]"}`}>Admin preview</button></div></header>

      <main id="main" className="mx-auto max-w-[96rem] px-4 py-6 sm:px-6 lg:px-8 lg:py-9">
        {view === "admin" ? <AdminPreview /> : <>
          <section className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between" aria-labelledby="inventory-title"><div><p className="text-sm font-black text-[var(--brand)]">Multi-dealer inventory</p><h1 id="inventory-title" className="mt-1 text-3xl font-black tracking-[-.04em] sm:text-5xl">Find the right vehicle</h1><p className="mt-2 max-w-2xl leading-7 text-[var(--muted)]">Search clearly labelled fictional stock across three demo dealerships. Filters update instantly without a page reload.</p></div><label className="text-sm font-bold">Demo state<select aria-label="Demo state" value={previewState} onChange={event => setPreviewState(event.target.value as PreviewState)} className="mt-1.5 block min-h-11 rounded-xl border border-[var(--line)] bg-white px-3"><option value="ready">Ready</option><option value="loading">Loading</option><option value="error">Error</option></select></label></section>

          <section className="mt-7 grid gap-3 rounded-2xl border border-[var(--line)] bg-white p-4 shadow-[0_10px_34px_rgba(24,45,37,.05)] md:grid-cols-[minmax(0,1.5fr)_minmax(10rem,.7fr)_minmax(10rem,.7fr)_auto]" aria-label="Inventory filters"><label className="text-sm font-bold">Search stock<span className="relative mt-1.5 block"><Icon name="search" className="pointer-events-none absolute left-3 top-3 h-5 w-5 text-[var(--muted)]" /><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Model, dealer, or city" className="min-h-11 w-full rounded-xl border border-[var(--line)] pl-10 pr-3 font-normal" /></span></label><label className="text-sm font-bold">Make<select value={make} onChange={event => setMake(event.target.value)} className="mt-1.5 min-h-11 w-full rounded-xl border border-[var(--line)] bg-white px-3 font-normal"><option>All makes</option>{[...new Set(vehicles.map(vehicle => vehicle.make))].map(item => <option key={item}>{item}</option>)}</select></label><label className="text-sm font-bold">Body style<select value={body} onChange={event => setBody(event.target.value)} className="mt-1.5 min-h-11 w-full rounded-xl border border-[var(--line)] bg-white px-3 font-normal"><option>All body styles</option>{[...new Set(vehicles.map(vehicle => vehicle.body))].map(item => <option key={item}>{item}</option>)}</select></label><button onClick={resetFilters} className="min-h-11 self-end rounded-xl border border-[var(--line)] px-4 text-sm font-black hover:bg-slate-50">Reset</button></section>

          {previewState === "loading" ? <section className="mt-7" role="status" aria-label="Loading inventory"><p className="font-black">Loading inventory…</p><div className="vehicle-grid mt-4 grid gap-4">{[1,2,3].map(item => <div key={item} className="h-80 animate-pulse rounded-2xl border border-[var(--line)] bg-slate-100" />)}</div></section> : previewState === "error" ? <section className="mt-7 rounded-2xl border border-rose-200 bg-rose-50 p-6" role="alert"><h2 className="text-xl font-black text-rose-950">Inventory could not be loaded</h2><p className="mt-2 text-sm text-rose-900">The interface preserves the search state and gives the visitor a clear recovery action.</p><button onClick={() => setPreviewState("ready")} className="mt-4 min-h-11 rounded-xl bg-rose-900 px-4 text-sm font-black text-white">Retry inventory</button></section> : <section className="mt-7" aria-labelledby="results-title"><div className="flex items-center justify-between gap-4"><div><h2 id="results-title" className="text-xl font-black">{filtered.length} vehicle{filtered.length === 1 ? "" : "s"} available</h2><p className="mt-1 text-sm text-[var(--muted)]">Fictional stock, prices, and dealers for interface demonstration.</p></div></div>{filtered.length ? <div className="vehicle-grid mt-4 grid gap-4">{filtered.map(vehicle => <VehicleCard key={vehicle.id} vehicle={vehicle} onEnquire={setSelectedVehicle} />)}</div> : <div className="mt-4 rounded-2xl border border-dashed border-[var(--line)] bg-white p-10 text-center"><Icon name="search" className="mx-auto h-10 w-10 text-[var(--muted)]" /><h3 className="mt-4 text-lg font-black">No vehicles match those filters</h3><p className="mt-2 text-sm text-[var(--muted)]">Try another model, make, or body style.</p><button onClick={resetFilters} className="mt-4 min-h-11 rounded-xl bg-[var(--brand)] px-4 text-sm font-black text-white">Clear filters</button></div>}</section>}

          <section id="dealers" className="mt-8" aria-labelledby="dealers-title"><div><p className="text-sm font-black text-[var(--brand)]">Dealership profiles</p><h2 id="dealers-title" className="mt-1 text-2xl font-black">Local stock, one searchable experience</h2></div><div className="mt-4 grid gap-4 md:grid-cols-3">{[["Northline Motors","Leeds","48 live vehicles"],["Citygate Auto","Manchester","56 live vehicles"],["Riverside Cars","York","38 live vehicles"]].map(([name, location, stock]) => <article key={name} className="rounded-2xl border border-[var(--line)] bg-white p-5"><span className="grid h-11 w-11 place-items-center rounded-xl bg-amber-100 text-amber-900"><Icon name="dealers" /></span><h3 className="mt-4 text-lg font-black">{name}</h3><p className="mt-1 flex items-center gap-1.5 text-sm text-[var(--muted)]"><Icon name="map" className="h-4 w-4" />{location}</p><p className="mt-4 text-sm font-bold">{stock}</p><a href="#inventory-title" className="mt-4 inline-flex items-center gap-2 text-sm font-black text-[var(--brand-dark)]">View inventory <Icon name="arrow" className="h-4 w-4" /></a></article>)}</div></section>
        </>}

        <section className="mt-8 grid gap-4 md:grid-cols-3" aria-label="Delivery checks">{["No page-level horizontal overflow", "Keyboard-dismissible navigation and enquiry", "Loading, empty, error, and success states"].map(item => <div key={item} className="flex items-center gap-3 rounded-2xl border border-[var(--line)] bg-white px-4 py-4 text-sm font-black"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-emerald-50 text-emerald-700"><Icon name="check" className="h-4 w-4" /></span>{item}</div>)}</section>
      </main>
    </div>
    {selectedVehicle && <EnquiryDialog vehicle={selectedVehicle} onClose={() => setSelectedVehicle(null)} />}
  </div>;
}

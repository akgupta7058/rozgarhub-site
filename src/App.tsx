import { useState } from 'react';

export type TradeCategory = 'All' | 'Civil' | 'Electrical' | 'Plumbing' | 'Finishing';

export interface KanpurService {
  id: string;
  title: string;
  hindiLabel: string;
  category: Exclude<TradeCategory, 'All'>;
  rateInr: number;
  unit: string;
  scope: string;
}

export const KANPUR_SERVICES: KanpurService[] = [
  {
    id: 'mistri-masonry',
    title: 'Raj Mistri & Brickwork',
    hindiLabel: 'Diwar, Plaster & Tile Repair',
    category: 'Civil',
    rateInr: 750,
    unit: 'per day',
    scope: 'Wall plaster patching, floor tile grouting, and damp-proofing prep across Kanpur homes.',
  },
  {
    id: 'electrician-wiring',
    title: 'Home Electrician',
    hindiLabel: 'Switchboard, MCB & Inverter',
    category: 'Electrical',
    rateInr: 300,
    unit: 'per visit',
    scope: 'MCB tripping diagnosis, ceiling fan & geyser point installation, and safe earthing checks.',
  },
  {
    id: 'plumber-leakage',
    title: 'Plumber & Pipe Fitting',
    hindiLabel: 'Nal, Tanki & Seepage Fix',
    category: 'Plumbing',
    rateInr: 350,
    unit: 'per visit',
    scope: 'Mixer tap replacement, overhead tank valve setup, and bathroom drainage clearing.',
  },
  {
    id: 'painter-putty',
    title: 'Wall Putty & Painting',
    hindiLabel: 'Interior & Exterior Finish',
    category: 'Finishing',
    rateInr: 18,
    unit: 'per sq ft',
    scope: 'Two-coat Birla putty smoothing, primer application, and clean emulsion wall painting.',
  },
  {
    id: 'carpenter-woodwork',
    title: 'Carpenter & Door Repair',
    hindiLabel: 'Darwaza, Almirah & Modular',
    category: 'Finishing',
    rateInr: 450,
    unit: 'per visit',
    scope: 'Door hinge alignment, lock replacement, kitchen cabinet channel repair, and plywood work.',
  },
  {
    id: 'waterproofing-roof',
    title: 'Roof Waterproofing',
    hindiLabel: 'Chhat Seepage Treatment',
    category: 'Civil',
    rateInr: 32,
    unit: 'per sq ft',
    scope: 'Terrace crack sealing and multi-layer chemical coating built for Kanpur summers and monsoons.',
  },
];

export const INSTALL_STEPS = [
  {
    number: '01',
    title: '1. Download dabayein',
    detail:
      'Upar diye gaye bade orange button "Download Android App (APK - 1.2 MB)" par click karein. File seedha GitHub se download hogi.',
  },
  {
    number: '02',
    title: '2. File kholein',
    detail:
      'Download poora hone ke baad phone ke Notification bar ya Downloads folder mein RozgarHub APK file par tap karein.',
  },
  {
    number: '03',
    title: '3. Install karein',
    detail:
      'Agar phone "Install unknown apps" pooche toh Allow chunein, phir Install dabakar Kanpur ke verified karigar book karein.',
  },
] as const;

export const KANPUR_ZONES = [
  { area: 'Swaroop Nagar & Civil Lines', eta: '35 min arrival' },
  { area: 'Kakadeo & Kalyanpur', eta: '30 min arrival' },
  { area: 'Govind Nagar & Kidwai Nagar', eta: '40 min arrival' },
  { area: 'Shyam Nagar & Lal Bangla', eta: '45 min arrival' },
] as const;

export function filterKanpurServices(
  services: KanpurService[],
  category: TradeCategory,
): KanpurService[] {
  if (category === 'All') return services;
  return services.filter((service) => service.category === category);
}

export function calculateEstimate(rateInr: number, quantity: number): number {
  const safeQty = Number.isFinite(quantity) && quantity > 0 ? Math.min(quantity, 5000) : 1;
  return Math.round(rateInr * safeQty);
}

const APK_URL = 'https://github.com';
const WEB_APP_URL = 'https://vercel.app';

const TRADE_FILTERS: { id: TradeCategory; label: string }[] = [
  { id: 'All', label: 'All Trades' },
  { id: 'Civil', label: 'Mistri & Civil' },
  { id: 'Electrical', label: 'Electrical' },
  { id: 'Plumbing', label: 'Plumbing' },
  { id: 'Finishing', label: 'Paint & Wood' },
];

export default function App() {
  const [activeCategory, setActiveCategory] = useState<TradeCategory>('All');
  const [selectedServiceId, setSelectedServiceId] = useState<string>(KANPUR_SERVICES[0].id);
  const [quantity, setQuantity] = useState<number>(2);
  const [showInstallHelp, setShowInstallHelp] = useState<boolean>(false);
  const [imageFailed, setImageFailed] = useState<boolean>(false);

  const visibleServices = filterKanpurServices(KANPUR_SERVICES, activeCategory);
  const selectedService =
    KANPUR_SERVICES.find((item) => item.id === selectedServiceId) ?? KANPUR_SERVICES[0];
  const estimatedTotal = calculateEstimate(selectedService.rateInr, quantity);

  const handleSelectServiceForEstimate = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    const matched = KANPUR_SERVICES.find((item) => item.id === serviceId);
    if (matched && matched.unit === 'per sq ft' && quantity < 50) {
      setQuantity(100);
    } else if (matched && matched.unit !== 'per sq ft' && quantity > 15) {
      setQuantity(2);
    }
  };

  const handleCategoryChange = (category: TradeCategory) => {
    setActiveCategory(category);
    const matching = filterKanpurServices(KANPUR_SERVICES, category);
    if (matching.length > 0 && !matching.some((s) => s.id === selectedServiceId)) {
      handleSelectServiceForEstimate(matching[0].id);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-orange-500 selection:text-white">
      {/* Top Bar: Clean 3-Zone Contract */}
      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-6 py-4">
          <a
            href="#top"
            className="font-display text-xl font-extrabold tracking-tight text-[#0B1F44] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-600"
          >
            Rozgar<span className="text-orange-600">Hub</span>
          </a>

          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600"
          >
            <a
              href="#install-guide"
              className="hover:text-[#0B1F44] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Install Guide
            </a>
            <a
              href="#services"
              className="hover:text-[#0B1F44] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Sahi Daam Rates
            </a>
            <a
              href="#estimator"
              className="hover:text-[#0B1F44] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Cost Estimator
            </a>
            <a
              href="#kanpur-coverage"
              className="hover:text-[#0B1F44] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Kanpur Areas
            </a>
          </nav>

          <div className="flex items-center shrink-0">
            <a
              href={WEB_APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg border border-[#0B1F44]/20 bg-[#0B1F44] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#13326B] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
            >
              Open Web App
            </a>
          </div>
        </div>
      </header>

      <main id="top">
        {/* Hero Section: Deep Blue Canvas + Big Orange APK Button */}
        <section className="relative overflow-hidden bg-[#0B1F44] text-white">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                'radial-gradient(circle at 82% 20%, rgba(249, 115, 22, 0.35), transparent 45%), linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)',
              backgroundSize: '100% 100%, 48px 48px, 48px 48px',
            }}
          />

          <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-stretch gap-8 px-6 py-10 sm:py-14 lg:grid-cols-12 lg:gap-12 lg:py-20">
            <div className="flex flex-col justify-center lg:col-span-7">
              <p className="text-sm font-medium tracking-wide text-orange-300">
                Kanpur&apos;s Home Construction &amp; Repair App · Verified Local Karigar
              </p>

              <h1
                className="font-display mt-3 font-extrabold tracking-tight text-white [text-wrap:balance]"
                style={{ fontSize: 'clamp(2.15rem, 4.2vw, 3.75rem)', lineHeight: 1.08 }}
              >
                RozgarHub - Sahi Kaam, Sahi Daam
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-200 sm:mt-5 sm:text-lg">
                Ghar ke construction, tile fitting, wiring, plumbing aur painting ke liye Kanpur ke
                bharosemand mistri aur technicians seedha book karein — bina dalali aur bina chhupe
                charges ke.
              </p>

              {/* Primary Conversion Action */}
              <div className="mt-6 flex flex-col items-start gap-3.5 sm:mt-8 sm:flex-row sm:items-center sm:gap-4">
                <a
                  href={APK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[54px] w-full items-center justify-center gap-3 rounded-xl bg-orange-600 px-7 py-3.5 text-base font-bold text-white shadow-lg shadow-orange-950/30 transition-all duration-150 hover:bg-orange-500 active:scale-[0.99] sm:w-auto whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-400"
                >
                  <svg
                    className="h-5 w-5 shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  <span>Download Android App (APK - 1.2 MB)</span>
                </a>

                <a
                  href={WEB_APP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/15 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-400"
                >
                  <span>Open Web App</span>
                  <svg
                    className="h-4 w-4 shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M7 17 17 7" />
                    <path d="M7 7h10v10" />
                  </svg>
                </a>
              </div>

              {/* Clean unboxed metadata strip */}
              <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium text-slate-300 sm:mt-6 sm:text-sm">
                <span>1.2 MB Fast Download</span>
                <span aria-hidden="true" className="text-orange-400">·</span>
                <span>Android 8.0+ Compatible</span>
                <span aria-hidden="true" className="text-orange-400">·</span>
                <span>Serving Kanpur Nagar</span>
              </div>
            </div>

            {/* Hero Visual Container */}
            <div className="lg:col-span-5">
              <div className="relative h-full min-h-[220px] overflow-hidden rounded-2xl border border-white/15 bg-[#122D61] sm:min-h-[280px]">
                {!imageFailed ? (
                  <img
                    src="/kanpur-craftsmen.jpg"
                    alt="Skilled RozgarHub construction and carpentry craftsmen working in a Kanpur home"
                    referrerPolicy="no-referrer"
                    onError={() => setImageFailed(true)}
                    className="h-full w-full object-cover lg:min-h-[380px]"
                  />
                ) : (
                  <div className="flex h-full min-h-[340px] flex-col items-center justify-center bg-gradient-to-br from-[#122D61] to-[#081633] p-8 text-center">
                    <svg
                      className="h-14 w-14 text-orange-400"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                      <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                    <p className="font-display mt-4 text-lg font-bold text-white">
                      RozgarHub Kanpur Craftsmen
                    </p>
                    <p className="mt-1 text-sm text-slate-300">
                      Mistri · Electrician · Plumber · Painter
                    </p>
                  </div>
                )}

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#071530]/90 via-[#071530]/20 to-transparent"
                />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-xs font-medium text-orange-300">
                    On-Site Inspection · Kanpur
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white">
                    Fixed upfront labour rates before work begins.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3-Step Install Guide */}
        <section id="install-guide" className="border-b border-slate-200 bg-white py-14 sm:py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="text-sm font-semibold text-orange-600">
                  Android APK Setup
                </p>
                <h2 className="font-display mt-1 text-2xl font-bold tracking-tight text-[#0B1F44] sm:text-3xl">
                  3-Step Install Guide
                </h2>
                <p className="mt-2 max-w-2xl text-sm text-slate-600 sm:text-base">
                  1. Download dabayein, 2. File kholein, 3. Install karein — seedha apne Android phone par 30 second mein shuru karein.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowInstallHelp((prev) => !prev)}
                aria-expanded={showInstallHelp}
                className="inline-flex min-h-[42px] items-center gap-2 self-start rounded-lg border border-slate-300 bg-slate-50 px-4 py-2 text-sm font-semibold text-[#0B1F44] transition-colors hover:bg-slate-100 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
              >
                <span>{showInstallHelp ? 'Hide Permission Help' : 'Phone Permission Help?'}</span>
              </button>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
              {INSTALL_STEPS.map((step) => (
                <article
                  key={step.number}
                  className="flex flex-col justify-between rounded-xl border border-slate-200 bg-slate-50/70 p-6 transition-colors hover:border-[#0B1F44]/30"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-display text-3xl font-extrabold tabular-nums text-orange-600">
                        {step.number}
                      </span>
                      <span className="text-xs font-semibold text-[#0B1F44]/70">
                        APK Step {Number(step.number)}
                      </span>
                    </div>
                    <h3 className="font-display mt-4 text-xl font-bold text-[#0B1F44]">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      {step.detail}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            {showInstallHelp && (
              <div className="mt-6 rounded-xl border border-orange-200 bg-orange-50/70 p-5 text-sm text-slate-800">
                <p className="font-display font-bold text-[#0B1F44]">
                  &quot;Install unknown apps&quot; setting kaise chalu karein?
                </p>
                <p className="mt-1.5 leading-relaxed text-slate-700">
                  Jab aap step 2 mein downloaded APK file kholenge, Android ek prompt dikhayega.
                  <strong> Settings</strong> par tap karein aur <strong>Allow from this source</strong> on kar dein, phir back aakar <strong>Install</strong> dabayein. Ya bina install kiye turant{' '}
                  <a
                    href={WEB_APP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-orange-700 underline underline-offset-2 hover:text-orange-800"
                  >
                    Open Web App
                  </a>{' '}
                  use karein.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Kanpur Trades & Sahi Daam Rates */}
        <section id="services" className="bg-slate-50 py-14 sm:py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div>
                <p className="text-sm font-semibold text-orange-600">
                  Transparent Kanpur Rate Card
                </p>
                <h2 className="font-display mt-1 text-2xl font-bold tracking-tight text-[#0B1F44] sm:text-3xl">
                  Sahi Kaam, Sahi Daam — Home Repair &amp; Construction
                </h2>
              </div>

              {/* Functional Trade Filter Buttons */}
              <div
                role="group"
                aria-label="Filter Kanpur trades"
                className="flex flex-wrap items-center gap-1.5 rounded-xl border border-slate-200 bg-white p-1.5 lg:flex-nowrap shrink-0"
              >
                {TRADE_FILTERS.map((filter) => {
                  const isActive = activeCategory === filter.id;
                  return (
                    <button
                      key={filter.id}
                      type="button"
                      onClick={() => handleCategoryChange(filter.id)}
                      aria-pressed={isActive}
                      className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 ${
                        isActive
                          ? 'bg-[#0B1F44] text-white'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-[#0B1F44]'
                      }`}
                    >
                      {filter.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {visibleServices.map((service) => {
                const isSelected = selectedService.id === service.id;
                return (
                  <article
                    key={service.id}
                    className={`flex flex-col justify-between rounded-xl border bg-white p-6 transition-colors ${
                      isSelected
                        ? 'border-orange-500 ring-1 ring-orange-500/40'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-4 text-xs text-slate-500">
                        <span>{service.category} · {service.hindiLabel}</span>
                      </div>

                      <h3 className="font-display mt-2.5 text-lg font-bold text-[#0B1F44]">
                        {service.title}
                      </h3>

                      <p className="mt-2 text-sm leading-relaxed text-slate-600">
                        {service.scope}
                      </p>
                    </div>

                    <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                      <div>
                        <span className="font-display text-xl font-extrabold tabular-nums text-[#0B1F44]">
                          ₹{service.rateInr}
                        </span>
                        <span className="ml-1.5 text-xs font-medium text-slate-500">
                          {service.unit}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleSelectServiceForEstimate(service.id)}
                        className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 ${
                          isSelected
                            ? 'bg-orange-600 text-white'
                            : 'bg-slate-100 text-[#0B1F44] hover:bg-orange-50 hover:text-orange-700'
                        }`}
                      >
                        {isSelected ? 'Selected in Estimator' : 'Estimate Cost'}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Interactive Sahi Daam Estimator + Kanpur Coverage */}
        <section id="estimator" className="border-t border-slate-200 bg-white py-14 sm:py-16">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 lg:grid-cols-12">
            {/* Left: Estimator */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8 lg:col-span-7">
              <p className="text-sm font-semibold text-orange-600">
                Instant Labour Calculator
              </p>
              <h2 className="font-display mt-1 text-2xl font-bold text-[#0B1F44]">
                Check Your Kanpur Work Estimate
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Select a trade and number of days, visits, or square feet to preview standard RozgarHub labour pricing.
              </p>

              <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="service-select"
                    className="block text-xs font-semibold text-slate-700"
                  >
                    Select Work Category
                  </label>
                  <select
                    id="service-select"
                    value={selectedService.id}
                    onChange={(e) => handleSelectServiceForEstimate(e.target.value)}
                    className="mt-1.5 min-h-[44px] w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-900 focus:border-orange-600 focus:outline-none"
                  >
                    {KANPUR_SERVICES.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.title} (₹{service.rateInr} {service.unit})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="quantity-input"
                    className="block text-xs font-semibold text-slate-700"
                  >
                    Quantity ({selectedService.unit.replace('per ', '')}s)
                  </label>
                  <input
                    id="quantity-input"
                    type="number"
                    min={1}
                    max={5000}
                    value={quantity}
                    onChange={(e) => {
                      const val = parseInt(e.target.value, 10);
                      setQuantity(Number.isNaN(val) ? 1 : Math.max(1, val));
                    }}
                    className="mt-1.5 min-h-[44px] w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm font-semibold tabular-nums text-slate-900 focus:border-orange-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="mt-6 flex flex-col justify-between gap-4 rounded-xl bg-[#0B1F44] p-5 text-white sm:flex-row sm:items-center">
                <div>
                  <p className="text-xs font-medium text-slate-300">
                    Estimated Sahi Daam ({selectedService.title})
                  </p>
                  <p
                    data-testid="estimate-total"
                    className="font-display mt-1 text-3xl font-extrabold tabular-nums text-orange-400"
                  >
                    ₹{estimatedTotal.toLocaleString('en-IN')}
                  </p>
                </div>

                <a
                  href={WEB_APP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-orange-600 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-orange-500 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-300"
                >
                  Open Web App
                </a>
              </div>
            </div>

            {/* Right: Kanpur Zones */}
            <div id="kanpur-coverage" className="flex flex-col justify-between lg:col-span-5">
              <div>
                <p className="text-sm font-semibold text-orange-600">
                  Local Dispatch Across Kanpur
                </p>
                <h2 className="font-display mt-1 text-2xl font-bold text-[#0B1F44]">
                  Active Neighbourhoods
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Local craftsmen stationed near major Kanpur hubs so small repairs finish the same day.
                </p>

                <dl className="mt-6 divide-y divide-slate-200 border-y border-slate-200">
                  {KANPUR_ZONES.map((zone) => (
                    <div
                      key={zone.area}
                      className="flex items-center justify-between gap-4 py-3.5 text-sm"
                    >
                      <dt className="font-semibold text-[#0B1F44]">{zone.area}</dt>
                      <dd className="font-medium tabular-nums text-slate-600 whitespace-nowrap shrink-0">
                        {zone.eta}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm font-semibold text-[#0B1F44]">
                  Ready to install RozgarHub on your phone?
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-4">
                  <a
                    href={APK_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-orange-600 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-orange-500 whitespace-nowrap shrink-0"
                  >
                    Download Android App (APK - 1.2 MB)
                  </a>
                  <a
                    href={WEB_APP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-[#0B1F44] underline underline-offset-4 hover:text-orange-600 whitespace-nowrap shrink-0"
                  >
                    Open Web App
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Quiet Footer */}
      <footer className="border-t border-slate-800 bg-[#071530] py-10 text-slate-300">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 px-6 sm:flex-row sm:items-center">
          <div>
            <p className="font-display text-lg font-bold text-white">
              RozgarHub - Sahi Kaam, Sahi Daam
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Kanpur&apos;s Home Construction &amp; Repair App · Uttar Pradesh, India
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-sm">
            <a
              href={APK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-orange-400 hover:text-orange-300 whitespace-nowrap shrink-0"
            >
              Download Android App (APK - 1.2 MB)
            </a>
            <a
              href={WEB_APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-white hover:text-orange-300 whitespace-nowrap shrink-0"
            >
              Open Web App
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

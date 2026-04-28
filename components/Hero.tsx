export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-b from-indigo-100/60 via-purple-50/40 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-sm font-medium text-indigo-700 bg-indigo-50 rounded-full border border-indigo-100">
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
          Now in public beta
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 max-w-4xl mx-auto leading-tight">
          Ship Faster.{' '}
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Scale Smarter.
          </span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          The modern platform for teams who build. Velocity accelerates your workflow with powerful tools, seamless integrations, and real-time collaboration.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#pricing"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/25"
          >
            Start for Free
          </a>
          <a
            href="#how-it-works"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-base font-semibold text-gray-700 bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.986V5.653z" />
            </svg>
            Watch Demo
          </a>
        </div>

        {/* Hero image placeholder */}
        <div className="mt-16 max-w-5xl mx-auto">
          <div className="aspect-video rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 shadow-2xl border border-gray-700/50 overflow-hidden relative">
            <div className="absolute top-4 left-4 flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-2xl bg-indigo-600/20">
                  <svg className="w-8 h-8 text-indigo-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                </div>
                <p className="text-gray-400 text-sm">Dashboard Preview</p>
              </div>
            </div>
          </div>
        </div>

        {/* Social proof */}
        <div className="mt-16">
          <p className="text-sm text-gray-500 mb-6">Trusted by teams at</p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 opacity-50">
            {['Acme Corp', 'TechFlow', 'DataSync', 'CloudBase', 'DevStack'].map((name) => (
              <span key={name} className="text-lg font-bold text-gray-400 tracking-wide">{name}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

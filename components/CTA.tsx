export default function CTA() {
  return (
    <section className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700 px-8 py-16 sm:px-16 sm:py-20 text-center overflow-hidden">
          {/* Decorative blobs */}
          <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight max-w-2xl mx-auto">
              Ready to accelerate your workflow?
            </h2>
            <p className="mt-4 text-lg text-indigo-100 max-w-xl mx-auto">
              Join thousands of teams already shipping faster with Velocity. Start your free trial today — no credit card required.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-indigo-700 bg-white rounded-xl hover:bg-indigo-50 transition-colors shadow-lg"
              >
                Start Free Trial
              </a>
              <a
                href="#"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-white rounded-xl border-2 border-white/30 hover:bg-white/10 transition-colors"
              >
                Talk to Sales
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

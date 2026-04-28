const steps = [
  {
    step: '01',
    title: 'Connect your repo',
    description: 'Link your GitHub, GitLab, or Bitbucket repository in one click. We auto-detect your framework and settings.',
  },
  {
    step: '02',
    title: 'Configure your pipeline',
    description: 'Customize build steps, environment variables, and deployment targets with our intuitive visual editor.',
  },
  {
    step: '03',
    title: 'Deploy & iterate',
    description: 'Push to main and your changes are live in seconds. Preview branches, rollback instantly, and iterate with confidence.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wider">How It Works</p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Up and running in minutes
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Three simple steps to supercharge your development workflow.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((item, index) => (
            <div key={item.step} className="relative text-center">
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[60%] w-[80%] border-t-2 border-dashed border-gray-200" />
              )}
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white text-2xl font-bold mb-6 shadow-lg shadow-indigo-500/20">
                {item.step}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed max-w-xs mx-auto">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

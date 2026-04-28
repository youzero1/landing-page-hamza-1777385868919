const footerLinks = {
  Product: ['Features', 'Pricing', 'Integrations', 'Changelog', 'Docs'],
  Company: ['About', 'Blog', 'Careers', 'Press', 'Partners'],
  Resources: ['Community', 'Help Center', 'Templates', 'Guides', 'API Reference'],
  Legal: ['Privacy', 'Terms', 'Security', 'Cookies'],
};

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">V</span>
              </div>
              <span className="text-lg font-bold text-white">Velocity</span>
            </div>
            <p className="text-sm leading-relaxed">
              The modern platform for teams who build. Ship faster, scale smarter.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-semibold text-white mb-4">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm">&copy; {new Date().getFullYear()} Velocity. All rights reserved.</p>
          <div className="flex items-center gap-4">
            {/* Social icons */}
            {['Twitter', 'GitHub', 'LinkedIn'].map((social) => (
              <a key={social} href="#" className="text-sm hover:text-white transition-colors">
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

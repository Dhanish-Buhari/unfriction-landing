export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-12 border-t border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Privacy Links */}
        <div className="flex justify-center gap-6 mb-6 text-sm">
          <a
            href="/privacy"
            className="text-slate-600 hover:text-slate-900 transition-colors"
          >
            Privacy Policy
          </a>
          <a
            href="mailto:support@unfriction.app"
            className="text-slate-600 hover:text-slate-900 transition-colors"
          >
            Contact
          </a>
        </div>

        {/* Privacy Statement */}
        <p className="text-center text-sm text-slate-500 mb-6">
          No accounts. No tracking. Local-first notes.
        </p>

        {/* Social Links */}
        <div className="flex justify-center gap-6 mb-6">
          <a
            href="https://github.com/dhanishbuhari"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-slate-600 transition-colors"
            aria-label="GitHub"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
          </a>
          <a
            href="https://twitter.com/dhanishbuhari"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-slate-600 transition-colors"
            aria-label="Twitter / X"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          <a
            href="https://www.producthunt.com/@dhanishbuhari"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-slate-600 transition-colors"
            aria-label="Product Hunt"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13.604 9.461h-3.208v3.03h3.208a1.515 1.515 0 100-3.03zM12 2.04c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10-4.477-10-10-10zm1.604 12.42h-3.208v3.03H7.604V6.51h6c2.326 0 4.29 1.815 4.29 4.065s-1.964 3.885-4.29 3.885z" />
            </svg>
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-slate-500">
          <p>Built by Dhanish Buhari • © {currentYear}</p>
        </div>
      </div>
    </footer>
  )
}

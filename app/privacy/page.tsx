import Link from 'next/link'
import { Brain } from 'lucide-react'

export const metadata = {
  title: 'Privacy Policy — Open EMDR',
  description: 'Privacy Policy for Open EMDR, operated by XYZ Lab Pte. Ltd.',
}

export default function PrivacyPage() {
  return (
    <div className="bg-white dark:bg-[#08081a] min-h-screen text-slate-900 dark:text-slate-100">

      {/* Navbar */}
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-slate-200 dark:border-white/5 bg-white/90 dark:bg-[#08081a]/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Brain className="w-7 h-7 text-purple-600" />
            <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-white">Open EMDR</span>
          </Link>
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <Link href="/terms" className="hover:text-slate-900 dark:hover:text-white transition-colors">Terms</Link>
            <Link href="/auth/login" className="hover:text-slate-900 dark:hover:text-white transition-colors">Log in</Link>
          </div>
        </div>
      </nav>

      <main className="pt-28 pb-24 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-black mb-2 text-slate-900 dark:text-white">Privacy Policy</h1>
          <p className="text-slate-400 dark:text-slate-500 text-sm mb-12">Last updated: March 2025</p>

          <div className="prose prose-slate dark:prose-invert max-w-none space-y-10 text-slate-600 dark:text-slate-300 leading-relaxed">

            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">1. Who We Are</h2>
              <p>
                Open EMDR is operated by <strong className="text-slate-900 dark:text-white">XYZ Lab Pte. Ltd.</strong> (UEN 201830513E),
                a company incorporated in Singapore with its registered address at 160 Robinson Road, #14-04 Business Federation Centre,
                Singapore 068914 (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;).
              </p>
              <p className="mt-3">
                We are committed to protecting your personal information and your right to privacy. If you have any questions or
                concerns about this policy, or our practices with regard to your personal information, please contact us at
                <a href="mailto:privacy@openemdr.com" className="text-purple-600 dark:text-purple-400 hover:underline ml-1">privacy@openemdr.com</a>.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">2. Information We Collect</h2>
              <p>We collect information that you provide directly to us, including:</p>
              <ul className="list-disc list-inside mt-3 space-y-2 text-slate-600 dark:text-slate-300">
                <li><strong className="text-slate-800 dark:text-white">Account information:</strong> Your email address and password when you create an account.</li>
                <li><strong className="text-slate-800 dark:text-white">Payment information:</strong> Billing details processed securely by Stripe. We do not store your full card number on our servers.</li>
                <li><strong className="text-slate-800 dark:text-white">Session data:</strong> Distress ratings (SUD scores) you enter before and after sessions, and the protocols you select. We use this data in aggregate to improve the service.</li>
                <li><strong className="text-slate-800 dark:text-white">Usage data:</strong> Log data, IP addresses, browser type, pages visited, and time spent on pages, collected automatically when you use our service.</li>
              </ul>
              <p className="mt-3">
                We do <strong className="text-slate-900 dark:text-white">not</strong> collect or store the text you enter as your personal target or the content of your trauma memories. This information is held only in your browser session and is never transmitted to our servers.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">3. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc list-inside mt-3 space-y-2">
                <li>Create and manage your account</li>
                <li>Process payments and provide access to the service</li>
                <li>Improve and personalise your experience</li>
                <li>Communicate with you about your account or the service</li>
                <li>Analyse aggregate usage patterns to improve the product</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">4. Data Sharing</h2>
              <p>We do not sell your personal data. We may share your information with:</p>
              <ul className="list-disc list-inside mt-3 space-y-2">
                <li><strong className="text-slate-800 dark:text-white">Supabase:</strong> Our database and authentication provider, used to store account data securely.</li>
                <li><strong className="text-slate-800 dark:text-white">Stripe:</strong> Our payment processor. See <a href="https://stripe.com/privacy" className="text-purple-600 dark:text-purple-400 hover:underline" target="_blank" rel="noopener noreferrer">Stripe&rsquo;s Privacy Policy</a>.</li>
                <li><strong className="text-slate-800 dark:text-white">Legal requirements:</strong> When required by law, court order, or governmental authority.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">5. Data Retention</h2>
              <p>
                We retain your account data for as long as your account is active or as needed to provide you with the service.
                If you request account deletion, we will delete your personal data within 30 days, except where retention is
                required by law (e.g. financial records for 5 years under Singapore law).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">6. Security</h2>
              <p>
                We implement appropriate technical and organisational measures to protect your personal information against
                accidental or unlawful destruction, loss, alteration, or unauthorised disclosure. All data is encrypted
                in transit (TLS) and at rest. However, no method of transmission over the internet is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">7. Your Rights</h2>
              <p>Depending on your jurisdiction, you may have the right to:</p>
              <ul className="list-disc list-inside mt-3 space-y-2">
                <li>Access the personal data we hold about you</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to or restrict our processing of your data</li>
                <li>Data portability</li>
              </ul>
              <p className="mt-3">
                To exercise any of these rights, please contact us at <a href="mailto:privacy@openemdr.com" className="text-purple-600 dark:text-purple-400 hover:underline">privacy@openemdr.com</a>.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">8. Cookies</h2>
              <p>
                We use essential cookies to keep you logged in and to maintain your session. We do not use advertising
                or tracking cookies. You can disable cookies in your browser settings, but doing so may prevent you from
                using certain features of the service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">9. Children</h2>
              <p>
                Open EMDR is not directed to children under 18 years of age. We do not knowingly collect personal
                information from anyone under 18. If you are a parent or guardian and believe your child has provided
                us with personal information, please contact us and we will delete it.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">10. Governing Law</h2>
              <p>
                This Privacy Policy is governed by the laws of Singapore, including the Personal Data Protection Act 2012
                (PDPA). Any disputes shall be subject to the exclusive jurisdiction of the courts of Singapore.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">11. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any material changes by posting
                the new policy on this page and updating the &ldquo;Last updated&rdquo; date. Your continued use of the service
                after changes constitutes acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">12. Contact Us</h2>
              <p>If you have questions about this Privacy Policy, please contact:</p>
              <div className="mt-3 bg-slate-50 dark:bg-white/5 rounded-xl p-5 border border-slate-200 dark:border-white/10 text-sm space-y-1">
                <p className="font-semibold text-slate-900 dark:text-white">XYZ Lab Pte. Ltd.</p>
                <p>UEN: 201830513E</p>
                <p>160 Robinson Road, #14-04 Business Federation Centre</p>
                <p>Singapore 068914</p>
                <p className="mt-2">
                  <a href="mailto:privacy@openemdr.com" className="text-purple-600 dark:text-purple-400 hover:underline">privacy@openemdr.com</a>
                </p>
              </div>
            </section>

          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-white/5 py-8 px-4 bg-slate-50 dark:bg-[#0f0f2a]">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 dark:text-slate-500 text-sm">
          <Link href="/" className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-600" />
            <span className="font-semibold text-slate-600 dark:text-slate-300">Open EMDR</span>
          </Link>
          <div className="flex gap-4">
            <Link href="/privacy" className="text-purple-600 dark:text-purple-400">Privacy</Link>
            <Link href="/terms" className="hover:text-slate-900 dark:hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </footer>

    </div>
  )
}

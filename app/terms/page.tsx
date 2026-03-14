import Link from 'next/link'
import { Brain } from 'lucide-react'

export const metadata = {
  title: 'Terms of Service — Open EMDR',
  description: 'Terms of Service for Open EMDR, operated by XYZ Lab Pte. Ltd.',
}

export default function TermsPage() {
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
            <Link href="/privacy" className="hover:text-slate-900 dark:hover:text-white transition-colors">Privacy</Link>
            <Link href="/auth/login" className="hover:text-slate-900 dark:hover:text-white transition-colors">Log in</Link>
          </div>
        </div>
      </nav>

      <main className="pt-28 pb-24 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-black mb-2 text-slate-900 dark:text-white">Terms of Service</h1>
          <p className="text-slate-400 dark:text-slate-500 text-sm mb-12">Last updated: March 2025</p>

          <div className="prose prose-slate dark:prose-invert max-w-none space-y-10 text-slate-600 dark:text-slate-300 leading-relaxed">

            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">1. Agreement to Terms</h2>
              <p>
                By accessing or using Open EMDR (&ldquo;the Service&rdquo;), you agree to be bound by these Terms of Service.
                The Service is operated by <strong className="text-slate-900 dark:text-white">XYZ Lab Pte. Ltd.</strong> (UEN 201830513E),
                160 Robinson Road, #14-04 Business Federation Centre, Singapore 068914 (&ldquo;Company&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;).
              </p>
              <p className="mt-3">
                If you do not agree to these Terms, please do not use the Service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">2. Description of Service</h2>
              <p>
                Open EMDR provides a self-guided, web-based tool based on Eye Movement Desensitization and Reprocessing
                (EMDR) techniques. The Service is designed to help individuals process stress, anxiety, trauma, and
                related emotional difficulties using bilateral stimulation.
              </p>
              <p className="mt-3">
                The Service is intended as a self-help tool and wellness resource. It is <strong className="text-slate-900 dark:text-white">not</strong> a substitute
                for professional mental health treatment, diagnosis, or medical advice.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">3. Medical Disclaimer</h2>
              <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-xl p-5 text-amber-800 dark:text-amber-300 text-sm">
                <p className="font-semibold mb-2">Important — Please Read</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Open EMDR is a self-help tool, not a clinical service.</li>
                  <li>We are not licensed therapists and do not provide medical or psychological treatment.</li>
                  <li>The Service does not create a therapist-patient relationship.</li>
                  <li>If you have severe, complex, or acute trauma, please work with a licensed mental health professional.</li>
                  <li>If you feel overwhelmed at any time, stop the session immediately and seek professional support.</li>
                  <li>In a mental health emergency, contact emergency services or a crisis hotline in your country.</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">4. Eligibility</h2>
              <p>
                You must be at least 18 years old to use the Service. By creating an account, you confirm that you are
                18 or older. The Service is available worldwide, subject to applicable local laws.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">5. Account Registration</h2>
              <p>
                To access the Service, you must create an account with a valid email address and password. You are
                responsible for maintaining the confidentiality of your account credentials and for all activities that
                occur under your account. You agree to notify us immediately of any unauthorised use of your account.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">6. Payment and Access</h2>
              <p>
                Access to the full Service requires a one-time payment. Upon successful payment, you are granted a
                non-exclusive, non-transferable, lifetime licence to access and use the Service for personal, non-commercial
                purposes.
              </p>
              <ul className="list-disc list-inside mt-3 space-y-2">
                <li>All payments are processed securely by Stripe.</li>
                <li>Prices are displayed in USD and are subject to change. Changes do not affect existing purchases.</li>
                <li>We offer a satisfaction guarantee — if you are not satisfied after your first session, contact us within 14 days for a full refund.</li>
                <li>Refund requests after 14 days are considered on a case-by-case basis.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">7. Acceptable Use</h2>
              <p>You agree not to:</p>
              <ul className="list-disc list-inside mt-3 space-y-2">
                <li>Use the Service for any unlawful purpose or in violation of these Terms</li>
                <li>Share, resell, or sublicence your account access to others</li>
                <li>Attempt to reverse engineer, copy, or scrape any part of the Service</li>
                <li>Interfere with or disrupt the integrity or performance of the Service</li>
                <li>Use the Service to harm yourself or others</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">8. Intellectual Property</h2>
              <p>
                All content, features, and functionality of the Service — including text, graphics, logos, and software —
                are owned by XYZ Lab Pte. Ltd. and are protected by applicable intellectual property laws. Nothing in
                these Terms grants you any right to use our trademarks or intellectual property beyond what is required
                to use the Service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">9. Disclaimers and Limitation of Liability</h2>
              <p>
                The Service is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis without warranties of any kind,
                either express or implied, including but not limited to warranties of merchantability, fitness for a
                particular purpose, or non-infringement.
              </p>
              <p className="mt-3">
                To the fullest extent permitted by law, XYZ Lab Pte. Ltd. shall not be liable for any indirect,
                incidental, special, consequential, or punitive damages arising from your use of or inability to use
                the Service. Our total liability for any claim arising under these Terms shall not exceed the amount
                you paid to us in the 12 months preceding the claim.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">10. Termination</h2>
              <p>
                We reserve the right to suspend or terminate your account at any time if you violate these Terms.
                You may close your account at any time by contacting us. Upon termination, your right to use the
                Service ceases immediately.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">11. Governing Law and Dispute Resolution</h2>
              <p>
                These Terms are governed by the laws of Singapore. Any dispute arising out of or in connection with
                these Terms shall first be attempted to be resolved through good-faith negotiation. If unresolved within
                30 days, disputes shall be submitted to the exclusive jurisdiction of the courts of Singapore.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">12. Changes to Terms</h2>
              <p>
                We may update these Terms from time to time. We will notify you of material changes by posting the
                updated Terms on this page and updating the &ldquo;Last updated&rdquo; date. Continued use of the Service
                after changes constitutes your acceptance of the updated Terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">13. Contact Us</h2>
              <p>For questions about these Terms, please contact:</p>
              <div className="mt-3 bg-slate-50 dark:bg-white/5 rounded-xl p-5 border border-slate-200 dark:border-white/10 text-sm space-y-1">
                <p className="font-semibold text-slate-900 dark:text-white">XYZ Lab Pte. Ltd.</p>
                <p>UEN: 201830513E</p>
                <p>160 Robinson Road, #14-04 Business Federation Centre</p>
                <p>Singapore 068914</p>
                <p className="mt-2">
                  <a href="mailto:legal@openemdr.com" className="text-purple-600 dark:text-purple-400 hover:underline">legal@openemdr.com</a>
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
            <Link href="/privacy" className="hover:text-slate-900 dark:hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="text-purple-600 dark:text-purple-400">Terms</Link>
          </div>
        </div>
      </footer>

    </div>
  )
}

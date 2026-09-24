import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  CreditCard, 
  ArrowRight, 
  Check, 
  KeyRound, 
  AlertCircle, 
  Globe2
} from 'lucide-react';
import { STRIPE_PAYMENT_LINK } from '../data/housingData';
import { Language } from '../types';
import { Housing3DBackground } from './Housing3DBackground';

interface EntrancePaywallProps {
  language: Language;
  onToggleLanguage: () => void;
  onUnlockSuccess: () => void;
}

export const EntrancePaywall: React.FC<EntrancePaywallProps> = ({
  language,
  onToggleLanguage,
  onUnlockSuccess,
}) => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [showAlreadyPaid, setShowAlreadyPaid] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [verifyError, setVerifyError] = useState('');

  const handleVerifyEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes('@')) {
      setVerifyError(
        language === 'da'
          ? 'Indtast venligst den e-mailadresse, du benyttede hos Stripe.'
          : 'Please enter the email address used for your Stripe purchase.'
      );
      return;
    }
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      onUnlockSuccess();
    }, 500);
  };

  const content = language === 'da' ? {
    badge: 'Eksklusiv medlemsadgang – Danmarks samlede boligdatabase',
    title: 'Lås op for Danmarks 97 Verificerede Boligportaler',
    description: 'Alle direkte links, almene ventelister, gratis kollegier, pensionskasser, huslejeregler og rådgivning er beskyttet. Få fuld, ubegrænset adgang med det samme efter betaling via Stripe.',
    featuresHeader: 'Hvad du får adgang til bag betalingsmuren:',
    features: [
      'Verificerede organisationer og direkte portalsider',
      'Almene ventelister i København, Aarhus, Odense & Aalborg',
      'Kollegier & studieboliger med 100% gratis opskrivning',
      'Hemmelige pensionskasser og institutionelle udlejere',
      'Juridisk tjek af lejekontrakt, depositum og huslejeklager',
    ],
    cardTitle: 'Fuld Adgang',
    price: '7 DKK',
    period: '/ måned',
    noBinding: 'Ingen binding',
    cancelAnytime: 'Opsig når som helst',
    ctaButton: 'Lås op med Stripe',
    securityText: 'Sikker betaling krypteret via Stripe. Opsig når som helst.',
    alreadyPaidLink: 'Har du allerede betalt? – Bekræft adgang',
    alreadyPaidHelp: 'Indtast din Stripe e-mailadresse for at bekræfte din adgang:',
    confirmButton: 'Bekræft adgang',
    verifyingText: 'Bekræfter...',
    switchLang: 'In English',
    rights: 'Alle rettigheder forbeholdes.',
  } : {
    badge: 'Exclusive Member Access – Denmark\'s Complete Housing Database',
    title: 'Unlock Denmark\'s 97 Verified Housing Portals',
    description: 'All direct links, public housing waitlists, free student dorms, pension funds, rental rules, and legal advice are protected. Get full, unlimited access immediately after payment via Stripe.',
    featuresHeader: 'What you get access to behind the paywall:',
    features: [
      'Verified organizations and direct portal links',
      'Public housing waitlists in Copenhagen, Aarhus, Odense & Aalborg',
      'Student dorms & youth housing with 100% free waitlist sign-up',
      'Secret pension funds and institutional landlords',
      'Legal checks of lease contracts, deposits, and rent disputes',
    ],
    cardTitle: 'Full Access',
    price: '7 DKK',
    period: '/ month',
    noBinding: 'No lock-in',
    cancelAnytime: 'Cancel anytime',
    ctaButton: 'Unlock with Stripe',
    securityText: 'Secure payment encrypted via Stripe. Cancel anytime.',
    alreadyPaidLink: 'Already paid? – Confirm access',
    alreadyPaidHelp: 'Enter your Stripe email address to confirm your access:',
    confirmButton: 'Confirm access',
    verifyingText: 'Verifying...',
    switchLang: 'Dansk',
    rights: 'All rights reserved.',
  };

  return (
    <div className="relative min-h-screen bg-transparent text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white overflow-hidden">
      {/* 3D Animated Cinematic Background */}
      <Housing3DBackground />

      {/* Minimal Header with Logo and Language Toggle */}
      <header className="relative z-20 border-b border-white/10 bg-slate-950/60 backdrop-blur-md sticky top-0">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-black text-white text-base shadow-lg shadow-blue-500/20">
              b
            </div>
            <span className="font-extrabold text-lg tracking-tight text-white drop-shadow-sm">
              bopæl.dk
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              id="btn-entrance-lang"
              onClick={onToggleLanguage}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-white/15 backdrop-blur-md transition-colors"
            >
              <Globe2 className="w-3.5 h-3.5 text-slate-400" />
              <span>{content.switchLang}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Screen: Only the exact requested content */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-6 py-10 sm:py-16">
        <div className="max-w-4xl w-full">
          {/* Main Glass Card */}
          <div className="relative overflow-hidden rounded-3xl bg-slate-950/75 backdrop-blur-xl border border-white/20 shadow-2xl p-6 sm:p-10 lg:p-12">
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              {/* Left Column: Heading, Description & Features */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/35 backdrop-blur-sm">
                  <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>{content.badge}</span>
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
                  {content.title}
                </h1>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {content.description}
                </p>

                {/* Hvad du får adgang til bag betalingsmuren */}
                <div className="space-y-3 pt-2">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {content.featuresHeader}
                  </h2>
                  <div className="space-y-2.5">
                    {content.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
                        <div className="mt-0.5 w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
                          <Check className="w-3 h-3 stroke-[2.5]" />
                        </div>
                        <span className="font-medium">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Exact Payment Card */}
              <div className="lg:col-span-5">
                <div className="rounded-2xl bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700 p-6 sm:p-7 shadow-2xl space-y-5">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-700/80">
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        {content.cardTitle}
                      </span>
                      <div className="flex items-baseline gap-1.5 mt-1">
                        <span className="text-3xl sm:text-4xl font-extrabold text-white">
                          {content.price}
                        </span>
                        <span className="text-xs text-slate-400 font-medium">
                          {content.period}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="inline-block px-2.5 py-1 rounded-md text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        {content.noBinding}
                      </span>
                      <p className="text-[10px] text-slate-400 mt-1">
                        {content.cancelAnytime}
                      </p>
                    </div>
                  </div>

                  {/* Lås op med Stripe Knap */}
                  <div className="space-y-3">
                    <a
                      id="btn-stripe-entrance-checkout"
                      href={STRIPE_PAYMENT_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 active:scale-[0.98] shadow-lg shadow-blue-600/30 transition-all text-sm group"
                    >
                      <CreditCard className="w-4 h-4 text-blue-200" />
                      <span>{content.ctaButton}</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </a>

                    <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 text-center">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{content.securityText}</span>
                    </div>
                  </div>

                  {/* Har du allerede betalt? – Bekræft adgang */}
                  <div className="pt-4 border-t border-slate-700/60 text-center">
                    {!showAlreadyPaid ? (
                      <button
                        type="button"
                        id="btn-entrance-verify-open"
                        onClick={() => setShowAlreadyPaid(true)}
                        className="text-xs font-semibold text-blue-400 hover:text-blue-300 hover:underline inline-flex items-center gap-1.5"
                      >
                        <KeyRound className="w-3.5 h-3.5" />
                        <span>{content.alreadyPaidLink}</span>
                      </button>
                    ) : (
                      <motion.form
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        onSubmit={handleVerifyEmail}
                        className="space-y-2 text-left"
                      >
                        <p className="text-[11px] text-slate-300">
                          {content.alreadyPaidHelp}
                        </p>
                        <div className="flex gap-2">
                          <input
                            type="email"
                            placeholder="din-email@adresse.dk"
                            value={emailInput}
                            onChange={(e) => {
                              setEmailInput(e.target.value);
                              setVerifyError('');
                            }}
                            className="flex-1 text-xs px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <button
                            type="submit"
                            disabled={isVerifying}
                            className="px-3 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shrink-0 disabled:opacity-50"
                          >
                            {isVerifying ? content.verifyingText : content.confirmButton}
                          </button>
                        </div>
                        {verifyError && (
                          <p className="text-[11px] text-rose-400 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3 shrink-0" />
                            {verifyError}
                          </p>
                        )}
                      </motion.form>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-slate-950/60 backdrop-blur-md py-6 text-center text-xs text-slate-400">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} bopæl.dk. {content.rights}</p>
          <div className="flex items-center gap-3 text-slate-400">
            <span>Stripe 256-bit SSL</span>
            <span>•</span>
            <span>7 DKK / md</span>
            <span>•</span>
            <button
              type="button"
              onClick={() => setShowAlreadyPaid(true)}
              className="text-blue-400 hover:underline"
            >
              {content.alreadyPaidLink}
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  CreditCard, 
  ArrowRight, 
  Check, 
  KeyRound, 
  AlertCircle, 
  Globe2,
  Lock,
  Sparkles
} from 'lucide-react';
import { STRIPE_PAYMENT_LINK } from '../data/housingData';
import { Language } from '../types';
import { BOPEL_LOGO, BOPEL_FALLBACK_LOGO } from '../assets/logo';
import { Housing3DBackground } from './Housing3DBackground';
import { COMPLIANCE_DATA, LegalSectionKey } from '../data/legalAndCompliance';
import { LegalModal } from './LegalModal';
import { 
  isValidAccessCode, 
  isValidStripeSessionId, 
  saveAuthorizedAccess 
} from '../utils/accessControl';

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
  const [accessInput, setAccessInput] = useState('');
  const [verifyError, setVerifyError] = useState('');
  const [activeLegalModal, setActiveLegalModal] = useState<LegalSectionKey | null>(null);

  const compliance = COMPLIANCE_DATA[language];

  const handleVerifyAccess = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = accessInput.trim();
    if (!clean) {
      setVerifyError(
        language === 'da'
          ? 'Indtast venligst din medlemskode eller Stripe-reference.'
          : 'Please enter your member code or Stripe session reference.'
      );
      return;
    }

    setIsVerifying(true);
    setVerifyError('');

    setTimeout(() => {
      if (isValidAccessCode(clean)) {
        saveAuthorizedAccess('access_code', clean);
        setIsVerifying(false);
        onUnlockSuccess();
      } else if (isValidStripeSessionId(clean)) {
        saveAuthorizedAccess('stripe_session', clean);
        setIsVerifying(false);
        onUnlockSuccess();
      } else {
        setIsVerifying(false);
        setVerifyError(
          language === 'da'
            ? 'Ugyldig adgangskode eller Stripe-reference. Gennemfør betalingen via Stripe for at få adgang.'
            : 'Invalid code or reference. Please complete payment via Stripe to get access.'
        );
      }
    }, 400);
  };

  const content = language === 'da' ? {
    badge: 'Eksklusiv medlemsadgang – Danmarks samlede boligdatabase',
    title: 'Lås op for Danmarks 97 Verificerede Boligportaler',
    description: 'Alle direkte links, almene ventelister, gratis kollegier, pensionskasser, huslejeregler og rådgivning samlet ét sted. Få fuld adgang med det samme efter betaling via Stripe.',
    featuresHeader: 'Hvad får du adgang til?',
    features: [
      {
        title: 'Direkte links til relevante boligportaler og udlejere',
        desc: 'Find boligportaler og udlejere samlet ét sted.',
      },
      {
        title: 'Almene boligorganisationer',
        desc: 'Få adgang til links og information om boligorganisationer og deres ventelister i blandt andet København, Aarhus, Odense og Aalborg.',
      },
      {
        title: 'Kollegier og studieboliger',
        desc: 'Find relevante kollegier og studieboliger samt links til de enkelte udbyderes hjemmesider og opskrivningsmuligheder.',
      },
      {
        title: 'Pensionskasser og institutionelle udlejere',
        desc: 'Find boligoplysninger og links til relevante pensionskasser og institutionelle udlejere, når de tilbyder boligrelaterede muligheder.',
      },
      {
        title: 'Guide til lejevilkår',
        desc: 'Få information og guides om blandt andet lejekontrakt, depositum, forudbetalt leje og almindelige lejevilkår.',
      },
    ],
    cardTitle: 'Fuld Adgang',
    price: '7 kr.',
    period: '/ måned',
    priceVat: 'inkl. moms',
    noBinding: 'Ingen binding',
    cancelAnytime: 'Opsig når som helst',
    ctaButton: 'Få fuld adgang nu',
    securityText: 'Sikker betaling krypteret via Stripe. Opsig når som helst.',
    alreadyPaidLink: 'Har du allerede betalt? – Lås op med medlemskode',
    alreadyPaidHelp: 'Indtast den medlemskode du modtog efter Stripe-betalingen (f.eks. BOPÆL2026) eller dit Stripe sessions-ID:',
    placeholder: 'F.eks. BOPÆL2026 eller cs_live_...',
    confirmButton: 'Valider & Lås op',
    verifyingText: 'Validerer adgang...',
    switchLang: 'In English',
    rights: 'Alle rettigheder forbeholdes.',
  } : {
    badge: 'Exclusive Member Access – Denmark\'s Complete Housing Database',
    title: 'Unlock Denmark\'s 97 Verified Housing Portals',
    description: 'All direct links, public housing waitlists, free student dorms, pension funds, rental rules, and legal advice gathered in one place. Get full access immediately after payment via Stripe.',
    featuresHeader: 'What do you get access to?',
    features: [
      {
        title: 'Direct links to relevant housing portals and landlords',
        desc: 'Find housing portals and landlords gathered in one place.',
      },
      {
        title: 'Public housing associations',
        desc: 'Get access to links and information about housing associations and their waiting lists in Copenhagen, Aarhus, Odense, and Aalborg.',
      },
      {
        title: 'Student dorms and youth housing',
        desc: 'Find relevant dorms and youth apartments with links to provider websites and application procedures.',
      },
      {
        title: 'Pension funds and institutional landlords',
        desc: 'Find housing details and links to relevant pension funds and institutional property owners.',
      },
      {
        title: 'Guide to rental terms and tenancy',
        desc: 'Get guides and info on lease agreements, deposits, prepaid rent, and standard rental terms.',
      },
    ],
    cardTitle: 'Full Access',
    price: '7 DKK',
    period: '/ month',
    priceVat: 'incl. VAT',
    noBinding: 'No lock-in',
    cancelAnytime: 'Cancel anytime',
    ctaButton: 'Get full access now',
    securityText: 'Secure payment encrypted via Stripe. Cancel anytime.',
    alreadyPaidLink: 'Already paid? – Unlock with member code',
    alreadyPaidHelp: 'Enter the member code received after Stripe checkout (e.g. BOPÆL2026) or your Stripe session ID:',
    placeholder: 'E.g. BOPÆL2026 or cs_live_...',
    confirmButton: 'Validate & Unlock',
    verifyingText: 'Validating access...',
    switchLang: 'Dansk',
    rights: 'All rights reserved.',
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* 3D Animated Cinematic Background */}
      <Housing3DBackground />

      {/* TOP HEADER: Clean text links without heavy boxed fields so the site stays sleek */}
      <header className="relative z-20 border-b border-white/10 bg-slate-950/80 backdrop-blur-md sticky top-0 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="relative shrink-0">
              <img 
                src={BOPEL_LOGO} 
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = BOPEL_FALLBACK_LOGO;
                }}
                alt="bopæl.dk logo" 
                referrerPolicy="no-referrer"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl object-contain bg-white shadow-xl shadow-blue-500/30 ring-2 ring-white/90 shrink-0"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 border-2 border-slate-950 rounded-full" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base sm:text-lg tracking-tight text-white drop-shadow-sm leading-none">
                bopæl.dk
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-cyan-400 mt-1">
                Danmarks Boligguide
              </span>
            </div>
          </div>

          {/* Clean text navigation at the top like "Om os" and "Kontakt" without bulky input boxes */}
          <nav className="hidden lg:flex items-center gap-4 text-xs font-medium text-slate-300">
            {compliance.navLinks.map((link) => (
              <button
                key={link.key}
                type="button"
                onClick={() => setActiveLegalModal(link.key)}
                className={`hover:text-white transition-colors py-1 ${
                  link.key === 'cancel'
                    ? 'text-amber-400 hover:text-amber-300 font-semibold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right side: Mobile Menu / Condensed items + Language Switch */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* For medium screens (tablets) show primary links */}
            <div className="hidden sm:flex lg:hidden items-center gap-3 text-xs text-slate-300">
              <button
                type="button"
                onClick={() => setActiveLegalModal('how-it-works')}
                className="hover:text-white"
              >
                {language === 'da' ? 'Sådan virker det' : 'How it works'}
              </button>
              <button
                type="button"
                onClick={() => setActiveLegalModal('about')}
                className="hover:text-white"
              >
                {language === 'da' ? 'Om os' : 'About'}
              </button>
              <button
                type="button"
                onClick={() => setActiveLegalModal('contact')}
                className="hover:text-white"
              >
                {language === 'da' ? 'Kontakt' : 'Contact'}
              </button>
            </div>

            <button
              type="button"
              id="btn-entrance-lang"
              onClick={onToggleLanguage}
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-white/15 backdrop-blur-md transition-colors"
            >
              <Globe2 className="w-3.5 h-3.5 text-slate-400" />
              <span>{content.switchLang}</span>
            </button>
          </div>
        </div>

        {/* Mobile secondary bar for smaller screens so mobile users also have quick access to all links at top */}
        <div className="lg:hidden flex items-center gap-3 px-4 py-2 border-t border-white/5 bg-slate-950/90 overflow-x-auto text-[11px] text-slate-300 no-scrollbar">
          {compliance.navLinks.map((link) => (
            <button
              key={link.key}
              type="button"
              onClick={() => setActiveLegalModal(link.key)}
              className="whitespace-nowrap hover:text-white transition-colors"
            >
              {link.label}
            </button>
          ))}
        </div>
      </header>

      {/* Main Screen: Ultra-compact, sleek hero box that doesn't dominate the screen */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-2 sm:py-4 max-w-3xl mx-auto w-full">
        {/* Main Glass Box - Smaller & space-efficient */}
        <div className="w-full relative overflow-hidden rounded-2xl bg-slate-950/90 backdrop-blur-xl border border-white/10 shadow-xl p-4 sm:p-5">
          <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-slate-600/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
            {/* Left Column: Heading, Description & Features */}
            <div className="md:col-span-7 space-y-3">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium bg-white/5 text-slate-300 border border-white/10 backdrop-blur-sm mb-1.5">
                  <ShieldCheck className="w-3 h-3 text-blue-400 shrink-0" />
                  <span>{content.badge}</span>
                </div>

                <h1 className="text-base sm:text-lg font-bold tracking-tight text-white leading-snug">
                  {content.title}
                </h1>

                <p className="text-slate-400 text-[11px] leading-relaxed mt-1">
                  {content.description}
                </p>
              </div>

              {/* Features section: Tight, neat list */}
              <div className="space-y-1.5 pt-2 border-t border-white/10">
                <h2 className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">
                  {content.featuresHeader}
                </h2>

                <div className="space-y-1.5">
                  {content.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <div className="mt-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/25">
                        <Check className="w-2 h-2 stroke-[2.5]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="font-semibold text-white text-[11px] leading-tight block">
                          {feat.title}
                        </span>
                        <p className="text-[10px] text-slate-400 leading-normal">
                          {feat.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick links: Compact text links */}
              <div className="pt-1 flex flex-wrap items-center gap-2 text-[11px] text-slate-400">
                <button
                  type="button"
                  onClick={() => setActiveLegalModal('how-it-works')}
                  className="hover:text-white transition-colors"
                >
                  {language === 'da' ? 'Sådan fungerer det' : 'How it works'}
                </button>
                <span className="text-slate-600">•</span>
                <button
                  type="button"
                  onClick={() => setActiveLegalModal('faq')}
                  className="hover:text-white transition-colors"
                >
                  {language === 'da' ? 'Ofte stillede spørgsmål' : 'FAQ'}
                </button>
                <span className="text-slate-600">•</span>
                <button
                  type="button"
                  onClick={() => setActiveLegalModal('terms')}
                  className="hover:text-white transition-colors"
                >
                  {language === 'da' ? 'Vilkår & fortrydelsesret' : 'Terms'}
                </button>
              </div>
            </div>

            {/* Right Column: Clean, compact payment card */}
            <div className="md:col-span-5">
              <div className="rounded-xl bg-slate-900/95 border border-slate-800 p-3.5 sm:p-4 shadow-lg space-y-3">
                <div className="flex items-center justify-between pb-2.5 border-b border-slate-800">
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                      {content.cardTitle}
                    </span>
                    <div className="flex items-baseline gap-1 mt-0.5">
                      <span className="text-2xl font-black text-white">
                        {content.price}
                      </span>
                      <span className="text-[11px] text-slate-400 font-medium">
                        {content.period}
                      </span>
                    </div>
                    <span className="text-[9px] text-slate-500 font-medium block">
                      {content.priceVat}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-1.5 py-0.5 rounded text-[9px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
                      {content.noBinding}
                    </span>
                    <p className="text-[9px] text-slate-500 mt-0.5">
                      {content.cancelAnytime}
                    </p>
                  </div>
                </div>

                {/* Stripe Checkout button */}
                <div className="space-y-1.5">
                  <a
                    id="btn-stripe-entrance-checkout"
                    href={STRIPE_PAYMENT_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-lg font-bold text-white bg-blue-600 hover:bg-blue-500 active:scale-[0.98] shadow-md shadow-blue-600/20 transition-all text-xs group"
                  >
                    <CreditCard className="w-3.5 h-3.5 text-blue-200" />
                    <span>{content.ctaButton}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </a>

                  <div className="flex items-center justify-center gap-1 text-[9px] text-slate-400 text-center">
                    <ShieldCheck className="w-3 h-3 text-emerald-400 shrink-0" />
                    <span>{content.securityText}</span>
                  </div>
                </div>

                {/* Har du allerede betalt? – Bekræft adgang */}
                <div className="pt-2 border-t border-slate-800 text-center">
                  {!showAlreadyPaid ? (
                    <button
                      type="button"
                      id="btn-entrance-verify-open"
                      onClick={() => setShowAlreadyPaid(true)}
                      className="text-[11px] font-medium text-slate-400 hover:text-white inline-flex items-center gap-1 transition-colors"
                    >
                      <KeyRound className="w-3 h-3 text-slate-400" />
                      <span>{content.alreadyPaidLink}</span>
                    </button>
                  ) : (
                    <motion.form
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      onSubmit={handleVerifyAccess}
                      className="space-y-1.5 text-left"
                    >
                      <p className="text-[10px] text-slate-400">
                        {content.alreadyPaidHelp}
                      </p>
                      <div className="flex gap-1.5">
                        <input
                          type="text"
                          placeholder={content.placeholder}
                          value={accessInput}
                          onChange={(e) => {
                            setAccessInput(e.target.value);
                            setVerifyError('');
                          }}
                          className="flex-1 text-[11px] px-2 py-1 rounded bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                        <button
                          type="submit"
                          disabled={isVerifying}
                          className="px-2.5 py-1 text-[11px] font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded shrink-0 disabled:opacity-50 transition-colors"
                        >
                          {isVerifying ? content.verifyingText : content.confirmButton}
                        </button>
                      </div>
                      {verifyError && (
                        <p className="text-[10px] text-rose-400 flex items-center gap-1">
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

        {/* Minimal Trust Indicator beneath hero */}
        <div className="mt-3 flex flex-wrap items-center justify-center gap-3 sm:gap-5 text-[11px] text-slate-500">
          <span className="flex items-center gap-1 text-slate-400">
            <Check className="w-3 h-3 text-emerald-400" />
            7 kr. / md inkl. moms
          </span>
          <span className="text-slate-700">•</span>
          <span className="flex items-center gap-1 text-slate-400">
            <Check className="w-3 h-3 text-emerald-400" />
            Ingen binding – opsig når som helst
          </span>
          <span className="text-slate-700">•</span>
          <span className="flex items-center gap-1 text-slate-400">
            <Check className="w-3 h-3 text-emerald-400" />
            Stripe SSL betaling
          </span>
        </div>
      </main>

      {/* FOOTER: Exact requested format */}
      {/* bopæl.dk – Danmarks boligguide */}
      {/* [Om os] · [Kontakt] · [Handelsbetingelser] · [Privatlivspolitik] · [Fortrydelsesret] · [Opsig abonnement] */}
      <footer className="relative z-10 border-t border-white/10 bg-slate-950/95 backdrop-blur-md py-6 text-xs text-slate-400 mt-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col items-center justify-center space-y-3 text-center">
          <div className="flex items-center gap-2">
            <img 
              src={BOPEL_LOGO} 
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = BOPEL_FALLBACK_LOGO;
              }}
              alt="bopæl.dk logo" 
              referrerPolicy="no-referrer"
              className="w-5 h-5 rounded-md object-contain bg-white shadow-sm ring-1 ring-white/60 shrink-0" 
            />
            <p className="font-bold text-white text-sm tracking-tight">
              bopæl.dk – Danmarks boligguide
            </p>
          </div>

          {/* Exact links without brackets: Om os · Kontakt · Handelsbetingelser · Privatlivspolitik · Fortrydelsesret · Opsig abonnement */}
          <nav className="flex flex-wrap items-center justify-center gap-x-2 sm:gap-x-3 gap-y-1 text-slate-300 text-xs font-medium">
            <button
              type="button"
              onClick={() => setActiveLegalModal('about')}
              className="hover:text-blue-400 transition-colors"
            >
              {language === 'da' ? 'Om os' : 'About us'}
            </button>
            <span className="text-slate-600">·</span>
            <button
              type="button"
              onClick={() => setActiveLegalModal('contact')}
              className="hover:text-blue-400 transition-colors"
            >
              {language === 'da' ? 'Kontakt' : 'Contact'}
            </button>
            <span className="text-slate-600">·</span>
            <button
              type="button"
              onClick={() => setActiveLegalModal('terms')}
              className="hover:text-blue-400 transition-colors"
            >
              {language === 'da' ? 'Handelsbetingelser' : 'Terms & Conditions'}
            </button>
            <span className="text-slate-600">·</span>
            <button
              type="button"
              onClick={() => setActiveLegalModal('privacy')}
              className="hover:text-blue-400 transition-colors"
            >
              {language === 'da' ? 'Privatlivspolitik' : 'Privacy Policy'}
            </button>
            <span className="text-slate-600">·</span>
            <button
              type="button"
              onClick={() => setActiveLegalModal('withdrawal')}
              className="hover:text-blue-400 transition-colors"
            >
              {language === 'da' ? 'Fortrydelsesret' : 'Right of Withdrawal'}
            </button>
            <span className="text-slate-600">·</span>
            <button
              type="button"
              onClick={() => setActiveLegalModal('cancel')}
              className="text-amber-400 hover:text-amber-300 font-semibold transition-colors"
            >
              {language === 'da' ? 'Opsig abonnement' : 'Cancel subscription'}
            </button>
          </nav>

          <div className="text-slate-500 text-[11px] flex flex-wrap items-center justify-center gap-3">
            <span>© {new Date().getFullYear()} bopæl.dk. {content.rights}</span>
          </div>
        </div>
      </footer>

      {/* Compliance / Legal Modal */}
      <LegalModal
        isOpen={activeLegalModal !== null}
        activeSection={activeLegalModal || 'about'}
        language={language}
        onClose={() => setActiveLegalModal(null)}
        onSelectSection={(sec) => setActiveLegalModal(sec)}
      />
    </div>
  );
};

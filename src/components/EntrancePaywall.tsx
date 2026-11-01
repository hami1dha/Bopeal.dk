import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Check, 
  ArrowRight, 
  Lock, 
  ShieldCheck, 
  KeyRound, 
  X, 
  AlertCircle,
  HelpCircle,
  CreditCard,
  UserCheck,
  Search
} from 'lucide-react';
import { STRIPE_PAYMENT_LINK } from '../data/housingData';
import { Language } from '../types';
import { BOPEL_LOGO, BOPEL_FALLBACK_LOGO } from '../assets/logo';
import { COMPLIANCE_DATA, LegalSectionKey } from '../data/legalAndCompliance';
import { LegalModal } from './LegalModal';
import { 
  isValidAccessCode, 
  isValidStripeSessionId, 
  saveAuthorizedAccess 
} from '../utils/accessControl';
import heroArchitectureImg from '../assets/images/danish_housing_architecture_1793555190483.jpg';

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
  const [showMemberModal, setShowMemberModal] = useState(false);
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
        setShowMemberModal(false);
        onUnlockSuccess();
      } else if (isValidStripeSessionId(clean)) {
        saveAuthorizedAccess('stripe_session', clean);
        setIsVerifying(false);
        setShowMemberModal(false);
        onUnlockSuccess();
      } else {
        setIsVerifying(false);
        setVerifyError(
          language === 'da'
            ? 'Ugyldig kode eller Stripe-reference. Gennemfør venligst betalingen for at få adgang.'
            : 'Invalid code or reference. Please complete payment to get access.'
        );
      }
    }, 400);
  };

  const content = language === 'da' ? {
    topSecurity: 'Sikker betaling',
    topAlreadyPaid: 'Har du allerede betalt?',
    topMemberBtn: 'Medlemsadgang',
    heroTitle: 'FULD ADGANG TIL DANMARKS BOLIGOVERSIGT – Alt ét sted',
    heroDesc: 'Dine nøgler til boligmarkedet: Find nemt boligportaler, almene ventelister, kollegier og meget mere. Spar tid og penge, mens du leder.',
    ctaBtn: 'FÅ FULD ADGANG NU – 7 kr. / måned',
    ctaSubtext: 'Uden binding, ingen skjulte gebyrer',
    features: [
      {
        title: 'OFFICIELLE HJEMMESIDER',
        desc: 'Find direkte hjemmesider til alle relevante boligportaler og udlejere ét sted.',
      },
      {
        title: 'ALMENE BOLIGER',
        desc: 'Find nemt boligorganisationer, almene ventelister, kollegier og meget mere.',
      },
      {
        title: 'STUDIEBOLIGER',
        desc: 'Find alle kollegier og studieboliger samt officielle hjemmesider og opskrivningsmuligheder.',
      },
      {
        title: 'LEJEVILKÅR & GUIDE',
        desc: 'Få information og guides om blandt andet lejekontrakt, forudbetalt leje og almindelige lejevilkår.',
      },
    ],
    howItWorksTitle: 'SÅDAN FUNGERER DET',
    steps: [
      { num: '1', title: '1. Betal 7 kr.' },
      { num: '2', title: '2. Log ind' },
      { num: '3', title: '3. Find din bolig' },
    ],
    memberModalTitle: 'Log ind med medlemsadgang',
    memberModalHelp: 'Indtast den medlemskode du modtog efter din Stripe-betaling (f.eks. BOPÆL2026) eller dit Stripe sessions-ID:',
    memberPlaceholder: 'F.eks. BOPÆL2026 eller cs_live_...',
    memberSubmit: 'Valider & Lås op',
    memberVerifying: 'Validerer adgang...',
    switchLang: 'IN ENGLISH',
    rights: 'Alle rettigheder forbeholdes.',
  } : {
    topSecurity: 'Secure payment',
    topAlreadyPaid: 'Already a member?',
    topMemberBtn: 'Member access',
    heroTitle: 'FULL ACCESS TO DENMARK\'S HOUSING DIRECTORY – All in one place',
    heroDesc: 'Your keys to the rental market: Easily find housing portals, public waitlists, student dorms, and more. Save time and money while you search.',
    ctaBtn: 'GET FULL ACCESS NOW – 7 DKK / month',
    ctaSubtext: 'No lock-in, zero hidden fees',
    features: [
      {
        title: 'OFFICIAL WEBSITES',
        desc: 'Find official websites for all relevant rental portals and landlords in one single directory.',
      },
      {
        title: 'PUBLIC HOUSING',
        desc: 'Easily find social housing associations, public waiting lists, and family homes.',
      },
      {
        title: 'STUDENT HOUSING',
        desc: 'Find all student dorms, youth housing, official provider websites, and application procedures.',
      },
      {
        title: 'LEGAL GUIDE & TERMS',
        desc: 'Get expert guidance on Danish tenancy law, lease contracts, deposits, and rent rules.',
      },
    ],
    howItWorksTitle: 'HOW IT WORKS',
    steps: [
      { num: '1', title: '1. Pay 7 DKK' },
      { num: '2', title: '2. Log in' },
      { num: '3', title: '3. Find your home' },
    ],
    memberModalTitle: 'Log in with member access',
    memberModalHelp: 'Enter the member code received after your Stripe checkout (e.g. BOPÆL2026) or your Stripe session ID:',
    memberPlaceholder: 'E.g. BOPÆL2026 or cs_live_...',
    memberSubmit: 'Validate & Unlock',
    memberVerifying: 'Validating access...',
    switchLang: 'DANSK',
    rights: 'All rights reserved.',
  };

  return (
    <div className="min-h-screen bg-[#07152b] text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      
      {/* 1. TOP UTILITY BAR (matches screenshot: Sikker betaling | Har du allerede betalt? Medlemsadgang) */}
      <div className="bg-[#050f1f] border-b border-white/10 text-xs py-2 px-4 sm:px-6 z-30">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3 text-[11px] sm:text-xs">
          {/* Left: Sikker betaling */}
          <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
            <div className="w-3.5 h-3.5 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
              <Check className="w-2.5 h-2.5 text-emerald-400 stroke-[3]" />
            </div>
            <span className="text-slate-300 font-semibold">{content.topSecurity}</span>
          </div>

          {/* Right: Har du allerede betalt? Medlemsadgang */}
          <div className="flex items-center gap-2 text-slate-300">
            <span className="hidden sm:inline text-slate-400 flex items-center gap-1">
              <KeyRound className="w-3 h-3 text-amber-400 inline" />
              {content.topAlreadyPaid}
            </span>
            <button
              type="button"
              id="btn-top-member-access"
              onClick={() => {
                setVerifyError('');
                setShowMemberModal(true);
              }}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#0f2444] hover:bg-[#163666] text-white border border-white/15 text-[11px] font-semibold transition-colors shadow-xs"
            >
              <KeyRound className="w-3 h-3 text-amber-400 sm:hidden" />
              <span>{content.topMemberBtn}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER (Logo, Om os, Kontakt, FAQ, IN ENGLISH) */}
      <header className="bg-[#0b1d3a] border-b border-white/10 sticky top-0 z-20 shadow-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="relative shrink-0">
              <img 
                src={BOPEL_LOGO} 
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = BOPEL_FALLBACK_LOGO;
                }}
                alt="bopæl.dk logo" 
                referrerPolicy="no-referrer"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl object-contain bg-white shadow-md ring-2 ring-white/90 shrink-0 p-1"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base sm:text-lg tracking-tight text-white leading-none">
                bopæl.dk
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-cyan-400 mt-1">
                Danmarks Boligguide
              </span>
            </div>
          </div>

          {/* Nav links on right */}
          <div className="flex items-center gap-4 sm:gap-6">
            <nav className="flex items-center gap-3 sm:gap-5 text-xs font-bold uppercase tracking-wider text-slate-200">
              <button
                type="button"
                onClick={() => setActiveLegalModal('about')}
                className="hover:text-cyan-400 transition-colors py-1"
              >
                {language === 'da' ? 'Om os' : 'About'}
              </button>
              <button
                type="button"
                onClick={() => setActiveLegalModal('contact')}
                className="hover:text-cyan-400 transition-colors py-1"
              >
                {language === 'da' ? 'Kontakt' : 'Contact'}
              </button>
              <button
                type="button"
                onClick={() => setActiveLegalModal('faq')}
                className="hover:text-cyan-400 transition-colors py-1"
              >
                FAQ
              </button>
            </nav>

            {/* Coral Language Toggle Pill: IN ENGLISH */}
            <button
              type="button"
              id="btn-lang-toggle-top"
              onClick={onToggleLanguage}
              className="px-3 py-1.5 rounded-md text-[11px] font-extrabold uppercase tracking-wider text-white bg-[#e76f51] hover:bg-[#d95537] active:scale-95 transition-all shadow-md shrink-0"
            >
              {content.switchLang}
            </button>
          </div>
        </div>
      </header>

      {/* 3. HERO IMAGE SECTION (Danish architecture, balconies, bikes, NO people) */}
      <section className="relative w-full overflow-hidden bg-slate-900">
        <div className="relative w-full h-[320px] sm:h-[400px] md:h-[460px] max-w-6xl mx-auto overflow-hidden">
          <img
            src={heroArchitectureImg}
            alt="Moderne danske boliger og lejligheder i København"
            className="w-full h-full object-cover object-[center_45%]"
          />

          {/* Dark gradient overlay for crystal clear headline readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b1d3a] via-[#0b1d3a]/60 to-transparent sm:bg-gradient-to-r sm:from-[#0b1d3a]/90 sm:via-[#0b1d3a]/50 sm:to-transparent flex flex-col justify-end p-5 sm:p-8 md:p-10" />

          {/* Bold Headline matching design */}
          <div className="absolute bottom-5 sm:bottom-8 left-5 sm:left-8 max-w-xl z-10">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-black uppercase text-white tracking-tight leading-[1.12] drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
              {content.heroTitle}
            </h1>
          </div>
        </div>
      </section>

      {/* 4. DEEP NAVY BLUE VALUE PROPOSITION & CTA SECTION */}
      <section className="bg-[#0b1d3a] px-4 sm:px-6 pt-6 pb-8 sm:pb-10 border-b border-white/10 text-center sm:text-left">
        <div className="max-w-4xl mx-auto space-y-6">
          <p className="text-sm sm:text-base md:text-lg text-slate-100 font-medium leading-relaxed max-w-3xl">
            {content.heroDesc}
          </p>

          <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4 sm:gap-6 pt-2">
            {/* Emerald CTA Button */}
            <a
              id="btn-stripe-cta-main"
              href={STRIPE_PAYMENT_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-black text-sm sm:text-base text-white bg-[#10b981] hover:bg-[#059669] active:scale-[0.98] shadow-lg shadow-emerald-600/30 uppercase tracking-wide transition-all group"
            >
              <span>{content.ctaBtn}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>

            {/* Subtext beside CTA */}
            <span className="text-xs sm:text-sm text-slate-300 font-medium flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-400 stroke-[2.5]" />
              {content.ctaSubtext}
            </span>
          </div>
        </div>
      </section>

      {/* 5. WHITE CARD WITH 4 FEATURE CATEGORIES (2x2 Grid with Danish illustrated icons) */}
      <section className="bg-[#07152b] px-4 sm:px-6 pt-4 pb-12">
        <div className="max-w-4xl mx-auto bg-white text-slate-900 rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100">
            
            {/* Feature 1: DIREKTE LINKS */}
            <div className="p-6 sm:p-7 flex items-start gap-4">
              <div className="shrink-0 w-14 h-14 rounded-2xl bg-sky-50 flex items-center justify-center border border-sky-100 shadow-xs">
                {/* Custom Illustrated Magnifying Glass with Link */}
                <svg className="w-8 h-8" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="16" cy="16" r="10" stroke="#0284c7" strokeWidth="2.5" fill="#e0f2fe" />
                  <path d="M23 23L31 31" stroke="#f43f5e" strokeWidth="3" strokeLinecap="round" />
                  {/* Chain link icon inside glass */}
                  <path d="M13 18a3 3 0 0 1 0-4.24l1.41-1.42a3 3 0 0 1 4.25 0" stroke="#0369a1" strokeWidth="2" strokeLinecap="round" />
                  <path d="M19 14a3 3 0 0 1 0 4.24l-1.41 1.42a3 3 0 0 1-4.25 0" stroke="#0369a1" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900 uppercase tracking-tight">
                  {content.features[0].title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                  {content.features[0].desc}
                </p>
              </div>
            </div>

            {/* Feature 2: ALMENE BOLIGER */}
            <div className="p-6 sm:p-7 flex items-start gap-4">
              <div className="shrink-0 w-14 h-14 rounded-2xl bg-rose-50 flex items-center justify-center border border-rose-100 shadow-xs">
                {/* Custom Illustrated Brick Apartment Building */}
                <svg className="w-8 h-8" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="7" y="6" width="22" height="24" rx="2" fill="#ffe4e6" stroke="#e11d48" strokeWidth="2" />
                  {/* Windows */}
                  <rect x="11" y="9" width="4" height="4" rx="0.5" fill="#0284c7" />
                  <rect x="21" y="9" width="4" height="4" rx="0.5" fill="#0284c7" />
                  <rect x="11" y="16" width="4" height="4" rx="0.5" fill="#0284c7" />
                  <rect x="21" y="16" width="4" height="4" rx="0.5" fill="#0284c7" />
                  {/* Entrance Door */}
                  <rect x="15" y="23" width="6" height="7" rx="1" fill="#475569" stroke="#334155" strokeWidth="1.5" />
                  <circle cx="19.5" cy="26.5" r="0.75" fill="#facc15" />
                </svg>
              </div>
              <div>
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900 uppercase tracking-tight">
                  {content.features[1].title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                  {content.features[1].desc}
                </p>
              </div>
            </div>

            {/* Feature 3: STUDIEBOLIGER */}
            <div className="p-6 sm:p-7 flex items-start gap-4">
              <div className="shrink-0 w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center border border-emerald-100 shadow-xs">
                {/* Custom Illustrated Students with Graduation Cap & Books */}
                <svg className="w-8 h-8" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Student 1 */}
                  <circle cx="12" cy="14" r="3.5" fill="#fcd34d" stroke="#d97706" strokeWidth="1.5" />
                  <path d="M6 25c0-3.5 2.5-6 6-6s6 2.5 6 6" fill="#10b981" stroke="#059669" strokeWidth="1.5" />
                  {/* Student 2 with Mortarboard */}
                  <circle cx="23" cy="15" r="3.5" fill="#fcd34d" stroke="#d97706" strokeWidth="1.5" />
                  <path d="M18 25c0-3.5 2.5-6 5.5-6s5.5 2.5 5.5 6" fill="#f43f5e" stroke="#e11d48" strokeWidth="1.5" />
                  {/* Graduation Hat */}
                  <path d="M23 7L17 10.5L23 14L29 10.5L23 7Z" fill="#1e293b" />
                  <path d="M28 11v3.5" stroke="#f59e0b" strokeWidth="1.5" />
                </svg>
              </div>
              <div>
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900 uppercase tracking-tight">
                  {content.features[2].title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                  {content.features[2].desc}
                </p>
              </div>
            </div>

            {/* Feature 4: LEJEVILKÅR & GUIDE */}
            <div className="p-6 sm:p-7 flex items-start gap-4">
              <div className="shrink-0 w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center border border-amber-100 shadow-xs">
                {/* Custom Illustrated House with Lease Document */}
                <svg className="w-8 h-8" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* House roof */}
                  <path d="M18 5L7 14h3v13h16V14h3L18 5Z" fill="#fff7ed" stroke="#ea580c" strokeWidth="2" strokeLinejoin="round" />
                  {/* Document sheet */}
                  <rect x="13" y="13" width="11" height="13" rx="1.5" fill="#ffffff" stroke="#0284c7" strokeWidth="1.5" />
                  <line x1="15.5" y1="16.5" x2="21.5" y2="16.5" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="15.5" y1="19.5" x2="21.5" y2="19.5" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="15.5" y1="22.5" x2="19.5" y2="22.5" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900 uppercase tracking-tight">
                  {content.features[3].title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                  {content.features[3].desc}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. "SÅDAN FUNGERER DET" SECTION (Clean light background with 3 steps) */}
      <section className="bg-[#f8fafc] text-slate-900 py-12 px-4 sm:px-6 border-t border-slate-200">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-base sm:text-lg font-black tracking-wider text-slate-900 uppercase">
            {content.howItWorksTitle}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4">
            
            {/* Step 1: Betal 7 kr. */}
            <div className="flex flex-col items-center p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
              <div className="w-16 h-14 rounded-xl bg-slate-50 border-2 border-slate-700 flex flex-col justify-between p-2 mb-3 shadow-xs">
                <div className="w-full flex justify-between items-center">
                  <div className="w-3 h-2 bg-amber-400 rounded-xs" />
                  <div className="flex gap-0.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block -ml-1 opacity-80" />
                  </div>
                </div>
                <div className="w-8 h-1 bg-slate-300 rounded-full" />
              </div>
              <span className="font-extrabold text-sm sm:text-base text-slate-900">
                {content.steps[0].title}
              </span>
            </div>

            {/* Step 2: Log ind */}
            <div className="flex flex-col items-center p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
              <div className="w-16 h-14 rounded-xl bg-slate-50 border-2 border-slate-700 flex items-center justify-center relative mb-3 shadow-xs">
                {/* Arrow into user icon */}
                <div className="flex items-center gap-1">
                  <ArrowRight className="w-4 h-4 text-slate-700 stroke-[2.5]" />
                  <div className="w-6 h-6 rounded-full bg-rose-100 border border-rose-400 flex items-center justify-center">
                    <span className="text-[10px] text-rose-600 font-bold">👤</span>
                  </div>
                </div>
              </div>
              <span className="font-extrabold text-sm sm:text-base text-slate-900">
                {content.steps[1].title}
              </span>
            </div>

            {/* Step 3: Find din bolig */}
            <div className="flex flex-col items-center p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
              <div className="w-16 h-14 rounded-xl bg-slate-50 border-2 border-slate-700 flex items-center justify-center relative mb-3 shadow-xs">
                {/* House with magnifying glass */}
                <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 5L6 14h3v11h14V14h3L16 5Z" fill="#ffe4e6" stroke="#e11d48" strokeWidth="2" strokeLinejoin="round" />
                  <circle cx="21" cy="21" r="5" fill="#ffffff" stroke="#10b981" strokeWidth="2.5" />
                  <line x1="24.5" y1="24.5" x2="28" y2="28" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>
              <span className="font-extrabold text-sm sm:text-base text-slate-900">
                {content.steps[2].title}
              </span>
            </div>

          </div>

          {/* Quick secondary CTA link */}
          <div className="pt-2">
            <a
              href={STRIPE_PAYMENT_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold text-emerald-600 hover:text-emerald-700 hover:underline uppercase tracking-wider"
            >
              <span>{language === 'da' ? 'Kom i gang for 7 kr. / md' : 'Start now for 7 DKK / mo'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* 7. FOOTER with all 9 compliance links */}
      <footer className="bg-[#050f1f] border-t border-white/10 text-slate-400 py-8 px-4 sm:px-6 text-xs mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col items-center justify-center space-y-4 text-center">
          
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

          {/* All 9 links */}
          <nav className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-slate-300 text-xs font-medium">
            {compliance.footer.links.map((link, idx) => (
              <React.Fragment key={link.key}>
                {idx > 0 && <span className="text-slate-600">·</span>}
                <button
                  type="button"
                  onClick={() => setActiveLegalModal(link.key)}
                  className={`hover:text-cyan-400 transition-colors ${
                    link.key === 'cancel'
                      ? 'text-amber-400 hover:text-amber-300 font-semibold'
                      : ''
                  }`}
                >
                  {link.label}
                </button>
              </React.Fragment>
            ))}
          </nav>

          <p className="text-slate-500 text-[11px] pt-1">
            © {new Date().getFullYear()} bopæl.dk. {content.rights}
          </p>
        </div>
      </footer>

      {/* 8. POPUP MODAL FOR MEMBER ACCESS ("Har du allerede betalt? Medlemsadgang") */}
      <AnimatePresence>
        {showMemberModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMemberModal(false)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="relative w-full max-w-md bg-[#0b1d3a] border border-white/20 rounded-2xl p-6 shadow-2xl z-10 space-y-4 text-white"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
                    <KeyRound className="w-4 h-4 text-amber-400" />
                  </div>
                  <h3 className="font-bold text-base text-white">
                    {content.memberModalTitle}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowMemberModal(false)}
                  className="text-slate-400 hover:text-white p-1 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {content.memberModalHelp}
              </p>

              <form onSubmit={handleVerifyAccess} className="space-y-3 pt-1">
                <div>
                  <input
                    type="text"
                    value={accessInput}
                    onChange={(e) => {
                      setAccessInput(e.target.value);
                      setVerifyError('');
                    }}
                    placeholder={content.memberPlaceholder}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#061224] border border-white/15 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:border-blue-500 shadow-inner"
                  />
                </div>

                {verifyError && (
                  <div className="flex items-center gap-1.5 text-xs text-rose-400 bg-rose-500/10 border border-rose-500/25 p-2 rounded-lg">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{verifyError}</span>
                  </div>
                )}

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowMemberModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                  >
                    {language === 'da' ? 'Annuller' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    disabled={isVerifying}
                    className="px-5 py-2 rounded-xl font-bold text-xs sm:text-sm text-white bg-blue-600 hover:bg-blue-500 active:scale-95 disabled:opacity-50 transition-all shadow-md shadow-blue-600/30"
                  >
                    {isVerifying ? content.memberVerifying : content.memberSubmit}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 9. LEGAL & COMPLIANCE MODAL */}
      {activeLegalModal && (
        <LegalModal
          isOpen={true}
          activeSection={activeLegalModal}
          language={language}
          onClose={() => setActiveLegalModal(null)}
          onSelectSection={(section) => setActiveLegalModal(section)}
        />
      )}

    </div>
  );
};

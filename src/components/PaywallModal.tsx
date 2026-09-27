import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  CreditCard, 
  ExternalLink, 
  ArrowRight, 
  KeyRound,
  Check,
  AlertCircle,
  Sparkles
} from 'lucide-react';
import { STRIPE_PAYMENT_LINK, housingCategories } from '../data/housingData';
import { translations } from '../data/translations';
import { Language } from '../types';
import { 
  isValidAccessCode, 
  isValidStripeSessionId, 
  saveAuthorizedAccess 
} from '../utils/accessControl';

interface PaywallModalProps {
  isOpen: boolean;
  language: Language;
  onUnlockSuccess: () => void;
  onClose?: () => void;
  canDismiss?: boolean;
}

export const PaywallModal: React.FC<PaywallModalProps> = ({
  isOpen,
  language,
  onUnlockSuccess,
  onClose,
  canDismiss = false,
}) => {
  const t = translations[language];
  const totalPortalsCount = housingCategories.reduce((acc, cat) => acc + cat.items.length, 0);
  const [isVerifying, setIsVerifying] = useState(false);
  const [showAlreadyPaid, setShowAlreadyPaid] = useState(false);
  const [accessInput, setAccessInput] = useState('');
  const [verifyError, setVerifyError] = useState('');

  if (!isOpen) return null;

  const handleVerifyAccess = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = accessInput.trim();
    if (!clean) {
      setVerifyError(language === 'da' ? 'Indtast venligst en gyldig kode eller reference' : 'Please enter a valid code or reference');
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
            ? 'Ugyldig adgangskode eller reference. Tjek din kvittering fra Stripe.'
            : 'Invalid code or reference. Please check your Stripe receipt.'
        );
      }
    }, 400);
  };

  return (
    <AnimatePresence>
      <div 
        id="paywall-backdrop"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-md"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative w-full max-w-2xl bg-slate-900 rounded-2xl shadow-2xl border border-slate-800 overflow-hidden my-8 text-white"
        >
          {/* Header Banner - Dark Cinematic */}
          <div className="bg-gradient-to-r from-slate-950 via-blue-950 to-slate-900 text-white p-6 sm:p-8 relative overflow-hidden border-b border-slate-800">
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-blue-500/15 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-cyan-500/15 rounded-full blur-2xl pointer-events-none" />

            {canDismiss && onClose && (
              <button
                type="button"
                onClick={onClose}
                className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 transition-colors"
                aria-label="Luk"
              >
                ✕
              </button>
            )}

            <div className="flex items-center gap-3 mb-3">
              <img 
                src="/src/assets/images/bopael_visible_icon_1790508825247.jpg" 
                alt="bopæl.dk logo" 
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-xl object-contain bg-white shadow-xl shadow-blue-500/30 ring-2 ring-white/90 shrink-0"
              />
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 backdrop-blur-xs">
                  <Lock className="w-3.5 h-3.5" />
                  {t.subscriptionActive}
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-white/10 text-slate-200">
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  {totalPortalsCount} Portaler
                </span>
              </div>
            </div>

            <h2 id="paywall-heading" className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
              {t.paywallTitle}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
              {t.paywallSubtitle}
            </p>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8 space-y-6 bg-slate-900 text-slate-200">
            {/* Feature Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {[
                t.paywallFeature1,
                t.paywallFeature2,
                t.paywallFeature3,
                t.paywallFeature4,
                t.paywallFeature5,
              ].map((feature, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-sm text-slate-200">
                  <div className="mt-0.5 w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <span className="font-medium">{feature}</span>
                </div>
              ))}
            </div>

            {/* Pricing Card & Primary CTA */}
            <div className="rounded-xl p-5 bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-0.5">
                  {language === 'da' ? 'Abonnement' : 'Subscription'}
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-extrabold text-white">7 DKK</span>
                  <span className="text-xs text-slate-400 font-medium">/ {language === 'da' ? 'måned' : 'month'}</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  {language === 'da' ? 'Ingen binding • Opsig når som helst' : 'No commitment • Cancel anytime'}
                </p>
              </div>

              {/* Main Stripe Button */}
              <a
                id="btn-stripe-checkout"
                href={STRIPE_PAYMENT_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 active:scale-[0.98] shadow-lg shadow-blue-600/30 transition-all text-sm group"
              >
                <CreditCard className="w-4 h-4 text-blue-200" />
                <span>{t.paywallCtaStripe}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>

            {/* Security Guarantee */}
            <div className="flex items-center justify-center gap-2 text-xs text-slate-400 text-center">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{t.paywallSecurity}</span>
            </div>

            <div className="border-t border-slate-800 pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              {/* Already Paid Confirmation Flow */}
              {!showAlreadyPaid ? (
                <button
                  type="button"
                  id="btn-already-paid"
                  onClick={() => setShowAlreadyPaid(true)}
                  className="text-xs font-semibold text-blue-400 hover:text-blue-300 hover:underline flex items-center gap-1"
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  {t.alreadyPaid}
                </button>
              ) : (
                <form onSubmit={handleVerifyAccess} className="w-full flex flex-col sm:flex-row gap-2 items-center justify-center">
                  <input
                    type="text"
                    placeholder={language === 'da' ? 'Adgangskode (f.eks. BOPÆL2026) eller Stripe ID' : 'Access code or Stripe ID'}
                    value={accessInput}
                    onChange={(e) => {
                      setAccessInput(e.target.value);
                      setVerifyError('');
                    }}
                    className="w-full sm:w-64 text-xs px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    disabled={isVerifying}
                    className="w-full sm:w-auto text-xs px-3.5 py-2 font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shrink-0 transition-colors disabled:opacity-50"
                  >
                    {isVerifying ? (language === 'da' ? 'Validerer...' : 'Validating...') : t.confirmAccess}
                  </button>
                </form>
              )}
            </div>

            {verifyError && (
              <p className="text-xs text-rose-600 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {verifyError}
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

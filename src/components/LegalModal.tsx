import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  FileText, 
  ShieldCheck, 
  RotateCcw, 
  Mail, 
  Info, 
  Ban, 
  CreditCard, 
  CheckCircle2, 
  Lock,
  HelpCircle,
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { Language } from '../types';
import { COMPLIANCE_DATA, LegalSectionKey } from '../data/legalAndCompliance';
import { BOPEL_LOGO, BOPEL_FALLBACK_LOGO } from '../assets/logo';
import { STRIPE_PAYMENT_LINK } from '../data/housingData';

interface LegalModalProps {
  isOpen: boolean;
  activeSection: LegalSectionKey;
  language: Language;
  onClose: () => void;
  onSelectSection: (section: LegalSectionKey) => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  activeSection,
  language,
  onClose,
  onSelectSection,
}) => {
  const [openFaqIndex, setOpenFaqIndex] = React.useState<number | null>(null);

  if (!isOpen) return null;

  const data = COMPLIANCE_DATA[language];

  const getSectionIcon = (key: LegalSectionKey) => {
    switch (key) {
      case 'how-it-works':
        return <Sparkles className="w-3.5 h-3.5" />;
      case 'subscription':
        return <CreditCard className="w-3.5 h-3.5" />;
      case 'faq':
        return <HelpCircle className="w-3.5 h-3.5" />;
      case 'about':
        return <Info className="w-3.5 h-3.5" />;
      case 'contact':
        return <Mail className="w-3.5 h-3.5" />;
      case 'terms':
        return <FileText className="w-3.5 h-3.5" />;
      case 'privacy':
        return <Lock className="w-3.5 h-3.5" />;
      case 'withdrawal':
        return <RotateCcw className="w-3.5 h-3.5" />;
      case 'cancel':
        return <Ban className="w-3.5 h-3.5" />;
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-slate-800 bg-slate-950/70 shrink-0">
            <div className="flex items-center gap-3">
              <img
                src={BOPEL_LOGO}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = BOPEL_FALLBACK_LOGO;
                }}
                alt="bopæl.dk"
                className="w-7 h-7 rounded-lg object-contain bg-white ring-1 ring-white/30"
              />
              <div>
                <h3 className="text-base font-bold text-white leading-tight">
                  bopæl.dk – Danmarks boligguide
                </h3>
                <p className="text-xs text-slate-400">
                  {language === 'da' ? 'Forbrugeroplysninger, sikkerhed & vilkår' : 'Consumer protection, security & terms'}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              aria-label="Luk"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1 px-4 py-2 border-b border-slate-800 bg-slate-950/40 overflow-x-auto text-xs shrink-0 no-scrollbar">
            {data.navLinks.map((link) => {
              const active = activeSection === link.key;
              return (
                <button
                  key={link.key}
                  type="button"
                  onClick={() => onSelectSection(link.key)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                    active
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  {getSectionIcon(link.key)}
                  <span>{link.label}</span>
                </button>
              );
            })}
          </div>

          {/* Content Body */}
          <div className="p-5 sm:p-7 overflow-y-auto space-y-6 text-sm text-slate-300 leading-relaxed">
            {/* Sådan fungerer det */}
            {activeSection === 'how-it-works' && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-blue-400 font-semibold text-lg pb-1 border-b border-slate-800">
                  <Sparkles className="w-5 h-5" />
                  <h4>{data.howItWorks.title}</h4>
                </div>
                <p className="text-slate-300 text-xs sm:text-sm">
                  {data.howItWorks.subtitle}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {data.howItWorks.steps.map((st, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-800/60 border border-slate-700/70 rounded-xl p-4 flex flex-col justify-between"
                    >
                      <div>
                        <div className="text-xl mb-1.5">{st.step}</div>
                        <h5 className="font-bold text-white text-sm">{st.title}</h5>
                        <p className="text-xs text-slate-300 mt-1 leading-relaxed">{st.desc}</p>
                      </div>
                      <div className="mt-3 text-[11px] text-blue-400 font-semibold">Trin {idx + 1} af 4</div>
                    </div>
                  ))}
                </div>
                <div className="pt-2 flex justify-end">
                  <a
                    href={STRIPE_PAYMENT_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-md transition-colors"
                  >
                    <span>{language === 'da' ? 'Opret medlemskab (7 kr./md)' : 'Subscribe (7 DKK/mo)'}</span>
                  </a>
                </div>
              </div>
            )}

            {/* Abonnement */}
            {activeSection === 'subscription' && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-blue-400 font-semibold text-lg pb-1 border-b border-slate-800">
                  <CreditCard className="w-5 h-5" />
                  <h4>💳 {data.subscription.title}</h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {data.subscription.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-800/60 border border-slate-700/70 rounded-xl p-4 flex flex-col justify-center"
                    >
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                        {item.label}
                      </span>
                      <span className="text-sm font-bold text-white mt-1">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-800/40 text-xs text-blue-200">
                  {language === 'da'
                    ? 'Der er absolut ingen bindingsperiode. Du kan opsige medlemskabet i samme minut, du opretter det, eller når som helst efter behov.'
                    : 'Zero commitment or lock-in. Cancel whenever you wish directly with one click.'}
                </div>
              </div>
            )}

            {/* FAQ */}
            {activeSection === 'faq' && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-blue-400 font-semibold text-lg pb-1 border-b border-slate-800">
                  <HelpCircle className="w-5 h-5" />
                  <h4>❓ {data.faq.title}</h4>
                </div>
                <p className="text-xs text-slate-400">{data.faq.subtitle}</p>
                <div className="divide-y divide-slate-800 border-t border-slate-800">
                  {data.faq.items.map((faq, idx) => {
                    const isOpen = openFaqIndex === idx;
                    return (
                      <div key={idx} className="py-3.5">
                        <button
                          type="button"
                          onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                          className="w-full text-left flex items-center justify-between gap-4 text-xs sm:text-sm font-semibold text-white hover:text-blue-400 transition-colors"
                        >
                          <span>{faq.q}</span>
                          <ChevronDown
                            className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                              isOpen ? 'rotate-180 text-blue-400' : ''
                            }`}
                          />
                        </button>
                        {isOpen && (
                          <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed pl-1">
                            {faq.a}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Om os */}
            {activeSection === 'about' && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-blue-400 font-semibold text-lg pb-1 border-b border-slate-800">
                  <Info className="w-5 h-5" />
                  <h4>{data.about.title}</h4>
                </div>
                <p className="font-medium text-white">{data.about.brand}</p>
                {data.about.paragraphs.map((p, idx) => (
                  <p key={idx} className="text-slate-300">
                    {p}
                  </p>
                ))}
                <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-4 mt-4 space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {language === 'da' ? 'Kort opsummering' : 'Summary'}
                  </div>
                  <ul className="list-disc list-inside text-xs text-slate-300 space-y-1">
                    <li>{language === 'da' ? 'Uafhængig guide – vi udlejer ikke boliger selv.' : 'Independent guide – we do not rent out apartments.'}</li>
                    <li>{language === 'da' ? '97 samlede, verificerede portaler og kilder.' : '97 verified housing portals and associations.'}</li>
                    <li>{language === 'da' ? '7 kr./md uden bindingsperiode.' : '7 DKK / mo with zero lock-in.'}</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Kontakt */}
            {activeSection === 'contact' && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-blue-400 font-semibold text-lg pb-1 border-b border-slate-800">
                  <Mail className="w-5 h-5" />
                  <h4>📞 {data.contact.title}</h4>
                </div>
                <div className="rounded-xl bg-slate-800/70 border border-slate-700/80 p-5 space-y-3">
                  <div className="text-base font-bold text-white">{data.contact.brand}</div>
                  <div className="text-sm text-slate-200 flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-slate-400">{language === 'da' ? 'E-mail: ' : 'Email: '}</span>
                    <a
                      href="mailto:bopaeldk@gmail.com"
                      className="text-blue-400 hover:underline font-mono text-xs sm:text-sm bg-blue-950/50 px-2.5 py-1 rounded-md border border-blue-800/40"
                    >
                      bopaeldk@gmail.com
                    </a>
                  </div>
                </div>
                <p className="text-xs text-slate-400">
                  {data.contact.note}
                </p>
              </div>
            )}

            {/* Handelsbetingelser */}
            {activeSection === 'terms' && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-blue-400 font-semibold text-lg pb-1 border-b border-slate-800">
                  <FileText className="w-5 h-5" />
                  <h4>📄 {data.terms.title}</h4>
                </div>
                <div className="space-y-3">
                  {data.terms.content.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 bg-slate-800/40 p-3 rounded-lg border border-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                      <p className="text-slate-200 text-xs sm:text-sm">{item}</p>
                    </div>
                  ))}
                </div>
                <div className="rounded-lg bg-blue-950/30 border border-blue-800/40 p-4 text-xs text-blue-300">
                  {language === 'da'
                    ? 'Abonnementet koster 7 kr. pr. måned inkl. moms og fornys automatisk hver måned. Du kan opsige dit abonnement når som helst uden varsel eller binding.'
                    : 'The subscription costs 7 DKK / mo incl. VAT and renews automatically every month. Cancel anytime with zero notice or lock-in.'}
                </div>
              </div>
            )}

            {/* Privatlivspolitik */}
            {activeSection === 'privacy' && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-blue-400 font-semibold text-lg pb-1 border-b border-slate-800">
                  <Lock className="w-5 h-5" />
                  <h4>🔒 {data.privacy.title}</h4>
                </div>
                <div className="space-y-3">
                  {data.privacy.content.map((p, idx) => (
                    <p key={idx} className="text-slate-300 text-xs sm:text-sm">
                      {p}
                    </p>
                  ))}
                </div>
                <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 text-xs text-slate-300 space-y-2">
                  <div className="font-semibold text-white flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>{language === 'da' ? 'Sikkerhed & Stripe betaling' : 'Security & Stripe Payment'}</span>
                  </div>
                  <p>
                    {language === 'da'
                      ? 'Dine betalingsoplysninger overføres krypteret direkte til betalingsudbyderen Stripe via SSL (TLS 1.3). bopæl.dk opbevarer aldrig dine kortnumre eller CVC-koder.'
                      : 'Payment credentials are sent encrypted directly to Stripe via TLS 1.3 SSL. bopæl.dk never stores card numbers or CVC codes.'}
                  </p>
                </div>
              </div>
            )}

            {/* Fortrydelsesret */}
            {activeSection === 'withdrawal' && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-blue-400 font-semibold text-lg pb-1 border-b border-slate-800">
                  <RotateCcw className="w-5 h-5" />
                  <h4>↩️ {data.withdrawal.title}</h4>
                </div>
                <div className="space-y-3">
                  {data.withdrawal.content.map((p, idx) => (
                    <p key={idx} className="text-slate-200 text-xs sm:text-sm bg-slate-800/40 p-3 rounded-lg border border-slate-800">
                      {p}
                    </p>
                  ))}
                </div>
                <div className="p-3.5 rounded-lg bg-amber-950/20 border border-amber-800/40 text-xs text-amber-300">
                  {language === 'da'
                    ? 'Da adgangen til medlemsdatabasen leveres digitalt øjeblikkeligt efter gennemført betaling, samtykker du ved købet til, at leveringen påbegyndes straks.'
                    : 'Because access to the database is delivered digitally immediately upon checkout, you agree that delivery begins straight away.'}
                </div>
              </div>
            )}

            {/* Opsig abonnement */}
            {activeSection === 'cancel' && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-rose-400 font-semibold text-lg pb-1 border-b border-slate-800">
                  <Ban className="w-5 h-5" />
                  <h4>{data.cancel.title}</h4>
                </div>
                <p className="text-emerald-400 font-semibold text-sm">
                  {data.cancel.subtitle}
                </p>
                <div className="space-y-2.5">
                  {data.cancel.instructions.map((inst, idx) => (
                    <div key={idx} className="bg-slate-800/60 p-3.5 rounded-xl border border-slate-700/80 text-xs sm:text-sm text-slate-200">
                      {inst}
                    </div>
                  ))}
                </div>
                <div className="pt-2">
                  <a
                    href="mailto:bopaeldk@gmail.com?subject=Opsigelse%20af%20abonnement%20bopæl.dk"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white font-medium text-xs transition-colors"
                  >
                    <Mail className="w-4 h-4 text-blue-400" />
                    <span>{language === 'da' ? 'Send opsigelses-mail nu' : 'Send cancellation email now'}</span>
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Footer of Modal */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800 bg-slate-950/80 shrink-0 text-xs text-slate-400">
            <span>bopæl.dk – 7 kr. / md. • Ingen binding</span>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs transition-colors"
            >
              {language === 'da' ? 'Luk vindue' : 'Close'}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

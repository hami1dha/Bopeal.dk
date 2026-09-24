import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  X, 
  Building2, 
  ShieldAlert, 
  Coins, 
  GraduationCap, 
  Scale, 
  CheckCircle,
  ExternalLink 
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface HousingGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const HousingGuideModal: React.FC<HousingGuideModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  const t = translations[language];

  if (!isOpen) return null;

  const sections = [
    {
      icon: <Building2 className="w-5 h-5 text-blue-600" />,
      title: t.guideSection1Title,
      text: t.guideSection1Text,
      bullets: language === 'da' ? [
        'Tjek om din kommune har fleksible kriterier (arbejde, studie, skilsmisse).',
        'Hold din opskrivning passiv for få hundrede kroner årligt for at samle anciennitet.',
        'Almene boliger må ikke tjene overskud på lejen, hvilket holder huslejen nede over tid.'
      ] : [
        'Check if your municipality has flexible priority criteria (jobs, student status).',
        'Keep your application passive for a minimal yearly fee to accumulate seniority.',
        'Non-profit housing cannot make commercial profits, keeping rents regulated over time.'
      ]
    },
    {
      icon: <ShieldAlert className="w-5 h-5 text-rose-600" />,
      title: t.guideSection2Title,
      text: t.guideSection2Text,
      bullets: language === 'da' ? [
        'Overfør aldrig penge via anonyme tjenester som Western Union eller kryptovaluta.',
        'Slå adressen op på Tinglysning.dk for at bekræfte hvem der ejer ejendommen.',
        'Få altid en skriftlig lejekontrakt (standard Typeformular A, 10. udgave).'
      ] : [
        'Never transfer money using wire transfer services or cryptocurrency.',
        'Verify property ownership on Tinglysning.dk (official land registry).',
        'Insist on the standard Danish rental contract (Typeformular A, 10th edition).'
      ]
    },
    {
      icon: <Coins className="w-5 h-5 text-amber-600" />,
      title: t.guideSection3Title,
      text: t.guideSection3Text,
      bullets: language === 'da' ? [
        'Maksimalt 3 måneders depositum + 3 måneders forudbetalt leje.',
        'Udlejer skal afholde indflytningssyn og udarbejde indflytningsrapport, hvis de udlejer mere end 1 bolig.',
        'Husk at dokumentere alle fejl og mangler med fotos senest 14 dage efter indflytning.'
      ] : [
        'Maximum 3 months deposit + 3 months prepaid rent + 1st month rent.',
        'Landlords with more than one unit must perform an official move-in inspection.',
        'Document all pre-existing scratches and flaws with photos within 14 days of keys handover.'
      ]
    },
    {
      icon: <GraduationCap className="w-5 h-5 text-emerald-600" />,
      title: t.guideSection4Title,
      text: t.guideSection4Text,
      bullets: language === 'da' ? [
        'KKIK (København), UngdomsboligAarhus og AKU-Aalborg er 100% gratis.',
        'Brug "Tag over Hovedet" garantierne i Aarhus og Odense hvis du mangler tag over hovedet ved studiestart.',
        'Du skal være studieaktiv for at bo i en studiebolig.'
      ] : [
        'KKIK (Copenhagen), UngdomsboligAarhus and AKU-Aalborg are completely free of charge.',
        'Utilize the student housing guarantees if moving without a permanent address.',
        'You must maintain active student status to remain in student housing.'
      ]
    },
    {
      icon: <Scale className="w-5 h-5 text-purple-600" />,
      title: language === 'da' ? '5. Få hjælp fra LLO og Huslejenævnet' : '5. Rent Board and Legal Advocacy',
      text: language === 'da' 
        ? 'Hvis du mistænker at din husleje er for høj eller dit depositum uretmæssigt tilbageholdes, kan sagen indbringes for det kommunale Huslejenævn for et minimalt gebyr.'
        : 'If your rent is illegally high or your deposit was unjustly confiscated, you can petition the municipal Rent Board (Huslejenævnet) for a minimal fee.',
      bullets: language === 'da' ? [
        'Huslejenævnets afgørelse er bindende for udlejeren.',
        'LLO (Lejernes LO) eller Digura kan hjælpe med at beregne det præcise krav.'
      ] : [
        'The Rent Board decisions are legally binding on the landlord.',
        'Organizations like LLO or Digura assist tenants with claims preparation.'
      ]
    }
  ];

  return (
    <AnimatePresence>
      <div 
        id="housing-guide-backdrop"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/70 backdrop-blur-sm"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8"
        >
          {/* Header */}
          <div className="bg-slate-900 text-white p-6 sm:p-7 flex items-start justify-between border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center shrink-0">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                  {t.housingGuideTitle}
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
                  {language === 'da' ? 'Ekspertviden og gode råd til boligsøgende i Danmark' : 'Essential guidelines and tenant protection in Denmark'}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="text-slate-400 hover:text-white p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
              aria-label={t.close}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Guide Sections */}
          <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
            {sections.map((sec, idx) => (
              <div 
                key={idx} 
                className="bg-slate-50/80 rounded-xl p-5 border border-slate-200/80 hover:border-slate-300 transition-colors"
              >
                <div className="flex items-center gap-2.5 mb-2.5">
                  <div className="p-2 rounded-lg bg-white shadow-xs border border-slate-200/60">
                    {sec.icon}
                  </div>
                  <h4 className="font-bold text-slate-900 text-base">
                    {sec.title}
                  </h4>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed mb-3">
                  {sec.text}
                </p>

                <ul className="space-y-1.5 pl-1">
                  {sec.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                      <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="bg-slate-100 px-6 py-4 border-t border-slate-200 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 transition-colors"
            >
              {t.close}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

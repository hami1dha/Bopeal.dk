import React, { useState } from 'react';
import { 
  ExternalLink, 
  Copy, 
  Check, 
  Star, 
  MapPin, 
  CheckCircle2, 
  Lightbulb,
  Lock
} from 'lucide-react';
import { HousingItem, HousingTag, Language } from '../types';
import { translations } from '../data/translations';

interface HousingCardProps {
  item: HousingItem;
  categoryTitle: string;
  language: Language;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  isUnlocked: boolean;
  onRequestUnlock: () => void;
}

export const HousingCard: React.FC<HousingCardProps> = ({
  item,
  categoryTitle,
  language,
  isFavorite,
  onToggleFavorite,
  isUnlocked,
  onRequestUnlock,
}) => {
  const t = translations[language];
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isUnlocked) {
      onRequestUnlock();
      return;
    }
    navigator.clipboard.writeText(item.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getTagStyle = (tag: HousingTag) => {
    switch (tag) {
      case 'almen':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'studie':
      case 'gratis-opskrivning':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'akut':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'privat':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'pension':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'radgivning':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'bytte':
        return 'bg-teal-50 text-teal-700 border-teal-200';
      case 'senior':
        return 'bg-cyan-50 text-cyan-700 border-cyan-200';
      case 'salg':
        return 'bg-amber-50 text-amber-800 border-amber-300';
      case 'data':
        return 'bg-sky-50 text-sky-800 border-sky-300';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const formatTagLabel = (tag: HousingTag) => {
    switch (tag) {
      case 'almen':
        return language === 'da' ? 'Almen bolig' : 'Public housing';
      case 'studie':
        return language === 'da' ? 'Studie / Ungdom' : 'Student / Youth';
      case 'gratis-opskrivning':
        return language === 'da' ? 'Gratis opskrivning' : 'Free registration';
      case 'akut':
        return language === 'da' ? 'Akutliste / Garanti' : 'Emergency / Guarantee';
      case 'privat':
        return language === 'da' ? 'Privat udlejer' : 'Private rental';
      case 'pension':
        return language === 'da' ? 'Pensionskasse' : 'Pension fund';
      case 'radgivning':
        return language === 'da' ? 'Juridisk rådgivning' : 'Legal aid';
      case 'bytte':
        return language === 'da' ? 'Byttebolig' : 'Swap / Sublet';
      case 'senior':
        return language === 'da' ? 'Seniorbolig' : 'Senior living';
      case 'salg':
        return language === 'da' ? 'Køb & Salg' : 'Buy & Sell';
      case 'data':
        return language === 'da' ? 'BBR & Geodata' : 'Property Data';
      default:
        return tag;
    }
  };

  return (
    <div 
      id={`card-${item.id}`}
      className="group relative bg-white rounded-xl border border-slate-200 hover:border-blue-400 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
    >
      <div>
        {/* Top Badges and Actions */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex flex-wrap items-center gap-1.5">
            {item.highlightBadge && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/70">
                {item.highlightBadge[language]}
              </span>
            )}
            <span className="inline-flex items-center gap-1 text-xs text-slate-500 font-medium">
              <MapPin className="w-3 h-3 text-slate-400" />
              {item.location}
            </span>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            {/* Favorite button */}
            <button
              type="button"
              onClick={() => onToggleFavorite(item.id)}
              className={`p-1.5 rounded-lg border transition-colors ${
                isFavorite 
                  ? 'bg-amber-50 border-amber-200 text-amber-500' 
                  : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-amber-500 hover:bg-amber-50'
              }`}
              title={isFavorite ? (language === 'da' ? 'Fjern favorit' : 'Remove favorite') : (language === 'da' ? 'Gem favorit' : 'Save favorite')}
              aria-label="Favorit"
            >
              <Star className={`w-4 h-4 ${isFavorite ? 'fill-amber-400' : ''}`} />
            </button>

            {/* Copy button */}
            <button
              type="button"
              onClick={handleCopy}
              className="p-1.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
              title={t.copyLink}
              aria-label={t.copyLink}
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Title */}
        <div className="flex items-center gap-1.5 mb-2">
          <h4 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
            {item.name}
          </h4>
          {item.isVerified && (
            <span title={t.verifiedBadge} className="inline-flex">
              <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" />
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
          {item.desc[language]}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className={`text-[11px] font-medium px-2 py-0.5 rounded-md border ${getTagStyle(tag)}`}
            >
              {formatTagLabel(tag)}
            </span>
          ))}
        </div>

        {/* Insider Tip (If present) */}
        {item.tip && (
          <div className="mb-4 p-3 rounded-lg bg-amber-50/70 border border-amber-200/80 text-xs text-amber-900 flex items-start gap-2">
            <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold block mb-0.5 text-amber-950">{t.insiderTip}:</span>
              {isUnlocked ? (
                <span>{item.tip[language]}</span>
              ) : (
                <button 
                  type="button" 
                  onClick={onRequestUnlock}
                  className="text-left text-amber-800 hover:text-amber-950 font-medium flex items-center gap-1.5 underline decoration-amber-300"
                >
                  <Lock className="w-3 h-3 shrink-0 text-amber-600" />
                  <span>{language === 'da' ? 'Lås op med abonnement for at læse insiders-tippet' : 'Unlock subscription to view insider tip'}</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto">
        {isUnlocked ? (
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-[0.98] transition-all shadow-sm group/btn"
          >
            <span>{t.visitPortal}</span>
            <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5" />
          </a>
        ) : (
          <button
            type="button"
            onClick={onRequestUnlock}
            className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-700 active:scale-[0.98] transition-all shadow-sm group/btn"
          >
            <Lock className="w-3.5 h-3.5 text-blue-200" />
            <span>{language === 'da' ? 'Lås op for adgang' : 'Unlock access'}</span>
          </button>
        )}
      </div>
    </div>
  );
};

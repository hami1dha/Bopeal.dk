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
        return 'bg-blue-950/70 text-blue-300 border-blue-800/80';
      case 'studie':
      case 'gratis-opskrivning':
        return 'bg-emerald-950/70 text-emerald-300 border-emerald-800/80';
      case 'akut':
        return 'bg-amber-950/70 text-amber-300 border-amber-800/80';
      case 'privat':
        return 'bg-indigo-950/70 text-indigo-300 border-indigo-800/80';
      case 'pension':
        return 'bg-purple-950/70 text-purple-300 border-purple-800/80';
      case 'radgivning':
        return 'bg-rose-950/70 text-rose-300 border-rose-800/80';
      case 'bytte':
        return 'bg-teal-950/70 text-teal-300 border-teal-800/80';
      case 'senior':
        return 'bg-cyan-950/70 text-cyan-300 border-cyan-800/80';
      case 'salg':
        return 'bg-amber-950/70 text-amber-300 border-amber-800/80';
      case 'data':
        return 'bg-sky-950/70 text-sky-300 border-sky-800/80';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
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
      className="group relative bg-slate-900 rounded-xl border border-slate-800 hover:border-blue-500/60 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between text-white"
    >
      <div>
        {/* Top Badges and Actions */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex flex-wrap items-center gap-1.5">
            {item.highlightBadge && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/40">
                {item.highlightBadge[language]}
              </span>
            )}
            <span className="inline-flex items-center gap-1 text-xs text-slate-400 font-medium">
              <MapPin className="w-3 h-3 text-slate-500" />
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
                  ? 'bg-amber-950/60 border-amber-500/40 text-amber-400' 
                  : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-amber-400 hover:bg-slate-700'
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
              className="p-1.5 rounded-lg border border-slate-700 bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
              title={t.copyLink}
              aria-label={t.copyLink}
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Title */}
        <div className="flex items-center gap-1.5 mb-2">
          <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
            {item.name}
          </h4>
          {item.isVerified && (
            <span title={t.verifiedBadge} className="inline-flex">
              <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
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
          <div className="mb-4 p-3 rounded-lg bg-amber-950/40 border border-amber-500/30 text-xs text-amber-200 flex items-start gap-2">
            <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold block mb-0.5 text-amber-300">{t.insiderTip}:</span>
              {isUnlocked ? (
                <span className="text-amber-100">{item.tip[language]}</span>
              ) : (
                <button 
                  type="button" 
                  onClick={onRequestUnlock}
                  className="text-left text-amber-300 hover:text-amber-200 font-medium flex items-center gap-1.5 underline decoration-amber-400"
                >
                  <Lock className="w-3 h-3 shrink-0 text-amber-400" />
                  <span>{language === 'da' ? 'Lås op med abonnement for at læse insiders-tippet' : 'Unlock subscription to view insider tip'}</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2 mt-auto">
        {isUnlocked ? (
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 active:scale-[0.98] transition-all shadow-sm group/btn"
          >
            <span>{t.visitPortal}</span>
            <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5" />
          </a>
        ) : (
          <button
            type="button"
            onClick={onRequestUnlock}
            className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-600 active:scale-[0.98] transition-all shadow-sm group/btn"
          >
            <Lock className="w-3.5 h-3.5 text-blue-200" />
            <span>{language === 'da' ? 'Lås op for adgang' : 'Unlock access'}</span>
          </button>
        )}
      </div>
    </div>
  );
};

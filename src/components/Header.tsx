import React from 'react';
import { 
  Building2, 
  Search, 
  X, 
  Globe2, 
  BookOpen, 
  ShieldCheck,
  Lock,
  CreditCard
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface HeaderProps {
  language: Language;
  onToggleLanguage: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenGuide: () => void;
  totalPortalsCount: number;
  isUnlocked: boolean;
  onOpenPaywall: () => void;
  onLockApp?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onToggleLanguage,
  searchQuery,
  onSearchChange,
  onOpenGuide,
  totalPortalsCount,
  isUnlocked,
  onOpenPaywall,
  onLockApp,
}) => {
  const t = translations[language];

  return (
    <header id="main-header" className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-30 shadow-md">
      {/* Top Banner Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Brand & Title */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
                  {t.brandName}
                </span>
                <span className="hidden sm:inline-block text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 font-mono">
                  {totalPortalsCount} Portaler
                </span>
              </div>
              <h1 className="text-base sm:text-lg font-bold text-white tracking-tight leading-tight">
                {t.tagline}
              </h1>
            </div>
          </div>

          {/* Quick Mobile Language Switcher */}
          <div className="md:hidden flex items-center gap-1.5">
            <button
              type="button"
              onClick={onToggleLanguage}
              className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
            >
              {language === 'da' ? 'EN' : 'DA'}
            </button>
          </div>
        </div>

        {/* Action Controls & Subscription Status */}
        <div className="flex flex-wrap items-center justify-end gap-2 w-full md:w-auto">
          {/* Housing Guide button */}
          <button
            type="button"
            onClick={onOpenGuide}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5 text-blue-400" />
            <span>{t.housingGuide}</span>
          </button>

          {/* Language Toggle (Desktop) */}
          <button
            type="button"
            onClick={onToggleLanguage}
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
          >
            <Globe2 className="w-3.5 h-3.5 text-slate-400" />
            <span>{t.switchLang}</span>
          </button>

          {/* Access Status & Paywall CTA */}
          <div className="inline-flex items-center gap-2">
            {isUnlocked ? (
              <div className="inline-flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-600/40">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{t.subscriptionActive}</span>
                </span>
                {onLockApp && (
                  <button
                    type="button"
                    onClick={onLockApp}
                    title={t.lockApp}
                    className="text-[11px] text-slate-400 hover:text-slate-200 underline px-1 py-1"
                  >
                    {t.lockApp}
                  </button>
                )}
              </div>
            ) : (
              <button
                type="button"
                id="btn-header-paywall"
                onClick={onOpenPaywall}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-600 text-white shadow-md shadow-blue-500/20 border border-blue-400/40 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Lock className="w-3.5 h-3.5 text-blue-200" />
                <span>{language === 'da' ? 'Lås op (7 DKK / md)' : 'Unlock (7 DKK / mo)'}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Search Bar Subheader */}
      <div className="bg-slate-950/70 border-t border-slate-800/80 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            id="search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full bg-slate-900 text-white placeholder-slate-400 text-sm pl-10 pr-10 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1 rounded-md"
              aria-label="Nulstil søgning"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

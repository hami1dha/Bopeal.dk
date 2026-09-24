import React, { useState, useMemo, useEffect } from 'react';
import { 
  Building2, 
  ShieldCheck, 
  Search, 
  CheckCircle2, 
  Layers,
  Sparkles,
  ChevronDown,
  HelpCircle,
  BookOpen
} from 'lucide-react';
import { housingCategories } from './data/housingData';
import { translations } from './data/translations';
import { Language, HousingTag } from './types';
import { Header } from './components/Header';
import { CategorySidebar } from './components/CategorySidebar';
import { HousingCard } from './components/HousingCard';
import { HousingGuideModal } from './components/HousingGuideModal';
import { PaywallModal } from './components/PaywallModal';
import { EntrancePaywall } from './components/EntrancePaywall';

const STORAGE_KEY_FAVORITES = 'boligguide_favorites_v1';
const STORAGE_KEY_LANG = 'boligguide_lang';
const STORAGE_KEY_UNLOCKED = 'boligguide_unlocked_v1';

export default function App() {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_LANG);
    return saved === 'en' ? 'en' : 'da';
  });

  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      if (
        params.get('unlocked') === 'true' || 
        params.get('paid') === 'true' || 
        params.get('session_id') ||
        params.get('success') === 'true'
      ) {
        localStorage.setItem(STORAGE_KEY_UNLOCKED, 'true');
        return true;
      }
      return localStorage.getItem(STORAGE_KEY_UNLOCKED) === 'true';
    } catch {
      return false;
    }
  });

  const [showPaywallModal, setShowPaywallModal] = useState<boolean>(false);
  const [showGuideModal, setShowGuideModal] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<HousingTag | 'all' | 'favorites'>('all');
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_FAVORITES);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const t = translations[language];

  // Auto-detect returning from Stripe payment link
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      if (
        params.get('unlocked') === 'true' || 
        params.get('paid') === 'true' || 
        params.get('session_id') ||
        params.get('success') === 'true'
      ) {
        showToast(t.accessGrantedToast);
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    } catch {
      // ignore
    }
  }, [t.accessGrantedToast]);

  // Save language changes
  const handleToggleLanguage = () => {
    const next = language === 'da' ? 'en' : 'da';
    setLanguage(next);
    localStorage.setItem(STORAGE_KEY_LANG, next);
  };

  // Favorites toggle
  const handleToggleFavorite = (itemId: string) => {
    setFavorites((prev) => {
      const next = prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId];
      localStorage.setItem(STORAGE_KEY_FAVORITES, JSON.stringify(next));
      return next;
    });
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleUnlockSuccess = () => {
    setIsUnlocked(true);
    localStorage.setItem(STORAGE_KEY_UNLOCKED, 'true');
    setShowPaywallModal(false);
    showToast(t.accessGrantedToast);
  };

  const handleLockApp = () => {
    setIsUnlocked(false);
    localStorage.removeItem(STORAGE_KEY_UNLOCKED);
    showToast(language === 'da' ? 'Adgang låst' : 'Access locked');
  };

  // Total count of all portals
  const totalPortalsCount = useMemo(() => {
    return housingCategories.reduce((acc, cat) => acc + cat.items.length, 0);
  }, []);

  // Filter categories and items based on search and tags
  const filteredCategories = useMemo(() => {
    return housingCategories
      .map((cat) => {
        // If a specific category is selected in the sidebar
        if (activeCategoryId && cat.id !== activeCategoryId) {
          return null;
        }

        const filteredItems = cat.items.filter((item) => {
          // Tag filtering
          if (selectedTag === 'favorites') {
            if (!favorites.includes(item.id)) return false;
          } else if (selectedTag !== 'all') {
            if (!item.tags.includes(selectedTag)) return false;
          }

          // Search filtering (name, description, location)
          if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase().trim();
            const matchName = item.name.toLowerCase().includes(query);
            const matchDesc = item.desc[language].toLowerCase().includes(query);
            const matchLocation = item.location.toLowerCase().includes(query);
            return matchName || matchDesc || matchLocation;
          }

          return true;
        });

        if (filteredItems.length === 0) return null;

        return {
          ...cat,
          items: filteredItems,
        };
      })
      .filter(Boolean) as typeof housingCategories;
  }, [searchQuery, selectedTag, activeCategoryId, favorites, language]);

  // Compute category item counts for sidebar badge
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};

    housingCategories.forEach((cat) => {
      const valid = cat.items.filter((item) => {
        if (selectedTag === 'favorites') {
          if (!favorites.includes(item.id)) return false;
        } else if (selectedTag !== 'all') {
          if (!item.tags.includes(selectedTag)) return false;
        }

        if (!searchQuery.trim()) return true;
        const query = searchQuery.toLowerCase().trim();
        const matchName = item.name.toLowerCase().includes(query);
        const matchDesc = item.desc[language].toLowerCase().includes(query);
        const matchLocation = item.location.toLowerCase().includes(query);
        return matchName || matchDesc || matchLocation;
      });

      counts[cat.id] = valid.length;
    });

    return counts;
  }, [searchQuery, selectedTag, favorites, language]);

  // Total visible portals count
  const visiblePortalsCount = useMemo(() => {
    return filteredCategories.reduce((acc, cat) => acc + cat.items.length, 0);
  }, [filteredCategories]);

  // FAQs for unlocked members
  const memberFaqs = language === 'da' ? [
    {
      q: 'Hvordan søger jeg mest effektivt i de 97 portaler?',
      a: 'Start med de almene ventelister (#3) og kollegierne (#4) for de billigste boliger uden depositumsnyderi. Brug fritekstsøgningen øverst til at filtrere på din by (f.eks. København, Aarhus, Odense) eller tag-filtrene i venstre menu.'
    },
    {
      q: 'Hvordan administrerer eller opsiger jeg mit abonnement?',
      a: 'Dit abonnement koster 7 DKK / måned uden binding. Du kan til enhver tid opsige direkte via den e-mailkvittering, du modtog fra Stripe, eller kontakte vores support.'
    },
    {
      q: 'Hvad gør jeg, hvis jeg skifter enhed eller browser?',
      a: 'Du kan logge ind igen på enhver enhed ved at klikke på "Har du allerede betalt?" på forsiden og indtaste din Stripe-e-mailadresse.'
    }
  ] : [
    {
      q: 'How do I search most effectively among the 97 portals?',
      a: 'Begin with non-profit housing associations (#3) and free student dorms (#4) for affordable housing without scam risks. Use the search bar for your city (e.g. Copenhagen, Aarhus) or the filter tags.'
    },
    {
      q: 'How do I manage or cancel my 7 DKK / mo subscription?',
      a: 'There is no lock-in. You can cancel anytime via the Stripe receipt in your inbox or by contacting support.'
    },
    {
      q: 'What if I switch devices or clear my browser cache?',
      a: 'Simply click "Already subscribed?" on the entrance paywall and enter your Stripe email to reactivate.'
    }
  ];

  // STRICT PAYWALL GATE: When not paid/unlocked, EVERYTHING is hidden behind EntrancePaywall
  if (!isUnlocked) {
    return (
      <>
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs sm:text-sm px-4 py-3 rounded-xl shadow-xl border border-slate-700 flex items-center gap-2 animate-bounce">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}
        <EntrancePaywall
          language={language}
          onToggleLanguage={handleToggleLanguage}
          onUnlockSuccess={handleUnlockSuccess}
        />
      </>
    );
  }

  // UNLOCKED VIEW: Full database with all 97 portals, verified links, guides, and tools
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs sm:text-sm px-4 py-3 rounded-xl shadow-xl border border-slate-700 flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main App Header */}
      <Header
        language={language}
        onToggleLanguage={handleToggleLanguage}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenGuide={() => setShowGuideModal(true)}
        totalPortalsCount={totalPortalsCount}
        isUnlocked={isUnlocked}
        onOpenPaywall={() => setShowPaywallModal(true)}
        onLockApp={handleLockApp}
      />

      {/* Unlocked Member Dashboard Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-indigo-950 text-white py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-b border-slate-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-2.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  {t.subscriptionActive} (7 DKK / md)
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                  {t.statsVerified}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {language === 'da' ? 'Danmarks Verificerede Boligdatabase' : 'Denmark\'s Verified Housing Portal'}
              </h1>
              <p className="text-slate-300 text-sm sm:text-base mt-2 leading-relaxed">
                {language === 'da'
                  ? 'Du har fuld adgang til alle 97 verificerede boligkilder, almene ventelister, gratis kollegier og lejerettigheder.'
                  : 'You have full access to all 97 verified housing resources, waitlists, student dorms, and tenant legal tools.'}
              </p>
            </div>

            {/* Quick stats pills */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full md:w-auto">
              <div className="bg-white/10 backdrop-blur-sm border border-white/10 p-3 rounded-xl">
                <div className="text-xl sm:text-2xl font-black text-white">{totalPortalsCount}</div>
                <div className="text-xs text-slate-300 font-medium">{t.statsPortals}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/10 p-3 rounded-xl">
                <div className="text-xl sm:text-2xl font-black text-white">{housingCategories.length}</div>
                <div className="text-xs text-slate-300 font-medium">{t.categories}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/10 p-3 rounded-xl col-span-2 sm:col-span-1">
                <div className="text-xl sm:text-2xl font-black text-emerald-400">100%</div>
                <div className="text-xs text-slate-300 font-medium">{language === 'da' ? 'Oplåst' : 'Unlocked'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content: Sidebar + Cards */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 items-start">
          {/* Left Sidebar */}
          <div className="w-full">
            <div className="sticky top-24">
              <CategorySidebar
                categories={housingCategories}
                activeCategoryId={activeCategoryId}
                onSelectCategory={setActiveCategoryId}
                selectedTag={selectedTag}
                onSelectTag={setSelectedTag}
                categoryItemCounts={categoryCounts}
                favoritesCount={favorites.length}
                language={language}
              />
            </div>
          </div>

          {/* Right Content Area */}
          <main id="content-area" className="space-y-8 min-w-0">
            {/* Filter Summary Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
              <div className="text-xs sm:text-sm font-semibold text-slate-700">
                {t.showingResults
                  .replace('{count}', String(visiblePortalsCount))
                  .replace('{total}', String(totalPortalsCount))}
                {selectedTag !== 'all' && (
                  <span className="ml-2 font-normal text-slate-500">
                    ({language === 'da' ? 'Filter aktivt' : 'Filter active'})
                  </span>
                )}
              </div>

              {(searchQuery || selectedTag !== 'all' || activeCategoryId !== null) && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedTag('all');
                    setActiveCategoryId(null);
                  }}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-800 underline"
                >
                  {t.clearFilters}
                </button>
              )}
            </div>

            {/* No Results Fallback */}
            {filteredCategories.length === 0 && (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-sm space-y-4">
                <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-800">
                  {t.noResults}
                </h3>
                <p className="text-sm text-slate-500 max-w-md mx-auto">
                  {language === 'da' 
                    ? 'Prøv at søge efter en anden by (f.eks. København, Aarhus, Odense) eller nulstil dine filtre.'
                    : 'Try searching for another city (e.g. Copenhagen, Aarhus) or reset your filter pills.'}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedTag('all');
                    setActiveCategoryId(null);
                  }}
                  className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition-colors"
                >
                  {t.clearFilters}
                </button>
              </div>
            )}

            {/* Render Category Sections with Housing Cards */}
            {filteredCategories.map((category) => (
              <section
                key={category.id}
                id={category.id}
                className="scroll-mt-28 space-y-4"
              >
                {/* Category Header */}
                <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
                      <span className="text-blue-600 font-mono">#{category.categoryNumber}</span>
                      <span>{category.title[language]}</span>
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                      {category.description[language]}
                    </p>
                  </div>
                  <div className="shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200/60 self-start sm:self-center">
                    {category.items.length} {language === 'da' ? 'portaler' : 'portals'}
                  </div>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {category.items.map((item) => (
                    <HousingCard
                      key={item.id}
                      item={item}
                      categoryTitle={category.title[language]}
                      language={language}
                      isFavorite={favorites.includes(item.id)}
                      onToggleFavorite={handleToggleFavorite}
                      isUnlocked={isUnlocked}
                      onRequestUnlock={() => setShowPaywallModal(true)}
                    />
                  ))}
                </div>
              </section>
            ))}

            {/* Unlocked Member FAQ */}
            <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-wider">
                <HelpCircle className="w-4 h-4" />
                <span>FAQ & Hjælp</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                {language === 'da' ? 'Gode råd til din boligsøgning' : 'Tips for your housing search'}
              </h3>

              <div className="divide-y divide-slate-100">
                {memberFaqs.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div key={idx} className="py-3.5">
                      <button
                        type="button"
                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                        className="w-full text-left flex items-center justify-between gap-4 text-sm font-semibold text-slate-900 hover:text-blue-600 transition-colors"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-blue-600' : ''}`}
                        />
                      </button>
                      {isOpen && (
                        <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed pl-1">
                          {faq.a}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-10 border-t border-slate-800 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs sm:text-sm">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <p className="text-white font-semibold">{t.brandName}</p>
              <p className="text-xs text-slate-500">
                {language === 'da' ? 'Danmarks samlede boligoversigt & links' : 'Complete Denmark housing directory & portals'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs">
            <button
              type="button"
              onClick={() => setShowGuideModal(true)}
              className="hover:text-white transition-colors flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{t.housingGuide}</span>
            </button>
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{t.subscriptionActive}</span>
            </span>
          </div>

          <div className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} bopæl.dk. {language === 'da' ? 'Alle rettigheder forbeholdes.' : 'All rights reserved.'}
          </div>
        </div>
      </footer>

      {/* Housing Advice Guide Modal */}
      <HousingGuideModal
        isOpen={showGuideModal}
        onClose={() => setShowGuideModal(false)}
        language={language}
      />

      {/* Paywall Subscription Modal */}
      <PaywallModal
        isOpen={showPaywallModal}
        onClose={() => setShowPaywallModal(false)}
        onUnlockSuccess={handleUnlockSuccess}
        language={language}
        canDismiss={true}
      />
    </div>
  );
}

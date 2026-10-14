import React, { useState, useEffect } from 'react';
import { 
  Star, 
  MessageSquarePlus, 
  CheckCircle, 
  User, 
  ThumbsUp, 
  Filter, 
  ShieldCheck,
  Send,
  Sparkles,
  Calendar
} from 'lucide-react';
import { Language } from '../types';

export interface Review {
  id: string;
  name: string;
  city: string;
  rating: number; // 1 to 5
  title: string;
  comment: string;
  date: string;
  verifiedBuyer: boolean;
  helpfulCount: number;
  categoryTag?: string;
}

const STORAGE_KEY_REVIEWS = 'bopael_user_reviews_v1';
const STORAGE_KEY_HELPFUL = 'bopael_helpful_votes_v1';

const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    name: 'Mette Sommer',
    city: 'København N',
    rating: 5,
    title: 'Fandt studiebolig efter kun 3 uger!',
    comment: 'Jeg var så træt af at betale 300-400 kr. på dyre portaler uden svar. Listen med kollegier og almene boligselskaber her på bopæl.dk sparede mig for tusindvis af kroner, og jeg fik tilbudt en studiebolig på Nørrebro.',
    date: '12. okt. 2026',
    verifiedBuyer: true,
    helpfulCount: 24,
    categoryTag: 'Studiebolig'
  },
  {
    id: 'rev-2',
    name: 'Christian Lind',
    city: 'Aarhus C',
    rating: 5,
    title: 'De 7 kr. er tjent ind 100 gange',
    comment: 'Direkte adgang til pensionskassernes egne ventelister var guld værd for min kæreste og mig. Ingen mellemmænd eller falske annoncer. Super god og transparent service.',
    date: '8. okt. 2026',
    verifiedBuyer: true,
    helpfulCount: 19,
    categoryTag: 'Pensionskasser'
  },
  {
    id: 'rev-3',
    name: 'Søren & Line',
    city: 'Odense',
    rating: 5,
    title: 'Genial lejeguide og lejekontrakt-tjek',
    comment: 'Guiden til depositum og indflytningssyn alene er det hele værd. Det gav os tryghed til at vide hvad udlejeren må og ikke må kræve. Kæmpe anbefaling herfra!',
    date: '4. okt. 2026',
    verifiedBuyer: true,
    helpfulCount: 15,
    categoryTag: 'Lejeguide'
  },
  {
    id: 'rev-4',
    name: 'Fatima Al-Mansoor',
    city: 'Aalborg',
    rating: 4,
    title: 'Rigtig god og overskuelig samling',
    comment: 'Super rart at have alle almene ventelister samlet ét sted uden at skulle google i dagevis. Nemt at opsige og koster næsten ingenting.',
    date: '28. sep. 2026',
    verifiedBuyer: true,
    helpfulCount: 11,
    categoryTag: 'Almene boliger'
  }
];

interface ReviewsSectionProps {
  language: Language;
  isUnlocked?: boolean;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ language }) => {
  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_REVIEWS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // fallback
    }
    return INITIAL_REVIEWS;
  });

  const [helpfulVoted, setHelpfulVoted] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_HELPFUL);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [filterRating, setFilterRating] = useState<number | 'all'>('all');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Form states
  const [newName, setNewName] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newTitle, setNewTitle] = useState('');
  const [newComment, setNewComment] = useState('');
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_REVIEWS, JSON.stringify(reviews));
    } catch {
      // ignore
    }
  }, [reviews]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_HELPFUL, JSON.stringify(helpfulVoted));
    } catch {
      // ignore
    }
  }, [helpfulVoted]);

  const handleVoteHelpful = (reviewId: string) => {
    if (helpfulVoted.includes(reviewId)) return;

    setReviews(prev => prev.map(r => {
      if (r.id === reviewId) {
        return { ...r, helpfulCount: r.helpfulCount + 1 };
      }
      return r;
    }));

    setHelpfulVoted(prev => [...prev, reviewId]);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newComment.trim() || !newTitle.trim()) return;

    const today = new Date();
    const formattedDate = language === 'da'
      ? `${today.getDate()}. ${['jan.', 'feb.', 'mar.', 'apr.', 'maj', 'jun.', 'jul.', 'aug.', 'sep.', 'okt.', 'nov.', 'dec.'][today.getMonth()]} ${today.getFullYear()}`
      : `${['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}`;

    const newReview: Review = {
      id: `rev-${Date.now()}`,
      name: newName.trim(),
      city: newCity.trim() || (language === 'da' ? 'Danmark' : 'Denmark'),
      rating: newRating,
      title: newTitle.trim(),
      comment: newComment.trim(),
      date: formattedDate,
      verifiedBuyer: true,
      helpfulCount: 0,
      categoryTag: language === 'da' ? 'Medlem' : 'Member'
    };

    setReviews(prev => [newReview, ...prev]);
    setNewName('');
    setNewCity('');
    setNewTitle('');
    setNewComment('');
    setNewRating(5);
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setIsFormOpen(false);
    }, 2500);
  };

  // Calculations
  const averageRating = (
    reviews.reduce((acc, r) => acc + r.rating, 0) / (reviews.length || 1)
  ).toFixed(1);

  const filteredReviews = reviews.filter(r => {
    if (filterRating === 'all') return true;
    return r.rating === filterRating;
  });

  return (
    <section className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 my-8">
      <div className="rounded-2xl bg-slate-900/80 backdrop-blur-md border border-white/10 shadow-2xl p-5 sm:p-7 space-y-6">
        
        {/* Header & Stats Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-400/10 text-amber-300 border border-amber-400/20 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{language === 'da' ? 'Verificerede Medlemsanmeldelser' : 'Verified Member Reviews'}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {language === 'da' ? 'Hvad siger vores medlemmer?' : 'What do our members say?'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              {language === 'da' 
                ? 'Læs ærlige erfaringer og del din egen mening om bopæl.dk' 
                : 'Read authentic experiences and share your feedback on bopæl.dk'}
            </p>
          </div>

          {/* Rating Summary Badge & Add Review CTA */}
          <div className="flex items-center gap-4">
            <div className="bg-slate-950/70 border border-white/10 rounded-xl px-4 py-3 text-center shrink-0">
              <div className="flex items-center justify-center gap-1 text-amber-400">
                <span className="text-2xl font-black text-white">{averageRating}</span>
                <span className="text-xs text-slate-400">/ 5</span>
              </div>
              <div className="flex items-center justify-center gap-0.5 text-amber-400 my-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    className={`w-3.5 h-3.5 ${star <= Math.round(Number(averageRating)) ? 'fill-amber-400 text-amber-400' : 'text-slate-600'}`} 
                  />
                ))}
              </div>
              <span className="text-[10px] text-slate-400">
                {reviews.length} {language === 'da' ? 'anmeldelser' : 'reviews'}
              </span>
            </div>

            <button
              type="button"
              id="btn-open-review-form"
              onClick={() => setIsFormOpen(!isFormOpen)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-blue-600 hover:bg-blue-500 active:scale-95 shadow-md shadow-blue-600/30 transition-all shrink-0"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>{isFormOpen ? (language === 'da' ? 'Luk formular' : 'Close form') : (language === 'da' ? 'Skriv anmeldelse' : 'Write a review')}</span>
            </button>
          </div>
        </div>

        {/* Review Submission Form */}
        {isFormOpen && (
          <form 
            onSubmit={handleSubmitReview}
            className="rounded-xl bg-slate-950/90 border border-blue-500/30 p-4 sm:p-5 shadow-lg space-y-4 animate-in fade-in duration-200"
          >
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
                <MessageSquarePlus className="w-4 h-4 text-blue-400" />
                <span>{language === 'da' ? 'Del din mening om bopæl.dk' : 'Share your opinion on bopæl.dk'}</span>
              </h4>
              <span className="text-[11px] text-slate-400">
                {language === 'da' ? 'Offentliggøres med det samme' : 'Published immediately'}
              </span>
            </div>

            {formSubmitted ? (
              <div className="p-4 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm flex items-center gap-2 font-medium">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>{language === 'da' ? 'Mange tak! Din anmeldelse er blevet tilføjet.' : 'Thank you! Your review has been added.'}</span>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                      {language === 'da' ? 'Dit navn / kaldenavn *' : 'Your name / nickname *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      placeholder={language === 'da' ? 'F.eks. Camilla Nielsen' : 'E.g. Camilla Nielsen'}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                      {language === 'da' ? 'By / Område (valgfrit)' : 'City / Area (optional)'}
                    </label>
                    <input
                      type="text"
                      value={newCity}
                      onChange={(e) => setNewCity(e.target.value)}
                      placeholder={language === 'da' ? 'F.eks. København K' : 'E.g. Copenhagen'}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Star rating selector */}
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    {language === 'da' ? 'Din vurdering *' : 'Your rating *'}
                  </label>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => {
                      const active = (hoverRating !== null ? hoverRating : newRating) >= star;
                      return (
                        <button
                          key={star}
                          type="button"
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(null)}
                          onClick={() => setNewRating(star)}
                          className="p-1 hover:scale-110 transition-transform focus:outline-none"
                        >
                          <Star 
                            className={`w-6 h-6 ${active ? 'fill-amber-400 text-amber-400' : 'text-slate-600'}`} 
                          />
                        </button>
                      );
                    })}
                    <span className="text-xs font-bold text-amber-400 ml-2">
                      {newRating} / 5
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    {language === 'da' ? 'Overskrift *' : 'Headline *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder={language === 'da' ? 'Kort overskrift for din oplevelse' : 'Brief headline of your experience'}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    {language === 'da' ? 'Din mening / erfaring *' : 'Your review / feedback *'}
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder={language === 'da' ? 'Fortæl hvad du synes om oversigten, prisen eller servicen...' : 'Tell us what you think about the directory, price, or service...'}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-blue-500 leading-relaxed"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-white"
                  >
                    {language === 'da' ? 'Annuller' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    id="btn-submit-review"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-md transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{language === 'da' ? 'Indsend anmeldelse' : 'Post review'}</span>
                  </button>
                </div>
              </>
            )}
          </form>
        )}

        {/* Filter bar */}
        <div className="flex items-center justify-between flex-wrap gap-2 pt-1 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-slate-500" />
            <span className="font-semibold text-slate-300">{language === 'da' ? 'Filtrér:' : 'Filter:'}</span>
            <div className="flex items-center gap-1 flex-wrap">
              <button
                type="button"
                onClick={() => setFilterRating('all')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                  filterRating === 'all' 
                    ? 'bg-blue-600 text-white font-bold' 
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {language === 'da' ? 'Alle' : 'All'} ({reviews.length})
              </button>
              {[5, 4, 3].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setFilterRating(num)}
                  className={`px-2 py-1 rounded-md text-[11px] font-medium inline-flex items-center gap-1 transition-colors ${
                    filterRating === num 
                      ? 'bg-blue-600 text-white font-bold' 
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <span>{num}</span>
                  <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-1 text-[11px] text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{language === 'da' ? '100% uafhængige anmeldelser' : '100% independent reviews'}</span>
          </div>
        </div>

        {/* Reviews List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2">
          {filteredReviews.map((rev) => {
            const hasVoted = helpfulVoted.includes(rev.id);
            return (
              <div 
                key={rev.id}
                className="rounded-xl bg-slate-950/60 border border-white/5 hover:border-white/15 p-4 space-y-2.5 flex flex-col justify-between transition-colors shadow-sm"
              >
                <div className="space-y-2">
                  {/* Top line: stars & date */}
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          className={`w-3.5 h-3.5 ${star <= rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-700'}`} 
                        />
                      ))}
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-slate-500">
                      <Calendar className="w-3 h-3" />
                      <span>{rev.date}</span>
                    </div>
                  </div>

                  {/* Title & Comment */}
                  <h5 className="font-bold text-white text-xs sm:text-sm leading-snug">
                    {rev.title}
                  </h5>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    "{rev.comment}"
                  </p>
                </div>

                {/* Reviewer info & Helpful button */}
                <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center font-bold text-[10px]">
                      <User className="w-3 h-3 text-slate-400" />
                    </div>
                    <div>
                      <span className="font-semibold text-slate-200 block leading-tight">{rev.name}</span>
                      <span className="text-[10px] text-slate-500">{rev.city}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleVoteHelpful(rev.id)}
                    disabled={hasVoted}
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-medium transition-colors ${
                      hasVoted 
                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' 
                        : 'bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                    title={language === 'da' ? 'Marker som hjælpsom' : 'Mark as helpful'}
                  >
                    <ThumbsUp className="w-2.5 h-2.5" />
                    <span>{hasVoted ? (language === 'da' ? 'Hjælpsom' : 'Helpful') : (language === 'da' ? 'Nyttig' : 'Helpful')}</span>
                    {rev.helpfulCount > 0 && <span className="font-bold">({rev.helpfulCount})</span>}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  MessageSquarePlus, 
  Star, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Clock
} from 'lucide-react';
import { collection, addDoc, getDocs, query, orderBy, limit, serverTimestamp } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { Language } from '../types';

export interface FeedbackItem {
  id: string;
  name: string;
  email?: string;
  rating: number;
  category: string;
  message: string;
  createdAt: string | number;
}

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

const CATEGORIES = {
  da: [
    'Forslag til forbedring',
    'Ros til bopæl.dk',
    'Mangler en boligportal/kollegie',
    'Hjælp / Spørgsmål',
    'Andet'
  ],
  en: [
    'Improvement suggestion',
    'Praise for bopæl.dk',
    'Missing a housing portal / dorm',
    'Help / Question',
    'Other'
  ]
};

export const FeedbackModal: React.FC<FeedbackModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [rating, setRating] = useState(5);
  const [category, setCategory] = useState(CATEGORIES[language][0]);
  const [message, setMessage] = useState('');
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([]);
  const [isLoadingFeedbacks, setIsLoadingFeedbacks] = useState(false);
  const [activeTab, setActiveTab] = useState<'form' | 'list'>('form');

  // Load existing feedback from Firestore
  const loadFeedbacks = async () => {
    setIsLoadingFeedbacks(true);
    const loadedList: FeedbackItem[] = [];

    // 1. Try directly from Google Cloud Firestore
    try {
      const q = query(collection(db, 'feedback'), orderBy('createdAt', 'desc'), limit(15));
      const snap = await getDocs(q);
      snap.forEach((doc) => {
        const data = doc.data();
        loadedList.push({
          id: doc.id,
          name: data.name || 'Anonym',
          email: data.email || '',
          rating: Number(data.rating) || 5,
          category: data.category || 'Feedback',
          message: data.message || '',
          createdAt: data.createdAt ? (typeof data.createdAt === 'object' && 'toDate' in data.createdAt ? (data.createdAt as any).toDate().toISOString() : String(data.createdAt)) : new Date().toISOString()
        });
      });
    } catch (err) {
      console.warn('Firestore direct fetch:', err);
      handleFirestoreError(err, OperationType.GET, 'feedback');
    }

    // 2. Fetch from server backup API as fallback/supplement
    try {
      const res = await fetch('/api/feedback');
      if (res.ok) {
        const json = await res.json();
        if (Array.isArray(json.feedbacks)) {
          // Merge unique by message or id
          const existingIds = new Set(loadedList.map(f => f.id));
          json.feedbacks.forEach((item: FeedbackItem) => {
            if (!existingIds.has(item.id)) {
              loadedList.push(item);
            }
          });
        }
      }
    } catch (e) {
      console.warn('Backend API fetch error:', e);
    }

    setFeedbacks(loadedList);
    setIsLoadingFeedbacks(false);
  };

  useEffect(() => {
    if (isOpen) {
      loadFeedbacks();
      setCategory(CATEGORIES[language][0]);
    }
  }, [isOpen, language]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      setErrorMessage(language === 'da' ? 'Udfyld venligst dit navn og din besked.' : 'Please enter your name and message.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    const nowIso = new Date().toISOString();
    const payload = {
      name: name.trim().slice(0, 100),
      email: email.trim().slice(0, 150) || '',
      rating: Math.max(1, Math.min(5, Number(rating))),
      category: category.slice(0, 60),
      message: message.trim().slice(0, 2000),
      createdAt: nowIso
    };

    let savedToFirestore = false;

    // 1. Write directly to Google Cloud Firestore
    try {
      const docRef = await addDoc(collection(db, 'feedback'), {
        ...payload,
        serverTime: serverTimestamp()
      });
      if (docRef.id) {
        savedToFirestore = true;
      }
    } catch (err) {
      console.error('Error saving directly to Firestore:', err);
      handleFirestoreError(err, OperationType.CREATE, 'feedback');
    }

    // 2. Dual-save to backend /api/feedback to ensure permanent retention
    try {
      const apiRes = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (apiRes.ok) {
        savedToFirestore = true;
      }
    } catch (apiErr) {
      console.warn('Backend sync warning:', apiErr);
    }

    setIsSubmitting(false);

    if (savedToFirestore) {
      setSubmitSuccess(true);
      // Reset form
      setMessage('');
      // Reload feedbacks list
      loadFeedbacks();
    } else {
      setErrorMessage(
        language === 'da' 
          ? 'Der opstod en fejl under afsendelsen. Prøv venligst igen.' 
          : 'An error occurred while submitting. Please try again.'
      );
    }
  };

  const handleReset = () => {
    setSubmitSuccess(false);
    setMessage('');
    setErrorMessage('');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
        />

        {/* Modal content */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 15 }}
          className="relative w-full max-w-xl bg-[#0b1d3a] border border-cyan-500/30 rounded-2xl shadow-2xl z-10 text-white overflow-hidden my-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-white/10 bg-[#07152b]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center shadow-inner">
                <MessageSquarePlus className="w-5 h-5 text-cyan-300" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black text-white tracking-tight leading-tight">
                  {language === 'da' ? 'Brugeranmeldelser' : 'User Reviews'}
                </h3>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Luk"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tab Selector */}
          <div className="flex border-b border-white/10 bg-[#091830] text-xs font-bold uppercase tracking-wider">
            <button
              type="button"
              onClick={() => setActiveTab('form')}
              className={`flex-1 py-3 text-center transition-colors border-b-2 ${
                activeTab === 'form'
                  ? 'border-cyan-400 text-cyan-300 bg-white/5'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              {language === 'da' ? '✍️ Skriv anmeldelse' : '✍️ Write review'}
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('list');
                loadFeedbacks();
              }}
              className={`flex-1 py-3 text-center transition-colors border-b-2 flex items-center justify-center gap-1.5 ${
                activeTab === 'list'
                  ? 'border-cyan-400 text-cyan-300 bg-white/5'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>{language === 'da' ? '💬 Seneste anmeldelser' : '💬 Recent reviews'}</span>
              <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-cyan-500/20 text-cyan-300 font-mono">
                {feedbacks.length}
              </span>
            </button>
          </div>

          {/* Body Content */}
          <div className="p-5 sm:p-6 max-h-[75vh] overflow-y-auto">
            {activeTab === 'form' ? (
              submitSuccess ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="text-xl font-bold text-white">
                    {language === 'da' ? 'Mange tak for din anmeldelse!' : 'Thank you for your review!'}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                    {language === 'da'
                      ? 'Tak for dit bidrag. Din anmeldelse er nu registreret på bopæl.dk.'
                      : 'Thank you for your contribution. Your review is now recorded on bopæl.dk.'}
                  </p>
                  <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => setActiveTab('list')}
                      className="px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider text-cyan-300 bg-[#07152b] border border-cyan-500/30 hover:bg-[#0f2444] transition-all"
                    >
                      {language === 'da' ? 'Se seneste anmeldelser' : 'View recent reviews'}
                    </button>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-500 transition-all shadow-md shadow-blue-600/30"
                    >
                      {language === 'da' ? 'Skriv en ny besked' : 'Submit another'}
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Rating Selector */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                      {language === 'da' ? 'Din vurdering af bopæl.dk' : 'Your rating of bopæl.dk'}
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(null)}
                          className="p-1 rounded-lg hover:bg-white/10 transition-colors"
                        >
                          <Star
                            className={`w-7 h-7 sm:w-8 sm:h-8 transition-transform active:scale-90 ${
                              (hoverRating !== null ? star <= hoverRating : star <= rating)
                                ? 'text-amber-400 fill-amber-400'
                                : 'text-slate-600 stroke-[1.5]'
                            }`}
                          />
                        </button>
                      ))}
                      <span className="text-xs font-bold text-amber-300 ml-2">
                        {rating} / 5 {language === 'da' ? 'stjerner' : 'stars'}
                      </span>
                    </div>
                  </div>

                  {/* Name and Email Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                        {language === 'da' ? 'Dit navn / Kaldenavn *' : 'Your name / Nickname *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={language === 'da' ? 'F.eks. Camilla eller Boligsøgende' : 'E.g. Alex or Home Seeker'}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#061224] border border-white/15 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:border-cyan-400 shadow-inner"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                        {language === 'da' ? 'E-mail (valgfrit)' : 'Email (optional)'}
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={language === 'da' ? 'navn@eksempel.dk' : 'name@example.com'}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#061224] border border-white/15 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:border-cyan-400 shadow-inner"
                      />
                    </div>
                  </div>

                  {/* Category dropdown */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                      {language === 'da' ? 'Emne / Kategori' : 'Topic / Category'}
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#061224] border border-white/15 text-white text-sm focus:outline-none focus:border-cyan-400 shadow-inner"
                    >
                      {CATEGORIES[language].map((cat) => (
                        <option key={cat} value={cat} className="bg-[#0b1d3a] text-white">
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Feedback Message */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                      {language === 'da' ? 'Din besked / Forslag *' : 'Your message / Suggestion *'}
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={
                        language === 'da'
                          ? 'Fortæl hvad du synes om bopæl.dk, hvilke boligportaler du gerne vil have tilføjet, eller hvad der kunne gøres bedre...'
                          : 'Tell us your thoughts, which housing portals you want added, or what could be improved...'
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#061224] border border-white/15 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:border-cyan-400 shadow-inner resize-none"
                    />
                  </div>

                  {errorMessage && (
                    <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
                      <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="pt-2 flex items-center justify-end gap-2.5 border-t border-white/10">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition-colors"
                    >
                      {language === 'da' ? 'Annuller' : 'Cancel'}
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 active:scale-95 disabled:opacity-50 transition-all shadow-md shadow-blue-600/30"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>{language === 'da' ? 'Sender...' : 'Sending...'}</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>{language === 'da' ? 'Send anmeldelse' : 'Send review'}</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-white/10 text-xs">
                  <span className="text-slate-400 font-medium">
                    {language === 'da' ? 'Offentliggjorte anmeldelser:' : 'Published reviews:'}
                  </span>
                  <button
                    type="button"
                    onClick={loadFeedbacks}
                    className="text-cyan-400 hover:underline font-bold"
                  >
                    {language === 'da' ? 'Opdater liste' : 'Refresh list'}
                  </button>
                </div>

                {isLoadingFeedbacks ? (
                  <div className="py-12 text-center text-xs text-slate-400 space-y-2">
                    <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto" />
                    <p>{language === 'da' ? 'Henter anmeldelser...' : 'Loading reviews...'}</p>
                  </div>
                ) : feedbacks.length === 0 ? (
                  <div className="py-12 text-center text-xs text-slate-400 space-y-2">
                    <MessageSquarePlus className="w-8 h-8 mx-auto text-slate-600" />
                    <p>{language === 'da' ? 'Ingen anmeldelser endnu. Vær den første til at skrive!' : 'No reviews yet. Be the first to submit!'}</p>
                    <button
                      type="button"
                      onClick={() => setActiveTab('form')}
                      className="text-cyan-400 hover:underline font-bold pt-1 block mx-auto"
                    >
                      {language === 'da' ? 'Skriv anmeldelse nu' : 'Write review now'}
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {feedbacks.map((item) => (
                      <div
                        key={item.id}
                        className="p-4 rounded-xl bg-[#07152b] border border-white/10 space-y-2 text-xs"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold text-[10px]">
                              {item.name.charAt(0).toUpperCase()}
                            </div>
                            <span className="font-bold text-white text-sm">{item.name}</span>
                            <span className="px-2 py-0.5 rounded-full bg-cyan-950/70 text-cyan-300 border border-cyan-500/25 text-[10px] font-semibold">
                              {item.category}
                            </span>
                          </div>

                          {/* Stars */}
                          <div className="flex items-center gap-0.5">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star
                                key={s}
                                className={`w-3.5 h-3.5 ${
                                  s <= item.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-600'
                                }`}
                              />
                            ))}
                          </div>
                        </div>

                        <p className="text-slate-200 leading-relaxed pl-8">
                          "{item.message}"
                        </p>

                        <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-white/5 pl-8">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {typeof item.createdAt === 'string' && item.createdAt.includes('T')
                              ? new Date(item.createdAt).toLocaleDateString(language === 'da' ? 'da-DK' : 'en-US', {
                                  day: 'numeric',
                                  month: 'short',
                                  year: 'numeric'
                                })
                              : String(item.createdAt)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

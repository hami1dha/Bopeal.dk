import React from 'react';
import { 
  Building2, 
  Building, 
  Home, 
  MapPin, 
  GraduationCap, 
  Globe, 
  Briefcase, 
  AlertCircle, 
  Users, 
  Repeat, 
  Scale, 
  Filter, 
  Star,
  CheckCircle,
  X,
  FileText,
  Sparkles,
  Heart,
  Tag
} from 'lucide-react';
import { HousingCategory, Language, HousingTag } from '../types';
import { translations } from '../data/translations';

interface CategorySidebarProps {
  categories: HousingCategory[];
  activeCategoryId: string | null;
  onSelectCategory: (id: string | null) => void;
  selectedTag: HousingTag | 'all' | 'favorites';
  onSelectTag: (tag: HousingTag | 'all' | 'favorites') => void;
  categoryItemCounts: Record<string, number>;
  favoritesCount: number;
  language: Language;
}

export const CategorySidebar: React.FC<CategorySidebarProps> = ({
  categories,
  activeCategoryId,
  onSelectCategory,
  selectedTag,
  onSelectTag,
  categoryItemCounts,
  favoritesCount,
  language,
}) => {
  const t = translations[language];

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Building2': return <Building2 className="w-4 h-4" />;
      case 'Building': return <Building className="w-4 h-4" />;
      case 'Home': return <Home className="w-4 h-4" />;
      case 'MapPin': return <MapPin className="w-4 h-4" />;
      case 'GraduationCap': return <GraduationCap className="w-4 h-4" />;
      case 'Globe': return <Globe className="w-4 h-4" />;
      case 'Briefcase': return <Briefcase className="w-4 h-4" />;
      case 'AlertCircle': return <AlertCircle className="w-4 h-4" />;
      case 'Users': return <Users className="w-4 h-4" />;
      case 'Repeat': return <Repeat className="w-4 h-4" />;
      case 'Scale': return <Scale className="w-4 h-4" />;
      case 'FileText': return <FileText className="w-4 h-4" />;
      case 'Sparkles': return <Sparkles className="w-4 h-4" />;
      case 'Heart': return <Heart className="w-4 h-4" />;
      case 'Tag': return <Tag className="w-4 h-4" />;
      default: return <Building className="w-4 h-4" />;
    }
  };

  const tagFilters: { id: HousingTag | 'all' | 'favorites'; label: string; count?: number }[] = [
    { id: 'all', label: t.all },
    { id: 'privat', label: t.privateHousing },
    { id: 'salg', label: t.salesTag },
    { id: 'almen', label: t.publicHousing },
    { id: 'studie', label: t.studentHousing },
    { id: 'ferie', label: t.vacationTag },
    { id: 'erhverv', label: t.commercialTag },
    { id: 'andel', label: t.coopTag },
    { id: 'radgivning', label: t.advice },
    { id: 'myndighed', label: t.authorityTag },
    { id: 'favorites', label: t.favoritesOnly, count: favoritesCount },
  ];

  return (
    <aside id="sidebar-navigation" className="space-y-6">
      {/* Quick Filter Pills */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-blue-600" />
            {t.filterByTag}
          </span>
          {(selectedTag !== 'all' || activeCategoryId !== null) && (
            <button
              type="button"
              onClick={() => {
                onSelectTag('all');
                onSelectCategory(null);
              }}
              className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-0.5"
            >
              <X className="w-3 h-3" />
              {t.clearFilters}
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5">
          {tagFilters.map((filter) => {
            const isSelected = selectedTag === filter.id;
            return (
              <button
                key={filter.id}
                type="button"
                onClick={() => onSelectTag(filter.id)}
                className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {filter.id === 'favorites' && (
                  <Star className={`w-3 h-3 ${isSelected ? 'fill-white' : 'fill-amber-400 text-amber-500'}`} />
                )}
                <span>{filter.label}</span>
                {filter.count !== undefined && filter.count > 0 && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isSelected ? 'bg-blue-800 text-white' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {filter.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Categories List */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            {t.categories}
          </h3>
          <span className="text-xs text-slate-400 font-medium">{categories.length} {language === 'da' ? 'kategorier' : 'categories'}</span>
        </div>

        <ul className="space-y-1">
          {/* Show All */}
          <li>
            <button
              type="button"
              onClick={() => onSelectCategory(null)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                activeCategoryId === null
                  ? 'bg-blue-50 text-blue-700 font-semibold'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <span>{t.allCategories}</span>
              <CheckCircle className={`w-3.5 h-3.5 ${activeCategoryId === null ? 'text-blue-600' : 'opacity-0'}`} />
            </button>
          </li>

          {/* Category Items */}
          {categories.map((cat) => {
            const count = categoryItemCounts[cat.id] || 0;
            const isSelected = activeCategoryId === cat.id;

            return (
              <li key={cat.id}>
                <a
                  href={`#${cat.id}`}
                  onClick={(e) => {
                    // Smooth scroll without reloading
                    onSelectCategory(cat.id);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-all ${
                    isSelected
                      ? 'bg-blue-50 text-blue-700 font-semibold'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <span className="flex items-center gap-2 truncate pr-2">
                    <span className="text-slate-400 shrink-0">
                      {getCategoryIcon(cat.iconName)}
                    </span>
                    <span className="truncate">{cat.title[language]}</span>
                  </span>

                  <span className={`text-[11px] font-mono px-1.5 py-0.5 rounded ${
                    count > 0 ? 'bg-slate-100 text-slate-600 font-medium' : 'text-slate-300'
                  }`}>
                    {count}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
};

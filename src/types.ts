export type Language = 'da' | 'en';

export type HousingTag = 
  | 'almen'
  | 'venteliste'
  | 'studie'
  | 'privat'
  | 'gratis-opskrivning'
  | 'akut'
  | 'pension'
  | 'bytte'
  | 'radgivning'
  | 'senior'
  | 'salg'
  | 'data'
  | 'ferie'
  | 'erhverv'
  | 'andel'
  | 'myndighed';

export interface HousingItem {
  id: string;
  name: string;
  desc: {
    da: string;
    en: string;
  };
  url: string;
  location: string;
  tags: HousingTag[];
  isVerified?: boolean;
  highlightBadge?: {
    da: string;
    en: string;
  };
  tip?: {
    da: string;
    en: string;
  };
}

export interface HousingCategory {
  id: string;
  categoryNumber: number;
  title: {
    da: string;
    en: string;
  };
  description: {
    da: string;
    en: string;
  };
  iconName: string;
  items: HousingItem[];
}

export interface SubscriptionInfo {
  isUnlocked: boolean;
  unlockedAt: string | null;
  customerEmail: string | null;
  planName: string;
}

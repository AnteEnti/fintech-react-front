export enum PageType {
  HOME = 'HOME',
  LEARN = 'LEARN',
  CALCULATOR = 'CALCULATOR',
  COMPARISON = 'COMPARISON',
  TIP = 'TIP',
  GUIDE = 'GUIDE',
  ABOUT = 'ABOUT',
  LEGAL = 'LEGAL',
  INTERACTIVE_GUIDE = 'INTERACTIVE_GUIDE',
  DASHBOARD = 'DASHBOARD',
}

export interface Link {
  title: { en: string; te: string };
  path: string;
}

export interface PageData {
  path: string;
  type: PageType;
  title: {
    en: string;
    te: string;
  };
  description: {
    en: string;
    te: string;
  };
  category?: {
    en: string;
    te: string;
  };
  group?: {
    en: string;
    te: string;
  };
  interlinks: Link[];
  componentName?: string;
  isProtected?: boolean;
  icon?: string;
}

export interface SitemapCategory {
  name: {
    en: string;
    te: string;
  };
  pages: PageData[];
}

export interface Sitemap {
  learn: SitemapCategory[];
  calculators: SitemapCategory[];
  comparisons: PageData[];
  tips: PageData[];
  interactiveGuides: PageData[];
}

export interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
}

// --- User & Personalization Types ---

export interface User {
  username: string;
}

export interface SavedCalculation {
  id: string; // timestamp
  path: string;
  pageTitle: { en: string; te: string };
  inputs: Record<string, any>;
  date: string;
}

export interface UserData {
  user: User;
  bookmarks: string[]; // array of page paths
  calculations: SavedCalculation[];
}
export type TabId = 'tidy' | 'find' | 'share';

export interface Photo {
  id: string;
  src: string;
  alt: string;
  date: string;
}

export interface ScreenshotMock {
  title: string;
  lines: number;
}

export interface ReviewFrame {
  src?: string;
  alt?: string;
  screenshot?: ScreenshotMock;
  label?: string;
  best?: boolean;
  badge?: string;
}

export type ReviewKind = 'single' | 'duplicate';

export interface ReviewItem {
  id: string;
  kind: ReviewKind;
  reason: string;
  meta: string;
  mb: number;
  frames: ReviewFrame[];
}

export interface Pile {
  id: string;
  title: string;
  subtitle: string;
  count: number;
  freeable: string;
  tint: 'blur' | 'dup' | 'shot' | 'paper' | 'video';
  why: string;
  thumbs: ReviewFrame[];
  gallery: ReviewFrame[];
  items: ReviewItem[];
}

export interface Person {
  id: string;
  name: string;
  src?: string;
  initials?: string;
}

export interface SavedQuery {
  id: string;
  text: string;
  keywords: string[];
  understood: string[];
  count: number;
  results: Photo[];
}
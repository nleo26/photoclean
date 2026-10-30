export interface SummaryFeature {
  id: string;
  tab: 'tidy' | 'find' | 'share';
  findQuery?: string;
  title: string;
  copy: string;
}

export const summaryFeatures: SummaryFeature[] = [
{
  id: 'clean',
  tab: 'tidy',
  title: 'Clear what you won’t miss',
  copy: 'Blurry shots, old screenshots and receipts, sorted into piles you clear in a tap.'
},
{
  id: 'find',
  tab: 'find',
  findQuery: 'flowers',
  title: 'Find any moment',
  copy: 'Search the way you talk — “flowers”, “Jimmy’s birthday”, “this house”.'
},
{
  id: 'share',
  tab: 'share',
  title: 'Share the right photos',
  copy: 'Pick a person and who it’s for. Every photo of them, sent in one go.'
}];
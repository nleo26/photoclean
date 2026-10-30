import { ALT, IMG } from './photos';
import type { Pile, ReviewFrame } from '../types';

const blur: ReviewFrame = { src: IMG.blurry, alt: ALT.blurry };
const pocket: ReviewFrame = { src: IMG.pocket, alt: ALT.pocket };

export const storage = {
  usedGb: 112,
  totalGb: 128,
  reclaimableGb: 7.9,
  libraryCount: '18,432'
};

export const piles: Pile[] = [
{
  id: 'blurry',
  title: 'Blurry & shaky',
  subtitle: 'Nothing in focus, safe to let go',
  count: 42,
  freeable: '1.4 GB',
  tint: 'blur',
  why: 'Nothing in these frames is sharp enough to make out.',
  thumbs: [blur, pocket, blur],
  gallery: [blur, pocket, blur, blur, pocket, blur, pocket, blur, blur, blur, pocket, blur, blur, pocket, blur],
  items: [
  {
    id: 'blur-1',
    kind: 'single',
    reason: 'Very out of focus',
    meta: 'Mar 12, 2024 · 4.1 MB · Blue Bottle Coffee',
    mb: 4.1,
    frames: [{ src: IMG.blurry, alt: ALT.blurry }]
  },
  {
    id: 'blur-2',
    kind: 'single',
    reason: 'Camera moved mid-shot',
    meta: 'Mar 12, 2024 · 3.8 MB · Blue Bottle Coffee',
    mb: 3.8,
    frames: [{ src: IMG.blurry, alt: ALT.blurry }]
  },
  {
    id: 'blur-3',
    kind: 'single',
    reason: 'Taken by accident in a pocket',
    meta: 'Nov 4, 2023 · 5.2 MB · Home',
    mb: 5.2,
    frames: [pocket]
  }]

},
{
  id: 'duplicates',
  title: 'Near-duplicates',
  subtitle: '46 sets — we picked the sharpest in each',
  count: 128,
  freeable: '2.1 GB',
  tint: 'dup',
  why: 'Each set was taken seconds apart — the sharpest one is already picked.',
  thumbs: [{ src: IMG.jimmy, alt: ALT.jimmy }, { src: IMG.cake, alt: ALT.cake }, { src: IMG.dog, alt: ALT.dog }],
  gallery: [
  { src: IMG.cake, alt: ALT.cake, badge: '3 shots' },
  { src: IMG.jimmy, alt: ALT.jimmy, badge: '2 shots' },
  { src: IMG.dog, alt: ALT.dog, badge: '2 shots' },
  { src: IMG.beach, alt: ALT.beach, badge: '4 shots' },
  { src: IMG.flowers1, alt: ALT.flowers1, badge: '2 shots' },
  { src: IMG.house, alt: ALT.house, badge: '2 shots' },
  { src: IMG.mom, alt: ALT.mom, badge: '3 shots' },
  { src: IMG.cake, alt: ALT.cake, badge: '2 shots' },
  { src: IMG.dog, alt: ALT.dog, badge: '5 shots' },
  { src: IMG.flowers2, alt: ALT.flowers2, badge: '2 shots' },
  { src: IMG.food, alt: ALT.food, badge: '4 shots' },
  { src: IMG.dad, alt: ALT.dad, badge: '3 shots' },
  { src: IMG.jimmy, alt: ALT.jimmy, badge: '2 shots' },
  { src: IMG.food, alt: ALT.food, badge: '2 shots' }],

  items: [
  {
    id: 'dup-1',
    kind: 'duplicate',
    reason: '2 shots, 1 second apart',
    meta: "Jimmy's birthday · Jun 14, 2024 · 9.4 MB",
    mb: 4.7,
    frames: [
    { src: IMG.cake, alt: ALT.cake, label: 'Sharpest', best: true },
    { src: IMG.cake, alt: 'Second, near-identical photo of the birthday cake', label: 'Slightly soft' }]

  },
  {
    id: 'dup-2',
    kind: 'duplicate',
    reason: '2 shots, same pose',
    meta: 'Backyard · Apr 27, 2024 · 8.8 MB',
    mb: 4.4,
    frames: [
    { src: IMG.jimmy, alt: ALT.jimmy, label: 'Eyes open', best: true },
    { src: IMG.jimmy, alt: 'Second, near-identical photo of Jimmy', label: 'Mid-blink' }]

  },
  {
    id: 'dup-3',
    kind: 'duplicate',
    reason: '2 shots while Biscuit ran',
    meta: 'Riverside Park · Jul 21, 2023 · 11.2 MB',
    mb: 5.6,
    frames: [
    { src: IMG.dog, alt: ALT.dog, label: 'In focus', best: true },
    { src: IMG.dog, alt: 'Second, near-identical photo of Biscuit', label: 'Motion blur' }]

  }]

},
{
  id: 'screenshots',
  title: 'Old screenshots',
  subtitle: 'Chats, maps and tickets from last year',
  count: 96,
  freeable: '0.5 GB',
  tint: 'shot',
  why: 'Screenshots older than 12 months that you have never opened again.',
  thumbs: [
  { src: IMG.shotChat, alt: ALT.shotChat },
  { src: IMG.shotTicket, alt: ALT.shotTicket },
  { src: IMG.shotMap, alt: ALT.shotMap }],

  gallery: [
  { src: IMG.shotChat, alt: ALT.shotChat },
  { src: IMG.shotTicket, alt: ALT.shotTicket, badge: 'Expired' },
  { src: IMG.shotMap, alt: ALT.shotMap },
  { screenshot: { title: 'Wifi code', lines: 3 } },
  { src: IMG.shotChat, alt: ALT.shotChat },
  { src: IMG.shotMap, alt: ALT.shotMap },
  { screenshot: { title: 'Order #4821', lines: 5 } },
  { src: IMG.shotTicket, alt: ALT.shotTicket, badge: 'Expired' },
  { src: IMG.shotChat, alt: ALT.shotChat },
  { screenshot: { title: 'Pasta recipe', lines: 6 } },
  { src: IMG.shotMap, alt: ALT.shotMap },
  { src: IMG.shotChat, alt: ALT.shotChat }],

  items: [
  {
    id: 'shot-1',
    kind: 'single',
    reason: 'Screenshot from 14 months ago',
    meta: 'Jul 3, 2024 · 1.2 MB',
    mb: 1.2,
    frames: [{ src: IMG.shotChat, alt: ALT.shotChat }]
  },
  {
    id: 'shot-2',
    kind: 'single',
    reason: 'Boarding pass for a past flight',
    meta: 'Aug 19, 2024 · 1.6 MB',
    mb: 1.6,
    frames: [{ src: IMG.shotTicket, alt: ALT.shotTicket }]
  },
  {
    id: 'shot-3',
    kind: 'single',
    reason: 'Directions you already arrived at',
    meta: 'Sep 1, 2024 · 2.3 MB',
    mb: 2.3,
    frames: [{ src: IMG.shotMap, alt: ALT.shotMap }]
  }]

},
{
  id: 'paperwork',
  title: 'Receipts, notes & whiteboards',
  subtitle: 'Snapped once for reference, never again',
  count: 57,
  freeable: '0.3 GB',
  tint: 'paper',
  why: 'Photos of paper, signs and whiteboards. Save any you still need to Notes, let the rest go.',
  thumbs: [
  { src: IMG.whiteboard, alt: ALT.whiteboard },
  { src: IMG.receipt, alt: ALT.receipt },
  { src: IMG.notes, alt: ALT.notes }],

  gallery: [
  { src: IMG.whiteboard, alt: ALT.whiteboard, badge: 'Whiteboard' },
  { src: IMG.receipt, alt: ALT.receipt, badge: 'Receipt' },
  { src: IMG.parking, alt: ALT.parking, badge: 'Parking' },
  { src: IMG.notes, alt: ALT.notes, badge: 'Notes' },
  { src: IMG.receipt, alt: ALT.receipt, badge: 'Receipt' },
  { src: IMG.whiteboard, alt: ALT.whiteboard, badge: 'Whiteboard' },
  { src: IMG.notes, alt: ALT.notes, badge: 'Notes' },
  { src: IMG.parking, alt: ALT.parking, badge: 'Parking' },
  { src: IMG.receipt, alt: ALT.receipt, badge: 'Receipt' },
  { src: IMG.whiteboard, alt: ALT.whiteboard, badge: 'Whiteboard' },
  { src: IMG.receipt, alt: ALT.receipt, badge: 'Receipt' },
  { src: IMG.notes, alt: ALT.notes, badge: 'Notes' }],

  items: [
  {
    id: 'paper-1',
    kind: 'single',
    reason: 'Whiteboard from a meeting 8 months ago',
    meta: 'Jan 22, 2025 · 5.4 MB · Office',
    mb: 5.4,
    frames: [{ src: IMG.whiteboard, alt: ALT.whiteboard }]
  },
  {
    id: 'paper-2',
    kind: 'single',
    reason: 'Receipt — already in your expenses',
    meta: 'Mar 8, 2025 · 3.1 MB · Ippudo',
    mb: 3.1,
    frames: [{ src: IMG.receipt, alt: ALT.receipt }]
  },
  {
    id: 'paper-3',
    kind: 'single',
    reason: 'Parking reminder from last spring',
    meta: 'Apr 14, 2025 · 2.8 MB · Stonestown Garage',
    mb: 2.8,
    frames: [{ src: IMG.parking, alt: ALT.parking }]
  },
  {
    id: 'paper-4',
    kind: 'single',
    reason: 'Class notes from 2023',
    meta: 'Oct 2, 2023 · 4.6 MB',
    mb: 4.6,
    frames: [{ src: IMG.notes, alt: ALT.notes }]
  }]

},
{
  id: 'videos',
  title: 'Long forgotten videos',
  subtitle: 'Over 2 minutes, never opened since',
  count: 14,
  freeable: '3.6 GB',
  tint: 'video',
  why: 'Long videos you have not played since the day you shot them.',
  thumbs: [{ src: IMG.beach, alt: ALT.beach }, { src: IMG.house, alt: ALT.house }, { src: IMG.flowers2, alt: ALT.flowers2 }],
  gallery: [
  { src: IMG.beach, alt: ALT.beach, badge: '4:12' },
  { src: IMG.house, alt: ALT.house, badge: '6:03' },
  { src: IMG.flowers2, alt: ALT.flowers2, badge: '2:38' },
  { src: IMG.dog, alt: ALT.dog, badge: '3:47' },
  { src: IMG.cake, alt: ALT.cake, badge: '5:21' },
  { src: IMG.jimmy, alt: ALT.jimmy, badge: '2:09' },
  { src: IMG.beach, alt: ALT.beach, badge: '8:44' },
  { src: IMG.house, alt: ALT.house, badge: '3:15' },
  { src: IMG.mom, alt: ALT.mom, badge: '2:52' }],

  items: [
  {
    id: 'vid-1',
    kind: 'single',
    reason: '4 min video, never played',
    meta: 'Sep 9, 2022 · 412 MB · Bodega Bay',
    mb: 412,
    frames: [{ src: IMG.beach, alt: ALT.beach }]
  },
  {
    id: 'vid-2',
    kind: 'single',
    reason: '6 min walkthrough, never played',
    meta: 'May 3, 2025 · 604 MB · Linden St',
    mb: 604,
    frames: [{ src: IMG.house, alt: ALT.house }]
  }]

}];
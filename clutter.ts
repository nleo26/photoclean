import type { ImageKey } from './photos';

export type ClutterKind = 'blurry' | 'duplicate' | 'screenshot' | 'paperwork';

export interface RollTile {
  id: string;
  image: ImageKey;
  clutter?: ClutterKind;
}

export const CLUTTER_LABEL: Record<ClutterKind, string> = {
  blurry: 'Blurry',
  duplicate: 'Duplicate',
  screenshot: 'Screenshot',
  paperwork: 'Receipt'
};

export const roll: RollTile[] = [
{ id: 'r1', image: 'jimmy' },
{ id: 'r2', image: 'shotChat', clutter: 'screenshot' },
{ id: 'r3', image: 'blurry', clutter: 'blurry' },
{ id: 'r4', image: 'flowers1' },
{ id: 'r5', image: 'receipt', clutter: 'paperwork' },
{ id: 'r6', image: 'cake' },
{ id: 'r7', image: 'cake', clutter: 'duplicate' },
{ id: 'r8', image: 'dog' },
{ id: 'r9', image: 'whiteboard', clutter: 'paperwork' },
{ id: 'r10', image: 'beach' },
{ id: 'r11', image: 'pocket', clutter: 'blurry' },
{ id: 'r12', image: 'house' },
{ id: 'r13', image: 'shotTicket', clutter: 'screenshot' },
{ id: 'r14', image: 'mom' },
{ id: 'r15', image: 'food' },
{ id: 'r16', image: 'flowers2' }];


export const clutterPiles: {id: ClutterKind;label: string;count: number;images: ImageKey[];}[] = [
{ id: 'duplicate', label: 'Duplicates', count: 128, images: ['cake', 'food'] },
{ id: 'screenshot', label: 'Screenshots', count: 96, images: ['shotChat', 'shotTicket'] },
{ id: 'paperwork', label: 'Receipts & notes', count: 57, images: ['receipt', 'whiteboard'] },
{ id: 'blurry', label: 'Blurry', count: 42, images: ['blurry', 'pocket'] }];
import { tiles } from './photos';
import type { SavedQuery } from '../types';

export const suggestions = [
'flowers',
"photos I took at this house",
"Jimmy's birthday",
'the whiteboard from the planning meeting',
'beach trips in 2022'];


export const savedQueries: SavedQuery[] = [
{
  id: 'flowers',
  text: 'flowers',
  keywords: ['flower', 'flowers', 'tulip', 'roses', 'garden'],
  understood: ['Looking for: flowers', 'Any date', 'Anywhere'],
  count: 24,
  results: tiles(
    ['flowers1', 'flowers2', 'flowers1', 'flowers2', 'flowers1', 'flowers2', 'flowers1', 'flowers2', 'flowers1'],
    'q-flowers'
  )
},
{
  id: 'house',
  text: "photos I took at this house",
  keywords: ['house', 'home', 'linden'],
  understood: ['Place: 42 Linden St', 'Spanning 2019 – 2025', 'Includes indoor shots'],
  count: 186,
  results: tiles(
    ['house', 'flowers1', 'jimmy', 'house', 'dog', 'cake', 'house', 'flowers2', 'mom'],
    'q-house'
  )
},
{
  id: 'birthday',
  text: "Jimmy's birthday",
  keywords: ['jimmy', 'birthday', 'cake', 'party'],
  understood: ['Person: Jimmy', 'Event: birthday', 'Jun 14, 2024'],
  count: 63,
  results: tiles(
    ['cake', 'jimmy', 'cake', 'jimmy', 'dog', 'cake', 'jimmy', 'mom', 'cake'],
    'q-birthday'
  )
},
{
  id: 'whiteboard',
  text: 'the whiteboard from the planning meeting',
  keywords: ['whiteboard', 'meeting', 'receipt', 'notes'],
  understood: ['Looking for: whiteboards', 'Place: Office', 'Text in photo: “planning”'],
  count: 7,
  results: tiles(['whiteboard', 'notes', 'whiteboard', 'receipt', 'whiteboard', 'notes'], 'q-whiteboard')
},
{
  id: 'beach',
  text: 'beach trips in 2022',
  keywords: ['beach', 'ocean', 'sea', '2022', 'trip'],
  understood: ['Subject: beach', 'Year: 2022', '3 trips found'],
  count: 41,
  results: tiles(['beach', 'beach', 'dog', 'beach', 'flowers2', 'beach'], 'q-beach')
}];


export function matchQuery(input: string): SavedQuery | undefined {
  const q = input.trim().toLowerCase();
  if (!q) return undefined;
  return savedQueries.find((saved) => saved.keywords.some((k) => q.includes(k)));
}
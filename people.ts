import { IMG, tiles } from './photos';
import type { Person, Photo } from '../types';

export const subjects: Person[] = [
{ id: 'jimmy', name: 'Jimmy', src: IMG.jimmy },
{ id: 'biscuit', name: 'Biscuit', src: IMG.dog },
{ id: 'mom-dad', name: 'Mom & Dad', src: IMG.mom },
{ id: 'linden', name: 'Linden St', src: IMG.house }];


export const recipients: Person[] = [
{ id: 'mom', name: 'Mom', src: IMG.mom },
{ id: 'dad', name: 'Dad', src: IMG.dad },
{ id: 'grandma', name: 'Grandma', initials: 'GR' },
{ id: 'sarah', name: 'Sarah', initials: 'SL' }];


export const subjectPhotos: Record<string, Photo[]> = {
  jimmy: tiles(['jimmy', 'cake', 'jimmy', 'dog', 'cake', 'jimmy', 'beach', 'jimmy', 'cake'], 'share-jimmy'),
  biscuit: tiles(['dog', 'dog', 'house', 'dog', 'beach', 'dog'], 'share-biscuit'),
  'mom-dad': tiles(['mom', 'dad', 'cake', 'house', 'mom', 'beach'], 'share-momdad'),
  linden: tiles(['house', 'flowers1', 'house', 'flowers2', 'dog', 'house', 'jimmy'], 'share-linden')
};
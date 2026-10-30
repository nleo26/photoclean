import { ALT, IMG } from './photos';
import type { ReviewFrame } from '../types';

export interface VideoCategory {
  id: string;
  label: string;
  count: number;
  frames: ReviewFrame[];
}

export const videoCategories: VideoCategory[] = [
{
  id: 'long',
  label: 'Long videos',
  count: 14,
  frames: [
  { src: IMG.beach, alt: ALT.beach, badge: '8:44' },
  { src: IMG.house, alt: ALT.house, badge: '6:03' },
  { src: IMG.cake, alt: ALT.cake, badge: '5:21' },
  { src: IMG.flowers2, alt: ALT.flowers2, badge: '4:12' }]

},
{
  id: 'home',
  label: 'Home videos',
  count: 31,
  frames: [
  { src: IMG.jimmy, alt: ALT.jimmy, badge: '1:12' },
  { src: IMG.dog, alt: ALT.dog, badge: '0:48' },
  { src: IMG.mom, alt: ALT.mom, badge: '2:05' },
  { src: IMG.cake, alt: ALT.cake, badge: '0:36' }]

},
{
  id: 'accidental',
  label: 'Accidental takes',
  count: 23,
  frames: [
  { src: IMG.pocket, alt: ALT.pocket, badge: '0:03' },
  { src: IMG.blurry, alt: ALT.blurry, badge: '0:02' },
  { src: IMG.pocket, alt: ALT.pocket, badge: '0:05' },
  { src: IMG.blurry, alt: ALT.blurry, badge: '0:01' }]

},
{
  id: 'recordings',
  label: 'Screen recordings',
  count: 9,
  frames: [
  { src: IMG.shotChat, alt: ALT.shotChat, badge: '0:41' },
  { src: IMG.shotMap, alt: ALT.shotMap, badge: '1:10' },
  { src: IMG.shotTicket, alt: ALT.shotTicket, badge: '0:22' },
  { src: IMG.shotChat, alt: ALT.shotChat, badge: '0:15' }]

}];
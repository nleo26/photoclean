import type { Photo } from '../types';

export const IMG = {
  flowers1: "/50808c67-e44a-44e0-9804-c9d8a13b222e.jpg",

  flowers2: "/8f55cc16-f30f-4455-957d-7648c0fc9eb7.jpg",

  jimmy: "/33f09ee0-8215-4edd-89a2-2332ccf2edeb.jpg",

  house: "/70f403af-77a5-4ced-a118-f4c292205300.jpg",

  blurry: "/99e5743b-57cd-43d2-bc27-a64136556878.jpg",

  beach: "/81576344-b776-4ea0-b6d5-bbbf20e2f83d.jpg",

  dog: "/75bb3ac6-09b1-4f4b-ad24-62265f5e0406.jpg",
  cake: "/ed65a9eb-cbd0-463d-9d56-3c649e0810ae.jpg",
  mom: "/f58480a8-d192-4714-9ed7-ebc08c301aa9.jpg",
  dad: "/2f2a6d87-95fa-4576-ac7a-9d91eeebce11.jpg",
  whiteboard: "/71a6ae5b-15f6-4de9-89d4-57cf84b9988e.jpg",

  receipt: "/3c0f591f-a8af-44b2-89ed-e947a7435bac.jpg",

  parking: "/381a4003-0736-4732-be2a-258b1a0c1256.jpg",

  notes: "/3bffc455-ba89-4610-97f4-519d5f7669dc.jpg",

  pocket: "/3fadd0a6-719c-4232-a689-7aadb662e259.jpg",

  food: "/1050070c-135e-42da-b9d8-295cc093535b.jpg",
  shotMap: "/99da8b40-55ae-4b18-9ed7-575b6eeb0bc6.jpg",

  shotChat: "/ab65c79e-dd1c-4f31-a2d5-d67dc546d374.jpg",

  shotTicket: "/1aebf6bb-3f9a-4dee-b777-0026d938b9a5.jpg"

} as const;

export type ImageKey = keyof typeof IMG;

export const ALT: Record<ImageKey, string> = {
  flowers1: 'Pink and yellow tulips in a sunny garden',
  flowers2: 'Orange garden roses in bright sunlight',
  jimmy: 'Jimmy laughing in the backyard',
  house: 'The house on Linden Street',
  blurry: 'Out of focus photo taken inside a cafe',
  beach: 'Two people walking on the beach at sunset',
  dog: 'Biscuit running across the park',
  cake: 'Birthday cake with lit candles',
  mom: 'Portrait of Mom smiling outdoors',
  dad: 'Portrait of Dad smiling outdoors',
  whiteboard: 'Whiteboard full of diagrams and sticky notes from a meeting',
  receipt: 'Crumpled restaurant receipt on a table',
  parking: 'Parking garage pillar marked level P4',
  notes: 'Handwritten lecture notes in a spiral notebook',
  pocket: 'Accidental dark photo taken inside a pocket',
  food: 'Bowl of ramen from above',
  shotMap: 'Screenshot of directions in a maps app',
  shotChat: 'Screenshot of a text conversation',
  shotTicket: 'Screenshot of a boarding pass with a QR code'
};

const DATES = [
'Jun 14, 2024',
'Aug 2, 2023',
'Apr 27, 2024',
'Sep 9, 2022',
'May 3, 2025',
'Jul 21, 2023'];


export function tiles(keys: ImageKey[], prefix: string): Photo[] {
  return keys.map((key, i) => ({
    id: `${prefix}-${i}`,
    src: IMG[key],
    alt: ALT[key],
    date: DATES[i % DATES.length]
  }));
}
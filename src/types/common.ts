export interface SkateLocationData {
  id: string;
  name: string;
  addressLine1: string;
  addressLine2: string;
  coordinates: [number, number];
  features: SkateLocationFeatures[];
}

export interface Boards {
  id: string;
  name: string;
}

type SkateLocationFeatures = 'Indoor' | 'Outdoor' | 'Halfpipe' | 'Bowl' | 'Streetpark';

export type Views = (typeof availableViews)[number];

export const availableViews = ['choose_location', 'pick_skate_and_date'];

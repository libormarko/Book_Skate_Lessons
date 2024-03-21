export interface SkateLocationData {
  id: string;
  name: string;
  addressLine1: string;
  addressLine2: string;
  coordinates: [number, number];
  features: SkateLocationFeatures[];
}

type SkateLocationFeatures = 'Indoor' | 'Outdoor' | 'Halfpipe' | 'Bowl' | 'Streetpark';

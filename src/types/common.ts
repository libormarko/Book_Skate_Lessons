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

export interface UserDecision {
  skatePark: SkatePark;
  boardAndTimeslot?: BoardAndTimeslot;
}

export interface SkatePark {
  id?: string;
  addressLine1?: string;
  addressLine2?: string;
  name?: string;
}

export interface BoardAndTimeslot {
  board?: string;
  timeslot?: Timeslot;
}

export type SelectedBoard = (typeof availableBoards)[number];

export const availableBoards = ['Skateboard', 'Longboard', 'Snakeboard'];

export interface Timeslot {
  date?: string;
  time?: string;
}

export interface SelectedSkatePark {
  id: string;
  source: 'marker' | 'listItem';
}

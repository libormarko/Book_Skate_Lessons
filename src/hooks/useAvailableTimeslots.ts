import { useCallback } from 'react';

export const useAvailableTimeslots = () => {
  const timeslotsMonThu: string[] = ['10:00-12:00', '14:00-16:00', '17:00-19:00'];
  const timeslotsTueFriSat: string[] = ['12:00-14:00', '15:00-17:00'];
  const timeslotsWedSun: [] = [];

  return useCallback((weekday: number) => {
    switch (weekday) {
      case 1:
      case 4:
        return timeslotsMonThu;
      case 2:
      case 5:
      case 6:
        return timeslotsTueFriSat;
      case 3:
      case 0:
        return timeslotsWedSun;
    }
  }, []);
};

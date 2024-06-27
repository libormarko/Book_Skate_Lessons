import React, { useEffect, useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Button } from '@mui/material';
import {
  TimeslotPickerContainer,
  DateTimeSelection,
  DatePickerContainer,
  TimeslotsContainer,
  TimeslotButton
} from './PickSkateAndTimeslot.styles';
import dayjs from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale';
import { useAvailableTimeslots } from '../hooks/useAvailableTimeslots';
import { Timeslot } from '../types/common';
import { i18nEN } from '../apiData/i18nEN';

interface TimeslotPickerProps {
  selectedTimeslot: Timeslot | undefined;
  setSelectedTimeslot: (value: any) => void;
}

export const TimeslotPicker: React.FC<TimeslotPickerProps> = ({
  selectedTimeslot,
  setSelectedTimeslot
}) => {
  const { pickSkateAndTimeslot } = i18nEN;
  const [availableTimeslots, setAvailableTimeslots] = useState<any[] | undefined>(undefined);

  const findAvailableTimeslots = useAvailableTimeslots();

  useEffect(() => {
    dayjs.extend(updateLocale);
    dayjs.updateLocale('en', {
      weekStart: 1
    });
  }, []);

  useEffect(() => {
    if (selectedTimeslot?.date) {
      const date = new Date(selectedTimeslot.date);
      const foundTimeslots = findAvailableTimeslots(date.getDay());
      setAvailableTimeslots(foundTimeslots);
    }
  }, [selectedTimeslot]);

  const handleDatePick = (date: any) => {
    setSelectedTimeslot({ date: date?.format('YYYY-MM-DD'), time: undefined });
  };

  return (
    <TimeslotPickerContainer>
      <DateTimeSelection>
        <p>{pickSkateAndTimeslot.pickDateTimeslotLabel}</p>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePickerContainer>
            <DatePicker
              defaultValue={(selectedTimeslot?.date && dayjs(selectedTimeslot?.date)) || null}
              disablePast
              maxDate={dayjs('2024-12-31')}
              onChange={(value) => handleDatePick(value)}
            />
          </DatePickerContainer>
        </LocalizationProvider>
      </DateTimeSelection>
      <TimeslotsContainer>
        {selectedTimeslot?.date && availableTimeslots && availableTimeslots.length === 0
          ? pickSkateAndTimeslot.noAvailableTimeslotsLabel
          : availableTimeslots?.map((timeslot) => {
              return (
                <TimeslotButton
                  key={timeslot}
                  selected={timeslot === selectedTimeslot?.time}
                  variant="contained"
                  onClick={() =>
                    setSelectedTimeslot((prevState: any) => ({ ...prevState, time: timeslot }))
                  }
                >
                  {timeslot}
                </TimeslotButton>
              );
            })}
      </TimeslotsContainer>
    </TimeslotPickerContainer>
  );
};

export default TimeslotPicker;

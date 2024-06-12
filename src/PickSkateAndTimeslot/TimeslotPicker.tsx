import React, { useEffect, useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Button } from '@mui/material';
import { TimeslotPickerContainer, DateTimeSelection } from './PickSkateAndTimeslot.styles';
import { styled } from '@mui/material/styles';
import dayjs from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale';
import { useAvailableTimeslots } from '../hooks/useAvailableTimeslots';

export const TimeslotButton = styled(Button)<any>(({ selected }) => ({
  backgroundColor: selected ? 'black' : 'white',
  borderRadius: '20px',
  color: selected ? 'white' : 'black',
  '&:hover': {
    backgroundColor: selected ? 'black' : 'lightgrey'
  }
}));

// TODO specify any types

interface TimeslotPickerProps {
  selectedTimeslot: any;
  setSelectedTimeslot: (value: any) => void;
}

export const TimeslotPicker: React.FC<TimeslotPickerProps> = ({
  selectedTimeslot,
  setSelectedTimeslot
}) => {
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
        <p>Pick from available dates and time:</p>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            defaultValue={selectedTimeslot.date && dayjs(selectedTimeslot?.date)}
            disablePast
            maxDate={dayjs('2024-12-31')}
            onChange={(value) => handleDatePick(value)}
          />
        </LocalizationProvider>
      </DateTimeSelection>
      {selectedTimeslot?.date && availableTimeslots && availableTimeslots.length === 0
        ? 'No available spots, pick a different date'
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
    </TimeslotPickerContainer>
  );
};

export default TimeslotPicker;

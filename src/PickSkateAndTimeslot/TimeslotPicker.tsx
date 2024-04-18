import React, { useEffect, useState, useRef, useCallback } from 'react';
import ArrowBack from '@mui/icons-material/ArrowBack';
import ArrowForward from '@mui/icons-material/ArrowForward';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Button,
  ButtonProps
} from '@mui/material';
import { boards } from './boards';
import {
  PickSkateAndDateContainer,
  SelectedSkatePark,
  SkateParkName,
  SkateParkAddressWrapper,
  AddressLine1,
  AddressLine2,
  BoardSelection,
  RadioWrapper,
  BoardName,
  BoardImage,
  TimeslotPickerContainer,
  DateTimeSelection,
  ButtonsWrapper
} from './PickSkateAndTimeslot.styles';
import { styled } from '@mui/material/styles';
import dayjs from 'dayjs';
import { time } from 'console';

export const TimeslotButton = styled(Button)<any>(({ selected }) => ({
  backgroundColor: selected ? 'black' : 'white',
  borderRadius: '20px',
  color: selected ? 'white' : 'black',
  '&:hover': {
    backgroundColor: selected ? 'black' : 'lightgrey'
  }
}));

// TODO add different time slots based on a day
export const timeslots: any[] = ['10:00-12:00', '12:00-14:00', '14:00-16:00'];

// TODO specify any types

interface TimeslotPickerProps {
  selectedTimeslot: any;
  setSelectedTimeslot: (value: string) => void;
}

export const TimeslotPicker: React.FC<any> = ({ selectedTimeslot, setSelectedTimeslot }) => {
  const handleDatePick = (date: any) => {
    setSelectedTimeslot({ date: date?.format('YYYY-MM-DD'), time: null });
  };

  return (
    <TimeslotPickerContainer>
      <DateTimeSelection>
        <p>Pick from available dates and time:</p>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            disablePast
            maxDate={dayjs('2024-12-31')}
            onChange={(value) => handleDatePick(value)}
          />
        </LocalizationProvider>
      </DateTimeSelection>
      {selectedTimeslot?.date &&
        timeslots.map((timeslot) => {
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

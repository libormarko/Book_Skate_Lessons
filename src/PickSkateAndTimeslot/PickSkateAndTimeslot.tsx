import React, { useEffect, useState, useRef, useCallback, Dispatch } from 'react';
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
import { TimeslotPicker } from './TimeslotPicker';
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
  DateTimeSelection,
  ButtonsWrapper
} from './PickSkateAndTimeslot.styles';
import { styled } from '@mui/material/styles';
import dayjs from 'dayjs';
import { SkateLocationData, Views } from '../types/common';

// TODO specify any types

interface PickSkateAndTimeslotProps {
  setView: Dispatch<{ view: Views; props?: any }>;
}

export const PickSkateAndTimeslot: React.FC<PickSkateAndTimeslotProps> = ({ setView }) => {
  const [selectedSkatePark, setSelectedSkatePark] = useState<any>();
  const [selectedBoard, setSelectedBoard] = useState<any>();
  const [selectedTimeslot, setSelectedTimeslot] = useState<{ date: any; time: any } | undefined>();

  useEffect(() => {
    const userDecision = sessionStorage.getItem('bookSkateLesson');
    const parsedUserDecision = userDecision && JSON.parse(decodeURIComponent(userDecision));
    if (parsedUserDecision) setSelectedSkatePark(parsedUserDecision);
  }, []);

  const handleSubmit = () => {
    sessionStorage.removeItem('bookSkateLesson');
    // maybe pass props in structured way?
    setView({
      view: 'confirmation_page',
      props: { selectedSkatePark, selectedBoard, selectedTimeslot }
    });
  };

  return (
    <PickSkateAndDateContainer>
      <h3>Pick Board And Date</h3>
      {selectedSkatePark && (
        <SelectedSkatePark>
          <p>Your selected skate park:</p>
          <SkateParkName>{selectedSkatePark.name}</SkateParkName>
          <SkateParkAddressWrapper>
            <AddressLine1>{selectedSkatePark.addressLine1}</AddressLine1>
            <AddressLine2>{selectedSkatePark.addressLine2}</AddressLine2>
          </SkateParkAddressWrapper>
        </SelectedSkatePark>
      )}
      <BoardSelection>
        <p>Pick one from available boards:</p>
        {boards.map((board) => {
          return (
            <div key={board.id}>
              <RadioWrapper
                onClick={() => {
                  setSelectedBoard(board.name);
                }}
              >
                <Radio
                  checked={selectedBoard === board.name}
                  value={board.id}
                  name="skate-parks-radio-group"
                />
                <BoardName>{board.name}</BoardName>
                <BoardImage
                  src={process.env.PUBLIC_URL + `/${board.name}.jpg`}
                  alt={`${board.name}_image`}
                />
              </RadioWrapper>
            </div>
          );
        })}
        {selectedBoard && (
          <TimeslotPicker
            selectedTimeslot={selectedTimeslot}
            setSelectedTimeslot={setSelectedTimeslot}
          />
        )}
      </BoardSelection>
      <ButtonsWrapper>
        <Button
          variant="outlined"
          onClick={() => setView({ view: 'choose_location' })}
          startIcon={<ArrowBack />}
        >
          Back to skate park selection
        </Button>
        <Button
          variant="contained"
          disabled={!selectedTimeslot?.time}
          onClick={() => handleSubmit()}
          endIcon={<ArrowForward />}
        >
          Submit
        </Button>
      </ButtonsWrapper>
    </PickSkateAndDateContainer>
  );
};

export default PickSkateAndTimeslot;

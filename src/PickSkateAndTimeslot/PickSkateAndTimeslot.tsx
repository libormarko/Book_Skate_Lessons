import React, { useEffect, useState, Dispatch } from 'react';
import ArrowBack from '@mui/icons-material/ArrowBack';
import ArrowForward from '@mui/icons-material/ArrowForward';
import { Radio, Button } from '@mui/material';
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
  ButtonsWrapper,
  SelectedSkateParkInfoLabel,
  Headline
} from './PickSkateAndTimeslot.styles';
import { Views, UserDecision, SkatePark, SelectedBoard, Timeslot } from '../types/common';
import { i18nEN } from '../apiData/i18nEN';
import { getItemFromSessionStorage } from '../utils/utils';

interface PickSkateAndTimeslotProps {
  setView: Dispatch<{ view: Views; props?: UserDecision }>;
}

export const PickSkateAndTimeslot: React.FC<PickSkateAndTimeslotProps> = ({ setView }) => {
  const { pickSkateAndTimeslot } = i18nEN;
  const [selectedSkatePark, setSelectedSkatePark] = useState<SkatePark>();
  const [selectedBoard, setSelectedBoard] = useState<SelectedBoard>();
  const [selectedTimeslot, setSelectedTimeslot] = useState<Timeslot>();

  useEffect(() => {
    const userDecision = getItemFromSessionStorage('bookSkateLesson');
    const parsedUserDecision: UserDecision =
      userDecision && JSON.parse(decodeURIComponent(userDecision));
    if (parsedUserDecision) {
      setSelectedSkatePark(parsedUserDecision.skatePark);
      setSelectedBoard(parsedUserDecision?.boardAndTimeslot?.board);
      setSelectedTimeslot({
        date: parsedUserDecision?.boardAndTimeslot?.timeslot?.date,
        time: parsedUserDecision?.boardAndTimeslot?.timeslot?.time
      });
    }
  }, []);

  const handleSubmit = () => {
    const userDecision = getItemFromSessionStorage('bookSkateLesson');
    const parsedUserDecision: UserDecision =
      userDecision && JSON.parse(decodeURIComponent(userDecision));
    const updatedUserDecision: UserDecision = {
      skatePark: parsedUserDecision?.skatePark,
      boardAndTimeslot: {
        board: selectedBoard,
        timeslot: selectedTimeslot
      }
    };
    if (parsedUserDecision && selectedBoard && selectedTimeslot) {
      sessionStorage.removeItem('bookSkateLesson');
      setView({
        view: 'summary_page',
        props: updatedUserDecision
      });
    }
  };

  return (
    <PickSkateAndDateContainer>
      <Headline>{pickSkateAndTimeslot.headline}</Headline>
      {selectedSkatePark && (
        <SelectedSkatePark>
          <SelectedSkateParkInfoLabel>
            {pickSkateAndTimeslot.selectedSkateParkInfoLabel}
          </SelectedSkateParkInfoLabel>
          <SkateParkName>{selectedSkatePark.name}</SkateParkName>
          <SkateParkAddressWrapper>
            <AddressLine1>{selectedSkatePark.addressLine1}</AddressLine1>
            <AddressLine2>{selectedSkatePark.addressLine2}</AddressLine2>
          </SkateParkAddressWrapper>
        </SelectedSkatePark>
      )}
      <BoardSelection>
        <p>{pickSkateAndTimeslot.pickBoardLabel}</p>
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
          {pickSkateAndTimeslot.forwardButtonLabel}
        </Button>
        <Button
          variant="contained"
          disabled={!selectedTimeslot?.time}
          onClick={() => handleSubmit()}
          endIcon={<ArrowForward />}
        >
          {pickSkateAndTimeslot.forwardButtonLabel}
        </Button>
      </ButtonsWrapper>
    </PickSkateAndDateContainer>
  );
};

export default PickSkateAndTimeslot;

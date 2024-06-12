import React from 'react';
import { ConfirmationContainer } from './ConfirmationPage.styles';
import { Button } from '@mui/material';
import ArrowForward from '@mui/icons-material/ArrowForward';
import { i18nEN } from '../apiData/i18nEN';
import { UserDecision } from '../types/common';

interface ConfirmationPageProps {
  userDecision: UserDecision | undefined;
}

export const ConfirmationPage: React.FC<ConfirmationPageProps> = ({ userDecision }) => {
  const { confirmationPage } = i18nEN;

  return (
    <ConfirmationContainer>
      <h2>{confirmationPage.headline}</h2>
      <img
        src={process.env.PUBLIC_URL + `/Confirmation.jpg`}
        alt={`confirmation_skate_photo`}
        style={{ maxHeight: '400px', maxWidth: '90vw' }}
      />
      <p>{confirmationPage.detailsHeadline}</p>
      <br />
      <strong>{confirmationPage.selectedSkateParkLabel}</strong>
      <p>{userDecision?.skatePark.name}</p>
      <p>{userDecision?.skatePark.addressLine1}</p>
      <p>{userDecision?.skatePark.addressLine2}</p>
      <br />
      <strong>{confirmationPage.selectedBoardLabel}</strong>
      <p>{userDecision?.boardAndTimeslot?.board}</p>
      <br />
      <strong>{confirmationPage.selectedDateAndTimeLabel}</strong>
      <p>{userDecision?.boardAndTimeslot?.timeslot?.date}</p>
      <p>{userDecision?.boardAndTimeslot?.timeslot?.time}</p>

      <Button
        color="primary"
        variant="contained"
        endIcon={<ArrowForward />}
        href="mailto: name@gmail.com"
      >
        {confirmationPage.buttonLabel}
      </Button>
    </ConfirmationContainer>
  );
};

export default ConfirmationPage;

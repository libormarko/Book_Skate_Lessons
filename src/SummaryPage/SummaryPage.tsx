import React from 'react';
import {
  SummaryContainer,
  SummaryFooter,
  StyledImage,
  BookingDetailsHeadline
} from './SummaryPage.styles';
import { Button } from '@mui/material';
import ArrowForward from '@mui/icons-material/ArrowForward';
import { i18nEN } from '../apiData/i18nEN';
import { UserDecision } from '../types/common';

interface SummaryPageProps {
  userDecision: UserDecision | undefined;
}

export const SummaryPage: React.FC<SummaryPageProps> = ({ userDecision }) => {
  const { summaryPage } = i18nEN;

  return (
    <SummaryContainer>
      <h1>{summaryPage.headline}</h1>
      <StyledImage src={process.env.PUBLIC_URL + `/Summary.jpg`} alt={`summary_skate_photo`} />
      <BookingDetailsHeadline>{summaryPage.detailsHeadline}</BookingDetailsHeadline>
      <strong>{summaryPage.selectedSkateParkLabel}</strong>
      <p>{userDecision?.skatePark.name}</p>
      <p>{userDecision?.skatePark.addressLine1}</p>
      <p>{userDecision?.skatePark.addressLine2}</p>
      <br />
      <strong>{summaryPage.selectedBoardLabel}</strong>
      <p>{userDecision?.boardAndTimeslot?.board}</p>
      <br />
      <strong>{summaryPage.selectedDateAndTimeLabel}</strong>
      <p>{userDecision?.boardAndTimeslot?.timeslot?.date}</p>
      <p>{userDecision?.boardAndTimeslot?.timeslot?.time}</p>

      <SummaryFooter>
        <p>{summaryPage.footerLabel}</p>
        <Button
          color="primary"
          variant="contained"
          endIcon={<ArrowForward />}
          href="mailto: marko.libor@gmail.com"
        >
          {summaryPage.buttonLabel}
        </Button>
      </SummaryFooter>
    </SummaryContainer>
  );
};

export default SummaryPage;

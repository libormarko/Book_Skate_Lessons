import React from 'react';
import { SummaryContainer, SummaryFooter } from './SummaryPage.styles';
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
      <h2>{summaryPage.headline}</h2>
      <img
        src={process.env.PUBLIC_URL + `/Summary.jpg`}
        alt={`summary_skate_photo`}
        style={{ maxHeight: '400px', maxWidth: '90vw' }}
      />
      <p>{summaryPage.detailsHeadline}</p>
      <br />
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
          href="mailto: name@gmail.com"
        >
          {summaryPage.buttonLabel}
        </Button>
      </SummaryFooter>
    </SummaryContainer>
  );
};

export default SummaryPage;

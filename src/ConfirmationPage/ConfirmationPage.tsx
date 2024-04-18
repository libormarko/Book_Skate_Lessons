import React, { useEffect, useState, useRef, useCallback } from 'react';
import { ConfirmationContainer } from './ConfirmationPage.styles';

// TODO specify any types

interface ConfirmationPageProps {
  userDecision: any;
}

export const ConfirmationPage: React.FC<any> = ({ userDecision }) => {
  return (
    <ConfirmationContainer>
      <h2>Congratulations, we look forward to teach you skate soon!</h2>
      {/* TODO add different picture based on selected board */}
      <img
        src={process.env.PUBLIC_URL + `/Confirmation.jpg`}
        alt={`confirmation_skate_photo`}
        style={{ maxHeight: '400px', maxWidth: '90vw' }}
      />
      <p>Details of your booking:</p>
      <br />
      <strong>Selected skatepark</strong>
      <p>{userDecision.selectedSkatePark.name}</p>
      <p>{userDecision.selectedSkatePark.addressLine1}</p>
      <p>{userDecision.selectedSkatePark.addressLine2}</p>
      <br />
      <strong>Selected board</strong>
      <p>{userDecision.selectedBoard}</p>
      <br />
      <strong>Selected date and time</strong>
      <p>{userDecision.selectedTimeslot.date}</p>
      <p>{userDecision.selectedTimeslot.time}</p>
    </ConfirmationContainer>
  );
};

export default ConfirmationPage;

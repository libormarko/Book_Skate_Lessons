import styled from 'styled-components';
import * as variables from '../../variables';

export const SummaryContainer = styled.div`
  margin: 0 ${variables.spacingL};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  @media (min-width: ${variables.breakpointL}px) {
    margin: unset;
  }

  p {
    margin: 0;
  }
`;

export const SummaryFooter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-top: ${variables.spacingL};

  p {
    margin-bottom: ${variables.spacingM};
  }
`;

export const StyledImage = styled.img`
  max-height: 300px;
  max-width: 90vw;
  border-radius: ${variables.spacingS};
  margin-bottom: ${variables.spacingM};
`;

export const BookingDetailsHeadline = styled.p`
  margin-bottom: ${variables.spacingM} !important;
`;

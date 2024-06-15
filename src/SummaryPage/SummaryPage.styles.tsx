import styled from 'styled-components';
import * as variables from '../variables';

export const SummaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

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

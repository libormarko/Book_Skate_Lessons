import styled from 'styled-components';
import * as variables from '../variables';

export const PickSkateAndDateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const SelectedSkatePark = styled.div`
  width: 100%;
  text-align: left;
  margin: ${variables.spacingL} 0;
`;

export const SkateParkName = styled.div`
  margin: 0;
`;

export const SkateParkAddressWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const AddressLine1 = styled.p`
  margin: 0;
`;

export const AddressLine2 = styled.p`
  margin: 0;
`;

export const BoardSelection = styled.div`
  margin: ${variables.spacingM} 0;
  text-align: left;
`;

export const RadioWrapper = styled.div`
  cursor: pointer;
  display: grid;
  grid-template-columns: 58px auto auto;
`;

export const BoardName = styled.p`
  margin-right: ${variables.spacingL};
`;

export const BoardImage = styled.img`
  height: 30px;
  width: auto;
  align-self: center;
`;

export const TimeslotPickerContainer = styled.div``;

export const DateTimeSelection = styled.div``;

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

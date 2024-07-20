import styled from 'styled-components';
import { Button } from '@mui/material';
import * as variables from '../../variables';

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

export const Headline = styled.h1`
  margin-top: 0;
`;

export const SelectedSkateParkInfoLabel = styled.h4`
  margin-top: 0;
  margin-bottom: ${variables.spacingXS};
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
  margin: 0 0 ${variables.spacingM} 0;
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

export const DatePickerContainer = styled.div`
  margin-left: ${variables.spacingM};
`;

export const TimeslotsContainer = styled.div`
  margin-top: ${variables.spacingS};
  margin-left: ${variables.spacingM};
  display: grid;
  grid-template-columns: max-content max-content;

  button:nth-child(3) {
    margin-top: ${variables.spacingS};
  }
`;

export const DateTimeSelection = styled.div``;

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: ${variables.spacingS};

  button:first-child {
    margin-bottom: ${variables.spacingXS};
  }
`;

export const TimeslotButton = styled((props) => <Button {...props} />)`
  background-color: ${(props) => (props.selected ? 'black' : 'white')}!important;
  border-radius: 20px !important;
  color: ${(props) => (props.selected ? 'white' : 'black')}!important;
  margin-right: ${variables.spacingXS} !important;
  &:hover: {
    background-color: ${(props) => (props.selected ? 'black' : 'lightgrey')}!important;
  }
`;

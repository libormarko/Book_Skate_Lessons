import styled from 'styled-components';
import * as variables from '../variables';

export const ChooseLocationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ChooseLocationHeader = styled.div`
  text-align: center;
`;

export const ChooseLocationBodyDesktop = styled.div`
  display: none;

  @media (min-width: ${variables.breakpointM}px) {
    display: flex;
    margin: ${variables.spacingM} 0;
  }
`;

export const ChooseLocationBodyMobile = styled.div`
  margin: ${variables.spacingM} 0;

  @media (min-width: ${variables.breakpointM}px) {
    display: none;
  }

  .hidden {
    display: none;
  }
`;

export const TabContent = styled.div<{ hidden: boolean }>`
  display: ${(props) => (props.hidden ? 'none' : 'block')};
`;

export const MapContainer = styled.div`
  width: 95vw;
  max-width: 500px;
  height: 500px;

  @media (min-width: ${variables.breakpointM}px) {
    width: 500px;
  }

  .marker {
    height: 35px;
    width: 26.5px;
    background-image: url('/location_pin.svg');
    cursor: pointer;

    &.selected {
      width: 45px;
      height: 60px;
      background-image: url('/location_pin_selected.svg');
      z-index: 1;
      pointer-events: none;
    }

    /* &:hover {
      cursor: pointer;
      width: 45px;
      height: 60px;
    } */
  }
`;

export const SkateParks = styled.div``;

export const SkateParksList = styled.div`
  display: flex;
  flex-direction: column;
  height: 500px;
  width: 95vw;
  max-width: 500px;
  overflow: scroll;

  @media (min-width: ${variables.breakpointM}px) {
    width: unset;
  }
`;

export const RadioText = styled.div`
  display: flex;
  flex-direction: column;

  p {
    margin: 0;
  }
`;

export const SkateparkName = styled.div`
  font-weight: 700;
`;

export const SkateparkAddressWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const Address = styled.div`
  margin-left: ${variables.spacingS};
`;

export const AddressLine1 = styled.p``;

export const AddressLine2 = styled.p``;

export const SkateparkFeaturesWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const Features = styled.div`
  margin-left: ${variables.spacingS};
`;

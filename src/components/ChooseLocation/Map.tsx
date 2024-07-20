import React from 'react';
import '@tomtom-international/web-sdk-maps/dist/maps.css';
import {
  MapContainer,
  Map,
  SelectedSkateParkItem,
  RadioText,
  SkateParkName,
  SkateParkAddressWrapper,
  Address,
  AddressLine1,
  AddressLine2,
  SkateParkFeaturesWrapper,
  Features
} from './ChooseLocation.styles';
import { SkateLocationData, SelectedSkatePark } from '../../types/common';
import { Radio } from '@mui/material';
import { Sheet } from '@mui/joy';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapLocationDot, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { useDesktopOrMobileView } from '../../hooks/useDesktopOrMobileView';

interface MapProps {
  mapElement: any;
  skateParks: SkateLocationData[];
  selectedSkatePark?: SelectedSkatePark;
}

export const MapComponent: React.FC<MapProps> = ({ mapElement, skateParks, selectedSkatePark }) => {
  const selectedSkateparkObj = skateParks.find((item) => item.id == selectedSkatePark?.id);

  const isDesktop = useDesktopOrMobileView() === 'desktop';

  return (
    <MapContainer>
      <Map ref={mapElement} className="mapDiv" />
      {!isDesktop && selectedSkateparkObj && (
        <SelectedSkateParkItem>
          <Sheet
            component="label"
            variant="outlined"
            sx={{
              p: 1,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'left'
            }}
          >
            <Radio checked />
            <RadioText>
              <SkateParkName>{selectedSkateparkObj.name}</SkateParkName>
              <SkateParkAddressWrapper>
                <FontAwesomeIcon icon={faMapLocationDot} />
                <Address>
                  <AddressLine1>{selectedSkateparkObj.addressLine1}</AddressLine1>
                  <AddressLine2>{selectedSkateparkObj.addressLine2}</AddressLine2>
                </Address>
              </SkateParkAddressWrapper>
              <SkateParkFeaturesWrapper>
                <FontAwesomeIcon icon={faCircleInfo} />
                <Features>
                  {selectedSkateparkObj.features.map((feature, featureIndex) => {
                    return (
                      <span key={featureIndex}>
                        {feature}{' '}
                        {featureIndex === selectedSkateparkObj.features.length - 1 ? '' : ', '}{' '}
                      </span>
                    );
                  })}
                </Features>
              </SkateParkFeaturesWrapper>
            </RadioText>
          </Sheet>
        </SelectedSkateParkItem>
      )}
    </MapContainer>
  );
};

export default MapComponent;

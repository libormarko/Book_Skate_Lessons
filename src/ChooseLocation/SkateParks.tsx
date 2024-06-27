import React from 'react';
import '@tomtom-international/web-sdk-maps/dist/maps.css';
import {
  SkateParksContainer,
  SkateParksList,
  RadioText,
  SkateParkName,
  SkateParkAddressWrapper,
  Address,
  AddressLine1,
  AddressLine2,
  SkateParkFeaturesWrapper,
  Features
} from './ChooseLocation.styles';
import { SkateLocationData, SelectedSkatePark } from '../types/common';
import { Radio, RadioGroup, FormControl } from '@mui/material';
import { Sheet } from '@mui/joy';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapLocationDot, faCircleInfo } from '@fortawesome/free-solid-svg-icons';

interface SkateParksProps {
  skateParksListRef: any;
  skateParkItemsRef: any;
  skateParks: SkateLocationData[];
  selectedSkatePark?: SelectedSkatePark;
  setSelectedSkatePark: (item: SelectedSkatePark) => void;
}

export const SkateParks: React.FC<SkateParksProps> = ({
  skateParksListRef,
  skateParkItemsRef,
  skateParks,
  selectedSkatePark,
  setSelectedSkatePark
}) => {
  return (
    <SkateParksContainer>
      <FormControl fullWidth>
        <SkateParksList ref={skateParksListRef}>
          <RadioGroup
            name="radio-buttons-skate-parks-group"
            value={selectedSkatePark?.id || 'default'}
            onChange={(e) => {
              e.preventDefault();
              setSelectedSkatePark({ id: e.target.value, source: 'listItem' });
            }}
          >
            {skateParks.map((skatePark, index) => {
              return (
                <Sheet
                  key={skatePark.id}
                  ref={(element: any) => skateParkItemsRef.current.splice(index, 1, element)}
                  data-skate-park-id={skatePark.id}
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
                  <Radio value={skatePark.id} />
                  <RadioText>
                    <SkateParkName>{skatePark.name}</SkateParkName>
                    <SkateParkAddressWrapper>
                      <FontAwesomeIcon icon={faMapLocationDot} />
                      <Address>
                        <AddressLine1>{skatePark.addressLine1}</AddressLine1>
                        <AddressLine2>{skatePark.addressLine2}</AddressLine2>
                      </Address>
                    </SkateParkAddressWrapper>
                    <SkateParkFeaturesWrapper>
                      <FontAwesomeIcon icon={faCircleInfo} />
                      <Features>
                        {skatePark.features.map((feature, featureIndex) => {
                          return (
                            <span key={featureIndex}>
                              {feature} {featureIndex === skatePark.features.length - 1 ? '' : ', '}{' '}
                            </span>
                          );
                        })}
                      </Features>
                    </SkateParkFeaturesWrapper>
                  </RadioText>
                </Sheet>
              );
            })}
          </RadioGroup>
        </SkateParksList>
      </FormControl>
    </SkateParksContainer>
  );
};

export default SkateParks;

import React, { useEffect, useState, useRef, useCallback, Dispatch } from 'react';
import '@tomtom-international/web-sdk-maps/dist/maps.css';
import tt from '@tomtom-international/web-sdk-maps';
import {
  ChooseLocationContainer,
  ChooseLocationHeader,
  ChooseLocationBodyMobile,
  ChooseLocationBodyDesktop
} from './ChooseLocation.styles';
import { apiData } from '../../apiData/skateLocations';
import { SkateLocationData, UserDecision, Views } from '../../types/common';
import { Button, Box, Tabs, Tab } from '@mui/material';
import ArrowForward from '@mui/icons-material/ArrowForward';
import { useDesktopOrMobileView } from '../../hooks/useDesktopOrMobileView';
import { useMarkerAndSkateParkService } from '../../hooks/useMarkerAndSkateParkService';
import { scrollSkateParkItemToTheTop } from '../../utils/utils';
import { TabPanel } from './TabPanel';
import { i18nEN } from '../../apiData/i18nEN';
import { getItemFromSessionStorage } from '../../utils/utils';
import { MapComponent } from './Map';
import { SkateParks } from './SkateParks';

interface ChooseLocationProps {
  setView: Dispatch<{ view: Views }>;
}

export const ChooseLocation: React.FC<ChooseLocationProps> = ({ setView }) => {
  const { chooseLocation } = i18nEN;
  const mapElement = useRef<any>();
  const skateParksListRef = useRef<any>();
  const skateParkItemsRef = useRef<any[]>([]);

  const [mapLatitude, _setMapLatitude] = useState<number>(52.520008);
  const [mapLongitude, _setMapLongitude] = useState<number>(13.404954);
  const [mapZoom, _setMapZoom] = useState<number>(10);
  const [map, setMap] = useState<any>();
  const [skateParks, _setSkateParks] = useState<SkateLocationData[]>(apiData);
  const [selectedTab, setSelectedTab] = useState(0);

  const isDesktop = useDesktopOrMobileView() === 'desktop';

  const { selectedSkatePark, createMarkers, setSelectedSkatePark } = useMarkerAndSkateParkService(
    skateParks,
    map,
    skateParkItemsRef,
    skateParksListRef
  );

  useEffect(() => {
    const mapInstance = tt.map({
      key: process.env.REACT_APP_API_KEY || '',
      container: mapElement.current,
      center: [mapLongitude, mapLatitude],
      zoom: mapZoom,
      doubleClickZoom: false,
      dragRotate: false
    });
    mapInstance.addControl(new tt.NavigationControl({ showCompass: false }));
    setMap(mapInstance);

    return () => mapInstance.remove();
  }, [isDesktop]);

  useEffect(() => {
    if (map) {
      createMarkers();

      const userDecision = getItemFromSessionStorage('bookSkateLesson');
      const parsedUserDecision: UserDecision =
        userDecision && JSON.parse(decodeURIComponent(userDecision));
      if (parsedUserDecision && parsedUserDecision.skatePark.id)
        setSelectedSkatePark({ id: parsedUserDecision.skatePark.id, source: 'marker' });
    }
  }, [map]);

  const handleTabChange = useCallback((_event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  }, []);

  useEffect(() => {
    if (selectedTab === 1 && selectedSkatePark) {
      scrollSkateParkItemToTheTop(skateParkItemsRef, skateParksListRef, selectedSkatePark);
    }
  }, [selectedTab]);

  const renderMapComponent = () => {
    return (
      <MapComponent
        mapElement={mapElement}
        skateParks={skateParks}
        selectedSkatePark={selectedSkatePark}
      />
    );
  };

  const renderSkateParks = () => {
    return (
      <SkateParks
        skateParksListRef={skateParksListRef}
        skateParkItemsRef={skateParkItemsRef}
        skateParks={skateParks}
        selectedSkatePark={selectedSkatePark}
        setSelectedSkatePark={setSelectedSkatePark}
      />
    );
  };

  const handleSkateParkSubmit = () => {
    const selectedSkateParkSourceData = skateParks.find(
      (item) => item.id === selectedSkatePark?.id
    );
    const newUserDecision: UserDecision = {
      skatePark: {
        id: selectedSkateParkSourceData?.id,
        name: selectedSkateParkSourceData?.name,
        addressLine1: selectedSkateParkSourceData?.addressLine1,
        addressLine2: selectedSkateParkSourceData?.addressLine2
      }
    };

    const userDecision = getItemFromSessionStorage('bookSkateLesson');
    const parsedUserDecision: UserDecision =
      userDecision && JSON.parse(decodeURIComponent(userDecision));
    if (parsedUserDecision?.boardAndTimeslot) {
      newUserDecision.boardAndTimeslot = parsedUserDecision?.boardAndTimeslot;
    }
    if (newUserDecision) {
      sessionStorage.setItem(
        'bookSkateLesson',
        encodeURIComponent(JSON.stringify(newUserDecision))
      );
      setView({ view: 'pick_skate_and_timeslot' });
    }
  };

  return (
    <ChooseLocationContainer>
      <ChooseLocationHeader>
        <h1>{chooseLocation.headline}</h1>
        <p>{chooseLocation.subheadline}</p>
      </ChooseLocationHeader>
      {!isDesktop ? (
        <ChooseLocationBodyMobile>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: 'divider'
            }}
          >
            <Box
              sx={{
                borderBottom: 1,
                borderColor: 'divider',
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <Tabs value={selectedTab} onChange={handleTabChange}>
                <Tab label="Map view" />
                <Tab label="List view" />
              </Tabs>
            </Box>
            <TabPanel value={selectedTab} index={0}>
              {renderMapComponent()}
            </TabPanel>
            <TabPanel value={selectedTab} index={1}>
              {renderSkateParks()}
            </TabPanel>
          </Box>
        </ChooseLocationBodyMobile>
      ) : (
        <ChooseLocationBodyDesktop>
          {renderMapComponent()}
          {renderSkateParks()}
        </ChooseLocationBodyDesktop>
      )}
      <Button
        variant="contained"
        disabled={selectedSkatePark?.id === undefined}
        onClick={() => handleSkateParkSubmit()}
        endIcon={<ArrowForward />}
      >
        {chooseLocation.buttonLabel}
      </Button>
    </ChooseLocationContainer>
  );
};

export default ChooseLocation;

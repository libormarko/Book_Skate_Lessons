import React, { useEffect, useState, useRef } from 'react';
import '@tomtom-international/web-sdk-maps/dist/maps.css';
import tt, { LngLat } from '@tomtom-international/web-sdk-maps';
import {
  ChooseLocationContainer,
  ChooseLocationHeader,
  ChooseLocationBodyMobile,
  ChooseLocationBodyDesktop,
  MapContainer,
  Map,
  SkateParks,
  SkateParksList,
  SelectedSkateParkItem,
  RadioText,
  SkateparkName,
  SkateparkAddressWrapper,
  Address,
  AddressLine1,
  AddressLine2,
  SkateparkFeaturesWrapper,
  Features,
  TabContent
} from './ChooseLocation.styles';
import { apiData } from '../data/apiData';
import { SkateLocationData } from '../types/common';
import { Radio, RadioGroup, FormControl, Button, Box, Tabs, Tab } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { Sheet } from '@mui/joy';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapLocationDot, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import * as variables from '../variables';
import { useDesktopOrMobileView } from '../hooks/useDesktopOrMobileView';
import { locationPins } from './locationPins';

// check typography https://mui.com/material-ui/react-tabs/
function CustomTabPanel(props: any) {
  const { children, value, index } = props;

  return (
    <TabContent hidden={value !== index}>
      <Box>
        <div>{children}</div>
      </Box>
    </TabContent>
  );
}

export const ChooseLocation: React.FC<any> = () => {
  const mapElement = useRef<any>();
  const skateParksListRef = useRef<any>();
  const skateParkItemsRef = useRef<any[]>([]);

  const [mapLatitude, setMapLatitude] = useState<any>(52.520008);
  const [mapLongitude, setMapLongitude] = useState<any>(13.404954);
  const [mapZoom, setMapZoom] = useState<any>(10);
  const [map, setMap] = useState<any>();

  const [skateparks, setSkateparks] = useState<SkateLocationData[]>(apiData);
  const [selectedSkatepark, setSelectedSkatepark] = useState<{
    id: string;
    source: 'marker' | 'listItem';
  }>();
  const [markerRefs, setMarkerRefs] = useState<any>([]);

  const isDesktop = useDesktopOrMobileView() === 'desktop';

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
  }, []);

  const createMarkers = () => {
    const markersArray: any = [];
    skateparks.forEach((skatepark) => {
      const divElem = document.createElement('div');
      divElem.className = 'marker';
      divElem.id = `marker_${skatepark.id}`;
      divElem.innerHTML = locationPins.default;

      const marker = new tt.Marker({
        element: divElem,
        draggable: false,
        color: 'black',
        height: '36',
        width: '30'
      })
        .setLngLat({ lng: skatepark.coordinates[1], lat: skatepark.coordinates[0] })
        .addTo(map);

      markersArray.push({ ref: marker, id: skatepark.id });

      const markerElement = marker.getElement();
      // markerElement.style.cursor = 'pointer';
      markerElement.addEventListener('click', () => {
        setSelectedSkatepark({ id: skatepark.id, source: 'marker' });
      });
    });
    setMarkerRefs(markersArray);
  };

  useEffect(() => {
    if (map) {
      createMarkers();
    }
  }, [map]);

  useEffect(() => {
    if (selectedSkatepark) {
      // update selected marker's icon
      const foundSelectedMarkerRef = markerRefs.find(
        (marker: any) => marker.id === selectedSkatepark.id
      )?.ref;
      foundSelectedMarkerRef.remove();

      const selectedMarkerLatLong = foundSelectedMarkerRef.getLngLat();
      const divElem = document.createElement('div');
      divElem.className = 'marker selected';
      divElem.id = `marker_${selectedSkatepark.id}`;
      divElem.innerHTML = locationPins.selected;

      const selectedMarker = new tt.Marker({
        element: divElem,
        draggable: false,
        color: 'green',
        height: '54',
        width: '45'
      })
        .setLngLat(selectedMarkerLatLong)
        .addTo(map);

      /* const selectedMarkerElement = selectedMarker.getElement();
      selectedMarkerElement.addEventListener('click', () => {
        setSelectedSkatepark({ id: selectedSkatepark.id, source: 'marker' });
      }); */

      // zoom in on new selected marker
      if (selectedSkatepark.source === 'listItem') {
        map.panTo(selectedMarkerLatLong);
      }

      // update previously selected marker's icon
      const previouslySelectedMarker = markerRefs.find((marker: any) =>
        marker.ref.getElement().classList.contains('selected')
      );
      /* const previouslySelectedMarker = markerRefs.find(
        (marker: any) =>
          marker.ref.getElement().getElementsByTagName('svg')[0].getAttribute('fill') === 'green'
      ); */
      if (previouslySelectedMarker) {
        previouslySelectedMarker.ref.remove();

        const prevSelectedMarkerLatLong = previouslySelectedMarker.ref.getLngLat();
        const divSelectedElem = document.createElement('div');
        divSelectedElem.className = 'marker';
        divSelectedElem.id = `marker_${previouslySelectedMarker.id}`;
        divSelectedElem.innerHTML = locationPins.default;

        const prevSelectedMarker = new tt.Marker({
          element: divSelectedElem,
          draggable: false,
          color: 'black',
          height: '36',
          width: '30'
        })
          .setLngLat(prevSelectedMarkerLatLong)
          .addTo(map);

        const markerElement = prevSelectedMarker.getElement();
        markerElement.style.cursor = 'pointer';
        markerElement.addEventListener('click', () => {
          setSelectedSkatepark({ id: previouslySelectedMarker.id, source: 'marker' });
        });

        // update markers ref to contain current selected / not selected status
        setMarkerRefs(
          markerRefs.map((item: any) => {
            return item.id === selectedSkatepark.id
              ? { ref: selectedMarker, id: selectedSkatepark.id }
              : item.id === previouslySelectedMarker.id
                ? { ref: prevSelectedMarker, id: previouslySelectedMarker.id }
                : { ...item };
          })
        );
      }

      // update markers ref in initial case of app load, when no marker had been selected previously yet
      if (!previouslySelectedMarker) {
        setMarkerRefs(
          markerRefs.map((item: any) => {
            return item.id === selectedSkatepark.id
              ? { ref: selectedMarker, id: selectedSkatepark.id }
              : { ...item };
          })
        );
      }

      // scroll skate park list item to top of the list, after clicking on a marker
      const foundSkateParkItem = skateParkItemsRef.current.find(
        (elem) => elem.dataset.skateParkId === selectedSkatepark.id
      );
      const skateParkItemTop = foundSkateParkItem?.getBoundingClientRect().top;
      const skateParksListTop = skateParksListRef?.current?.getBoundingClientRect().top;
      if (skateParkItemTop && skateParksListTop && selectedSkatepark.source === 'marker') {
        skateParksListRef?.current?.scrollBy({
          top: skateParkItemTop - skateParksListTop,
          behavior: 'smooth'
        });
      }
    }
  }, [selectedSkatepark]);

  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  useEffect(() => {
    if (selectedTab === 1 && selectedSkatepark) {
      // scroll skate park list item to top of the list, after clicking on a list view
      const foundSkateParkItem = skateParkItemsRef.current.find(
        (elem) => elem.dataset.skateParkId === selectedSkatepark.id
      );
      const skateParkItemTop = foundSkateParkItem?.getBoundingClientRect().top;
      const skateParksListTop = skateParksListRef?.current?.getBoundingClientRect().top;
      if (skateParkItemTop && skateParksListTop && selectedSkatepark.source === 'marker') {
        skateParksListRef?.current?.scroll({
          top: skateParkItemTop - skateParksListTop
        });
      }
    }
  }, [selectedTab]);

  const renderMapComponent = () => {
    const selectedSkateparkObj = skateparks.find((item) => item.id == selectedSkatepark?.id);
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
                justifyContent: 'left',
                boxShadow: 'sm',
                borderRadius: 'md'
              }}
            >
              <Radio checked />
              <RadioText>
                <SkateparkName>{selectedSkateparkObj.name}</SkateparkName>
                <SkateparkAddressWrapper>
                  <FontAwesomeIcon icon={faMapLocationDot} />
                  <Address>
                    <AddressLine1>{selectedSkateparkObj.addressLine1}</AddressLine1>
                    <AddressLine2>{selectedSkateparkObj.addressLine2}</AddressLine2>
                  </Address>
                </SkateparkAddressWrapper>
                <SkateparkFeaturesWrapper>
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
                </SkateparkFeaturesWrapper>
              </RadioText>
            </Sheet>
          </SelectedSkateParkItem>
        )}
      </MapContainer>
    );
  };

  const renderSkateParks = () => {
    return (
      <SkateParks>
        <FormControl fullWidth>
          <SkateParksList ref={skateParksListRef}>
            <RadioGroup
              name="radio-buttons-skate-parks-group"
              value={selectedSkatepark?.id || 'default'}
              onChange={(e) => {
                e.preventDefault();
                setSelectedSkatepark({ id: e.target.value, source: 'listItem' });
              }}
            >
              {skateparks.map((skatepark, index) => {
                return (
                  <Sheet
                    key={skatepark.id}
                    ref={(element: any) => skateParkItemsRef.current.splice(index, 1, element)}
                    data-skate-park-id={skatepark.id}
                    component="label"
                    variant="outlined"
                    sx={{
                      p: 1,
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'left',
                      boxShadow: 'sm',
                      borderRadius: 'md'
                    }}
                  >
                    <Radio value={skatepark.id} />
                    <RadioText>
                      <SkateparkName>{skatepark.name}</SkateparkName>
                      <SkateparkAddressWrapper>
                        <FontAwesomeIcon icon={faMapLocationDot} />
                        <Address>
                          <AddressLine1>{skatepark.addressLine1}</AddressLine1>
                          <AddressLine2>{skatepark.addressLine2}</AddressLine2>
                        </Address>
                      </SkateparkAddressWrapper>
                      <SkateparkFeaturesWrapper>
                        <FontAwesomeIcon icon={faCircleInfo} />
                        <Features>
                          {skatepark.features.map((feature, featureIndex) => {
                            return (
                              <span key={featureIndex}>
                                {feature}{' '}
                                {featureIndex === skatepark.features.length - 1 ? '' : ', '}{' '}
                              </span>
                            );
                          })}
                        </Features>
                      </SkateparkFeaturesWrapper>
                    </RadioText>
                  </Sheet>
                );
              })}
            </RadioGroup>
          </SkateParksList>
        </FormControl>
      </SkateParks>
    );
  };

  return (
    <ChooseLocationContainer>
      <ChooseLocationHeader>
        <h1>Book a skate lesson</h1>
        <p>Select a skate park location by clicking on a pin or selecting one from the list</p>
      </ChooseLocationHeader>
      {!isDesktop ? (
        <ChooseLocationBodyMobile>
          <Box>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: 'divider',
                display: 'flex',
                justifyContent: 'center',
                marginBottom: variables.spacingS
              }}
            >
              <Tabs value={selectedTab} onChange={handleTabChange}>
                <Tab label="Map view" />
                <Tab label="List view" />
              </Tabs>
            </Box>
            <CustomTabPanel value={selectedTab} index={0}>
              {renderMapComponent()}
            </CustomTabPanel>
            <CustomTabPanel value={selectedTab} index={1}>
              {renderSkateParks()}
            </CustomTabPanel>
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
        disabled={selectedSkatepark?.id === undefined}
        onClick={() => {
          alert('Next step is in development');
        }}
        endIcon={<SendIcon />}
      >
        Confirm
      </Button>
    </ChooseLocationContainer>
  );
};

export default ChooseLocation;

import { useCallback, useEffect, useState } from 'react';
import { locationPins } from './locationPins';
import tt from '@tomtom-international/web-sdk-maps';
import { scrollSkateParkItemToTheTop } from '../utils/utils';
import { SelectedSkatePark, SkateLocationData } from '../types/common';

export const useMarkerAndSkateParkService = (
  skateParks: SkateLocationData[],
  map: any,
  skateParkItemsRef: any,
  skateParksListRef: any
) => {
  const [markerRefs, setMarkerRefs] = useState<any>([]);
  const [selectedSkatePark, setSelectedSkatePark] = useState<SelectedSkatePark>();

  const createMarker = (
    className: string,
    id: string,
    innerHTML: string,
    color: string,
    height: string,
    width: string,
    latLong: { lat: number; lng: number }
  ) => {
    const divElem = document.createElement('div');
    divElem.className = className;
    divElem.id = id;
    divElem.innerHTML = innerHTML;

    return new tt.Marker({
      element: divElem,
      draggable: false,
      color: color,
      height: height,
      width: width
    })
      .setLngLat(latLong)
      .addTo(map);
  };

  const createMarkers = useCallback(() => {
    const markersArray: any = [];
    skateParks.forEach((skatePark) => {
      const divElem = document.createElement('div');
      divElem.className = 'marker';
      divElem.id = `marker_${skatePark.id}`;
      divElem.innerHTML = locationPins.default;

      const marker = createMarker(
        'marker',
        `marker_${skatePark.id}`,
        locationPins.default,
        'black',
        '36',
        '30',
        { lng: skatePark.coordinates[1], lat: skatePark.coordinates[0] }
      );

      markersArray.push({ ref: marker, id: skatePark.id });

      const markerElement = marker.getElement();
      markerElement.addEventListener('click', () => {
        setSelectedSkatePark({ id: skatePark.id, source: 'marker' });
      });
    });
    setMarkerRefs(markersArray);
  }, [skateParks, map]);

  useEffect(() => {
    if (selectedSkatePark && markerRefs.length > 0) {
      // update selected marker's icon
      const foundSelectedMarkerRef = markerRefs.find(
        (marker: any) => marker.id === selectedSkatePark.id
      )?.ref;
      foundSelectedMarkerRef?.remove();

      const selectedMarkerLatLong = foundSelectedMarkerRef.getLngLat();
      const selectedMarker = createMarker(
        'marker selected',
        `marker_${selectedSkatePark.id}`,
        locationPins.selected,
        'green',
        '54',
        '45',
        selectedMarkerLatLong
      );

      // zoom in on new selected marker
      if (selectedSkatePark.source === 'listItem') {
        map.panTo(selectedMarkerLatLong);
      }

      // update previously selected marker's icon
      const previouslySelectedMarker = markerRefs.find((marker: any) =>
        marker.ref.getElement().classList.contains('selected')
      );
      if (previouslySelectedMarker) {
        previouslySelectedMarker.ref.remove();

        const prevSelectedMarkerLatLong = previouslySelectedMarker.ref.getLngLat();
        const prevSelectedMarker = createMarker(
          'marker',
          `marker_${previouslySelectedMarker.id}`,
          locationPins.default,
          'black',
          '36',
          '30',
          prevSelectedMarkerLatLong
        );

        const markerElement = prevSelectedMarker.getElement();
        markerElement.style.cursor = 'pointer';
        markerElement.addEventListener('click', () => {
          setSelectedSkatePark({ id: previouslySelectedMarker.id, source: 'marker' });
        });

        // update markers ref to contain current selected || not selected status
        setMarkerRefs(
          markerRefs.map((item: any) => {
            return item.id === selectedSkatePark.id
              ? { ref: selectedMarker, id: selectedSkatePark.id }
              : item.id === previouslySelectedMarker.id
                ? { ref: prevSelectedMarker, id: previouslySelectedMarker.id }
                : { ...item };
          })
        );
      }

      // update markers ref in initial case of app load, when no marker had been previously selected yet
      if (!previouslySelectedMarker) {
        setMarkerRefs(
          markerRefs.map((item: any) => {
            return item.id === selectedSkatePark.id
              ? { ref: selectedMarker, id: selectedSkatePark.id }
              : { ...item };
          })
        );
      }

      if (selectedSkatePark) {
        scrollSkateParkItemToTheTop(skateParkItemsRef, skateParksListRef, selectedSkatePark);
      }
    }
  }, [selectedSkatePark]);

  return {
    selectedSkatePark,
    createMarkers,
    setMarkerRefs,
    setSelectedSkatePark
  };
};

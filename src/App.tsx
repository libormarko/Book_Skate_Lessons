import React, { useEffect, useState } from 'react';
import ChooseLocation from './ChooseLocation/ChooseLocation';
import PickSkateAndTimeslot from './PickSkateAndTimeslot/PickSkateAndTimeslot';
import ConfirmationPage from './ConfirmationPage/ConfirmationPage';
import { AppContainer } from './App.styles';

// TODO specify any types

export const App: React.FC<any> = () => {
  const [view, setView] = useState<{ view: string; props?: any }>();

  useEffect(() => {
    const userDecision = sessionStorage.getItem('bookSkateLesson');
    const decodedUserDecision = userDecision && decodeURIComponent(userDecision);
    if (decodedUserDecision) {
      setView({ view: 'pick_skate_and_timeslot' });
    } else {
      setView({ view: 'choose_location' });
    }
  }, []);

  const renderView = () => {
    switch (view?.view) {
      case 'choose_location':
        return <ChooseLocation setView={setView} />;
      case 'pick_skate_and_timeslot':
        return <PickSkateAndTimeslot setView={setView} />;
      case 'confirmation_page':
        return <ConfirmationPage userDecision={view.props} />;
    }
  };

  return <AppContainer>{renderView()}</AppContainer>;
};

export default App;

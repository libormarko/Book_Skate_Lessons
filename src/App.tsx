import React, { useEffect, useState } from 'react';
import ChooseLocation from './ChooseLocation/ChooseLocation';
import PickSkateAndTimeslot from './PickSkateAndTimeslot/PickSkateAndTimeslot';
import ConfirmationPage from './ConfirmationPage/ConfirmationPage';
import { AppContainer } from './App.styles';
import { UserDecision } from './types/common';
import { getItemFromSessionStorage } from './utils/utils';

// TODO read through the whole logic and simplify (map, forEach)
export const App: React.FC = () => {
  const [view, setView] = useState<{ view: string; props?: UserDecision | undefined }>();

  useEffect(() => {
    const userDecision = getItemFromSessionStorage('bookSkateLesson');
    const parsedUserDecision: UserDecision =
      userDecision && JSON.parse(decodeURIComponent(userDecision));
    if (parsedUserDecision?.boardAndTimeslot) {
      setView({ view: 'add_your_details' });
    } else if (parsedUserDecision?.skatePark) {
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

import { Box } from '@mui/material';
import { TabContent } from './ChooseLocation.styles';

export const TabPanel: React.FC<any> = (props) => {
  const { children, value, index } = props;

  return (
    <TabContent hidden={value !== index}>
      <Box>
        <div>{children}</div>
      </Box>
    </TabContent>
  );
};

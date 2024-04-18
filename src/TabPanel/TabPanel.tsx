import { Box } from '@mui/material';
import { TabContent } from './TabPanel.styles';

// TODO check typography https://mui.com/material-ui/react-tabs/
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

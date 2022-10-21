import { useState } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab, Box, Stack } from '@mui/material';

const TabPanel = ({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const getAttributes = (index) => ({
  id: `vertical-tab-${index}`,
  key: `vertical-tab-${index}`,
  'aria-controls': `vertical-tabpanel-${index}`,
});

const AppTabs = ({ tabs, orientation, ...props }) => {
  const [value, setValue] = useState(0);

  return (
    <Stack direction={orientation === "vertical" ? "row" : "column"}>
      <Tabs orientation={orientation} onChange={(event, newValue) => setValue(newValue)} sx={{flexShrink: 0}}  value={value} {...props}>
        {tabs.map((tab, index) => <Tab label={tab.label} {...getAttributes(index)} />)}
      </Tabs>
      {tabs.map((tab, index) => { 
        return <TabPanel key={index} value={value} index={index}>{tab.content()}</TabPanel>
      })}
    </Stack>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

AppTabs.propTypes = {
  orientation: PropTypes.oneOf(["horizontal", "vertical"]),
  tabs: PropTypes.array
}

AppTabs.defaultProps = {
  orientation: "horizontal",
  tabs: [{
    label: null,
    content: null
  }]
};

export default AppTabs;

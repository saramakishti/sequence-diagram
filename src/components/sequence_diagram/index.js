import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MermaidChart from '../mermaid_diagram';
import SVGSequenceDiagram from '../svg_sequence_diagram';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const SequenceDiagram = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label='Mermaid.js' />
          <Tab label='SVG Sequence Diagram' />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <MermaidChart />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <SVGSequenceDiagram />
      </CustomTabPanel>
    </Box>
  );
};

export default SequenceDiagram;

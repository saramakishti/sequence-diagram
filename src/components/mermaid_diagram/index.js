import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import {
  configEntities,
  configEventTypes,
  dataset,
  sample2,
  style,
} from '../sample';
import './style.css';
import {
  Box,
  Button,
  Card,
  FormControl,
  FormControlLabel,
  FormLabel,
  Modal,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import FilterGroup from '../radio';

const MermaidChart = () => {
  const [scale, setScale] = useState(1);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [selectedEntity, setSelectedEntity] = useState();
  const [selectedType, setSelectedType] = useState();

  const mermaidRef = useRef(null);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      securityLevel: 'loose',
      sequence: {
        mirrorActors: false,
      },
    });

    // if (mermaidRef && mermaidRef.current)
    //   setTimeout(() => {
    //     const svg = mermaidRef.current.querySelector('svg');
    //     if (svg) {
    //       const entityATextElement = Array.from(
    //         svg.querySelectorAll('text')
    //       ).find((el) => el.textContent.includes('Entity A'));
    //       if (entityATextElement) {
    //         const entityAGroupElement = entityATextElement.closest('g');
    //         entityAGroupElement.id = 'entityA-group';
    //         entityAGroupElement.addEventListener('click', (evt) => {
    //           evt.stopPropagation();
    //           handleOpen();
    //         });
    //       }
    //     }
    //   }, 60);
  }, []);

  useEffect(() => {
    if (mermaidRef.current) {
      const svg = mermaidRef.current.querySelector('svg');
      if (svg) {
        svg.style.transform = `scale(${scale})`;
      }
    }
  }, [scale]);

  const zoomIn = () => {
    setScale((scale) => scale * 1.1);
  };

  const zoomOut = () => {
    setScale((scale) => scale / 1.1);
  };

  const resetZoom = () => {
    setScale(1);
  };

  const viewInFullScreen = () => {
    if (mermaidRef.current) {
      const svg = mermaidRef.current.querySelector('svg');
      const serializer = new XMLSerializer();
      const svgBlob = new Blob([serializer.serializeToString(svg)], {
        type: 'image/svg+xml',
      });
      const url = URL.createObjectURL(svgBlob);
      window.open(url, '_blank');
    }
  };

  const downloadAsPng = () => {
    if (mermaidRef.current) {
      const svg = mermaidRef.current.querySelector('svg');
      const svgData = new XMLSerializer().serializeToString(svg);

      // Create a canvas element to convert SVG to PNG
      const canvas = document.createElement('canvas');
      const svgSize = svg.getBoundingClientRect();
      canvas.width = svgSize.width;
      canvas.height = svgSize.height;
      const ctx = canvas.getContext('2d');
      const img = document.createElement('img');

      img.onload = () => {
        ctx.drawImage(img, 0, 0);
        const pngData = canvas.toDataURL('image/png');

        // Trigger download
        const link = document.createElement('a');
        link.download = 'mermaid-diagram.png';
        link.href = pngData;
        link.click();
      };

      img.src =
        'data:image/svg+xml;base64,' +
        btoa(unescape(encodeURIComponent(svgData)));
    }
  };

  const onEventTypeChange = (event) => {
    setSelectedType(event.target.value);
  };
  const onEntityChange = (event) => {
    setSelectedEntity(event.target.value);
  };

  const filteredEvents = dataset.events.filter((event) => {
    return (
      (!selectedEntity || event.sender === selectedEntity) &&
      (!selectedType || event.type === selectedType)
    );
  });

  console.log(filteredEvents, selectedEntity, selectedType);

  return (
    <div>
      <div className='buttons-container'>
        <Button onClick={handleOpen}>View Exchange</Button>
        <Button onClick={zoomIn}>Zoom In</Button>
        <Button onClick={zoomOut}>Zoom Out</Button>
        <Button onClick={resetZoom}>Reset</Button>
        <Button onClick={viewInFullScreen}>View in Fullscreen</Button>
        <Button onClick={downloadAsPng}>Download as PNG</Button>
      </div>
      <div className='mermaid' ref={mermaidRef}>
        {sample2}
      </div>

      {/* <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Entity A was clicked!
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            List of events sent by Entity A?
          </Typography>
        </Box>
      </Modal> */}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            View All Exchanged Events
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            <FilterGroup
              onChange={onEntityChange}
              label='Filter by sender entity'
              config={configEntities}
            />
            <FilterGroup
              onChange={onEventTypeChange}
              label='Filter by event type'
              config={configEventTypes}
            />
            <div>
              <h2> All Information Flow</h2>
              {filteredEvents.map((info) => {
                return (
                  <>
                    <Card style={{ marginBottom: 10, padding: 10 }}>
                      <div>
                        <span>
                          {info.date} {info.time}
                        </span>
                      </div>
                      <div>
                        <span>Type: {info.type} </span>
                        <span>Sender: {info.sender} </span>
                        <span>Receiver: {info.receiver} </span>
                      </div>
                      <span>Content: {info.content}</span>
                    </Card>
                  </>
                );
              })}
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default MermaidChart;

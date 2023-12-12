import React, { useEffect, useRef, useState } from 'react';
import { SequenceDiagram } from 'svg-sequence-diagram';
import { sample1, style } from '../sample';
import { Box, Button, Modal, Typography } from '@mui/material';

const SVGSequenceDiagram = () => {
  const ref = useRef();
  const [scale, setScale] = useState(1);
  const [message, setMessage] = useState('');
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (ref.current) {
      const svg = ref.current.querySelector('svg');
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
    if (ref.current) {
      const svg = ref.current.querySelector('svg');
      const serializer = new XMLSerializer();
      const svgBlob = new Blob([serializer.serializeToString(svg)], {
        type: 'image/svg+xml',
      });
      const url = URL.createObjectURL(svgBlob);
      window.open(url, '_blank');
    }
  };

  const downloadAsPng = () => {
    if (ref.current) {
      const svg = ref.current.querySelector('svg');
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
        link.download = 'svg-sequence-diagram.png';
        link.href = pngData;
        link.click();
      };

      img.src =
        'data:image/svg+xml;base64,' +
        btoa(unescape(encodeURIComponent(svgData)));
    }
  };
  useEffect(() => {
    const chart = new SequenceDiagram(sample1);
    const svgElement = chart.dom();
    svgElement.setAttribute('width', '800px');
    svgElement.setAttribute('height', '550px');

    function handleClick(event) {
      console.log('event here?', event.label[0][0].text);
      setMessage(event.label[0][0].text);
      handleOpen();
    }
    chart.addEventListener('click', handleClick);

    if (ref.current) {
      ref.current.innerHTML = '';
      ref.current.appendChild(svgElement);
    }
  }, []);

  return (
    <div>
      <div className='buttons-container'>
        <Button onClick={zoomIn}>Zoom In</Button>
        <Button onClick={zoomOut}>Zoom Out</Button>
        <Button onClick={resetZoom}>Reset</Button>
        <Button onClick={viewInFullScreen}>View in Fullscreen</Button>
        <Button onClick={downloadAsPng}>Download as PNG</Button>
      </div>
      <div ref={ref} />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            View Details of Event
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            {message}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default SVGSequenceDiagram;

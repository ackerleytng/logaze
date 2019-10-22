import React from 'react';
import Toast from 'react-bootstrap/Toast'

const RescrapeToast = ({ beforeOnClose, beforeShow, afterOnClose, afterShow }) => (
  <div
    style={{
      position: 'absolute',
      top: '1%',
      right: '1%',
      zIndex: 10
    }}
  >
    <Toast onClose={beforeOnClose} show={beforeShow}
           delay={3000} autohide>
      <Toast.Header>
        <strong className="mr-auto">Scraper triggered!</strong>
      </Toast.Header>
      <Toast.Body>Scraper is starting up...</Toast.Body>
    </Toast>
    <Toast onClose={afterOnClose} show={afterShow}
           delay={3000} autohide>
      <Toast.Header>
        <strong className="mr-auto">Scraping triggered!</strong>
      </Toast.Header>
      <Toast.Body>Wait a bit, and then refresh this page!</Toast.Body>
    </Toast>
  </div>
);

export default RescrapeToast;

import React from 'react';
import Toast from 'react-bootstrap/Toast'

const RescrapeToast = ({ beforeOnClose, beforeShow, afterOnClose, afterShow }) => (
  <div
    aria-live="polite"
    aria-atomic="true"
    style={{
      position: 'relative',
    }}
  >
    <div
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        zIndex: afterShow || beforeShow ? 10 : 0,
      }}
    >
      <Toast onClose={beforeOnClose}
             show={beforeShow}
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
  </div>
);

export default RescrapeToast;

import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import mascot from './images/pouchie-bino.svg';

const About = (props) => (
  <Modal
    {...props}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
        About
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <p>When I wanted to buy a refurbished ThinkPad, I used <a href="https://lw.ofwiz.com">lw.ofwiz</a>, but found it lacking because I couldn't filter for specs important to me, such as screen resolution, screen size, and whether the ThinkPad <a href="https://www.reddit.com/r/thinkpad/">had an IPS screen</a>.</p>

      <p>So, I built logaze to watch laptop prices on Lenovo outlet. On this site, you can sort and filter on any column, on any field you are interested in. If that's not enough, download a csv dump of the data and work through that yourself!</p>

      <p style={{textAlign: 'center'}}><img alt="" src={mascot} /></p>

      <small>p.s. Thanks for loading this page! You're contributing to scraping Lenovo Outlet. (see faq)</small>
    </Modal.Body>
    <Modal.Footer>
      <small>Built with love by <a href="https://github.com/ackerleytng">ackerleytng</a> in Clojure (<a href="https://github.com/ackerleytng/logaze-scraper">scraper</a>) and React (<a href="https://github.com/ackerleytng/logaze">frontend</a>)</small>{' '}
      <Button onClick={props.onHide}>Close</Button>
    </Modal.Footer>
  </Modal>
);

export default About;

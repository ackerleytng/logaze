import React from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

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
      <p>
        When I wanted to buy a refurbished ThinkPad, I used <a href="https://lw.ofwiz.com">lw.ofwiz</a>,
        but found it lacking because I couldn't filter for specs important to
        me, such as screen resolution, screen size, and whether the ThinkPad <a
        href="https://www.reddit.com/r/thinkpad/">had an IPS screen</a>.
      </p>

      <p>So I went all out to build logaze, to watch Lenovo's refurbished ThinkPad prices.</p>

      <small>p.s. Thanks for loading this page! You're contributing to scraping
        the Lenovo Outlet. (see faq)</small>
    </Modal.Body>
    <Modal.Footer>
      <small>Built with love by <a href="https://github.com/ackerleytng">ackerleytng</a> in Clojure (<a href="https://github.com/ackerleytng/logaze-scraper">scraper</a>) and React (<a href="https://github.com/ackerleytng/logaze">frontend</a>)</small>{' '}
      <Button onClick={props.onHide}>Close</Button>
    </Modal.Footer>
  </Modal>
);

export default About;

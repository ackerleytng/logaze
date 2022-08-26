import React from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const Faq = (props) => (
  <Modal
    {...props}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
        FAQ
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <dl>
        <dt>Why does Lenovo say there are 235 (big number) products found but you only show 160 (smaller)?</dt>
        <dd>Some of those are already out of stock, I filtered out anything that is out of stock.</dd>
      </dl>
      <dl>
        <dt>How am I contributing to scraping Lenovo Outlet?</dt>
        <dd>Whenever you open this page, your browser will check when the last update was, and if the last scraping time was more than 4 hours ago, your browser will trigger the scraper automatically. Thank you for helping to trigger the scraping! (Nope, your computer is not being used to scrape Lenovo Outlet.)</dd>
      </dl>
      <dl>
        <dt>What is your backend/scraper?</dt>
        <dd>My backend is technically just a json file; the scraper is hosted at an alwaysdata site. The alwaysdata site sleeps if it does not receive any traffic, and it takes really long to wake up after sleeping, hence I decided to cache results in a json file for better UX.</dd>
      </dl>
      <dl>
        <dt>How are you caching scraping results?</dt>
        <dd>I'm using <a href="https://jsonblob.com">jsonblob.com</a>! They are a really great service that is like pastebin, but for json. They have a nice API for updating stored json!</dd>
      </dl>
      <dl>
        <dt>Is this insecure, since the data being served from jsonblob.com could be written to by anyone?</dt>
        <dd>Yes, this means that if someone writes to the stored json at <a href="https://jsonblob.com">jsonblob.com</a>, they could potentially use XSS on you. <a href="https://www.ag-grid.com">ag-grid</a> was previously vulnerable to XSS (<a href="https://github.com/ag-grid/ag-grid/issues/1961">#1961</a>, <a href="https://github.com/ag-grid/ag-grid/issues/1287">#1287</a>), but that has since been <a href="https://github.com/dominikg/ag-grid/commit/28625a36bf5a3d98081f44ef73d548e0191dfc2a">fixed</a>, by using <code>.textContent</code> to render cell contents. This prevents the data from being interpreted as html and protects clients from XSS.</dd>
      </dl>
      <dl>
        <dt>Why not secure the storage at jsonblob.com?</dt>
        <dd>It would be great if <a href="https://jsonblob.com">jsonblob.com</a> allowed users to control writes using a key, and yet allow public access to the data.</dd>
      </dl>
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={props.onHide}>Close</Button>
    </Modal.Footer>
  </Modal>
);

export default Faq;

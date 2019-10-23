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
        <dd>My backend is technically just a json file; the scraper resides on heroku. The heroku free dyno sleeps if it does not receive any traffic for 30 mins, and it takes really long to wake up after sleeping, hence I decided to cache results in a json file for better UX.</dd>
      </dl>
      <dl>
        <dt>How are you caching scraping results?</dt>
        <dd>I'm using <a href="https://jsonbin.io">jsonbin.io</a>! They are a really great service that is like pastebin, but for json. They have a nice API for updating bins, and they allow you to update the same bin with new data!</dd>
      </dl>
      <dl>
        <dt>Is this insecure, since the data being served from jsonbin.io could be written to by anyone?</dt>
        <dd>Yes, this means that if someone writes to the bin at <a href="https://jsonbin.io">jsonbin.io</a>, they could potentially use XSS on you. I believe <a href="https://www.ag-grid.com">ag-grid</a> escapes cell contents, but I will verify that. (TODO)</dd>
      </dl>
      <dl>
        <dt>Why not secure the bin at jsonbin.io?</dt>
        <dd>I wish <a href="https://jsonbin.io">jsonbin.io</a> allowed users to protect bins from writes with a key, but allow public access to the bin. As I understand it, they do have private bins, but that means needing the same key for access. If I have to embed the key in the web client, we're back to square one in protecting the bin from unauthorized writes.</dd>
      </dl>
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={props.onHide}>Close</Button>
    </Modal.Footer>
  </Modal>
);

export default Faq;

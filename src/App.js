import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import mascot from './images/pouchie-bino-white-bg.svg';

import {
  useData,
  loadFromStorage,
  dataToCsv,
  download
} from './data';
import {
  getTime,
  getLastScrapeTime,
  setLastScrapeTime,
  useScrapeTime,
} from './time';
import Grid from './Grid'
import About from './About'
import Faq from './Faq'
import RescrapeToast from './RescrapeToast'


const downloadCsv = () => loadFromStorage().then(data => download('logaze.csv', dataToCsv(data)));

const shouldScrape = async () => {
  const now = await getTime();
  const last = await getLastScrapeTime();
  return !now.isValid() || !last.isValid() || now.isAfter(last.add(4, 'hours'));
}

const App = () => {
  const data = useData();
  const scrapeTime = useScrapeTime();
  const lastUpdatedText = scrapeTime.isValid() ? `, last updated ${scrapeTime.fromNow()}` : '';
  const scraperAddr = 'https://logaze.herokuapp.com/';

  const [aboutModalShow, setAboutModalShow] = useState(false);
  const [faqModalShow, setFaqModalShow] = useState(false);
  const [rescrapeBeforeToastShow, setRescrapeBeforeToastShow] = useState(false);
  const [rescrapeAfterToastShow, setRescrapeAfterToastShow] = useState(false);

  const rescrape = () => {
    setRescrapeBeforeToastShow(true);
    fetch(scraperAddr)
      .then(() => getTime().then(setLastScrapeTime))
      .then(() => setRescrapeAfterToastShow(true));
  };

  useEffect(() => {
    const scrapeIfNecessary = async () => {
      if (await shouldScrape()) {
        rescrape();
      }
    };

    scrapeIfNecessary();
  }, []);

  return (
    <>
      <RescrapeToast
        beforeOnClose={() => setRescrapeBeforeToastShow(false)}
        beforeShow={rescrapeBeforeToastShow}
        afterOnClose={() => setRescrapeAfterToastShow(false)}
        afterShow={rescrapeAfterToastShow}
      />

      <Navbar expand="sm" bg="dark" variant="dark">
        <Navbar.Brand onClick={() => setAboutModalShow(true)}>
          <img
            alt=""
            src={mascot}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
          logaze
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#" onClick={() => setAboutModalShow(true)}>about</Nav.Link>
            <Nav.Link href="#" onClick={() => setFaqModalShow(true)}>faq</Nav.Link>
            <Nav.Link href="#" onClick={() => rescrape()}>rescrape</Nav.Link>
            <Nav.Link href="#" onClick={downloadCsv}>csv</Nav.Link>
            <Nav.Link href="https://github.com/ackerleytng/logaze/issues">issues?</Nav.Link>
          </Nav>
          <Navbar.Text>
            <small>{data.length} laptops found{lastUpdatedText}</small>
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>

      <Grid data={data} />

      <About
        show={aboutModalShow}
        onHide={() => setAboutModalShow(false)}
      />
      <Faq
        show={faqModalShow}
        onHide={() => setFaqModalShow(false)}
      />
    </>
  );
}

export default App;

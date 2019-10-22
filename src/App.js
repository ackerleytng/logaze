import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

import {
  useData,
  loadFromJsonbin,
  dataToCsv,
  download
} from './data';
import Grid from './Grid'
import About from './About'
import Faq from './Faq'
import RescrapeToast from './RescrapeToast'


const downloadCsv = () => loadFromJsonbin().then(data => download('logaze.csv', dataToCsv(data)));

const App = () => {
  const data = useData();

  const [aboutModalShow, setAboutModalShow] = useState(false);
  const [faqModalShow, setFaqModalShow] = useState(false);
  const [rescrapeBeforeToastShow, setRescrapeBeforeToastShow] = useState(false);
  const [rescrapeAfterToastShow, setRescrapeAfterToastShow] = useState(false);

  const rescrape = () => {
    setRescrapeBeforeToastShow(true);
    fetch("http://logaze.herokuapp.com/").then(() => setRescrapeAfterToastShow(true))
  };

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">
          <img
            alt=""
            src="/logo.svg"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
          logaze
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link onClick={() => setAboutModalShow(true)}>about</Nav.Link>
          <Nav.Link onClick={() => setFaqModalShow(true)}>faq</Nav.Link>
          <Nav.Link onClick={() => rescrape()}>rescrape</Nav.Link>
          <Nav.Link onClick={downloadCsv}>csv</Nav.Link>
        </Nav>
        <Nav>
          <Navbar.Text>
            <small>{data.length} laptops found</small>
          </Navbar.Text>
        </Nav>
      </Navbar>

      <RescrapeToast
        beforeOnClose={() => setRescrapeBeforeToastShow(false)}
        beforeShow={rescrapeBeforeToastShow}
        afterOnClose={() => setRescrapeAfterToastShow(false)}
        afterShow={rescrapeAfterToastShow}
      />

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

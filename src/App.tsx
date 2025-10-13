import { useState, useEffect, useRef } from "react";
import { formatDistance, isAfter, addHours } from "date-fns";
import { Navbar, Nav, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import { useData, loadFromStorage, dataToCsv, download, LaptopData } from "./data";
import { getTime } from "./time";
import Grid, { GridHandle } from "./Grid";
import About from "./About";
import Faq from "./Faq";
import RescrapeToast from "./RescrapeToast";
import Mascot from "./images/pouchie-bino-white-bg.svg?react";

const downloadCsv = (): Promise<void> =>
  loadFromStorage().then(({ laptopData: data }) => download("logaze.csv", dataToCsv(data)));

const shouldScrape = async (last: Date): Promise<boolean> => {
  const now = await getTime();
  return isAfter(now, addHours(last, 4));
};

const lastUpdatedText = (scrapeTime: Date | null): string =>
  scrapeTime
    ? `, last updated ${formatDistance(scrapeTime, new Date(), { addSuffix: true })}`
    : "";

const unavailableCount = (data: LaptopData[]): string => {
  const count = data.filter((row: LaptopData) => !row["available"]).length;
  return count > 0 ? `, ${count} unavailable` : ""
}

const App = () => {
  const { laptopData: data, lastModified } = useData();
  const scraperAddr = "https://logaze-scraper.onrender.com/";

  const [aboutModalShow, setAboutModalShow] = useState(false);
  const [faqModalShow, setFaqModalShow] = useState(false);
  const [rescrapeBeforeToastShow, setRescrapeBeforeToastShow] = useState(false);
  const [rescrapeAfterToastShow, setRescrapeAfterToastShow] = useState(false);

  const rescrape = () => {
    setRescrapeBeforeToastShow(true);
    fetch(scraperAddr).then(() => setRescrapeAfterToastShow(true));
  };

  useEffect(() => {
    const scrapeIfNecessary = async () => {
      if (await shouldScrape(lastModified)) {
        rescrape();
      }
    };

    scrapeIfNecessary();
  }, []);

  const gridRef = useRef<GridHandle>(null);

  return (
    <>
      <RescrapeToast
        beforeOnClose={() => setRescrapeBeforeToastShow(false)}
        beforeShow={rescrapeBeforeToastShow}
        afterOnClose={() => setRescrapeAfterToastShow(false)}
        afterShow={rescrapeAfterToastShow}
      />

      <Navbar
	className="logaze-navbar"
        expand="sm"
        bg="dark"
        variant="dark"
      >
        <Navbar.Brand onClick={() => setAboutModalShow(true)}>
          <Mascot width="30" height="30" className="d-inline-block align-top" />{" "}
          logaze
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link onClick={() => setAboutModalShow(true)}>about</Nav.Link>
            <Nav.Link onClick={() => setFaqModalShow(true)}>faq</Nav.Link>
            <Nav.Link onClick={() => rescrape()}>rescrape</Nav.Link>
            <Nav.Link onClick={downloadCsv}>csv</Nav.Link>
            <Nav.Link href="https://github.com/ackerleytng/logaze/issues">
              issues?
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <small>
              {data.length} laptops found{unavailableCount(data)}{lastUpdatedText(lastModified)}
            </small>
          </Navbar.Text>
          <Form className="ms-1">
            <Button
	      variant="outline-secondary"
	      size="sm"
	      onClick={() => { gridRef.current?.resetGrid(); }}
	      title="Reset sorting/filtering in grid">
              reset grid
            </Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>

      <Grid ref={gridRef} data={data} />

      <About show={aboutModalShow} onHide={() => setAboutModalShow(false)} />
      <Faq show={faqModalShow} onHide={() => setFaqModalShow(false)} />
    </>
  );
};

export default App;

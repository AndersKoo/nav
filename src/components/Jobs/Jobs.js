// Tools
import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Jobs.css";
import ReactPaginate from "react-paginate";

function Jobs() {
  // Hooks
  const [items, setItems] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const jobsPerPage = 10;
  const pagesVisited = pageNumber * jobsPerPage;
  const [show, setShow] = useState(false);

  // Functions
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Decimal round up for pagecount
  const pageCount = Math.ceil(items.length / jobsPerPage);

  // Changes page to the current page (on click)
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  // Display of job applications (10 applications for each site)
  const displayJobs = items
    .slice(pagesVisited, pagesVisited + jobsPerPage)
    .map((jobs) => {
      return (
        <div key={jobs.uuid} className="jobs">
          <div className="job">
            <p className="bold">{jobs.title}</p>
            <p>Antall stillinger: {jobs.positioncount}</p>
            <p>Frist: {jobs.published}</p>
          </div>
          {/* Bootstrap modal for job description */}
          <Modal className="modal" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Beskrivelse</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p className="name">{jobs.employer.name}</p>
              <p>Ansettelsesform: {jobs.engagementtype}</p>
              <p className="extent">Periode: {jobs.extent} </p>
              <p className="description ">
                Beskrivelse: {jobs.employer.description}
              </p>
              <p className="due bold">Søknadsfrist: {jobs.applicationDue}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
          <div className="icons">
            <i class="bi bi-info-circle rightCorner " onClick={handleShow}></i>
            <i class="bi bi-star star"></i>
          </div>
        </div>
      );
    });

  // Connection to API
  useEffect(() => {
    fetch(
      "https://arbeidsplassen.nav.no/public-feed/api/v1/ads?size=500&page=1",
      {
        method: "GET",
        headers: {
          Authorization:
            "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwdWJsaWMudG9rZW4udjFAbmF2Lm5vIiwiYXVkIjoiZmVlZC1hcGktdjEiLCJpc3MiOiJuYXYubm8iLCJpYXQiOjE1NTc0NzM0MjJ9.jNGlLUF9HxoHo5JrQNMkweLj_91bgk97ZebLdfx3_UQ",
        },
      }
    ).then((res) =>
      res.json().then((data) => {
        console.log(data);
        setItems(data.content);
      })
    );
  }, []);

  return (
    <div className="app">
      <ReactPaginate
        previousLabel={"Forrige"}
        nextLabel={"Neste"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginateBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginateDisabled"}
        activeClassName={"paginationActive"}
      />
      {displayJobs}{" "}
    </div>
  );
}

export default Jobs;

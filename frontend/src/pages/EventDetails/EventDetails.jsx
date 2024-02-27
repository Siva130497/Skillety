import React, { useContext, useState } from "react";
import { useEffect } from "react";
import $ from "jquery";
import "./EventDetails.css";
import "./EventDetails-responsive.css";
import { CandidateFooter } from "../../components/CandidateFooter";
import LayoutNew from "../../components/LayoutNew";
import { useParams } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import ErrorPage from "../../404/404";

const CandidateTestimonialDetail = () => {
  const { id } = useParams();

  const { eventDetail, getEventDetail, getEventImg, eventImg } =
    useContext(AuthContext);
  const [event, setEvent] = useState([]);
  const [image, setImage] = useState("");
  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pageNotFound, setPageNotFound] = useState(false);

  const intialBookingFormDetail = {
    fullName: "",
    email: "",
    phoneNo: "",
    message: "",
  };
  const [bookingFormDetail, setBookingFormDetail] = useState(
    intialBookingFormDetail
  );

  //for show success message for payment
  function showSuccessMessage(message) {
    Swal.fire({
      title: "Success!",
      text: message,
      icon: "success",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "OK",
    });
  }

  //for show error message for payment
  function showErrorMessage(message) {
    Swal.fire({
      title: "Error!",
      text: message,
      icon: "error",
      confirmButtonColor: "#d33",
      confirmButtonText: "OK",
    });
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBookingFormDetail({ ...bookingFormDetail, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("https://skillety-n6r1.onrender.com/book-an-event", {
        ...bookingFormDetail,
        bookingEventId: id,
      })
      .then((res) => {
        console.log(res.data);
        showSuccessMessage("Event Booked Successfully!, We will contact you");
        setBookingFormDetail(intialBookingFormDetail);
      })
      .catch((err) => {
        console.log(err.response.data.error);
        showErrorMessage(err.response.data.error);
      });
  };

  useEffect(() => {
    getEventDetail();
    getEventImg();
  }, []);

  useEffect(() => {
    const preloader = $("#preloader");
    if (preloader.length) {
      setTimeout(function () {
        preloader.fadeOut("slow", function () {
          preloader.remove();
        });
      }, 500);
    }
  }, []);

  useEffect(() => {
    if (eventDetail.length > 0) {
      const foundEvent = eventDetail.find((eve) => eve.id === id);
      if (foundEvent) {
        setLoading(false);
        setEvent(foundEvent);

        const matchingImg = eventImg
          ? eventImg.find((img) => img.id === foundEvent.id)
          : null;

        if (matchingImg) {
          setImage(
            `https://skillety-n6r1.onrender.com/images/${matchingImg.image}`
          );
        } else {
          setImage("assets/img/events/event-img.jpg");
        }

        setStatus(true);
      } else {
        setLoading(false);
        setPageNotFound(true);
      }
    }
  }, [eventDetail, eventImg, id]);

  return (
    <div>
      {loading && <div id="preloader candidate"></div>}
      {status && (
        <div>
          <LayoutNew />
          <div className="testimonial-detail-section">
            <div className="container-fluid">
              <div className="container-fluid container-section">
                <div className="custom--container">
                  <div className="breadcrumb--area-dark" data-aos="fade-down">
                    <div className="breadcrumb--item-dark">
                      <a href="/candidate-home">Home</a>
                    </div>
                    <div className="breadcrumb--item-dark">
                      <a className="sub--bredcrumb-link" href="/events">
                        Media
                      </a>
                    </div>
                    <div className="breadcrumb--item-dark">
                      <p>Event Detail</p>
                    </div>
                  </div>

                  <div className="event--detail-content-section">
                    <div className="event--detail-img-area">
                      <img
                        src={image}
                        data-aos="fade"
                        className="event--detail-img"
                        alt=""
                      />
                    </div>
                    <div className="event--detail-lable-area">
                      <span
                        className="event--detail-lable"
                        data-aos="fade-left"
                      >
                        Webinar
                      </span>
                    </div>
                    <div className="event--detail-top-area">
                      <div
                        className="event--detail-title-area"
                        data-aos="fade-right"
                      >
                        <h4 className="event--detail-title">{event.title}</h4>
                      </div>
                      <div
                        className="event--detail-sub-cont-area"
                        data-aos="fade-left"
                      >
                        <div className="event--detail-location-area">
                          <i className="bx bxs-map"></i>
                          <span className="event--detail-sub-cont">
                            {event.location}
                          </span>
                        </div>
                        <div className="event--detail-sub-cont">
                          Date of the Event
                        </div>
                        <div className="event--detail-date">{event.date}</div>
                      </div>
                    </div>
                    <div className="event--detail-desc-area">
                      <p className="event--detail-desc" data-aos="fade">
                        {event.description}
                      </p>
                    </div>
                    <div className="event--detail-btn-area">
                      <a
                        href="##"
                        data-bs-toggle="modal"
                        data-bs-target="#book_event_modal"
                        className="ser--cont-btn-sub candidate"
                        data-aos="fade-right"
                      >
                        <div className="ser--cont-btn candidate pe-lg-5 ps-lg-5">
                          Book an event
                        </div>

                        <div className="ser--cont-arrow-area candidate">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="27"
                            height="27"
                            viewBox="0 0 27 27"
                            fill="none"
                          >
                            <path
                              d="M2.56641 3.44987C6.17752 6.50543 15.5664 10.4499 24.2331 1.7832"
                              stroke="#714F36"
                              stroke-width="2"
                            />
                            <path
                              d="M24.5618 1.45996C21.07 4.6512 15.9586 13.4593 23.4473 23.162"
                              stroke="#714F36"
                              stroke-width="2"
                            />
                            <path
                              d="M1 26L25.1667 1"
                              stroke="#714F36"
                              stroke-width="2"
                            />
                          </svg>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="tal--pro-slider-btn-area" data-aos="fade-up">
                {/* <div className="tal--pro-slider-btn-sub">
                  <button className="tal--pro-slider-btn">
                    <svg
                      className="arrow-left"
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      viewBox="0 0 27 27"
                      fill="none"
                    >
                      <path
                        d="M2.56641 3.44987C6.17752 6.50543 15.5664 10.4499 24.2331 1.7832"
                        stroke="#5C3B2E"
                        stroke-width="2"
                      />
                      <path
                        d="M24.5618 1.45996C21.07 4.6512 15.9586 13.4593 23.4473 23.162"
                        stroke="#5C3B2E"
                        stroke-width="2"
                      />
                      <path
                        d="M1 26L25.1667 1"
                        stroke="#5C3B2E"
                        stroke-width="2"
                      />
                    </svg>
                  </button>
                  <button className="tal--pro-slider-btn">
                    <svg
                      className="arrow-right"
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      viewBox="0 0 27 27"
                      fill="none"
                    >
                      <path
                        d="M2.56641 3.44987C6.17752 6.50543 15.5664 10.4499 24.2331 1.7832"
                        stroke="#5C3B2E"
                        stroke-width="2"
                      />
                      <path
                        d="M24.5618 1.45996C21.07 4.6512 15.9586 13.4593 23.4473 23.162"
                        stroke="#5C3B2E"
                        stroke-width="2"
                      />
                      <path
                        d="M1 26L25.1667 1"
                        stroke="#5C3B2E"
                        stroke-width="2"
                      />
                    </svg>
                  </button>
                </div> */}
              </div>
            </div>
          </div>

          {/* modal here */}
          <div
            className="modal fade"
            id="book_event_modal"
            tabindex="-1"
            aria-labelledby="book_event_modal_label"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content comp-det-modal">
                <div className="modal-header comp-det-modal-header">
                  <h5
                    className="modal-title comp-det-modal-head"
                    id="exampleModalLabel"
                  >
                    Book an Event_
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <form>
                  <div className="modal-body comp-det-modal-body">
                    <div className="row p-3">
                      <div className="col-12 col-md-12 col-lg-6">
                        <div className="form-group book-event-fm-grp">
                          <label
                            htmlFor="first_name"
                            className="form-label book-event-label"
                          >
                            Full Name <span className="form-required">*</span>
                          </label>
                          <input
                            type="text"
                            name="fullName"
                            className="form-control book-event-input"
                            placeholder="Enter Your Full Name"
                            value={bookingFormDetail.fullName}
                            onChange={handleInputChange}
                          />
                          <small className="form-required">
                            This filed is required.
                          </small>
                        </div>
                      </div>

                      {/* <div className="col-12 col-md-12 col-lg-6">
                        <div className="form-group book-event-fm-grp">
                          <label
                            htmlFor="last_name"
                            className="form-label book-event-label"
                          >
                            Last Name <span className="form-required">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control book-event-input"
                            placeholder="Enter Your Last Name"
                          />
                        </div>
                      </div> */}

                      <div className="col-12 col-md-12 col-lg-6">
                        <div className="form-group book-event-fm-grp">
                          <label
                            htmlFor="mobile"
                            className="form-label book-event-label"
                          >
                            Phone No. <span className="form-required">*</span>
                          </label>
                          <input
                            type="Number"
                            name="phoneNo"
                            className="form-control book-event-input"
                            placeholder="Enter Your Phone Number"
                            value={bookingFormDetail.phoneNo}
                            onChange={handleInputChange}
                          />
                          <small className="form-required">
                            This filed is required.
                          </small>
                        </div>
                      </div>

                      <div className="col-12 col-md-12 col-lg-6">
                        <div className="form-group book-event-fm-grp">
                          <label
                            htmlFor="email"
                            className="form-label book-event-label"
                          >
                            Email <span className="form-required">*</span>
                          </label>
                          <input
                            type="email"
                            name="email"
                            className="form-control book-event-input"
                            placeholder="Enter Your Email"
                            value={bookingFormDetail.email}
                            onChange={handleInputChange}
                          />
                          <small className="form-required">
                            This filed is required.
                          </small>
                        </div>
                      </div>

                      <div className="col-12 col-md-12 col-lg-12">
                        <div className="form-group book-event-fm-grp mb-2">
                          <label
                            htmlFor="note"
                            className="form-label book-event-label"
                          >
                            Message <span className="form-required">*</span>
                          </label>
                          <textarea
                            name="message"
                            className="form-control book-event-input"
                            placeholder="Any Note Here"
                            value={bookingFormDetail.message}
                            onChange={handleInputChange}
                          ></textarea>
                          <small className="form-required">
                            This filed is required.
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer comp-det-modal-footer">
                    <button
                      type="button"
                      className="btn btn-close-btn"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className="btn btn-submit-btn"
                      onClick={handleSubmit}
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          {/*  */}

          <CandidateFooter />
        </div>
      )}
      {pageNotFound && (
        <ErrorPage />
      )}
    </div>
  );
};
export default CandidateTestimonialDetail;

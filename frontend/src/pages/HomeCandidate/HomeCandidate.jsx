import React, { useContext } from 'react';
import { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import $ from 'jquery';
import './HomeCandidate.css';
import './HomeCandidate-responsive.css';
import { CandidateFooter } from '../../components/CandidateFooter';
import LayoutNew from '../../components/LayoutNew';
import AuthContext from '../../context/AuthContext';
import axios from 'axios'
import { useState } from 'react';

const HomeCandidate = () => {

  const { eventDetail, getEventDetail, getEventImg, eventImg, getClientImg, clientImg } = useContext(AuthContext);
  const [allJobs, setAllJobs] = useState([]);
  const [allClient, setAllClient] = useState([]);

  const getPostedjobs = async () => {
    try {
      const res = await axios.get(`http://localhost:5002/posted-jobs`, {
        headers: {
          Accept: 'application/json'
        }
      });
      const result = res.data;
      if (!result.error) {
        console.log(result);
        setAllJobs(result.reverse());
      } else {
        console.log(result);
      }
    } catch (err) {
      console.log(err);
    }
  }



  useEffect(() => {
    getEventDetail();
    getEventImg();
    getPostedjobs();
    getClientImg();

    axios.get("http://localhost:5002/clients")
    .then(res => {
      const allClients = res.data;
      
      // Create a Map to store unique objects based on companyId
      const uniqueClientsMap = new Map();

      // Iterate through all clients and store only unique objects in the Map
      allClients.forEach(client => {
        uniqueClientsMap.set(client.companyId, client);
      });

      // Convert the Map values back to an array
      const uniqueClientsArray = Array.from(uniqueClientsMap.values());

      console.log(uniqueClientsArray);
      setAllClient(uniqueClientsArray);
    })
    .catch(err => console.log(err));

  }, []);

  useEffect(() => {
    // Function to animate the numbers
    function animateNumber(element, targetNumber) {
      let currentNumber = 0;
      const increment = Math.ceil(targetNumber / 100); // Increment step (adjust as needed)
      const animationDuration = 4000; // Animation duration in milliseconds (adjust as needed)

      const updateNumber = () => {
        currentNumber += increment;
        if (currentNumber >= targetNumber) {
          currentNumber = targetNumber;
          clearInterval(interval);
        }
        element.textContent = `${(currentNumber / 1).toFixed()}+`; // Display as "X.XXM"
      };

      const interval = setInterval(updateNumber, animationDuration / 100);
    }

    // Function to handle the intersection observer callback
    function handleIntersection(entries, observer) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // When the section is in view, start the animation for each number
          const numbers = document.querySelectorAll('.home-milestone-number');
          numbers.forEach(numberElement => {
            const targetNumber = parseInt(numberElement.getAttribute('data-target'));
            animateNumber(numberElement, targetNumber);
          });

          // Unobserve the section after the animation starts to avoid unnecessary re-runs
          observer.unobserve(entry.target);
        }
      });
    }

    // Create the Intersection Observer instance
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '0px',
      threshold: 0.5 // Adjust the threshold as needed (0.5 means 50% of the section is visible)
    });

    // Observe the section
    const section = document.querySelector('.home--milestone-card');
    observer.observe(section);
  }, []);

  const breakpoints = {
    320: {
      slidesPerView: 1,
    },
    480: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    991: {
      slidesPerView: 2.5,
    },
    1200: {
      slidesPerView: 2.7,
    },
    1400: {
      slidesPerView: 3.5,
    },
  };
  return (
    <div>
      <LayoutNew home={true} />
      <div className='container-fluid home--section'>
        <div className='container-fluid container-section'>
          <div className="home--bg candidate">
            <div className="row col-rev-custom">
              <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-7 col-xxl-7 home--left-cover">
                <div className="home--head candidate">
                  <h4 data-aos="fade-left" data-aos-delay="200">
                    Great opportunities knock only once. We make sure you don’t miss them.
                  </h4>
                  <h3 data-aos="fade-left" data-aos-delay="200">Choose from over 2400+ Jobs.</h3>
                  <h5 data-aos="fade-left" data-aos-delay="200">
                    Welcome to the place where you get hired in less than 7 days. Grab your Interview in 24 hours.
                  </h5>
                  <h6 data-aos="fade-right" data-aos-delay="300">
                    Search For Jobs
                  </h6>
                </div>
                <div className="home--search-area candidate">
                  <input type="text" data-aos="fade-down" data-aos-delay="200" className='home--search-box candidate form-control' placeholder='Search job, keywords, companies' />
                  <i class="bi bi-search home--search-icon" data-aos="zoom-in" data-aos-delay="200"></i>
                  <button className='btn home--search-btn candidate' data-aos="fade-up" data-aos-delay="100">Search</button>
                </div>
                <div className="home--popular-area candidate">
                  <h6 data-aos="fade-right">Popular Searches</h6>
                  <div className="popular--btn-area candidate">
                    <a href="" className='btn home--popular-btn candidate' data-aos="fade-up" data-aos-delay="150">UI Designer</a>
                    <a href="" className='btn home--popular-btn candidate' data-aos="fade-up" data-aos-delay="100">Marketing</a>
                    <a href="" className='btn home--popular-btn candidate' data-aos="fade-up" data-aos-delay="100">Finance</a>
                    <a href="" className='btn home--popular-btn candidate' data-aos="fade-up" data-aos-delay="50">IT</a>
                    <a href="" className='btn home--popular-btn candidate' data-aos="fade-up" data-aos-delay="50">Engineering</a>
                    <a href="" className='btn home--popular-btn candidate' data-aos="fade-up" data-aos-delay="0">Sales</a>
                    <a href="" className='btn home--popular-btn candidate' data-aos="fade-up" data-aos-delay="0">Retail</a>
                  </div>
                </div>

              </div>
              <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-5 col-xxl-5 home--right-cover custom-flex">
                <div className='home--blob-img-area'>
                  <div className="home--img-area">
                    <img src="assets/img/home-images/candidate-home-img.png" data-aos="fade" data-aos-delay="300" loading='lazy'
                      className='home--img animated' alt="" />
                    <img src="assets/img/home-images/bubble-1.png" className='bubble--img1 animated' alt="" data-aos="fade" data-aos-delay="200" />
                    <img src="assets/img/home-images/bubble-2.png" className='bubble--img2 animated' alt="" data-aos="fade" data-aos-delay="100" />
                    <img src="assets/img/home-images/bubble-5.png" className='bubble--img3 animated' alt="" data-aos="fade" data-aos-delay="200" />
                    <img src="assets/img/home-images/bubble-2.png" className='bubble--img4 animated' alt="" data-aos="fade" data-aos-delay="100" />
                    <img src="assets/img/home-images/bubble-6.png" className='bubble--img5 animated' alt="" data-aos="fade" data-aos-delay="100" />
                    <img src="assets/img/home-images/bubble-6.png" className='bubble--img6 animated' alt="" data-aos="fade" data-aos-delay="200" />
                    <img src="assets/img/home-images/bubble-6.png" className='bubble--img7 animated' alt="" data-aos="fade" data-aos-delay="100" />
                  </div>
                </div>
                <div className="home--card-area">
                  <div className="row">
                    <div className="col-xl-9 col-xxl-8 col-lg-12 col-md-12 offset-xl-3 offset-xxl-4">
                      <div className="card home--card candidate" data-aos="fade-right" data-aos-delay="100">
                        <div className="card--imgicon-area">
                          <h6 className='card--text candidate'>I am an immediate joiner</h6>
                          <img src="assets/img/home-images/clipboard-img.png" className='card--icon candidate' alt="" />
                        </div>
                        <div className="home--sub-des candidate">
                          <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                          </p>
                        </div>
                        <a href='' className="arrow--icon-btn candidate">
                          <img src="assets/img/home-images/arrow-dark.png" className='arrow--icon' alt="" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <section className='milestone--section candidate'>
            <div className="home--milestone-head-area">
              <div className='home--milestone-headarea'>
                <h6 data-aos="fade-down">Milestone numbers</h6>
                <h3 className='milestone--heading candidate' data-aos="fade-up">Achieving <span>Milestones</span></h3>
              </div>
              <div className="home--milestone-cards-area candidate">
                <div className="row">
                  <div className="col-12 col-xl-4 col-lg-12 col-md-12 ab--milestone-container">
                    <div className="cand--milestone-para-area" data-aos="fade-left">
                      <p className='cand--milestone-para'>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                      </p>
                    </div>
                  </div>

                  <div className="col-12 col-xl-4 col-lg-6 col-md-6 ab--milestone-container">
                    <article className='home--milestone-card' data-aos="zoom-out-left">
                      <div className="home--milestone-card-top">
                        <div className="home--milestone--arrow">
                          <svg xmlns="http://www.w3.org/2000/svg" width="47" height="69" viewBox="0 0 47 69" fill="none">
                            <path d="M2.06329 0V32.7516C1.61769 37.4304 3.40009 47.4563 11.4209 47.4563C19.4417 47.4563 27.6853 47.4563 30.8045 47.4563H40.162" stroke="#FFF" stroke-width="3" />
                            <path d="M22.1891 27.665C22.5796 33.9765 27.4558 46.6869 43.8366 47.0367" stroke="#FFF" stroke-width="3" />
                            <path d="M44.4526 47.0557C38.1429 46.6368 24.9137 49.8495 22.4744 66.0514" stroke="#FFF" stroke-width="3" />
                          </svg>
                        </div>
                      </div>
                      <div className="home--milestone-card-right">
                        <h6 className='home--milestone-title'>Numbers of Jobs</h6>
                        <h2 className='home-milestone-number candidate' data-target="130">0</h2>
                      </div>
                    </article>
                  </div>

                  <div className="col-12 col-xl-4 col-lg-6 col-md-6 ab--milestone-container">
                    <article className='home--milestone-card' data-aos="zoom-out-left">
                      <div className="home--milestone-card-top">
                        <div className="home--milestone--arrow">
                          <svg xmlns="http://www.w3.org/2000/svg" width="47" height="69" viewBox="0 0 47 69" fill="none">
                            <path d="M2.06329 0V32.7516C1.61769 37.4304 3.40009 47.4563 11.4209 47.4563C19.4417 47.4563 27.6853 47.4563 30.8045 47.4563H40.162" stroke="#FFF" stroke-width="3" />
                            <path d="M22.1891 27.665C22.5796 33.9765 27.4558 46.6869 43.8366 47.0367" stroke="#FFF" stroke-width="3" />
                            <path d="M44.4526 47.0557C38.1429 46.6368 24.9137 49.8495 22.4744 66.0514" stroke="#FFF" stroke-width="3" />
                          </svg>
                        </div>
                      </div>
                      <div className="home--milestone-card-right">
                        <h6 className='home--milestone-title'>Registrations per day</h6>
                        <h2 className='home-milestone-number candidate' data-target="200">0</h2>
                      </div>
                    </article>
                  </div>

                  <div className="col-12 col-xl-4 col-lg-6 col-md-6 ab--milestone-container">
                    <article className='home--milestone-card' data-aos="zoom-out-right">
                      <div className="home--milestone-card-top">
                        <div className="home--milestone--arrow">
                          <svg xmlns="http://www.w3.org/2000/svg" width="47" height="69" viewBox="0 0 47 69" fill="none">
                            <path d="M2.06329 0V32.7516C1.61769 37.4304 3.40009 47.4563 11.4209 47.4563C19.4417 47.4563 27.6853 47.4563 30.8045 47.4563H40.162" stroke="#FFF" stroke-width="3" />
                            <path d="M22.1891 27.665C22.5796 33.9765 27.4558 46.6869 43.8366 47.0367" stroke="#FFF" stroke-width="3" />
                            <path d="M44.4526 47.0557C38.1429 46.6368 24.9137 49.8495 22.4744 66.0514" stroke="#FFF" stroke-width="3" />
                          </svg>
                        </div>
                      </div>
                      <div className="home--milestone-card-right">
                        <h6 className='home--milestone-title'>Numbers of companies</h6>
                        <h2 className='home-milestone-number candidate' data-target="202">0</h2>
                      </div>
                    </article>
                  </div>

                  <div className="col-12 col-xl-4 col-lg-6 col-md-6 ab--milestone-container">
                    <article className='home--milestone-card' data-aos="zoom-out-right">
                      <div className="home--milestone-card-top">
                        <div className="home--milestone--arrow">
                          <svg xmlns="http://www.w3.org/2000/svg" width="47" height="69" viewBox="0 0 47 69" fill="none">
                            <path d="M2.06329 0V32.7516C1.61769 37.4304 3.40009 47.4563 11.4209 47.4563C19.4417 47.4563 27.6853 47.4563 30.8045 47.4563H40.162" stroke="#FFF" stroke-width="3" />
                            <path d="M22.1891 27.665C22.5796 33.9765 27.4558 46.6869 43.8366 47.0367" stroke="#FFF" stroke-width="3" />
                            <path d="M44.4526 47.0557C38.1429 46.6368 24.9137 49.8495 22.4744 66.0514" stroke="#FFF" stroke-width="3" />
                          </svg>
                        </div>
                      </div>
                      <div className="home--milestone-card-right">
                        <h6 className='home--milestone-title'>Number of placement till now</h6>
                        <h2 className='home-milestone-number candidate' data-target="147">0</h2>
                      </div>
                    </article>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="home--rpo-section candidate">
            <div className='home--about-headarea'>
              <h6 data-aos="fade-down">companies</h6>
              <div className="cand--home-company-title-area">
                <h4 className='rpo--heading' data-aos="fade-up">Work for the <span>best</span><br /> <span>companies</span> in the <span>world</span></h4>
                <a href="/company" className='home--know-more candidate' data-aos="fade-right">
                  <div className='home--know-more-btn candidate'>
                    More Companies
                  </div>
                  <div className='home--know-more-arrow candidate'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
                      <path d="M2.56641 3.44987C6.17752 6.50543 15.5664 10.4499 24.2331 1.7832" stroke="#5C3B2E" stroke-width="2" />
                      <path d="M24.5618 1.45996C21.07 4.6512 15.9586 13.4593 23.4473 23.162" stroke="#5C3B2E" stroke-width="2" />
                      <path d="M1 26L25.1667 1" stroke="#5C3B2E" stroke-width="2" />
                    </svg>
                  </div>
                </a>
              </div>
            </div>
            <div className="company--content-area">
              {allClient.map(client=>{
                const matchingImg = clientImg ? clientImg.find(img => img.id === client.companyId) : null;
                const imgSrc = matchingImg ? `http://localhost:5002/client_profile/${matchingImg.image}` : "../assets/img/talents-images/avatar.jpg";
                const jobOpening = (allJobs.filter(job=>job.companyId === client.companyId)).length
                return(
                  <div className="row company--content-row custom-row-border-top">
                <div className="col-12 col-xl-3 col-lg-3 col-sm-6 col-md-6 company--content-img-area">
                  <img src={imgSrc} data-aos="fade" className='company--content-img' loading='lazy' alt="" />
                  <div>{client.companyName}</div>
                </div>
                <div className="col-12 col-xl-4 col-lg-4 col-sm-6 col-md-6 company--content-jobs-area">
                  <div className='company--content-jobs' data-aos="zoom-out">{jobOpening}<span> Jobs Opening</span></div>
                </div>
                <div className="col-12 col-xl-5 col-lg-5 col-md-12 company--content-desc-area">
                  {/* <p className='company--content-desc' data-aos="fade-left">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p> */}
                  <div className='company--content-apply-btn-area' data-aos="fade-right">
                    <a href={`/company-details/${client.companyId}`} className='company--content-apply-btn'>
                      <div className='company--content-apply-btn-sub'>
                        Apply Now
                      </div>
                      <div className='company--content-apply-arrow'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 15 15" fill="none">
                          <path d="M2.10205 2.10666C4.02798 3.73629 9.03538 5.84 13.6576 1.21777" stroke="#5C3B2E" stroke-width="2" />
                          <path d="M13.8327 1.04564C11.9705 2.74763 9.24438 7.44531 13.2383 12.6201" stroke="#5C3B2E" stroke-width="2" />
                          <path d="M1.2666 14.1331L14.1555 0.799805" stroke="#5C3B2E" stroke-width="2" />
                        </svg>
                      </div>
                    </a>
                  </div>
                </div>
                  </div>
                )
              })}
              

              {/* <div className="row company--content-row custom-row-border-top">
                <div className="col-12 col-xl-3 col-lg-3 col-sm-6 col-md-6 company--content-img-area">
                  <img src="assets/img/companies/company-2.png" data-aos="fade" className='company--content-img' loading='lazy' alt="" />
                </div>
                <div className="col-12 col-xl-4 col-lg-4 col-sm-6 col-md-6 company--content-jobs-area">
                  <div className='company--content-jobs' data-aos="zoom-out">15<span> Jobs Opening</span></div>
                </div>
                <div className="col-12 col-xl-5 col-lg-5 col-md-12 company--content-desc-area">
                  <p className='company--content-desc' data-aos="fade-left">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                  <div className='company--content-apply-btn-area' data-aos="fade-right">
                    <a href="/company-details" className='company--content-apply-btn'>
                      <div className='company--content-apply-btn-sub'>
                        Apply Now
                      </div>
                      <div className='company--content-apply-arrow'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 15 15" fill="none">
                          <path d="M2.10205 2.10666C4.02798 3.73629 9.03538 5.84 13.6576 1.21777" stroke="#5C3B2E" stroke-width="2" />
                          <path d="M13.8327 1.04564C11.9705 2.74763 9.24438 7.44531 13.2383 12.6201" stroke="#5C3B2E" stroke-width="2" />
                          <path d="M1.2666 14.1331L14.1555 0.799805" stroke="#5C3B2E" stroke-width="2" />
                        </svg>
                      </div>
                    </a>
                  </div>
                </div>
              </div>

              <div className="row company--content-row custom-row-border-top">
                <div className="col-12 col-xl-3 col-lg-3 col-sm-6 col-md-6 company--content-img-area">
                  <img src="assets/img/companies/company-3.png" data-aos="fade" className='company--content-img' loading='lazy' alt="" />
                </div>
                <div className="col-12 col-xl-4 col-lg-4 col-sm-6 col-md-6 company--content-jobs-area">
                  <div className='company--content-jobs' data-aos="zoom-out">05<span> Jobs Opening</span></div>
                </div>
                <div className="col-12 col-xl-5 col-lg-5 col-md-12 company--content-desc-area">
                  <p className='company--content-desc' data-aos="fade-left">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                  <div className='company--content-apply-btn-area' data-aos="fade-right">
                    <a href="/company-details" className='company--content-apply-btn'>
                      <div className='company--content-apply-btn-sub'>
                        Apply Now
                      </div>
                      <div className='company--content-apply-arrow'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 15 15" fill="none">
                          <path d="M2.10205 2.10666C4.02798 3.73629 9.03538 5.84 13.6576 1.21777" stroke="#5C3B2E" stroke-width="2" />
                          <path d="M13.8327 1.04564C11.9705 2.74763 9.24438 7.44531 13.2383 12.6201" stroke="#5C3B2E" stroke-width="2" />
                          <path d="M1.2666 14.1331L14.1555 0.799805" stroke="#5C3B2E" stroke-width="2" />
                        </svg>
                      </div>
                    </a>
                  </div>
                </div>
              </div>

              <div className="row company--content-row custom-row-border-top">
                <div className="col-12 col-xl-3 col-lg-3 col-sm-6 col-md-6 company--content-img-area">
                  <img src="assets/img/companies/company-4.png" data-aos="fade" className='company--content-img' loading='lazy' alt="" />
                </div>
                <div className="col-12 col-xl-4 col-lg-4 col-sm-6 col-md-6 company--content-jobs-area">
                  <div className='company--content-jobs' data-aos="zoom-out">15<span> Jobs Opening</span></div>
                </div>
                <div className="col-12 col-xl-5 col-lg-5 col-md-12 company--content-desc-area">
                  <p className='company--content-desc' data-aos="fade-left">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                  <div className='company--content-apply-btn-area' data-aos="fade-right">
                    <a href="/company-details" className='company--content-apply-btn'>
                      <div className='company--content-apply-btn-sub'>
                        Apply Now
                      </div>
                      <div className='company--content-apply-arrow'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 15 15" fill="none">
                          <path d="M2.10205 2.10666C4.02798 3.73629 9.03538 5.84 13.6576 1.21777" stroke="#5C3B2E" stroke-width="2" />
                          <path d="M13.8327 1.04564C11.9705 2.74763 9.24438 7.44531 13.2383 12.6201" stroke="#5C3B2E" stroke-width="2" />
                          <path d="M1.2666 14.1331L14.1555 0.799805" stroke="#5C3B2E" stroke-width="2" />
                        </svg>
                      </div>
                    </a>
                  </div>
                </div>
              </div>

              <div className="row company--content-row custom-row-border-top">
                <div className="col-12 col-xl-3 col-lg-3 col-sm-6 col-md-6 company--content-img-area">
                  <img src="assets/img/companies/company-5.png" data-aos="fade" className='company--content-img' loading='lazy' alt="" />
                </div>
                <div className="col-12 col-xl-4 col-lg-4 col-sm-6 col-md-6 company--content-jobs-area">
                  <div className='company--content-jobs' data-aos="zoom-out">06<span> Jobs Opening</span></div>
                </div>
                <div className="col-12 col-xl-5 col-lg-5 col-md-12 company--content-desc-area">
                  <p className='company--content-desc' data-aos="fade-left">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                  <div className='company--content-apply-btn-area' data-aos="fade-right">
                    <a href="/company-details" className='company--content-apply-btn'>
                      <div className='company--content-apply-btn-sub'>
                        Apply Now
                      </div>
                      <div className='company--content-apply-arrow'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 15 15" fill="none">
                          <path d="M2.10205 2.10666C4.02798 3.73629 9.03538 5.84 13.6576 1.21777" stroke="#5C3B2E" stroke-width="2" />
                          <path d="M13.8327 1.04564C11.9705 2.74763 9.24438 7.44531 13.2383 12.6201" stroke="#5C3B2E" stroke-width="2" />
                          <path d="M1.2666 14.1331L14.1555 0.799805" stroke="#5C3B2E" stroke-width="2" />
                        </svg>
                      </div>
                    </a>
                  </div>
                </div>
              </div>

              <div className="row company--content-row custom-row-border-top">
                <div className="col-12 col-xl-3 col-lg-3 col-sm-6 col-md-6 company--content-img-area">
                  <img src="assets/img/companies/company-6.png" data-aos="fade" className='company--content-img' loading='lazy' alt="" />
                </div>
                <div className="col-12 col-xl-4 col-lg-4 col-sm-6 col-md-6 company--content-jobs-area">
                  <div className='company--content-jobs' data-aos="zoom-out">06<span> Jobs Opening</span></div>
                </div>
                <div className="col-12 col-xl-5 col-lg-5 col-md-12 company--content-desc-area">
                  <p className='company--content-desc' data-aos="fade-left">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                  <div className='company--content-apply-btn-area' data-aos="fade-right">
                    <a href="/company-details" className='company--content-apply-btn'>
                      <div className='company--content-apply-btn-sub'>
                        Apply Now
                      </div>
                      <div className='company--content-apply-arrow'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 15 15" fill="none">
                          <path d="M2.10205 2.10666C4.02798 3.73629 9.03538 5.84 13.6576 1.21777" stroke="#5C3B2E" stroke-width="2" />
                          <path d="M13.8327 1.04564C11.9705 2.74763 9.24438 7.44531 13.2383 12.6201" stroke="#5C3B2E" stroke-width="2" />
                          <path d="M1.2666 14.1331L14.1555 0.799805" stroke="#5C3B2E" stroke-width="2" />
                        </svg>
                      </div>
                    </a>
                  </div>
                </div>
              </div>

              <div className="row company--content-row custom-row-border-top custom-row-border-bottom">
                <div className="col-12 col-xl-3 col-lg-3 col-sm-6 col-md-6 company--content-img-area">
                  <img src="assets/img/companies/company-7.png" data-aos="fade" className='company--content-img' loading='lazy' alt="" />
                </div>
                <div className="col-12 col-xl-4 col-lg-4 col-sm-6 col-md-6 company--content-jobs-area">
                  <div className='company--content-jobs' data-aos="zoom-out">15<span> Jobs Opening</span></div>
                </div>
                <div className="col-12 col-xl-5 col-lg-5 col-md-12 company--content-desc-area">
                  <p className='company--content-desc' data-aos="fade-left">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                  <div className='company--content-apply-btn-area' data-aos="fade-right">
                    <a href="/company-details" className='company--content-apply-btn'>
                      <div className='company--content-apply-btn-sub'>
                        Apply Now
                      </div>
                      <div className='company--content-apply-arrow'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 15 15" fill="none">
                          <path d="M2.10205 2.10666C4.02798 3.73629 9.03538 5.84 13.6576 1.21777" stroke="#5C3B2E" stroke-width="2" />
                          <path d="M13.8327 1.04564C11.9705 2.74763 9.24438 7.44531 13.2383 12.6201" stroke="#5C3B2E" stroke-width="2" />
                          <path d="M1.2666 14.1331L14.1555 0.799805" stroke="#5C3B2E" stroke-width="2" />
                        </svg>
                      </div>
                    </a>
                  </div>
                </div>
              </div> */}
            </div>
          </section>

        </div>
      </div>

      <section className='custom--mobile-padding candidate'>
        <div className='candidate--section candidate'>
          <div className='home--about-toparea'>
            <div className='home--about-headarea'>
              <h6 data-aos="fade-down">Jobs</h6>
              <h4 className='candidate--heading candidate' data-aos="fade-up"><span>Jobs</span> that need <br /> <span>Immediate Joiners</span></h4>
            </div>
            <div className='home--know-more-area'>
              <a href="/job-detail" className='home--know-more candidate' data-aos="fade-right">
                <div className='home--know-more-btn candidate'>
                  More Jobs
                </div>
                <div className='home--know-more-arrow candidate'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
                    <path d="M2.56641 3.44987C6.17752 6.50543 15.5664 10.4499 24.2331 1.7832" stroke="#5C3B2E" stroke-width="2" />
                    <path d="M24.5618 1.45996C21.07 4.6512 15.9586 13.4593 23.4473 23.162" stroke="#5C3B2E" stroke-width="2" />
                    <path d="M1 26L25.1667 1" stroke="#5C3B2E" stroke-width="2" />
                  </svg>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div className="candidate--slider-area" data-aos="fade-left">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={20}
            slidesPerView={3.5}
            loop={false}
            speed={1500}
            navigation={{
              nextEl: '.swiper-button-next2',
              prevEl: '.swiper-button-prev2',
            }}
            grabCursor={true}
            breakpoints={breakpoints}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
            autoplay={{
              delay: 5000,
              waitForTransition: true,
              // stopOnLastSlide: false,
              disableOnInteraction: false,
            }}

          >
            {allJobs.map((job) => {
              const matchingImg = clientImg ? clientImg.find(img => img.id === job.companyId) : null;
              const imgSrc = matchingImg ? `http://localhost:5002/client_profile/${matchingImg.image}` : "../assets/img/talents-images/avatar.jpg";
              return (
                <SwiperSlide key={job.id}>
                  <article className='cand--job-card'>
                    <div className="cand--job-card-role-area">
                      <div className="cand--job-card-role-icon-area">
                        <i class="bi bi-file-earmark-code-fill"></i>
                      </div>
                      <div className="cand--job-card-role">
                        {job.jobRole[0]}
                      </div>
                    </div>
                    <div className="cand--job-card-logo-loc-area">
                      <div className="cand--job-card-logo-area">
                        <img src={imgSrc} className='cand--job-card-logo' alt="" />
                      </div>
                      <div className="cand--job-card-loc-area">
                        <div className="cand--job-card-location">
                          <i className='bx bxs-map'></i>
                          {job.location}
                        </div>
                        <div className="cand--job-card-job-type">
                          {job.jobCategory}
                        </div>
                      </div>
                    </div>
                    <div className="cand--job-card-desc-area">
                      <p className='cand--job-card-desc'>
                        {job.jobDescription}
                      </p>
                      <span className='slide-down-view'>
                        <i class="bi bi-chevron-double-down me-2"></i>
                        Scroll to view more...
                      </span>
                    </div>
                    <a href={`/job-detail/${job.id}`} className="cand--job-card-bottom-area">
                      <span className='cand--job-know-more'>KNOW MORE</span>
                      <span className='cand--job-card-arrow-area'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
                          <path d="M2.56641 3.44987C6.17752 6.50543 15.5664 10.4499 24.2331 1.7832" stroke="#714F36" stroke-width="2" />
                          <path d="M24.5618 1.45996C21.07 4.6512 15.9586 13.4593 23.4473 23.162" stroke="#714F36" stroke-width="2" />
                          <path d="M1 26L25.1667 1" stroke="#714F36" stroke-width="2" />
                        </svg>
                      </span>
                    </a>
                  </article>
                </SwiperSlide>
              )
            })}


            {/* <SwiperSlide>
              <article className='cand--job-card'>
                <div className="cand--job-card-role-area">
                  <div className="cand--job-card-role-icon-area">
                    <i class="bi bi-file-earmark-code-fill"></i>
                  </div>
                  <div className="cand--job-card-role">
                    Frontend Developer
                  </div>
                </div>
                <div className="cand--job-card-logo-loc-area">
                  <img src="assets/img/companies/company-2.png" className='cand--job-card-logo' alt="" />
                  <div className="cand--job-card-loc-area">
                    <div className="cand--job-card-location">
                      <i className='bx bxs-map'></i>
                      Hyderabad
                    </div>
                    <div className="cand--job-card-job-type">
                      Full-time
                    </div>
                  </div>
                </div>
                <div className="cand--job-card-desc-area">
                  <p className='cand--job-card-desc'>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                  </p>
                </div>
                <a href='/job-detail' className="cand--job-card-bottom-area">
                  <span className='cand--job-know-more'>KNOW MORE</span>
                  <span className='cand--job-card-arrow-area'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
                      <path d="M2.56641 3.44987C6.17752 6.50543 15.5664 10.4499 24.2331 1.7832" stroke="#714F36" stroke-width="2" />
                      <path d="M24.5618 1.45996C21.07 4.6512 15.9586 13.4593 23.4473 23.162" stroke="#714F36" stroke-width="2" />
                      <path d="M1 26L25.1667 1" stroke="#714F36" stroke-width="2" />
                    </svg>
                  </span>
                </a>
              </article>
            </SwiperSlide>

            <SwiperSlide>
              <article className='cand--job-card'>
                <div className="cand--job-card-role-area">
                  <div className="cand--job-card-role-icon-area">
                    <i class="bi bi-file-earmark-code-fill"></i>
                  </div>
                  <div className="cand--job-card-role">
                    Frontend Developer
                  </div>
                </div>
                <div className="cand--job-card-logo-loc-area">
                  <img src="assets/img/companies/company-3.png" className='cand--job-card-logo' alt="" />
                  <div className="cand--job-card-loc-area">
                    <div className="cand--job-card-location">
                      <i className='bx bxs-map'></i>
                      Hyderabad
                    </div>
                    <div className="cand--job-card-job-type">
                      Full-time
                    </div>
                  </div>
                </div>
                <div className="cand--job-card-desc-area">
                  <p className='cand--job-card-desc'>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                  </p>
                </div>
                <a href='/job-detail' className="cand--job-card-bottom-area">
                  <span className='cand--job-know-more'>KNOW MORE</span>
                  <span className='cand--job-card-arrow-area'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
                      <path d="M2.56641 3.44987C6.17752 6.50543 15.5664 10.4499 24.2331 1.7832" stroke="#714F36" stroke-width="2" />
                      <path d="M24.5618 1.45996C21.07 4.6512 15.9586 13.4593 23.4473 23.162" stroke="#714F36" stroke-width="2" />
                      <path d="M1 26L25.1667 1" stroke="#714F36" stroke-width="2" />
                    </svg>
                  </span>
                </a>
              </article>
            </SwiperSlide>

            <SwiperSlide>
              <article className='cand--job-card'>
                <div className="cand--job-card-role-area">
                  <div className="cand--job-card-role-icon-area">
                    <i class="bi bi-file-earmark-code-fill"></i>
                  </div>
                  <div className="cand--job-card-role">
                    Frontend Developer
                  </div>
                </div>
                <div className="cand--job-card-logo-loc-area">
                  <img src="assets/img/companies/company-4.png" className='cand--job-card-logo' alt="" />
                  <div className="cand--job-card-loc-area">
                    <div className="cand--job-card-location">
                      <i className='bx bxs-map'></i>
                      Hyderabad
                    </div>
                    <div className="cand--job-card-job-type">
                      Full-time
                    </div>
                  </div>
                </div>
                <div className="cand--job-card-desc-area">
                  <p className='cand--job-card-desc'>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                  </p>
                </div>
                <a href='/job-detail' className="cand--job-card-bottom-area">
                  <span className='cand--job-know-more'>KNOW MORE</span>
                  <span className='cand--job-card-arrow-area'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
                      <path d="M2.56641 3.44987C6.17752 6.50543 15.5664 10.4499 24.2331 1.7832" stroke="#714F36" stroke-width="2" />
                      <path d="M24.5618 1.45996C21.07 4.6512 15.9586 13.4593 23.4473 23.162" stroke="#714F36" stroke-width="2" />
                      <path d="M1 26L25.1667 1" stroke="#714F36" stroke-width="2" />
                    </svg>
                  </span>
                </a>
              </article>
            </SwiperSlide>

            <SwiperSlide>
              <article className='cand--job-card'>
                <div className="cand--job-card-role-area">
                  <div className="cand--job-card-role-icon-area">
                    <i class="bi bi-file-earmark-code-fill"></i>
                  </div>
                  <div className="cand--job-card-role">
                    Frontend Developer
                  </div>
                </div>
                <div className="cand--job-card-logo-loc-area">
                  <img src="assets/img/companies/company-5.png" className='cand--job-card-logo' alt="" />
                  <div className="cand--job-card-loc-area">
                    <div className="cand--job-card-location">
                      <i className='bx bxs-map'></i>
                      Hyderabad
                    </div>
                    <div className="cand--job-card-job-type">
                      Full-time
                    </div>
                  </div>
                </div>
                <div className="cand--job-card-desc-area">
                  <p className='cand--job-card-desc'>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                  </p>
                </div>
                <a href='/job-detail' className="cand--job-card-bottom-area">
                  <span className='cand--job-know-more'>KNOW MORE</span>
                  <span className='cand--job-card-arrow-area'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
                      <path d="M2.56641 3.44987C6.17752 6.50543 15.5664 10.4499 24.2331 1.7832" stroke="#714F36" stroke-width="2" />
                      <path d="M24.5618 1.45996C21.07 4.6512 15.9586 13.4593 23.4473 23.162" stroke="#714F36" stroke-width="2" />
                      <path d="M1 26L25.1667 1" stroke="#714F36" stroke-width="2" />
                    </svg>
                  </span>
                </a>
              </article>
            </SwiperSlide>

            <SwiperSlide>
              <article className='cand--job-card'>
                <div className="cand--job-card-role-area">
                  <div className="cand--job-card-role-icon-area">
                    <i class="bi bi-file-earmark-code-fill"></i>
                  </div>
                  <div className="cand--job-card-role">
                    Frontend Developer
                  </div>
                </div>
                <div className="cand--job-card-logo-loc-area">
                  <img src="assets/img/companies/company-6.png" className='cand--job-card-logo' alt="" />
                  <div className="cand--job-card-loc-area">
                    <div className="cand--job-card-location">
                      <i className='bx bxs-map'></i>
                      Hyderabad
                    </div>
                    <div className="cand--job-card-job-type">
                      Full-time
                    </div>
                  </div>
                </div>
                <div className="cand--job-card-desc-area">
                  <p className='cand--job-card-desc'>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                  </p>
                </div>
                <a href='/job-detail' className="cand--job-card-bottom-area">
                  <span className='cand--job-know-more'>KNOW MORE</span>
                  <span className='cand--job-card-arrow-area'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
                      <path d="M2.56641 3.44987C6.17752 6.50543 15.5664 10.4499 24.2331 1.7832" stroke="#714F36" stroke-width="2" />
                      <path d="M24.5618 1.45996C21.07 4.6512 15.9586 13.4593 23.4473 23.162" stroke="#714F36" stroke-width="2" />
                      <path d="M1 26L25.1667 1" stroke="#714F36" stroke-width="2" />
                    </svg>
                  </span>
                </a>
              </article>
            </SwiperSlide> */}

          </Swiper>

        </div>

        <div className="home--slider-btn-area" data-aos="fade-up">
          <div className='tal--pro-slider-btn-sub'>
            <button className="tal--pro-slider-btn swiper-button-prev2">
              <svg className='arrow-left' xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 27 27" fill="none">
                <path d="M2.56641 3.44987C6.17752 6.50543 15.5664 10.4499 24.2331 1.7832" stroke="#5C3B2E" stroke-width="2" />
                <path d="M24.5618 1.45996C21.07 4.6512 15.9586 13.4593 23.4473 23.162" stroke="#5C3B2E" stroke-width="2" />
                <path d="M1 26L25.1667 1" stroke="#5C3B2E" stroke-width="2" />
              </svg>
            </button>
            <button className="tal--pro-slider-btn swiper-button-next2">
              <svg className='arrow-right' xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 27 27" fill="none">
                <path d="M2.56641 3.44987C6.17752 6.50543 15.5664 10.4499 24.2331 1.7832" stroke="#5C3B2E" stroke-width="2" />
                <path d="M24.5618 1.45996C21.07 4.6512 15.9586 13.4593 23.4473 23.162" stroke="#5C3B2E" stroke-width="2" />
                <path d="M1 26L25.1667 1" stroke="#5C3B2E" stroke-width="2" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      <div className='container-fluid home--section candidate'>
        <div className='container-fluid container-section'>
          <section className='home--testimonial-section candidate'>
            <div className='home--about-toparea'>
              <div className='home--about-headarea'>
                <h6 data-aos="fade-down">Testimonials</h6>
                <h4 className='candidate--heading' data-aos="fade-up">WHAT THEY SAY ABOUT US</h4>
              </div>
              <div className='home--know-more-area'>
                <a href="/candidate-testimonial" className='home--know-more candidate' data-aos="fade-right">
                  <div className='home--know-more-btn candidate'>
                    Know more
                  </div>
                  <div className='home--know-more-arrow candidate'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
                      <path d="M2.56641 3.44987C6.17752 6.50543 15.5664 10.4499 24.2331 1.7832" stroke="#5C3B2E" stroke-width="2" />
                      <path d="M24.5618 1.45996C21.07 4.6512 15.9586 13.4593 23.4473 23.162" stroke="#5C3B2E" stroke-width="2" />
                      <path d="M1 26L25.1667 1" stroke="#5C3B2E" stroke-width="2" />
                    </svg>
                  </div>
                </a>
              </div>
            </div>
            <div className="testimonial--card-area">
              <div className="row">
                <div className="col-12 col-xl-12 col-xxl-7 col-lg-12 col-md-12">
                  <article className="testimonial--card-lg candidate" data-aos="zoom-out-right">
                    <div className="testimonial--profile-area">
                      <img src="assets/img/home-images/testi-profile.jpeg" className='testimonial--profile-img' alt="" />
                      <div className="testimonial--profile candidate">
                        <h5>KAVITHA KATKAM</h5>
                        <p>Senior Manager Talent Acquisition, IVY Software Development Services Pvt. Ltd.</p>
                      </div>
                    </div>
                    <div className="testimonial--content-area candidate">
                      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                    </div>
                    <a href='/candidate-testimonial-detail' className='testimonial--arrow-area candidate'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="60" height="65" viewBox="0 0 55 56" fill="none">
                        <path d="M5.25812 7.09628C12.7692 13.4518 32.2979 21.6562 50.3244 3.62964" stroke="white" stroke-width="4" />
                        <path d="M51.0082 2.95734C43.7453 9.59507 33.1137 27.9159 48.69 48.0973" stroke="white" stroke-width="4" />
                        <path d="M2 53.9998L52.2663 2.00024" stroke="white" stroke-width="4" />
                      </svg>
                    </a>
                  </article>
                </div>
                <div className="col-12 col-xl-12 col-xxl-5 col-lg-6 col-md-12 custom-flex-row">
                  <article className='testimonial--card-sm test--card-bg1 mb-4' data-aos="zoom-out-left">
                    <div className="testimonial-sm--profile-area">
                      <img src="assets/img/home-images/testi-profile.jpeg" className='testimonial--sm-profile-img' alt="" />
                      <div className="testimonial-sm--profile">
                        <h5>KAVITHA KATKAM</h5>
                        <p>Senior Manager Talent Acquisition, IVY Software Development Services Pvt. Ltd.</p>
                      </div>
                      <button className='testi-sm-play-buttonarea custom-padding candidate'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="39" viewBox="0 0 25 39" fill="none">
                          <path d="M24.0399 19.9498L0.00167296 38.7892L0.126028 0.952834L24.0399 19.9498Z" fill="white" />
                        </svg>
                      </button>
                    </div>
                  </article>
                  <article className='testimonial--card-sm test--card-bg2 mt-4' data-aos="zoom-out-left">
                    <div className="testimonial-sm--profile-area">
                      <img src="assets/img/home-images/testi-profile.jpeg" className='testimonial--sm-profile-img' alt="" />
                      <div className="testimonial-sm--profile">
                        <h5>KAVITHA KATKAM</h5>
                        <p>Senior Manager Talent Acquisition, IVY Software Development Services Pvt. Ltd.</p>
                      </div>
                      <button className='testi-sm-play-buttonarea candidate'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="45" height="45">
                          <path fill="white" d="M2 16.0001H5.88889L11.1834 20.3319C11.2727 20.405 11.3846 20.4449 11.5 20.4449C11.7761 20.4449 12 20.2211 12 19.9449V4.05519C12 3.93977 11.9601 3.8279 11.887 3.73857C11.7121 3.52485 11.3971 3.49335 11.1834 3.66821L5.88889 8.00007H2C1.44772 8.00007 1 8.44778 1 9.00007V15.0001C1 15.5524 1.44772 16.0001 2 16.0001ZM23 12C23 15.292 21.5539 18.2463 19.2622 20.2622L17.8445 18.8444C19.7758 17.1937 21 14.7398 21 12C21 9.26016 19.7758 6.80629 17.8445 5.15557L19.2622 3.73779C21.5539 5.75368 23 8.70795 23 12ZM18 12C18 10.0883 17.106 8.38548 15.7133 7.28673L14.2842 8.71584C15.3213 9.43855 16 10.64 16 12C16 13.36 15.3213 14.5614 14.2842 15.2841L15.7133 16.7132C17.106 15.6145 18 13.9116 18 12Z"></path>
                        </svg>
                      </button>
                    </div>
                  </article>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div >

      {eventDetail.length > 0 &&
        <section className='custom--mobile-padding candidate cand--home-event-section'>
          <div className='candidate--section candidate'>
            <div className='home--about-toparea'>
              <div className='home--about-headarea'>
                <h6 data-aos="fade-down">Events</h6>
                <h4 className='candidate--heading candidate' data-aos="fade-up">Webinars, Job Fairs, <br /> <span>Walk-in Interviews,</span> etc.</h4>
              </div>
              <div className='home--know-more-area'>
                <a href="/events" className='home--know-more candidate' data-aos="fade-right">
                  <div className='home--know-more-btn candidate'>
                    Know more
                  </div>
                  <div className='home--know-more-arrow candidate'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
                      <path d="M2.56641 3.44987C6.17752 6.50543 15.5664 10.4499 24.2331 1.7832" stroke="#5C3B2E" stroke-width="2" />
                      <path d="M24.5618 1.45996C21.07 4.6512 15.9586 13.4593 23.4473 23.162" stroke="#5C3B2E" stroke-width="2" />
                      <path d="M1 26L25.1667 1" stroke="#5C3B2E" stroke-width="2" />
                    </svg>
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div className="candidate--slider-area" data-aos="fade-left">
            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={20}
              slidesPerView={3.5}
              loop={false}
              speed={1500}
              navigation={{
                nextEl: '.swiper-button-next5',
                prevEl: '.swiper-button-prev5',
              }}
              grabCursor={true}
              breakpoints={breakpoints}
              onSlideChange={() => console.log('slide change')}
              onSwiper={(swiper) => console.log(swiper)}
              autoplay={{
                delay: 5000,
                waitForTransition: true,
                // stopOnLastSlide: false,
                disableOnInteraction: false,
              }}

            >
              {eventDetail.map(eve => {
                const matchingImg = eventImg ? eventImg.find(img => img.id === eve.id) : null;
                const imgSrc = matchingImg ? `http://localhost:5002/images/${matchingImg.image}` : "assets/img/events/event-img.jpg";

                return (
                  <SwiperSlide key={eve.id}>
                    <article className='cand--events-card candidate'>
                      <div className="cand--events-card-img-area">
                        <img src={imgSrc} className='cand--events-card-img' alt="" />
                      </div>
                      <div className="cand--events-card-title-area">
                        <h6 className='cand--events-card-title'>
                          {eve.title}
                        </h6>
                      </div>
                      <p className='cand--events-card-date'>
                        {eve.date}
                      </p>
                      <a href={`/event-details/${eve.id}`} className="cand--events-card-bottom-area">
                        <span className='cand--event-sys'>SAVE YOUR SPOT</span>
                        <span className='cand--events-card-arrow-area'>
                          <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
                            <path d="M2.56641 3.44987C6.17752 6.50543 15.5664 10.4499 24.2331 1.7832" stroke="#714F36" strokeWidth="2" />
                            <path d="M24.5618 1.45996C21.07 4.6512 15.9586 13.4593 23.4473 23.162" stroke="#714F36" strokeWidth="2" />
                            <path d="M1 26L25.1667 1" stroke="#714F36" strokeWidth="2" />
                          </svg>
                        </span>
                      </a>
                    </article>
                  </SwiperSlide>
                );
              })}

              {/* <SwiperSlide>
                <article className='cand--events-card candidate'>
                  <div className="cand--events-card-img-area">
                    <img src="assets/img/events/event-img.jpg" className='cand--events-card-img' alt="" />
                  </div>
                  <div className="cand--events-card-title-area">
                    <h6 className='cand--events-card-title'>
                      Transition your career with AI Advancement
                    </h6>
                  </div>
                  <p className='cand--events-card-date'>20th September 2023</p>
                  <a href='/event-details' className="cand--events-card-bottom-area">
                    <span className='cand--event-sys'>SAVE YOUR SPOT</span>
                    <span className='cand--events-card-arrow-area'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
                        <path d="M2.56641 3.44987C6.17752 6.50543 15.5664 10.4499 24.2331 1.7832" stroke="#714F36" stroke-width="2" />
                        <path d="M24.5618 1.45996C21.07 4.6512 15.9586 13.4593 23.4473 23.162" stroke="#714F36" stroke-width="2" />
                        <path d="M1 26L25.1667 1" stroke="#714F36" stroke-width="2" />
                      </svg>
                    </span>
                  </a>
                </article>
              </SwiperSlide>

              <SwiperSlide>
                <article className='cand--events-card candidate'>
                  <div className="cand--events-card-img-area">
                    <img src="assets/img/events/event-img.jpg" className='cand--events-card-img' alt="" />
                  </div>
                  <div className="cand--events-card-title-area">
                    <h6 className='cand--events-card-title'>
                      Transition your career with AI Advancement
                    </h6>
                  </div>
                  <p className='cand--events-card-date'>20th September 2023</p>
                  <a href='/event-details' className="cand--events-card-bottom-area">
                    <span className='cand--event-sys'>SAVE YOUR SPOT</span>
                    <span className='cand--events-card-arrow-area'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
                        <path d="M2.56641 3.44987C6.17752 6.50543 15.5664 10.4499 24.2331 1.7832" stroke="#714F36" stroke-width="2" />
                        <path d="M24.5618 1.45996C21.07 4.6512 15.9586 13.4593 23.4473 23.162" stroke="#714F36" stroke-width="2" />
                        <path d="M1 26L25.1667 1" stroke="#714F36" stroke-width="2" />
                      </svg>
                    </span>
                  </a>
                </article>
              </SwiperSlide>

              <SwiperSlide>
                <article className='cand--events-card candidate'>
                  <div className="cand--events-card-img-area">
                    <img src="assets/img/events/event-img.jpg" className='cand--events-card-img' alt="" />
                  </div>
                  <div className="cand--events-card-title-area">
                    <h6 className='cand--events-card-title'>
                      Transition your career with AI Advancement
                    </h6>
                  </div>
                  <p className='cand--events-card-date'>20th September 2023</p>
                  <a href='/event-details' className="cand--events-card-bottom-area">
                    <span className='cand--event-sys'>SAVE YOUR SPOT</span>
                    <span className='cand--events-card-arrow-area'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
                        <path d="M2.56641 3.44987C6.17752 6.50543 15.5664 10.4499 24.2331 1.7832" stroke="#714F36" stroke-width="2" />
                        <path d="M24.5618 1.45996C21.07 4.6512 15.9586 13.4593 23.4473 23.162" stroke="#714F36" stroke-width="2" />
                        <path d="M1 26L25.1667 1" stroke="#714F36" stroke-width="2" />
                      </svg>
                    </span>
                  </a>
                </article>
              </SwiperSlide>

              <SwiperSlide>
                <article className='cand--events-card candidate'>
                  <div className="cand--events-card-img-area">
                    <img src="assets/img/events/event-img.jpg" className='cand--events-card-img' alt="" />
                  </div>
                  <div className="cand--events-card-title-area">
                    <h6 className='cand--events-card-title'>
                      Transition your career with AI Advancement
                    </h6>
                  </div>
                  <p className='cand--events-card-date'>20th September 2023</p>
                  <a href='/event-details' className="cand--events-card-bottom-area">
                    <span className='cand--event-sys'>SAVE YOUR SPOT</span>
                    <span className='cand--events-card-arrow-area'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
                        <path d="M2.56641 3.44987C6.17752 6.50543 15.5664 10.4499 24.2331 1.7832" stroke="#714F36" stroke-width="2" />
                        <path d="M24.5618 1.45996C21.07 4.6512 15.9586 13.4593 23.4473 23.162" stroke="#714F36" stroke-width="2" />
                        <path d="M1 26L25.1667 1" stroke="#714F36" stroke-width="2" />
                      </svg>
                    </span>
                  </a>
                </article>
              </SwiperSlide>

              <SwiperSlide>
                <article className='cand--events-card candidate'>
                  <div className="cand--events-card-img-area">
                    <img src="assets/img/events/event-img.jpg" className='cand--events-card-img' alt="" />
                  </div>
                  <div className="cand--events-card-title-area">
                    <h6 className='cand--events-card-title'>
                      Transition your career with AI Advancement
                    </h6>
                  </div>
                  <p className='cand--events-card-date'>20th September 2023</p>
                  <a href='/event-details' className="cand--events-card-bottom-area">
                    <span className='cand--event-sys'>SAVE YOUR SPOT</span>
                    <span className='cand--events-card-arrow-area'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
                        <path d="M2.56641 3.44987C6.17752 6.50543 15.5664 10.4499 24.2331 1.7832" stroke="#714F36" stroke-width="2" />
                        <path d="M24.5618 1.45996C21.07 4.6512 15.9586 13.4593 23.4473 23.162" stroke="#714F36" stroke-width="2" />
                        <path d="M1 26L25.1667 1" stroke="#714F36" stroke-width="2" />
                      </svg>
                    </span>
                  </a>
                </article>
              </SwiperSlide>

              <SwiperSlide>
                <article className='cand--events-card candidate'>
                  <div className="cand--events-card-img-area">
                    <img src="assets/img/events/event-img.jpg" className='cand--events-card-img' alt="" />
                  </div>
                  <div className="cand--events-card-title-area">
                    <h6 className='cand--events-card-title'>
                      Transition your career with AI Advancement
                    </h6>
                  </div>
                  <p className='cand--events-card-date'>20th September 2023</p>
                  <a href='/event-details' className="cand--events-card-bottom-area">
                    <span className='cand--event-sys'>SAVE YOUR SPOT</span>
                    <span className='cand--events-card-arrow-area'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
                        <path d="M2.56641 3.44987C6.17752 6.50543 15.5664 10.4499 24.2331 1.7832" stroke="#714F36" stroke-width="2" />
                        <path d="M24.5618 1.45996C21.07 4.6512 15.9586 13.4593 23.4473 23.162" stroke="#714F36" stroke-width="2" />
                        <path d="M1 26L25.1667 1" stroke="#714F36" stroke-width="2" />
                      </svg>
                    </span>
                  </a>
                </article>
              </SwiperSlide> */}

            </Swiper>

          </div>

          <div className="home--slider-btn-area" data-aos="fade-up">
            <div className='tal--pro-slider-btn-sub'>
              <button className="tal--pro-slider-btn swiper-button-prev5">
                <svg className='arrow-left' xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 27 27" fill="none">
                  <path d="M2.56641 3.44987C6.17752 6.50543 15.5664 10.4499 24.2331 1.7832" stroke="#5C3B2E" stroke-width="2" />
                  <path d="M24.5618 1.45996C21.07 4.6512 15.9586 13.4593 23.4473 23.162" stroke="#5C3B2E" stroke-width="2" />
                  <path d="M1 26L25.1667 1" stroke="#5C3B2E" stroke-width="2" />
                </svg>
              </button>
              <button className="tal--pro-slider-btn swiper-button-next5">
                <svg className='arrow-right' xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 27 27" fill="none">
                  <path d="M2.56641 3.44987C6.17752 6.50543 15.5664 10.4499 24.2331 1.7832" stroke="#5C3B2E" stroke-width="2" />
                  <path d="M24.5618 1.45996C21.07 4.6512 15.9586 13.4593 23.4473 23.162" stroke="#5C3B2E" stroke-width="2" />
                  <path d="M1 26L25.1667 1" stroke="#5C3B2E" stroke-width="2" />
                </svg>
              </button>
            </div>
          </div>
        </section>
      }

      <div className='container-fluid home--section candidate'>
        <div className='container-fluid container-section'>
          <section className='register--section candidate'>
            <a href="/candiate-register">
              <div className="register--card candidate">
                <h2 className='register--text candidate' data-aos="fade-down">Register Now</h2>
                <div className="register-arrow-area candidate">
                  <svg xmlns="http://www.w3.org/2000/svg" width="72" height="74" viewBox="0 0 72 74" fill="none">
                    <path d="M6.34766 9.0872C16.3723 17.5696 42.4363 28.5196 66.4954 4.46045" stroke="#5C3B2E" stroke-width="5" />
                    <path d="M67.4092 3.56478C57.7158 12.4238 43.5263 36.8757 64.3152 63.8109" stroke="#5C3B2E" stroke-width="5" />
                    <path d="M2 71.6889L69.0879 2.2876" stroke="#5C3B2E" stroke-width="5" />
                  </svg>
                </div>
                <div className='register--blob'></div>
              </div>
            </a>
          </section>
        </div>
      </div>

      <CandidateFooter />
    </div>
  )
}

export default HomeCandidate
import React from 'react';
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

const HomeCandidate = () => {
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

    // // Create the Intersection Observer instance
    // const observer = new IntersectionObserver(handleIntersection, {
    //   root: null,
    //   rootMargin: '0px',
    //   threshold: 0.5 // Adjust the threshold as needed (0.5 means 50% of the section is visible)
    // });

    // // Observe the section
    // const section = document.querySelector('.home--milestone-card');
    // observer.observe(section);
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
      slidesPerView: 3.5,
    },
  };
  return (
    <div>
      <LayoutNew />
      <div className='container-fluid home--section'>
        <div className='container-fluid container-section'>
          <div className="home--bg candidate">
            <div className="row col-rev-custom">
              <div className="col-12 col-lg-6 col-xl-7 col-md-12 home--left-cover">
                <div className="home--head candidate">
                  <h4 data-aos="fade-left" data-aos-delay="200">
                    Great opportunities knock only once. We make sure you don’t miss them.
                  </h4>
                  <h3 data-aos="fade-left" data-aos-delay="200">Choose from over 2400+ Jobs.</h3>
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
              <div className="col-12 col-lg-6 col-xl-5 col-md-12 home--right-cover custom-flex">
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
                    <div className="col-xl-8 col-lg-12 col-md-12 offset-xl-4">
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

          {/* <section className="home--about-section">
            <div className='home--about-toparea'>
              <div className='home--about-headarea'>
                <h6 data-aos="fade-down">About Us</h6>
                <h4 className='about--heading' data-aos="fade-up"><span>Skillety</span> simply means <span>“Skill at Will”.</span></h4>
              </div>
              <div className='home--know-more-area'>
                <a href="/about-us" className='home--know-more' data-aos="fade-right">
                  <div className='home--know-more-btn'>Know more
                  </div>
                  <div className='home--know-more-arrow'>
                    <img src="assets/img/home-images/arrow-img.png" className='knowmore--arrow' alt="" />
                  </div>
                </a>
              </div>
            </div>
            <div className="home--about-para" data-aos="fade-left" data-aos-delay="100">
              <p>We are a gig-economy based crowdsourcing platform for Freelancers. We have an exclusive vault of Immediate Joiners - guys who can pick up an Offer and Join within 7 days or less. We have curated a group of Technical Interview experts for Clients who face shortage of internal Interview Panels. We help you to move away from the old and soiled hierarchical business structure, and evolve into a 21st Century on-demand, open talent, cross-functional team; with a skilled and passionate workforce who are more engaged, effective & productive. Welcome to Skillety – Your on-demand HR solutions partner.</p>
            </div>
          </section>

          <section className='home--service-section'>
            <div className="home--services-slider-area">
              <div className='home--about-headarea'>
                <h6 data-aos="fade-down">Services</h6>
                <h3 className='service--heading' data-aos="fade-up">OUR SERVICES</h3>
              </div>
              <div className="home--service-para" data-aos="fade-left" data-aos-delay="100">
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
              </div>
              <div className="row">
                <div className="col-12 col-xl-7 col-lg-8">
                  <article className='home--service-card' data-aos="zoom-out-right">
                    <div className="service--arrow-area">
                      <img src="assets/img/home-images/arrow-L.png" className='service--arrow-img' alt="" />
                    </div>
                    <div className="service--content-area">
                      <div className="service--card-headarea">
                        <h3>Sourcing</h3>
                        <img src="assets/img/home-images/sourcing-icon.png" className='sourcing-icon' alt="" />
                      </div>
                      <p className='service--content'>
                        Search for Immediate Joiner CVs from 3 buckets - 7 days, 15 days & 30 days joiners. Also Post Jobs and publish it on 172 partner job-boards & social media platforms, in just one click.
                      </p>
                      <div className='service-know-morearea'>
                        <a href="/services" className='service--know-more'>
                          <div className='service--know-more-btn'>Know more
                          </div>
                          <div className='service--know-more-arrow'>
                            <img src="assets/img/home-images/arrow-dark.png" className='knowmore--arrow' alt="" />
                          </div>
                        </a>
                      </div>
                    </div>
                  </article>
                </div>
              </div>
              <div className="row mt-5">
                <div className="col-12 col-xl-7 col-lg-8 offset-xl-5 offset-lg-4">
                  <article className='home--service-card' data-aos="zoom-out-left">
                    <div className="service--arrow-area">
                      <img src="assets/img/home-images/arrow-L.png" className='service--arrow-img' alt="" />
                    </div>
                    <div className="service--content-area">
                      <div className="service--card-headarea">
                        <h3>SCREENING</h3>
                        <img src="assets/img/home-images/screening.png" className='screening-icon' alt="" />
                      </div>
                      <p className='service--content'>
                        Check the candidates' interest and availability by initiating a Telephonic Screening of all the CVs, simultaneously. Our powerful AI tool can call upto 5000 candidates in 10 minutes.
                      </p>
                      <div className='service-know-morearea'>
                        <a href="/services" className='service--know-more'>
                          <div className='service--know-more-btn'>Know more
                          </div>
                          <div className='service--know-more-arrow'>
                            <img src="assets/img/home-images/arrow-dark.png" className='knowmore--arrow' alt="" />
                          </div>
                        </a>
                      </div>
                    </div>
                  </article>
                </div>
              </div>
              <div className="row mt-5">
                <div className="col-12 col-xl-7 col-lg-8">
                  <article className='home--service-card' data-aos="zoom-out-right">
                    <div className="service--arrow-area">
                      <img src="assets/img/home-images/arrow-L.png" className='service--arrow-img' alt="" />
                    </div>
                    <div className="service--content-area">
                      <div className="service--card-headarea">
                        <h3>ASSESSMENT</h3>
                        <img src="assets/img/home-images/assesment.png" className='sourcing-icon' alt="" />
                      </div>
                      <p className='service--content'>
                        Send Technical Assessment test links to multiple candidates, simultaneously. The Test Report comes with a comprehensive analysis of their aptitude, knowledge and proficiency.
                      </p>
                      <div className='service-know-morearea'>
                        <a href="/services" className='service--know-more'>
                          <div className='service--know-more-btn'>Know more
                          </div>
                          <div className='service--know-more-arrow'>
                            <img src="assets/img/home-images/arrow-dark.png" className='knowmore--arrow' alt="" />
                          </div>
                        </a>
                      </div>
                    </div>
                  </article>
                </div>
              </div>
              <div className="row mt-5">
                <div className="col-12 col-xl-7 col-lg-8 offset-xl-5 offset-lg-4">
                  <article className='home--service-card' data-aos="zoom-out-left">
                    <div className="service--arrow-area">
                      <img src="assets/img/home-images/arrow-L.png" className='service--arrow-img' alt="" />
                    </div>
                    <div className="service--content-area">
                      <div className="service--card-headarea">
                        <h3>INTERVIEW</h3>
                        <img src="assets/img/home-images/interview.png" className='interview-icon' alt="" />
                      </div>
                      <p className='service--content'>
                        Do a thorough L1 Interview with a coding round conducted by panels from FAANG companies. The Feedback comes as a comprehensive report along with Playback.
                      </p>
                      <div className='service-know-morearea'>
                        <a href="/services" className='service--know-more'>
                          <div className='service--know-more-btn'>Know more
                          </div>
                          <div className='service--know-more-arrow'>
                            <img src="assets/img/home-images/arrow-dark.png" className='knowmore--arrow' alt="" />
                          </div>
                        </a>
                      </div>
                    </div>
                  </article>
                </div>
              </div>
              <div className="row mt-5">
                <div className="col-12 col-xl-7 col-lg-8">
                  <article className='home--service-card' data-aos="zoom-out-right">
                    <div className="service--arrow-area">
                      <img src="assets/img/home-images/arrow-L.png" className='service--arrow-img' alt="" />
                    </div>
                    <div className="service--content-area">
                      <div className="service--card-headarea">
                        <h3>VERIFICATION</h3>
                        <img src="assets/img/home-images/verification.png" className='verification-icon' alt="" />
                      </div>
                      <p className='service--content'>
                        Before releasing the Offer, do a quick sanity check if it's a fake profile or not, with our BGV-Lite services. Also do a 360-degree Background Verification after the candidate joins.
                      </p>
                      <div className='service-know-morearea'>
                        <a href="/services" className='service--know-more'>
                          <div className='service--know-more-btn'>Know more
                          </div>
                          <div className='service--know-more-arrow'>
                            <img src="assets/img/home-images/arrow-dark.png" className='knowmore--arrow' alt="" />
                          </div>
                        </a>
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            </div>
          </section>

          <section className="home--rpo-section">
            <div className='home--about-headarea'>
              <h6 data-aos="fade-down">RPO types</h6>
              <h4 className='rpo--heading' data-aos="fade-up"><span>We enhance</span> client <span>recruitment</span> through <br /> comprehensive <span>end-to-end outsourcing</span></h4>
            </div>
            <div className="rpo--para-area" data-aos="fade-left">
              <p>We improve the efficiency and effectiveness of the client’s recruitment process by providing an end-to-end outsourcing solution for the recruitment process.</p>
            </div>
            <div className="rpo--content-card">
              <div className="row align-items-center">
                <div className="col-12 col-xl-4 col-lg-3">
                  <div className='rpo--card-heading'>
                    <h4 data-aos="fade-right">Enterprise RPO</h4>
                  </div>
                </div>
                <div className="col-12 col-xl-5 col-lg-5">
                  <div className='rpo--card-desc'>
                    <p data-aos="fade">From requisition to onboarding, Skillety offers recruitment expertise and scalability while being completely aligned with our clients’ culture. Enterprise RPO is a comprehensive, customizable, and scalable recruitment solution, rooted on an exclusivity contract from our clients.</p>
                  </div>
                </div>
                <div className="col-12 col-xl-3 col-lg-4">
                  <div className='rpo--card-learnmore'>
                    <a href="/rpo" className='rpo--know-more' data-aos="fade-left">
                      <div className='rpo--know-more-btn'>
                        Know more
                      </div>
                      <div className='rpo--know-more-arrow'>
                        <img src="assets/img/home-images/arrow-img.png" className='knowmore--arrow' alt="" />
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="rpo--content-card">
              <div className="row align-items-center">
                <div className="col-12 col-xl-4 col-lg-3">
                  <div className='rpo--card-heading'>
                    <h4 data-aos="fade-right">Project RPO</h4>
                  </div>
                </div>
                <div className="col-12 col-xl-5 col-lg-5">
                  <div className='rpo--card-desc'>
                    <p data-aos="fade">Project RPO is the way to go for companies that have a specific talent acquisition project like recruiting a new team for a new product line, or a new project, or a new facility. Our clients engage our Project RPO services for a talent acquisition need with defined goals within a specific scope and timeline.</p>
                  </div>
                </div>
                <div className="col-12 col-xl-3 col-lg-4">
                  <div className='rpo--card-learnmore'>
                    <a href="/rpo" className='rpo--know-more' data-aos="fade-left">
                      <div className='rpo--know-more-btn'>
                        Know more
                      </div>
                      <div className='rpo--know-more-arrow'>
                        <img src="assets/img/home-images/arrow-img.png" className='knowmore--arrow' alt="" />
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="rpo--content-card">
              <div className="row align-items-center">
                <div className="col-12 col-xl-4 col-lg-3">
                  <div className='rpo--card-heading'>
                    <h4 data-aos="fade-right">Contingent RPO</h4>
                  </div>
                </div>
                <div className="col-12 col-xl-5 col-lg-5">
                  <div className='rpo--card-desc'>
                    <p data-aos="fade">Contingent RPO works as an extension of the talent acquisition department and supplies contract labour using recruiters dedicated to our clients. Our recruiters build a unique talent pipeline of contract labour for our clients based on their specific hiring goals.</p>
                  </div>
                </div>
                <div className="col-12 col-xl-3 col-lg-4">
                  <div className='rpo--card-learnmore'>
                    <a href="/rpo" className='rpo--know-more' data-aos="fade-left">
                      <div className='rpo--know-more-btn'>
                        Know more
                      </div>
                      <div className='rpo--know-more-arrow'>
                        <img src="assets/img/home-images/arrow-img.png" className='knowmore--arrow' alt="" />
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="rpo--content-card">
              <div className="row align-items-center">
                <div className="col-12 col-xl-4 col-lg-3">
                  <div className='rpo--card-heading'>
                    <h4 data-aos="fade-right">RPO-Lite</h4>
                  </div>
                </div>
                <div className="col-12 col-xl-5 col-lg-5">
                  <div className='rpo--card-desc'>
                    <p data-aos="fade">Best for a test-run before you decide your RPO partner. We take up hiring requirements from one or few projects on exclusivity, and close them in record time, first. The results will determine whether you want to upgrade to an Enterprise RPO (or not), based on solid proof.</p>
                  </div>
                </div>
                <div className="col-12 col-xl-3 col-lg-4">
                  <div className='rpo--card-learnmore'>
                    <a href="/rpo" className='rpo--know-more' data-aos="fade-left">
                      <div className='rpo--know-more-btn'>
                        Know more
                      </div>
                      <div className='rpo--know-more-arrow'>
                        <img src="assets/img/home-images/arrow-img.png" className='knowmore--arrow' alt="" />
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className='milestone--section'>
            <div className="home--milestone-head-area">
              <div className='home--milestone-headarea'>
                <h6 data-aos="fade-down">Milestone numbers</h6>
                <h3 className='milestone--heading' data-aos="fade-up">Achieving <span>Milestones</span></h3>
              </div>
              <div className="home--milestone-cards-area">
                <div className="row">
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
                        <h6 className='home--milestone-title'>Total Registered Users</h6>
                        <h2 className='home-milestone-number' data-target="130">0</h2>
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
                        <h6 className='home--milestone-title'>New Registrations per day</h6>
                        <h2 className='home-milestone-number' data-target="200">0</h2>
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
                        <h6 className='home--milestone-title'>Total Clients</h6>
                        <h2 className='home-milestone-number' data-target="202">0</h2>
                      </div>
                    </article>
                  </div>
                  <div className="col-12 col-xl-4 offset-xl-4 col-lg-6 col-md-6 ab--milestone-container">
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
                        <h6 className='home--milestone-title'>Total Candidates placed</h6>
                        <h2 className='home-milestone-number' data-target="147">0</h2>
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
                        <h6 className='home--milestone-title'>Offer-to-Joining Conversion rate</h6>
                        <h2 className='home-milestone-number' data-target="347">0</h2>
                      </div>
                    </article>
                  </div>
                  <div className="col-12 col-xl-4 offset-xl-8 col-lg-6 col-md-6 ab--milestone-container">
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
                        <h6 className='home--milestone-title'>Placements per Year</h6>
                        <h2 className='home-milestone-number' data-target="540">0</h2>
                      </div>
                    </article>
                  </div>
                </div>
              </div>
            </div>
          </section> */}
        </div>
      </div>

      {/* <section className='custom--mobile-padding'>
        <div className='candidate--section'>
          <div className='home--about-toparea'>
            <div className='home--about-headarea'>
              <h6 data-aos="fade-down">Candidate Profile</h6>
              <h4 className='candidate--heading' data-aos="fade-up"><span>Connect</span> with Diverse <br /> Professionals and <span>Elevate</span><br /> <span>Your Brand</span></h4>
            </div>
            <div className='home--know-more-area'>
              <a href="/talent-profile-search" className='home--know-more' data-aos="fade-right">
                <div className='home--know-more-btn'>More Talents
                </div>
                <div className='home--know-more-arrow'>
                  <img src="assets/img/home-images/arrow-img.png" className='knowmore--arrow' alt="" />
                </div>
              </a>
            </div>
          </div>
        </div>
        <div className="candidate--slider-area" data-aos="fade-left">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={10}
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
            <SwiperSlide>
              <article className='candidate--card'>
                <div className="candidate--profile-area">
                  <img src="assets/img/home-images/candidate-profile.png"
                    className='canidate--profile-img' alt="" />
                  <div className='candidate--name-area'>
                    <h6>Raquel Harrison</h6>
                    <div className='candidate--role'>
                      <i class="bi bi-file-earmark-code-fill"></i>
                      <span>Frontend Developer</span>
                    </div>
                  </div>
                </div>
                <div className='candidate--content-area'>
                  <div className="candidate--top-left">
                    <div className="candidate--rate-area">
                      <i class="ri-star-fill"></i>
                      <span className='candidate--rating'>4.5</span>
                    </div>
                    <h6 className='candidate--exp'>Experience : 5 Yrs</h6>
                  </div>
                  <div className="candidate--top-right">
                    <div className="candidate--rate-area">
                      <i class='bx bxs-map map-icon'></i>
                      <span className='candidate--rating'>Hyderabad</span>
                    </div>
                    <h6 className='candidate--exp'>Immediate Joiner</h6>
                  </div>
                </div>
                <div className="candidate--desc-area">
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's </p>
                </div>
                <div className="candidate--skills-area">
                  <div className="row">
                    <div className="col-6 col-border-1">
                      <div className="candidate--skill">
                        <h6>Skill matched</h6>
                        <h2>90%</h2>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="candidate--skill">
                        <h6>Can join in</h6>
                        <h2>07<span>days</span></h2>
                      </div>
                    </div>
                  </div>
                </div>
                <a href='/talents' className="candidate--arrow-icon">
                  <img src="assets/img/home-images/arrow-dark.png" alt="" />
                </a>
                <div className="candidate-blob"></div>
              </article>
            </SwiperSlide>

            <SwiperSlide>
              <article className='candidate--card'>
                <div className="candidate--profile-area">
                  <img src="assets/img/home-images/candidate-profile.png"
                    className='canidate--profile-img' alt="" />
                  <div className='candidate--name-area'>
                    <h6>Raquel Harrison</h6>
                    <div className='candidate--role'>
                      <i class="bi bi-file-earmark-code-fill"></i>
                      <span>Frontend Developer</span>
                    </div>
                  </div>
                </div>
                <div className='candidate--content-area'>
                  <div className="candidate--top-left">
                    <div className="candidate--rate-area">
                      <i class="ri-star-fill"></i>
                      <span className='candidate--rating'>4.5</span>
                    </div>
                    <h6 className='candidate--exp'>Experience : 5 Yrs</h6>
                  </div>
                  <div className="candidate--top-right">
                    <div className="candidate--rate-area">
                      <i class='bx bxs-map map-icon'></i>
                      <span className='candidate--rating'>Hyderabad</span>
                    </div>
                    <h6 className='candidate--exp'>Immediate Joiner</h6>
                  </div>
                </div>
                <div className="candidate--desc-area">
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's </p>
                </div>
                <div className="candidate--skills-area">
                  <div className="row">
                    <div className="col-6 col-border-1">
                      <div className="candidate--skill">
                        <h6>Skill matched</h6>
                        <h2>90%</h2>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="candidate--skill">
                        <h6>Can join in</h6>
                        <h2>07<span>days</span></h2>
                      </div>
                    </div>
                  </div>
                </div>
                <a href='/talents' className="candidate--arrow-icon">
                  <img src="assets/img/home-images/arrow-dark.png" alt="" />
                </a>
                <div className="candidate-blob"></div>
              </article>
            </SwiperSlide>

            <SwiperSlide>
              <article className='candidate--card'>
                <div className="candidate--profile-area">
                  <img src="assets/img/home-images/candidate-profile.png"
                    className='canidate--profile-img' alt="" />
                  <div className='candidate--name-area'>
                    <h6>Raquel Harrison</h6>
                    <div className='candidate--role'>
                      <i class="bi bi-file-earmark-code-fill"></i>
                      <span>Frontend Developer</span>
                    </div>
                  </div>
                </div>
                <div className='candidate--content-area'>
                  <div className="candidate--top-left">
                    <div className="candidate--rate-area">
                      <i class="ri-star-fill"></i>
                      <span className='candidate--rating'>4.5</span>
                    </div>
                    <h6 className='candidate--exp'>Experience : 5 Yrs</h6>
                  </div>
                  <div className="candidate--top-right">
                    <div className="candidate--rate-area">
                      <i class='bx bxs-map map-icon'></i>
                      <span className='candidate--rating'>Hyderabad</span>
                    </div>
                    <h6 className='candidate--exp'>Immediate Joiner</h6>
                  </div>
                </div>
                <div className="candidate--desc-area">
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's </p>
                </div>
                <div className="candidate--skills-area">
                  <div className="row">
                    <div className="col-6 col-border-1">
                      <div className="candidate--skill">
                        <h6>Skill matched</h6>
                        <h2>90%</h2>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="candidate--skill">
                        <h6>Can join in</h6>
                        <h2>07<span>days</span></h2>
                      </div>
                    </div>
                  </div>
                </div>
                <a href='/talents' className="candidate--arrow-icon">
                  <img src="assets/img/home-images/arrow-dark.png" alt="" />
                </a>
                <div className="candidate-blob"></div>
              </article>
            </SwiperSlide>

            <SwiperSlide>
              <article className='candidate--card'>
                <div className="candidate--profile-area">
                  <img src="assets/img/home-images/candidate-profile.png"
                    className='canidate--profile-img' alt="" />
                  <div className='candidate--name-area'>
                    <h6>Raquel Harrison</h6>
                    <div className='candidate--role'>
                      <i class="bi bi-file-earmark-code-fill"></i>
                      <span>Frontend Developer</span>
                    </div>
                  </div>
                </div>
                <div className='candidate--content-area'>
                  <div className="candidate--top-left">
                    <div className="candidate--rate-area">
                      <i class="ri-star-fill"></i>
                      <span className='candidate--rating'>4.5</span>
                    </div>
                    <h6 className='candidate--exp'>Experience : 5 Yrs</h6>
                  </div>
                  <div className="candidate--top-right">
                    <div className="candidate--rate-area">
                      <i class='bx bxs-map map-icon'></i>
                      <span className='candidate--rating'>Hyderabad</span>
                    </div>
                    <h6 className='candidate--exp'>Immediate Joiner</h6>
                  </div>
                </div>
                <div className="candidate--desc-area">
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's </p>
                </div>
                <div className="candidate--skills-area">
                  <div className="row">
                    <div className="col-6 col-border-1">
                      <div className="candidate--skill">
                        <h6>Skill matched</h6>
                        <h2>90%</h2>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="candidate--skill">
                        <h6>Can join in</h6>
                        <h2>07<span>days</span></h2>
                      </div>
                    </div>
                  </div>
                </div>
                <a href='/talents' className="candidate--arrow-icon">
                  <img src="assets/img/home-images/arrow-dark.png" alt="" />
                </a>
                <div className="candidate-blob"></div>
              </article>
            </SwiperSlide>

            <SwiperSlide>
              <article className='candidate--card'>
                <div className="candidate--profile-area">
                  <img src="assets/img/home-images/candidate-profile.png"
                    className='canidate--profile-img' alt="" />
                  <div className='candidate--name-area'>
                    <h6>Raquel Harrison</h6>
                    <div className='candidate--role'>
                      <i class="bi bi-file-earmark-code-fill"></i>
                      <span>Frontend Developer</span>
                    </div>
                  </div>
                </div>
                <div className='candidate--content-area'>
                  <div className="candidate--top-left">
                    <div className="candidate--rate-area">
                      <i class="ri-star-fill"></i>
                      <span className='candidate--rating'>4.5</span>
                    </div>
                    <h6 className='candidate--exp'>Experience : 5 Yrs</h6>
                  </div>
                  <div className="candidate--top-right">
                    <div className="candidate--rate-area">
                      <i class='bx bxs-map map-icon'></i>
                      <span className='candidate--rating'>Hyderabad</span>
                    </div>
                    <h6 className='candidate--exp'>Immediate Joiner</h6>
                  </div>
                </div>
                <div className="candidate--desc-area">
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's </p>
                </div>
                <div className="candidate--skills-area">
                  <div className="row">
                    <div className="col-6 col-border-1">
                      <div className="candidate--skill">
                        <h6>Skill matched</h6>
                        <h2>90%</h2>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="candidate--skill">
                        <h6>Can join in</h6>
                        <h2>07<span>days</span></h2>
                      </div>
                    </div>
                  </div>
                </div>
                <a href='/talents' className="candidate--arrow-icon">
                  <img src="assets/img/home-images/arrow-dark.png" alt="" />
                </a>
                <div className="candidate-blob"></div>
              </article>
            </SwiperSlide>

            <SwiperSlide>
              <article className='candidate--card'>
                <div className="candidate--profile-area">
                  <img src="assets/img/home-images/candidate-profile.png"
                    className='canidate--profile-img' alt="" />
                  <div className='candidate--name-area'>
                    <h6>Raquel Harrison</h6>
                    <div className='candidate--role'>
                      <i class="bi bi-file-earmark-code-fill"></i>
                      <span>Frontend Developer</span>
                    </div>
                  </div>
                </div>
                <div className='candidate--content-area'>
                  <div className="candidate--top-left">
                    <div className="candidate--rate-area">
                      <i class="ri-star-fill"></i>
                      <span className='candidate--rating'>4.5</span>
                    </div>
                    <h6 className='candidate--exp'>Experience : 5 Yrs</h6>
                  </div>
                  <div className="candidate--top-right">
                    <div className="candidate--rate-area">
                      <i class='bx bxs-map map-icon'></i>
                      <span className='candidate--rating'>Hyderabad</span>
                    </div>
                    <h6 className='candidate--exp'>Immediate Joiner</h6>
                  </div>
                </div>
                <div className="candidate--desc-area">
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's </p>
                </div>
                <div className="candidate--skills-area">
                  <div className="row">
                    <div className="col-6 col-border-1">
                      <div className="candidate--skill">
                        <h6>Skill matched</h6>
                        <h2>90%</h2>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="candidate--skill">
                        <h6>Can join in</h6>
                        <h2>07<span>days</span></h2>
                      </div>
                    </div>
                  </div>
                </div>
                <a href='/talents' className="candidate--arrow-icon">
                  <img src="assets/img/home-images/arrow-dark.png" alt="" />
                </a>
                <div className="candidate-blob"></div>
              </article>
            </SwiperSlide>

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
      </section> */}

      <div className='container-fluid home--section'>
        <div className='container-fluid container-section'>
          {/* <section className='clients--section'>
            <div className='home--about-headarea'>
              <h6 data-aos="fade-down">Our Clients</h6>
              <h4 className='client--heading' data-aos="fade-up"><span>They WORK</span> WITH US </h4>
            </div>
            <div className="clients--img-area">
              <div className="row">
                <div className="col-6 col-lg-2 col-md-4">
                  <div className="client--img-container" data-aos="flip-up">
                    <img src="assets/img/home-images/client-4.png" className='client--img' alt="" />
                    <div className='client--img-blob'></div>
                  </div>
                </div>
                <div className="col-6 col-lg-2 col-md-4">
                  <div className="client--img-container" data-aos="flip-up">
                    <img src="assets/img/home-images/client-3.png" className='client--img' alt="" />
                    <div className='client--img-blob'></div>
                  </div>
                </div>
                <div className="col-6 col-lg-2 col-md-4">
                  <div className="client--img-container" data-aos="flip-up">
                    <img src="assets/img/home-images/client-2.png" className='client--img' alt="" />
                    <div className='client--img-blob'></div>
                  </div>
                </div>
                <div className="col-6 col-lg-2 col-md-4">
                  <div className="client--img-container" data-aos="flip-up">
                    <img src="assets/img/home-images/client-1.png" className='client--img' alt="" />
                    <div className='client--img-blob'></div>
                  </div>
                </div>
                <div className="col-6 col-lg-2 col-md-4">
                  <div className="client--img-container" data-aos="flip-up">
                    <img src="assets/img/home-images/client-4.png" className='client--img' alt="" />
                    <div className='client--img-blob'></div>
                  </div>
                </div>
                <div className="col-6 col-lg-2 col-md-4">
                  <div className="client--img-container" data-aos="flip-up">
                    <img src="assets/img/home-images/client-3.png" className='client--img' alt="" />
                    <div className='client--img-blob'></div>
                  </div>
                </div>
                <div className="col-6 col-lg-2 col-md-4">
                  <div className="client--img-container" data-aos="flip-up">
                    <img src="assets/img/home-images/client-1.png" className='client--img' alt="" />
                    <div className='client--img-blob'></div>
                  </div>
                </div>
                <div className="col-6 col-lg-2 col-md-4">
                  <div className="client--img-container" data-aos="flip-up">
                    <img src="assets/img/home-images/client-2.png" className='client--img' alt="" />
                    <div className='client--img-blob'></div>
                  </div>
                </div>
                <div className="col-6 col-lg-2 col-md-4">
                  <div className="client--img-container" data-aos="flip-up">
                    <img src="assets/img/home-images/client-1.png" className='client--img' alt="" />
                    <div className='client--img-blob'></div>
                  </div>
                </div>
                <div className="col-6 col-lg-2 col-md-4">
                  <div className="client--img-container" data-aos="flip-up">
                    <img src="assets/img/home-images/client-4.png" className='client--img' alt="" />
                    <div className='client--img-blob'></div>
                  </div>
                </div>
                <div className="col-6 col-lg-2 col-md-4">
                  <div className="client--img-container" data-aos="flip-up">
                    <img src="assets/img/home-images/client-3.png" className='client--img' alt="" />
                    <div className='client--img-blob'></div>
                  </div>
                </div>
                <div className="col-6 col-lg-2 col-md-4">
                  <div className="client--img-container" data-aos="flip-up">
                    <img src="assets/img/home-images/client-2.png" className='client--img' alt="" />
                    <div className='client--img-blob'></div>
                  </div>
                </div>
                <div className="col-6 col-lg-2 col-md-4">
                  <div className="client--img-container" data-aos="flip-up">
                    <img src="assets/img/home-images/client-4.png" className='client--img' alt="" />
                    <div className='client--img-blob'></div>
                  </div>
                </div>
                <div className="col-6 col-lg-2 col-md-4">
                  <div className="client--img-container" data-aos="flip-up">
                    <img src="assets/img/home-images/client-3.png" className='client--img' alt="" />
                    <div className='client--img-blob'></div>
                  </div>
                </div>
                <div className="col-6 col-lg-2 col-md-4">
                  <div className="client--img-container" data-aos="flip-up">
                    <img src="assets/img/home-images/client-2.png" className='client--img' alt="" />
                    <div className='client--img-blob'></div>
                  </div>
                </div>
                <div className="col-6 col-lg-2 col-md-4">
                  <div className="client--img-container" data-aos="flip-up">
                    <img src="assets/img/home-images/client-1.png" className='client--img' alt="" />
                    <div className='client--img-blob'></div>
                  </div>
                </div>
                <div className="col-6 col-lg-2 col-md-4">
                  <div className="client--img-container" data-aos="flip-up">
                    <img src="assets/img/home-images/client-4.png" className='client--img' alt="" />
                    <div className='client--img-blob'></div>
                  </div>
                </div>
                <div className="col-6 col-lg-2 col-md-4">
                  <div className="client--img-container" data-aos="flip-up">
                    <img src="assets/img/home-images/client-3.png" className='client--img' alt="" />
                    <div className='client--img-blob'></div>
                  </div>
                </div>
              </div>
            </div>
          </section> */}

          <section className='home--testimonial-section'>
            <div className='home--about-toparea'>
              <div className='home--about-headarea'>
                <h6 data-aos="fade-down">Testimonials</h6>
                <h4 className='candidate--heading' data-aos="fade-up">WHAT THEY SAY ABOUT US</h4>
              </div>
              <div className='home--know-more-area'>
                <a href="/testimonial" className='home--know-more' data-aos="fade-right">
                  <div className='home--know-more-btn'>Know more
                  </div>
                  <div className='home--know-more-arrow'>
                    <img src="assets/img/home-images/arrow-img.png" className='knowmore--arrow' alt="" />
                  </div>
                </a>
              </div>
            </div>
            <div className="testimonial--card-area">
              <div className="row">
                <div className="col-12 col-xl-7 col-lg-12 col-md-12">
                  <article className="testimonial--card-lg" data-aos="zoom-out-right">
                    <div className="testimonial--profile-area">
                      <img src="assets/img/home-images/testi-profile.jpeg" className='testimonial--profile-img' alt="" />
                      <div className="testimonial--profile">
                        <h5>KAVITHA KATKAM</h5>
                        <p>Senior Manager Talent Acquisition, IVY Software Development Services Pvt. Ltd.</p>
                      </div>
                    </div>
                    <div className="testimonial--content-area">
                      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                    </div>
                    <a href='/testimonial-detail' className='testimonial--arrow-area'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="60" height="65" viewBox="0 0 55 56" fill="none">
                        <path d="M5.25812 7.09628C12.7692 13.4518 32.2979 21.6562 50.3244 3.62964" stroke="white" stroke-width="4" />
                        <path d="M51.0082 2.95734C43.7453 9.59507 33.1137 27.9159 48.69 48.0973" stroke="white" stroke-width="4" />
                        <path d="M2 53.9998L52.2663 2.00024" stroke="white" stroke-width="4" />
                      </svg>
                    </a>
                  </article>
                </div>
                <div className="col-12 col-xl-5 col-lg-6 col-md-12 custom-flex-row">
                  <article className='testimonial--card-sm test--card-bg1 mb-4' data-aos="zoom-out-left">
                    <div className="testimonial-sm--profile-area">
                      <img src="assets/img/home-images/testi-profile.jpeg" className='testimonial--sm-profile-img' alt="" />
                      <div className="testimonial-sm--profile">
                        <h5>KAVITHA KATKAM</h5>
                        <p>Senior Manager Talent Acquisition, IVY Software Development Services Pvt. Ltd.</p>
                      </div>
                      <button className='testi-sm-play-buttonarea custom-padding'>
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
                      <button className='testi-sm-play-buttonarea'>
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

          <section className='connect--section'>
            <div className='home--about-headarea'>
              <h6 data-aos="fade-down">Connect</h6>
              <h3 className='service--heading' data-aos="fade-up">Connect WITH US ANYTIME</h3>
            </div>
            <div className="connect--content-area">
              <div className="row">
                <div className="col-12 col-lg-4 connect-card">
                  <div className='contact--article' data-aos="zoom-out-right">
                    <div className="connect--img-area">
                      <img src="assets/img/home-images/whatsapp.png" className='connect--img' alt="" />
                    </div>
                    <div className='connect--article-content'>
                      <div className="connect--title">
                        <h4>WHATSAPP</h4>
                      </div>
                      <div className="connect--desc-area">
                        <p>Direct Call or message on WhatsApp to start work with us </p>
                      </div>
                      <div className="connect--btn-area">
                        <a href="#" className='connect--btn-sub'>
                          <div className='connect--btn'>
                            CALL NOW
                          </div>
                          <div className='connect--arrow-area'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="18" viewBox="0 0 17 18" fill="none">
                              <path d="M1.67896 2.97099C3.85946 4.81603 9.52876 7.19781 14.762 1.9646" stroke="white" stroke-width="2" />
                              <path d="M14.9604 1.76989C12.8519 3.69686 9.76548 9.0155 14.2874 14.8743" stroke="white" stroke-width="2" />
                              <path d="M0.733032 16.5877L15.3256 1.49194" stroke="white" stroke-width="2" />
                            </svg>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-4 connect-card">
                  <div className='contact--article' data-aos="zoom-out">
                    <div className="connect--img-area">
                      <img src="assets/img/home-images/mail.png" className='connect--img' alt="" />
                    </div>
                    <div className='connect--article-content'>
                      <div className="connect--title">
                        <h4>E-MAIL</h4>
                      </div>
                      <div className="connect--desc-area">
                        <p>Send mail to us Anytime</p>
                      </div>
                      <div className="connect--btn-area">
                        <a href="#" className='connect--btn-sub'>
                          <div className='connect--btn'>
                            info@skillety.com
                          </div>
                          <div className='connect--arrow-area'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="18" viewBox="0 0 17 18" fill="none">
                              <path d="M1.67896 2.97099C3.85946 4.81603 9.52876 7.19781 14.762 1.9646" stroke="white" stroke-width="2" />
                              <path d="M14.9604 1.76989C12.8519 3.69686 9.76548 9.0155 14.2874 14.8743" stroke="white" stroke-width="2" />
                              <path d="M0.733032 16.5877L15.3256 1.49194" stroke="white" stroke-width="2" />
                            </svg>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-4 connect-card">
                  <div className='contact--article' data-aos="zoom-out-left">
                    <div className="connect--img-area">
                      <img src="assets/img/home-images/calender.png" className='connect--img' alt="" />
                    </div>
                    <div className='connect--article-content'>
                      <div className="connect--title">
                        <h4>CALENDLY</h4>
                      </div>
                      <div className="connect--desc-area">
                        <p>Schedule a call with us and get things moving</p>
                      </div>
                      <div className="connect--btn-area">
                        <a href="#" className='connect--btn-sub'>
                          <div className='connect--btn'>
                            BOOK NOW
                          </div>
                          <div className='connect--arrow-area'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="18" viewBox="0 0 17 18" fill="none">
                              <path d="M1.67896 2.97099C3.85946 4.81603 9.52876 7.19781 14.762 1.9646" stroke="white" stroke-width="2" />
                              <path d="M14.9604 1.76989C12.8519 3.69686 9.76548 9.0155 14.2874 14.8743" stroke="white" stroke-width="2" />
                              <path d="M0.733032 16.5877L15.3256 1.49194" stroke="white" stroke-width="2" />
                            </svg>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className='register--section'>
            <a href="/client-register">
              <div className="register--card">
                <h2 className='register--text' data-aos="fade-down">Register Now</h2>
                <div className="register-arrow-area">
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
      </div >
      <CandidateFooter />
    </div>
  )
}

export default HomeCandidate
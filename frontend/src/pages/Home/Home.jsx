import React, { useContext } from 'react';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import $ from 'jquery';
import './Home.css';
import './Home-responsive.css';
import Layout from '../../components/Layout';
import { Footer } from '../../components/Footer';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

import Modal from 'react-modal';
import ReactPlayer from 'react-player';


const Home = () => {

  const navigate = useNavigate();

  const [candidateDetail, setCandidateDetail] = useState([]);
  const { getCandidateImg, candidateImg } = useContext(AuthContext);
  const [clientToken, setClientToken] = useState("");

  const [skillArray, setSkillArray] = useState([]);
  const [jobRoleArray, setjobRoleArray] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [selectedResults, setSelectedResults] = useState([]);
  const [searchInput, setSearchinput] = useState("");

  const [popularSearches, setPopulartSearches] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [playerType, setPlayerType] = useState(null);

  const openModal = (type) => {
    setPlayerType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setPlayerType(null);
  };

  useEffect(() => {
    setClientToken(JSON.parse(localStorage.getItem("clientToken")))
  }, [clientToken])

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

  const getAllCandidateDetail = async () => {
    try {
      const response = await axios.get('https://skillety-n6r1.onrender.com/candidate-Detail', {
        headers: {
          Accept: 'application/json'
        }
      });
      const result = response.data;
      if (!result.error) {
        console.log(result);
        setCandidateDetail(result.reverse());
      } else {
        console.log(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllSkills = async () => {
    try {
      const res = await axios.get("https://skillety-n6r1.onrender.com/skills", {
        headers: {

          Accept: 'application/json'
        }
      });
      const result = res.data;
      if (!result.error) {
        console.log(result);
        setSkillArray(result);
      } else {
        console.log(result);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getAllJobRoles = async () => {
    try {
      const res = await axios.get("https://skillety-n6r1.onrender.com/designations", {
        headers: {

          Accept: 'application/json'
        }
      });
      const result = res.data;
      if (!result.error) {
        console.log(result);
        setjobRoleArray(result);
      } else {
        console.log(result);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    $(".home--search-btn").click(function () {
      setTimeout(function () {
        $("html, body").animate({ scrollTop: 0 }, 500);
      }, 0);
    });

    const handleKeyDown = (event) => {
      if (event.key === 's' && event.altKey) {
        event.preventDefault();
        const inputElement = document.getElementById('searchSkillInput');
        if (inputElement) {
          inputElement.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const getPopularSearches = async () => {
    try {
      const response = await axios.get('https://skillety-n6r1.onrender.com/popular-search', {
        headers: {
          Accept: 'application/json'
        }
      });
      const result = response.data;
      if (!result.error) {
        console.log(result);
        setPopulartSearches(result);
      } else {
        console.log(result);
      }
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    getAllCandidateDetail();
    getCandidateImg();
    getAllSkills();
    getAllJobRoles();
    getPopularSearches();
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

  const handleSearch = (e) => {
    const inputValue = e.target.value;
    setSearchinput(inputValue);

    if (inputValue.length > 0) {
      const skills = skillArray.filter((obj) => {
        return obj.skill.toLowerCase().includes(inputValue.toLowerCase());
      });

      const jobRoles = jobRoleArray.filter((obj) => {
        return obj.designation.toLowerCase().includes(inputValue.toLowerCase());
      });

      const combinedResults = [...skills, ...jobRoles];

      if (combinedResults.length > 0) {
        setFilteredList(combinedResults);
      } else {
        setFilteredList([]);
      }
    } else {
      setFilteredList([]);
    }
  };

  const handleFilteredClick = (clickResult) => {
    console.log(clickResult)
    if (selectedResults.includes(clickResult)) {
      setSelectedResults([...selectedResults]);
      setSearchinput("");
      setFilteredList([]);

    } else {
      setSelectedResults([...selectedResults, clickResult]);
      setSearchinput("");
      setFilteredList([]);
    }
  }

  const handleDeselect = (result) => {
    setSelectedResults(selectedResults.filter(selected => selected !== result));
  }

  const handlePopularSearch = () => {
    axios.post("https://skillety-n6r1.onrender.com/popular-search", selectedResults)
      .then(res => {
        console.log(res.data)
        getPopularSearches();
        const keywords = selectedResults
        navigate('/talent-profile-search', { state: { keywords } });
      })
      .catch(err => console.log(err))
  }

  return (
    <div>
      <Layout home={true} />
      <div className='container-fluid home--section'>
        <div className='container-fluid container-section'>
          <div className="home--bg">
            <div className="row col-rev-custom">
              <div className="col-12 col-lg-6 col-xl-7 col-md-12 home--left-cover">
                <div className="home--head">
                  {/* <h5 data-aos="fade-left" data-aos-delay="200">
                      Welcome to the world’s first Recruitment Solutions Integrator, powered by an exclusive job board for Immediate Joiners.
                    </h5> */}
                  <h5 data-aos="fade-left" data-aos-delay="200">
                    Welcome to the world’s only Job Portal for Immediate Joiners - guys who can Join you within 7 days or less!!!
                  </h5>
                  <h6 data-aos="fade-right" data-aos-delay="300">
                    Search For Talents
                  </h6>
                </div>
                <div className="home--search-area">
                  <div className='home-search-badge-area mb-4'>
                    {selectedResults.map(selectResult => (
                      <span className="home-search-badge client"
                        key={selectResult}
                        onClick={() => handleDeselect(selectResult)}
                      >{selectResult}</span>
                    ))}
                  </div>
                  <div className='position-relative'>
                    <input type="search" data-aos="fade-up" data-aos-delay="200" className='home--search-box form-control'
                      placeholder='Enter keywords like skills, designation'
                      value={searchInput}
                      id='searchSkillInput'
                      onChange={handleSearch} />
                    <div className="short-cut" data-aos="zoom-in">
                      <span className="short-cut-key">Alt + S</span>
                    </div>
                    <i className="bi bi-search home--search-icon" data-aos="zoom-in" data-aos-delay="200"></i>
                  </div>

                  <div className='home-search-result-data-area client'>
                    {filteredList.length > 0 &&
                      filteredList.map((filterResult) => (
                        <div
                          className='home-search-result-data client'
                          key={filterResult._id}
                          onClick={() => handleFilteredClick(filterResult.designation || filterResult.skill)}
                        >
                          {filterResult.designation ? filterResult.designation : filterResult.skill}
                        </div>
                      ))}
                  </div>

                  <button className='btn home--search-btn' data-aos="fade-left" data-aos-delay="100"
                    onClick={handlePopularSearch}>Search</button>
                </div>
                {popularSearches.length > 0 && <div className="home--popular-area">
                  <h6 data-aos="fade-right">Popular Searches</h6>
                  <div className="popular--btn-area">
                    {popularSearches.map(pop => {
                      return (
                        <button onClick={() => handleFilteredClick(pop.keyword)} className='btn home--popular-btn' data-aos="fade-up" data-aos-delay="150">{pop.keyword}</button>
                      )
                    })}

                    {/* <a href="" className='btn home--popular-btn' data-aos="fade-up" data-aos-delay="100">Marketing</a>
                    <a href="" className='btn home--popular-btn' data-aos="fade-up" data-aos-delay="100">Finance</a>
                    <a href="" className='btn home--popular-btn' data-aos="fade-up" data-aos-delay="50">IT</a>
                    <a href="" className='btn home--popular-btn' data-aos="fade-up" data-aos-delay="50">Engineering</a>
                    <a href="" className='btn home--popular-btn' data-aos="fade-up" data-aos-delay="0">Sales</a>
                    <a href="" className='btn home--popular-btn' data-aos="fade-up" data-aos-delay="0">Retail</a> */}
                  </div>
                </div>}

              </div>
              <div className="col-12 col-lg-6 col-xl-5 col-md-12 home--right-cover custom-flex">
                <div className='home--blob-img-area'>
                  <div className="home--img-area">
                    <img src="assets/img/home-images/header-image.webp" data-aos="fade" data-aos-delay="300" loading='lazy'
                      className='home--img animated' alt="" />
                    <img src="assets/img/home-images/bubble-1.png" className='bubble--img1 animated' alt="" data-aos="fade" data-aos-delay="200" />
                    <img src="assets/img/home-images/bubble-2.png" className='bubble--img2 animated' alt="" data-aos="fade" data-aos-delay="100" />
                    <img src="assets/img/home-images/bubble-3.png" className='bubble--img3 animated' alt="" data-aos="fade" data-aos-delay="200" />
                    <img src="assets/img/home-images/bubble-2.png" className='bubble--img4 animated' alt="" data-aos="fade" data-aos-delay="100" />
                    <img src="assets/img/home-images/bubble-4.png" className='bubble--img5 animated' alt="" data-aos="fade" data-aos-delay="100" />
                    <img src="assets/img/home-images/bubble-4.png" className='bubble--img6 animated' alt="" data-aos="fade" data-aos-delay="200" />
                    <img src="assets/img/home-images/bubble-4.png" className='bubble--img7 animated' alt="" data-aos="fade" data-aos-delay="100" />
                  </div>
                </div>
                <div className="home--card-area">
                  <div className="row">
                    <div className="col-xl-8 col-lg-12 col-md-12 offset-xl-4">
                      <div className="card home--card" data-aos="fade-right" data-aos-delay="100">
                        <div className="card--imgicon-area">
                          <h6 className='card--text'>I want to hire an immediate joiner</h6>
                          <img src="assets/img/home-images/icon-1.png" className='card--icon' alt="" />
                        </div>
                        <div className="home--sub-des">
                          <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                          </p>
                        </div>
                        <a href='' className="arrow--icon-btn">
                          <img src="assets/img/home-images/arrow-dark.png" className='arrow--icon' alt="" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <section className="home--about-section">
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
              {/* <p>We are a gig-economy based crowdsourcing platform for Freelancers. We have an exclusive vault of Immediate Joiners - guys who can pick up an Offer and Join within 7 days or less. We have curated a group of Technical Interview experts for Clients who face shortage of internal Interview Panels. We help you to move away from the old and soiled hierarchical business structure, and evolve into a 21st Century on-demand, open talent, cross-functional team; with a skilled and passionate workforce who are more engaged, effective & productive. Welcome to Skillety – Your on-demand HR solutions partner.</p> */}
              <p>Skillety is an AI-driven job portal for Immediate Joiners - candidates who can pick up a job offer and join in less than 7 days, 15 days or 30 days. We deliver an inimitable combination of Speed, Quality & Convenience through our comprehensive suite of diverse hiring solutions like Sourcing, Posting, Assessment, Interview, Onboarding & Verification – all seamlessly integrated into one place. The combined power of our AI-driven platform and the extensive experience of our formidable team, makes us an end-to-end recruitment powerhouse - your perfect RPO partner.</p>
            </div>
          </section>

          <section className='home--service-section'>
            <div className="home--services-slider-area">
              <div className='home--about-headarea'>
                <h6 data-aos="fade-down">Services</h6>
                <h3 className='service--heading' data-aos="fade-up">OUR SERVICES</h3>
              </div>
              <div className="home--service-para" data-aos="fade-left" data-aos-delay="100">
                <p>What makes us unique is the combination of a Job Portal for Immediate Joiners coupled with a comprehensive suite of diverse hiring solutions, including Sourcing, Screening, Assessments, Interviews, Verification, and Onboarding, all thoughtfully integrated into a single platform. This reduces the TAT for a new hire by an impressive 30-50%. Our pay-as-you-go model offers our clients with a simple billing and performance evaluation process, focused solely on end results. As an end-to-end recruitment powerhouse, Skillety is your ideal RPO partner, dedicated to optimizing your recruitment journey.</p>
              </div>
              <div className="row">
                <div className="col-12 col-xl-7 col-lg-8">
                  <article className='home--service-card' data-aos="zoom-out-right">
                    <div className="service--arrow-area">
                      <img src="assets/img/home-images/arrow-L.png" className='service--arrow-img' alt="" />
                    </div>
                    <div className="service--content-area">
                      <div className="service--card-headarea">
                        <h3>CV SOURCING</h3>
                        <img src="assets/img/home-images/sourcing-icon.png" className='sourcing-icon' alt="" />
                      </div>
                      {/* <p className='service--content'>
                          Search for Immediate Joiner CVs from 3 buckets - 7 days, 15 days & 30 days joiners. Also Post Jobs and publish it on 172 partner job-boards & social media platforms, in just one click.
                        </p> */}
                      <p className='service--content'>
                        Search for Candidates with any skill and experience, from any sector and location through seamless filter options. Search for Immediate Joiner CVs from 3 buckets - 7 days, 15 days & 30 days joiners.
                      </p>
                      <div className='service-know-morearea'>
                        <a href="/cv-sourcing" className='service--know-more'>
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
              {/* <div className="row mt-5">
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
                </div> */}
              <div className="row mt-5">
                <div className="col-12 col-xl-7 col-lg-8 offset-xl-5 offset-lg-4">
                  <article className='home--service-card' data-aos="zoom-out-left">
                    <div className="service--arrow-area">
                      <img src="assets/img/home-images/arrow-L.png" className='service--arrow-img' alt="" />
                    </div>
                    <div className="service--content-area">
                      <div className="service--card-headarea">
                        <h3>JOB POSTING</h3>
                        <img src="assets/img/home-images/screening.png" className='screening-icon' alt="" />
                      </div>
                      <p className='service--content'>
                        Post multiple Jobs easily and publish it on 172 partner job-boards & social media platforms, in just one click. CVs would flow in from all sides into your Dashboard and Inbox.
                      </p>
                      <div className='service-know-morearea'>
                        <a href="/job-posting" className='service--know-more'>
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
                        <h3>SKILL ASSESSMENT</h3>
                        <img src="assets/img/home-images/assesment.png" className='sourcing-icon' alt="" />
                      </div>
                      <p className='service--content'>
                        Send Technical Assessment test links to multiple candidates, simultaneously. The Test Report comes with a comprehensive analysis of their aptitude, knowledge and proficiency.
                      </p>
                      <div className='service-know-morearea'>
                        <a href="/skill-assessment" className='service--know-more'>
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
                        <h3>INTERVIEW-AS-A-SERVICE</h3>
                        <img src="assets/img/home-images/interview.png" className='interview-icon' alt="" />
                      </div>
                      {/* <p className='service--content'>
                          Do a thorough L1 Interview with a coding round conducted by panels from FAANG companies. The Feedback comes as a comprehensive report along with Playback.
                        </p> */}
                      <p className='service--content'>
                        Get instant access to the Interview Outsourcing services of Skillety. Do thorough L1 Interviews with a coding round conducted by panels from FAANG companies. The Feedback comes as a comprehensive report along with the playback of the video interview.
                      </p>
                      <div className='service-know-morearea'>
                        <a href="/interview-as-a-service" className='service--know-more'>
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
                        <h3>BACKGROUND VERIFICATION</h3>
                        <img src="assets/img/home-images/verification.png" className='verification-icon' alt="" />
                      </div>
                      <p className='service--content'>
                        Before releasing the Offer, do a quick sanity check if it's a fake profile or not, with our BGV-Lite services. Also do a detailed 360-degree Background Verification after the candidate joins – all from the Skillety platform.
                      </p>
                      <div className='service-know-morearea'>
                        <a href="/background-verification" className='service--know-more'>
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
                        <h3>RPO-LITE</h3>
                        <img src="assets/img/home-images/rpo.png" className='interview-icon' alt="" />
                      </div>
                      {/* <p className='service--content'>
                          Before releasing the Offer, do a quick sanity check if it's a fake profile or not, with our BGV-Lite services. Also do a 360-degree Background Verification after the candidate joins.
                        </p> */}
                      <p className='service--content'>
                        This Is Specifically Designed For Companies Who Would Want To Test Run The RPO Model First, And Then Decide. We Take Up Hiring Requirements From One Or Few Projects On Exclusivity, And Close Them In Record Time, First. The Results Will Determine Whether You Want To Upgrade To An Enterprise RPO (Or Not), Based On Solid Proof.                      </p>
                      <div className='service-know-morearea'>
                        <a href="/" className='service--know-more'>
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
              {/* <p>We improve the efficiency and effectiveness of the client’s recruitment process by providing an end-to-end outsourcing solution for the recruitment process.</p> */}
              <p>Recruitment Process Outsourcing is a specialty of Skillety, where we, an external solution provider, acts as a company's internal recruitment function for a portion or all of its jobs. Typically our Client Success Managers (resource implants) are deployed to the client's business premises on a fully or partially outsourced basis. We manage the entire recruiting/hiring process from job profiling through the onboarding of new hires, including staff, technology, methods, and reporting. Skillety’s highly customised and automated RPO process will tremendously improve a client's time-to-hire, increase the quality of the candidate pool, provide verifiable metrics, reduce costs, and improve employee retention and governmental compliance.</p>
            </div>
            <div className="rpo--content-card">
              <div className="row align-items-xl-center">
                <div className="col-12 col-xl-4 col-lg-3">
                  <div className='rpo--card-heading'>
                    <h4 data-aos="fade-right">Enterprise RPO</h4>
                  </div>
                </div>
                <div className="col-12 col-xl-5 col-lg-9">
                  <div className='rpo--card-desc'>
                    <p data-aos="fade">From requisition to onboarding, Skillety offers recruitment expertise and scalability while being completely aligned with our clients’ culture. Enterprise RPO is a comprehensive, customizable, and scalable recruitment solution, rooted on an exclusivity contract from our clients.</p>
                  </div>
                </div>
                <div className="col-12 col-xl-3 col-lg-12">
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
              <div className="row align-items-xl-center">
                <div className="col-12 col-xl-4 col-lg-3">
                  <div className='rpo--card-heading'>
                    <h4 data-aos="fade-right">Project RPO</h4>
                  </div>
                </div>
                <div className="col-12 col-xl-5 col-lg-9">
                  <div className='rpo--card-desc'>
                    <p data-aos="fade">Project RPO is the way to go for companies that have a specific talent acquisition project like recruiting a new team for a new product line, or a new project, or a new facility. Our clients engage our Project RPO services for a talent acquisition need with defined goals within a specific scope and timeline.</p>
                  </div>
                </div>
                <div className="col-12 col-xl-3 col-lg-12">
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
              <div className="row align-items-xl-center">
                <div className="col-12 col-xl-4 col-lg-3">
                  <div className='rpo--card-heading'>
                    <h4 data-aos="fade-right">Contingent RPO</h4>
                  </div>
                </div>
                <div className="col-12 col-xl-5 col-lg-9">
                  <div className='rpo--card-desc'>
                    <p data-aos="fade">Contingent RPO works as an extension of the talent acquisition department and supplies contract labour using recruiters dedicated to our clients. Our recruiters build a unique talent pipeline of contract labour for our clients based on their specific hiring goals.</p>
                  </div>
                </div>
                <div className="col-12 col-xl-3 col-lg-12">
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
              <div className="row align-items-xl-center">
                <div className="col-12 col-xl-4 col-lg-3">
                  <div className='rpo--card-heading'>
                    <h4 data-aos="fade-right">RPO-Lite</h4>
                  </div>
                </div>
                <div className="col-12 col-xl-5 col-lg-9">
                  <div className='rpo--card-desc'>
                    {/* <p data-aos="fade">Best for a test-run before you decide your RPO partner. We take up hiring requirements from one or few projects on exclusivity, and close them in record time, first. The results will determine whether you want to upgrade to an Enterprise RPO (or not), based on solid proof.</p> */}
                    <p data-aos="fade">This is specifically designed for companies who would want to test run the RPO model first, and then decide. We take up hiring requirements from one or few projects on exclusivity, and close them in record time, first. The results will determine whether you want to upgrade to an Enterprise RPO (or not), based on solid proof.</p>
                  </div>
                </div>
                <div className="col-12 col-xl-3 col-lg-12">
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
                        <h2 className='home-milestone-number' data-target="210,000">0</h2>
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
                        <h2 className='home-milestone-number' data-target="450">0</h2>
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
                        <h6 className='home--milestone-title'>Total Enterprise Clients</h6>
                        <h2 className='home-milestone-number' data-target="140">0</h2>
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
                        <h2 className='home-milestone-number' data-target="1600">0</h2>
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
              {/* <div className="milestone--slider-area">
              <article className='milestone--card'>
                <div className='milestone--card-inner'>
                  <div className="milestone--arrow-area">
                    <img src="assets/img/home-images/arrow-L-white.png" className='milestone--arrow' alt="" />
                  </div>
                  <div className="milestone--content-area">
                    <div className="milestone--card-heading-area">
                      <h4>Total Registered Users Total Registered UsersTotal Registered Users</h4>
                    </div>
                    <div className="milestone--number-area">
                      <h2>530 +</h2>
                    </div>
                  </div>
                </div>
              </article>
              <article className='milestone--card'>
                <div className='milestone--card-inner'>
                  <div className="milestone--arrow-area">
                    <img src="assets/img/home-images/arrow-L-white.png" className='milestone--arrow' alt="" />
                  </div>
                  <div className="milestone--content-area">
                    <div className="milestone--card-heading-area">
                      <h4>Total Registered Users</h4>
                    </div>
                    <div className="milestone--number-area">
                      <h2>530 +</h2>
                    </div>
                  </div>
                </div>
              </article>
              <article className='milestone--card'>
                <div className='milestone--card-inner'>
                  <div className="milestone--arrow-area">
                    <img src="assets/img/home-images/arrow-L-white.png" className='milestone--arrow' alt="" />
                  </div>
                  <div className="milestone--content-area">
                    <div className="milestone--card-heading-area">
                      <h4>Total Registered Users</h4>
                    </div>
                    <div className="milestone--number-area">
                      <h2>530 +</h2>
                    </div>
                  </div>
                </div>
              </article>
            </div> */}
            </div>
          </section>
        </div>
      </div>

      <section className='custom--mobile-padding overflow-hidden'>
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
            {candidateDetail.map((candidate) => {
              const matchingImg = candidateImg ? candidateImg.find(img => img.id === candidate.id) : null;
              const imgSrc = matchingImg ? `https://skillety-n6r1.onrender.com/candidate_profile/${matchingImg.image}` : "assets/img/talents-images/avatar.jpg";
              return (
                <SwiperSlide>
                  <article className='candidate--card'>
                    <div className="candidate--profile-area">
                      <img src={imgSrc}
                        className='canidate--profile-img' alt="" />
                      <div className='candidate--name-area'>
                        <h6 className='text-capitalized'>{candidate.firstName + ' ' + candidate.lastName}</h6>
                        <div className='candidate--role'>
                          <i class="bi bi-file-earmark-code-fill"></i>
                          <span>{candidate.designation[0]}</span>
                        </div>
                      </div>
                    </div>
                    <div className='candidate--content-area'>
                      <div className="candidate--top-left">
                        {/* <div className="candidate--rate-area">
                          <i class="ri-star-fill"></i>
                          <span className='candidate--rating'>4.5</span>
                        </div> */}
                        <h6 className='candidate--exp m-0'>Experience : {candidate.year > 0 ? candidate.year + 'years' : "" + candidate.month > 0 ? candidate.month + 'months' : ""}</h6>
                      </div>
                      <div className="candidate--top-right">
                        <div className="candidate--rate-area">
                          <i class='bx bxs-map map-icon'></i>
                          <span className='candidate--rating'>{candidate.location}</span>
                        </div>
                        {/* <h6 className='candidate--exp'>Immediate Joiner</h6> */}
                      </div>
                    </div>
                    <div className="candidate--desc-area">
                      <p>{candidate.profileHeadline}</p>
                      <span className='slide-down-view'>
                        <i class="bi bi-chevron-double-down me-2"></i>
                        Scroll to view more...
                      </span>
                    </div>

                    {/* <div className="candidate--skills-area">
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
                    </div> */}
                    <a href={clientToken ? `/talents/${candidate.id}` : "/client-login"} className="candidate--arrow-icon">
                      <img src="assets/img/home-images/arrow-dark.png" alt="" />
                    </a>
                    <div className="candidate-blob"></div>
                  </article>
                </SwiperSlide>
              )
            })}


            {/* <SwiperSlide>
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

      <div className='container-fluid home--section'>
        <div className='container-fluid container-section'>
          <section className='clients--section'>
            <div className='home--about-headarea'>
              <h6 data-aos="fade-down">Our Clients</h6>
              <h4 className='client--heading' data-aos="fade-up"><span>They WORK</span> WITH US </h4>
            </div>
            <div className="clients--img-area">
              <div className="row">
                <div className="col-6 col-lg-2 col-md-4">
                  <div className="client--img-container" data-aos="flip-up">
                    <img src="assets/img/home-images/client-4.png" className='client--img' alt="" />
                    {/* <div className='client--img-blob'></div> */}
                  </div>
                </div>
                <div className="col-6 col-lg-2 col-md-4">
                  <div className="client--img-container" data-aos="flip-up">
                    <img src="assets/img/home-images/client-3.png" className='client--img' alt="" />
                    {/* <div className='client--img-blob'></div> */}
                  </div>
                </div>
                <div className="col-6 col-lg-2 col-md-4">
                  <div className="client--img-container" data-aos="flip-up">
                    <img src="assets/img/home-images/client-2.png" className='client--img' alt="" />
                    {/* <div className='client--img-blob'></div> */}
                  </div>
                </div>
                <div className="col-6 col-lg-2 col-md-4">
                  <div className="client--img-container" data-aos="flip-up">
                    <img src="assets/img/home-images/client-1.png" className='client--img' alt="" />
                    {/* <div className='client--img-blob'></div> */}
                  </div>
                </div>
                <div className="col-6 col-lg-2 col-md-4">
                  <div className="client--img-container" data-aos="flip-up">
                    <img src="assets/img/home-images/client-4.png" className='client--img' alt="" />
                    {/* <div className='client--img-blob'></div> */}
                  </div>
                </div>
                <div className="col-6 col-lg-2 col-md-4">
                  <div className="client--img-container" data-aos="flip-up">
                    <img src="assets/img/home-images/client-3.png" className='client--img' alt="" />
                    {/* <div className='client--img-blob'></div> */}
                  </div>
                </div>
                <div className="col-6 col-lg-2 col-md-4">
                  <div className="client--img-container" data-aos="flip-up">
                    <img src="assets/img/home-images/client-1.png" className='client--img' alt="" />
                    {/* <div className='client--img-blob'></div> */}
                  </div>
                </div>
                <div className="col-6 col-lg-2 col-md-4">
                  <div className="client--img-container" data-aos="flip-up">
                    <img src="assets/img/home-images/client-2.png" className='client--img' alt="" />
                    {/* <div className='client--img-blob'></div> */}
                  </div>
                </div>
                <div className="col-6 col-lg-2 col-md-4">
                  <div className="client--img-container" data-aos="flip-up">
                    <img src="assets/img/home-images/client-1.png" className='client--img' alt="" />
                    {/* <div className='client--img-blob'></div> */}
                  </div>
                </div>
                <div className="col-6 col-lg-2 col-md-4">
                  <div className="client--img-container" data-aos="flip-up">
                    <img src="assets/img/home-images/client-4.png" className='client--img' alt="" />
                    {/* <div className='client--img-blob'></div> */}
                  </div>
                </div>
                <div className="col-6 col-lg-2 col-md-4">
                  <div className="client--img-container" data-aos="flip-up">
                    <img src="assets/img/home-images/client-3.png" className='client--img' alt="" />
                    {/* <div className='client--img-blob'></div> */}
                  </div>
                </div>
                <div className="col-6 col-lg-2 col-md-4">
                  <div className="client--img-container" data-aos="flip-up">
                    <img src="assets/img/home-images/client-2.png" className='client--img' alt="" />
                    {/* <div className='client--img-blob'></div> */}
                  </div>
                </div>
                <div className="col-6 col-lg-2 col-md-4">
                  <div className="client--img-container" data-aos="flip-up">
                    <img src="assets/img/home-images/client-4.png" className='client--img' alt="" />
                    {/* <div className='client--img-blob'></div> */}
                  </div>
                </div>
                <div className="col-6 col-lg-2 col-md-4">
                  <div className="client--img-container" data-aos="flip-up">
                    <img src="assets/img/home-images/client-3.png" className='client--img' alt="" />
                    {/* <div className='client--img-blob'></div> */}
                  </div>
                </div>
                <div className="col-6 col-lg-2 col-md-4">
                  <div className="client--img-container" data-aos="flip-up">
                    <img src="assets/img/home-images/client-2.png" className='client--img' alt="" />
                    {/* <div className='client--img-blob'></div> */}
                  </div>
                </div>
                <div className="col-6 col-lg-2 col-md-4">
                  <div className="client--img-container" data-aos="flip-up">
                    <img src="assets/img/home-images/client-1.png" className='client--img' alt="" />
                    {/* <div className='client--img-blob'></div> */}
                  </div>
                </div>
                <div className="col-6 col-lg-2 col-md-4">
                  <div className="client--img-container" data-aos="flip-up">
                    <img src="assets/img/home-images/client-4.png" className='client--img' alt="" />
                    {/* <div className='client--img-blob'></div> */}
                  </div>
                </div>
                <div className="col-6 col-lg-2 col-md-4">
                  <div className="client--img-container" data-aos="flip-up">
                    <img src="assets/img/home-images/client-3.png" className='client--img' alt="" />
                    {/* <div className='client--img-blob'></div> */}
                  </div>
                </div>
              </div>
            </div>
          </section>

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
                      <button onClick={() => openModal('video')} className='testi-sm-play-buttonarea custom-padding'>
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
                      <button onClick={() => openModal('audio')} className='testi-sm-play-buttonarea'>
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
                        <a href="" className='connect--btn-sub'>
                          <div className='connect--btn'>
                            CALL US
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
                        <a href="mailto:info@skillety.com" className='connect--btn-sub'>
                          <div className='connect--btn'>
                            EMAIL US
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
                            MEET US
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

      {/*Media Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Player Modal"
        className={`media-modal-content ${isModalOpen ? 'open' : ''}`}
        overlayClassName={`media-modal-overlay ${isModalOpen ? 'open' : ''}`}
      >
        {playerType === 'video' && (
          <ReactPlayer
          className="player"
            url="../assets/media/sample-video2.mp4"
            controls
            width="100%"
            height="100%"
            muted={true}
            frameRate={60}
          />
        )}

        {playerType === 'audio' && (
          <ReactPlayer
            url="../assets/media/sample-audio.mp3"
            controls
            width="100%"
            height="50px"
            muted={true}  
          />
        )}

        <button className="media-close-button" onClick={closeModal}>
          <i className='bi bi-x'></i>
        </button>
      </Modal>
      <Footer />
    </div>
  )
}

export default Home;
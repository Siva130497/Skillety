import React, { useContext } from 'react';
import { useEffect, useRef } from 'react';
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
import { useNavigate } from 'react-router-dom';

const HomeCandidate = () => {
  const [candidateToken, setcandidateToken] = useState("");
  const navigate = useNavigate();
  const [candidateHomeContent, setCandidateHomeContent] = useState([]);
  const { eventDetail, getEventDetail, getEventImg, eventImg, blogDetail, getBlogsDetail,
    videoDetail, getVideoDetail, podcastDetail, getPodcastDetail, newsDetail, getNewsDetail, getClientImg, clientImg } = useContext(AuthContext);
  const [allJobs, setAllJobs] = useState([]);
  const [allCompany, setAllCompany] = useState([]);

  const [skillArray, setSkillArray] = useState([]);
  const [jobRoleArray, setjobRoleArray] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [selectedResults, setSelectedResults] = useState([]);
  const [searchInput, setSearchinput] = useState("");

  const [popularSearches, setPopulartSearches] = useState([]);
  const searchBtnRef = useRef(null);

  useEffect(()=>{
    axios.get("https://skillety-n6r1.onrender.com/web-content?ids=content_1,content_3,content_4,content_5,content_6,content_7,content_8,content_9,content_10,content_11,content_12,content_66")
    .then(res=>{
      console.log(res.data);
      setCandidateHomeContent(res.data);
    }).catch(err=>console.log(err));
  },[])

  useEffect(() => {
    setcandidateToken(JSON.parse(localStorage.getItem('candidateToken')))
  }, [candidateToken]);

  const getPostedjobs = async () => {
    try {
      const res = await axios.get(`https://skillety-n6r1.onrender.com/posted-jobs`, {
        headers: {
          Accept: 'application/json'
        }
      });
      const result = res.data;
      if (!result.error) {
        console.log(result);
        setAllJobs(result);
      } else {
        console.log(result);
      }
    } catch (err) {
      console.log(err);
    }
  }

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
    getEventDetail();
    getEventImg();
    getBlogsDetail();
    // getBlogImg();
    getVideoDetail();
    // getVideoImg();
    getPodcastDetail();
    // getPodcastImg();
    getNewsDetail();
    // getNewsImg();
    getPostedjobs();
    getClientImg();
    getAllSkills();
    getAllJobRoles();
    getPopularSearches();

    // axios.get("https://skillety-n6r1.onrender.com/clients")
    //   .then(res => {
    //     const allClients = res.data;

    //     // Create a Map to store unique objects based on companyId
    //     const uniqueClientsMap = new Map();

    //     // Iterate through all clients and store only unique objects in the Map
    //     allClients.forEach(client => {
    //       uniqueClientsMap.set(client.companyId, client);
    //     });

    //     // Convert the Map values back to an array
    //     const uniqueClientsArray = Array.from(uniqueClientsMap.values());

    //     console.log(uniqueClientsArray);
    //     setAllClient(uniqueClientsArray);
    //   })
    //   .catch(err => console.log(err));

    axios.get("https://skillety-n6r1.onrender.com/company-details")
      .then(res => {
        console.log(res.data);
        setAllCompany(res.data);
      })
      .catch(err => {
        console.log(err);
      })


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
      slidesPerView: 3.5,
    },
    1400: {
      slidesPerView: 4.5,
    },
  };

  const handleSearch = (e) => {
    const inputValue = e.target.value;
    setSearchinput(inputValue);

    if (inputValue.length > 0) {
      const skillsObj = skillArray.filter((obj) => {
        return obj.skill.toLowerCase().includes(inputValue.toLowerCase());
    });

    const jobRolesObj = jobRoleArray.filter((obj) => {
        return obj.designation.toLowerCase().includes(inputValue.toLowerCase());
    });

    const skills = skillsObj.map(skill=>skill.skill);
    const jobRoles = jobRolesObj.map(jobRole=>jobRole.designation);

    function combineArraysUnique(arr1, arr2) {
        const combinedSet = new Set([...arr1, ...arr2]);
        return Array.from(combinedSet);
    }
    
    const combinedResults = combineArraysUnique(skills, jobRoles);

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
        navigate('/job-search', { state: { keywords } });
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    $(".home--search-btn").click(function () {
      setTimeout(function () {
        $("html, body").animate({ scrollTop: 0 }, 500);
      }, 0);
    });

    // const handleKeyDown = (event) => {
    //   if (event.key === 's' && event.altKey) {
    //     event.preventDefault();
    //     const inputElement = document.getElementById('searchSkillInput');
    //     if (inputElement) {
    //       inputElement.focus();
    //     }
    //   }
    // };

    // document.addEventListener('keydown', handleKeyDown);

    // return () => {
    //   document.removeEventListener('keydown', handleKeyDown);
    // };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter' && searchBtnRef.current && !searchBtnRef.current.disabled) {
        searchBtnRef.current.click();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

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
                    {candidateHomeContent.find(content=>content.id === "content_1")?.content ||
                    "Welcome to the only Job Portal for Immediate Joiners in the world."}
                  </h4>
                  {/* <h3 data-aos="fade-left" data-aos-delay="200">Choose from over 2400+ Jobs.</h3>
                  <h5 data-aos="fade-left" data-aos-delay="200">
                    Welcome to the place where you get hired in less than 7 days. Grab your Interview in 24 hours.
                  </h5> */}
                  <h6 data-aos="fade-right" data-aos-delay="300">
                  {candidateHomeContent.find(content=>content.id === "content_3")?.content ||
                    "Choose from over 2400+ Jobs. Get Interviewed within 24 Hours."}
                  </h6>
                </div>
                <div className="home--search-area candidate">
                  <div className='home-search-badge-area mb-4'>
                    {selectedResults.map(selectResult => (
                      <span className="home-search-badge candidate"
                        key={selectResult}
                        onClick={() => handleDeselect(selectResult)}
                      >{selectResult}</span>
                    ))}
                  </div>

                  <div className='position-relative'>
                    <input type="search" data-aos="fade-left" data-aos-delay="200" className='home--search-box candidate form-control'
                      placeholder='Enter keywords like skills, designation'
                      value={searchInput}
                      id='searchSkillInput'
                      onChange={handleSearch}
                    />
                    {/* <div className="short-cut" data-aos="zoom-in">
                      <span className="short-cut-key">Alt + S</span>
                    </div> */}
                    <i class="bi bi-search home--search-icon" data-aos="zoom-in" data-aos-delay="200"></i>
                  </div>

                  <div className='home-search-result-data-area candidate'>
                    {filteredList.length > 0 &&
                      filteredList.map((filterResult, index) => (
                        <div
                          className='home-search-result-data candidate'
                          key={index}
                          onClick={() => handleFilteredClick(filterResult)}
                        >
                          {filterResult}
                        </div>
                      ))}
                  </div>
                  <button ref={searchBtnRef} className='btn home--search-btn candidate' data-aos="fade-left" data-aos-delay="100"
                    onClick={handlePopularSearch} disabled={selectedResults.length === 0}>Search</button>
                </div>
                {popularSearches.length > 0 && <div className="home--popular-area candidate">
                  <h6 data-aos="fade-right">Popular Searches</h6>
                  <div className="popular--btn-area candidate">
                    {popularSearches.map(pop => {
                      return (
                        <button onClick={() => handleFilteredClick(pop.keyword)} className='btn home--popular-btn candidate' data-aos="fade-up" data-aos-delay="150">{pop.keyword}</button>
                      )
                    })}

                    {/* <a href="" className='btn home--popular-btn candidate' data-aos="fade-up" data-aos-delay="100">Marketing</a>
                    <a href="" className='btn home--popular-btn candidate' data-aos="fade-up" data-aos-delay="100">Finance</a>
                    <a href="" className='btn home--popular-btn candidate' data-aos="fade-up" data-aos-delay="50">IT</a>
                    <a href="" className='btn home--popular-btn candidate' data-aos="fade-up" data-aos-delay="50">Engineering</a>
                    <a href="" className='btn home--popular-btn candidate' data-aos="fade-up" data-aos-delay="0">Sales</a>
                    <a href="" className='btn home--popular-btn candidate' data-aos="fade-up" data-aos-delay="0">Retail</a> */}
                  </div>
                </div>}

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

                {!candidateToken &&
                  <div className="home--card-area">
                    <div className="row">
                      <div className="col-xl-9 col-xxl-9 col-lg-12 col-md-12 offset-xl-3 offset-xxl-3">
                        <div className="card home--card candidate" data-aos="fade-right" data-aos-delay="100">
                          <div className="card--imgicon-area">
                            <h6 className='card--text candidate'>I am an immediate joiner</h6>
                            <img src="assets/img/home-images/clipboard-img.png" className='card--icon candidate' alt="" />
                          </div>
                          <div className="home--sub-des candidate">
                            <p>
                              You're just One Click away from the best opportunities.
                            </p>
                          </div>
                          <a href='/candidate-login' className="arrow--icon-btn candidate">
                            <img src="assets/img/home-images/arrow-dark.png" className='arrow--icon' alt="" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                }

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
                        At Skillety, we believe in the power of connecting talent with opportunity, and our journey is defined by the milestones we achieve along the way. As we reflect on our progress, we are thrilled to share some remarkable statistics that highlight our impact in the realm of talent acquisition. Since our inception, Skillety has been instrumental in facilitating countless career advancements and organizational growth. With a steadfast commitment to excellence, our platform has become a beacon for both job seekers and employers alike.
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
                        <h6 className='home--milestone-title'>
                        {candidateHomeContent.find(content=>content.id === "content_4")?.content ||
                          "Number of jobs"}</h6>
                        <h2 className='home-milestone-number candidate' data-target=
                        {candidateHomeContent.find(content=>content.id === "content_5")?.content ||
                        "130"}>0</h2>
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
                        <h6 className='home--milestone-title'>
                        {candidateHomeContent.find(content=>content.id === "content_6")?.content ||
                          "Registrations per day"}</h6>
                        <h2 className='home-milestone-number candidate' data-target=
                        {candidateHomeContent.find(content=>content.id === "content_7")?.content ||
                        "200"}>0</h2>
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
                        <h6 className='home--milestone-title'>
                        {candidateHomeContent.find(content=>content.id === "content_8")?.content ||
                          "Number of companies"}</h6>
                        <h2 className='home-milestone-number candidate' data-target=
                        {candidateHomeContent.find(content=>content.id === "content_66")?.content ||
                        "202"}>0</h2>
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
                        <h6 className='home--milestone-title'>
                        {candidateHomeContent.find(content=>content.id === "content_9")?.content ||
                          "Number of placements till now"}</h6>
                        <h2 className='home-milestone-number candidate' data-target=
                        {candidateHomeContent.find(content=>content.id === "content_10")?.content ||
                        "147"}>0</h2>
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
                        <h6 className='home--milestone-title'>
                        {candidateHomeContent.find(content=>content.id === "content_11")?.content ||
                          "Locations covered"}</h6>
                        <h2 className='home-milestone-number candidate' data-target=
                        {candidateHomeContent.find(content=>content.id === "content_12")?.content ||
                        "110"}>0</h2>
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
              {allCompany
                .filter(company => {
                  const jobOpening = allJobs.filter(job => job.companyId === company.companyId).length;
                  return allCompany.length > 0 && jobOpening > 0;
                })
                .sort((a, b) => {
                  const jobOpeningA = allJobs.filter(job => job.companyId === a.companyId).length;
                  const jobOpeningB = allJobs.filter(job => job.companyId === b.companyId).length;
                  return jobOpeningB - jobOpeningA;
                })
                .slice(0, 5)
                .map(company => {
                  const matchingImg = clientImg ? clientImg.find(img => img.id === company.companyId) : null;
                  const imgSrc = matchingImg ? `data:image/jpeg;base64,${matchingImg.image}` : "../assets/img/talents-images/no-image1.png";
                  const jobOpening = allJobs.filter(job => job.companyId === company.companyId).length;

                  return (
                    <div key={company.companyId} className="row company--content-row custom-row-border-top">
                      <div className="col-12 col-xl-2 col-lg-2 col-sm-4 col-md-4 company--content-img-area">
                        <img src={imgSrc} data-aos="fade" className='company--content-img cand-home' loading='lazy' alt="" />
                      </div>
                      <div className="col-12 col-xl-3 col-lg-3 col-sm-4 col-md-4 company--content-jobs-area">
                        <div className='home-company-name mt-2' data-aos="zoom-out">{company.companyName}</div>
                        <div className='company--content-jobs' data-aos="zoom-out">{jobOpening}<span> Jobs Opening</span></div>
                      </div>

                      <div className="col-12 col-xl-3 col-lg-3 col-sm-4 col-md-4 company--content-jobs-area">
                        <div className='company--content-industry' data-aos="zoom-out">{company.industry}</div>
                      </div>

                      <div className="col-12 col-xl-4 col-lg-4 col-md-12 company--content-desc-area">
                        <p className='company--content-desc' data-aos="fade-right">{company.shortDescription}</p>
                        <div className='company--content-apply-btn-area' data-aos="fade-right">
                          <a href={`/company-info/${company.companyId}`} className='company--content-apply-btn'>
                            <div className='company--content-apply-btn-sub'>
                              Apply Now
                            </div>
                            <div className='company--content-apply-arrow'>
                              <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 15 15" fill="none">
                                <path d="M2.10205 2.10666C4.02798 3.73629 9.03538 5.84 13.6576 1.21777" stroke="#5C3B2E" strokeWidth="2" />
                                <path d="M13.8327 1.04564C11.9705 2.74763 9.24438 7.44531 13.2383 12.6201" stroke="#5C3B2E" strokeWidth="2" />
                                <path d="M1.2666 14.1331L14.1555 0.799805" stroke="#5C3B2E" strokeWidth="2" />
                              </svg>
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
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
              <a href="/job-search" className='home--know-more candidate' data-aos="fade-right">
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
              const imgSrc = matchingImg ? `data:image/jpeg;base64,${matchingImg.image}` : "../assets/img/talents-images/no-image1.png";
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
                      <div className="cand--job-card-loc-area mt-3">
                        <div className="cand--job-card-location">
                          <i class="bi bi-geo-alt-fill"></i>
                          {job?.location.join(", ")}
                        </div>
                        <div className="cand--job-card-location mt-1">
                          <i class="bi bi-briefcase-fill job-icon"></i>
                          {job.jobCategory}
                        </div>
                      </div>
                    </div>
                    <div className="cand--job-card-desc-area">
                      <p className='cand--job-card-desc'>
                        {job.jobDescription}
                      </p>
                      {/* <span className='slide-down-view'>
                        <i class="bi bi-chevron-double-down me-2"></i>
                        Scroll to view more...
                      </span> */}
                    </div>
                    <a href={candidateToken ? `/job-detail/${job.id}` : `/candidate-login`} className="cand--job-card-bottom-area">
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


      {(eventDetail.length > 0 || blogDetail.length > 0 || videoDetail.length > 0 || podcastDetail.length > 0 || newsDetail.length > 0) &&
        <section className='custom--mobile-padding candidate cand--home-event-section'>
          <div className='candidate--section candidate'>
            <div className='home--about-toparea'>
              <div className='home--about-headarea'>
                <h6 data-aos="fade-down">Media</h6>
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
              {[eventDetail, blogDetail, videoDetail, podcastDetail, newsDetail].map((detailArray) => {
                const lastTwoItems = detailArray.slice(-2);

                return lastTwoItems.map((item) => {
                  const matchingImg = eventImg ? eventImg.find((img) => img.id === item.id) : null;
                  const imgSrc = matchingImg ? `data:image/jpeg;base64,${matchingImg.image}` : "assets/img/events/event-img.jpg";

                  return (
                    <SwiperSlide key={item.id}>
                      <article className='cand--events-card candidate'>

                        {item.type === "event" ?
                          <div className="media-label">
                            <i class="bi bi-calendar2-event-fill"></i>
                            <span>Event</span>
                          </div>
                          : item.type === "blog" ?
                            <div className="media-label">
                              <i class="bi bi-chat-left-text-fill"></i>
                              <span>Blog</span>
                            </div>
                            : item.type === "video" ?
                              <div className="media-label">
                                <i class="bi bi-camera-video-fill"></i>
                                <span>Video</span>
                              </div>
                              : item.type === "podcast" ?
                                <div className="media-label">
                                  <i class="bi bi-mic-fill"></i>
                                  <span>Podcast</span>
                                </div>
                                :
                                <div className="media-label">
                                  <i class="bi bi-newspaper"></i>
                                  <span>News</span>
                                </div>
                        }

                        <div className="cand--events-card-img-area">
                          <img src={imgSrc} className='cand--events-card-img' alt="" />
                        </div>
                        <div className="cand--events-card-title-area">
                          <h6 className='cand--events-card-title'>
                            {item.title}
                          </h6>
                        </div>
                        <p className='cand--events-card-date'>
                          {item.date} <b className='text-capitalized'>{item.location}</b>
                        </p>
                        <a
                          href={item.type === "event" ? `/event-details/${item.id}` : item.url}
                          target={item.type === "event" ? `` : `_blank`}
                          className="cand--events-card-bottom-area">
                          <span className='cand--event-sys'>Know More</span>
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
                })
              })}
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

      {!candidateToken &&
        <div className='container-fluid home--section candidate register'>
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
      }

      <CandidateFooter />
    </div>
  )
}

export default HomeCandidate
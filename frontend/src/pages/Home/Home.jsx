import React from 'react'
import './Home.css'

const Home = () => {

  return (
    // <div className="jumbotron">
    //   <h1>Hi, Welcome to Skillety!!!</h1>
    //   <hr className="my-4" />
    //   <p>
    //     The exclusive Job Board for Immediate Joiners.
    //     <br />
    //     Grab your free DEMO in just a few seconds!
    //   </p>    
    // </div>
    <div className='home--section'>
      <div className='container-fluid container-section'>
        <div className="home--bg">
          <div className="row">
            <div className="col-12 col-lg-7 col-md-12 home--left-cover">
              <div className="home--head">
                <h5>
                  Welcome to the world’s first Recruitment Solutions Integrator, powered by an exclusive job board for Immediate Joiners.
                </h5>
                <h6>
                  Search For Talents
                </h6>
              </div>
              <div className="home--search-area">
                <input type="text" className='home--search-box form-control' placeholder='Search for skills' />
                <i class="bi bi-search home--search-icon"></i>
                <button className='btn home--search-btn'>Search</button>
              </div>
              <div className="home--popular-area">
                <h6>Popular Searches</h6>
                <div className="popular--btn-area">
                  <a href="" className='btn home--popular-btn'>UI Designer</a>
                  <a href="" className='btn home--popular-btn'>Marketing</a>
                  <a href="" className='btn home--popular-btn'>Finance</a>
                  <a href="" className='btn home--popular-btn'>IT</a>
                  <a href="" className='btn home--popular-btn'>Engineering</a>
                  <a href="" className='btn home--popular-btn'>Sales</a>
                  <a href="" className='btn home--popular-btn'>Retail</a>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-5 col-md-12 home--right-cover">
              <div>
                <div className="home--img-area">
                  <img src="assets/img/home-images/header-image.png"
                    className='home--img' alt="" />
                  <img src="assets/img/home-images/bubble-1.png" className='bubble--img1' alt="" />
                  <img src="assets/img/home-images/bubble-2.png" className='bubble--img2' alt="" />
                  <img src="assets/img/home-images/bubble-3.png" className='bubble--img3' alt="" />
                  <img src="assets/img/home-images/bubble-2.png" className='bubble--img4' alt="" />
                  <img src="assets/img/home-images/bubble-4.png" className='bubble--img5' alt="" />
                  <img src="assets/img/home-images/bubble-4.png" className='bubble--img6' alt="" />
                  <img src="assets/img/home-images/bubble-4.png" className='bubble--img7' alt="" />
                </div>

                <div className="home--card-area">
                  <div className="row">
                    <div className="col-lg-8 col-md-12 offset-lg-4">
                      <div className="card home--card">
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
                          <img src="assets/img/home-images/arrow-img.png" className='arrow--icon' alt="" />
                        </a>
                      </div>
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
              <h6>About Us</h6>
              <h4 className='about--heading'><span>Skillety</span> simply means <span>“Skill at Will”.</span></h4>
            </div>
            <div className='home--know-more-area'>
              <a href="#" className='home--know-more'>
                <div className='home--know-more-btn'>Know more
                </div>
                <div className='home--know-more-arrow'>
                  <img src="assets/img/home-images/arrow-img.png" className='knowmore--arrow' alt="" />
                </div>
              </a>
            </div>
          </div>
          <div className="home--about-para">
            <p>We are a gig-economy based crowdsourcing platform for Freelancers. We have an exclusive vault of Immediate Joiners - guys who can pick up an Offer and Join within 7 days or less. We have curated a group of Technical Interview experts for Clients who face shortage of internal Interview Panels. We help you to move away from the old and soiled hierarchical business structure, and evolve into a 21st Century on-demand, open talent, cross-functional team; with a skilled and passionate workforce who are more engaged, effective & productive. Welcome to Skillety – Your on-demand HR solutions partner.</p>
          </div>
        </section>

        <section className='home--service-section'>
          <div className="home--service-head-area">
            <div className='home--about-headarea'>
              <h6>Services</h6>
              <h3 className='service--heading'>OUR SERVICES</h3>
            </div>
            <div className="home--service-para">
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
            </div>
            <div className="home--services-slider-area">
              <div className="row">
                <div className="col-12 col-lg-7">
                  <article className='home--service-card'>
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
                        <a href="#" className='service--know-more'>
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
                <div className="col-12 col-lg-7 offset-lg-5">
                  <article className='home--service-card'>
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
                        <a href="#" className='service--know-more'>
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
                <div className="col-12 col-lg-7">
                  <article className='home--service-card'>
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
                        <a href="#" className='service--know-more'>
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
          </div>
        </section>

        <section className="home--rpo-section">
          <div className='home--about-headarea'>
            <h6>RPO types</h6>
            <h4 className='rpo--heading'><span>We enhance</span> client <span>recruitment</span> through <br /> comprehensive <span>end-to-end outsourcing</span></h4>
          </div>
          <div className="rpo--para-area">
            <p>We improve the efficiency and effectiveness of the client’s recruitment process by providing an end-to-end outsourcing solution for the recruitment process.</p>
          </div>
          <div className="rpo--content-card">
            <div className="row align-items-center">
              <div className="col-12 col-lg-4">
                <div className='rpo--card-heading'>
                  <h4>Enterprise RPO</h4>
                </div>
              </div>
              <div className="col-12 col-lg-5">
                <div className='rpo--card-desc'>
                  <p>From requisition to onboarding, Skillety offers recruitment expertise and scalability while being completely aligned with our clients’ culture. Enterprise RPO is a comprehensive, customizable, and scalable recruitment solution, rooted on an exclusivity contract from our clients.</p>
                </div>
              </div>
              <div className="col-12 col-lg-3">
                <div className='rpo--card-learnmore'>
                  <a href="#" className='rpo--know-more'>
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
              <div className="col-12 col-lg-4">
                <div className='rpo--card-heading'>
                  <h4>Project RPO</h4>
                </div>
              </div>
              <div className="col-12 col-lg-5">
                <div className='rpo--card-desc'>
                  <p>Project RPO is the way to go for companies that have a specific talent acquisition project like recruiting a new team for a new product line, or a new project, or a new facility. Our clients engage our Project RPO services for a talent acquisition need with defined goals within a specific scope and timeline.</p>
                </div>
              </div>
              <div className="col-12 col-lg-3">
                <div className='rpo--card-learnmore'>
                  <a href="#" className='rpo--know-more'>
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
              <div className="col-12 col-lg-4">
                <div className='rpo--card-heading'>
                  <h4>Contingent RPO</h4>
                </div>
              </div>
              <div className="col-12 col-lg-5">
                <div className='rpo--card-desc'>
                  <p>Contingent RPO works as an extension of the talent acquisition department and supplies contract labour using recruiters dedicated to our clients. Our recruiters build a unique talent pipeline of contract labour for our clients based on their specific hiring goals.</p>
                </div>
              </div>
              <div className="col-12 col-lg-3">
                <div className='rpo--card-learnmore'>
                  <a href="#" className='rpo--know-more'>
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
              <div className="col-12 col-lg-4">
                <div className='rpo--card-heading'>
                  <h4>RPO-Lite</h4>
                </div>
              </div>
              <div className="col-12 col-lg-5">
                <div className='rpo--card-desc'>
                  <p>Best for a test-run before you decide your RPO partner. We take up hiring requirements from one or few projects on exclusivity, and close them in record time, first. The results will determine whether you want to upgrade to an Enterprise RPO (or not), based on solid proof.</p>
                </div>
              </div>
              <div className="col-12 col-lg-3">
                <div className='rpo--card-learnmore'>
                  <a href="#" className='rpo--know-more'>
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
              <h6>Services</h6>
              <h3 className='milestone--heading'>Achieving <span>Milestones</span></h3>
            </div>
            <div className="milestone--slider-area">
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
            </div>
          </div>
        </section>

        <section className='candidate--section'>
          <div className='home--about-toparea'>
            <div className='home--about-headarea'>
              <h6>Candidate Profile</h6>
              <h4 className='candidate--heading'><span>Connect</span> with Diverse <br /> Professionals and <span>Elevate</span><br /> <span>Your Brand</span></h4>
            </div>
            <div className='home--know-more-area'>
              <a href="#" className='home--know-more'>
                <div className='home--know-more-btn'>More Talents
                </div>
                <div className='home--know-more-arrow'>
                  <img src="assets/img/home-images/arrow-img.png" className='knowmore--arrow' alt="" />
                </div>
              </a>
            </div>
          </div>
          <div className="candidate--slider-area">
            <div className="row">
              <div className="col-12 col-lg-4">
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
                  <div className="candidate--arrow-icon">
                    <img src="assets/img/home-images/arrow-dark.png" alt="" />
                  </div>
                  <div className="candidate-blob"></div>
                </article>
              </div>
              <div className="col-12 col-lg-4">
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
                  <div className="candidate--arrow-icon">
                    <img src="assets/img/home-images/arrow-dark.png" alt="" />
                  </div>
                  <div className="candidate-blob"></div>
                </article>
              </div>
              <div className="col-12 col-lg-4">
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
                  <div className="candidate--arrow-icon">
                    <img src="assets/img/home-images/arrow-dark.png" alt="" />
                  </div>
                  <div className="candidate-blob"></div>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className='clients--section'>
          <div className='home--about-headarea'>
            <h6>Our Clients</h6>
            <h4 className='client--heading'><span>They WORK</span> WITH US </h4>
          </div>
          <div className="clients--img-area">
            <div className="row">
              <div className="col-6 col-lg-2 col-md-4">
                <div className="client--img-container">
                  <img src="assets/img/home-images/client-4.png" className='client--img' alt="" />
                  <div className='client--img-blob'></div>
                </div>
              </div>
              <div className="col-6 col-lg-2 col-md-4">
                <div className="client--img-container">
                  <img src="assets/img/home-images/client-3.png" className='client--img' alt="" />
                  <div className='client--img-blob'></div>
                </div>
              </div>
              <div className="col-6 col-lg-2 col-md-4">
                <div className="client--img-container">
                  <img src="assets/img/home-images/client-2.png" className='client--img' alt="" />
                  <div className='client--img-blob'></div>
                </div>
              </div>
              <div className="col-6 col-lg-2 col-md-4">
                <div className="client--img-container">
                  <img src="assets/img/home-images/client-1.png" className='client--img' alt="" />
                  <div className='client--img-blob'></div>
                </div>
              </div>
              <div className="col-6 col-lg-2 col-md-4">
                <div className="client--img-container">
                  <img src="assets/img/home-images/client-4.png" className='client--img' alt="" />
                  <div className='client--img-blob'></div>
                </div>
              </div>
              <div className="col-6 col-lg-2 col-md-4">
                <div className="client--img-container">
                  <img src="assets/img/home-images/client-3.png" className='client--img' alt="" />
                  <div className='client--img-blob'></div>
                </div>
              </div>
              <div className="col-6 col-lg-2 col-md-4">
                <div className="client--img-container">
                  <img src="assets/img/home-images/client-1.png" className='client--img' alt="" />
                  <div className='client--img-blob'></div>
                </div>
              </div>
              <div className="col-6 col-lg-2 col-md-4">
                <div className="client--img-container">
                  <img src="assets/img/home-images/client-2.png" className='client--img' alt="" />
                  <div className='client--img-blob'></div>
                </div>
              </div>
              <div className="col-6 col-lg-2 col-md-4">
                <div className="client--img-container">
                  <img src="assets/img/home-images/client-1.png" className='client--img' alt="" />
                  <div className='client--img-blob'></div>
                </div>
              </div>
              <div className="col-6 col-lg-2 col-md-4">
                <div className="client--img-container">
                  <img src="assets/img/home-images/client-4.png" className='client--img' alt="" />
                  <div className='client--img-blob'></div>
                </div>
              </div>
              <div className="col-6 col-lg-2 col-md-4">
                <div className="client--img-container">
                  <img src="assets/img/home-images/client-3.png" className='client--img' alt="" />
                  <div className='client--img-blob'></div>
                </div>
              </div>
              <div className="col-6 col-lg-2 col-md-4">
                <div className="client--img-container">
                  <img src="assets/img/home-images/client-2.png" className='client--img' alt="" />
                  <div className='client--img-blob'></div>
                </div>
              </div>
              <div className="col-6 col-lg-2 col-md-4">
                <div className="client--img-container">
                  <img src="assets/img/home-images/client-4.png" className='client--img' alt="" />
                  <div className='client--img-blob'></div>
                </div>
              </div>
              <div className="col-6 col-lg-2 col-md-4">
                <div className="client--img-container">
                  <img src="assets/img/home-images/client-3.png" className='client--img' alt="" />
                  <div className='client--img-blob'></div>
                </div>
              </div>
              <div className="col-6 col-lg-2 col-md-4">
                <div className="client--img-container">
                  <img src="assets/img/home-images/client-2.png" className='client--img' alt="" />
                  <div className='client--img-blob'></div>
                </div>
              </div>
              <div className="col-6 col-lg-2 col-md-4">
                <div className="client--img-container">
                  <img src="assets/img/home-images/client-1.png" className='client--img' alt="" />
                  <div className='client--img-blob'></div>
                </div>
              </div>
              <div className="col-6 col-lg-2 col-md-4">
                <div className="client--img-container">
                  <img src="assets/img/home-images/client-4.png" className='client--img' alt="" />
                  <div className='client--img-blob'></div>
                </div>
              </div>
              <div className="col-6 col-lg-2 col-md-4">
                <div className="client--img-container">
                  <img src="assets/img/home-images/client-3.png" className='client--img' alt="" />
                  <div className='client--img-blob'></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className='testimonial--section'>
          <div className='home--about-toparea'>
            <div className='home--about-headarea'>
              <h6>Testimonials</h6>
              <h4 className='candidate--heading'>WHAT THEY SAY ABOUT US</h4>
            </div>
            <div className='home--know-more-area'>
              <a href="#" className='home--know-more'>
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
              <div className="col-12 col-lg-7 col-md-12">
                <article className="testimonial--card-lg">
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
                  <div className='testimonial--arrow-area'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="65" viewBox="0 0 55 56" fill="none">
                      <path d="M5.25812 7.09628C12.7692 13.4518 32.2979 21.6562 50.3244 3.62964" stroke="white" stroke-width="4" />
                      <path d="M51.0082 2.95734C43.7453 9.59507 33.1137 27.9159 48.69 48.0973" stroke="white" stroke-width="4" />
                      <path d="M2 53.9998L52.2663 2.00024" stroke="white" stroke-width="4" />
                    </svg>
                  </div>
                </article>
              </div>
              <div className="col-12 col-lg-5 col-md-12">
                <article className='testimonial--card-sm test--card-bg1 mb-4'>
                  <div className="testimonial-sm--profile-area">
                    <img src="assets/img/home-images/testi-profile.jpeg" className='testimonial--sm-profile-img' alt="" />
                    <div className="testimonial-sm--profile">
                      <h5>KAVITHA KATKAM</h5>
                      <p>Senior Manager Talent Acquisition, IVY Software Development Services Pvt. Ltd.</p>
                    </div>
                    <div className='testi-sm-play-buttonarea custom-padding'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="39" viewBox="0 0 25 39" fill="none">
                        <path d="M24.0399 19.9498L0.00167296 38.7892L0.126028 0.952834L24.0399 19.9498Z" fill="white" />
                      </svg>
                    </div>
                  </div>
                </article>
                <article className='testimonial--card-sm test--card-bg2 mt-4'>
                  <div className="testimonial-sm--profile-area">
                    <img src="assets/img/home-images/testi-profile.jpeg" className='testimonial--sm-profile-img' alt="" />
                    <div className="testimonial-sm--profile">
                      <h5>KAVITHA KATKAM</h5>
                      <p>Senior Manager Talent Acquisition, IVY Software Development Services Pvt. Ltd.</p>
                    </div>
                    <div className='testi-sm-play-buttonarea'>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="45" height="45">
                        <path fill="white" d="M2 16.0001H5.88889L11.1834 20.3319C11.2727 20.405 11.3846 20.4449 11.5 20.4449C11.7761 20.4449 12 20.2211 12 19.9449V4.05519C12 3.93977 11.9601 3.8279 11.887 3.73857C11.7121 3.52485 11.3971 3.49335 11.1834 3.66821L5.88889 8.00007H2C1.44772 8.00007 1 8.44778 1 9.00007V15.0001C1 15.5524 1.44772 16.0001 2 16.0001ZM23 12C23 15.292 21.5539 18.2463 19.2622 20.2622L17.8445 18.8444C19.7758 17.1937 21 14.7398 21 12C21 9.26016 19.7758 6.80629 17.8445 5.15557L19.2622 3.73779C21.5539 5.75368 23 8.70795 23 12ZM18 12C18 10.0883 17.106 8.38548 15.7133 7.28673L14.2842 8.71584C15.3213 9.43855 16 10.64 16 12C16 13.36 15.3213 14.5614 14.2842 15.2841L15.7133 16.7132C17.106 15.6145 18 13.9116 18 12Z"></path>
                      </svg>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className='connect--section'>
          <div className='home--about-headarea'>
            <h6>Connect</h6>
            <h3 className='service--heading'>Connect WITH US ANYTIME</h3>
          </div>
          <div className="connect--content-area">
            <div className="row">
              <div className="col-12 col-lg-4 connect-card">
                <div className='contact--article'>
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
                <div className='contact--article'>
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
                <div className='contact--article'>
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
          <a href="#">
            <div className="register--card">
              <h2 className='register--text'>Register Now</h2>
              <div className="register-arrow-area">
                <svg xmlns="http://www.w3.org/2000/svg" width="72" height="74" viewBox="0 0 72 74" fill="none">
                  <path d="M6.34766 9.0872C16.3723 17.5696 42.4363 28.5196 66.4954 4.46045" stroke="#5C3B2E" stroke-width="5" />
                  <path d="M67.4092 3.56478C57.7158 12.4238 43.5263 36.8757 64.3152 63.8109" stroke="#5C3B2E" stroke-width="5" />
                  <path d="M2 71.6889L69.0879 2.2876" stroke="#5C3B2E" stroke-width="5" />
                </svg>
              </div>
              <div className='register--blog'></div>
            </div>
          </a>
        </section>
      </div>
    </div>
  )
}

export default Home;
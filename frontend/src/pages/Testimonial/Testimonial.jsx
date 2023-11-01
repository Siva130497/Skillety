import React from 'react';
import { useEffect } from 'react';
import $ from 'jquery';
import './Testimonial.css';
import './Testimonial-responsive.css';
import Layout from '../../components/Layout';
import { Footer } from '../../components/Footer';

const Testimonial = () => {
    useEffect(() => {

    }, []);

    return (
        <div>
            <Layout />
            <div className='testimonial--section'>
                <div className='container-fluid'>
                    <div className='container-fluid container-section'>
                        <div className="custom--container">
                            <div className="breadcrumb--area-dark" data-aos="fade-down">
                                <div className="breadcrumb--item-dark">
                                    <a href="/">Home</a>
                                </div>
                                <div className="breadcrumb--item-dark">
                                    <p>Testimonials</p>
                                </div>
                            </div>

                            <div className="testimonial--container">
                                <div className="row testimonial--row">
                                    <div className="col-12 col-xl-6 col-lg-12 pe-xl-4 mb-md-4 mb-lg-0 mb-xl-0">
                                        <article className="testimonial--card-lg testi--card-lg" data-aos="zoom-out-right">
                                            <div className="testimonial--profile-area">
                                                <img src="assets/img/home-images/testi-profile.jpeg" className='testimonial--profile-img testi--img' alt="" />
                                                <div className="testimonial--profile testi--profile-desc">
                                                    <h5>MR. KEERTHI RANNORE</h5>
                                                    <p>General Manager – HR, Sonata Software Ltd.</p>
                                                </div>
                                            </div>
                                            <div className="testimonial--content-area testi--content-area">
                                                <p>We have been working with Skillety team from past few months, their responsiveness and customer focus is phenomenal. Team’s business acumen and technology understanding has helped to turn around things quickly. Excellent demonstration of consistency and partnership.</p>
                                            </div>
                                            <a href='' className='testimonial--arrow-area testi--arrow-area'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="60" height="65" viewBox="0 0 55 56" fill="none">
                                                    <path d="M5.25812 7.09628C12.7692 13.4518 32.2979 21.6562 50.3244 3.62964" stroke="white" stroke-width="4" />
                                                    <path d="M51.0082 2.95734C43.7453 9.59507 33.1137 27.9159 48.69 48.0973" stroke="white" stroke-width="4" />
                                                    <path d="M2 53.9998L52.2663 2.00024" stroke="white" stroke-width="4" />
                                                </svg>
                                            </a>
                                        </article>
                                    </div>
                                    <div className="col-12 col-xl-6 col-lg-12 ps-xl-4">
                                        <div className="row">
                                            <div className="col-12 col-xl-9 col-lg-6 mt-xl-0 mt-lg-0">
                                                <article className='testimonial--card-sm testi--card-sm test--card-bg1 mb-md-4' data-aos="zoom-out-left">
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
                                            </div>
                                            <div className="col-12 offset-xl-3 col-xl-9 col-lg-6">
                                                <article className='testimonial--card-sm testi--card-sm test--card-bg2 mt-4 mb-4 mb-md-0' data-aos="zoom-out-left">
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
                                </div>

                                <div className="row testimonial--row">
                                    <div className="col-12 col-xl-6 pe-xl-4 mb-md-4 mb-lg-0 mb-xl-0">
                                        <article className="testimonial--card-lg testi--card-lg" data-aos="zoom-out-right">
                                            <div className="testimonial--profile-area">
                                                <img src="assets/img/home-images/testi-profile.jpeg" className='testimonial--profile-img testi--img' alt="" />
                                                <div className="testimonial--profile testi--profile-desc">
                                                    <h5>KAVITHA KATKAM</h5>
                                                    <p>Senior Manager - Talent Acquisition, IVY Software Development Services Pvt. Ltd.</p>
                                                </div>
                                            </div>
                                            <div className="testimonial--content-area testi--content-area">
                                                <p>We have been working with Skillety for over a year now. They are attentive to details and excellent in getting immediate joiners to the team. I would strongly recommend Skillety to any organisation.</p>
                                            </div>
                                            <a href='' className='testimonial--arrow-area testi--arrow-area'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="60" height="65" viewBox="0 0 55 56" fill="none">
                                                    <path d="M5.25812 7.09628C12.7692 13.4518 32.2979 21.6562 50.3244 3.62964" stroke="white" stroke-width="4" />
                                                    <path d="M51.0082 2.95734C43.7453 9.59507 33.1137 27.9159 48.69 48.0973" stroke="white" stroke-width="4" />
                                                    <path d="M2 53.9998L52.2663 2.00024" stroke="white" stroke-width="4" />
                                                </svg>
                                            </a>
                                        </article>
                                    </div>
                                    <div className="col-12 col-xl-6 mt-xl-0 mt-lg-4 ps-xl-4">
                                        <article className="testimonial--card-lg testi--card-lg" data-aos="zoom-out-left">
                                            <div className="testimonial--profile-area">
                                                <img src="assets/img/home-images/testi-profile.jpeg" className='testimonial--profile-img testi--img' alt="" />
                                                <div className="testimonial--profile testi--profile-desc">
                                                    <h5>RAVINDRANATH BARREY</h5>
                                                    <p>Manager - Talent Acquisition, CYIENT Ltd.</p>
                                                </div>
                                            </div>
                                            <div className="testimonial--content-area testi--content-area">
                                                <p>Team Skillety, Thank you so much to everyone on the team for getting our latest project Phixxxx(HPM) completed not only ahead of schedule but under budget. I appreciate the cooperative spirit and the attention to detail that enabled us to close all positions and streamline the entire process in order to achieve success and meet our goals. I couldn't be more thrilled to work with such a terrific group of people, and I'm looking forward to work with you on our next project!</p>
                                            </div>
                                            <a href='' className='testimonial--arrow-area testi--arrow-area'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="60" height="65" viewBox="0 0 55 56" fill="none">
                                                    <path d="M5.25812 7.09628C12.7692 13.4518 32.2979 21.6562 50.3244 3.62964" stroke="white" stroke-width="4" />
                                                    <path d="M51.0082 2.95734C43.7453 9.59507 33.1137 27.9159 48.69 48.0973" stroke="white" stroke-width="4" />
                                                    <path d="M2 53.9998L52.2663 2.00024" stroke="white" stroke-width="4" />
                                                </svg>
                                            </a>
                                        </article>
                                    </div>
                                </div>

                                <div className="row testimonial--row">
                                    <div className="col-12 col-xl-6 pe-xl-4 mb-md-5 mb-lg-0 mb-xl-0">
                                        <div className="row">
                                            <div className="col-12 col-xl-9 col-lg-6 mt-xl-0 mt-lg-0">
                                                <article className='testimonial--card-sm testi--card-sm test--card-bg1 mb-md-4' data-aos="zoom-out-right">
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
                                            </div>
                                            <div className="col-12 offset-xl-3 col-xl-9 col-lg-6">
                                                <article className='testimonial--card-sm testi--card-sm test--card-bg2 mt-4' data-aos="zoom-out-right">
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

                                    <div className="col-12 col-xl-6 ps-xl-4 mt-4 mt-md-0 mt-lg-5 mt-xl-0">
                                        <article className="testimonial--card-lg testi--card-lg" data-aos="zoom-out-left">
                                            <div className="testimonial--profile-area">
                                                <img src="assets/img/home-images/testi-profile.jpeg" className='testimonial--profile-img testi--img' alt="" />
                                                <div className="testimonial--profile testi--profile-desc">
                                                    <h5>HEMANT CHAKRAVORTY, SR</h5>
                                                    <p>Talent Acquisition Partner - Human Resources, Interactions India LLP.</p>
                                                </div>
                                            </div>
                                            <div className="testimonial--content-area testi--content-area">
                                                <p>Over the past several months, we've worked with Skillety on different Tech Engineering requirements. Each time, they were successful in assisting us to explore the market and secure the right person for Interactions India LLP. The assigned team that we worked with from Skillety were thoughtful and did a thorough job of gathering information about the role and organisation before they began the search. They also managed the search in such an organised and efficient way, that the whole process looked easier than I thought. I find the Skillety professional, diligent and productive and wish them all the success in the future.</p>
                                            </div>
                                            <a href='' className='testimonial--arrow-area testi--arrow-area'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="60" height="65" viewBox="0 0 55 56" fill="none">
                                                    <path d="M5.25812 7.09628C12.7692 13.4518 32.2979 21.6562 50.3244 3.62964" stroke="white" stroke-width="4" />
                                                    <path d="M51.0082 2.95734C43.7453 9.59507 33.1137 27.9159 48.69 48.0973" stroke="white" stroke-width="4" />
                                                    <path d="M2 53.9998L52.2663 2.00024" stroke="white" stroke-width="4" />
                                                </svg>
                                            </a>
                                        </article>
                                    </div>
                                </div>

                                <div className="row testimonial--row">
                                    <div className="col-12 col-xl-6 pe-xl-4 mb-md-4 mb-lg-0 mb-xl-0">
                                        <article className="testimonial--card-lg testi--card-lg" data-aos="zoom-out-right">
                                            <div className="testimonial--profile-area">
                                                <img src="assets/img/home-images/testi-profile.jpeg" className='testimonial--profile-img testi--img' alt="" />
                                                <div className="testimonial--profile testi--profile-desc">
                                                    <h5>UMA NAGESWARA RAO G</h5>
                                                    <p>Senior HR – Talent Acquisition, CYIENT Ltd.</p>
                                                </div>
                                            </div>
                                            <div className="testimonial--content-area testi--content-area">
                                                <p>Hi Skillety Team, Thank you very much for your hard work on closing all positions of Malxxxx Panxxxxxx Project. I know how much effort it took to align with requirements and close them within the stipulated time frame. Your accomplishment shows your co-workers the importance of determination and collaboration. We are proud of your achievement, and we are sure there are more to come in upcoming years. Please convey our wishes to all of your teammates who helped us in closing the MP project. Congratulations from all of us at Cyient!</p>
                                            </div>
                                            <a href='' className='testimonial--arrow-area testi--arrow-area'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="60" height="65" viewBox="0 0 55 56" fill="none">
                                                    <path d="M5.25812 7.09628C12.7692 13.4518 32.2979 21.6562 50.3244 3.62964" stroke="white" stroke-width="4" />
                                                    <path d="M51.0082 2.95734C43.7453 9.59507 33.1137 27.9159 48.69 48.0973" stroke="white" stroke-width="4" />
                                                    <path d="M2 53.9998L52.2663 2.00024" stroke="white" stroke-width="4" />
                                                </svg>
                                            </a>
                                        </article>
                                    </div>
                                    <div className="col-12 col-xl-6 ps-xl-4">
                                        <div className="row">
                                            <div className="col-12 col-xl-9 col-lg-6 mt-xl-0 mt-lg-0" data-aos="zoom-out-left">
                                                <article className='testimonial--card-sm testi--card-sm test--card-bg1 mb-md-4'>
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
                                            </div>
                                            <div className="col-12 offset-xl-3 col-xl-9 col-lg-6">
                                                <article className='testimonial--card-sm testi--card-sm test--card-bg2 mt-4 mb-4 mb-md-0' data-aos="zoom-out-left">
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
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}
export default Testimonial;
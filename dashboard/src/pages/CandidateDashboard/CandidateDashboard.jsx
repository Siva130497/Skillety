import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import Layout from '../../components/Layout';
import Footer from '../../components/Footer';
import './CandidateDashboard.css';
import './CandidateDashboard-responsive.css';
import $ from 'jquery';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';

import { Line } from 'react-chartjs-2';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const data = {
  labels,
  datasets: [
    {
      fill: true,
      label: 'Old visitors',
      data: [12.5, 12.5, 2.5, 5, 0, 2.5, 2.5, 10],
      borderColor: '#714F36',
      backgroundColor: '#F9C833',
    },
    {
      fill: true,
      label: 'New visitors',
      data: [7.5, 8, 5, 7.5, 12.5, 5, 6, 7.5],
      borderColor: '#F9C833',
      backgroundColor: '#FFEDB7',
    },
  ],
};

const yAxesTicks = [0, 5, 10, 20];

const options = {
  responsive: true,
  scales: {
    y: {
      suggestedMin: yAxesTicks[0],
      suggestedMax: yAxesTicks[yAxesTicks.length - 1],
      ticks: {
        stepSize: 5,
      },
    },
  },
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
    },
  },

};

const ClientDashboard = () => {
  const {token} = useParams();
  const {getProtectedData, getClientImg, clientImg} = useContext(AuthContext);
  const [candidateId, setCandidateId] = useState("");
  const [jobDetail, setJobDetail] = useState([]);
  const [appliedJobDetail, setAppliedJobDetail] = useState([]);
  const [allClient, setAllClient] = useState([]);

  useEffect(()=>{
    localStorage.setItem("candidateToken", JSON.stringify(token));
  },[token])

  useEffect(() => {
    $(document).ready(function () {
      //for dashboard summary view
      $('.hidden-row').hide();

      $('.dash-num-count-more-btn').click(function () {
        $('.hidden-row').slideToggle('slow');
        $(this).hide();
      });

      //for tooltip
      $('[data-toggle="tooltip"]').tooltip();

      //for copy invitaion link
      $(".video-link-copy-btn").click(function () {
        var videoLinkInput = $("#video-link");
        videoLinkInput.select();

        try {
          document.execCommand("copy");
          $(".video-link-copy-btn i").removeClass("bi-copy").addClass("bi-check-lg");
          $(".video-link-copy-btn").attr("title", "Copied");
        } catch (err) {
          console.error("Copy failed:", err);
        }

        setTimeout(function () {
          $(".video-link-copy-btn i").removeClass("bi-check-lg").addClass("bi-copy");
          $(".video-link-copy-btn").attr("title", "Copy");
        }, 2000);
      });
    });



  }, []);

  useEffect(() => {
    if(token){
        const fetchData = async () => {
            try {
            const user = await getProtectedData(token);
            console.log(user);
            setCandidateId(user.id);
            } catch (error) {
            console.log(error);
            
            }
        };
    
        fetchData();
    }
}, [token]);

useEffect(()=>{
  axios.get("http://localhost:5002/clients")
  .then(res=>{
    console.log(res.data)
    setAllClient(res.data)
    
  })
  .catch(err=>console.log(err))
},[])

const getSkillMatchJobDetail = async() => {
  try {
      const response = await axios.get(`http://localhost:5002/skill-match-job-Detail/${candidateId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json'
        }
      });
      const result = response.data;

      if (!result.error) {
        console.log(result);
        setJobDetail(result);
      } else {
        console.log(result);
      }
    } catch (error) {
      console.log(error);
    }
};

  const getAppliedjobs = async() => {
    try{
        const res = await axios.get(`http://localhost:5002/my-applied-jobs/${candidateId}`, {
          headers: {
              Authorization: `Bearer ${token}`,
              Accept: 'application/json'
          }
        });
        const result = res.data;
        if (!result.error) {
          console.log(result);
          setAppliedJobDetail(result);
        } else {
          console.log(result);
        }
    }catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    if(candidateId){
      getAppliedjobs();
      getSkillMatchJobDetail();
      getClientImg();
    }
  },[candidateId])

  return (
    <div>
      <div className="main-wrapper main-wrapper-1">
        <div className="navbar-bg"></div>

        <Layout />

        <div className="main-content">
          <section className="section">
            <div className="dash-section candidate">
              <div className="dash-main-area">

                <div className="top-nav-area">
                  <div className="current-page-name-area">
                    <h4 className='current-page-name'>Dashboard</h4>
                    {/* <p className='sub--head'>Welcome to Skillety !!!</p> */}
                  </div>

                  {/* <div className="admin-search-area">
                    <form action="">
                      <div className="admin-search-input-area">
                        <input type="text" placeholder='Search for Job/title/Keywords'
                          className='admin-search-input' />
                        <i class="bi bi-search"></i>
                        <button className='dash-filter-btn'>
                          <i class="bi bi-sliders"></i>
                        </button>
                      </div>
                    </form>
                  </div> */}
                </div>

                <div className="dash-num-count-section">
                  <div className="row">
                    <div className="col-12 col-xxl-3 col-xl-3 col-md-6">
                      <div className="dash-num-count-area">
                        <p className='dash-num-title'>Jobs Applied</p>
                        <h4 className='dash-num-count'>14</h4>
                      </div>
                    </div>

                    <div className="col-12 col-xxl-3 col-xl-3 col-md-6">
                      <div className="dash-num-count-area">
                        <p className='dash-num-title'>Upcoming Interviews</p>
                        <h4 className='dash-num-count'>04</h4>
                      </div>
                    </div>

                    <div className="col-12 col-xxl-3 col-xl-3 col-md-6">
                      <div className="dash-num-count-area">
                        <p className='dash-num-title'>New matched Jobs</p>
                        <h4 className='dash-num-count'>08</h4>
                      </div>
                    </div>

                    <div className="col-12 col-xxl-3 col-xl-3 col-md-6">
                      <div className="dash-num-count-area">
                        <p className='dash-num-title'>New Notification</p>
                        <h4 className='dash-num-count'>28</h4>
                      </div>
                    </div>
                  </div>

                  {/* <button className="dash-num-count-more-btn" id="showHiddenRow">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="8" viewBox="0 0 30 8" fill="none">
                      <circle cx="4" cy="4" r="4" fill="#714F36" />
                      <circle cx="15" cy="4" r="4" fill="#714F36" />
                      <circle cx="26" cy="4" r="4" fill="#714F36" />
                    </svg>
                  </button> */}

                  <div className='hidden-row'>
                    <div className="through-line"></div>
                    <div className="row">
                      <div className="col-12 col-xxl-3 col-xl-3 col-md-6">
                        <div className="dash-num-count-area">
                          <p className='dash-num-title'>Jobs Applied</p>
                          <h4 className='dash-num-count'>14</h4>
                        </div>
                      </div>

                      <div className="col-12 col-xxl-3 col-xl-3 col-md-6">
                        <div className="dash-num-count-area">
                          <p className='dash-num-title'>Upcoming Interviews</p>
                          <h4 className='dash-num-count'>04</h4>
                        </div>
                      </div>

                      <div className="col-12 col-xxl-3 col-xl-3 col-md-6">
                        <div className="dash-num-count-area">
                          <p className='dash-num-title'>New matched Jobs</p>
                          <h4 className='dash-num-count'>08</h4>
                        </div>
                      </div>

                      <div className="col-12 col-xxl-3 col-xl-3 col-md-6">
                        <div className="dash-num-count-area">
                          <p className='dash-num-title'>New Notification</p>
                          <h4 className='dash-num-count'>28</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="dash-chart-section">
                  <div className="dash-chart-area">
                    <div className="dash-chart-top-area">
                      <div className="dash-chart-title">Resume Visits</div>
                      <div className="dash-chart-filter-area">
                        <form action="">
                          <select name="" className='dash-chart-filter-input' id="">
                            <option value="Monthly" selected>Monthly</option>
                            <option value="Weekly">Weekly</option>
                            <option value="Yearly">Yearly</option>
                          </select>
                        </form>
                      </div>
                    </div>
                    <Line options={options} data={data} />
                  </div>
                </div>

                <div className="row">
                  <div className="col-12">
                    <div className="dash-table-section">
                      <div className="dash-table-area">
                        <div className="dash-table-top-area">
                          <div className="dash-table-title">
                            Upcoming Interviews
                          </div>
                          <a href='#' className="dash-table-see-all-btn">See all</a>
                        </div>
                        <div className="table-responsive dash-table-container mt-4">
                          <table className="table table-striped table-hover dash-table">
                            <tr className='dash-table-row'>
                              <td>
                                <img src="assets/img/home/table-img-1.png" className='dash-table-avatar-img' alt="" />
                              </td>
                              <td className='dash-table-data'>Prodigit</td>
                              <td className='dash-table-sub-data text-center'>5pm-5:30pm</td>
                              <td className='dash-table-sub-data text-center'>1st Aug, 2023</td>
                              <td className='dash-table-sub-data text-center'>UXUI Designer</td>
                              <td className='text-right dash-table-view-btn-area'>
                                <button className='dash-table-view-btn'
                                  data-toggle="modal" data-target="#upcomingEventModal">View</button>
                              </td>
                            </tr>

                            <tr className='dash-table-row'>
                              <td>
                                <img src="assets/img/home/table-img-4.png" className='dash-table-avatar-img' alt="" />
                              </td>
                              <td className='dash-table-data'>Iris</td>
                              <td className='dash-table-sub-data text-center'>5pm-5:30pm</td>
                              <td className='dash-table-sub-data text-center'>1st Aug, 2023</td>
                              <td className='dash-table-sub-data text-center'>UXUI Designer</td>
                              <td className='text-right dash-table-view-btn-area'>
                                <button className='dash-table-view-btn'
                                  data-toggle="modal" data-target="#upcomingEventModal">View</button>
                              </td>
                            </tr>

                            <tr className='dash-table-row'>
                              <td>
                                <img src="assets/img/home/table-img-2.png" className='dash-table-avatar-img' alt="" />
                              </td>
                              <td className='dash-table-data'>Huawei</td>
                              <td className='dash-table-sub-data text-center'>5pm-5:30pm</td>
                              <td className='dash-table-sub-data text-center'>1st Aug, 2023</td>
                              <td className='dash-table-sub-data text-center'>UXUI Designer</td>
                              <td className='text-right dash-table-view-btn-area'>
                                <button className='dash-table-view-btn'
                                  data-toggle="modal" data-target="#upcomingEventModal">View</button>
                              </td>
                            </tr>

                            <tr className='dash-table-row'>
                              <td>
                                <img src="assets/img/home/table-img-3.png" className='dash-table-avatar-img' alt="" />
                              </td>
                              <td className='dash-table-data'>Happiest Minds</td>
                              <td className='dash-table-sub-data text-center'>5pm-5:30pm</td>
                              <td className='dash-table-sub-data text-center'>1st Aug, 2023</td>
                              <td className='dash-table-sub-data text-center'>UXUI Designer</td>
                              <td className='text-right dash-table-view-btn-area'>
                                <button className='dash-table-view-btn'
                                  data-toggle="modal" data-target="#upcomingEventModal">View</button>
                              </td>
                            </tr>

                            <tr className='dash-table-row'>
                              <td>
                                <img src="assets/img/home/table-img-1.png" className='dash-table-avatar-img' alt="" />
                              </td>
                              <td className='dash-table-data'>Prodigit</td>
                              <td className='dash-table-sub-data text-center'>5pm-5:30pm</td>
                              <td className='dash-table-sub-data text-center'>1st Aug, 2023</td>
                              <td className='dash-table-sub-data text-center'>UXUI Designer</td>
                              <td className='text-right dash-table-view-btn-area'>
                                <button className='dash-table-view-btn'
                                  data-toggle="modal" data-target="#upcomingEventModal">View</button>
                              </td>
                            </tr>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-12">
                    <div className="dash-table-section">
                      <div className="dash-table-area">
                        <div className="dash-table-top-area">
                          <div className="dash-table-title">
                            Job Applied
                          </div>
                          <a href='#' className="dash-table-see-all-btn">See all</a>
                        </div>
                        <div class="table-responsive mt-4">
                          <table class="table table-striped table-hover dash-table">
                            {appliedJobDetail.map((job)=>{
                              const matchingImg = clientImg ? clientImg.find(img => img.id === job.companyId) : null;
                              const imgSrc = matchingImg ? `http://localhost:5002/client_profile/${matchingImg.image}` : "../assets/img/talents-images/avatar.jpg";
                              const client= allClient.find(obj => obj.companyId === job.companyId);
                              return(
                              <tr className='dash-table-row'>
                              <td>
                                <img src={imgSrc} className='dash-table-avatar-img' alt="" />
                              </td>
                              <td className='dash-table-data'>
                                {job.jobRole[0]} <br />
                                <span className='dash-table-sub'>{client?.companyName}</span>
                              </td>
                              <td className='dash-table-data1 text-center'>Marketing & Communication</td>
                              <td className='dash-table-data1 text-center'>{job.jobCategory}</td>
                              <td className='dash-table-data1 text-center'>Screening</td>
                              <td className='text-center dash-table-view-btn-area'>
                                <button className='dash-table-eye-view-btn'
                                  data-toggle="modal" data-target="">
                                  <i class="bi bi-eye-fill"></i>
                                </button>
                              </td>
                              </tr>
                              )})
                            }
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-12">
                    <div className="dash-table-section">
                      <div className="dash-table-area">
                        <div className="dash-table-top-area">
                          <div className="dash-table-title">
                            Latest Jobs
                          </div>
                          <a href='#' className="dash-table-see-all-btn">See all</a>
                        </div>
                        <div class="table-responsive mt-4">
                          <table class="table table-striped table-hover dash-table">
                            {jobDetail.map(job=>{
                              const matchingImg = clientImg ? clientImg.find(img => img.id === job.companyId) : null;
                              const imgSrc = matchingImg ? `http://localhost:5002/client_profile/${matchingImg.image}` : "../assets/img/talents-images/avatar.jpg";
                              const client= allClient.find(obj => obj.companyId === job.companyId);
                              
                              return(
                              <tr className='dash-table-row'>
                              <td>
                                <img src={imgSrc} className='dash-table-avatar-img' alt="" />
                              </td>
                              <td className='dash-table-data'>
                                {job.jobRole} <br />
                                <span className='dash-table-sub'>{client?.companyName}</span>
                              </td>
                              <td className='dash-table-data1 text-center'>Marketing & Communication</td>
                              <td className='dash-table-data1 text-center'>{job.jobCategory}</td>
                              <td className='dash-table-data1 text-center'>{job.jobExperience}</td>
                              <td className='text-center dash-table-view-btn-area'>
                                <button className='dash-table-eye-view-btn'
                                  data-toggle="modal" data-target="">
                                  <i class="bi bi-eye-fill"></i>
                                </button>
                              </td>
                              </tr>
                              )})
                            }
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>


              </div>
            </div>

            {/* event view modal here */}
            <div className="modal fade bd-example-modal-xl" id="upcomingEventModal" tabindex="-1" role="dialog"
              aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
              <div className="modal-dialog modal-dialog-centered modal-xl" role="document">
                <div className="modal-content upcoming-event-modal">
                  <div className="modal-header upcoming-event-modal-header">
                    <h5 className="modal-title upcoming-event-modal-title" id="exampleModalCenterTitle">Upcoming Interview Detail</h5>
                    <a href='##' type="button" className="close custom-close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">
                        <i class="bi bi-x"></i>
                      </span>
                    </a>
                  </div>
                  <div className="modal-body upcoming-event-modal-body">
                    <div className="model--sub-head">
                      Mindtree
                    </div>
                    <div className="upcoming-event-date-section">
                      <div className="upcoming-event-calendar">
                        <div className="upcoming-event-calendar-header">
                          <div className="upcoming-event-cal-month">Sept</div>
                        </div>
                        <div className="upcoming-event-calendar-body">
                          <div className="upcoming-event-cal-date">15</div>
                          <div className="cal-date-devider"></div>
                        </div>
                        <div className="upcoming-event-calendar-footer">
                          <div className="upcoming-event-cal-day">Monday</div>
                        </div>
                      </div>

                      <div className="upcoming-event-detail-area">
                        <div className="upcoming-event-detail-name">
                          Mindtree UX Design Job
                        </div>
                        <div className="upcoming-event-detail">
                          Date :&nbsp;<span>15th Monday 2023</span>
                        </div>
                        <div className="upcoming-event-detail">
                          Time :&nbsp;<span>04:00 PM- 04:30 PM Indian Standard Time</span>
                        </div>
                        <div className="upcoming-event-detail">
                          Type :&nbsp;<span>Video</span>
                        </div>
                      </div>
                    </div>

                    <div className="upcoming-event-modal-devider"></div>

                    <div className="upcoming-event-video-detail-section">
                      <div className="upcoming-event-video-title">
                        Join with the video link:
                      </div>
                      <div className="upcoming-event-video-link-area">
                        <input type="text" className='upcoming-event-video-link' id="video-link" readOnly
                          value={"https://meet.google.com/irrrrvvvjshs-gwstfstrfs-ywgyw"} />
                        <div className="video-link-copy-btn-area">
                          <button className='video-link-copy-btn'>
                            <i class="bi bi-copy"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer upcoming-event-modal-footer bg-whitesmoke br">
                    <button type="button" className="event-accept-btn">Accept Invitation</button>
                    <button type="button" className="decline-btn" data-dismiss="modal">Decline</button>
                  </div>
                </div>
              </div>
            </div>
            {/*  */}

            {/* <div className="dash-right-panel">
              <div className="dash-right-panel-content">
                <div className="dash-hire-slider-area">
                  <Swiper
                    modules={[Pagination, Autoplay]}
                    spaceBetween={10}
                    slidesPerView={1}
                    loop={false}
                    speed={1500}
                    pagination={{ clickable: true }}
                    grabCursor={true}
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
                      <div className="dash-hire-slider">
                        <img src="assets/img/home/event.png"
                          className='dash-hire-event-img' alt="" />
                        <div className="dash-hire-event-title">
                          Check the latest hiring events
                        </div>
                        <button className='dash-hire-event-btn'>
                          Check Events
                        </button>
                      </div>
                    </SwiperSlide>

                    <SwiperSlide>
                      <div className="dash-hire-slider">
                        <img src="assets/img/home/event.png"
                          className='dash-hire-event-img' alt="" />
                        <div className="dash-hire-event-title">
                          Check the latest hiring events
                        </div>
                        <button className='dash-hire-event-btn'>
                          Check Events
                        </button>
                      </div>
                    </SwiperSlide>

                    <SwiperSlide>
                      <div className="dash-hire-slider">
                        <img src="assets/img/home/event.png"
                          className='dash-hire-event-img' alt="" />
                        <div className="dash-hire-event-title">
                          Check the latest hiring events
                        </div>
                        <button className='dash-hire-event-btn'>
                          Check Events
                        </button>
                      </div>
                    </SwiperSlide>

                  </Swiper>
                </div>

                <div className="dash-right-milestone-section">
                  <div className="dash-right-milestone-head">Milestones</div>
                  <div className="dash-right-milestone-sub-head">Status of their application</div>
                  <div className="dash-right-percentage-area">
                    <div className="dash-right-percentage-top-area">
                      <div className="dash-right-percentage-title">screening</div>
                      <div className="dash-right-percentage">88%</div>
                    </div>
                    <div className="dash-right-percentage-progress-area">
                      <div class="progress" data-height="10">
                        <div class="progress-bar dash-right-progress-bar" data-width="88%"></div>
                      </div>
                    </div>
                    <div className="dash-right-percentage-bottom-area">
                      <div className="dash-right-percentage-sub-text">Lorem Ipsum</div>
                      <div className="dash-right-percentage-sub-text">50,000</div>
                    </div>
                  </div>

                  <div className="dash-right-percentage-area">
                    <div className="dash-right-percentage-top-area">
                      <div className="dash-right-percentage-title">Interview</div>
                      <div className="dash-right-percentage">74%</div>
                    </div>
                    <div className="dash-right-percentage-progress-area">
                      <div class="progress" data-height="10">
                        <div class="progress-bar dash-right-progress-bar" data-width="74%"></div>
                      </div>
                    </div>
                    <div className="dash-right-percentage-bottom-area">
                      <div className="dash-right-percentage-sub-text">Lorem Ipsum</div>
                      <div className="dash-right-percentage-sub-text">80,000</div>
                    </div>
                  </div>
                </div>

                <div className="dash-right-notify-section">
                  <div className="dash-right-notify-head-area">
                    <div className="dash-right-notify-head">Recent Notification</div>
                    <a href='#' className="dash-table-see-all-btn">See all</a>
                  </div>
                  <div className="dash-right-notify-area">
                    <div className="dash-right-notify-content">
                      <div className="dash-right-notify-content-left">
                        <img src="assets/img/home/table-img-2.png"
                          className='dash-right-notify-img' alt="" />
                        <div className="dash-right-notify-content-title">Prodigit</div>
                        <div className="dash-right-notify-content-title-sub">viewed your profile</div>
                      </div>
                      <div className="dash-right-notify-content-right">
                        <div className="dash-right-notify-content-title-sub">20min ago</div>
                      </div>
                    </div>

                    <div className="dash-right-notify-content">
                      <div className="dash-right-notify-content-left">
                        <img src="assets/img/home/table-img-2.png"
                          className='dash-right-notify-img' alt="" />
                        <div className="dash-right-notify-content-title">Iris</div>
                        <div className="dash-right-notify-content-title-sub">Shortlisted you for inteview</div>
                      </div>
                      <div className="dash-right-notify-content-right">
                        <div className="dash-right-notify-content-title-sub">50min ago</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}


          </section>

        </div>

        <Footer />
      </div>
    </div>
  )
}

export default ClientDashboard
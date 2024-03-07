import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import Layout from '../../components/Layout';
import Footer from '../../components/Footer';
import ErrorPage from '../../404/404';
import './CandidateDashboard.css';
import './CandidateDashboard-responsive.css';
import $ from 'jquery';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import {jwtDecode} from "jwt-decode";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import { io } from "socket.io-client";

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
import notificationSound from "./media/notify-ring.mp3";

const ClientDashboard = () => {
  const { token } = useParams();
  const { getProtectedData, getClientImg, clientImg } = useContext(AuthContext);
  const [candidateId, setCandidateId] = useState("");
  const [jobDetail, setJobDetail] = useState([]);
  const [appliedJobDetail, setAppliedJobDetail] = useState([]);
  const [allClient, setAllClient] = useState([]);
  const [matchJobNum, setMatchJobNum] = useState("");

  const [loading, setLoading] = useState(true);

  const [contentloading, setContentLoading] = useState(true);

  const [pageNotFound, setPageNotFound] = useState(false);

  const [notifications, setNotifications] = useState([]);
  const [unReadNotifications, setUnReadNotifications] = useState([]);
  const [userName, setUserName] = useState("");
  const [socket, setSocket] = useState(null);

  const [audioContext, setAudioContext] = useState(null);
  const [audioBuffer, setAudioBuffer] = useState(null);

  const [filter, setFilter] = useState('weekly');
  const [chartData, setChartData] = useState();

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  useEffect(()=>{
    if(candidateId){
        axios.get(`https://skillety-n6r1.onrender.com/candidate-dashboard-chart/${candidateId}?period=${filter}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json'
            }
        })
        .then((res)=>{
            console.log(res.data);
            setChartData(res.data);
        })
        .catch(err=>{
          console.log(err)
          setChartData()
        });
    }
},[filter, candidateId])

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

  const getLabels = () => {
    switch (filter) {
        case 'weekly':
            return chartData?.categories;
        case 'monthly':
            return chartData?.categories;
        case 'yearly':
            return chartData?.categories;
        default:
            return [];
    }
};

const getData = () => {
    switch (filter) {
        case 'weekly':
            // return [
            //     [12.5, 12.5, 2.5, 5, 0, 2.5, 2.5, 10],
            //     [7.5, 8, 5, 7.5, 12.5, 5, 6, 7.5],
            // ];
            return chartData?.series.map(dataSeries=>dataSeries?.data)
        case 'monthly':
            // return [
            //     [20, 25, 30, 22, 18, 25, 28, 30, 20, 15, 10, 18],
            //     [15, 18, 20, 22, 30, 25, 28, 30, 22, 18, 15, 20],
            // ];
            return chartData?.series.map(dataSeries=>dataSeries?.data)
        case 'yearly':
            // return [
            //     [100, 120, 80, 90, 110, 130, 140, 160, 180, 200, 180, 150],
            //     [80, 100, 70, 90, 120, 150, 160, 180, 200, 220, 200, 170],
            // ];
            return chartData?.series.map(dataSeries=>dataSeries?.data)
        default:
            return [];
    }
};

  const data = {
    labels: getLabels(),
    datasets: [
      {
        fill: true,
        label: chartData? (chartData?.series[0]?.name) : "no data",
        data: chartData && getData()[0],
        borderColor: '#714F36',
        backgroundColor: '#F9C833',
      },
      {
        fill: true,
        label: chartData? (chartData?.series[1]?.name) : "no data",
        data: chartData && getData()[1],
        borderColor: '#F9C833',
        backgroundColor: '#FFEDB7',
      },
    ],
  };

  const yAxesTicks = [];

  const options = {
    responsive: true,
    scales: {
      y: {
        suggestedMin: yAxesTicks[0],
        suggestedMax: yAxesTicks[yAxesTicks.length - 1],
        ticks: {
          stepSize: 1,
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

  useEffect(() => {
    const preloader = $('#preloader');
    if (preloader.length) {
      setTimeout(function () {
        preloader.fadeOut('slow', function () {
          preloader.remove();
        });
      }, 500);
    }
  }, []);

  useEffect(() => {
    setSocket(io("https://skillety-n6r1.onrender.com"));
  }, []);

  useEffect(() => {
    socket?.emit("newUser", userName)
    console.log(userName)
  }, [socket, userName])

  const playSound = (context, buffer) => {
    const source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(context.destination);
    source.start(0);
  };

  // useEffect(() => {
  //   const context = new (window.AudioContext || window.webkitAudioContext)();
  //   setAudioContext(context);
  // }, [])

  // useEffect(() => {
  //   if (audioContext !== null) {
  //     fetch('../assets/media/notify-ring.mp3')
  //       .then((response) => response.arrayBuffer())
  //       .then((data) => {
  //         audioContext.decodeAudioData(data, (buffer) => {
  //           setAudioBuffer(buffer);
  //         });
  //       });
  //   }
  // }, [audioContext])

  useEffect(() => {

    socket?.on("getNotification", data => {
      console.log(data)
      setNotifications(prev => [...prev, data]);
      setUnReadNotifications(prev => [...prev, data]);
      // if(audioBuffer && audioContext){
      //   playSound(audioContext, audioBuffer);
      // }
      // if (!document.hasFocus()) {
      //   const sound = new Audio(notificationSound);
      //   sound.play();
      // }

    })

  }, [socket]);

  const displayNotification = ({ senderName, content, time, date }) => {
        
    return (
        <>
            <td className='dash-table-sub-data data-nowrap'>{`${time} ${date}`}</td>
            <td className='dash-table-sub-data'>{content}....................</td>
            {/* <td className='text-right dash-table-view-btn-area'>
                <button className='dash-table-view-btn client'
                    data-toggle="modal">View</button>
            </td> */}
        </>
    )
  }

  useEffect(() => {
    try {
        if (token && typeof token === 'string' && token.split('.').length === 3 && !(token.startsWith("firebase"))) {
            jwtDecode(token); // Decode the token
            localStorage.setItem("candidateToken", JSON.stringify(token)); // Save the token in local storage
        }
    } catch (error) {
        // If decoding fails or token is not a string, do nothing
        console.log(error);
        window.location.href = 'https://skillety-frontend-wcth.onrender.com/candidate-login'
    }
}, [token]);

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
    if (token) {
      const fetchData = async () => {
        try {
          setContentLoading(true);
          const user = await getProtectedData(token);
          console.log(user);
          setCandidateId(user.id || user?.responseData.uid);
          setUserName(user.name || user?.responseData.name);
          setLoading(false);

          setContentLoading(false);
        } catch (error) {
          console.log(error);
          setLoading(false);
          setPageNotFound(true);

          setContentLoading(false);
          console.error("Error fetching data:", error);
          // window.open(`https://skillety-dashboard-tk2y.onrender.com/candidate-login`, '_blank');
          window.location.href = 'https://skillety-frontend-wcth.onrender.com/candidate-login'
        }
      };

      fetchData();

    }
  }, [token]);

  useEffect(() => {
    axios.get("https://skillety-n6r1.onrender.com/clients")
      .then(res => {
        console.log(res.data)
        setAllClient(res.data)

      })
      .catch(err => console.log(err))
  }, [])

  const getSkillMatchJobDetail = async () => {
    try {
      setContentLoading(true);
      const response = await axios.get(`https://skillety-n6r1.onrender.com/skill-match-job-Detail/${candidateId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json'
        }
      });
      const result = response.data;

      if (!result.error) {
        console.log(result);
        setJobDetail(result.reverse().filter(job => job.percentage > 0));
        setMatchJobNum(result.filter(job => job.percentage > 0).length);
      } else {
        console.log(result);
      }

      setContentLoading(false);
    } catch (error) {
      console.log(error);

      setContentLoading(false);
    }
  };

  const getAppliedjobs = async () => {
    try {
      setContentLoading(true);
      const res = await axios.get(`https://skillety-n6r1.onrender.com/my-applied-jobs/${candidateId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json'
        }
      });
      const result = res.data;
      if (!result.error) {
        console.log(result);
        setAppliedJobDetail(result.reverse());
      } else {
        console.log(result);
      }

      setContentLoading(false);
    } catch (err) {
      console.log(err);

      setContentLoading(false);
    }
  }

  useEffect(() => {
    if (candidateId) {
      getAppliedjobs();
      getSkillMatchJobDetail();
      getClientImg();

      axios.get(`https://skillety-n6r1.onrender.com/all-notification/${candidateId}?filter=read`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json'
        }
      })
        .then(res => {
          console.log(res.data);
          setNotifications(res.data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }, [candidateId])

  return (
    <div>
      {/* {loading && <div id="preloader candidate"></div>} */}
      {candidateId && <div className="main-wrapper main-wrapper-1">
        <div className="navbar-bg"></div>

        <Layout notification={unReadNotifications} socket={socket} />

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

                {contentloading ? (
                  <div className='dash-tile-skeleton'>
                    <div className="row">
                      <div className="col-12 col-xxl-3 col-xl-3 col-md-6">
                        <div className='m-b-30'>
                          <Skeleton height={15} width={100} />
                        </div>
                        <Skeleton height={40} width={60} />
                      </div>
                      <div className="col-12 col-xxl-3 col-xl-3 col-md-6">
                        <div className='m-b-30'>
                          <Skeleton height={15} width={100} />
                        </div>
                        <Skeleton height={40} width={60} />
                      </div>
                      <div className="col-12 col-xxl-3 col-xl-3 col-md-6">
                        <div className='m-b-30'>
                          <Skeleton height={15} width={100} />
                        </div>
                        <Skeleton height={40} width={60} />
                      </div>
                      <div className="col-12 col-xxl-3 col-xl-3 col-md-6">
                        <div className='m-b-30'>
                          <Skeleton height={15} width={100} />
                        </div>
                        <Skeleton height={40} width={60} />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="dash-num-count-section">
                    <div className="row">
                      <div className="col-12 col-xxl-3 col-xl-3 col-md-6">
                        <div className="dash-num-count-area">
                          <p className='dash-num-title'>Jobs Applied</p>
                          <a href='/my-application'><h4 className='dash-num-count'>{appliedJobDetail.length}</h4></a>
                        </div>
                      </div>

                      <div className="col-12 col-xxl-3 col-xl-3 col-md-6">
                        <div className="dash-num-count-area">
                          <p className='dash-num-title'>Upcoming Interviews</p>
                          <h4 className='dash-num-count'>00</h4>
                        </div>
                      </div>

                      <div className="col-12 col-xxl-3 col-xl-3 col-md-6">
                        <div className="dash-num-count-area">
                          <p className='dash-num-title'>Matching Jobs</p>
                          <a href='/search-jobs'><h4 className='dash-num-count'>{matchJobNum}</h4></a>
                        </div>
                      </div>

                      <div className="col-12 col-xxl-3 col-xl-3 col-md-6">
                        <div className="dash-num-count-area">
                          <p className='dash-num-title'>New Notifications</p>
                          <h4 className='dash-num-count'>00</h4>
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
                            <p className='dash-num-title'>New Notifications</p>
                            <h4 className='dash-num-count'>28</h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="dash-chart-section">
                  <div className="dash-chart-area">
                    <div className="dash-chart-top-area">
                      <div className="dash-chart-title">Overview</div>
                      <div className="dash-chart-filter-area">
                        <form action="">
                          <div className='dash-graph-selection'>
                            <i class="bi bi-chevron-down toggle-icon"></i>
                            <select className='dash-chart-filter-input'
                              value={filter}
                              onChange={handleFilterChange}>
                              <option value="weekly" selected>Weekly</option>
                              <option value="monthly">Monthly</option>
                              <option value="yearly">Yearly</option>
                            </select>
                          </div>
                        </form>
                      </div>
                    </div>
                    {chartData ? <Line options={options} data={data} /> : <p>No Data</p>}
                  </div>
                </div>

                {/* <div className="row">
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
                </div> */}

                <div class="row">
                  <div class="col-12">
                    <div className="dash-table-section">
                      <div className="dash-table-area">
                        <div className="dash-table-top-area">
                          <div className="dash-table-title">
                            Read Notifications
                          </div>
                          <a href='#' className="dash-table-see-all-btn">See all</a>
                        </div>
                        <div class="table-responsive dash-table-container client mt-4">
                          <table class="table table-striped table-hover dash-table">
                            {notifications?.length > 0 ? (
                              notifications.reverse().slice(0, 10).map((notification) => (
                                <tr className='dash-table-row' key={notification.id}>{displayNotification(notification)}</tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan={2} className='text-secondary text-center'>No new notifications..!</td>
                              </tr>
                            )}
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
                            Jobs Applied
                          </div>
                          <a href='/my-application' className="dash-table-see-all-btn">See all</a>
                        </div>
                        <div class="table-responsive mt-4">
                          <table class="table table-striped table-hover dash-table">
                            {appliedJobDetail.slice(0, 10).map((job) => {
                              const matchingImg = clientImg ? clientImg.find(img => img.id === job.companyId) : null;
                              const imgSrc = matchingImg ? `https://skillety-n6r1.onrender.com/client_profile/${matchingImg.image}` : "../assets/img/talents-images/avatar.jpg";
                              const client = allClient.find(obj => obj.companyId === job.companyId);
                              return (
                                <tr className='dash-table-row'>
                                  <td>
                                    <img src={imgSrc} className='dash-table-avatar-img' alt="" />
                                  </td>
                                  <td className='dash-table-data'>
                                    {job.jobRole[0]} <br />
                                    <span className='dash-table-sub'>{client?.companyName}</span>
                                  </td>
                                  <td className='dash-table-data1 text-center'>{job.industry}</td>
                                  <td className='dash-table-data1 text-center'>{job.jobCategory}</td>
                                  <td className='dash-table-data1 text-center'>Screening</td>
                                  {/* <td className='text-center dash-table-view-btn-area'>
                                <button className='dash-table-eye-view-btn'
                                  data-toggle="modal" data-target="">
                                  <i class="bi bi-eye-fill"></i>
                                </button>
                              </td> */}
                                </tr>
                              )
                            })
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
                            Matching Jobs
                          </div>
                          <a href='/search-jobs' className="dash-table-see-all-btn">See all</a>
                        </div>
                        <div class="table-responsive mt-4">
                          <table class="table table-striped table-hover dash-table">
                            {jobDetail.slice(0, 10).map(job => {
                              const matchingImg = clientImg ? clientImg.find(img => img.id === job.companyId) : null;
                              const imgSrc = matchingImg ? `https://skillety-n6r1.onrender.com/client_profile/${matchingImg.image}` : "../assets/img/talents-images/avatar.jpg";
                              const client = allClient.find(obj => obj.companyId === job.companyId);

                              return (
                                <tr className='dash-table-row'>
                                  <td>
                                    <img src={imgSrc} className='dash-table-avatar-img' alt="" />
                                  </td>
                                  <td className='dash-table-data'>
                                    {job.jobRole} <br />
                                    <span className='dash-table-sub'>{client?.companyName}</span>
                                  </td>
                                  <td className='dash-table-data1 text-center'>{job.industry}</td>
                                  <td className='dash-table-data1 text-center'>{job.jobCategory}</td>
                                  <td className='dash-table-data1 text-center'>{job.jobExperience}</td>
                                  {/* <td className='text-center dash-table-view-btn-area'>
                                <button className='dash-table-eye-view-btn'
                                  data-toggle="modal" data-target="">
                                  <i class="bi bi-eye-fill"></i>
                                </button>
                              </td> */}
                                </tr>
                              )
                            })
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
      </div>}
      {pageNotFound &&
        <ErrorPage />
      }
    </div>
  )
}

export default ClientDashboard
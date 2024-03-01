import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import ClientLayout from '../../components/ClientLayout';
import Footer from '../../components/Footer';
import './ClientDashboard.css';
import './ClientDashboard-responsive.css';
import $ from 'jquery';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { jwtDecode } from "jwt-decode";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { io } from "socket.io-client";
import notificationSound from "./media/notify-ring.mp3";

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
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';
import PackagePlans from '../PackagePlans/PackagePlans';
import ErrorPage from '../../404/404';

const ClientDashboard = () => {
    const { token } = useParams();

    const { getProtectedData, getCandidateImg, candidateImg, getClientChoosenPlan, packageSelectionDetail } = useContext(AuthContext);
    const [employeeId, setEmployeeId] = useState("");
    const [loginClientDetail, setLoginClientDetail] = useState();
    const [candidateDetail, setCandidateDetail] = useState([]);
    const [postedJobs, setPostedJobs] = useState([]);
    const [appliedOfPostedJobs, setAppliedOfPostedJobs] = useState([]);
    const [allStaff, setAllStaff] = useState([]);
    const [updatePostedJobs, setUpdatePostedJobs] = useState([]);

    const [loading, setLoading] = useState(true);
    const [pageNotFound, setPageNotFound] = useState(false);

    const [contentloading, setContentLoading] = useState(true);
    const [notifications, setNotifications] = useState([]);
    const [companyName, setCompanyName] = useState("");
    const [socket, setSocket] = useState(null);

    const [audioContext, setAudioContext] = useState(null);
    const [audioBuffer, setAudioBuffer] = useState(null);

    const [filter, setFilter] = useState('weekly');
    const [chartData, setChartData] = useState();

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    useEffect(()=>{
        if(loginClientDetail?.companyId){
            axios.get(`https://skillety-n6r1.onrender.com/company-dashboard-chart/${loginClientDetail?.companyId}?period=${filter}`, {
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
                setChartData();
            });
        }
    },[filter, loginClientDetail])

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
                    // return [chartData?.series[0].data, chartData?.series[1].data]
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
                label:  chartData? (chartData?.series[0]?.name) : "no data",
                data: chartData && getData()[0],
                borderColor: '#F9C833',
                backgroundColor: '#714F36',
            },
            {
                fill: true,
                label: chartData? (chartData?.series[1]?.name) : "no data",
                data: chartData && getData()[1],
                borderColor: '#714F36',
                backgroundColor: '#C2B9B0',
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
        try {
            if (token && typeof token === 'string' && token.split('.').length === 3) {
                jwtDecode(token); // Decode the token
                localStorage.setItem("clientToken", JSON.stringify(token)); // Save the token in local storage
            }
        } catch (error) {
            // If decoding fails or token is not a string, do nothing
            console.log(error);
            window.location.href = 'https://skillety-frontend-wcth.onrender.com/client-login'
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
        });
    }, []);

    useEffect(() => {
        setSocket(io("https://skillety-n6r1.onrender.com"));
    }, []);

    useEffect(() => {
        socket?.emit("newUser", companyName)
        console.log(companyName)
    }, [socket, companyName])

    useEffect(() => {
        socket?.on("getNotification", data => {
            console.log(data)
            setNotifications(prev => [...prev, data]);

            if (!document.hasFocus()) {
                const sound = new Audio(notificationSound);
                sound.play();
            }
        })
    }, [socket]);

    // useEffect(()=>{
    //     if (notifications.length > 0 || socket) {
    //         if (audioContext === null) {
    //           const context = new (window.AudioContext || window.webkitAudioContext)();
    //           setAudioContext(context);

    //           fetch('../assets/media/notify-ring.mp3')
    //             .then((response) => response.arrayBuffer())
    //             .then((data) => {
    //               context.decodeAudioData(data, (buffer) => {
    //                 setAudioBuffer(buffer);
    //                 playSound(context, buffer);
    //               });
    //             });
    //         } else {
    //           playSound(audioContext, audioBuffer);
    //         }
    //     }

    // },[notifications, audioContext, audioBuffer, socket])

    const playSound = (context, buffer) => {
        const source = context.createBufferSource();
        source.buffer = buffer;
        source.connect(context.destination);
        source.start(0);
    };


    useEffect(() => {
        if (token) {
            const fetchData = async () => {
                try {
                    setContentLoading(true);
                    const user = await getProtectedData(token);
                    console.log(user);
                    if (user) {
                        setLoading(false);
                        setEmployeeId(user.id || user.uid);
                    } else {
                        setLoading(false);
                        setPageNotFound(true);
                    }

                    setContentLoading(false);
                } catch (error) {
                    console.log(error);
                    window.location.href = 'https://skillety-frontend-wcth.onrender.com/client-login'
                    setContentLoading(false);
                }
            };

            fetchData();

            axios.get(`https://skillety-n6r1.onrender.com/all-notification/${employeeId}?filter=read`, {
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
    }, [token]);

    const getLoginClientDetail = async () => {
        try {
            setContentLoading(true);
            const res = await axios.get(`https://skillety-n6r1.onrender.com/client/${employeeId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json'
                }
            });
            const result = res.data;
            if (!result.error) {
                console.log(result);
                setLoginClientDetail(result);
                setCompanyName(result.companyName)
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
        if (employeeId) {
            getLoginClientDetail();
        }
    }, [employeeId]);

    const getAllCandidateDetail = async () => {
        try {
            setContentLoading(true);
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

            setContentLoading(false);
        } catch (error) {
            console.log(error);

            setContentLoading(false);
        }
    };


    const getOwnPostedjobs = async () => {
        try {
            setContentLoading(true);
            const res = await axios.get(`https://skillety-n6r1.onrender.com/my-posted-jobs/${loginClientDetail?.companyId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json'
                }
            });
            const result = res.data;
            if (!result.error) {
                console.log(result);
                setUpdatePostedJobs(prevPostedJobs => [...prevPostedJobs, ...result.reverse()]);
            } else {
                console.log(result);
            }

            setContentLoading(false);
        } catch (err) {
            console.log(err);

            setContentLoading(false);
        }
    }

    const getOwnActivejobs = async () => {
        try {
            setContentLoading(true);
            const res = await axios.get(`https://skillety-n6r1.onrender.com/my-active-jobs/${loginClientDetail.companyId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json'
                }
            });
            const result = res.data;
            if (!result.error) {
                console.log(result);
                setUpdatePostedJobs(prevPostedJobs => [...prevPostedJobs, ...result.reverse()]);
            } else {
                console.log(result);
            }

            setContentLoading(false);
        } catch (err) {
            console.log(err);

            setContentLoading(false);
        }
    }

    const getAppliedOfPostedJobs = async () => {
        try {
            setContentLoading(true);
            const res = await axios.get(`https://skillety-n6r1.onrender.com/applied-jobs-of-posted/${loginClientDetail?.companyId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json'
                }
            });
            const result = res.data;
            if (!result.error) {
                console.log(result);
                setAppliedOfPostedJobs(result.reverse());
            } else {
                console.log(result);
            }

            setContentLoading(false);
        } catch (err) {
            console.log(err);

            setContentLoading(false);
        }
    }

    const allStaffFromCompany = async () => {
        try {
            setContentLoading(true);
            const res = await axios.get(`https://skillety-n6r1.onrender.com/all-staff/${loginClientDetail?.companyId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json'
                }
            });
            const result = res.data;
            if (!result.error) {
                console.log(result);
                setAllStaff(result);
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
        if (loginClientDetail) {
            getAllCandidateDetail();
            getOwnPostedjobs();
            getOwnActivejobs();
            getAppliedOfPostedJobs();
            getCandidateImg();
            allStaffFromCompany();
        }
        // getClientChoosenPlan(loginClientDetail?.companyId);
    }, [loginClientDetail]);

    useEffect(() => {
        const uniqueIds = {};
        const newArray = updatePostedJobs.filter(obj => {
            // Check if the ID is already in the uniqueIds object
            if (!uniqueIds[obj.id]) {
                // If not, mark it as seen and include it in the new array
                uniqueIds[obj.id] = true;
                return true;
            }
            // If the ID is already in the uniqueIds object, filter it out
            return false;
        });
        setPostedJobs(newArray)
    }, [updatePostedJobs]);

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


    return (
        <div>
            {/* {loading && <div id="preloader"></div>} */}
            {employeeId && <div>


                <div class="main-wrapper main-wrapper-1">
                    <div class="navbar-bg"></div>
                    <ClientLayout notification={notifications} />

                    <div class="main-content">
                        <section class="section">
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
                                                    <input type="text" placeholder='Search for Cvs/Resume'
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
                                                        <p className='dash-num-title'>Jobs Posted</p>
                                                        <a href="/manage-job"><h4 className='dash-num-count'>{postedJobs?.length}</h4></a>
                                                    </div>
                                                </div>

                                                <div className="col-12 col-xxl-3 col-xl-3 col-md-6">
                                                    <div className="dash-num-count-area">
                                                        <p className='dash-num-title'>No. of Applications Received</p>
                                                        <a href="/manage-job"><h4 className='dash-num-count'>{appliedOfPostedJobs?.length}</h4></a>
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
                                                            <p className='dash-num-title'>Jobs Posted</p>
                                                            <h4 className='dash-num-count'>14</h4>
                                                        </div>
                                                    </div>

                                                    <div className="col-12 col-xxl-3 col-xl-3 col-md-6">
                                                        <div className="dash-num-count-area">
                                                            <p className='dash-num-title'>Unread Applications</p>
                                                            <h4 className='dash-num-count'>04</h4>
                                                        </div>
                                                    </div>

                                                    <div className="col-12 col-xxl-3 col-xl-3 col-md-6">
                                                        <div className="dash-num-count-area">
                                                            <p className='dash-num-title'>Upcoming Interviews</p>
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

                                    <div class="row">
                                        <div class="col-12 col-xl-6 pr-2">
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

                                        <div class="col-12 col-xl-6 pl-2">
                                            <div className="dash-table-section">
                                                <div className="dash-table-area">
                                                    <div className="dash-table-top-area">
                                                        <div className="dash-table-title">
                                                            New Application
                                                        </div>
                                                        <a href='/talent-profile-search' className="dash-table-see-all-btn">See all</a>
                                                    </div>
                                                    <div class="table-responsive dash-table-container client mt-4">

                                                        <table class="table table-striped table-hover dash-table">
                                                            {candidateDetail.slice(0, 10).map((cand) => {
                                                                const matchingImg = candidateImg ? candidateImg.find(img => img.id === cand.id) : null;
                                                                const imgSrc = matchingImg ?(matchingImg.image.startsWith('https') ? matchingImg.image : `https://skillety-n6r1.onrender.com/candidate_profile/${matchingImg.image}` ): "../assets/img/talents-images/avatar.jpg";
                                                                return (
                                                                    <tr className='dash-table-row' key={cand.id}>
                                                                        <td>
                                                                            <img src={imgSrc} className='dash-table-avatar-img' alt="" />
                                                                        </td>
                                                                        <td className='dash-table-sub client text-capitalized'>
                                                                            {cand.firstName + ' ' + cand.lastName}<br />
                                                                            <span className='dash-table-sub-data'>{cand.date}</span>
                                                                        </td>
                                                                        <td className='dash-table-sub-data'>{cand.profileHeadline}</td>
                                                                        {/* <td className='text-right dash-table-view-btn-area'>
                                                                    <button className='dash-table-view-btn client' data-toggle="modal">View CV</button>
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

                                    {/* <div class="row">
                                        <div class="col-12">
                                            <div className="dash-table-section">
                                                <div className="dash-table-area">
                                                    <div className="dash-table-top-area">
                                                        <div className="dash-table-title">
                                                            Upcoming Interview
                                                        </div>
                                                        <a href='#' className="dash-table-see-all-btn">See all</a>
                                                    </div>
                                                    <div class="table-responsive mt-4">
                                                        <table class="table table-striped table-hover dash-table">
                                                            <tr className='dash-table-row'>
                                                                <td className='dash-table-data1'>
                                                                    1st Aug, 2023
                                                                </td>
                                                                <td className='dash-table-data1 text-center'>05:15 PM</td>
                                                                <td className='dash-table-data1 text-center'>Marketing Manager</td>
                                                                <td className='text-center dash-table-view-btn-area'>
                                                                    <button className='dash-table-view-btn client pl-4 pr-4'
                                                                        data-toggle="modal">View
                                                                    </button>
                                                                </td>
                                                            </tr>
    
                                                            <tr className='dash-table-row'>
                                                                <td className='dash-table-data1'>
                                                                    1st Aug, 2023
                                                                </td>
                                                                <td className='dash-table-data1 text-center'>05:15 PM</td>
                                                                <td className='dash-table-data1 text-center'>Marketing Manager</td>
                                                                <td className='text-center dash-table-view-btn-area'>
                                                                    <button className='dash-table-view-btn client pl-4 pr-4'
                                                                        data-toggle="modal">View
                                                                    </button>
                                                                </td>
                                                            </tr>
    
                                                            <tr className='dash-table-row'>
                                                                <td className='dash-table-data1'>
                                                                    1st Aug, 2023
                                                                </td>
                                                                <td className='dash-table-data1 text-center'>05:15 PM</td>
                                                                <td className='dash-table-data1 text-center'>Marketing Manager</td>
                                                                <td className='text-center dash-table-view-btn-area'>
                                                                    <button className='dash-table-view-btn client pl-4 pr-4'
                                                                        data-toggle="modal">View
                                                                    </button>
                                                                </td>
                                                            </tr>
    
                                                            <tr className='dash-table-row'>
                                                                <td className='dash-table-data1'>
                                                                    1st Aug, 2023
                                                                </td>
                                                                <td className='dash-table-data1 text-center'>05:15 PM</td>
                                                                <td className='dash-table-data1 text-center'>Marketing Manager</td>
                                                                <td className='text-center dash-table-view-btn-area'>
                                                                    <button className='dash-table-view-btn client pl-4 pr-4'
                                                                        data-toggle="modal">View
                                                                    </button>
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
                                                            Latest Posted Jobs
                                                        </div>
                                                        <a href='/manage-job' className="dash-table-see-all-btn">See all</a>
                                                    </div>
                                                    <div class="table-responsive mt-4">
                                                        <table className="table table-striped table-hover dash-table">
                                                            {postedJobs.slice(0, 10).map((job) => {
                                                                const numApplicants = appliedOfPostedJobs.filter(appliedOfPostedJob => appliedOfPostedJob.jobId === job.id).length;
                                                                const staff = allStaff.find(obj => obj.id === (job.clientId || job.clientStaffId));
                                                                return (
                                                                    <tr className='dash-table-row' key={job.id}>
                                                                        {/* <td>
                                                                    <img src="assets/img/home/javascript.png" className='dash-table-avatar-img client' alt="" />
                                                                </td> */}
                                                                        <td className='dash-table-data1 text-capitalized'>
                                                                            {job.jobRole[0]}
                                                                        </td>
                                                                        <td className='dash-table-data1 text-center'>{`${new Date(job.createdAt).getDate().toString().padStart(2, '0')}/${(new Date(job.createdAt).getMonth() + 1).toString().padStart(2, '0')}/${new Date(job.createdAt).getFullYear() % 100}`}</td>
                                                                        <td className='dash-table-data1 text-center'>
                                                                            {numApplicants} <br />
                                                                            No of Applications
                                                                        </td>
                                                                        <td className='dash-table-data1 text-center text-capitalized'>{staff ? staff.name : 'Unknown'}
                                                                        </td>
                                                                        <td className='dash-table-data1 text-center'>
                                                                            {job.minExperience + "-" + job.maxExperience} <br />
                                                                            Experience
                                                                        </td>
                                                                    </tr>
                                                                );
                                                            })}
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                </div>
                            </div>

                            {/* <div className="dash-right-panel">
                                <div className="dash-right-panel-content">
                                    <div className="dash-hire-slider-area">
    
                                        <div className="dash-hire-slider">
                                            <div className="dash-hire-head">For Tele Screening Calls</div>
                                            <img src="../assets/img/home/resume.png"
                                                className='dash-hire-event-img' alt="" />
                                            <div className="dash-hire-event-title">
                                                After Search add your selected <br />Resume/CVs to tele Screening Calls
                                            </div>
                                            <button className='dash-hire-event-btn client'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                                </svg>
                                                Add Resume
                                            </button>
                                        </div>
    
                                        <div className="dash-right-divider"></div>
    
                                        <div className="dash-hire-slider">
                                            <div className="dash-hire-head">For Technical Interview</div>
                                            <img src="../assets/img/home/interview.png"
                                                className='dash-hire-event-img' alt="" />
                                            <div className="dash-hire-event-title">
                                                After Search add your selected <br />Resume/CVs to tele Screening Calls
                                            </div>
                                            <button className='dash-hire-event-btn client'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                                </svg>
                                                Add Resume
                                            </button>
                                        </div>
    
                                        <div className="dash-right-divider"></div>
    
                                        <div className="dash-hire-slider">
                                            <div className="dash-hire-head">Solution from us</div>
                                            <img src="../assets/img/home/knowledge.png"
                                                className='dash-hire-event-img' alt="" />
                                            <div className="dash-hire-event-title">
                                                State your problem and get a Solution
                                                from us.
                                            </div>
                                            <button className='dash-hire-event-btn client'>
                                                Send us message
                                            </button>
                                        </div>
                                    </div>
    
                                </div>
                            </div> */}
                        </section>
                    </div>
                    <Footer />
                </div>

                {pageNotFound && <ErrorPage/>}
            </div>}

        </div>

    )
}

export default ClientDashboard
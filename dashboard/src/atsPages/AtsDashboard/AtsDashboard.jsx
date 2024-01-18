import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import ATSLayout from '../../atsComponents/ATSLayout'
import Footer from '../../components/Footer';
import $ from 'jquery';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

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
import { useNavigate, useParams } from 'react-router-dom';
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
            label: 'Clients',
            data: [12.5, 12.5, 2.5, 5, 0, 2.5, 2.5, 10],
            borderColor: '#5C3B2E',
            backgroundColor: '#714F36',
        },
        {
            fill: true,
            label: 'Candidates',
            data: [7.5, 8, 5, 7.5, 12.5, 5, 6, 7.5],
            borderColor: '#714F36',
            backgroundColor: '#F9C833',
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

const AtsDashboard = () => {
    const { token } = useParams();
    const [offlineClientDetail, setofflineClientDetail] = useState([]);
    const [atsJobDetail, setatsJobDetail] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updatePostedJobs, setUpdatePostedJobs] = useState([]);
    const [employeeId, setEmployeeId] = useState("");
    const { getProtectedData } = useContext(AuthContext);
    const [atsToken, setatsToken] = useState("")

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
        localStorage.setItem("atsToken", JSON.stringify(token));
        setatsToken(token)
    }, [token])

    useEffect(() => {
        if (atsToken) {
            const fetchData = async () => {
                try {
                    const userData = await getProtectedData(atsToken);
                    console.log(userData);
                    setEmployeeId(userData.id);
                } catch (error) {
                    console.log(error)
                }
            };

            fetchData();
            getAllofflineClientDetails();

        }
    }, [atsToken]);

    const getATSInactiveJobs = async () => {
        try {
            // setLoading(true);
            const res = await axios.get(`https://skillety-n6r1.onrender.com/my-posted-jobs/${employeeId}`, {
                headers: {
                    Authorization: `Bearer ${atsToken}`,
                    Accept: 'application/json'
                }
            });
            const result = res.data;
            if (!result.error) {
                console.log(result);
                setUpdatePostedJobs(prevPostedJobs => [...prevPostedJobs, ...result]);
            } else {
                console.log(result);
            }

            // setLoading(false);
        } catch (err) {
            console.log(err);

            // setLoading(false);
        }
    }

    const getATSActiveJobs = async () => {
        try {
            // setLoading(true);
            const res = await axios.get(`https://skillety-n6r1.onrender.com/ats-active-jobs/${employeeId}`, {
                headers: {
                    Authorization: `Bearer ${atsToken}`,
                    Accept: 'application/json'
                }
            });
            const result = res.data;
            if (!result.error) {
                console.log(result);
                const updatedJobsWithActive = result.map(job => ({ ...job, active: true }));

                setUpdatePostedJobs(prevPostedJobs => [...prevPostedJobs, ...updatedJobsWithActive]);
            } else {
                console.log(result);
            }

            // setLoading(false);
        } catch (err) {
            console.log(err);

            // setLoading(false);
        }
    }

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
        setatsJobDetail(newArray)
        // setLoading(newArray.length === 0);
    }, [updatePostedJobs]);

    const getAllofflineClientDetails = async () => {
        try {
            setLoading(true);

            const response = await axios.get(`https://skillety-n6r1.onrender.com/offline-client-Details`, {
                headers: {
                    Authorization: `Bearer ${atsToken}`,
                    Accept: 'application/json'
                }
            });
            const result = response.data;
            if (!result.error) {
                console.log(result);
                setofflineClientDetail(result.reverse());
            } else {
                console.log(result);
            }
            setLoading(false);
        } catch (err) {
            console.log(err);

            setLoading(false);
        }
    }


    useEffect(() => {
        if (employeeId) {
            getATSActiveJobs();
            getATSInactiveJobs();
        }
    }, [employeeId])

    return (
        <div>
            <div class="main-wrapper main-wrapper-1">
                <div class="navbar-bg"></div>
                <ATSLayout />

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

                                {/* <h1>
                                    <Skeleton height={40} width={200} />
                                    <Skeleton count={3} />
                                    <Skeleton circle={true} height={50} width={50} />
                                </h1> */}


                                {loading ? (
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
                                                    <p className='dash-num-title'>Clients</p>
                                                    <a href="/all-offline-clients"><h4 className='dash-num-count'>{offlineClientDetail.length}</h4></a>
                                                </div>
                                            </div>

                                            <div className="col-12 col-xxl-3 col-xl-3 col-md-6">
                                                <div className="dash-num-count-area">
                                                    <p className='dash-num-title'>Jobs</p>
                                                    <h4 className='dash-num-count'>{atsJobDetail.length}</h4>
                                                </div>
                                            </div>

                                            <div className="col-12 col-xxl-3 col-xl-3 col-md-6">
                                                <div className="dash-num-count-area">
                                                    <p className='dash-num-title'>Upcoming Interview</p>
                                                    <h4 className='dash-num-count'>00</h4>
                                                </div>
                                            </div>

                                            <div className="col-12 col-xxl-3 col-xl-3 col-md-6">
                                                <div className="dash-num-count-area">
                                                    <p className='dash-num-title'>New Notification</p>
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
                                                        <p className='dash-num-title'>Job Posted</p>
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
                                                        <p className='dash-num-title'>Upcoming Interview</p>
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
                                )}


                                {/* <div className="dash-chart-section">
                                    <div className="dash-chart-area">
                                        <div className="dash-chart-top-area">
                                            <div className="dash-chart-title">Overview</div>
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
                                </div> */}

                                <div class="row">
                                    <div class="col-12">
                                        <div className="dash-table-section">
                                            <div className="dash-table-area">
                                                <div className="dash-table-top-area clients">
                                                    <div className="dash-table-title">
                                                        New Clients
                                                    </div>
                                                    <a href='/all-offline-clients' className="dash-table-see-all-btn">See all</a>
                                                </div>
                                                <div class="table-responsive mt-4">
                                                    <table class="table table-striped table-hover dash-table">
                                                        <tr className='dash-table-row heading'>
                                                            <th className='dash-table-data1 heading'>DOU.</th>
                                                            <th className='dash-table-data1 text-center heading'>Company Name</th>
                                                            <th className='dash-table-data1 text-center heading'>Company Website</th>
                                                            {/* <th className='dash-table-data1 text-center heading'>View</th> */}
                                                        </tr>
                                                        {offlineClientDetail.length > 0 ?
                                                            offlineClientDetail.slice(0, 10).map(client => {
                                                                const clientLogo = (client?.clientLogo) ? `https://skillety-n6r1.onrender.com/offline_client_logo/${client?.clientLogo}` : "../assets/img/talents-images/avatar.jpg"
                                                                return (
                                                                    <tr className='dash-table-row'>
                                                                        <td className='dash-table-data1'>
                                                                            {`${new Date(client.updatedAt).getDate().toString().padStart(2, '0')}/${(new Date(client.updatedAt).getMonth() + 1).toString().padStart(2, '0')}/${new Date(client.updatedAt).getFullYear() % 100}`}
                                                                        </td>
                                                                        <td className='dash-table-data1 text-center text-capitalized'>
                                                                            {/* <img src={clientLogo} className='dash-table-avatar-img' alt="" /> */}
                                                                            {client.companyName}
                                                                        </td>
                                                                        <td className='dash-table-data1 text-center text-capitalized'>
                                                                            <a href={`${client?.companyWebsite}`}
                                                                                className='view-det-sub-head link is-link'
                                                                                target='_blank'>
                                                                                {client?.companyWebsite}
                                                                            </a>
                                                                        </td>
                                                                        {/* <td className='text-center dash-table-view-btn-area'>
                                                                        <button className='dash-table-view-btn client with-border pl-4 pr-4'
                                                                            data-toggle="modal">View
                                                                        </button>
                                                                    </td> */}
                                                                    </tr>
                                                                )
                                                            }) :
                                                            <tr>
                                                                <td colSpan={3} className='text-secondary text-center'>
                                                                    No more clients!
                                                                </td>
                                                            </tr>
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
                                                <div className="dash-table-top-area candidates">
                                                    <div className="dash-table-title">
                                                        New Jobs
                                                    </div>
                                                    <a href='' className="dash-table-see-all-btn">See all</a>
                                                </div>
                                                <div class="table-responsive mt-4">

                                                    <table class="table table-striped table-hover dash-table">
                                                        <tr className='dash-table-row heading'>
                                                            <th className='dash-table-data1 heading'>DOU</th>
                                                            <th className='dash-table-data1 text-center heading'>Job Role</th>
                                                            <th className='dash-table-data1 text-center heading'>Job Category</th>
                                                            <th className='dash-table-data1 text-center heading'>Status</th>
                                                        </tr>
                                                        {atsJobDetail.length > 0 ?
                                                            atsJobDetail.slice(0, 10).map(job => {
                                                                return (
                                                                    <tr className='dash-table-row'>
                                                                        <td className='dash-table-data1'>
                                                                            {`${new Date(job.updatedAt).getDate().toString().padStart(2, '0')}/${(new Date(job.updatedAt).getMonth() + 1).toString().padStart(2, '0')}/${new Date(job.updatedAt).getFullYear() % 100}`}
                                                                        </td>
                                                                        <td className='dash-table-data1 text-center text-capitalized'>{job.jobRole}</td>
                                                                        <td className='dash-table-data1 text-center text-capitalized'>{job.jobCategory}</td>
                                                                        <td className='dash-table-data1 text-center text-capitalized'>{job.active ? "Active" : "In-Active"}</td>
                                                                    </tr>
                                                                )
                                                            }) :
                                                            <tr>
                                                                <td colSpan={4} className='text-secondary text-center'>
                                                                    No more jobs!
                                                                </td>
                                                            </tr>
                                                        }
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
        </div>
    )
}

export default AtsDashboard
import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import ATSLayout from '../../components/ATSLayout';
import Footer from '../../components/Footer';
import './RecruiterDashboard.css';
import $ from 'jquery';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { jwtDecode } from "jwt-decode";

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


const RecruiterDashboard = () => {
    const navigate =useNavigate();
    const { token } = useParams();
    const { getProtectedData} = useContext(AuthContext);
    const [clientDetail, setClientDetail] = useState([]);
    const [candidateDetail, setCandidateDetail] = useState([]);
    const [loading, setLoading] = useState(true);

    const [filter, setFilter] = useState('Weekly');

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

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
            case 'Weekly':
                return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
            case 'Monthly':
                return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            case 'Yearly':
                return ['2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030'];
            default:
                return [];
        }
    };

    const getData = () => {
        switch (filter) {
            case 'Weekly':
                return [
                    [12.5, 12.5, 2.5, 5, 0, 2.5, 2.5, 10],
                    [7.5, 8, 5, 7.5, 12.5, 5, 6, 7.5],
                ];
            case 'Monthly':
                return [
                    [20, 25, 30, 22, 18, 25, 28, 30, 20, 15, 10, 18],
                    [15, 18, 20, 22, 30, 25, 28, 30, 22, 18, 15, 20],
                ];
            case 'Yearly':
                return [
                    [100, 120, 80, 90, 110, 130, 140, 160, 180, 200, 180, 150],
                    [80, 100, 70, 90, 120, 150, 160, 180, 200, 220, 200, 170],
                ];
            default:
                return [];
        }
    };

    const data = {
        labels: getLabels(),
        datasets: [
            {
                fill: true,
                label: 'Clients',
                data: getData()[0],
                borderColor: '#5C3B2E',
                backgroundColor: '#714F36',
            },
            {
                fill: true,
                label: 'Candidates',
                data: getData()[1],
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

    // useEffect(() => {
    //     localStorage.setItem("staffToken", JSON.stringify(token));
    // }, [token])

    useEffect(() => {
        try {
            if (token && typeof token === 'string' && token.split('.').length === 3) {
                const decodeToken =  jwtDecode(token); // Decode the token
                console.log(decodeToken)
                decodeToken && localStorage.setItem("staffToken", JSON.stringify(token)); // Save the token in local storage
            }else{
                navigate("/")
            }
        } catch (error) {
            // If decoding fails or token is not a string, do nothing
            console.log(error);
            navigate("/")
        }
    }, [token]);

    useEffect(() => {
        
            const fetchData = async () => {
                try {
                   
                    const user = await getProtectedData(token);
                    console.log(user);
                   
                } catch (error) {
                    console.log(error);
                    navigate("/")
                }
            };

            fetchData();

            
        
    }, [token]);

    const getAllClientDetails = async () => {
        try {
            setLoading(true);

            const response = await axios.get(`https://skillety-n6r1.onrender.com/client-Detail`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json'
                }
            });
            const result = response.data;
            if (!result.error) {
                console.log(result);
                setClientDetail(result.reverse());
            } else {
                console.log(result);
            }
            setLoading(false);
        } catch (err) {
            console.log(err);

            setLoading(false);
        }
    }

    const getAllCandidateDetail = async () => {
        try {
            setLoading(true);
            const response = await axios.get('https://skillety-n6r1.onrender.com/candidate-Detail', {
                headers: {
                    Authorization: `Bearer ${token}`,
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

            setLoading(false);
        } catch (error) {
            console.log(error);

            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            getAllClientDetails();
            getAllCandidateDetail();
        }

    }, [token]);


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
                                                    <h4 className='dash-num-count'>{clientDetail.length}</h4>
                                                </div>
                                            </div>

                                            <div className="col-12 col-xxl-3 col-xl-3 col-md-6">
                                                <div className="dash-num-count-area">
                                                    <p className='dash-num-title'>Candidates</p>
                                                    <h4 className='dash-num-count'>{candidateDetail.length}</h4>
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
                                                            <option value="Weekly" selected>Weekly</option>
                                                            <option value="Monthly">Monthly</option>
                                                            <option value="Yearly">Yearly</option>
                                                        </select>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                        <Line options={options} data={data} />
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-12">
                                        <div className="dash-table-section">
                                            <div className="dash-table-area">
                                                <div className="dash-table-top-area clients">
                                                    <div className="dash-table-title">
                                                        New Clients
                                                    </div>
                                                    <a href='/all-clients' className="dash-table-see-all-btn">See all</a>
                                                </div>
                                                <div class="table-responsive mt-4">
                                                    <table class="table table-striped table-hover dash-table">
                                                        <tr className='dash-table-row heading'>
                                                            <th className='dash-table-data1 heading'>DOR.</th>
                                                            <th className='dash-table-data1 text-center heading'>Name</th>
                                                            <th className='dash-table-data1 text-center heading'>Company</th>
                                                            {/* <th className='dash-table-data1 text-center heading'>View</th> */}
                                                        </tr>
                                                        {clientDetail.slice(0, 10).map(client => {
                                                            return (
                                                                <tr className='dash-table-row'>
                                                                    <td className='dash-table-data1'>
                                                                        {`${new Date(client.createdAt).getDate().toString().padStart(2, '0')}/${(new Date(client.createdAt).getMonth() + 1).toString().padStart(2, '0')}/${new Date(client.createdAt).getFullYear() % 100}`}
                                                                    </td>
                                                                    <td className='dash-table-data1 text-center text-capitalized'>{client.name}</td>
                                                                    <td className='dash-table-data1 text-center text-capitalized'>{client.companyName}</td>
                                                                    {/* <td className='text-center dash-table-view-btn-area'>
                                                                        <button className='dash-table-view-btn client with-border pl-4 pr-4'
                                                                            data-toggle="modal">View
                                                                        </button>
                                                                    </td> */}
                                                                </tr>
                                                            )
                                                        })}
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
                                                        New Candidates
                                                    </div>
                                                    <a href='/all-candidates' className="dash-table-see-all-btn">See all</a>
                                                </div>
                                                <div class="table-responsive mt-4">

                                                    <table class="table table-striped table-hover dash-table">
                                                        <tr className='dash-table-row heading'>
                                                            <th className='dash-table-data1 heading'>DOR</th>
                                                            <th className='dash-table-data1 text-center heading'>Full Name</th>
                                                            <th className='dash-table-data1 text-center heading'>Designation</th>
                                                            {/* <th className='dash-table-data1 text-center heading'>View</th> */}
                                                        </tr>
                                                        {candidateDetail.slice(0, 10).map(candidate => {
                                                            return (
                                                                <tr className='dash-table-row'>
                                                                    <td className='dash-table-data1'>
                                                                        {`${new Date(candidate.createdAt).getDate().toString().padStart(2, '0')}/${(new Date(candidate.createdAt).getMonth() + 1).toString().padStart(2, '0')}/${new Date(candidate.createdAt).getFullYear() % 100}`}
                                                                    </td>
                                                                    <td className='dash-table-data1 text-center text-capitalized'>{candidate.firstName} {candidate.lastName}</td>
                                                                    <td className='dash-table-data1 text-center text-capitalized'>{candidate.designation[0]}</td>
                                                                    {/* <td className='text-center dash-table-view-btn-area'>
                                                                        <button className='dash-table-view-btn client with-border pl-4 pr-4'
                                                                            data-toggle="modal">View
                                                                        </button>
                                                                    </td> */}
                                                                </tr>
                                                            )
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
        </div>
    )
}

export default RecruiterDashboard
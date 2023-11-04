import React from 'react';
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
            label: 'Candidate Applied',
            data: [12.5, 12.5, 2.5, 5, 0, 2.5, 2.5, 10],
            borderColor: '#F9C833',
            backgroundColor: '#714F36',
        },
        {
            fill: true,
            label: 'Candidate Screened',
            data: [7.5, 8, 5, 7.5, 12.5, 5, 6, 7.5],
            borderColor: '#714F36',
            backgroundColor: '#C2B9B0',
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

    return (
        <div>
            <div class="main-wrapper main-wrapper-1">
                <div class="navbar-bg"></div>
                <ClientLayout dashBoard={true} />

                <div class="main-content">
                    <section class="section">
                        <div className="dash-section">
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

                                <div className="dash-num-count-section">
                                    <div className="row">
                                        <div className="col-12 col-xxl-3 col-xl-3 col-md-6">
                                            <div className="dash-num-count-area">
                                                <p className='dash-num-title'>Job <br /> Posted</p>
                                                <h4 className='dash-num-count'>14</h4>
                                            </div>
                                        </div>

                                        <div className="col-12 col-xxl-3 col-xl-3 col-md-6">
                                            <div className="dash-num-count-area">
                                                <p className='dash-num-title'>Unread <br /> Applications</p>
                                                <h4 className='dash-num-count'>04</h4>
                                            </div>
                                        </div>

                                        <div className="col-12 col-xxl-3 col-xl-3 col-md-6">
                                            <div className="dash-num-count-area">
                                                <p className='dash-num-title'>Upcoming <br /> Interview</p>
                                                <h4 className='dash-num-count'>08</h4>
                                            </div>
                                        </div>

                                        <div className="col-12 col-xxl-3 col-xl-3 col-md-6">
                                            <div className="dash-num-count-area">
                                                <p className='dash-num-title'>New <br /> Notification</p>
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

                                <div className="dash-chart-section">
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
                                </div>

                                <div class="row">
                                    <div class="col-12 col-xl-12 pr-2">
                                        <div className="dash-table-section">
                                            <div className="dash-table-area">
                                                <div className="dash-table-top-area">
                                                    <div className="dash-table-title">
                                                        New Notifications
                                                    </div>
                                                    <a href='#' className="dash-table-see-all-btn">See all</a>
                                                </div>
                                                <div class="table-responsive dash-table-container client mt-4">
                                                    <table class="table table-striped table-hover dash-table">
                                                        <tr className='dash-table-row'>
                                                            <td className='dash-table-sub-data data-nowrap'>05:15 PM</td>
                                                            <td className='dash-table-sub-data'>Lorem Ipsum is simply dummy text of the printing and typesetting ....................</td>
                                                            <td className='text-right dash-table-view-btn-area'>
                                                                <button className='dash-table-view-btn client'
                                                                    data-toggle="modal">View</button>
                                                            </td>
                                                        </tr>

                                                        <tr className='dash-table-row'>
                                                            <td className='dash-table-sub-data data-nowrap'>05:15 PM</td>
                                                            <td className='dash-table-sub-data'>Lorem Ipsum is simply dummy text of the printing and typesetting ....................</td>
                                                            <td className='text-right dash-table-view-btn-area'>
                                                                <button className='dash-table-view-btn client'
                                                                    data-toggle="modal">View</button>
                                                            </td>
                                                        </tr>

                                                        <tr className='dash-table-row'>
                                                            <td className='dash-table-sub-data data-nowrap'>05:15 PM</td>
                                                            <td className='dash-table-sub-data'>Lorem Ipsum is simply dummy text of the printing and typesetting ....................</td>
                                                            <td className='text-right dash-table-view-btn-area'>
                                                                <button className='dash-table-view-btn client'
                                                                    data-toggle="modal">View</button>
                                                            </td>
                                                        </tr>

                                                        <tr className='dash-table-row'>
                                                            <td className='dash-table-sub-data data-nowrap'>05:15 PM</td>
                                                            <td className='dash-table-sub-data'>Lorem Ipsum is simply dummy text of the printing and typesetting ....................</td>
                                                            <td className='text-right dash-table-view-btn-area'>
                                                                <button className='dash-table-view-btn client'
                                                                    data-toggle="modal">View</button>
                                                            </td>
                                                        </tr>

                                                        <tr className='dash-table-row'>
                                                            <td className='dash-table-sub-data data-nowrap'>05:15 PM</td>
                                                            <td className='dash-table-sub-data'>Lorem Ipsum is simply dummy text of the printing and typesetting ....................</td>
                                                            <td className='text-right dash-table-view-btn-area'>
                                                                <button className='dash-table-view-btn client'
                                                                    data-toggle="modal">View</button>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-12 col-xl-12 pl-2">
                                        <div className="dash-table-section">
                                            <div className="dash-table-area">
                                                <div className="dash-table-top-area">
                                                    <div className="dash-table-title">
                                                        New Application
                                                    </div>
                                                    <a href='#' className="dash-table-see-all-btn">See all</a>
                                                </div>
                                                <div class="table-responsive dash-table-container client mt-4">
                                                    <table class="table table-striped table-hover dash-table">
                                                        <tr className='dash-table-row'>
                                                            <td>
                                                                <img src="assets/img/layout/user-img.png" className='dash-table-avatar-img' alt="" />
                                                            </td>
                                                            <td className='dash-table-sub client'>
                                                                Candidate 1<br />
                                                                <span className='dash-table-sub-data'>1st Aug, 2023, 08:33pm</span>
                                                            </td>
                                                            <td className='dash-table-sub-data'>Lorem Ipsum is simply dummy text .......</td>
                                                            <td className='text-right dash-table-view-btn-area'>
                                                                <button className='dash-table-view-btn client'
                                                                    data-toggle="modal">View CV
                                                                </button>
                                                            </td>
                                                        </tr>

                                                        <tr className='dash-table-row'>
                                                            <td>
                                                                <img src="assets/img/layout/user-img.png" className='dash-table-avatar-img' alt="" />
                                                            </td>
                                                            <td className='dash-table-sub client'>
                                                                Candidate 1<br />
                                                                <span className='dash-table-sub-data'>1st Aug, 2023, 08:33pm</span>
                                                            </td>
                                                            <td className='dash-table-sub-data'>Lorem Ipsum is simply dummy text .......</td>
                                                            <td className='text-right dash-table-view-btn-area'>
                                                                <button className='dash-table-view-btn client'
                                                                    data-toggle="modal">View CV
                                                                </button>
                                                            </td>
                                                        </tr>

                                                        <tr className='dash-table-row'>
                                                            <td>
                                                                <img src="assets/img/layout/user-img.png" className='dash-table-avatar-img' alt="" />
                                                            </td>
                                                            <td className='dash-table-sub client'>
                                                                Candidate 1<br />
                                                                <span className='dash-table-sub-data'>1st Aug, 2023, 08:33pm</span>
                                                            </td>
                                                            <td className='dash-table-sub-data'>Lorem Ipsum is simply dummy text .......</td>
                                                            <td className='text-right dash-table-view-btn-area'>
                                                                <button className='dash-table-view-btn client'
                                                                    data-toggle="modal">View CV
                                                                </button>
                                                            </td>
                                                        </tr>

                                                        <tr className='dash-table-row'>
                                                            <td>
                                                                <img src="assets/img/layout/user-img.png" className='dash-table-avatar-img' alt="" />
                                                            </td>
                                                            <td className='dash-table-sub client'>
                                                                Candidate 1<br />
                                                                <span className='dash-table-sub-data'>1st Aug, 2023, 08:33pm</span>
                                                            </td>
                                                            <td className='dash-table-sub-data'>Lorem Ipsum is simply dummy text .......</td>
                                                            <td className='text-right dash-table-view-btn-area'>
                                                                <button className='dash-table-view-btn client'
                                                                    data-toggle="modal">View CV
                                                                </button>
                                                            </td>
                                                        </tr>

                                                        <tr className='dash-table-row'>
                                                            <td>
                                                                <img src="assets/img/layout/user-img.png" className='dash-table-avatar-img' alt="" />
                                                            </td>
                                                            <td className='dash-table-sub client'>
                                                                Candidate 1<br />
                                                                <span className='dash-table-sub-data'>1st Aug, 2023, 08:33pm</span>
                                                            </td>
                                                            <td className='dash-table-sub-data'>Lorem Ipsum is simply dummy text .......</td>
                                                            <td className='text-right dash-table-view-btn-area'>
                                                                <button className='dash-table-view-btn client'
                                                                    data-toggle="modal">View CV
                                                                </button>
                                                            </td>
                                                        </tr>

                                                        <tr className='dash-table-row'>
                                                            <td>
                                                                <img src="assets/img/layout/user-img.png" className='dash-table-avatar-img' alt="" />
                                                            </td>
                                                            <td className='dash-table-sub client'>
                                                                Candidate 1<br />
                                                                <span className='dash-table-sub-data'>1st Aug, 2023, 08:33pm</span>
                                                            </td>
                                                            <td className='dash-table-sub-data'>Lorem Ipsum is simply dummy text .......</td>
                                                            <td className='text-right dash-table-view-btn-area'>
                                                                <button className='dash-table-view-btn client'
                                                                    data-toggle="modal">View CV
                                                                </button>
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
                                </div>

                                <div class="row">
                                    <div class="col-12">
                                        <div className="dash-table-section">
                                            <div className="dash-table-area">
                                                <div className="dash-table-top-area">
                                                    <div className="dash-table-title">
                                                        Posted Jobs
                                                    </div>
                                                    <a href='#' className="dash-table-see-all-btn">See all</a>
                                                </div>
                                                <div class="table-responsive mt-4">
                                                    <table class="table table-striped table-hover dash-table">
                                                        <tr className='dash-table-row'>
                                                            {/* <td>
                                                                <img src="assets/img/home/javascript.png" className='dash-table-avatar-img client' alt="" />
                                                            </td> */}
                                                            <td className='dash-table-data1'>
                                                                Java Developer
                                                            </td>
                                                            <td className='dash-table-data1 text-center'>2024-06-12</td>
                                                            <td className='dash-table-data1 text-center'>245 <br />
                                                                No of Applications</td>
                                                            <td className='dash-table-data1 text-center'>10 <br />
                                                                Positions</td>
                                                            <td className='dash-table-data1 text-center'>3 Min- 4 Max <br />
                                                                Experience</td>
                                                        </tr>

                                                        <tr className='dash-table-row'>
                                                            {/* <td>
                                                                <img src="assets/img/home/design.png" className='dash-table-avatar-img client' alt="" />
                                                            </td> */}
                                                            <td className='dash-table-data1'>
                                                                Ui UX Designer
                                                            </td>
                                                            <td className='dash-table-data1 text-center'>2024-06-12</td>
                                                            <td className='dash-table-data1 text-center'>245 <br />
                                                                No of Applications</td>
                                                            <td className='dash-table-data1 text-center'>10 <br />
                                                                Positions</td>
                                                            <td className='dash-table-data1 text-center'>3 Min- 4 Max <br />
                                                                Experience</td>
                                                        </tr>

                                                        <tr className='dash-table-row'>
                                                            {/* <td>
                                                                <img src="assets/img/home/computer.png" className='dash-table-avatar-img client' alt="" />
                                                            </td> */}
                                                            <td className='dash-table-data1'>
                                                                Full Stack Developer
                                                            </td>
                                                            <td className='dash-table-data1 text-center'>2024-06-12</td>
                                                            <td className='dash-table-data1 text-center'>245 <br />
                                                                No of Applications</td>
                                                            <td className='dash-table-data1 text-center'>10 <br />
                                                                Positions</td>
                                                            <td className='dash-table-data1 text-center'>3 Min- 4 Max <br />
                                                                Experience</td>
                                                        </tr>

                                                        <tr className='dash-table-row'>
                                                            {/* <td>
                                                                <img src="assets/img/home/manager.png" className='dash-table-avatar-img client' alt="" />
                                                            </td> */}
                                                            <td className='dash-table-data1'>
                                                                Senior Manager
                                                            </td>
                                                            <td className='dash-table-data1 text-center'>2024-06-12</td>
                                                            <td className='dash-table-data1 text-center'>245 <br />
                                                                No of Applications</td>
                                                            <td className='dash-table-data1 text-center'>10 <br />
                                                                Positions</td>
                                                            <td className='dash-table-data1 text-center'>3 Min- 4 Max <br />
                                                                Experience</td>
                                                        </tr>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>

                        <div className="dash-right-panel">
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
                        </div>
                    </section>
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default ClientDashboard
import React, { useContext, useState, useRef } from 'react';
import { useEffect } from 'react';
import ATSLayout from '../../../atsComponents/ATSLayout';
import Footer from '../../../components/Footer';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import AuthContext from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import axios from 'axios';

const DailySubmissionReport = () => {
    const [filter, setFilter] = useState("");
    const navigate = useNavigate();
    const [selectedFromDate, setSelectedFromDate] = useState(new Date().toISOString().split('T')[0]);
    const [selectedToDate, setSelectedToDate] = useState(new Date().toISOString().split('T')[0]);
    const [loading, setLoading] = useState(false);
    const [noData, setNoData] = useState(false);
    const [atsToken, setatsToken] = useState("");
    const [customDate, setCustomDate] = useState("");
    const [period, setPeriod] = useState("");
    const [employeeReportDetail, setEmployeeReportDetail] = useState([]);
    const [x, setX] = useState([0, 3]);
    const [date, setDate] = useState([])
    const [reportDate, setReportDate] = useState([])
    
    // const date = [
    //     {
    //         date: "2024-01-01"
    //     },
    //     {
    //         date: "2024-01-02"
    //     },
    //     {
    //         date: "2024-01-04"
    //     }
    // ]
    // const data = [
    //     {
    //         name:"jfhj",
    //         job:[
    //             {
    //                 jName:"kfjv",
    //                 cName:"fkgk",
    //                 joinCand:[
    //                     {
    //                         date: "2024-01-01",
    //                         numOfJoinCandidates: 1
    //                       },
    //                       {
    //                         date: "2024-01-02",
    //                         numOfJoinCandidates: 2
    //                       },
    //                       {
    //                         date: "2024-01-03",
    //                         numOfJoinCandidates: 3
    //                       }
    //                 ]
    //             },
    //             {
    //                 jName:"kfjv",
    //                 cName:"fkgk",
    //                 joinCand:[
    //                     {
    //                         date: "2024-01-01",
    //                         numOfJoinCandidates: 0
    //                       },
    //                       {
    //                         date: "2024-01-02",
    //                         numOfJoinCandidates: 0
    //                       },
    //                       {
    //                         date: "2024-01-03",
    //                         numOfJoinCandidates: 0
    //                       }
    //                 ]
    //             }

    //         ]
    //     }
    // ]

    useEffect(() => {
        setatsToken(JSON.parse(localStorage.getItem('atsToken')))
    }, [atsToken]);
    console.log(selectedFromDate)

    useEffect(() => {
        if (selectedFromDate && selectedToDate) {
            setCustomDate(selectedFromDate + "to" + selectedToDate)
            setReportDate(generateCustomDates(selectedFromDate, selectedToDate));
        }
    }, [selectedFromDate, selectedToDate])

    useEffect(() => {
        if (customDate) {
            setPeriod(customDate)
        }
    }, [customDate])

    useEffect(() => {
        if (filter && filter !== "CustomDate") {
            setPeriod(filter)
        }
    }, [filter])

    const runReport = () => {
        setLoading(true);
        setNoData(false);
        setEmployeeReportDetail([]); 
        setDate(reportDate)
        if (period) {
            axios.get(`https://skillety-n6r1.onrender.com/find-daily-submission-report?period=${period}`, {
                headers: {
                    Authorization: `Bearer ${atsToken}`,
                    Accept: 'application/json'
                }
            })
                .then(res => {
                    setLoading(false)
                    console.log(res.data);
                    setEmployeeReportDetail(res.data);

                })
                .catch(err => {
                    console.log(err);
                    setLoading(false);
                    setNoData(true);
                })
        }

    }

    const handleBackButtonClick = () => {
        navigate(-1);
    };

    const handleFilterChange = (event) => {
        const selectedFilter = event.target.value;
        setFilter(selectedFilter);

        if (selectedFilter === 'thisWeek') {
            setReportDate(generateThisWeekDates());
        } else if (selectedFilter === 'thisMonth') {
            setReportDate(generateThisMonthDates());
        } else if (selectedFilter === 'lastWeek') {
            setReportDate(generateLastWeekDates());
        } else if (selectedFilter === 'lastMonth') {
            setReportDate(generateLastMonthDates());
        } else {
            // Reset date array if no filter selected
            setReportDate([]);
        }
    };

    const generateThisWeekDates = () => {
        const today = new Date();
        const dayOfWeek = today.getDay(); // 0 (Sunday) to 6 (Saturday)
        const startDate = new Date(today);
        startDate.setDate(startDate.getDate() - dayOfWeek); // Start date of the week
        const dates = [];

        for (let i = 0; i < 7; i++) {
            const currentDate = new Date(startDate);
            currentDate.setDate(startDate.getDate() + i);
            dates.push({ date: currentDate.toISOString().split('T')[0] });
        }

        return dates;
    };

    const generateThisMonthDates = () => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const startDate = new Date(year, month, 1); // Set to the first day of the month
        const endDate = new Date(year, month + 1, 0); // Set to the last day of the month

        const dateArray = [];
        for (let currentDate = startDate; currentDate <= endDate; currentDate.setDate(currentDate.getDate() + 1)) {
            if (currentDate <= new Date()) {
                dateArray.push({date:`${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`});
            }
        }

        return dateArray;
      }
    
    const generateLastWeekDates = () => {
        const today = new Date();
        const dayOfWeek = today.getDay(); // 0 (Sunday) to 6 (Saturday)
        const lastWeekStart = new Date(today);
        lastWeekStart.setDate(lastWeekStart.getDate() - dayOfWeek - 7); // Start date of last week
        const dates = [];
    
        for (let i = 0; i < 7; i++) {
            const currentDate = new Date(lastWeekStart);
            currentDate.setDate(lastWeekStart.getDate() + i);
            dates.push({ date: currentDate.toISOString().split('T')[0] });
        }
    
        return dates;
    };
    
    const  generateLastMonthDates = () => {
        const currentDate =  new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() - 1;
        const startDate = new Date(year, month, 1); // Set to the first day of the last month
        const endDate = new Date(year, month + 1, 0); // Set to the last day of the last month

        const dateArray = [];
        for (let currentDate = startDate; currentDate <= endDate; currentDate.setDate(currentDate.getDate() + 1)) {
            dateArray.push({date:`${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`});
        }

        return dateArray;
      }
    
    const generateCustomDates = (fromDate, toDate) => {
        const startDate = new Date(fromDate);
        const endDate = new Date(toDate);
        const dates = [];
    
        for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
            dates.push({ date: date.toISOString().split('T')[0] });
        }
    
        return dates;
    };

    console.log(date)

    const handleFromDateChange = (event) => {
        setSelectedFromDate(event.target.value);
    };

    const handleToDateChange = (event) => {
        setSelectedToDate(event.target.value);
    };

    const tableRef = useRef(null);

    const exportToPDF = () => {
        html2canvas(tableRef.current).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'PNG', 0, 0);
            pdf.save('table.pdf');
        });
    };

    const exportToExcel = () => {
        const table = tableRef.current;
        const ws = XLSX.utils.table_to_sheet(table);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, 'table.xlsx');
    };

    return (
        <div>
            <div class="main-wrapper main-wrapper-1">
                <div class="navbar-bg"></div>

                <ATSLayout />

                <div class="main-content">
                    <section class="section">
                        <div className="my-app-section">
                            <div className="back-button-area">
                                <button className='back-button' onClick={handleBackButtonClick}>
                                    <i className='bi bi-arrow-left mr-2'></i>
                                    Back
                                </button>
                            </div>
                            <div className="admin-component-name text-left">
                                Daily Submission Report
                            </div>

                            <div className="report-page-section">
                                <div className="card report-page-card">
                                    <div className="report-page-des-area">
                                        <p>Daily submission report helps you to track the daily submission of your team to the hiring manager and clients.</p>
                                    </div>

                                    <div className="report-filter-area">
                                        <div className="row">
                                            <div className="col-12 col-lg-3 col-md-6 mb-4 mb-md-3 mb-lg-0">
                                                <div className="report-filter-input-area">
                                                    <i class="bi bi-chevron-down toggle-icon"></i>
                                                    <select
                                                        className='report-filter-input'
                                                        value={filter}
                                                        onChange={handleFilterChange}>
                                                        <option value="">Select Search Period</option>
                                                        <option value="thisWeek">This Week</option>
                                                        <option value="thisMonth">This Month</option>
                                                        <option value="lastWeek">Last Week</option>
                                                        <option value="lastMonth">Last Month</option>
                                                        <option value="CustomDate">Custom Date</option>
                                                    </select>
                                                </div>
                                                {filter === '' && <small className='text-danger'>Please select a search period.</small>}
                                            </div>

                                            {filter === 'CustomDate' && (
                                                <>
                                                    <div className="col-12 col-lg-3 col-md-6 mb-4 mb-md-3 mb-lg-0">
                                                        <div className="report-filter-input-area">
                                                            <label htmlFor="from_date" className='date-filter-label'>From Date</label>
                                                            <input type="date"
                                                                name='from_date'
                                                                className='report-filter-input date'
                                                                value={selectedFromDate}
                                                                onChange={handleFromDateChange} />
                                                        </div>
                                                    </div>

                                                    <div className="col-12 col-lg-3 col-md-6 mb-4 mb-md-3 mb-lg-0">
                                                        <div className="report-filter-input-area">
                                                            <label htmlFor="to_date" className='date-filter-label'>To Date</label>
                                                            <input
                                                                type="date"
                                                                name='to_date'
                                                                className='report-filter-input date'
                                                                value={selectedToDate}
                                                                onChange={handleToDateChange} />
                                                        </div>
                                                    </div>
                                                </>
                                            )}

                                            <div className="col-12 col-lg-3 col-md-6 mb-4 mb-md-3 mb-lg-0">
                                                <button className='run-report-button'
                                                onClick={runReport}
                                                disabled={filter === ""}>Run Report</button>
                                            </div>
                                        </div>
                                    </div>
                                    {employeeReportDetail.length > 0 &&
                                    <div className="report-view-section">
                                        <div className="report-view-area">
                                            <div className="table-responsive">
                                                <table className='table report-table table-bordered' id='Export_table' ref={tableRef}>
                                                    <thead>
                                                        <tr className='report-table-row with-border'>
                                                            <th className='report-table-head-skew'>
                                                                <div><span>User Name</span></div>
                                                            </th>
                                                            <th className='report-table-head-skew'>
                                                                <div><span>Job Name</span></div>
                                                            </th>
                                                            
                                                            <th className='report-table-head-skew'>
                                                                <div><span>Client Name</span></div>
                                                            </th>

                                                        {date.map(singleDate=>
                                                                {return(
                                                                    <th className='report-table-head-skew'>
                                                                        <div><span>{singleDate?.date}</span></div>
                                                                    </th>
                                                                )}
                                                            )}
                                                            
                                                            <th className='report-table-head-skew'>
                                                                <div><span>Total</span></div>
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    {employeeReportDetail.map(data => (
                                                        data?.createdJobs.map((job, jobIndex) => {
                                                            const totalCandidatesByDate = date.map(dateObj => {
                                                            const joinCandObj = job?.joinedCands.find(cand => cand.date === dateObj.date);
                                                            return joinCandObj ? joinCandObj.numOfJoinCandidates : 0;
                                                            });
                                                            const totalCandidates = totalCandidatesByDate.reduce((sum, numOfJoinCandidates) => sum + numOfJoinCandidates, 0);
                                                            return (
                                                            <tr key={jobIndex} className='report-table-row with-border'>
                                                                {jobIndex === 0 && (
                                                                <td className='report-table-data' rowSpan={data?.createdJobs.length}>{data?.name}</td>
                                                                )}
                                                                <td className='report-table-data'>{job?.name}</td>
                                                                <td className='report-table-data'>{job?.clientName}</td>
                                                                {date.map((dateObj, dateIndex) => {
                                                                const joinCandObj = job?.joinedCands.find(cand => cand.date === dateObj.date);
                                                                return (
                                                                    <td key={dateIndex} className='report-table-data text-center'>
                                                                    {joinCandObj ? joinCandObj.numOfJoinCandidates : 0}
                                                                    </td>
                                                                );
                                                                })}
                                                                <td className='report-table-data text-center'>{totalCandidates}</td>
                                                            </tr>
                                                            );
                                                        })
                                                        ))}

                                                        {/* <tr className='report-table-row with-border'>
                                                        <td className='report-table-data text-center'>Total</td> 

                                                        </tr>*/}
                                                        
                                                        {/* <tr className='report-table-row with-border'>
                                                            <td className='report-table-data text-center'>Total</td>
                                                            <td className='report-table-data text-center'>1</td>
                                                            <td className='report-table-data text-center'>0</td>
                                                            <td className='report-table-data text-center'>0</td>
                                                            <td className='report-table-data text-center'></td>
                                                            <td className='report-table-data text-center'>0</td>
                                                            <td className='report-table-data text-center'>0</td>
                                                            <td className='report-table-data text-center'>0</td>
                                                            <td className='report-table-data text-center'>0</td>
                                                            <td className='report-table-data text-center'>0</td>
                                                            <td className='report-table-data text-center'>0</td>
                                                            <td className='report-table-data text-center'>2</td>
                                                        </tr> */}
                                                    </tbody>
                                                    {/* <tfoot>
                                                        <tr className='report-table-row with-border table-foot'>
                                                            <td className='report-table-data text-center' colSpan={2}>Total</td>
                                                            <td className='report-table-data text-center'>1</td>
                                                            <td className='report-table-data text-center'>0</td>
                                                            <td className='report-table-data text-center'>0</td>
                                                            <td className='report-table-data text-center'></td>
                                                            <td className='report-table-data text-center'>0</td>
                                                            <td className='report-table-data text-center'>0</td>
                                                            <td className='report-table-data text-center'>0</td>
                                                            <td className='report-table-data text-center'>0</td>
                                                            <td className='report-table-data text-center'>0</td>
                                                            <td className='report-table-data text-center'>0</td>
                                                            <td className='report-table-data text-center'>2</td>
                                                        </tr>
                                                    </tfoot> */}
                                                </table>
                                            </div>

                                            <div className="report-table-pagination-area">
                                                        <div className="buttons">
                                                            <nav aria-label="Page navigation example">
                                                                <ul className="pagination">
                                                                    <li className="page-item">
                                                                        {x[0] > 0 && <a className="page-link custom" href="" aria-label="Previous"
                                                                            onClick={() => setX([x[0] - 3, x[1] - 3])}>
                                                                            <span aria-hidden="true">&laquo;</span>
                                                                            <span className="sr-only">Previous</span>
                                                                        </a>}
                                                                    </li>
                                                                    {(employeeReportDetail.slice(x[0], x[1]).length === 3 && employeeReportDetail.length > x[1]) && <li className="page-item"
                                                                        onClick={() => setX([0, 3])}><a className="page-link custom" href="#">1</a></li>}
                                                                    {(employeeReportDetail.slice(x[0], x[1]).length === 3 && employeeReportDetail.length > x[1]) && <li className="page-item"
                                                                        onClick={() => setX([3, 6])}><a className="page-link custom" href="#">2</a></li>}
                                                                    {(employeeReportDetail.slice(x[0], x[1]).length === 3 && employeeReportDetail.length > x[1]) && <li className="page-item"
                                                                        onClick={() => setX([6, 9])}><a className="page-link custom" href="#">3</a></li>}
                                                                    {(employeeReportDetail.slice(x[0], x[1]).length === 3 && employeeReportDetail.length > x[1]) && <li className="page-item"><a className="page-link custom" href="#">..</a></li>}
                                                                    <li className="page-item">
                                                                        {(employeeReportDetail.slice(x[0], x[1]).length === 3 && employeeReportDetail.length > x[1]) && <a className="page-link custom" href="#" aria-label="Next"
                                                                            onClick={() => setX([x[0] + 3, x[1] + 3])}>
                                                                            <span aria-hidden="true">&raquo;</span>
                                                                            <span className="sr-only">Next</span>
                                                                        </a>}
                                                                    </li>
                                                                </ul>
                                                            </nav>
                                                        </div>
                                                    </div>

                                            <div className="table-export-area">
                                                <div className='export-head'>Export</div>
                                                <div>
                                                    <button className='table-export-btn pdf mr-2' onClick={exportToPDF}>
                                                        <img src="../assets/img/button/pdf.png" alt="" />
                                                        PDF
                                                    </button>
                                                    <button className='table-export-btn excel' onClick={exportToExcel}>
                                                        <img src="../assets/img/button/xls.png" alt="" />
                                                        EXCEL
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div> }

                                    {noData && <div className="report-no-data-found-area">
                                        <img src="../assets/img/no-data/No-data-found.webp" className='report-no-data-found-img' alt="" />
                                        <div className='report-no-data-found-text'>No data found.</div>
                                        <div className='report-no-data-found-sub-text'>Try to create the information first.</div>
                                    </div>}
                                    
                                    {loading && <div className="dot-spinner-area">
                                            <div className="dot-spinner">
                                                <div className="dot-spinner__dot"></div>
                                                <div className="dot-spinner__dot"></div>
                                                <div className="dot-spinner__dot"></div>
                                                <div className="dot-spinner__dot"></div>
                                                <div className="dot-spinner__dot"></div>
                                                <div className="dot-spinner__dot"></div>
                                                <div className="dot-spinner__dot"></div>
                                                <div className="dot-spinner__dot"></div>
                                            </div>
                                    </div>}
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

export default DailySubmissionReport
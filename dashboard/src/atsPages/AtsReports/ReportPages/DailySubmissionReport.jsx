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
    const [filter, setFilter] = useState([]);
    const navigate = useNavigate();
    const [selectedFromDate, setSelectedFromDate] = useState(new Date().toISOString().split('T')[0]);
    const [selectedToDate, setSelectedToDate] = useState(new Date().toISOString().split('T')[0]);
    const [loading, setLoading] = useState(false);
    const [atsToken, setatsToken] = useState("");
    const [customDate, setCustomDate] = useState("");
    const [period, setPeriod] = useState("");
    const [employeeReportDetail, setEmployeeReportDetail] = useState([]);
    const [x, setX] = useState([0, 3]);
    
    const date = [
        {
            date: "2024-01-01"
        },
        {
            date: "2024-01-02"
        },
        {
            date: "2024-01-04"
        }
    ]
    const data = [
        {
            name:"jfhj",
            job:[
                {
                    jName:"kfjv",
                    cName:"fkgk",
                    joinCand:[
                        {
                            date: "2024-01-01",
                            numOfJoinCandidates: 1
                          },
                          {
                            date: "2024-01-02",
                            numOfJoinCandidates: 2
                          },
                          {
                            date: "2024-01-03",
                            numOfJoinCandidates: 3
                          }
                    ]
                },
                {
                    jName:"kfjv",
                    cName:"fkgk",
                    joinCand:[
                        {
                            date: "2024-01-01",
                            numOfJoinCandidates: 0
                          },
                          {
                            date: "2024-01-02",
                            numOfJoinCandidates: 0
                          },
                          {
                            date: "2024-01-03",
                            numOfJoinCandidates: 0
                          }
                    ]
                }

            ]
        }
    ]

    useEffect(() => {
        setatsToken(JSON.parse(localStorage.getItem('atsToken')))
    }, [atsToken]);
    console.log(selectedFromDate)

    useEffect(() => {
        if (selectedFromDate && selectedToDate) {
            setCustomDate(selectedFromDate + "to" + selectedToDate)
        }
    }, [selectedFromDate, selectedToDate])

    useEffect(() => {
        if (customDate) {
            setPeriod(customDate)
        }
    }, [customDate])

    useEffect(() => {
        if (filter) {
            setPeriod(filter)
        }
    }, [filter])

    const runReport = () => {
        setLoading(true);
        setEmployeeReportDetail([]); 
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
                    setLoading(false)
                })
        }

    }

    const handleBackButtonClick = () => {
        navigate(-1);
    };

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

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
                                                onClick={runReport}>Run Report</button>
                                            </div>
                                        </div>
                                    </div>

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

                                                        {date.map(date=>
                                                                {return(
                                                                    <th className='report-table-head-skew'>
                                                                        <div><span>{date?.date}</span></div>
                                                                    </th>
                                                                )}
                                                            )}
                                                            
                                                            <th className='report-table-head-skew'>
                                                                <div><span>Total</span></div>
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    {data.map(dat => (
                                                        dat.job.map((job, jobIndex) => {
                                                            const totalCandidatesByDate = date.map(dateObj => {
                                                            const joinCandObj = job.joinCand.find(cand => cand.date === dateObj.date);
                                                            return joinCandObj ? joinCandObj.numOfJoinCandidates : 0;
                                                            });
                                                            const totalCandidates = totalCandidatesByDate.reduce((sum, numOfJoinCandidates) => sum + numOfJoinCandidates, 0);
                                                            return (
                                                            <tr key={jobIndex} className='report-table-row with-border'>
                                                                {jobIndex === 0 && (
                                                                <td className='report-table-data' rowSpan={dat.job.length}>{dat.name}</td>
                                                                )}
                                                                <td className='report-table-data'>{job.jName}</td>
                                                                <td className='report-table-data'>{job.cName}</td>
                                                                {date.map((dateObj, dateIndex) => {
                                                                const joinCandObj = job.joinCand.find(cand => cand.date === dateObj.date);
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
                                                                <a className="page-link custom" href="#" aria-label="Previous">
                                                                    <span aria-hidden="true">&laquo;</span>
                                                                    <span className="sr-only">Previous</span>
                                                                </a>
                                                            </li>
                                                            <li className="page-item"><a className="page-link custom" href="#">1</a></li>
                                                            <li className="page-item"><a className="page-link custom" href="#">2</a></li>
                                                            <li className="page-item"><a className="page-link custom" href="#">3</a></li>
                                                            <li className="page-item"><a className="page-link custom" href="#">..</a></li>
                                                            <li className="page-item">
                                                                <a className="page-link custom" href="#" aria-label="Next">
                                                                    <span aria-hidden="true">&raquo;</span>
                                                                    <span className="sr-only">Next</span>
                                                                </a>
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
                                    </div>

                                    <div className="report-no-data-found-area">
                                        <img src="../assets/img/no-data/No-data-found.webp" className='report-no-data-found-img' alt="" />
                                        <div className='report-no-data-found-text'>No data found.</div>
                                        <div className='report-no-data-found-sub-text'>Try to create the information first.</div>
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

export default DailySubmissionReport
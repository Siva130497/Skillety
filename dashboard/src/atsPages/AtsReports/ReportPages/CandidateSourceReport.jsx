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

const CandidateSourceReport = () => {
    const [filter, setFilter] = useState([]);
    const navigate = useNavigate();
    const [selectedFromDate, setSelectedFromDate] = useState(new Date().toISOString().split('T')[0]);
    const [selectedToDate, setSelectedToDate] = useState(new Date().toISOString().split('T')[0]);

    const [selectedType, setSelectedType] = useState('Summary');

    const handleTypeChange = (event) => {
        setSelectedType(event.target.value);
    };

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
                                    <i className='bi bi-arrow-left mr-2 back-icon'></i>
                                    Back
                                </button>
                            </div>
                            <div className="admin-component-name text-left">
                                Candidate Source Report
                            </div>

                            <div className="report-page-section">
                                <div className="card report-page-card">
                                    <div className="report-page-des-area">
                                        <p>Candidate source report helps you to measure the efficiency of different sourcing channels and helps you make better decisions about sourcing strategy.</p>
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
                                                        <option value="ThisWeek">This Week</option>
                                                        <option value="ThisMonth">This Month</option>
                                                        <option value="LastWeek">Last Week</option>
                                                        <option value="LastMonth">Last Month</option>
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
                                                <button className='run-report-button'>Run Report</button>
                                            </div>
                                        </div>
                                        
                                        <div className="report-radio-area">
                                            <div className="report-radio-container">
                                                <label className="report-radio-button">
                                                    <input
                                                        type="radio"
                                                        name="report-radio-option"
                                                        id='Summary'
                                                        value="Summary"
                                                        checked={selectedType === 'Summary'}
                                                        onChange={handleTypeChange}
                                                    />
                                                    <span className="report-radio"></span>
                                                    Summary
                                                </label>
                                                <label className="report-radio-button">
                                                    <input
                                                        type="radio"
                                                        name="report-radio-option"
                                                        id='UserWise'
                                                        value="UserWise"
                                                        checked={selectedType === 'UserWise'}
                                                        onChange={handleTypeChange}
                                                    />
                                                    <span className="report-radio"></span>
                                                    User Wise
                                                </label>
                                                <label className="report-radio-button">
                                                    <input
                                                        type="radio"
                                                        name="report-radio-option"
                                                        id='DateWise'
                                                        value="DateWise"
                                                        checked={selectedType === 'DateWise'}
                                                        onChange={handleTypeChange}
                                                    />
                                                    <span className="report-radio"></span>
                                                    Date Wise
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="report-view-section">
                                        {selectedType === 'Summary' && (
                                            <div className="report-view-area">
                                                <div className="table-responsive">
                                                    <table className='table report-table table-bordered' id='Export_table' ref={tableRef}>
                                                        <thead>
                                                            <tr className='report-table-row with-border'>
                                                                <th className='report-table-head no-verical-align'>SOURCE</th>
                                                                <th className='report-table-head no-verical-align w-15'>JOB VIEWS</th>
                                                                <th className='report-table-head no-verical-align w-15'>APPLY</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr className='report-table-row with-border'>
                                                                <td className='report-table-data'>Upload</td>
                                                                <td className='report-table-data'>0</td>
                                                                <td className='report-table-data'>1</td>
                                                            </tr>
                                                            <tr className='report-table-row with-border'>
                                                                <td className='report-table-data'>Adzuna</td>
                                                                <td className='report-table-data'>0</td>
                                                                <td className='report-table-data'>1</td>
                                                            </tr>
                                                            <tr className='report-table-row with-border'>
                                                                <td className='report-table-data'>Twitter</td>
                                                                <td className='report-table-data'>0</td>
                                                                <td className='report-table-data'>1</td>
                                                            </tr>
                                                            <tr className='report-table-row with-border'>
                                                                <td className='report-table-data'>Created</td>
                                                                <td className='report-table-data'>0</td>
                                                                <td className='report-table-data'>1</td>
                                                            </tr>
                                                        </tbody>
                                                        <tfoot>
                                                            <tr className='report-table-row with-border table-foot'>
                                                                <td className='report-table-data'>Total</td>
                                                                <td className='report-table-data'>1</td>
                                                                <td className='report-table-data'>0</td>
                                                            </tr>
                                                        </tfoot>
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
                                        )}

                                        {selectedType === 'UserWise' && (
                                            <div className="report-view-area">
                                                <div className="table-responsive">
                                                    <table className='table report-table table-bordered' id='Export_table' ref={tableRef}>
                                                        <thead>
                                                            <tr className='report-table-row with-border'>
                                                                <th className='report-table-head no-verical-align'>USER NAME</th>
                                                                <th className='report-table-head no-verical-align text-center'>CREATED</th>
                                                                <th className='report-table-head no-verical-align text-center'>RESUME UPLOAD</th>
                                                                <th className='report-table-head no-verical-align text-center'>EXCEL</th>
                                                                <th className='report-table-head no-verical-align text-center'>EMAIL</th>
                                                                <th className='report-table-head no-verical-align text-center'>GMAIL PLUGIN</th>
                                                                <th className='report-table-head no-verical-align text-center'>LINKEDIN PLUGIN</th>
                                                                <th className='report-table-head no-verical-align text-center'>OUTLOOK PLUGIN</th>
                                                                <th className='report-table-head no-verical-align text-center'>STACKOVERFLOW PLUGIN</th>
                                                                <th className='report-table-head no-verical-align text-center'>CAREER-BUILDER PLUGIN</th>
                                                                <th className='report-table-head no-verical-align text-center'>DICE PLUGIN</th>
                                                                <th className='report-table-head no-verical-align text-center'>TIMES JOB PLUGIN</th>
                                                                <th className='report-table-head no-verical-align text-center'>MONSTER PLUGIN</th>
                                                                <th className='report-table-head no-verical-align text-center'>NAUKRI PLUGIN</th>
                                                                <th className='report-table-head no-verical-align text-center'>SOURCING DEPARTMENT</th>
                                                                <th className='report-table-head no-verical-align text-center'>TOTAL</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr className='report-table-row with-border'>
                                                                <td className='report-table-data'>
                                                                    <button className='report-data-view-button' data-toggle="modal" data-target="#ViewModal">Supriya</button>
                                                                </td>
                                                                <td className='report-table-data text-center'>0</td>
                                                                <td className='report-table-data text-center'>1</td>
                                                                <td className='report-table-data text-center'>1</td>
                                                                <td className='report-table-data text-center'>1</td>
                                                                <td className='report-table-data text-center'>1</td>
                                                                <td className='report-table-data text-center'>1</td>
                                                                <td className='report-table-data text-center'>1</td>
                                                                <td className='report-table-data text-center'>1</td>
                                                                <td className='report-table-data text-center'>1</td>
                                                                <td className='report-table-data text-center'>1</td>
                                                                <td className='report-table-data text-center'>1</td>
                                                                <td className='report-table-data text-center'>1</td>
                                                                <td className='report-table-data text-center'>1</td>
                                                                <td className='report-table-data text-center'>1</td>
                                                                <td className='report-table-data text-center is-bold'>1</td>
                                                            </tr>
                                                        </tbody>
                                                        <tfoot>
                                                            <tr className='report-table-row with-border table-foot'>
                                                                <td className='report-table-data'>Total</td>
                                                                <td className='report-table-data' align='center'>1</td>
                                                                <td className='report-table-data' align='center'>0</td>
                                                                <td className='report-table-data' align='center'>0</td>
                                                                <td className='report-table-data' align='center'>0</td>
                                                                <td className='report-table-data' align='center'>0</td>
                                                                <td className='report-table-data' align='center'>0</td>
                                                                <td className='report-table-data' align='center'>0</td>
                                                                <td className='report-table-data' align='center'>0</td>
                                                                <td className='report-table-data' align='center'>0</td>
                                                                <td className='report-table-data' align='center'>0</td>
                                                                <td className='report-table-data' align='center'>0</td>
                                                                <td className='report-table-data' align='center'>0</td>
                                                                <td className='report-table-data' align='center'>0</td>
                                                                <td className='report-table-data' align='center'>0</td>
                                                                <td className='report-table-data' align='center'>0</td>
                                                            </tr>
                                                        </tfoot>
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
                                        )}

                                        {selectedType === 'DateWise' && (
                                            <div className="report-view-area">
                                                <div className="table-responsive">
                                                    <table className='table report-table table-bordered' id='Export_table' ref={tableRef}>
                                                        <thead>
                                                            <tr className='report-table-row with-border'>
                                                                <th className='report-table-head no-verical-align'>CREATED DATE</th>
                                                                <th className='report-table-head no-verical-align text-center'>CREATED</th>
                                                                <th className='report-table-head no-verical-align text-center'>RESUME UPLOAD</th>
                                                                <th className='report-table-head no-verical-align text-center'>EXCEL</th>
                                                                <th className='report-table-head no-verical-align text-center'>EMAIL</th>
                                                                <th className='report-table-head no-verical-align text-center'>JOB BOARD</th>
                                                                <th className='report-table-head no-verical-align text-center'>SOCIAL NETWORK</th>
                                                                <th className='report-table-head no-verical-align text-center'>PROMOTE LINK</th>
                                                                <th className='report-table-head no-verical-align text-center'>FACEBOOK</th>
                                                                <th className='report-table-head no-verical-align text-center'>TWITTER</th>
                                                                <th className='report-table-head no-verical-align text-center'>WEBSITE</th>
                                                                <th className='report-table-head no-verical-align text-center'>API</th>
                                                                <th className='report-table-head no-verical-align text-center'>GMAIL PLUGIN</th>
                                                                <th className='report-table-head no-verical-align text-center'>LINKEDIN PLUGIN</th>
                                                                <th className='report-table-head no-verical-align text-center'>OUTLOOK PLUGIN</th>
                                                                <th className='report-table-head no-verical-align text-center'>STACKOVERFLOW PLUGIN</th>
                                                                <th className='report-table-head no-verical-align text-center'>CAREER-BUILDER PLUGIN</th>
                                                                <th className='report-table-head no-verical-align text-center'>DICE PLUGIN</th>
                                                                <th className='report-table-head no-verical-align text-center'>TIMES JOB PLUGIN</th>
                                                                <th className='report-table-head no-verical-align text-center'>MONSTER PLUGIN</th>
                                                                <th className='report-table-head no-verical-align text-center'>NAUKRI PLUGIN</th>
                                                                <th className='report-table-head no-verical-align text-center'>ADZUNA</th>
                                                                <th className='report-table-head no-verical-align text-center'>BUSCO JOB</th>
                                                                <th className='report-table-head no-verical-align text-center'>CAREERJET</th>
                                                                <th className='report-table-head no-verical-align text-center'>CAREERJET</th>
                                                                <th className='report-table-head no-verical-align text-center'>GLASSDOOR</th>
                                                                <th className='report-table-head no-verical-align text-center'>HRRECRUITING</th>
                                                                <th className='report-table-head no-verical-align text-center'>INDEED</th>
                                                                <th className='report-table-head no-verical-align text-center'>HIGHERHIRE</th>
                                                                <th className='report-table-head no-verical-align text-center'>RECRUITNET</th>
                                                                <th className='report-table-head no-verical-align text-center'>LINKEDIN</th>
                                                                <th className='report-table-head no-verical-align text-center'>JOB IS JOB</th>
                                                                <th className='report-table-head no-verical-align text-center'>JOBOMAS</th>
                                                                <th className='report-table-head no-verical-align text-center'>JOB RAPIDO</th>
                                                                <th className='report-table-head no-verical-align text-center'>JOOBLE</th>
                                                                <th className='report-table-head no-verical-align text-center'>MERCADO JOBS</th>
                                                                <th className='report-table-head no-verical-align text-center'>MY JOBHELPER</th>
                                                                <th className='report-table-head no-verical-align text-center'>NEUVOO</th>
                                                                <th className='report-table-head no-verical-align text-center'>OODLE</th>
                                                                <th className='report-table-head no-verical-align text-center'>JORA</th>
                                                                <th className='report-table-head no-verical-align text-center'>EUROJOB</th>
                                                                <th className='report-table-head no-verical-align text-center'>DRJOB</th>
                                                                <th className='report-table-head no-verical-align text-center'>SOURCING DEPARTMENT</th>
                                                                <th className='report-table-head no-verical-align text-center'>TOTAL</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr className='report-table-row with-border'>
                                                                <td className='report-table-data text-center no-wrap'>20-01-2024</td>
                                                                <td className='report-table-data text-center'>0</td>
                                                                <td className='report-table-data text-center'>0</td>
                                                                <td className='report-table-data text-center'>1</td>
                                                                <td className='report-table-data text-center'>1</td>
                                                                <td className='report-table-data text-center'>1</td>
                                                                <td className='report-table-data text-center'>1</td>
                                                                <td className='report-table-data text-center'>1</td>
                                                                <td className='report-table-data text-center'>1</td>
                                                                <td className='report-table-data text-center'>1</td>
                                                                <td className='report-table-data text-center'>1</td>
                                                                <td className='report-table-data text-center'>1</td>
                                                                <td className='report-table-data text-center'>1</td>
                                                                <td className='report-table-data text-center'>1</td>
                                                                <td className='report-table-data text-center'>1</td>
                                                                <td className='report-table-data text-center'>1</td>
                                                                <td className='report-table-data text-center'>1</td>
                                                                <td className='report-table-data text-center'>1</td>
                                                                <td className='report-table-data text-center'>1</td>
                                                                <td className='report-table-data text-center'>1</td>
                                                                <td className='report-table-data text-center'>1</td>
                                                                <td className='report-table-data text-center'>1</td>
                                                                <td className='report-table-data text-center'>1</td>
                                                                <td className='report-table-data text-center'>1</td>
                                                                <td className='report-table-data text-center'>1</td>
                                                                <td className='report-table-data text-center'>1</td>
                                                                <td className='report-table-data text-center'>1</td>
                                                                <td className='report-table-data text-center'>1</td>
                                                                <td className='report-table-data text-center'>1</td>
                                                                <td className='report-table-data text-center'>1</td>
                                                                <td className='report-table-data text-center'>1</td>
                                                                <td className='report-table-data text-center'>1</td>
                                                                <td className='report-table-data text-center'>1</td>
                                                                <td className='report-table-data text-center'>1</td>
                                                                <td className='report-table-data text-center'>1</td>
                                                                <td className='report-table-data text-center'>1</td>
                                                                <td className='report-table-data text-center'>1</td>
                                                                <td className='report-table-data text-center'>1</td>
                                                                <td className='report-table-data text-center'>1</td>
                                                                <td className='report-table-data text-center'>1</td>
                                                                <td className='report-table-data text-center'>1</td>
                                                                <td className='report-table-data text-center'>1</td>
                                                                <td className='report-table-data text-center'>1</td>
                                                                <td className='report-table-data text-center is-bold'>1</td>
                                                            </tr>
                                                        </tbody>
                                                        <tfoot>
                                                            <tr className='report-table-row with-border table-foot'>
                                                                <td className='report-table-data'>Total</td>
                                                                <td className='report-table-data' align='center'>1</td>
                                                                <td className='report-table-data' align='center'>0</td>
                                                                <td className='report-table-data' align='center'>0</td>
                                                                <td className='report-table-data' align='center'>0</td>
                                                                <td className='report-table-data' align='center'>0</td>
                                                                <td className='report-table-data' align='center'>0</td>
                                                                <td className='report-table-data' align='center'>0</td>
                                                                <td className='report-table-data' align='center'>0</td>
                                                                <td className='report-table-data' align='center'>0</td>
                                                                <td className='report-table-data' align='center'>0</td>
                                                                <td className='report-table-data' align='center'>0</td>
                                                                <td className='report-table-data' align='center'>0</td>
                                                                <td className='report-table-data' align='center'>0</td>
                                                                <td className='report-table-data' align='center'>0</td>
                                                                <td className='report-table-data' align='center'>0</td>
                                                                <td className='report-table-data' align='center'>0</td>
                                                                <td className='report-table-data' align='center'>0</td>
                                                                <td className='report-table-data' align='center'>0</td>
                                                                <td className='report-table-data' align='center'>0</td>
                                                                <td className='report-table-data' align='center'>0</td>
                                                                <td className='report-table-data' align='center'>0</td>
                                                                <td className='report-table-data' align='center'>0</td>
                                                                <td className='report-table-data' align='center'>0</td>
                                                                <td className='report-table-data' align='center'>0</td>
                                                                <td className='report-table-data' align='center'>0</td>
                                                                <td className='report-table-data' align='center'>0</td>
                                                                <td className='report-table-data' align='center'>0</td>
                                                                <td className='report-table-data' align='center'>0</td>
                                                                <td className='report-table-data' align='center'>0</td>
                                                                <td className='report-table-data' align='center'>0</td>
                                                                <td className='report-table-data' align='center'>0</td>
                                                                <td className='report-table-data' align='center'>0</td>
                                                                <td className='report-table-data' align='center'>0</td>
                                                                <td className='report-table-data' align='center'>0</td>
                                                                <td className='report-table-data' align='center'>0</td>
                                                                <td className='report-table-data' align='center'>0</td>
                                                                <td className='report-table-data' align='center'>0</td>
                                                                <td className='report-table-data' align='center'>0</td>
                                                                <td className='report-table-data' align='center'>0</td>
                                                                <td className='report-table-data' align='center'>0</td>
                                                                <td className='report-table-data' align='center'>0</td>
                                                                <td className='report-table-data' align='center'>0</td>
                                                                <td className='report-table-data' align='center'>1</td>
                                                            </tr>
                                                        </tfoot>
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
                                        )}
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

                <div className="modal fade" id="ViewModal" tabindex="-1" role="dialog" aria-labelledby="ViewLabel"
                    aria-hidden="true">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content recruiter-view-modal">
                            <div className="modal-header recruiter-view-modal-header">
                                <h5 className="modal-title recruiter-view-modal-title client" id="ViewLabel">
                                    Candidate Source Report
                                </h5>
                                <a href='#' type="button" className="close recruiter-view-close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true"><i class="bi bi-x close-icon"></i></span>
                                </a>
                            </div>
                            <div className="modal-body">
                                <div className="card p-3 mb-0">
                                    <div className='text-blue font-weight-600'>Supriya</div>
                                    <hr />
                                    <div className="table-responsive report-data-view-area">
                                        <table className='table report-table table-bordered'>
                                            <thead>
                                                <tr className='report-table-row with-border head'>
                                                    <th className='report-table-head no-verical-align'>CREATED DATE</th>
                                                    <th className='report-table-head no-verical-align text-center'>CREATED</th>
                                                    <th className='report-table-head no-verical-align text-center'>RESUME UPLOAD</th>
                                                    <th className='report-table-head no-verical-align text-center'>EXCEL</th>
                                                    <th className='report-table-head no-verical-align text-center'>EMAIL</th>
                                                    <th className='report-table-head no-verical-align text-center'>GMAIL PLUGIN</th>
                                                    <th className='report-table-head no-verical-align text-center'>LINKEDIN PLUGIN</th>
                                                    <th className='report-table-head no-verical-align text-center'>OUTLOOK PLUGIN</th>
                                                    <th className='report-table-head no-verical-align text-center'>STACKOVERFLOW PLUGIN</th>
                                                    <th className='report-table-head no-verical-align text-center'>CAREER-BUILDER PLUGIN</th>
                                                    <th className='report-table-head no-verical-align text-center'>DICE PLUGIN</th>
                                                    <th className='report-table-head no-verical-align text-center'>TIMES JOB PLUGIN</th>
                                                    <th className='report-table-head no-verical-align text-center'>MONSTER PLUGIN</th>
                                                    <th className='report-table-head no-verical-align text-center'>NAUKRI PLUGIN</th>
                                                    <th className='report-table-head no-verical-align text-center'>SOURCING DEPARTMENT</th>
                                                    <th className='report-table-head no-verical-align text-center'>TOTAL</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className='report-table-row with-border'>
                                                    <td className='report-table-data no-wrap'>09-01-2024</td>
                                                    <td className='report-table-data text-center'>0</td>
                                                    <td className='report-table-data text-center'>1</td>
                                                    <td className='report-table-data text-center'>1</td>
                                                    <td className='report-table-data text-center'>1</td>
                                                    <td className='report-table-data text-center'>1</td>
                                                    <td className='report-table-data text-center'>1</td>
                                                    <td className='report-table-data text-center'>1</td>
                                                    <td className='report-table-data text-center'>1</td>
                                                    <td className='report-table-data text-center'>1</td>
                                                    <td className='report-table-data text-center'>1</td>
                                                    <td className='report-table-data text-center'>1</td>
                                                    <td className='report-table-data text-center'>1</td>
                                                    <td className='report-table-data text-center'>1</td>
                                                    <td className='report-table-data text-center'>1</td>
                                                    <td className='report-table-data text-center is-bold'>1</td>
                                                </tr>
                                            </tbody>
                                            <tfoot>
                                                <tr className='report-table-row with-border table-foot'>
                                                    <td className='report-table-data'>Total</td>
                                                    <td className='report-table-data' align='center'>1</td>
                                                    <td className='report-table-data' align='center'>0</td>
                                                    <td className='report-table-data' align='center'>0</td>
                                                    <td className='report-table-data' align='center'>0</td>
                                                    <td className='report-table-data' align='center'>0</td>
                                                    <td className='report-table-data' align='center'>0</td>
                                                    <td className='report-table-data' align='center'>0</td>
                                                    <td className='report-table-data' align='center'>0</td>
                                                    <td className='report-table-data' align='center'>0</td>
                                                    <td className='report-table-data' align='center'>0</td>
                                                    <td className='report-table-data' align='center'>0</td>
                                                    <td className='report-table-data' align='center'>0</td>
                                                    <td className='report-table-data' align='center'>0</td>
                                                    <td className='report-table-data' align='center'>0</td>
                                                    <td className='report-table-data' align='center'>0</td>
                                                </tr>
                                            </tfoot>
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
                                </div>
                            </div>
                            <div className="modal-footer recruiter-view-modal-footer bg-whitesmoke br">
                                <button type="button" className="btn close-modal-btn" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        </div>
    )
}

export default CandidateSourceReport
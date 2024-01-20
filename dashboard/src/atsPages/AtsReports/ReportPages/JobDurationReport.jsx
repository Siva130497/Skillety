import React, { useContext, useState, useRef } from 'react';
import { useEffect } from 'react';
import ATSLayout from '../../../atsComponents/ATSLayout';
import Footer from '../../../components/Footer';
import $ from 'jquery';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import AuthContext from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';

const JobDurationReport = () => {
    const [filter, setFilter] = useState([]);
    const navigate = useNavigate();
    const [selectedFromDate, setSelectedFromDate] = useState(new Date().toISOString().split('T')[0]);
    const [selectedToDate, setSelectedToDate] = useState(new Date().toISOString().split('T')[0]);

    const [selectedType, setSelectedType] = useState('JobCreatedDate');

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

    const [selectedPriority, setSelectedPriority] = useState(null);

    const handlePriorityChange = (value) => {
        setSelectedPriority(value);
    };

    const clearPriority = () => {
        setSelectedPriority(null);
    };

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
                                Job Duration Report
                            </div>

                            <div className="report-page-section">
                                <div className="card report-page-card">
                                    <div className="report-page-des-area">
                                        <p>Job duration report analyses the on-time hiring of candidates against the target date set for the jobs.</p>
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
                                                        <option value="ThisYear">This Year</option>
                                                        <option value="LastWeek">Last Week</option>
                                                        <option value="LastMonth">Last Month</option>
                                                        <option value="LastYear">Last Year</option>
                                                        <option value="CustomDate">Custom Date</option>
                                                    </select>
                                                </div>
                                                {filter === '' && <small className='text-danger'>Please select a search period.</small>}
                                            </div>

                                            <div className="col-12 col-lg-3 col-md-6 mb-4 mb-md-3 mb-lg-0">
                                                <div className="report-filter-input-area">
                                                    <i class="bi bi-chevron-down toggle-icon"></i>
                                                    <select
                                                        className='report-filter-input'>
                                                        <option value="">Select Client Name</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="col-12 col-lg-3 col-md-6 mb-4 mb-md-3 mb-lg-0">
                                                <div className="priority-area position-relative">
                                                    <label htmlFor="from_date" className='date-filter-label'>Priority</label>
                                                    <div className="priority">
                                                        {[1, 2, 3, 4, 5].map((value) => (
                                                            <React.Fragment key={value}>
                                                                <input
                                                                    type="radio"
                                                                    id={`star${value}`}
                                                                    name="priority"
                                                                    value={value}
                                                                    checked={selectedPriority === value}
                                                                    onChange={() => handlePriorityChange(value)}
                                                                />
                                                                <label htmlFor={`star${value}`} title="text"></label>
                                                            </React.Fragment>
                                                        ))}
                                                        <button type="button" className='clear-priority' onClick={clearPriority}>
                                                            <i class="bi bi-x-circle"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-12 col-lg-3 col-md-6 mb-4 mb-md-3 mb-lg-0">
                                                <button className='run-report-button'>Run Report</button>
                                            </div>
                                        </div>

                                        {filter === 'CustomDate' && (
                                            <div className='row mt-3'>
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
                                            </div>
                                        )}

                                        <div className="report-radio-area">
                                            <div className="report-radio-container">
                                                <label className="report-radio-button">
                                                    <input
                                                        type="radio"
                                                        name="report-radio-option"
                                                        id='JobCreatedDate'
                                                        value="JobCreatedDate"
                                                        checked={selectedType === 'JobCreatedDate'}
                                                        onChange={handleTypeChange}
                                                    />
                                                    <span className="report-radio"></span>
                                                    Compare with Job Created Date
                                                </label>
                                                <label className="report-radio-button">
                                                    <input
                                                        type="radio"
                                                        name="report-radio-option"
                                                        id='JobClosedDate'
                                                        value="JobClosedDate"
                                                        checked={selectedType === 'JobClosedDate'}
                                                        onChange={handleTypeChange}
                                                    />
                                                    <span className="report-radio"></span>
                                                    Compare with Job Closed Date
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    {selectedType === 'JobCreatedDate' && (
                                        <div className="report-view-section">
                                            <div className="table-report-head">
                                                Job Duration Report (Compare with Job Created Date)
                                            </div>
                                            <hr />
                                            <div className="report-view-area">
                                                <div className="table-responsive">
                                                    <table className='table report-table table-bordered' id='Export_table' ref={tableRef}>
                                                        <thead>
                                                            <tr className='report-table-row with-border'>
                                                                <th className='report-table-head no-verical-align'>JOB TITLE</th>
                                                                <th className='report-table-head no-verical-align'>CLIENT NAME</th>
                                                                <th className='report-table-head no-verical-align'>RECRUITERS</th>
                                                                <th className='report-table-head no-verical-align'>MANAGERS</th>
                                                                <th className='report-table-head no-verical-align'>NO. OF POSITIONS</th>
                                                                <th className='report-table-head no-verical-align'>NO. OF POSITIONS</th>
                                                                <th className='report-table-head no-verical-align'>OPEN DATE</th>
                                                                <th className='report-table-head no-verical-align'>TARGET DATE</th>
                                                                <th className='report-table-head no-verical-align'>ACTUAL CLOSED DATE</th>
                                                                <th className='report-table-head no-verical-align'>DELAY (IN DAYS)</th>
                                                                <th className='report-table-head no-verical-align'>RESULT</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr className='report-table-row with-border'>
                                                                <td className='report-table-data'>Customer Relationship Manager</td>
                                                                <td className='report-table-data'>Ankura Homes</td>
                                                                <td className='report-table-data'>Nithya Nobel, Mahalakshmi M, Suma Kulkarni, Arigela Sravani, Kambam Dharani, Takkoli Reddamma, Mahamaya Ashok Patil, Arigila Prashanthi, Aruna Kumari, Prathibha Padegal, Aruna Thripuravaram, Supriya 2, R. Shiva Laxmi, Diksha Kuriti, Nagaraju Venkata, Jabilla Poola, Shagufta Khan, Jyoshna Ganta, Shabeena Banu, Kousalya R, Deekshya Das, VS Anuradha</td>
                                                                <td className='report-table-data'>Thallapally Swapna, Nikhath Kousar, Sudha</td>
                                                                <td className='report-table-data'>1</td>
                                                                <td className='report-table-data'>1</td>
                                                                <td className='report-table-data no-wrap'>16-02-2023</td>
                                                                <td className='report-table-data no-wrap'>19-03-2023</td>
                                                                <td className='report-table-data'></td>
                                                                <td className='report-table-data'>307</td>
                                                                <td className='report-table-data'>Active</td>
                                                            </tr>
                                                        </tbody>
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
                                    )}

                                    {selectedType === 'JobClosedDate' && (
                                        <div className="report-view-section">
                                            <div className="table-report-head">
                                                Job Duration Report (Compare with Job Closed Date)
                                            </div>
                                            <hr />
                                            <div className="report-view-area">
                                                <div className="table-responsive">
                                                    <table className='table report-table table-bordered' id='Export_table' ref={tableRef}>
                                                        <thead>
                                                            <tr className='report-table-row with-border'>
                                                                <th className='report-table-head no-verical-align'>JOB TITLE</th>
                                                                <th className='report-table-head no-verical-align'>CLIENT NAME</th>
                                                                <th className='report-table-head no-verical-align'>RECRUITERS</th>
                                                                <th className='report-table-head no-verical-align'>MANAGERS</th>
                                                                <th className='report-table-head no-verical-align'>NO. OF POSITIONS</th>
                                                                <th className='report-table-head no-verical-align'>NO. OF POSITIONS</th>
                                                                <th className='report-table-head no-verical-align'>OPEN DATE</th>
                                                                <th className='report-table-head no-verical-align'>TARGET DATE</th>
                                                                <th className='report-table-head no-verical-align'>ACTUAL CLOSED DATE</th>
                                                                <th className='report-table-head no-verical-align'>DELAY (IN DAYS)</th>
                                                                <th className='report-table-head no-verical-align'>RESULT</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr className='report-table-row with-border'>
                                                                <td className='report-table-data'>Customer Relationship Manager</td>
                                                                <td className='report-table-data'>Ankura Homes</td>
                                                                <td className='report-table-data'>Nithya Nobel, Mahalakshmi M, Suma Kulkarni, Arigela Sravani, Kambam Dharani, Takkoli Reddamma, Mahamaya Ashok Patil, Arigila Prashanthi, Aruna Kumari, Prathibha Padegal, Aruna Thripuravaram, Supriya 2, R. Shiva Laxmi, Diksha Kuriti, Nagaraju Venkata, Jabilla Poola, Shagufta Khan, Jyoshna Ganta, Shabeena Banu, Kousalya R, Deekshya Das, VS Anuradha</td>
                                                                <td className='report-table-data'>Thallapally Swapna, Nikhath Kousar, Sudha</td>
                                                                <td className='report-table-data'>1</td>
                                                                <td className='report-table-data'>1</td>
                                                                <td className='report-table-data no-wrap'>16-02-2023</td>
                                                                <td className='report-table-data no-wrap'>19-03-2023</td>
                                                                <td className='report-table-data'></td>
                                                                <td className='report-table-data'>307</td>
                                                                <td className='report-table-data'>Active</td>
                                                            </tr>
                                                        </tbody>
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
                                    )}

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

export default JobDurationReport
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

const TeamPerformanceReport = () => {
    const [filter, setFilter] = useState([]);
    const [selectedFromDate, setSelectedFromDate] = useState(new Date().toISOString().split('T')[0]);
    const [selectedToDate, setSelectedToDate] = useState(new Date().toISOString().split('T')[0]);

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
                            <div className="admin-component-name text-left">
                                Team Performance Report
                            </div>

                            <div className="report-page-section">
                                <div className="card report-page-card">
                                    <div className="report-page-des-area">
                                        <p>Team Performance report is the ideal place to monitor your team's productivity, identify bottlenecks, and help you make the right decisions.</p>
                                    </div>

                                    <div className="report-filter-area">
                                        <div className="row">
                                            <div className="col-12 col-lg-3">
                                                <div className="report-filter-input-area">
                                                    <i class="bi bi-chevron-down toggle-icon"></i>
                                                    <select
                                                        className='report-filter-input'
                                                        value={filter}
                                                        onChange={handleFilterChange}>
                                                        <option value="" selected disabled>Select Search Period</option>
                                                        <option value="ThisWeek">This Week</option>
                                                        <option value="ThisMonth">This Month</option>
                                                        <option value="ThisYear">This Year</option>
                                                        <option value="LastWeek">Last Week</option>
                                                        <option value="LastMonth">Last Month</option>
                                                        <option value="LastYear">Last Year</option>
                                                        <option value="CustomDate">Custom Date</option>
                                                    </select>
                                                </div>
                                            </div>

                                            {filter === 'CustomDate' && (
                                                <>
                                                    <div className="col-12 col-lg-3">
                                                        <div className="report-filter-input-area">
                                                            <label htmlFor="from_date" className='date-filter-label'>From Date</label>
                                                            <input type="date"
                                                                name='from_date'
                                                                className='report-filter-input date'
                                                                value={selectedFromDate}
                                                                onChange={handleFromDateChange} />
                                                        </div>
                                                    </div>

                                                    <div className="col-12 col-lg-3">
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

                                            <div className="col-12 col-lg-3">
                                                <button className='run-report-button'>Run Report</button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="report-view-section">
                                        <div className="table-report-head">
                                            Performance Analysis
                                        </div>
                                        <hr />
                                        <div className="report-view-area">
                                            <div className="table-responsive">
                                                <table className='table report-table table-bordered' id='Export_table' ref={tableRef}>
                                                    <thead>
                                                        <tr className='report-table-row'>
                                                            <th className='report-table-head' colSpan={8}></th>
                                                            <th className='report-table-head with-border text-center' colSpan={6}>INTERVIEW FEEDBACK</th>
                                                            <th className='report-table-head' colSpan={2}></th>
                                                        </tr>
                                                        <tr className='report-table-row with-border'>
                                                            <th className='report-table-head no-verical-align' rowSpan={2}>NAME</th>
                                                            <th className='report-table-head no-verical-align' rowSpan={2}>CURRENT ROLE</th>
                                                            <th className='report-table-head no-verical-align text-center' rowSpan={2}>CALLS</th>
                                                            <th className='report-table-head no-verical-align text-center' rowSpan={2}>No. OF CANDIDATES IMPORTED</th>
                                                            <th className='report-table-head no-verical-align text-center' rowSpan={2}>No. OF PRE-SCREEN</th>
                                                            <th className='report-table-head no-verical-align text-center' rowSpan={2}>No. OF INTERNAL SUBMISSION</th>
                                                            <th className='report-table-head no-verical-align text-center' rowSpan={2}>No. OF CLIENT SUBMISSION</th>
                                                            <th className='report-table-head no-verical-align text-center' rowSpan={2}>No. OF INTERVIEWS</th>
                                                            <th className='report-table-head no-verical-align text-center'>SCHEDULE</th>
                                                            <th className='report-table-head no-verical-align text-center'>SUCCESS</th>
                                                            <th className='report-table-head no-verical-align text-center'>FAIL</th>
                                                            <th className='report-table-head no-verical-align text-center'>CANCEL BY CLIENT</th>
                                                            <th className='report-table-head no-verical-align text-center'>CANCEL BY CANDIDATE</th>
                                                            <th className='report-table-head no-verical-align text-center'>APPEARED</th>
                                                            <th className='report-table-head no-verical-align text-center' rowSpan={2}>No. OF OFFERED</th>
                                                            <th className='report-table-head no-verical-align text-center' rowSpan={2}>No. OF HIRED</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr className='report-table-row with-border'>
                                                            <td className='report-table-data'>Aditya Devendra Thakur</td>
                                                            <td className='report-table-data'>Recruiter</td>
                                                            <td className='report-table-data text-center'>0</td>
                                                            <td className='report-table-data text-center'>
                                                                <button className='report-data-view-button' data-toggle="modal" data-target="#ViewModal">0</button>
                                                            </td>
                                                            <td className='report-table-data text-center'>
                                                                <button className='report-data-view-button' data-toggle="modal" data-target="#ViewModal">0</button>
                                                            </td>
                                                            <td className='report-table-data text-center'>
                                                                <button className='report-data-view-button' data-toggle="modal" data-target="#ViewModal">0</button>
                                                            </td>
                                                            <td className='report-table-data text-center'>
                                                                <button className='report-data-view-button' data-toggle="modal" data-target="#ViewModal">0</button>
                                                            </td>
                                                            <td className='report-table-data text-center'>
                                                                <button className='report-data-view-button' data-toggle="modal" data-target="#ViewModal">0</button>
                                                            </td>
                                                            <td className='report-table-data text-center'>
                                                                <button className='report-data-view-button' data-toggle="modal" data-target="#ViewModal">0</button>
                                                            </td>
                                                            <td className='report-table-data text-center'>
                                                                <button className='report-data-view-button' data-toggle="modal" data-target="#ViewModal">0</button>
                                                            </td>
                                                            <td className='report-table-data text-center'>
                                                                <button className='report-data-view-button' data-toggle="modal" data-target="#ViewModal">0</button>
                                                            </td>
                                                            <td className='report-table-data text-center'>
                                                                <button className='report-data-view-button' data-toggle="modal" data-target="#ViewModal">0</button>
                                                            </td>
                                                            <td className='report-table-data text-center'>
                                                                <button className='report-data-view-button' data-toggle="modal" data-target="#ViewModal">0</button>
                                                            </td>
                                                            <td className='report-table-data text-center'>
                                                                <button className='report-data-view-button' data-toggle="modal" data-target="#ViewModal">0</button>
                                                            </td>
                                                            <td className='report-table-data text-center'>
                                                                <button className='report-data-view-button' data-toggle="modal" data-target="#ViewModal">0</button>
                                                            </td>
                                                            <td className='report-table-data text-center'>
                                                                <button className='report-data-view-button' data-toggle="modal" data-target="#ViewModal">0</button>
                                                            </td>
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
                                    Imported Candidate Details
                                </h5>
                                <a href='#' type="button" className="close recruiter-view-close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true"><i class="bi bi-x close-icon"></i></span>
                                </a>
                            </div>
                            <div className="modal-body">
                                <div className="card p-3 mb-0">
                                    <div className="table-responsive report-data-view-area">
                                        <table className='table report-table table-bordered'>
                                            <thead>
                                                <tr className='report-table-row with-border head'>
                                                    <th className='report-table-head no-verical-align'>CANDIDATE NAME</th>
                                                    <th className='report-table-head no-verical-align'>CANDIDATE SOURCE</th>
                                                    <th className='report-table-head no-verical-align'>CREATED DATE</th>
                                                    <th className='report-table-head no-verical-align'>CREATED BY</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className='report-table-row with-border'>
                                                    <td className='report-table-data'>Surbhi Mahajan #226929</td>
                                                    <td className='report-table-data'>Created</td>
                                                    <td className='report-table-data'>12-01-2024</td>
                                                    <td className='report-table-data'>Aditya Devendra Thakur</td>
                                                </tr>
                                                <tr className='report-table-row with-border'>
                                                    <td className='report-table-data'>Surbhi Mahajan #226929</td>
                                                    <td className='report-table-data'>Created</td>
                                                    <td className='report-table-data'>12-01-2024</td>
                                                    <td className='report-table-data'>Aditya Devendra Thakur</td>
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

export default TeamPerformanceReport
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

const ClientReport = () => {
    const [filter, setFilter] = useState([]);
    const navigate = useNavigate();
    const [selectedFromDate, setSelectedFromDate] = useState(new Date().toISOString().split('T')[0]);
    const [selectedToDate, setSelectedToDate] = useState(new Date().toISOString().split('T')[0]);

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
                                Client Report
                            </div>

                            <div className="report-page-section">
                                <div className="card report-page-card">
                                    <div className="report-page-des-area">
                                        <p>Client report helps you to review the overall performance delivered to different clients by the team. Drill down capability helps you to analyse job-level information for the clients.</p>
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
                                    </div>

                                    <div className="report-view-section">
                                        <div className="report-view-area">
                                            <div className="table-responsive">
                                                <table className='table report-table table-bordered' id='Export_table' ref={tableRef}>
                                                    <thead>
                                                        <tr className='report-table-row with-border'>
                                                            <th className='report-table-head no-verical-align'>CLIENT NAME</th>
                                                            <th className='report-table-head no-verical-align'>CREATED ON</th>
                                                            <th className='report-table-head no-verical-align'>STATUS</th>
                                                            <th className='report-table-head no-verical-align text-center'>No. OF JOBS</th>
                                                            <th className='report-table-head no-verical-align text-center'>No. OF POSITION</th>
                                                            <th className='report-table-head no-verical-align text-center'>No. OF CALLS</th>
                                                            <th className='report-table-head no-verical-align text-center'>No. OF PRE-SCREENS</th>
                                                            <th className='report-table-head no-verical-align text-center'>No. OF INTERNAL SUBMISSION</th>
                                                            <th className='report-table-head no-verical-align text-center'>No. OF CLIENT SUBMISSION</th>
                                                            <th className='report-table-head no-verical-align text-center'>No. OF INTERVIEWS</th>
                                                            <th className='report-table-head no-verical-align text-center'>No. OF OFFERED</th>
                                                            <th className='report-table-head no-verical-align text-center'>No. OF HIRED</th>
                                                            <th className='report-table-head no-verical-align text-center'>No. OF REJECTED</th>
                                                            <th className='report-table-head no-verical-align text-center'>No. OF REJECTED</th>
                                                            <th className='report-table-head no-verical-align text-center'>SUCCESSRATE (IN %)</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr className='report-table-row with-border'>
                                                            <td className='report-table-data'>
                                                                <button className='report-data-view-button' data-toggle="modal" data-target="#ViewModal">Angular Developer</button>
                                                            </td>
                                                            <td className='report-table-data no-wrap'>04-12-2023</td>
                                                            <td className='report-table-data'>Active</td>
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
                                    Client Report
                                </h5>
                                <a href='#' type="button" className="close recruiter-view-close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true"><i class="bi bi-x close-icon"></i></span>
                                </a>
                            </div>
                            <div className="modal-body">
                                <div className="card p-3 mb-0">
                                    <div className='text-blue font-weight-600'>Technosoft Engineering Projects Limited</div>
                                    <hr />
                                    <div className="table-responsive report-data-view-area">
                                        <table className='table report-table table-bordered'>
                                            <thead>
                                                <tr className='report-table-row with-border head'>
                                                    <th className='report-table-head no-verical-align'>JOB TITLE</th>
                                                    <th className='report-table-head no-verical-align'>CREATED ON</th>
                                                    <th className='report-table-head no-verical-align'>STATUS</th>
                                                    <th className='report-table-head no-verical-align text-center'>No. OF JOBS</th>
                                                    <th className='report-table-head no-verical-align text-center'>No. OF POSITION</th>
                                                    <th className='report-table-head no-verical-align text-center'>No. OF CALLS</th>
                                                    <th className='report-table-head no-verical-align text-center'>No. OF PRE-SCREENS</th>
                                                    <th className='report-table-head no-verical-align text-center'>No. OF INTERNAL SUBMISSION</th>
                                                    <th className='report-table-head no-verical-align text-center'>No. OF CLIENT SUBMISSION</th>
                                                    <th className='report-table-head no-verical-align text-center'>No. OF INTERVIEWS</th>
                                                    <th className='report-table-head no-verical-align text-center'>No. OF OFFERED</th>
                                                    <th className='report-table-head no-verical-align text-center'>No. OF HIRED</th>
                                                    <th className='report-table-head no-verical-align text-center'>No. OF REJECTED</th>
                                                    <th className='report-table-head no-verical-align text-center'>No. OF REJECTED</th>
                                                    <th className='report-table-head no-verical-align text-center'>SUCCESSRATE (IN %)</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className='report-table-row with-border'>
                                                    <td className='report-table-data'>Firmware BLE</td>
                                                    <td className='report-table-data no-wrap'>04-12-2023</td>
                                                    <td className='report-table-data'>Active</td>
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

export default ClientReport
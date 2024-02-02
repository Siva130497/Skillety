import React, { useContext, useState, useRef } from 'react';
import { useEffect } from 'react';
import ATSLayout from '../../../atsComponents/ATSLayout';
import Footer from '../../../components/Footer';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import AuthContext from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

import { Dropdown } from 'primereact/dropdown';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';

const InterviewReport = () => {
    const [filter, setFilter] = useState([]);
    const navigate = useNavigate();
    const [selectedFromDate, setSelectedFromDate] = useState(new Date().toISOString().split('T')[0]);
    const [selectedToDate, setSelectedToDate] = useState(new Date().toISOString().split('T')[0]);

    const [selectedType, setSelectedType] = useState('Overall');

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

    const [selectedOwner, setselectedOwner] = useState(null);
    const owners = [
        { name: 'Owner 1' },
        { name: 'Owner 2' },
        { name: 'Owner 3' },
        { name: 'Owner 4' },
        { name: 'Owner 5' },
        { name: 'Owner 6' },
        { name: 'Owner 7' },
        { name: 'Owner 8' },
        { name: 'Owner 9' },
        { name: 'Owner 10' }
    ];

    const selectedOwnerTemplate = (option, props) => {
        if (option) {
            return (
                <div className="flex align-items-center">
                    <div className='text-capitalized'>{option.name}</div>
                </div>
            );
        }

        return <span>{props.placeholder}</span>;
    };

    const clientOptionTemplate = (option) => {
        return (
            <div className="flex align-items-center">
                <div>{option.name}</div>
            </div>
        );
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
                                {/* <button className='back-button' onClick={handleBackButtonClick}>
                                    <i className='bi bi-arrow-left mr-2'></i>
                                    Back
                                </button> */}
                                <a href='/ats-reports' className='back-button'>
                                    <i className='bi bi-arrow-left mr-2 back-icon'></i>
                                    Back
                                </a>
                            </div>
                            <div className="admin-component-name text-left">
                                Interview Report
                            </div>

                            <div className="report-page-section">
                                <div className="card report-page-card">
                                    <div className="report-page-des-area">
                                        <p>Interview report provides a great insight into the interviews conducted and the outcome of the interviews.</p>
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
                                                    <Dropdown value={selectedOwner} onChange={(e) => setselectedOwner(e.value)} options={owners} optionLabel="name" placeholder="Select Interview Owner"
                                                        filter valueTemplate={selectedOwnerTemplate} itemTemplate={clientOptionTemplate} className="w-full report-custom-select-input" />
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
                                                        id='Overall'
                                                        value="Overall"
                                                        checked={selectedType === 'Overall'}
                                                        onChange={handleTypeChange}
                                                    />
                                                    <span className="report-radio"></span>
                                                    Overall
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

                                    {selectedType === 'Overall' && (
                                        <div className="report-view-section">
                                            <div className="table-report-head">
                                                Interview Report (Overall Report)
                                            </div>
                                            <hr />
                                            <div className="report-view-area">
                                                <div className="table-responsive">
                                                    <table className='table report-table table-bordered' id='Export_table' ref={tableRef}>
                                                        <thead>
                                                            <tr className='report-table-row with-border'>
                                                                <th className='report-table-head no-verical-align'>INTERVIEW OWNER</th>
                                                                <th className='report-table-head no-verical-align'>CANDIDATE NAME</th>
                                                                <th className='report-table-head no-verical-align'>CANDIDATE CONTACT</th>
                                                                <th className='report-table-head no-verical-align'>JOB TITLE</th>
                                                                <th className='report-table-head no-verical-align'>CLIENT NAME</th>
                                                                <th className='report-table-head no-verical-align'>INTERVIEW TIME</th>
                                                                <th className='report-table-head no-verical-align'>INTERVIEW TYPE</th>
                                                                <th className='report-table-head no-verical-align'>CONFIRMATION STATUS</th>
                                                                <th className='report-table-head no-verical-align'>FEEDBACK</th>
                                                                <th className='report-table-head no-verical-align'>RESULT</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr className='report-table-row with-border'>
                                                                <td className='report-table-data text-capitalized'>Shabeena Banu</td>
                                                                <td className='report-table-data text-capitalized'>Poonam</td>
                                                                <td className='report-table-data no-wrap'>+91-7083615226</td>
                                                                <td className='report-table-data'>Informatica production Support Engineer</td>
                                                                <td className='report-table-data text-capitalized'>Bitwise Solutions Pvt Ltd</td>
                                                                <td className='report-table-data no-wrap'>25-07-2023 12:30 PM</td>
                                                                <td className='report-table-data text-capitalized'>Video Interview</td>
                                                                <td className='report-table-data'>Confirmation Pending from Candidate</td>
                                                                <td className='report-table-data'>------</td>
                                                                <td className='report-table-data text-capitalized'>Scheduled</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>

                                                <div className="report-table-pagination-area">
                                                    <div className="buttons">
                                                        <nav aria-label="Page navigation example">
                                                            <ul className="pagination">
                                                                <li className="page-item">
                                                                    <a className="page-link custom" href="##" aria-label="Previous">
                                                                        <span aria-hidden="true">&laquo;</span>
                                                                        <span className="sr-only">Previous</span>
                                                                    </a>
                                                                </li>
                                                                <li className="page-item"><a className="page-link custom" href="##">1</a></li>
                                                                <li className="page-item"><a className="page-link custom" href="##">2</a></li>
                                                                <li className="page-item"><a className="page-link custom" href="##">3</a></li>
                                                                <li className="page-item"><a className="page-link custom" href="##">..</a></li>
                                                                <li className="page-item">
                                                                    <a className="page-link custom" href="##" aria-label="Next">
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

                                    {selectedType === 'UserWise' && (
                                        <div className="report-view-section">
                                            <div className="table-report-head">
                                                Interview Report (User Wise Report)
                                            </div>
                                            <hr />
                                            <div className="report-view-area">
                                                <div className="table-responsive">
                                                    <table className='table report-table table-bordered' id='Export_table' ref={tableRef}>
                                                        <thead>
                                                            <tr className='report-table-row with-border'>
                                                                <th className='report-table-head no-verical-align'>INTERVIEW OWNER</th>
                                                                <th className='report-table-head no-verical-align'>SCHEDULED</th>
                                                                <th className='report-table-head no-verical-align'>POSITIVE</th>
                                                                <th className='report-table-head no-verical-align'>NEGATIVE</th>
                                                                <th className='report-table-head no-verical-align'>CANCELLED</th>
                                                                <th className='report-table-head no-verical-align'>TOTAL</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr className='report-table-row with-border'>
                                                                <td className='report-table-data text-capitalized'>Shabeena Banu</td>
                                                                <td className='report-table-data'>1</td>
                                                                <td className='report-table-data'>1</td>
                                                                <td className='report-table-data'>1</td>
                                                                <td className='report-table-data'>1</td>
                                                                <td className='report-table-data is-bold'>1</td>
                                                            </tr>
                                                        </tbody>
                                                        <tfoot>
                                                            <tr className='report-table-row with-border table-foot'>
                                                                <td className='report-table-data'>Total</td>
                                                                <td className='report-table-data'>1</td>
                                                                <td className='report-table-data'>0</td>
                                                                <td className='report-table-data'>0</td>
                                                                <td className='report-table-data'>0</td>
                                                                <td className='report-table-data'>1</td>
                                                            </tr>
                                                        </tfoot>
                                                    </table>
                                                </div>

                                                <div className="report-table-pagination-area">
                                                    <div className="buttons">
                                                        <nav aria-label="Page navigation example">
                                                            <ul className="pagination">
                                                                <li className="page-item">
                                                                    <a className="page-link custom" href="##" aria-label="Previous">
                                                                        <span aria-hidden="true">&laquo;</span>
                                                                        <span className="sr-only">Previous</span>
                                                                    </a>
                                                                </li>
                                                                <li className="page-item"><a className="page-link custom" href="##">1</a></li>
                                                                <li className="page-item"><a className="page-link custom" href="##">2</a></li>
                                                                <li className="page-item"><a className="page-link custom" href="##">3</a></li>
                                                                <li className="page-item"><a className="page-link custom" href="##">..</a></li>
                                                                <li className="page-item">
                                                                    <a className="page-link custom" href="##" aria-label="Next">
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

                                    {selectedType === 'DateWise' && (
                                        <div className="report-view-section">
                                            <div className="table-report-head">
                                                Interview Report (Date Wise Report)
                                            </div>
                                            <hr />
                                            <div className="report-view-area">
                                                <div className="table-responsive">
                                                    <table className='table report-table table-bordered' id='Export_table' ref={tableRef}>
                                                        <thead>
                                                            <tr className='report-table-row with-border'>
                                                                <th className='report-table-head no-verical-align'>INTERVIEW DATE</th>
                                                                <th className='report-table-head no-verical-align'>INTERVIEW DAY</th>
                                                                <th className='report-table-head no-verical-align'>TOTAL INTERVIEW</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr className='report-table-row with-border'>
                                                                <td className='report-table-data no-wrap'>25-07-2023</td>
                                                                <td className='report-table-data'>1</td>
                                                                <td className='report-table-data'>1</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>

                                                <div className="report-table-pagination-area">
                                                    <div className="buttons">
                                                        <nav aria-label="Page navigation example">
                                                            <ul className="pagination">
                                                                <li className="page-item">
                                                                    <a className="page-link custom" href="##" aria-label="Previous">
                                                                        <span aria-hidden="true">&laquo;</span>
                                                                        <span className="sr-only">Previous</span>
                                                                    </a>
                                                                </li>
                                                                <li className="page-item"><a className="page-link custom" href="##">1</a></li>
                                                                <li className="page-item"><a className="page-link custom" href="##">2</a></li>
                                                                <li className="page-item"><a className="page-link custom" href="##">3</a></li>
                                                                <li className="page-item"><a className="page-link custom" href="##">..</a></li>
                                                                <li className="page-item">
                                                                    <a className="page-link custom" href="##" aria-label="Next">
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

export default InterviewReport
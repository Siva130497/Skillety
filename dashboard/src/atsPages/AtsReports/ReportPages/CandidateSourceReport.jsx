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

const CandidateSourceReport = () => {
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
    const [y, setY] = useState([0, 5]);
    const [selectedType, setSelectedType] = useState('summary');
    const [dateWiseResults, setDateWiseResults] = useState([]);
    const [viewModelName, setViewModelName] = useState("");

    useEffect(() => {
        setatsToken(JSON.parse(localStorage.getItem('atsToken')))
    }, [atsToken]);

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
        if (period && selectedType) {
            setLoading(true);
            setNoData(false);
            setEmployeeReportDetail([]);

            axios.get(`https://skillety-n6r1.onrender.com/candidate-source-report?period=${period}&type=${selectedType}`, {
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
                    setNoData(true)
                })
        }

    }

    const handleViewModel = (result, name) => {
        setDateWiseResults(result);
        setViewModelName(name);
    }

    const handleTypeChange = (event) => {
        setEmployeeReportDetail([])
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
                                {/* <button className='back-button' onClick={handleBackButtonClick}>
                                    <i className='bi bi-arrow-left mr-2 back-icon'></i>
                                    Back
                                </button> */}
                                <a href='/ats-reports' className='back-button'>
                                    <i className='bi bi-arrow-left mr-2 back-icon'></i>
                                    Back
                                </a>
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

                                        <div className="report-radio-area">
                                            <div className="report-radio-container">
                                                <label className="report-radio-button">
                                                    <input
                                                        type="radio"
                                                        name="report-radio-option"
                                                        id='Summary'
                                                        value="summary"
                                                        checked={selectedType === 'summary'}
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
                                                        value="userWise"
                                                        checked={selectedType === 'userWise'}
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
                                                        value="dateWise"
                                                        checked={selectedType === 'dateWise'}
                                                        onChange={handleTypeChange}
                                                    />
                                                    <span className="report-radio"></span>
                                                    Date Wise
                                                </label>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="report-view-section">
                                        {(selectedType === 'summary' && employeeReportDetail.length > 0) && (
                                            <div className="report-view-area">
                                                <div className="table-responsive">
                                                    <table className='table report-table table-bordered' id='Export_table' ref={tableRef}>
                                                        <thead>
                                                            <tr className='report-table-row with-border'>
                                                                <th className='report-table-head no-verical-align'>SOURCE</th>
                                                                <th className='report-table-head no-verical-align w-15'>COUNT</th>
                                                                {/* <th className='report-table-head no-verical-align w-15'>APPLY</th> */}
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr className='report-table-row with-border'>
                                                                <td className='report-table-data'>Candidate Created</td>
                                                                <td className='report-table-data'>{employeeReportDetail[0]?.candidateCreated}</td>
                                                                {/* <td className='report-table-data'>1</td> */}
                                                            </tr>
                                                            <tr className='report-table-row with-border'>
                                                                <td className='report-table-data'>Candidate Assigned</td>
                                                                <td className='report-table-data'>{employeeReportDetail[0]?.candidateAssigned}</td>
                                                                {/* <td className='report-table-data'>1</td> */}
                                                            </tr>
                                                        </tbody>
                                                        <tfoot>
                                                            <tr className='report-table-row with-border table-foot'>
                                                                <td className='report-table-data'>Total</td>
                                                                <td className='report-table-data'>{employeeReportDetail[0]?.candidateCreated + employeeReportDetail[0]?.candidateAssigned}</td>
                                                                {/* <td className='report-table-data'>0</td> */}
                                                            </tr>
                                                        </tfoot>
                                                    </table>
                                                </div>

                                                {employeeReportDetail.length > 0 &&
                                                    <div className="report-table-pagination-area">
                                                        <div className="buttons">
                                                            <nav aria-label="Page navigation example">
                                                                <ul className="pagination">
                                                                    <li className="page-item">
                                                                        {x[0] > 0 && <a className="page-link custom" href="##" aria-label="Previous"
                                                                            onClick={() => setX([x[0] - 3, x[1] - 3])}>
                                                                            <span aria-hidden="true">&laquo;</span>
                                                                            <span className="sr-only">Previous</span>
                                                                        </a>}
                                                                    </li>
                                                                    {(employeeReportDetail.slice(x[0], x[1]).length === 3 && employeeReportDetail.length > x[1]) && <li className="page-item"
                                                                        onClick={() => setX([0, 3])}><a className="page-link custom" href="##">1</a></li>}
                                                                    {(employeeReportDetail.slice(x[0], x[1]).length === 3 && employeeReportDetail.length > x[1]) && <li className="page-item"
                                                                        onClick={() => setX([3, 6])}><a className="page-link custom" href="##">2</a></li>}
                                                                    {(employeeReportDetail.slice(x[0], x[1]).length === 3 && employeeReportDetail.length > x[1]) && <li className="page-item"
                                                                        onClick={() => setX([6, 9])}><a className="page-link custom" href="##">3</a></li>}
                                                                    {(employeeReportDetail.slice(x[0], x[1]).length === 3 && employeeReportDetail.length > x[1]) && <li className="page-item"><a className="page-link custom" href="##">..</a></li>}
                                                                    <li className="page-item">
                                                                        {(employeeReportDetail.slice(x[0], x[1]).length === 3 && employeeReportDetail.length > x[1]) && <a className="page-link custom" href="##" aria-label="Next"
                                                                            onClick={() => setX([x[0] + 3, x[1] + 3])}>
                                                                            <span aria-hidden="true">&raquo;</span>
                                                                            <span className="sr-only">Next</span>
                                                                        </a>}
                                                                    </li>
                                                                </ul>
                                                            </nav>
                                                        </div>
                                                    </div>
                                                }

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

                                        {(selectedType === 'userWise' && employeeReportDetail.length > 0) && (
                                            <div className="report-view-area">
                                                <div className="table-responsive">
                                                    <table className='table report-table table-bordered' id='Export_table' ref={tableRef}>
                                                        <thead>
                                                            <tr className='report-table-row with-border'>
                                                                <th className='report-table-head no-verical-align'>EMPLOYEE NAME</th>
                                                                <th className='report-table-head no-verical-align text-center'>CREATED CANDIDATES</th>
                                                                <th className='report-table-head no-verical-align text-center'>CREATED CANDIDATES</th>

                                                                <th className='report-table-head no-verical-align text-center'>TOTAL</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {employeeReportDetail.slice(x[0], x[1]).map((datas, index) => {
                                                                return (
                                                                    <tr className='report-table-row with-border'
                                                                        key={index}>
                                                                        <td className='report-table-data'>
                                                                            <button className='report-data-view-button text-capitalized' data-toggle="modal"
                                                                                data-target={(datas?.createdCands + datas?.assignedCands) > 0 ? "#ViewModal" : ""}
                                                                                onClick={() => handleViewModel(datas?.dateWiseResult, datas?.name)}>{datas?.name}</button>
                                                                        </td>
                                                                        <td className='report-table-data text-center'>{datas?.createdCands}</td>
                                                                        <td className='report-table-data text-center'>{datas?.assignedCands}</td>

                                                                        <td className='report-table-data text-center is-bold'>{datas?.createdCands + datas?.assignedCands}</td>
                                                                    </tr>
                                                                )
                                                            })}

                                                        </tbody>
                                                        <tfoot>
                                                            <tr className='report-table-row with-border table-foot'>
                                                                <td className='report-table-data'>Total</td>
                                                                <td className='report-table-data' align='center'>
                                                                    {employeeReportDetail.reduce((total, datas) => total + (datas?.createdCands || 0), 0)}
                                                                </td>
                                                                <td className='report-table-data' align='center'>
                                                                    {employeeReportDetail.reduce((total, datas) => total + (datas?.assignedCands || 0), 0)}
                                                                </td>
                                                                <td className='report-table-data' align='center'>
                                                                    {employeeReportDetail.reduce((total, datas) => total + ((datas?.createdCands || 0) + (datas?.assignedCands || 0)), 0)}
                                                                </td>
                                                            </tr>
                                                        </tfoot>
                                                    </table>
                                                </div>

                                                {employeeReportDetail.length > 0 &&
                                                    <div className="report-table-pagination-area">
                                                        <div className="buttons">
                                                            <nav aria-label="Page navigation example">
                                                                <ul className="pagination">
                                                                    <li className="page-item">
                                                                        {x[0] > 0 && <a className="page-link custom" href="##" aria-label="Previous"
                                                                            onClick={() => setX([x[0] - 3, x[1] - 3])}>
                                                                            <span aria-hidden="true">&laquo;</span>
                                                                            <span className="sr-only">Previous</span>
                                                                        </a>}
                                                                    </li>
                                                                    {(employeeReportDetail.slice(x[0], x[1]).length === 3 && employeeReportDetail.length > x[1]) && <li className="page-item"
                                                                        onClick={() => setX([0, 3])}><a className="page-link custom" href="##">1</a></li>}
                                                                    {(employeeReportDetail.slice(x[0], x[1]).length === 3 && employeeReportDetail.length > x[1]) && <li className="page-item"
                                                                        onClick={() => setX([3, 6])}><a className="page-link custom" href="##">2</a></li>}
                                                                    {(employeeReportDetail.slice(x[0], x[1]).length === 3 && employeeReportDetail.length > x[1]) && <li className="page-item"
                                                                        onClick={() => setX([6, 9])}><a className="page-link custom" href="##">3</a></li>}
                                                                    {(employeeReportDetail.slice(x[0], x[1]).length === 3 && employeeReportDetail.length > x[1]) && <li className="page-item"><a className="page-link custom" href="##">..</a></li>}
                                                                    <li className="page-item">
                                                                        {(employeeReportDetail.slice(x[0], x[1]).length === 3 && employeeReportDetail.length > x[1]) && <a className="page-link custom" href="##" aria-label="Next"
                                                                            onClick={() => setX([x[0] + 3, x[1] + 3])}>
                                                                            <span aria-hidden="true">&raquo;</span>
                                                                            <span className="sr-only">Next</span>
                                                                        </a>}
                                                                    </li>
                                                                </ul>
                                                            </nav>
                                                        </div>
                                                    </div>
                                                }

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

                                        {(selectedType === 'dateWise' && employeeReportDetail.length > 0) && (
                                            <div className="report-view-area">
                                                <div className="table-responsive">
                                                    <table className='table report-table table-bordered' id='Export_table' ref={tableRef}>
                                                        <thead>
                                                            <tr className='report-table-row with-border'>
                                                                <th className='report-table-head no-verical-align'>CREATED DATE</th>
                                                                <th className='report-table-head no-verical-align text-center'>CREATED CANDIDATES</th>
                                                                <th className='report-table-head no-verical-align text-center'>ASSIGNED CANDIDATES</th>

                                                                <th className='report-table-head no-verical-align text-center'>TOTAL</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {employeeReportDetail.slice(x[0], x[1]).map((date, index) => {
                                                                return (
                                                                    <tr className='report-table-row with-border'
                                                                        key={index}>
                                                                        <td className='report-table-data no-wrap'>{date?.date}</td>
                                                                        <td className='report-table-data text-center'>{date?.createdCands}</td>
                                                                        <td className='report-table-data text-center'>{date?.assignedCands}</td>

                                                                        <td className='report-table-data text-center is-bold'>{date?.createdCands + date?.assignedCands}</td>
                                                                    </tr>
                                                                )
                                                            })}

                                                        </tbody>
                                                        <tfoot>
                                                            <tr className='report-table-row with-border table-foot'>
                                                                <td className='report-table-data'>Total</td>
                                                                <td className='report-table-data' align='center'>{employeeReportDetail.reduce((total, date) => total + (date?.createdCands || 0), 0)}</td>
                                                                <td className='report-table-data' align='center'>{employeeReportDetail.reduce((total, date) => total + (date?.assignedCands || 0), 0)}</td>

                                                                <td className='report-table-data' align='center'>{employeeReportDetail.reduce((total, date) => total + ((date?.createdCands || 0) + (date?.assignedCands || 0)), 0)}</td>
                                                            </tr>
                                                        </tfoot>
                                                    </table>
                                                </div>

                                                <div className="report-table-pagination-area">
                                                    <div className="buttons">
                                                        <nav aria-label="Page navigation example">
                                                            <ul className="pagination">
                                                                <li className="page-item">
                                                                    {x[0] > 0 && <a className="page-link custom" href="##" aria-label="Previous"
                                                                        onClick={() => setX([x[0] - 3, x[1] - 3])}>
                                                                        <span aria-hidden="true">&laquo;</span>
                                                                        <span className="sr-only">Previous</span>
                                                                    </a>}
                                                                </li>
                                                                {(employeeReportDetail.slice(x[0], x[1]).length === 3 && employeeReportDetail.length > x[1]) && <li className="page-item"
                                                                    onClick={() => setX([0, 3])}><a className="page-link custom" href="##">1</a></li>}
                                                                {(employeeReportDetail.slice(x[0], x[1]).length === 3 && employeeReportDetail.length > x[1]) && <li className="page-item"
                                                                    onClick={() => setX([3, 6])}><a className="page-link custom" href="##">2</a></li>}
                                                                {(employeeReportDetail.slice(x[0], x[1]).length === 3 && employeeReportDetail.length > x[1]) && <li className="page-item"
                                                                    onClick={() => setX([6, 9])}><a className="page-link custom" href="##">3</a></li>}
                                                                {(employeeReportDetail.slice(x[0], x[1]).length === 3 && employeeReportDetail.length > x[1]) && <li className="page-item"><a className="page-link custom" href="##">..</a></li>}
                                                                <li className="page-item">
                                                                    {(employeeReportDetail.slice(x[0], x[1]).length === 3 && employeeReportDetail.length > x[1]) && <a className="page-link custom" href="##" aria-label="Next"
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
                                        )}
                                    </div>

                                    {noData &&
                                        <div className="report-no-data-found-area">
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
                                    <div className='text-blue font-weight-600'>{viewModelName}</div>
                                    <hr />
                                    <div className="table-responsive report-data-view-area">
                                        <table className='table report-table table-bordered'>
                                            <thead>
                                                <tr className='report-table-row with-border head'>
                                                    <th className='report-table-head no-verical-align'>CREATED DATE</th>
                                                    <th className='report-table-head no-verical-align text-center'>CREATED CANDIDATES</th>
                                                    <th className='report-table-head no-verical-align text-center'>ASSIGNED CANDIDATES</th>

                                                    <th className='report-table-head no-verical-align text-center'>TOTAL</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {dateWiseResults.slice(y[0], y[1]).map((date, index) => {
                                                    return (
                                                        <tr className='report-table-row with-border'
                                                            key={index}>
                                                            <td className='report-table-data no-wrap'>{date?.date}</td>
                                                            <td className='report-table-data text-center'>{date?.createdCands}</td>
                                                            <td className='report-table-data text-center'>{date?.assignedCands}</td>

                                                            <td className='report-table-data text-center is-bold'>{date?.createdCands + date?.assignedCands}</td>
                                                        </tr>
                                                    )
                                                })}

                                            </tbody>
                                            <tfoot>
                                                <tr className='report-table-row with-border table-foot'>
                                                    <td className='report-table-data'>Total</td>
                                                    <td className='report-table-data' align='center'>{dateWiseResults.reduce((total, date) => total + (date?.createdCands || 0), 0)}</td>
                                                    <td className='report-table-data' align='center'>{dateWiseResults.reduce((total, date) => total + (date?.assignedCands || 0), 0)}</td>

                                                    <td className='report-table-data' align='center'>{dateWiseResults.reduce((total, date) => total + ((date?.createdCands || 0) + (date?.assignedCands || 0)), 0)}</td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                    <div className="report-table-pagination-area">
                                        <div className="buttons">
                                            <nav aria-label="Page navigation example">
                                                <ul className="pagination">
                                                    <li className="page-item">
                                                        {y[0] > 0 && <a className="page-link custom" href="#" aria-label="Previous"
                                                            onClick={() => setY([y[0] - 5, y[1] - 5])}>
                                                            <span aria-hidden="true">&laquo;</span>
                                                            <span className="sr-only">Previous</span>
                                                        </a>}
                                                    </li>
                                                    <li className="page-item"
                                                        onClick={() => setY([0, 5])}><a className="page-link custom" href="#">1</a></li>
                                                    {(dateWiseResults.slice(y[0], y[1]).length === 5 && dateWiseResults.length > y[1]) && <li className="page-item"
                                                        onClick={() => setY([5, 10])}><a className="page-link custom" href="#">2</a></li>}
                                                    {(dateWiseResults.slice(y[0], y[1]).length === 5 && dateWiseResults.length > y[1]) && <li className="page-item"
                                                        onClick={() => setY([10, 15])}><a className="page-link custom" href="#">3</a></li>}
                                                    {(dateWiseResults.slice(y[0], y[1]).length === 5 && dateWiseResults.length > y[1]) && <li className="page-item"><a className="page-link custom" href="#">..</a></li>}
                                                    <li className="page-item">
                                                        {(dateWiseResults.slice(y[0], y[1]).length === 5 && dateWiseResults.length > y[1]) && <a className="page-link custom" href="#" aria-label="Next"
                                                            onClick={() => setY([x[0] + 5, y[1] + 5])}>
                                                            <span aria-hidden="true">&raquo;</span>
                                                            <span className="sr-only">Next</span>
                                                        </a>}
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
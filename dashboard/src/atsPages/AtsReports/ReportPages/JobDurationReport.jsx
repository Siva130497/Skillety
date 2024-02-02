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
import axios from 'axios';

const JobDurationReport = () => {
    const [filter, setFilter] = useState("");
    const navigate = useNavigate();
    const [selectedFromDate, setSelectedFromDate] = useState(new Date().toISOString().split('T')[0]);
    const [selectedToDate, setSelectedToDate] = useState(new Date().toISOString().split('T')[0]);

    const [selectedType, setSelectedType] = useState('JobCreatedDate');

    const [loading, setLoading] = useState(false);
    const [noData, setNoData] = useState(false);
    const [atsToken, setatsToken] = useState("");
    const [customDate, setCustomDate] = useState("");
    const [period, setPeriod] = useState("");
    const [employeeReportDetail, setEmployeeReportDetail] = useState([]);
    const [x, setX] = useState([0, 3]);

    const [clientArray, setClientArray] = useState([]);
    const [selectedClient, setSelectedClient] = useState(null);

    const getAllClients = async () => {
        try {
            const res = await axios.get("https://skillety-n6r1.onrender.com/ats-clients", {
                headers: {
                    Authorization: `Bearer ${atsToken}`,
                    Accept: 'application/json'
                }
            });
            const result = res.data;
            if (!result.error) {
                console.log(result);
                setClientArray([{ companyName: 'All' }, ...result]); // Add "Select Job" option
            } else {
                console.log(result);
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        setatsToken(JSON.parse(localStorage.getItem('atsToken')))
    }, [atsToken]);

    useEffect(() => {
        if (atsToken) {
            getAllClients();
        }
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
        if (period) {
            setLoading(true);
            setNoData(false);
            setEmployeeReportDetail([]);

            let endPoint = `https://skillety-n6r1.onrender.com/job-duration-report?period=${period}`
            if (selectedClient) {
                endPoint = `https://skillety-n6r1.onrender.com/job-duration-report?period=${period}&companyName=${selectedClient?.companyName}`
            }

            axios.get(endPoint, {
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

    const selectedClientTemplate = (option, props) => {
        if (option) {
            return (
                <div className="flex align-items-center">
                    <div className='text-capitalized'>{option.companyName}</div>
                </div>
            );
        }

        return <span>{props.placeholder}</span>;
    };

    const clientOptionTemplate = (option) => {
        return (
            <div className="flex align-items-center">
                <div className='text-capitalized'>{option.companyName}</div>
            </div>
        );
    };

    const handleDropdownChange = (e) => {
        if (e.value && e.value.companyName === 'All') {
            setSelectedClient(null); // Reset selected job when "Select Job" is selected
        } else {
            setSelectedClient(e.value);
        }
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
                                                        <option value="thisWeek">This Week</option>
                                                        <option value="thisMonth">This Month</option>
                                                        <option value="thisYear">This Year</option>
                                                        <option value="tastWeek">Last Week</option>
                                                        <option value="lastMonth">Last Month</option>
                                                        <option value="lastYear">Last Year</option>
                                                        <option value="CustomDate">Custom Date</option>
                                                    </select>
                                                </div>
                                                {filter === '' && <small className='text-danger'>Please select a search period.</small>}
                                            </div>

                                            <div className="col-12 col-lg-3 col-md-6 mb-4 mb-md-3 mb-lg-0">
                                                <div className="report-filter-input-area">
                                                    <Dropdown value={selectedClient} onChange={handleDropdownChange} options={clientArray} optionLabel="name" placeholder="Select Client Name"
                                                        filter filterPlaceholder="Search" valueTemplate={selectedClientTemplate} itemTemplate={clientOptionTemplate} className="w-full report-custom-select-input" />
                                                </div>
                                            </div>

                                            {/* <div className="col-12 col-lg-3 col-md-6 mb-4 mb-md-3 mb-lg-0">
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
                                            </div> */}

                                            <div className="col-12 col-lg-3 col-md-6 mb-4 mb-md-3 mb-lg-0">
                                                <button className='run-report-button'
                                                    onClick={runReport}
                                                    disabled={filter === ""}>Run Report</button>
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

                                        {/* <div className="report-radio-area">
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
                                        </div> */}
                                    </div>

                                    {employeeReportDetail.length > 0 &&
                                        <div className="report-view-section">
                                            <div className="table-report-head">
                                                Job Duration Report
                                            </div>
                                            <hr />
                                            <div className="report-view-area">
                                                <div className="table-responsive">
                                                    <table className='table report-table table-bordered' id='Export_table' ref={tableRef}>
                                                        <thead>
                                                            <tr className='report-table-row with-border'>
                                                                <th className='report-table-head no-verical-align'>JOB TITLE</th>
                                                                <th className='report-table-head no-verical-align'>CLIENT NAME</th>
                                                                <th className='report-table-head no-verical-align'>EMPLOYER NAME</th>
                                                                <th className='report-table-head no-verical-align'>OPEN DATE</th>
                                                                <th className='report-table-head no-verical-align'>FIRST JOINED CANDIDATE DATE</th>
                                                                <th className='report-table-head no-verical-align'>DELAY (IN DAYS)</th>
                                                                <th className='report-table-head no-verical-align'>JOB STATUS</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {employeeReportDetail.slice(x[0], x[1]).map((data, index) => {
                                                                return (

                                                                    <tr className='report-table-row with-border'>
                                                                        {/* <td className='report-table-data'>
                                                                    <span> Customer Relationship Manager</span><br />
                                                                    <span className='priority-stars'>
                                                                        <i className='bi bi-star-fill'></i>
                                                                        <i className='bi bi-star-fill'></i>
                                                                        <i className='bi bi-star'></i>
                                                                        <i className='bi bi-star'></i>
                                                                        <i className='bi bi-star'></i>
                                                                    </span>
                                                                </td> */}
                                                                        <td className='report-table-data text-capitalized'>{data?.jobRole ? data?.jobRole : "------"}</td>
                                                                        <td className='report-table-data text-capitalized'>{data?.clientName ? data?.clientName : "------"}</td>
                                                                        <td className='report-table-data text-capitalized'>{data?.createdEmployee ? data?.createdEmployee : "------"}</td>
                                                                        <td className='report-table-data no-wrap'>{data?.createdAt}</td>
                                                                        <td className='report-table-data no-wrap'>{data?.firstJoinedCandForJobDate}</td>
                                                                        <td className='report-table-data'>{data?.delay}</td>
                                                                        <td className='report-table-data'>{data?.jobStatus}</td>
                                                                    </tr>
                                                                )
                                                            })}
                                                        </tbody>
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
                                        </div>

                                    }

                                    {/* {selectedType === 'JobClosedDate' && (
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
                                    )} */}

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

export default JobDurationReport
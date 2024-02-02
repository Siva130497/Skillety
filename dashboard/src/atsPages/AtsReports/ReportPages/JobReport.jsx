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

const JobReport = () => {
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
            setClientArray([{ companyName: 'Select Client' }, ...result]); // Add "Select Job" option
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
        if(atsToken){
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

            let endPoint = `https://skillety-n6r1.onrender.com/job-report?period=${period}`
            if(selectedClient){
                endPoint = `https://skillety-n6r1.onrender.com/job-report?period=${period}&companyName=${selectedClient?.companyName}`
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

    const selectedClientTemplate = (option, props) => {
        if (option) {
            return (
                <div className="flex align-items-center">
                    <div>{option.companyName}</div>
                </div>
            );
        }

        return <span>{props.placeholder}</span>;
    };

    const clientOptionTemplate = (option) => {
        return (
            <div className="flex align-items-center">
                <div>{option.companyName}</div>
            </div>
        );
    };

    const handleDropdownChange = (e) => {
        if (e.value && e.value.companyName === 'Select Client') {
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
                                <button className='back-button' onClick={handleBackButtonClick}>
                                    <i className='bi bi-arrow-left mr-2'></i>
                                    Back
                                </button>
                            </div>
                            <div className="admin-component-name text-left">
                                Job Report
                            </div>

                            <div className="report-page-section">
                                <div className="card report-page-card">
                                    <div className="report-page-des-area">
                                        <p>Job success reports provide great insight into the progress of each job and verify the success ratio of hiring.</p>
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
                                                        <option value="lastWeek">Last Week</option>
                                                        <option value="lastMonth">Last Month</option>
                                                        <option value="lastYear">Last Year</option>
                                                        <option value="CustomDate">Custom Date</option>
                                                    </select>
                                                </div>
                                                {filter === '' && <small className='text-danger'>Please select a search period.</small>}
                                            </div>

                                            <div className="col-12 col-lg-3 col-md-6 mb-4 mb-md-3 mb-lg-0">
                                                <div className="report-filter-input-area">
                                                    {/* <i class="bi bi-chevron-down toggle-icon"></i> */}
                                                    {/* <select
                                                        className='report-filter-input'>
                                                        <option value="">Select Client Name</option>
                                                    </select> */}
                                                    <Dropdown value={selectedClient} onChange={handleDropdownChange} options={clientArray} optionLabel="name" placeholder="Select Client Name"
                                                        filter filterPlaceholder="Search" valueTemplate={selectedClientTemplate} itemTemplate={clientOptionTemplate} className="w-full report-custom-select-input" />
                                                </div>
                                            </div>

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
                                    </div>
                                    
                                    {employeeReportDetail.length > 0 &&
                                    <div className="report-view-section">
                                        <div className="report-view-area">
                                            <div className="table-responsive">
                                                <table className='table report-table table-bordered' id='Export_table' ref={tableRef}>
                                                    <thead>
                                                        <tr className='report-table-row with-border'>
                                                            <th className='report-table-head no-verical-align'>JOB TITLE</th>
                                                            <th className='report-table-head no-verical-align'>CLIENT NAME</th>
                                                            <th className='report-table-head no-verical-align'>ADDED ON</th>
                                                            <th className='report-table-head no-verical-align text-center'>JOINED CANDIDATES</th>
                                                            <th className='report-table-head no-verical-align text-center'>SCREENED CANDIDATES</th>
                                                            <th className='report-table-head no-verical-align text-center'>INTERVIEWED CANDIDATES</th>
                                                            <th className='report-table-head no-verical-align text-center'>OFFERED CANDIDATES</th>
                                                            <th className='report-table-head no-verical-align text-center'>REJECTED CANDIDATES</th>
                                                            <th className='report-table-head no-verical-align text-center'>ABSCONDED CANDIDATES</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {employeeReportDetail.slice(x[0], x[1]).map((data, index)=>{
                                                            return (

                                                        <tr className='report-table-row with-border'
                                                        key={index}>
                                                            <td className='report-table-data'>
                                                                {data?.jobRole}
                                                            </td>
                                                            <td className='report-table-data no-wrap'>{data?.clientName}</td>
                                                            <td className='report-table-data text-center'>{data?.createdAt}</td>
                                                            <td className='report-table-data text-center'>{data?.screenedCands}</td>
                                                            <td className='report-table-data text-center'>{data?.interviewCands}</td>
                                                            <td className='report-table-data text-center'>{data?.offeredCands}</td>
                                                            <td className='report-table-data text-center'>{data?.joinedCands}</td>
                                                            <td className='report-table-data text-center'>{data?.rejectedCands}</td>
                                                            <td className='report-table-data text-center'>{data?.abscondCands}</td>
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
                                    </div>}

                                    {noData &&<div className="report-no-data-found-area">
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

                {/* <div className="modal fade" id="ViewModal" tabindex="-1" role="dialog" aria-labelledby="ViewLabel"
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
                                                    <th className='report-table-head no-verical-align'>USER NAME</th>
                                                    <th className='report-table-head no-verical-align text-center'>NO. OF CALLS</th>
                                                    <th className='report-table-head no-verical-align text-center'>NO. OF PRE-SCREENS</th>
                                                    <th className='report-table-head no-verical-align text-center'>NO. OF INTERNAL SUBMISSION</th>
                                                    <th className='report-table-head no-verical-align text-center'>NO. OF CLIENT SUBMISSION</th>
                                                    <th className='report-table-head no-verical-align text-center'>NO. OF INTERVIEWS</th>
                                                    <th className='report-table-head no-verical-align text-center'>NO. OF OFFERED</th>
                                                    <th className='report-table-head no-verical-align text-center'>NO. OF HIRED</th>
                                                    <th className='report-table-head no-verical-align text-center'>NO. OF REJECTED</th>
                                                    <th className='report-table-head no-verical-align text-center'>SUCCESS RATE(IN %)</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className='report-table-row with-border'>
                                                    <td className='report-table-data'>Supriya</td>
                                                    <td className='report-table-data text-center'>1</td>
                                                    <td className='report-table-data text-center'>1</td>
                                                    <td className='report-table-data text-center'>1</td>
                                                    <td className='report-table-data text-center'>1</td>
                                                    <td className='report-table-data text-center'>1</td>
                                                    <td className='report-table-data text-center'>1</td>
                                                    <td className='report-table-data text-center'>1</td>
                                                    <td className='report-table-data text-center'>1</td>
                                                    <td className='report-table-data text-center'>0.00%</td>
                                                </tr>
                                                <tr className='report-table-row with-border'>
                                                    <td className='report-table-data'>Sudha</td>
                                                    <td className='report-table-data text-center'>1</td>
                                                    <td className='report-table-data text-center'>1</td>
                                                    <td className='report-table-data text-center'>1</td>
                                                    <td className='report-table-data text-center'>1</td>
                                                    <td className='report-table-data text-center'>1</td>
                                                    <td className='report-table-data text-center'>1</td>
                                                    <td className='report-table-data text-center'>1</td>
                                                    <td className='report-table-data text-center'>1</td>
                                                    <td className='report-table-data text-center'>0.00%</td>
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
                </div> */}

                <Footer />
            </div>
        </div>
    )
}

export default JobReport
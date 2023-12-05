import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import ATSLayout from '../../components/ATSLayout';
import Footer from '../../components/Footer';
import './AllCandidates.css';
import $ from 'jquery';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const AllCandidates = () => {
    const { getProtectedData } = useContext(AuthContext);

    const [staffToken, setStaffToken] = useState("");
    const [employeeId, setEmployeeId] = useState("");
    const [candidateDetail, setCandidateDetail] = useState([]);
    const [selectedCandidate, setSelectedCandidate] = useState();
    const [appliedOfPostedJobs, setAppliedOfPostedJobs] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [filteredSearchResults, setFilteredSearchResults] = useState([]);
    const [filteredSearchResultsMsg, setFilteredSearchResultsMsg] = useState("");

    const [x, setX] = useState([0, 10]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        $(document).ready(function () {
        });

    }, []);

    useEffect(() => {
        setStaffToken(JSON.parse(localStorage.getItem('staffToken')))
    }, [staffToken])

    useEffect(() => {
        if (staffToken) {
            const fetchData = async () => {
                try {
                    const userData = await getProtectedData(staffToken);
                    console.log(userData);
                    setEmployeeId(userData.id);
                } catch (error) {
                    console.log(error)
                }
            };

            fetchData();
        }
    }, [staffToken]);

    const getAllCandidateDetail = async () => {
        try {
            setLoading(true);
            const response = await axios.get('https://skillety.onrender.com/candidate-Detail', {
                headers: {
                    Authorization: `Bearer ${staffToken}`,
                    Accept: 'application/json'
                }
            });
            const result = response.data;
            if (!result.error) {
                console.log(result);
                setCandidateDetail(result.reverse());
            } else {
                console.log(result);
            }

            setLoading(false);
        } catch (error) {
            console.log(error);

            setLoading(false);
        }
    };

    const getAppliedOfPostedJobs = async () => {
        try {
            const res = await axios.get(`https://skillety.onrender.com/applied-jobs-of-posted/${employeeId}`, {
                headers: {
                    Authorization: `Bearer ${staffToken}`,
                    Accept: 'application/json'
                }
            });
            const result = res.data;
            if (!result.error) {
                console.log(result);
                setAppliedOfPostedJobs(result);
            } else {
                console.log(result);
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if (staffToken) {
            getAllCandidateDetail();
        }

    }, [staffToken]);


    useEffect(() => {
        if (employeeId) {
            getAppliedOfPostedJobs();
        }

    }, [employeeId]);

    const handleApiCall = (candData) => {
        const accessToken = 'CJT85DoAcFM22rKrrQdrGkdWvWNUY_Xf';
        const key = 'OSCfJPqV1E_PNd3mX0zL9NIg5vkjMTMs5XfQ';
        const encodedCredentials = btoa(`${accessToken}:${key}`);

        const interviewCandidateName = candData.firstName + ' ' + candData.lastName;
        const interviewCandidateEmail = candData.email;
        const interviewCandidatePhoneNo = candData.phone;

        const data = JSON.stringify({
            candidates: [
                {
                    name: interviewCandidateName,
                    email: interviewCandidateEmail,
                    phoneNo: "0" + interviewCandidatePhoneNo,
                },
            ],
            hiringRoleId: 4427,
            roundName: "Hands-On",
        });
        console.log(data)

        const config = {
            method: "post",
            url: "/external-interviews/request",
            headers: {
                Authorization: `Basic ${encodedCredentials}`,
                "Content-Type": "application/json",
            },
            data: data,
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const handleSend = (id) => {
        const candData = candidateDetail.find(cand => cand.id === id)
        handleApiCall(candData)
    }

    const viewCandidateDetail = (id) => {
        const Candidate = candidateDetail.find(filteredCandidate => filteredCandidate.id === id);
        setSelectedCandidate(Candidate);
    }

    const handleSkillSearch = () => {
        const searchResults = searchInput
            .split(/[,\s]+/)
            .filter(result => result.trim());

        const filteredObjBySkills = candidateDetail.filter(candidate =>
            searchResults.some(searchResult =>
                candidate.skills.some(skill =>
                    skill.toLowerCase().includes(searchResult.toLowerCase())
                )
            )
        );

        const filteredObjByDesignation = candidateDetail.filter(candidate =>
            searchResults.some(searchResult =>
                candidate.designation[0].toLowerCase().includes(searchResult.toLowerCase())
            )
        );

        const mergedResults = [...filteredObjBySkills, ...filteredObjByDesignation];
        if (mergedResults.length > 0) {
            setFilteredSearchResults(mergedResults);
        } else {
            setFilteredSearchResultsMsg("No such candidates found..!")
        }
    }

    return (
        <div>
            <div class="main-wrapper main-wrapper-1">
                <div class="navbar-bg"></div>

                <ATSLayout />

                <div class="main-content">
                    <section class="section">
                        <div className="my-app-section">
                            <div className="admin-component-name">
                                All Candidates
                            </div>

                            {loading ? (
                                <div className="table-skeleton-area">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="table-data-skeleton-area">
                                                <div className="custom-flex-area">
                                                    <div>
                                                        <div className='pt-3'>
                                                            <Skeleton height={25} width={250} />
                                                        </div>
                                                        <div className='pt-3'>
                                                            <Skeleton height={15} width={120} />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="table-responsive table-scroll-area mt-4 skeleton-table">
                                                    <div className="table skeleton-table table-striped table-hover admin-lg-table">
                                                        <tr className="skeleton-table-row">
                                                            <th className='w-5'>
                                                                <Skeleton height={18} width={30} />
                                                            </th>
                                                            <th className='w-25'>
                                                                <Skeleton height={18} width={100} />
                                                            </th>
                                                            <th className='w-25'>
                                                                <Skeleton height={18} width={100} />
                                                            </th>
                                                            <th className='w-25'>
                                                                <Skeleton height={18} width={100} />
                                                            </th>
                                                            <th className='w-20'>
                                                                <Skeleton height={18} width={80} />
                                                            </th>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <Skeleton height={18} width={30} />
                                                            </td>
                                                            <td>
                                                                <Skeleton height={18} width={100} />
                                                            </td>
                                                            <td>
                                                                <Skeleton height={18} width={100} />
                                                            </td>
                                                            <td>
                                                                <Skeleton height={18} width={100} />
                                                            </td>
                                                            <td>
                                                                <Skeleton height={18} width={80} />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <Skeleton height={18} width={30} />
                                                            </td>
                                                            <td>
                                                                <Skeleton height={18} width={100} />
                                                            </td>
                                                            <td>
                                                                <Skeleton height={18} width={100} />
                                                            </td>
                                                            <td>
                                                                <Skeleton height={18} width={100} />
                                                            </td>
                                                            <td>
                                                                <Skeleton height={18} width={80} />
                                                            </td>
                                                        </tr>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="row">
                                    <div className="col-12">
                                        <div className="admin-lg-table-section">
                                            <div className='admin-lg-table-area man-app'>
                                                <div className='man-app-title-area candidate'>
                                                    <div>
                                                        <div className="man-app-title">
                                                            All Candidates Details
                                                        </div>
                                                        <div className="man-app-sub-title">
                                                            Total Candidates :&nbsp;
                                                            <span>{filteredSearchResultsMsg ? "0" : filteredSearchResults.length > 0 ? filteredSearchResults.length : !searchInput ? candidateDetail.length : null}</span>
                                                        </div>
                                                    </div>
                                                    {candidateDetail.length > 0 && <div className="recruiter-search-input-area">
                                                        <input type="search" className='recruiter-search-input' placeholder='Search skills/designations...'
                                                            value={searchInput}
                                                            onChange={(e) => {
                                                                setSearchInput(e.target.value);
                                                                setFilteredSearchResults([]);
                                                                setFilteredSearchResultsMsg("");
                                                            }}
                                                            onKeyPress={(event) => {
                                                                event.key === "Enter" && handleSkillSearch();
                                                            }} />
                                                        <i className='bi bi-search search-icon'></i>
                                                        <button className='recruiter-search-btn' onClick={handleSkillSearch}>Search</button>
                                                    </div>}
                                                </div>

                                                {candidateDetail.length > 0 ?
                                                    <div className="table-responsive table-scroll-area">
                                                        <table className="table table-striped table-hover admin-lg-table">
                                                            <tr className='dash-table-row candidate'>
                                                                <th className='dash-table-head'>No.</th>
                                                                <th className='dash-table-head'>Full Name</th>
                                                                <th className='dash-table-head'>Email ID</th>
                                                                <th className='dash-table-head'>Phone No.</th>
                                                                <th className='dash-table-head text-center'>Send an interview invitation</th>
                                                                <th className='dash-table-head text-center'>View</th>
                                                            </tr>


                                                            {/* table data */}
                                                            {filteredSearchResultsMsg ?
                                                                <tr>
                                                                    <td colSpan={6} className='text-secondary text-center'>
                                                                        {filteredSearchResultsMsg}
                                                                    </td>
                                                                </tr> :
                                                                filteredSearchResults.length > 0 ?
                                                                    filteredSearchResults.slice(x[0], x[1]).map((candidate, index) => {

                                                                        return (
                                                                            <tr className='dash-table-row client' key={candidate.id}>
                                                                                <td className='dash-table-data1'>{index + 1}.</td>
                                                                                <td className='dash-table-data1 text-capitalized'>
                                                                                    {candidate.firstName + ' ' + candidate.lastName}
                                                                                </td>
                                                                                <td className='dash-table-data1'>
                                                                                    <a href={`mailto:${candidate.email}`}
                                                                                        className='dash-table-data1 link is-link'>
                                                                                        {candidate.email}
                                                                                    </a>
                                                                                </td>

                                                                                {/* <td className='dash-table-data1'>
                                                                        <span className='text-warning p-0'>
                                                                        <i class="bi bi-exclamation-circle mr-2"></i>
                                                                        Email still not sent!
                                                                    </span>

                                                                        <span className='text-success p-0'>
                                                                            <i class="bi bi-check-circle mr-2"></i>
                                                                            Email already sent
                                                                        </span>
                                                                    </td> */}
                                                                                <td className='dash-table-data1'>
                                                                                    <a href={`tel:${candidate.phone}`}
                                                                                        className='dash-table-data1 link is-link'>
                                                                                        {candidate.phone}
                                                                                    </a>
                                                                                </td>

                                                                                <td className='dash-table-data1 text-center'>
                                                                                    <button className='send-email-btn' onClick={() => handleSend(candidate.id)}>
                                                                                        <i class="bi bi-send-fill send-icon"></i>
                                                                                        Send
                                                                                    </button>
                                                                                </td>

                                                                                <td className='text-center'>
                                                                                    <div className="action-btn-area">
                                                                                        <button className='job-view-btn' data-toggle="modal" title='View Candidate Details...' data-target="#candidatesViewModal" onClick={() => viewCandidateDetail(candidate.id)}>
                                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                                                                                                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                                                                                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                                                                                            </svg>
                                                                                        </button>
                                                                                    </div>
                                                                                </td>
                                                                            </tr>
                                                                        )
                                                                    }) :
                                                                    !searchInput ? candidateDetail.slice(x[0], x[1]).map((candidate, index) => {
                                                                        return (
                                                                            <tr className='dash-table-row client' key={candidate.id}>
                                                                                <td className='dash-table-data1'>{index + 1}.</td>
                                                                                <td className='dash-table-data1 text-capitalized'>
                                                                                    {candidate.firstName + ' ' + candidate.lastName}
                                                                                </td>
                                                                                <td className='dash-table-data1'>
                                                                                    <a href={`mailto:${candidate.email}`}
                                                                                        className='dash-table-data1 link is-link'>
                                                                                        {candidate.email}
                                                                                    </a>
                                                                                </td>

                                                                                {/* <td className='dash-table-data1'>
                                                                        <span className='text-warning p-0'>
                                                                        <i class="bi bi-exclamation-circle mr-2"></i>
                                                                        Email still not sent!
                                                                    </span>

                                                                        <span className='text-success p-0'>
                                                                            <i class="bi bi-check-circle mr-2"></i>
                                                                            Email already sent
                                                                        </span>
                                                                    </td> */}
                                                                                <td className='dash-table-data1'>
                                                                                    <a href={`tel:${candidate.phone}`}
                                                                                        className='dash-table-data1 link is-link'>
                                                                                        {candidate.phone}
                                                                                    </a>
                                                                                </td>

                                                                                <td className='dash-table-data1 text-center'>
                                                                                    <button className='send-email-btn' onClick={() => handleSend(candidate.id)}>
                                                                                        <i class="bi bi-send-fill send-icon"></i>
                                                                                        Send
                                                                                    </button>
                                                                                </td>

                                                                                <td className='text-center'>
                                                                                    <div className="action-btn-area">
                                                                                        <button className='job-view-btn' data-toggle="modal" title='View Candidate Details...' data-target="#candidatesViewModal" onClick={() => viewCandidateDetail(candidate.id)}>
                                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                                                                                                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                                                                                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                                                                                            </svg>
                                                                                        </button>
                                                                                    </div>
                                                                                </td>
                                                                            </tr>
                                                                        )
                                                                    })
                                                                        : null}
                                                        </table>
                                                    </div> :
                                                    <div className="no-data-created-area">
                                                        <div className='no-data-created'>
                                                            <img src="../assets/img/no-data/no-data-img.png" className='no-data-img' alt="" />
                                                            <div className='no-data-text'>No Candidates Created Yet..!</div>
                                                        </div>
                                                    </div>
                                                }
                                            </div>

                                            {/* <div className="view-application-btn-area text-center">
                                            <a href='#' className='view-app-btn'>
                                                View More&nbsp;&nbsp;
                                                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="8" viewBox="0 0 13 8" fill="none">
                                                    <path d="M12.3536 4.35355C12.5488 4.15829 12.5488 3.84171 12.3536 3.64645L9.17157 0.464466C8.97631 0.269204 8.65973 0.269204 8.46447 0.464466C8.2692 0.659728 8.2692 0.976311 8.46447 1.17157L11.2929 4L8.46447 6.82843C8.2692 7.02369 8.2692 7.34027 8.46447 7.53553C8.65973 7.7308 8.97631 7.7308 9.17157 7.53553L12.3536 4.35355ZM0 4.5L12 4.5V3.5L0 3.5L0 4.5Z" fill="#0F75C5" />
                                                </svg>
                                            </a>
                                        </div> */}
                                            <div className="table-pagination-area pt-3">
                                                <div className="pagination-btn-area">
                                                    {x[0] > 0 && <button className='pag-prev-btn' onClick={() => setX([x[0] - 10, x[1] - 10])}>
                                                        <i class="bi bi-chevron-left"></i>
                                                    </button>}
                                                    {!filteredSearchResultsMsg && <div className='pag-page'>
                                                        <span className='current-page'>{Math.ceil(x[0] / 10) + 1}</span>&nbsp;/&nbsp;
                                                        <span className='total-page'>{filteredSearchResults.length > 0 ? Math.ceil(filteredSearchResults.length / 10) : Math.ceil(candidateDetail.length / 10)}</span>
                                                    </div>}
                                                    {(filteredSearchResultsMsg ? !filteredSearchResultsMsg : filteredSearchResults.length > 0 ? (filteredSearchResults.slice(x[0], x[1]).length === 10 && filteredSearchResults.length > x[1]) : (candidateDetail.slice(x[0], x[1]).length === 10 && candidateDetail.length > x[1])) && <button className='pag-next-btn' onClick={() => setX([x[0] + 10, x[1] + 10])}>
                                                        <i class="bi bi-chevron-right"></i>
                                                    </button>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                        </div>
                    </section>
                </div>

                {/* Candidates details view modal here */}
                <div className="modal fade" id="candidatesViewModal" tabindex="-1" role="dialog" aria-labelledby="candidatesViewLabel"
                    aria-hidden="true">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content recruiter-view-modal">
                            <div className="modal-header recruiter-view-modal-header">
                                <h5 className="modal-title recruiter-view-modal-title candidate" id="candidatesViewLabel">
                                    Candidate Details_
                                </h5>
                                <a href='#' type="button" className="close recruiter-view-close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true"><i class="bi bi-x close-icon"></i></span>
                                </a>
                            </div>
                            <div className="modal-body">
                                <div className="card p-4 recruiter-view-card candidate">
                                    <div className="row">
                                        <div className="col-12 col-sm-5">
                                            <div className="view-det-head">Full Name</div>
                                        </div>
                                        <div className="col-12 col-sm-7">
                                            <div className="view-det-sub-head text-capitalized">{selectedCandidate?.firstName + ' ' + selectedCandidate?.lastName}</div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-12 col-sm-5">
                                            <div className="view-det-head">Mobile Number</div>
                                        </div>
                                        <div className="col-12 col-sm-7">
                                            <div className="view-det-sub-head">
                                                <a href={`tel:${selectedCandidate?.phone}`}
                                                    className='view-det-sub-head link is-link'>
                                                    {selectedCandidate?.phone}
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-12 col-sm-5">
                                            <div className="view-det-head">Email ID</div>
                                        </div>
                                        <div className="col-12 col-sm-7">
                                            <div className="view-det-sub-head">
                                                <a href={`mailto:${selectedCandidate?.email}`}
                                                    className='view-det-sub-head link is-link'>
                                                    {selectedCandidate?.email}
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-12 col-sm-5">
                                            <div className="view-det-head">Current Job Role</div>
                                        </div>
                                        <div className="col-12 col-sm-7">
                                            <div className="view-det-sub-head text-capitalized">{selectedCandidate?.designation[0]}</div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-12 col-sm-5">
                                            <div className="view-det-head">Skills</div>
                                        </div>
                                        <div className="col-12 col-sm-7">
                                            <div className="cand-skills-area">
                                                {selectedCandidate?.skills.map(skill => {
                                                    return (
                                                        <span className='cand-skill text-capitalized'>{skill}</span>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-12 col-sm-5">
                                            <div className="view-det-head">Experience</div>
                                        </div>
                                        <div className="col-12 col-sm-7">
                                            <div className="view-det-sub-head">
                                                <span>{selectedCandidate?.year}</span>&nbsp;years and&nbsp;<span>{selectedCandidate?.month}</span>&nbsp;months
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-12 col-sm-5">
                                            <div className="view-det-head">Current/Previous Working/Worked Company Name</div>
                                        </div>
                                        <div className="col-12 col-sm-7">
                                            <div className="view-det-sub-head text-capitalized">{selectedCandidate?.companyName}</div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-12 col-sm-5">
                                            <div className="view-det-head">College</div>
                                        </div>
                                        <div className="col-12 col-sm-7">
                                            <div className="view-det-sub-head text-capitalized">{selectedCandidate?.college}</div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-12 col-sm-5">
                                            <div className="view-det-head">Education</div>
                                        </div>
                                        <div className="col-12 col-sm-7">
                                            <div className="view-det-sub-head text-capitalized">{selectedCandidate?.education}</div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-12 col-sm-5">
                                            <div className="view-det-head text-capitalized">Location</div>
                                        </div>
                                        <div className="col-12 col-sm-7">
                                            <div className="view-det-sub-head">{selectedCandidate?.location}</div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-12 col-sm-5">
                                            <div className="view-det-head">About him/her</div>
                                        </div>
                                        <div className="col-12 col-sm-7">
                                            <div className="view-det-sub-head text-capitalized">{selectedCandidate?.profileHeadline}</div>
                                        </div>
                                    </div>
                                    <hr />
                                    {selectedCandidate?.selectedDate && <div className="row">
                                        <div className="col-12 col-sm-5">
                                            <div className="view-det-head">Last Working Day</div>
                                        </div>
                                        <div className="col-12 col-sm-7">
                                            <div className="view-det-sub-head">{selectedCandidate?.selectedDate}</div>
                                        </div>
                                    </div>}
                                    {selectedCandidate?.selectedDate && <hr />}
                                    <div className="row">
                                        <div className="col-12 col-sm-5">
                                            <div className="view-det-head">Applied jobs of your posted</div>
                                        </div>
                                        <div className="col-12 col-sm-7">
                                            <div className="cand-skills-area">
                                                {appliedOfPostedJobs
                                                    .filter((appliedOfPostedJob) => appliedOfPostedJob.candidateId === selectedCandidate?.id).length > 0 ?
                                                    appliedOfPostedJobs
                                                        .filter((appliedOfPostedJob) => appliedOfPostedJob.candidateId === selectedCandidate?.id)
                                                        .map((appliedOfPostedJob) => {
                                                            return (
                                                                <span className='cand-skill text-capitalized'>{appliedOfPostedJob.jobRole[0]}</span>
                                                            )
                                                        }) :
                                                    <p className='text-secondary'>Still not applied for your posted jobs</p>
                                                }
                                            </div>
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
            </div >
        </div >
    )
}

export default AllCandidates
import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import $ from 'jquery';
import './AppliedCandidate.css';
import './AppliedCandidate-responsive.css';
import ClientLayout from '../../components/ClientLayout';
import Footer from '../../components/Footer';
import axios from 'axios';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import ErrorPage from '../../404/404';

const AppliedCandidate = () => {
    const [clientToken, setClientToken] = useState("");
    const { id } = useParams();
    const location = useLocation();
    const { cands, Job } = location.state
    const { getProtectedData, getCandidateImg, candidateImg, sendNotification } = useContext(AuthContext);
    const [employeeId, setEmployeeId] = useState("");
    const [loginClientDetail, setLoginClientDetail] = useState();
    const [candidateDetail, setCandidateDetail] = useState([]);
    const [selectedJobs, setSelectedJobs] = useState([]);
    const [reqCands, setReqCands] = useState([]);
    const [job, setJob] = useState();

    const [selectedCandidates, setSelectedCandidates] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState("");
    const [applicationStatus, setApplicationStatus] = useState([]);

    const [x, setX] = useState([0, 4]);

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [pageNotFound, setPageNotFound] = useState(false);

    useEffect(() => {
        setClientToken(JSON.parse(localStorage.getItem('clientToken')))
    }, [clientToken]);

    //for show success message for payment
    function showSuccessMessage(message) {
        Swal.fire({
            title: 'Success!',
            text: message,
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
        });
    }

    //for show error message for payment
    function showErrorMessage() {
        Swal.fire({
            title: 'Error!',
            text: "An error occured!",
            icon: 'error',
            confirmButtonColor: '#d33',
            confirmButtonText: 'OK',
        });
    }

    const getAllCandidateDetail = async () => {
        
        try {
            const response = await axios.get('https://skillety-n6r1.onrender.com/candidate-Detail', {
                headers: {
                    Accept: 'application/json'
                }
            });
            const result = response.data;
            
            if (!result.error) {
                const filteredCandidates = result.filter(candidate => cands.includes(candidate.id));
                if (filteredCandidates.length > 0) {
                    setReqCands(filteredCandidates)
                    setLoading(false);
                } else {
                    setLoading(false);
                    setPageNotFound(true);
                }

            } else {
                console.log(result);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        setJob(Job);
        getCandidateImg();
    }, []);

    useEffect(() => {
        if (cands) {
            getAllCandidateDetail();
        }
    }, [cands]);

    // useEffect(() => {
    //     if (id) {
    //         axios.get(`https://skillety-n6r1.onrender.com/job/${id}`, {
    //             headers: {
    //                 // Authorization: `Bearer ${clientToken}`,
    //                 Accept: 'application/json'
    //             }
    //         })
    //             .then(res => {
    //                 console.log(res.data)
    //                 setJob(res.data)
    //             })
    //             .catch(err => {
    //                 console.log(err)
    //             })
    //     }
    // }, [id])

    const getLoginClientDetail = async () => {
        try {
            const res = await axios.get(`https://skillety-n6r1.onrender.com/client/${employeeId}`, {
                headers: {
                    Authorization: `Bearer ${clientToken}`,
                    Accept: 'application/json'
                }
            });
            const result = res.data;
            if (!result.error) {
                console.log(result);
                setLoginClientDetail(result);
            } else {
                console.log(result);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const getAppliedOfPostedJobs = async () => {
        try {
            const res = await axios.get(`https://skillety-n6r1.onrender.com/applied-jobs-of-posted/${loginClientDetail.companyId}`, {
                headers: {
                    Authorization: `Bearer ${clientToken}`,
                    Accept: 'application/json'
                }
            });
            const result = res.data;
            if (!result.error) {
                console.log(result);
                const jobWithDiffCandId = result.filter(jobs => jobs.jobId === id)
                console.log(jobWithDiffCandId)
                setSelectedJobs(jobWithDiffCandId);
            } else {
                console.log(result);
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if (id && clientToken) {
            axios.get(`https://skillety-n6r1.onrender.com/application-status/${id}`, {
                headers: {
                    Authorization: `Bearer ${clientToken}`,
                    Accept: 'application/json'
                }
            })
                .then(res => {
                    console.log(res.data);
                    setApplicationStatus(res.data)
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }, [id, clientToken])

    useEffect(() => {
        if (clientToken) {
            const fetchData = async () => {
                try {
                    const user = await getProtectedData(clientToken);
                    console.log(user);
                    setEmployeeId(user.id || user.uid);
                } catch (error) {
                    console.log(error);
                    window.location.href = 'https://skillety-frontend-wcth.onrender.com/client-login'
                }
            };

            fetchData();
        }
    }, [clientToken]);

    useEffect(() => {
        if (employeeId) {
            getLoginClientDetail();
        }
    }, [employeeId]);

    // useEffect(() => {
    //     if (loginClientDetail) {

    //         getAppliedOfPostedJobs();
    //     }

    // }, [loginClientDetail])

    // useEffect(() => {
    //     if (selectedJobs && selectedJobs.length > 0) {
    //         const appliedCandIds = selectedJobs.map(job => job.candidateId);
    //         console.log(appliedCandIds)
    //         const appliedCands = candidateDetail.filter(cand => appliedCandIds.includes(cand.id));
    //         if (appliedCands) {
    //             // setLoading(false);
    //             setReqCands(appliedCands);
    //         } else {
    //             // setLoading(false);
    //             // setPageNotFound(true);
    //         }

    //     }
    // }, [selectedJobs])

    const handleCheckboxChange = (candidateId) => {

        const isSelected = selectedCandidates.includes(candidateId);

        setSelectedCandidates((prevSelected) =>
            isSelected
                ? prevSelected.filter((id) => id !== candidateId)
                : [...prevSelected, candidateId]
        );
    };

    const handleChangeStatus = () => {

        console.log("Selected Candidates: ", selectedCandidates);
        console.log("Selected Status: ", selectedStatus);

        const applicationData = {
            jobId: id,
            status: selectedStatus,
            candidateIdArray: selectedCandidates,
        }

        axios.patch("https://skillety-n6r1.onrender.com/update-application-status", applicationData, {
            headers: {
                Authorization: `Bearer ${clientToken}`,
                Accept: 'application/json'
            }
        })
            .then(res => {
                console.log(res.data);
                showSuccessMessage(`The Status of the selected candidate is Updated.`)

                const selectedCandidateName = reqCands.filter(cand => selectedCandidates.includes(cand.id)).map(candidate => candidate.firstName + " " + candidate.lastName)

                sendNotification({ id: loginClientDetail.companyId, name: loginClientDetail.companyName }, { id: selectedCandidates, name: selectedCandidateName }, `Yor Applied Job of ${Job.jobRole[0]} Status has been Changed to ${selectedStatus}`, "/my-application", clientToken)

            })
            .catch(err => {
                console.log(err)
                showErrorMessage();
            })

    };

    return (
        <div>
            <div class="main-wrapper main-wrapper-1">
                <div class="navbar-bg"></div>
                <ClientLayout />

                <div class="main-content">
                    <section class="section">
                        <div className="my-app-section">
                            <div className="admin-component-name">
                                Applicants
                            </div>

                            {loading &&
                                <div className="dash-talent--profile-card-section">
                                    <div className="card change-status-card">
                                        <div className="card-change-status-title w-20">
                                            <Skeleton height={20} />
                                        </div>
                                        <div className="card-change-status-input-area">
                                            <div className='select-option-area position-relative w-100'>
                                                <Skeleton height={45} />
                                            </div>
                                            <Skeleton height={45} width={100} />
                                        </div>
                                    </div>

                                    <article className="talent--profile-card applied">
                                        <div className="tal--pro-card-left-area applied">
                                            <div className='card-split-line applied'></div>
                                            <div className="tal--pro-card-name-area">
                                                <Skeleton height={25} width={25} />
                                                <h6 className='tal--pro-card-name'>
                                                    <Skeleton height={20} width={150} />
                                                </h6>
                                            </div>
                                            <div className="tal--pro-card-tags applied">
                                                <h6 className='tal--pro-card-exp'>
                                                    <Skeleton height={10} width={100} />
                                                </h6>
                                                <h6 className='tal--pro-card-location'>
                                                    <Skeleton height={10} width={100} />
                                                </h6>
                                            </div>
                                            <div className="tal--pro-card-desc-area applied">
                                                <div className="row tal--pro-card-desc-row">
                                                    <div className="col-12 col-lg-3 col-md-3 custom-padd-right">
                                                        <h6 className='tal--pro-card-desc-title'><Skeleton height={10} width={100} /></h6>
                                                    </div>
                                                    <div className="col-12 col-lg-9 col-md-9 custom-padd-left">
                                                        <p className='tal--pro-card-desc'><Skeleton height={10} width={100} /></p>
                                                    </div>
                                                </div>
                                                <div className="row tal--pro-card-desc-row">
                                                    <div className="col-12 col-lg-3 col-md-3 custom-padd-right">
                                                        <h6 className='tal--pro-card-desc-title'><Skeleton height={10} width={100} /></h6>
                                                    </div>
                                                    <div className="col-12 col-lg-9 col-md-9 custom-padd-left">
                                                        <p className='tal--pro-card-desc'><Skeleton height={10} width={200} /></p>
                                                    </div>
                                                </div>
                                                <div className="row tal--pro-card-desc-row">
                                                    <div className="col-12 col-lg-3 col-md-3 custom-padd-right">
                                                        <h6 className='tal--pro-card-desc-title'><Skeleton height={10} width={100} /></h6>
                                                    </div>
                                                    <div className="col-12 col-lg-9 col-md-9 custom-padd-left">
                                                        <p className='tal--pro-card-desc'><Skeleton height={10} width={50} /></p>
                                                    </div>
                                                </div>
                                                <div className="row tal--pro-card-desc-row">
                                                    <div className="col-12 col-lg-3 col-md-3 custom-padd-right">
                                                        <h6 className='tal--pro-card-desc-title'><Skeleton height={10} width={100} /></h6>
                                                    </div>
                                                    <div className="col-12 col-lg-9 col-md-9 custom-padd-left">
                                                        <p className='tal--pro-card-desc'><Skeleton height={10} width={150} /></p>
                                                    </div>
                                                </div>
                                                <div className="row tal--pro-card-desc-row">
                                                    <div className="col-12 col-lg-3 col-md-3 custom-padd-right">
                                                        <h6 className='tal--pro-card-desc-title'><Skeleton height={10} width={100} /></h6>
                                                    </div>
                                                    <div className="col-12 col-lg-9 col-md-9 custom-padd-left">
                                                        <p className='tal--pro-card-desc'>
                                                            <Skeleton height={10} />
                                                            <Skeleton height={10} />
                                                            <Skeleton height={10} />
                                                            <Skeleton height={10} width={200} />
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="row tal--pro-card-desc-row">
                                                    <div className="col-12 col-lg-3 col-md-3 custom-padd-right">
                                                        <h6 className='tal--pro-card-desc-title font-weight-700'><Skeleton height={10} width={100} /></h6>
                                                    </div>
                                                    <div className="col-12 col-lg-9 col-md-9 custom-padd-left">
                                                        <p className='tal--pro-card-desc font-weight-700'><Skeleton height={10} width={100} /></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="tal--pro-card-right-area applied">
                                            <div className="tal--pro-card-right-cover-area applied">
                                                <div className='tal--pro-card-profile-img-role-area'>
                                                    <Skeleton circle={true} height={90} width={90} />
                                                    <p className='tal--pro-card-role-name mb-0'><Skeleton height={10} width={100} /></p>
                                                </div>
                                                <div className="tal--pro-card-contact-btn-area">
                                                    <Skeleton height={40} width={100} />
                                                </div>
                                                <div className="tal--pro-card-ability-number-area applied">
                                                    <div className="tal--pro-card-ability-number-left applied">
                                                        <h6 className='tal--pro-card-ability'><Skeleton height={10} width={50} /></h6>
                                                        <h2 className='tal--pro-card-percentage custom'><Skeleton height={15} width={20} /></h2>
                                                    </div>
                                                    <div className="tal--pro-card-ability-number-right applied">
                                                        <h6 className='tal--pro-card-ability'><Skeleton height={10} width={50} /></h6>
                                                        <h2 className='tal--pro-card-days custom'><span><Skeleton height={15} width={70} /></span></h2>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </article>

                                    <article className="talent--profile-card applied">
                                        <div className="tal--pro-card-left-area applied">
                                            <div className='card-split-line applied'></div>
                                            <div className="tal--pro-card-name-area">
                                                <Skeleton height={25} width={25} />
                                                <h6 className='tal--pro-card-name'>
                                                    <Skeleton height={20} width={150} />
                                                </h6>
                                            </div>
                                            <div className="tal--pro-card-tags applied">
                                                <h6 className='tal--pro-card-exp'>
                                                    <Skeleton height={10} width={100} />
                                                </h6>
                                                <h6 className='tal--pro-card-location'>
                                                    <Skeleton height={10} width={100} />
                                                </h6>
                                            </div>
                                            <div className="tal--pro-card-desc-area applied">
                                                <div className="row tal--pro-card-desc-row">
                                                    <div className="col-12 col-lg-3 col-md-3 custom-padd-right">
                                                        <h6 className='tal--pro-card-desc-title'><Skeleton height={10} width={100} /></h6>
                                                    </div>
                                                    <div className="col-12 col-lg-9 col-md-9 custom-padd-left">
                                                        <p className='tal--pro-card-desc'><Skeleton height={10} width={100} /></p>
                                                    </div>
                                                </div>
                                                <div className="row tal--pro-card-desc-row">
                                                    <div className="col-12 col-lg-3 col-md-3 custom-padd-right">
                                                        <h6 className='tal--pro-card-desc-title'><Skeleton height={10} width={100} /></h6>
                                                    </div>
                                                    <div className="col-12 col-lg-9 col-md-9 custom-padd-left">
                                                        <p className='tal--pro-card-desc'><Skeleton height={10} width={200} /></p>
                                                    </div>
                                                </div>
                                                <div className="row tal--pro-card-desc-row">
                                                    <div className="col-12 col-lg-3 col-md-3 custom-padd-right">
                                                        <h6 className='tal--pro-card-desc-title'><Skeleton height={10} width={100} /></h6>
                                                    </div>
                                                    <div className="col-12 col-lg-9 col-md-9 custom-padd-left">
                                                        <p className='tal--pro-card-desc'><Skeleton height={10} width={50} /></p>
                                                    </div>
                                                </div>
                                                <div className="row tal--pro-card-desc-row">
                                                    <div className="col-12 col-lg-3 col-md-3 custom-padd-right">
                                                        <h6 className='tal--pro-card-desc-title'><Skeleton height={10} width={100} /></h6>
                                                    </div>
                                                    <div className="col-12 col-lg-9 col-md-9 custom-padd-left">
                                                        <p className='tal--pro-card-desc'><Skeleton height={10} width={150} /></p>
                                                    </div>
                                                </div>
                                                <div className="row tal--pro-card-desc-row">
                                                    <div className="col-12 col-lg-3 col-md-3 custom-padd-right">
                                                        <h6 className='tal--pro-card-desc-title'><Skeleton height={10} width={100} /></h6>
                                                    </div>
                                                    <div className="col-12 col-lg-9 col-md-9 custom-padd-left">
                                                        <p className='tal--pro-card-desc'>
                                                            <Skeleton height={10} />
                                                            <Skeleton height={10} />
                                                            <Skeleton height={10} />
                                                            <Skeleton height={10} width={200} />
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="row tal--pro-card-desc-row">
                                                    <div className="col-12 col-lg-3 col-md-3 custom-padd-right">
                                                        <h6 className='tal--pro-card-desc-title font-weight-700'><Skeleton height={10} width={100} /></h6>
                                                    </div>
                                                    <div className="col-12 col-lg-9 col-md-9 custom-padd-left">
                                                        <p className='tal--pro-card-desc font-weight-700'><Skeleton height={10} width={100} /></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="tal--pro-card-right-area applied">
                                            <div className="tal--pro-card-right-cover-area applied">
                                                <div className='tal--pro-card-profile-img-role-area'>
                                                    <Skeleton circle={true} height={90} width={90} />
                                                    <p className='tal--pro-card-role-name mb-0'><Skeleton height={10} width={100} /></p>
                                                </div>
                                                <div className="tal--pro-card-contact-btn-area">
                                                    <Skeleton height={40} width={100} />
                                                </div>
                                                <div className="tal--pro-card-ability-number-area applied">
                                                    <div className="tal--pro-card-ability-number-left applied">
                                                        <h6 className='tal--pro-card-ability'><Skeleton height={10} width={50} /></h6>
                                                        <h2 className='tal--pro-card-percentage custom'><Skeleton height={15} width={20} /></h2>
                                                    </div>
                                                    <div className="tal--pro-card-ability-number-right applied">
                                                        <h6 className='tal--pro-card-ability'><Skeleton height={10} width={50} /></h6>
                                                        <h2 className='tal--pro-card-days custom'><span><Skeleton height={15} width={70} /></span></h2>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </article>
                                </div>
                            }

                            {reqCands.length > 0 &&
                                <div className="dash-talent--profile-card-section">
                                    <div className="card change-status-card">
                                        <div className="card-change-status-title">
                                            Change Application Status
                                        </div>
                                        <div className="card-change-status-input-area">
                                            <div className='select-option-area position-relative w-100'>
                                                <i class="bi bi-chevron-down toggle-icon"></i>
                                                <select className='change-setting-input select'
                                                    value={selectedStatus}
                                                    onChange={(e) => setSelectedStatus(e.target.value)}
                                                >
                                                    <option value="" disabled selected>-- Select application status --</option>
                                                    <option value="screened">Screened</option>
                                                    <option value="interviews">Interviews in Process</option>
                                                    <option value="offered">Offered</option>
                                                    <option value="rejected">Rejected</option>
                                                    <option value="joined">Joined</option>
                                                    <option value="absconded">Absconded</option>
                                                </select>
                                            </div>
                                            <button className="setting-update-btn more-det" disabled={selectedCandidates.length === 0}
                                                onClick={handleChangeStatus}>Change</button>
                                        </div>
                                    </div>

                                    {reqCands.map((candidate) => {
                                        const matchingImg = candidateImg ? candidateImg.find(img => img.id === candidate.id) : null;
                                        const imgSrc = matchingImg ? (matchingImg.image.startsWith('https') ? matchingImg.image : `data:image/jpeg;base64,${matchingImg.image}`) : "../assets/img/talents-images/avatar.jpg";

                                        const calculateMatchPercentage = (skills1, skills2) => {
                                            const matchingSkills = skills2.filter(skill => skills1.includes(skill));
                                            return (matchingSkills.length / skills1.length) * 100;
                                        }
                                        const percentage = Math.round(calculateMatchPercentage(job?.skills, candidate.skills));

                                        const status = applicationStatus.find(status => status.candidateId === candidate.id)?.status;

                                        return (
                                            <article className="talent--profile-card applied" key={candidate.id}>
                                                <div className="tal--pro-card-left-area applied">
                                                    <div className='card-split-line applied'></div>
                                                    <div className="tal--pro-card-name-area">
                                                        <label className="tal--pro-card-name-check-container no-absolute">
                                                            <input type="checkbox" class="tal--checkbox"
                                                                checked={selectedCandidates.includes(candidate.id)}
                                                                onChange={() => handleCheckboxChange(candidate.id)} />
                                                            <div className="tal--pro-card-name-checkmark"></div>
                                                        </label>
                                                        <h6 className='tal--pro-card-name'>{candidate.firstName + ' ' + candidate.lastName}</h6>
                                                    </div>
                                                    <div className="tal--pro-card-tags applied">
                                                        <h6 className='tal--pro-card-exp'>
                                                            Experience : {candidate.year > 0 ? candidate.year + 'years' : "" + candidate.month > 0 ? candidate.month + 'months' : ""}
                                                        </h6>
                                                        {/* <h6 className='tal--pro-card-exp'>
                                                        9.5 LPA
                                                    </h6> */}
                                                        <h6 className='tal--pro-card-location'>
                                                            <i class="bi bi-geo-alt-fill"></i>
                                                            <span>{candidate.location}</span>
                                                        </h6>
                                                        {/* <h6 className='tal--pro-card-role'>
                                                        {candidate.designation[0]}
                                                    </h6> */}
                                                    </div>
                                                    <div className="tal--pro-card-desc-area applied">
                                                        <div className="row tal--pro-card-desc-row">
                                                            <div className="col-12 col-lg-3 col-md-3 custom-padd-right">
                                                                <h6 className='tal--pro-card-desc-title'>Previous&nbsp;:</h6>
                                                            </div>
                                                            <div className="col-12 col-lg-9 col-md-9 custom-padd-left">
                                                                <p className='tal--pro-card-desc'>{candidate.designation[0] + " " + "at" + " " + candidate.companyName}</p>
                                                            </div>
                                                        </div>
                                                        <div className="row tal--pro-card-desc-row">
                                                            <div className="col-12 col-lg-3 col-md-3 custom-padd-right">
                                                                <h6 className='tal--pro-card-desc-title'>Education&nbsp;:</h6>
                                                            </div>
                                                            <div className="col-12 col-lg-9 col-md-9 custom-padd-left">
                                                                <p className='tal--pro-card-desc'>{candidate.education.join(", ")}</p>
                                                            </div>
                                                        </div>
                                                        <div className="row tal--pro-card-desc-row">
                                                            <div className="col-12 col-lg-3 col-md-3 custom-padd-right">
                                                                <h6 className='tal--pro-card-desc-title'>College&nbsp;:</h6>
                                                            </div>
                                                            <div className="col-12 col-lg-9 col-md-9 custom-padd-left">
                                                                <p className='tal--pro-card-desc'>{candidate.college}</p>
                                                            </div>
                                                        </div>
                                                        <div className="row tal--pro-card-desc-row">
                                                            <div className="col-12 col-lg-3 col-md-3 custom-padd-right">
                                                                <h6 className='tal--pro-card-desc-title'>KeySkill&nbsp;:</h6>
                                                            </div>
                                                            <div className="col-12 col-lg-9 col-md-9 custom-padd-left">
                                                                <p className='tal--pro-card-desc'>{candidate.skills.join(", ")}</p>
                                                            </div>
                                                        </div>
                                                        <div className="row tal--pro-card-desc-row">
                                                            <div className="col-12 col-lg-3 col-md-3 custom-padd-right">
                                                                <h6 className='tal--pro-card-desc-title'>Profile headline&nbsp;:</h6>
                                                            </div>
                                                            <div className="col-12 col-lg-9 col-md-9 custom-padd-left">
                                                                <p className='tal--pro-card-desc'>{candidate.profileHeadline}</p>
                                                            </div>
                                                        </div>
                                                        <div className="row tal--pro-card-desc-row">
                                                            <div className="col-12 col-lg-3 col-md-3 custom-padd-right">
                                                                <h6 className='tal--pro-card-desc-title font-weight-700'>Status&nbsp;:</h6>
                                                            </div>
                                                            <div className="col-12 col-lg-9 col-md-9 custom-padd-left">
                                                                <p className='tal--pro-card-desc font-weight-700'>{status ? status : "Screening"}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* <div className="tal--pro-card-bottom-btn-area">
                                                    <button className='tal--pro-card-bottom-btn'>
                                                        <span>897 </span>Similar Profile
                                                    </button>
                                                    <span className='horizon--ln'>|</span>
                                                    <button className='tal--pro-card-bottom-btn'>Comment</button>
                                                    <span className='horizon--ln'>|</span>
                                                    <button className='tal--pro-card-bottom-btn'>
                                                        <i class="bi bi-bookmark"></i>Save
                                                    </button>
                                                </div> */}
                                                </div>

                                                <div className="tal--pro-card-right-area applied">
                                                    <div className="tal--pro-card-right-cover-area applied">
                                                        <div className='tal--pro-card-profile-img-role-area'>
                                                            <img src={imgSrc} className='tal--pro-card-profile-img applied' alt="" />
                                                            <p className='tal--pro-card-role-name mb-0'>{candidate.designation[0]}</p>
                                                        </div>
                                                        <div className="tal--pro-card-contact-btn-area">
                                                            <button className='tal--pro-card-contact-btn' onClick={() => navigate(`/talents/${candidate.id}`, { state: { percentage, employeeId } })}>View Profile</button>
                                                            {/* <span className="profile-credits-title">&#129031; 01 Credit</span> */}

                                                            {/* <div className="profile-credits-area">
                                                            <div className="profile-credits-title">Credits</div>
                                                            <div className="profile-credits">01</div>
                                                        </div> */}
                                                            {/* <button className='tal--pro-card-contact-btn'>
                                                            <img src="../assets/img/talent-profile/call.png" alt="" />
                                                            Call Candidate
                                                        </button> */}
                                                        </div>
                                                        <div className="tal--pro-card-ability-number-area applied">
                                                            <div className="tal--pro-card-ability-number-left applied">
                                                                <h6 className='tal--pro-card-ability'>Skill matched</h6>
                                                                <h2 className='tal--pro-card-percentage custom'>{percentage}%</h2>
                                                            </div>
                                                            <div className="tal--pro-card-ability-number-right applied">
                                                                <h6 className='tal--pro-card-ability'>Can join in</h6>
                                                                <h2 className='tal--pro-card-days custom'><span>{candidate.days}</span></h2>
                                                            </div>
                                                        </div>

                                                    </div>
                                                    {/* <div className="tal--pro-card-right-btn-area">
                                                    <button className='tal--pro-card-right-btn'>
                                                        <img src="../assets/img/talent-profile/document.png" alt="" />
                                                    </button>
                                                    <button className='tal--pro-card-right-btn'>
                                                        <img src="../assets/img/talent-profile/arrow.png" alt="" />
                                                    </button>
                                                    <button className='tal--pro-card-right-btn'>
                                                        <img src="../assets/img/talent-profile/email.png" alt="" />
                                                    </button>
                                                </div> */}
                                                </div>
                                            </article>
                                        )
                                    })}

                                    <div className="tal--pro-paginate-btn-area" >
                                        <h6 className='tal--pro-total-result-text'>Total Items : <span>{reqCands.length}</span></h6>
                                        <div className='tal--pro-slider-btn-sub'>
                                            {x[0] > 0 && <button className="tal--pro-slider-btn" onClick={() => setX([x[0] - 4, x[1] - 4])}>
                                                <svg className='arrow-left' xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 27 27" fill="none">
                                                    <path d="M2.56641 3.44987C6.17752 6.50543 15.5664 10.4499 24.2331 1.7832" stroke="#5C3B2E" stroke-width="2" />
                                                    <path d="M24.5618 1.45996C21.07 4.6512 15.9586 13.4593 23.4473 23.162" stroke="#5C3B2E" stroke-width="2" />
                                                    <path d="M1 26L25.1667 1" stroke="#5C3B2E" stroke-width="2" />
                                                </svg>
                                            </button>}
                                            {((reqCands.slice(x[0], x[1]).length === 4 && reqCands.length > x[1])) && < button className="tal--pro-slider-btn" onClick={() => setX([x[0] + 4, x[1] + 4])}>
                                                <svg className='arrow-right' xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 27 27" fill="none">
                                                    <path d="M2.56641 3.44987C6.17752 6.50543 15.5664 10.4499 24.2331 1.7832" stroke="#5C3B2E" stroke-width="2" />
                                                    <path d="M24.5618 1.45996C21.07 4.6512 15.9586 13.4593 23.4473 23.162" stroke="#5C3B2E" stroke-width="2" />
                                                    <path d="M1 26L25.1667 1" stroke="#5C3B2E" stroke-width="2" />
                                                </svg>
                                            </button>}
                                        </div>
                                    </div>

                                </div>
                            }

                        </div>
                    </section>
                </div>
                <Footer />
            </div>

            {pageNotFound && <ErrorPage />}
        </div>
    )
}
export default AppliedCandidate;
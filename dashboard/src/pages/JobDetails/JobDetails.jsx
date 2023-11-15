import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import $ from 'jquery';
import './JobDetails.css';
import './JobDetails-responsive.css';
import Layout from '../../components/Layout';
import Footer from '../../components/Footer';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

const JobDetails = () => {
    const {id} = useParams();
    console.log(id)
    const [job, setJob] = useState();
    const [clientCompanyName, setClientCompanyName] = useState("");
    const [applicants, setApplicants] = useState("");
    const [candidateToken, setCandidateToken] = useState("");
    const { getProtectedData, getClientImg, clientImg, } = useContext(AuthContext);
    const [candidateId, setCandidateId] = useState("");
    const [companyImg, setCompanyImg] = useState();
    const [alreadyApplied, setAlreadyApplied] = useState();

    const [loading, setLoading] = useState(true);
    const [pageNotFound, setPageNotFound] = useState(false);

    useEffect(() => {
        $(document).ready(function () {
        });
    }, []);

    useEffect(() => {
        const preloader = $('#preloader');
    if (preloader.length) {
      setTimeout(function () {
        preloader.fadeOut('slow', function () {
          preloader.remove();
        });
      }, 500);
    }
    }, []);

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

    useEffect(() => {
        setCandidateToken(JSON.parse(localStorage.getItem('candidateToken')))
    }, [candidateToken])

    useEffect(() => {
        if (candidateToken) {
            const fetchData = async () => {
                try {
                    const user = await getProtectedData(candidateToken);
                    console.log(user);
                    setCandidateId(user.id);
                    getClientImg();
                } catch (error) {
                    console.log(error);
                }
            };

            fetchData();
        }
    }, [candidateToken]);

    //get candidate applied jobs
    const getAppliedjobs = async() => {
        try{
            const res = await axios.get(`http://localhost:5002/my-applied-jobs/${candidateId}`, {
              headers: {
                  Authorization: `Bearer ${candidateToken}`,
                  Accept: 'application/json'
              }
            });
            const result = res.data;
            if (!result.error) {
              console.log(result);
              setAlreadyApplied(result.find(appJob=>appJob.jobId === id));
              
            } else {
              console.log(result);
            }
        }catch(err){
          console.log(err);
        }
      }

      //candidate apply for job
    const applyingjob = async(job) => {
        try{
            const res = await axios.post('http://localhost:5002/job-applying', job, {
              headers: {
                  Authorization: `Bearer ${candidateToken}`,
                  Accept: 'application/json'
              }
            });
            const result = res.data;
            if(!result.error){
                console.log(result);
                showSuccessMessage("job applied successfully!")
                getAppliedjobs()
            }else {
                console.log(result);
            }
        }catch(err){
            console.log(err);
            showErrorMessage()
        }
      }

      //candidate delete the job
    const deletingjob = async() => {
        try {
          const response = await axios.delete(`http://localhost:5002/delete-job/${candidateId}/${id}`, {
            headers: {
                Authorization: `Bearer ${candidateToken}`,
                Accept: 'application/json'
            }
          });
          console.log(response);
          showSuccessMessage("Job successfully deleted!")
          getAppliedjobs();
        } catch (error) {
          console.error(error);
          showErrorMessage()
        }
      }

    useEffect(()=>{
        if(candidateId){
            getAppliedjobs()

            axios.get(`http://localhost:5002/skill-match-job-Detail/${candidateId}`)
            .then(res=>{
                console.log(res.data)
                const reqJob = res.data.find(job=>job.jobId === id)
                if(reqJob){
                    setLoading(false);
                    setJob(reqJob)
                }else{
                    setLoading(false);
                    setPageNotFound(true);
                }
            })
            .catch(err=>console.log(err))

            axios.get(`http://localhost:5002/applied-job/${id}`)
            .then(res=>{
                console.log(res.data)
                setApplicants(res.data?.length)
            })
            .catch(err=>console.log(err))   
        }
        
    },[candidateId])

    

    useEffect(()=>{
        if(job){
            axios.get("http://localhost:5002/clients")
            .then(res=>{
            console.log(res.data)
            setClientCompanyName((res.data.find(cli=>cli.companyId === job.companyId)).companyName)
            setCompanyImg(clientImg.find(img=>img.id === job.companyId))
            })
            .catch(err=>console.log(err))
        }
        
      },[job])

      const handleApply = () => {
        if (!alreadyApplied) {
          applyingjob({...job, candidateId:candidateId});
        }
      }

      const handleDiscard = () => {
        if(alreadyApplied){
          deletingjob();
        }
      }

    return (
        <div>
            {loading && <div id="preloader candidate"></div>}
            {job && <div>
                <div class="main-wrapper main-wrapper-1">
                    <div class="navbar-bg"></div>

                    <Layout />

                    <div class="main-content">
                        <section class="section">
                            <div className="my-app-section">
                                <div className="admin-component-name">
                                    Job Details
                                </div>
                                <div className="dash-job-det-section">
                                    <div className='dash-job-det-head'>Opening for {job?.jobRole[0]} in {clientCompanyName}</div>
                                    <div className="dash-job-det-card-area">
                                        <article className='dash-job-det-card'>
                                            <div className="dash-job-det-card-header">
                                                <div className="dash-job-det-card-header-lft">
                                                    <div className="dash-job-det-card-role">{job?.jobRole[0]}</div>
                                                    <div className="dash-job-det-card-com-area">
                                                        <div className="dash-job-det-card-com">{clientCompanyName}</div>
                                                        <div className="dash-job-det-card-det-area">
                                                            <div className="dash-job-det-card-det">
                                                                <i class="bi bi-briefcase-fill"></i>
                                                                <span>{job?.jobExperience}</span>
                                                            </div>
                                                            {/* <div className="dash-job-det-card-det">
                                                                <span>Not disclosed</span>
                                                            </div> */}
                                                            <div className="dash-job-det-card-det">
                                                                <i class="bi bi-geo-alt-fill"></i>
                                                                <span>{job?.jobLocation.join(", ")}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="dash-job-det-card-header-rgt">
                                                    <div className="dash-job-det-card-img-area">
                                                        <img src={companyImg ? `http://localhost:5002/client_profile/${companyImg.image}` : "../assets/img/talents-images/avatar.jpg"} className='dash-job-det-card-img' alt="" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="dash-job-det-card-body">
                                                <div className="dash-job-det-card-tags-area">
                                                    {job?.jobMandatorySkills.map(skill=>{
                                                        return(
                                                            <div className="dash-job-det-card-tag">{skill}</div>
                                                        )
                                                    })}
                                                </div>
                                                {/* <div className="dash-job-det-card-more-job-btn-area">
                                                    <a href="#" className='dash-job-det-card-more-job-btn'>Search more job like this</a>
                                                </div> */}
                                            </div>
                                            <div className="dash-job-det-card-footer">
                                                <div className="dash-job-det-card-status-area">
                                                    {/* <div className="dash-job-det-card-status with-border-padding">
                                                        Posted :&nbsp;<span>{`${new Date(job?.createdAt).getDate().toString().padStart(2, '0')}/${(new Date(job?.createdAt).getMonth() + 1).toString().padStart(2, '0')}/${new Date(job?.createdAt).getFullYear() % 100}`}</span>
                                                    </div> */}
                                                    {/* <div className="dash-job-det-card-status with-border-padding">
                                                        Opening :&nbsp;<span>02</span>
                                                    </div> */}
                                                    <div className="dash-job-det-card-status">
                                                        Applicants :&nbsp;<span>{applicants}</span>
                                                    </div>
                                                </div>
                                                <div className="dash-job-det-card-btn-area">
                                                    <label className="dash-job-det-favourite">
                                                        <input type="checkbox" />
                                                        <svg id="Layer_1" version="1.0" viewBox="0 0 24 24" space="preserve" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink">
                                                            <path d="M16.4,4C14.6,4,13,4.9,12,6.3C11,4.9,9.4,4,7.6,4C4.5,4,2,6.5,2,9.6C2,14,12,22,12,22s10-8,10-12.4C22,6.5,19.5,4,16.4,4z">
                                                            </path>
                                                        </svg>
                                                    </label>
                                                    {alreadyApplied ? <button type='button' className="dash-job-det-card-apply-btn"
                                                    onClick={handleDiscard}>Discard</button> : <button type='button' className="dash-job-det-card-apply-btn"
                                                    onClick={handleApply}>Apply</button>}
                                                </div>
                                            </div>
                                        </article>
                                    </div>

                                    <div className="dash-job-det-content-area">
                                        <div className="job-match-score-area">
                                            <div className="job-match-score-head">Job match percentage with your skill</div>
                                            <div className="job-match-score-selection-area">
                                                <div className="job-match-score-radio-select-area">
                                                    <label className="job-match-score-radio-button">
                                                        {/* <input type="radio" name="job-match-score-radio-option" value="Early_Applicant" /> */}
                                                        <span className="job-match-score-radio"></span>
                                                        {job?.percentage} %
                                                    </label>

                                                    {/* <label className="job-match-score-radio-button">
                                                        <input type="radio" name="job-match-score-radio-option" value="Keyskills" />
                                                        <span className="job-match-score-radio"></span>
                                                        Keyskills
                                                    </label>

                                                    <label className="job-match-score-radio-button">
                                                        <input type="radio" name="job-match-score-radio-option" value="Location" />
                                                        <span className="job-match-score-radio"></span>
                                                        Location
                                                    </label>

                                                    <label className="job-match-score-radio-button">
                                                        <input type="radio" name="job-match-score-radio-option" value="Work_Experience" />
                                                        <span className="job-match-score-radio"></span>
                                                        Work Experience
                                                    </label> */}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="dash-job-desc-section">
                                            <div className="dash-job-desc-area">
                                                <div className="dash-job-desc-head">Job Description</div>
                                                <p className='dash-job-desc'>
                                                    {job?.jobDescription}
                                                </p>
                                            </div>

                                            <div className="dash-job-desc-area">
                                                <div className="dash-job-desc-head">QUALIFICATION</div>
                                            </div>

                                            <div className="dash-job-desc-area">
                                                <div className="dash-job-desc-head">Education</div>
                                                <p className='dash-job-desc'>
                                                    {job?.education}
                                                </p>
                                            </div>

                                            <div className="dash-job-desc-area">
                                                <div className="dash-job-desc-head">Prior Experience</div>
                                                <p className='dash-job-desc'>
                                                    {job?.jobExperience}
                                                </p>
                                            </div>

                                            {/* <div className="dash-job-desc-area">
                                                <div className="dash-job-desc-head">Prior Experience</div>
                                                <ul className='mt-2'>
                                                    <li className='dash-job-desc-list-item'>
                                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                                                    </li>
                                                    <li className='dash-job-desc-list-item'>
                                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                                                    </li>
                                                    <li className='dash-job-desc-list-item'>
                                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                                                    </li>
                                                    <li className='dash-job-desc-list-item'>
                                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                                                    </li>
                                                    <li className='dash-job-desc-list-item'>
                                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                                                    </li>
                                                    <li className='dash-job-desc-list-item'>
                                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                                                    </li>
                                                    <li className='dash-job-desc-list-item'>
                                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                                                    </li>
                                                    <li className='dash-job-desc-list-item'>
                                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                                                    </li>
                                                </ul>
                                            </div> */}

                                            {/* <div className="dash-job-desc-area">
                                                <div className="dash-job-desc-head">Work you’ll do</div>
                                                <ul className='mt-2'>
                                                    <li className='dash-job-desc-list-item'>
                                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                                                    </li>
                                                    <li className='dash-job-desc-list-item'>
                                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                                                    </li>
                                                    <li className='dash-job-desc-list-item'>
                                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                                                    </li>
                                                    <li className='dash-job-desc-list-item'>
                                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                                                    </li>
                                                </ul>
                                            </div> */}
                                        </div>
                                        <div className="dash-job-det-info-section">
                                            <div className="dash-job-det-info-area">
                                                <div className="dash-job-det-info">
                                                    Location :&nbsp;
                                                    <span>{job?.jobLocation.join(", ")}</span>
                                                </div>
                                            </div>
                                            <div className="dash-job-det-info-area">
                                                <div className="dash-job-det-info">
                                                    Role :&nbsp;
                                                    <span>{job?.jobRole[0]}</span>
                                                </div>
                                            </div>
                                            <div className="dash-job-det-info-area">
                                                <div className="dash-job-det-info">
                                                    Industry Type :&nbsp;
                                                    <span>{job?.industry}</span>
                                                </div>
                                            </div>
                                            <div className="dash-job-det-info-area">
                                                <div className="dash-job-det-info">
                                                    Department :&nbsp;
                                                    <span>{job?.jobDepartment}</span>
                                                </div>
                                            </div>
                                            <div className="dash-job-det-info-area">
                                                <div className="dash-job-det-info">
                                                    Employment Type :&nbsp;
                                                    <span>{job?.jobCategory}</span>
                                                </div>
                                            </div>
                                            <div className="dash-job-det-info-area">
                                                <div className="dash-job-det-info">
                                                    Role Category :&nbsp;
                                                    <span>{job?.role}</span>
                                                </div>
                                            </div>
                                            <div className="dash-job-det-info-area">
                                                <div className="dash-job-det-info">
                                                    Working Mode :&nbsp;
                                                    <span className='mt-3'>
                                                        {job?.workMode}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <Footer />
                </div >
            </div >}
            {pageNotFound && <div>
                    <h1>404</h1>
                    <p>Not Found</p>
                    <small>The resource requested could not be found on this server!</small>
                </div>}
        </div>
    )
}

export default JobDetails
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import $ from "jquery";
import "./JobDetails.css";
import "./JobDetails-responsive.css";
import { CandidateFooter } from "../../components/CandidateFooter";
import LayoutNew from "../../components/LayoutNew";
import { useParams } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

const JobDetails = () => {
  const { id } = useParams();
  console.log(id);
  const [job, setJob] = useState();
  const [clientCompanyName, setClientCompanyName] = useState("");
  const [applicants, setApplicants] = useState("");
  const [candidateToken, setCandidateToken] = useState("");
  const { getProtectedData, getClientImg, clientImg } = useContext(AuthContext);
  const [candidateId, setCandidateId] = useState("");
  const [companyImg, setCompanyImg] = useState();
  const [alreadyApplied, setAlreadyApplied] = useState();

  const [loading, setLoading] = useState(true);
  const [pageNotFound, setPageNotFound] = useState(false);

  useEffect(() => {
    $(document).ready(function () { });
  }, []);

  useEffect(() => {
    const preloader = $("#preloader");
    if (preloader.length) {
      setTimeout(function () {
        preloader.fadeOut("slow", function () {
          preloader.remove();
        });
      }, 500);
    }
  }, []);

  //for show success message for payment
  function showSuccessMessage(message) {
    Swal.fire({
      title: "Congratulations!",
      text: message,
      icon: "success",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "OK",
    });
  }

  //for show error message for payment
  function showErrorMessage() {
    Swal.fire({
      title: "Error!",
      text: "An error occured!",
      icon: "error",
      confirmButtonColor: "#d33",
      confirmButtonText: "OK",
    });
  }

  useEffect(() => {
    setCandidateToken(JSON.parse(localStorage.getItem("candidateToken")));
  }, [candidateToken]);

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
  const getAppliedjobs = async () => {
    try {
      const res = await axios.get(
        `https://skillety.onrender.com/my-applied-jobs/${candidateId}`,
        {
          headers: {
            Authorization: `Bearer ${candidateToken}`,
            Accept: "application/json",
          },
        }
      );
      const result = res.data;
      if (!result.error) {
        console.log(result);
        setAlreadyApplied(result.find((appJob) => appJob.jobId === id));
      } else {
        console.log(result);
      }
    } catch (err) {
      console.log(err);
    }
  };

  //candidate apply for job
  const applyingjob = async (job) => {
    try {
      const res = await axios.post("https://skillety.onrender.com/job-applying", job, {
        headers: {
          Authorization: `Bearer ${candidateToken}`,
          Accept: "application/json",
        },
      });
      const result = res.data;
      if (!result.error) {
        console.log(result);
        showSuccessMessage("Job applied successfully..!");
        getAppliedjobs();

        axios.get(`https://skillety.onrender.com/applied-job/${id}`)
                .then(res => {
                    console.log(res.data)
                    setApplicants(res.data?.length)
                })
                .catch(err => console.log(err))

      } else {
        console.log(result);
      }
    } catch (err) {
      console.log(err);
      showErrorMessage();
    }
  };

  //candidate delete the job
  const deletingjob = async () => {
    try {
      const response = await axios.delete(
        `https://skillety.onrender.com/delete-job/${candidateId}/${id}`,
        {
          headers: {
            Authorization: `Bearer ${candidateToken}`,
            Accept: "application/json",
          },
        }
      );
      console.log(response);
      showSuccessMessage("Job successfully deleted..!");
      getAppliedjobs();

      axios.get(`https://skillety.onrender.com/applied-job/${id}`)
                .then(res => {
                    console.log(res.data)
                    setApplicants(res.data?.length)
                })
                .catch(err => console.log(err))
                
    } catch (error) {
      console.error(error);
      showErrorMessage();
    }
  };

  useEffect(() => {
    if (candidateId) {
      getAppliedjobs();

      axios
        .get(`https://skillety.onrender.com/skill-match-job-Detail/${candidateId}`)
        .then((res) => {
          console.log(res.data);
          const reqJob = res.data.find((job) => job.jobId === id);
          if (reqJob) {
            setLoading(false);
            setJob(reqJob);
          } else {
            setLoading(false);
            setPageNotFound(true);
          }
        })
        .catch((err) => console.log(err));

      axios
        .get(`https://skillety.onrender.com/applied-job/${id}`)
        .then((res) => {
          console.log(res.data);
          setApplicants(res.data?.length);
        })
        .catch((err) => console.log(err));
    }
  }, [candidateId]);

  useEffect(() => {
    if (job) {
      axios
        .get("https://skillety.onrender.com/clients")
        .then((res) => {
          console.log(res.data);
          setClientCompanyName(
            res.data.find((cli) => cli.companyId === job.companyId).companyName
          );
          setCompanyImg(clientImg.find((img) => img.id === job.companyId));
        })
        .catch((err) => console.log(err));
    }
  }, [job]);

  const handleApply = () => {
    if (!alreadyApplied) {
        Swal.fire({
            title: 'Are you sure?',
            text: '',
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, apply it!'
        }).then((result) => {
            if (result.isConfirmed) {
                applyingjob({ ...job, candidateId: candidateId });
                
            }

        });
        
    }
}

const handleDiscard = () => {
  if (alreadyApplied) {
      Swal.fire({
          title: 'Are you sure?',
          text: '',
          icon: 'info',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, apply it!'
      }).then((result) => {
          if (result.isConfirmed) {
              deletingjob();
              
          }

      });
      
  }
}

  return (
    <div>
      {loading && <div id="preloader candidate"></div>}
      {job && (
        <div>
          <LayoutNew />
          <div className="talents--section">
            <div className="container-fluid">
              <div className="container-fluid container-section">
                <div className="custom--container">

                  <div className="breadcrumb--area-dark" data-aos="fade-down">
                    <div className="breadcrumb--item-dark">
                      <a href="/candidate-home">Home</a>
                    </div>
                    <div className="breadcrumb--item-dark">
                      <a className="sub--bredcrumb-link" href="/job-detail">
                        Jobs
                      </a>
                    </div>
                    <div className="breadcrumb--item-dark">
                      <p>Job Details</p>
                    </div>
                  </div>

                  <div className="job--detail-head-area">
                    <h3 className="job--detail-head" data-aos="fade-left">
                      JOB DETAILs
                    </h3>
                  </div>

                  <div className="job--detail-content-section">
                    <div className="dash-job-det-section">
                      <div className="dash-job-det-head">
                        Opening for {job?.jobRole[0]} in {clientCompanyName}
                      </div>
                      <div className="dash-job-det-card-area">
                        <article className="dash-job-det-card">
                          <div className="dash-job-det-card-header">
                            <div className="dash-job-det-card-header-lft">
                              <div className="dash-job-det-card-role">
                                {job?.jobRole[0]}
                              </div>
                              <div className="dash-job-det-card-com-area">
                                <div className="dash-job-det-card-com">
                                  {clientCompanyName}
                                </div>
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
                                <img
                                  src={
                                    companyImg
                                      ? `https://skillety.onrender.com/client_profile/${companyImg.image}`
                                      : "../assets/img/talents-images/avatar.jpg"
                                  }
                                  className="dash-job-det-card-img"
                                  alt=""
                                />
                              </div>
                            </div>
                          </div>
                          <div className="dash-job-det-card-body">
                            <div className="dash-job-det-card-tags-area">
                              {job?.jobMandatorySkills.map((skill) => {
                                return (
                                  <div className="dash-job-det-card-tag">
                                    {skill}
                                  </div>
                                );
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
                              <div className="dash-job-det-card-status with-border-padding">
                                Applicants :&nbsp;<span>{applicants}</span>
                              </div>
                              <div className="dash-job-det-card-status">
                                Skill Matched :&nbsp;<span>{job?.percentage} %</span>
                              </div>
                            </div>
                            <div className="dash-job-det-card-btn-area">
                              {/* <label className="dash-job-det-favourite">
                              <input type="checkbox" />
                              <svg
                                id="Layer_1"
                                version="1.0"
                                viewBox="0 0 24 24"
                                space="preserve"
                                xmlns="http://www.w3.org/2000/svg"
                                xlink="http://www.w3.org/1999/xlink"
                              >
                                <path d="M16.4,4C14.6,4,13,4.9,12,6.3C11,4.9,9.4,4,7.6,4C4.5,4,2,6.5,2,9.6C2,14,12,22,12,22s10-8,10-12.4C22,6.5,19.5,4,16.4,4z"></path>
                              </svg>
                            </label> */}
                              <a
                                href={`/company-info/${job?.companyId}`}
                                className="dash-job-det-card-apply-btn"
                              // data-bs-toggle="modal"
                              // data-bs-target="#company_detail_modal"
                              >
                                View Company Detail
                              </a>
                            </div>
                          </div>
                        </article>
                      </div>

                      <div className="dash-job-det-content-area">
                        {/* <div className="job-match-score-area">
                          <div className="job-match-score-head">
                            Job match percentage with your skill
                          </div>
                          <div className="job-match-score-selection-area">
                            <div className="job-match-score-radio-select-area">
                              <label className="job-match-score-radio-button">
                                <input type="radio" name="job-match-score-radio-option" value="Early_Applicant" />
                                <span className="job-match-score-radio"></span>
                                {job?.percentage} %
                              </label>

                              <label className="job-match-score-radio-button">
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
                              </label>
                            </div>
                          </div>
                        </div> */}
                        <div className="dash-job-desc-section">
                          <div className="row qulification-area">
                            <div className="col-12 ps-1 pe-1">
                              <div className="dash-job-desc-area">
                                <div className="dash-job-desc-head qualification">
                                  QUALIFICATION
                                </div>
                              </div>
                            </div>
                            <div className="col-12 col-md-12 col-lg-6 mt-4 ps-1 pe-1">
                              <div className="dash-job-desc-area flex">
                                <div className="dash-job-desc-head">Education</div>&nbsp;&nbsp;<span>:</span>&nbsp;&nbsp;
                                <div className="dash-job-desc2">{job?.education}</div>
                              </div>
                            </div>
                            <div className="col-12 col-md-12 col-lg-6 mt-4 ps-1 pe-1">
                              <div className="dash-job-desc-area flex">
                                <div className="dash-job-desc-head">Prior Experience</div>&nbsp;&nbsp;<span>:</span>&nbsp;&nbsp;
                                <div className="dash-job-desc2">{job?.jobExperience}</div>
                              </div>
                            </div>
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

                        <div className="hr-line mb-2 mt-4"></div>

                        <div className="dash-job-det-info-section">
                          <div className="row">
                            <div className="col-12 col-md-6">
                              <div className="dash-job-det-info-area">
                                <div className="dash-job-det-info">
                                  Location&nbsp;&nbsp;:&nbsp;&nbsp;
                                  <span>{job?.jobLocation.join(", ")}</span>
                                </div>
                                <div className="dash-job-det-info-area">
                                  <div className="dash-job-det-info">
                                    Role&nbsp;&nbsp;:&nbsp;&nbsp;
                                    <span>{job?.jobRole[0]}</span>
                                  </div>
                                </div>
                                <div className="dash-job-det-info-area">
                                  <div className="dash-job-det-info">
                                    Industry Type&nbsp;&nbsp;:&nbsp;&nbsp;
                                    <span>{job?.industry}</span>
                                  </div>
                                </div>
                                <div className="dash-job-det-info-area">
                                  <div className="dash-job-det-info">
                                    Department&nbsp;&nbsp;:&nbsp;&nbsp;
                                    <span>{job?.jobDepartment}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-12 col-md-6">
                              <div className="dash-job-det-info-area">
                                <div className="dash-job-det-info">
                                  Employment Type&nbsp;&nbsp;:&nbsp;&nbsp;
                                  <span>{job?.jobCategory}</span>
                                </div>
                              </div>
                              <div className="dash-job-det-info-area">
                                <div className="dash-job-det-info">
                                  Role Category&nbsp;&nbsp;:&nbsp;&nbsp;
                                  <span>{job?.role}</span>
                                </div>
                              </div>
                              <div className="dash-job-det-info-area">
                                <div className="dash-job-det-info">
                                  Working Mode&nbsp;&nbsp;:&nbsp;&nbsp;
                                  <span>{job?.workMode}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="dash-job-desc-container">
                            <div className="dash-job-desc-area">
                              <div>
                                <div className="dash-job-desc-head">
                                  Job Description
                                </div>
                                <p className="dash-job-desc mt-2">{job?.jobDescription}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="job--apply-area">
                        {alreadyApplied ? (
                          <button className='company--detail-card-apply-btn button m-t-40' onClick={handleDiscard}>
                            <div className='company--detail-card-apply-btn-sub apply'>
                              Discard
                            </div>
                          </button>
                        ) : (
                          <button className='company--detail-card-apply-btn button m-t-40' onClick={handleApply}>
                            <div className='company--detail-card-apply-btn-sub apply'>
                              Apply Now
                            </div>
                            <div className='company--detail-card-apply-btn-arrow'>
                              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 27 27" fill="none">
                                <path d="M2.56641 3.44987C6.17752 6.50543 15.5664 10.4499 24.2331 1.7832" stroke="#714F36" stroke-width="2" />
                                <path d="M24.5618 1.45996C21.07 4.6512 15.9586 13.4593 23.4473 23.162" stroke="#714F36" stroke-width="2" />
                                <path d="M1 26L25.1667 1" stroke="#714F36" stroke-width="2" />
                              </svg>
                            </div>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* company detail modal here */}
                {/* <div className="modal fade" id="company_detail_modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content comp-det-modal">
                      <div className="modal-header comp-det-modal-header">
                        <h5 className="modal-title comp-det-modal-head" id="exampleModalLabel">
                          Company Detail_
                        </h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-body comp-det-modal-body">
                        <div className="row p-3">
                          <div className="col-12 col-lg-4">
                            <div className="card comp-det-card profile">
                              <div className="com-det-logo-area">
                                <img src="../assets/img/companies/company-1.png" className="com-det-logo" alt="" />
                              </div>
                              <div className="com-det-name">Company Name</div>
                            </div>
                          </div>
                          <div className="col-12 col-lg-8">
                            <div className="card comp-det-card">
                              <div className="row">
                                <div className="col-12 col-lg-4 col-xl-4 col-md-5 col-sm-5">
                                  <div className="com-det-title">Email</div>
                                </div>
                                <div className="col-12 col-lg-8 col-xl-8 col-md-7 col-sm-7">
                                  <div className="com-det-content">email@gmail.com</div>
                                </div>
                              </div>
                              <hr />
                              <div className="row">
                                <div className="col-12 col-lg-4 col-xl-4 col-md-5 col-sm-5">
                                  <div className="com-det-title">Mobile Number</div>
                                </div>
                                <div className="col-12 col-lg-8 col-xl-8 col-md-7 col-sm-7">
                                  <div className="com-det-content">0770770770</div>
                                </div>
                              </div>
                              <hr />
                              <div className="row">
                                <div className="col-12 col-lg-4 col-xl-4 col-md-5 col-sm-5">
                                  <div className="com-det-title">Headcount</div>
                                </div>
                                <div className="col-12 col-lg-8 col-xl-8 col-md-7 col-sm-7">
                                  <div className="com-det-content">05</div>
                                </div>
                              </div>
                              <hr />
                              <div className="row">
                                <div className="col-12 col-lg-4 col-xl-4 col-md-5 col-sm-5">
                                  <div className="com-det-title">Description</div>
                                </div>
                                <div className="col-12 col-lg-8 col-xl-8 col-md-7 col-sm-7">
                                  <div className="com-det-content">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea nemo in dolorem maiores pariatur, veritatis accusantium rerum optio distinctio quae quidem omnis quibusdam facilis obcaecati harum sequi fugit necessitatibus praesentium.
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="modal-footer comp-det-modal-footer">
                        <button type="button" className="btn btn-close-btn" data-bs-dismiss="modal">Close</button>
                      </div>
                    </div>
                  </div>
                </div> */}
                {/*  */}

              </div>
            </div>
          </div>
          <CandidateFooter />
        </div>
      )}
      {pageNotFound && (
        <div>
          <h1>404</h1>
          <p>Not Found</p>
          <small>
            The resource requested could not be found on this server!
          </small>
        </div>
      )}
    </div>
  );
};

export default JobDetails;

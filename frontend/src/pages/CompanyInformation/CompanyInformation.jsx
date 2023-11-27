import React, { useContext, useState } from "react";
import { useEffect } from "react";
import $ from "jquery";
import "./CompanyInformation.css";
import "./CompanyInformation-responsive.css";
import { CandidateFooter } from "../../components/CandidateFooter";
import LayoutNew from "../../components/LayoutNew";
import { useParams } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../context/AuthContext";


const CompanyInformation = () => {
    const { id } = useParams();
    const [companyDetail, setCompanyDetail] = useState();
    const [clientImg, setClientImg] = useState();
    const [clientImgUrl, setClientImgUrl] = useState("");
    const [selectedBenefits, setSelectedBenefits] = useState([]);

    useEffect(() => {
        $(document).ready(function () { });
    }, []);

    useEffect(()=>{
        if(id){
            axios.get(`http://localhost:5002/company-detail/${id}`, {
                headers: {
                    Accept: 'application/json'
                }
            })
            .then(res=>{
                console.log(res.data)
                setCompanyDetail(res.data)
                setSelectedBenefits(res.data.benefits)
            })
            .catch(err=>console.log(err))

            axios.get(`http://localhost:5002/client-image/${id}`)
                .then(res => setClientImg(res.data))
                .catch(err => console.log(err))
        }
    },[id])

    useEffect(() => {
        if (clientImg) {
            setClientImgUrl(`http://localhost:5002/client_profile/${clientImg.image}`)
        }

    }, [clientImg]);

    return (
        <div>
            <div>
                <LayoutNew />

                {companyDetail && <div className="talents--section">
                    <div className="container-fluid">
                        <div className="container-fluid container-section">
                            <div className="custom--container">

                                <div className="breadcrumb--area-dark" data-aos="fade-down">
                                    <div className="breadcrumb--item-dark">
                                        <a href="/candidate-home">Home</a>
                                    </div>
                                    <div className="breadcrumb--item-dark">
                                        <p>Company Information</p>
                                    </div>
                                </div>

                                <div className="job--detail-head-area">
                                    <h3 className="job--detail-head" data-aos="fade-left">
                                        Company Information
                                    </h3>
                                </div>
                                <div className="job--detail-content-section">
                                    <div className="company-info-container">
                                        <div className="row">
                                            <div className="col-12 col-lg-4">
                                                <div className="company-main-info-container">
                                                    <div className="card comp-det-card profile">
                                                        <div className="com-det-logo-area">
                                                            <img src={clientImgUrl ? clientImgUrl : "../assets/img/talents-images/avatar.jpg"} className="com-det-logo" alt="" />
                                                        </div>
                                                        <div className="com-det-name">{companyDetail?.companyName}</div>
                                                        <div className="com-type">
                                                        {companyDetail?.industry}
                                                        </div>
                                                    </div>

                                                    <div className="card comp-det-card prof-det">
                                                        <div className="row">
                                                        <div className="col-12">
                                                    <div className="com-main-detail-area mb-3" onClick={()=> window.location.href = `mailto:${companyDetail?.email}`}>
                                                        <i class="bi bi-envelope-fill"></i>
                                                        <a className='com-det-main-content' href={`mailto:${companyDetail?.email}`}>{companyDetail?.email}</a>
                                                    </div>
                                                    {/* <hr /> */}
                                                    <div className="com-main-detail-area mb-3" onClick={()=>window.location.href = `tel:${companyDetail?.phone}`}>
                                                        <i class="bi bi-telephone-fill"></i>
                                                        <a className='com-det-main-content' href={`tel:${companyDetail?.phone}`}>{companyDetail?.phone}</a>
                                                    </div>
                                                    {/* <hr /> */}
                                                    <div className="com-main-detail-area">
                                                        <i class="bi bi-geo-alt-fill"></i>
                                                        <a className='com-det-main-content' href="#" target='_blank'>{companyDetail?.location}</a>
                                                    </div>
                                                        </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12 col-lg-8">
                                                <div className="card comp-det-card p-4">
                                                    <div className="row">
                                                        <div className="col-12 col-lg-4 col-xl-4 col-md-4 col-sm-5">
                                                            <div className="com-det-title">Headcount</div>
                                                        </div>
                                                        <div className="col-12 col-lg-8 col-xl-8 col-md-8 col-sm-7">
                                                            <div className="com-det-content">{companyDetail?.count}</div>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div className="row">
                                                        <div className="col-12 col-lg-4 col-xl-4 col-md-4 col-sm-5">
                                                            <div className="com-det-title">Vision</div>
                                                        </div>
                                                        <div className="col-12 col-lg-8 col-xl-8 col-md-8 col-sm-7">
                                                            <div className="com-det-content">
                                                                {companyDetail?.vision}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div className="row">
                                                        <div className="col-12 col-lg-4 col-xl-4 col-md-4 col-sm-5">
                                                            <div className="com-det-title">Mission</div>
                                                        </div>
                                                        <div className="col-12 col-lg-8 col-xl-8 col-md-8 col-sm-7">
                                                            <div className="com-det-content">
                                                                {companyDetail?.mission}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div className="row">
                                                        <div className="col-12 col-lg-4 col-xl-4 col-md-4 col-sm-5">
                                                            <div className="com-det-title">Description</div>
                                                        </div>
                                                        <div className="col-12 col-lg-8 col-xl-8 col-md-8 col-sm-7">
                                                            <div className="com-det-content">
                                                                {companyDetail?.shortDescription}
                                                            </div>
                                                            <div className="com-det-content mt-3">
                                                                {companyDetail?.longDescription}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div className="row">
                                                        <div className="col-12 col-lg-4 col-xl-4 col-md-4 col-sm-5">
                                                            <div className="com-det-title">Benefits</div>
                                                        </div>
                                                        <div className="col-12 col-lg-8 col-xl-8 col-md-8 col-sm-7">
                                                            <div className="com-det-content">
                                                                <ul>
                                                                    {selectedBenefits.map(benefit=>{
                                                                        return(
                                                                            <li>{benefit}</li>
                                                                        )
                                                                    })}
                                                                    
                                                                    {/* <li>Sick Leave</li>
                                                                    <li>Job Training</li>
                                                                    <li>Work From Home</li>
                                                                    <li>Maternity/Parental Leave</li> */}
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}
                <CandidateFooter />
            </div>
        </div>

    );
};

export default CompanyInformation;
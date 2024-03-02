import React, { useState, useEffect, useRef } from 'react';
import ATSLayout from '../../../components/ATSLayout';
import Footer from '../../../components/Footer';
import '../CustomizeWebsite.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

const EditTalentAbout = () => {
    const staffToken = JSON.parse(localStorage.getItem('staffToken'));

    const initialAboutUsBanner = {
        title:"",
    }
    const [aboutUsBanner, setAboutUsBanner] = useState(initialAboutUsBanner);

    const initialAboutUsContent = {
        para1:"",
        para2:"",
        subTitle:"",
    }
    const [aboutUsContent, setAboutUsContent] = useState(initialAboutUsContent);

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
    function showErrorMessage(message) {
        Swal.fire({
            title: 'Error!',
            text: message,
            icon: 'error',
            confirmButtonColor: '#d33',
            confirmButtonText: 'OK',
        });
    }


    useEffect(() => {
        axios.get("https://skillety-n6r1.onrender.com/web-content?ids=content_13")
        .then(res => {
            const data = res.data;
            const updatedAboutUsBanner = { ...initialAboutUsBanner };
    
            data.forEach(item => {
                if (item.id === 'content_13') {
                    updatedAboutUsBanner.title = item.content;
                } 
            });
    
            setAboutUsBanner(updatedAboutUsBanner);
        }).catch(err => console.log(err));

        axios.get("https://skillety-n6r1.onrender.com/web-content?ids=content_14,content_15,content_16")
        .then(res => {
            const data = res.data;
            const updatedAboutUsContent = { ...initialAboutUsContent };
    
            data.forEach(item => {
                if (item.id === 'content_14') {
                    updatedAboutUsContent.para1 = item.content;
                } else if (item.id === 'content_15') {
                    updatedAboutUsContent.para2 = item.content;
                } else if (item.id === 'content_16') {
                    updatedAboutUsContent.subTitle = item.content;
                } 
            });
    
            setAboutUsContent(updatedAboutUsContent);
        }).catch(err => console.log(err));


    }, []);

    const handleAboutUsBannerSave = () => {
        const updateArray = [
            {id:"content_13", content:aboutUsBanner.title}
        ]
        axios.patch("https://skillety-n6r1.onrender.com/web-content", updateArray, {
            headers: {
                Authorization: `Bearer ${staffToken}`,
                Accept: 'application/json'
            }
        }).then(res=>{
            console.log(res.data);
            showSuccessMessage(res.data.message)
        }).catch(err=>{
            console.log(err);
            showErrorMessage(err.response.data.error)
        })

    }

    const handleAboutUsContentSave = () => {
        const updateArray = [
            {id:"content_14", content:aboutUsContent.para1},
            {id:"content_15", content:aboutUsContent.para2},
            {id:"content_16", content:aboutUsContent.subTitle}
        ]
        axios.patch("https://skillety-n6r1.onrender.com/web-content", updateArray, {
            headers: {
                Authorization: `Bearer ${staffToken}`,
                Accept: 'application/json'
            }
        }).then(res=>{
            console.log(res.data);
            showSuccessMessage(res.data.message)
        }).catch(err=>{
            console.log(err);
            showErrorMessage(err.response.data.error)
        })

    }

    return (
        <div>
            <div class="main-wrapper main-wrapper-1">
                <div class="navbar-bg"></div>

                <ATSLayout />

                <div class="main-content">
                    <section class="section">
                        <div className="my-app-section">
                            <div className='customize-website-nav'>
                                <h6 className='customize-website-nav-title'>Talent</h6>
                                <div className='customize-website-nav-links'>
                                    <a href="/edit-talent-home" className='btn cus-web-nav-link'><i class="bi bi-house-fill"></i>Home</a>
                                    <a href="/edit-talent-home" className='btn cus-web-nav-link active'><i class="bi bi-person-vcard-fill"></i>About Us</a>
                                    <a href="/edit-talent-contact" className='btn cus-web-nav-link'><i class="bi bi-telephone-fill"></i>Contact Us</a>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12">
                                <div className="admin-lg-table-section pt-3">
                                    <div className='admin-lg-table-area man-app p-4'>

                                        <div className='man-app-title-area candidate pb-2'>
                                            <div className="man-app-title">
                                                Banner
                                            </div>
                                        </div>
                                        <hr />
                                        <div className='cus-web-input-container'>
                                            <div class="form-group row">
                                                <label for="inputTitle" class="col-sm-3 col-form-label cus-web-form-lable">Title</label>
                                                <div class="col-sm-9">
                                                    <input type="text" class="form-control dash-form-input" id="inputTitle" placeholder="Enter title here..." 
                                                    value={aboutUsBanner.title}
                                                    onChange={(e)=>setAboutUsBanner({...aboutUsBanner, title:e.target.value})}/>
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="cus-web-save-btn-area">
                                            <button className='btn cus-web-save-btn'
                                            onClick={handleAboutUsBannerSave}>Save Changes</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12">
                                <div className="admin-lg-table-section pt-5">
                                    <div className='admin-lg-table-area man-app p-4'>

                                        <div className='man-app-title-area candidate pb-2'>
                                            <div className="man-app-title">
                                                About Us
                                            </div>
                                        </div>
                                        <hr />
                                        <div className='cus-web-input-container'>
                                            <div class="form-group row">
                                                <label for="inputParagraph1" class="col-sm-3 col-form-label cus-web-form-lable">Paragraph 1</label>
                                                <div class="col-sm-9">
                                                    <textarea class="form-control dash-form-input" id="inputParagraph1" placeholder="Enter paragraph here..."
                                                    value={aboutUsContent.para1}
                                                    onChange={(e)=>setAboutUsContent({...aboutUsContent, para1:e.target.value})}></textarea>
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label for="inputParagraph2" class="col-sm-3 col-form-label cus-web-form-lable">Paragraph 2</label>
                                                <div class="col-sm-9">
                                                    <textarea class="form-control dash-form-input" id="inputParagraph2" placeholder="Enter paragraph here..."
                                                    value={aboutUsContent.para2}
                                                    onChange={(e)=>setAboutUsContent({...aboutUsContent, para2:e.target.value})}></textarea>
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label for="inputSubTitle" class="col-sm-3 col-form-label cus-web-form-lable">Sub Title</label>
                                                <div class="col-sm-9">
                                                    <input type="text" class="form-control dash-form-input" id="inputSubTitle" placeholder="Enter sub title here..." 
                                                    value={aboutUsContent.subTitle}
                                                    onChange={(e)=>setAboutUsContent({...aboutUsContent, subTitle:e.target.value})}/>
                                                </div>
                                            </div>
                                            {/* <div class="form-group row">
                                                <label for="inputVision" class="col-sm-3 col-form-label cus-web-form-lable">Vision</label>
                                                <div class="col-sm-9">
                                                    <input type="text" class="form-control dash-form-input" id="inputVision" placeholder="Enter vision here..." />
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label for="inputMission" class="col-sm-3 col-form-label cus-web-form-lable">Mission</label>
                                                <div class="col-sm-9">
                                                    <input type="text" class="form-control dash-form-input" id="inputMission" placeholder="Enter mission here..." />
                                                </div>
                                            </div> */}
                                        </div>
                                        <hr />
                                        <div className="cus-web-save-btn-area">
                                            <button className='btn cus-web-save-btn'
                                            onClick={handleAboutUsContentSave}>Save Changes</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <Footer />
            </div >
        </div >
    )
}

export default EditTalentAbout

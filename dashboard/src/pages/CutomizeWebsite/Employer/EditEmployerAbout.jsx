import React, { useState, useEffect, useRef } from 'react';
import ATSLayout from '../../../components/ATSLayout';
import Footer from '../../../components/Footer';
import '../CustomizeWebsite.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

const EditEmployerAbout = () => {
    const staffToken = JSON.parse(localStorage.getItem('staffToken'));

    const initialWelcomeBanner = {
        title:""
    }
    const [welcomeBanner, setWelcomeBanner] = useState(initialWelcomeBanner);

    const initialAboutUsPara = {
        para:""
    }
    const [aboutUsPara, setAboutUsPara] = useState(initialAboutUsPara);

    const initialAboutUsAdvantage = {
        title:"",
        advan1:"",
        advan2:"",
        advan3:"",
        advan4:"",
    }
    const [aboutUsAdvantage, setAboutUsAdvantage] = useState(initialAboutUsAdvantage);

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
        axios.get("https://skillety-n6r1.onrender.com/web-content?ids=content_53")
        .then(res => {
            const data = res.data;
            const updatedWelcomeBanner = { ...initialWelcomeBanner };
    
            data.forEach(item => {
                if (item.id === 'content_53') {
                    updatedWelcomeBanner.title = item.content;
                }
            });
    
            setWelcomeBanner(updatedWelcomeBanner);
        }).catch(err => console.log(err));

        axios.get("https://skillety-n6r1.onrender.com/web-content?ids=content_54")
        .then(res => {
            const data = res.data;
            const updatedAboutUsPara = { ...initialAboutUsPara };
    
            data.forEach(item => {
                if (item.id === 'content_54') {
                    updatedAboutUsPara.para = item.content;
                }
            });
    
            setAboutUsPara(updatedAboutUsPara);
        }).catch(err => console.log(err));

        axios.get("https://skillety-n6r1.onrender.com/web-content?ids=content_55,content_56,content_57,content_58,content_59")
        .then(res => {
            const data = res.data;
            const updatedAboutUsAdvantage = { ...initialAboutUsAdvantage };
    
            data.forEach(item => {
                if (item.id === 'content_55') {
                    updatedAboutUsAdvantage.title = item.content;
                } else if (item.id === 'content_56') {
                    updatedAboutUsAdvantage.advan1 = item.content;
                } else if (item.id === 'content_57') {
                    updatedAboutUsAdvantage.advan2 = item.content;
                } else if (item.id === 'content_58') {
                    updatedAboutUsAdvantage.advan3 = item.content;
                } else if (item.id === 'content_59') {
                    updatedAboutUsAdvantage.advan4 = item.content;
                } 
            });
    
            setAboutUsAdvantage(updatedAboutUsAdvantage);
        }).catch(err => console.log(err));

    },[])

    const handleSaveWelcomeBanner = () => {
        const updateArray = [
            {id:"content_53", content:welcomeBanner.title}
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

    const  handleSaveAboutUsPara = () => {
        const updateArray = [
            {id:"content_54", content:aboutUsPara.para}
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

    const  handleSaveAboutUsAdvantage = () => {
        const updateArray = [
            {id:"content_55", content:aboutUsAdvantage.title},
            {id:"content_56", content:aboutUsAdvantage.advan1},
            {id:"content_57", content:aboutUsAdvantage.advan2},
            {id:"content_58", content:aboutUsAdvantage.advan3},
            {id:"content_59", content:aboutUsAdvantage.advan4},
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
                                <h6 className='customize-website-nav-title'>Employer</h6>
                                <div className='customize-website-nav-links'>
                                    <a href="/edit-employer-home" className='btn cus-web-nav-link'><i class="bi bi-house-fill"></i>Home</a>
                                    <a href="/edit-employer-about" className='btn cus-web-nav-link active'><i class="bi bi-person-vcard-fill"></i>About Us</a>
                                    <a href="/edit-employer-service" className='btn cus-web-nav-link'><i class="bi bi-gear-wide-connected"></i>Services</a>
                                    <a href="/edit-employer-contact" className='btn cus-web-nav-link'><i class="bi bi-telephone-fill"></i>Contact Us</a>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12">
                                <div className="admin-lg-table-section pt-3">
                                    <div className='admin-lg-table-area man-app p-3 p-sm-4'>

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
                                                    value={welcomeBanner.title}
                                                    onChange={(e)=>setWelcomeBanner({...welcomeBanner, title:e.target.value})}/>
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="cus-web-save-btn-area">
                                            <button className='btn cus-web-save-btn'
                                            onClick={handleSaveWelcomeBanner}>Save Changes</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12">
                                <div className="admin-lg-table-section pt-5">
                                    <div className='admin-lg-table-area man-app p-3 p-sm-4'>

                                        <div className='man-app-title-area candidate pb-2'>
                                            <div className="man-app-title">
                                                About Us
                                            </div>
                                        </div>
                                        <hr />
                                        <div className='cus-web-input-container'>
                                            <div class="form-group row">
                                                <label for="inputParagraph" class="col-sm-3 col-form-label cus-web-form-lable">Paragraph</label>
                                                <div class="col-sm-9">
                                                    <textarea class="form-control dash-form-input" id="inputParagraph" placeholder="Enter paragraph here..."
                                                    value={aboutUsPara.para}
                                                    onChange={(e)=>setAboutUsPara({...aboutUsPara, para:e.target.value})}></textarea>
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="cus-web-save-btn-area">
                                            <button className='btn cus-web-save-btn'
                                            onClick={handleSaveAboutUsPara}>Save Changes</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12">
                                <div className="admin-lg-table-section pt-5">
                                    <div className='admin-lg-table-area man-app p-3 p-sm-4'>

                                        <div className='man-app-title-area candidate pb-2'>
                                            <div className="man-app-title">
                                                Advantages
                                            </div>
                                        </div>
                                        <hr />
                                        <div className='cus-web-input-container'>
                                            <div class="form-group row">
                                                <label for="advantageTitle" class="col-sm-3 col-form-label cus-web-form-lable">Title</label>
                                                <div class="col-sm-9">
                                                    <input type="text" class="form-control dash-form-input" id="advantageTitle" placeholder="Enter title here..." 
                                                    value={aboutUsAdvantage.title}
                                                    onChange={(e)=>setAboutUsAdvantage({...aboutUsAdvantage, title:e.target.value})}/>
                                                </div>
                                            </div>

                                            <div class="form-group row">
                                                <label for="advantage1" class="col-sm-3 col-form-label cus-web-form-lable">Advantage 1</label>
                                                <div class="col-sm-9">
                                                    <textarea class="form-control dash-form-input" id="advantage1" placeholder="Enter content here..."
                                                    value={aboutUsAdvantage.advan1}
                                                    onChange={(e)=>setAboutUsAdvantage({...aboutUsAdvantage, advan1:e.target.value})}></textarea>
                                                </div>
                                            </div>

                                            <div class="form-group row">
                                                <label for="advantage2" class="col-sm-3 col-form-label cus-web-form-lable">Advantage 2</label>
                                                <div class="col-sm-9">
                                                    <textarea class="form-control dash-form-input" id="advantage2" placeholder="Enter content here..."
                                                    value={aboutUsAdvantage.advan2}
                                                    onChange={(e)=>setAboutUsAdvantage({...aboutUsAdvantage, advan2:e.target.value})}></textarea>
                                                </div>
                                            </div>

                                            <div class="form-group row">
                                                <label for="advantage3" class="col-sm-3 col-form-label cus-web-form-lable">Advantage 3</label>
                                                <div class="col-sm-9">
                                                    <textarea class="form-control dash-form-input" id="advantage3" placeholder="Enter content here..."
                                                    value={aboutUsAdvantage.advan3}
                                                    onChange={(e)=>setAboutUsAdvantage({...aboutUsAdvantage, advan3:e.target.value})}></textarea>
                                                </div>
                                            </div>

                                            <div class="form-group row">
                                                <label for="advantage4" class="col-sm-3 col-form-label cus-web-form-lable">Advantage 4</label>
                                                <div class="col-sm-9">
                                                    <textarea class="form-control dash-form-input" id="advantage4" placeholder="Enter content here..."
                                                    value={aboutUsAdvantage.advan4}
                                                    onChange={(e)=>setAboutUsAdvantage({...aboutUsAdvantage, advan4:e.target.value})}></textarea>
                                                </div>
                                            </div>

                                        </div>
                                        <hr />
                                        <div className="cus-web-save-btn-area">
                                            <button className='btn cus-web-save-btn'
                                            onClick={handleSaveAboutUsAdvantage}>Save Changes</button>
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

export default EditEmployerAbout

import React, { useState, useEffect, useRef } from 'react';
import ATSLayout from '../../../components/ATSLayout';
import Footer from '../../../components/Footer';
import '../CustomizeWebsite.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

const EditTalentContact = () => {
    const staffToken = JSON.parse(localStorage.getItem('staffToken'));

    const initialContactUsContent = {
        para1:"",
        para2:"",
        para3:"",
        content:"",
        subTitle:"",
        address:"",
        contactNum:"",
        email:""
    }
    const [contactUsContent, setContactUsContent] = useState(initialContactUsContent);

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
        axios.get("https://skillety-n6r1.onrender.com/web-content?ids=content_18,content_19,content_20,content_21,content_22,content_23,content_24,content_25")
        .then(res => {
            const data = res.data;
            const updatedContactUsBanner = { ...initialContactUsContent };
    
            data.forEach(item => {
                if (item.id === 'content_18') {
                    updatedContactUsBanner.subTitle = item.content;
                } else if (item.id === 'content_19') {
                    updatedContactUsBanner.para1 = item.content;
                } else if (item.id === 'content_20') {
                    updatedContactUsBanner.para2 = item.content;
                } else if (item.id === 'content_21') {
                    updatedContactUsBanner.para3 = item.content;
                } else if (item.id === 'content_22') {
                    updatedContactUsBanner.content = item.content;
                } else if (item.id === 'content_23') {
                    updatedContactUsBanner.address = item.content;
                } else if (item.id === 'content_24') {
                    updatedContactUsBanner.contactNum = item.content;
                } else if (item.id === 'content_25') {
                    updatedContactUsBanner.email = item.content;
                } 
            });
    
            setContactUsContent(updatedContactUsBanner);
        }).catch(err => console.log(err));

    }, []);

    const handleContactUsContentSave = () => {
        const updateArray = [
            {id:"content_18", content:contactUsContent.subTitle},
            {id:"content_19", content:contactUsContent.para1},
            {id:"content_20", content:contactUsContent.para2},
            {id:"content_21", content:contactUsContent.para3},
            {id:"content_22", content:contactUsContent.content},
            {id:"content_23", content:contactUsContent.address},
            {id:"content_24", content:contactUsContent.contactNum},
            {id:"content_25", content:contactUsContent.email},
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
                                    <a href="/edit-talent-home" className='btn cus-web-nav-link '><i class="bi bi-person-vcard-fill"></i>About Us</a>
                                    <a href="/edit-talent-contact" className='btn cus-web-nav-link active'><i class="bi bi-telephone-fill"></i>Contact Us</a>
                                </div>
                            </div>
                        </div>

                        {/* <div className="row">
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
                                                    <input type="text" class="form-control dash-form-input" id="inputTitle" placeholder="Enter title here..." />
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="cus-web-save-btn-area">
                                            <button className='btn cus-web-save-btn'>Save Changes</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}

                        <div className="row">
                            <div className="col-12">
                                <div className="admin-lg-table-section pt-5">
                                    <div className='admin-lg-table-area man-app p-4'>

                                        <div className='man-app-title-area candidate pb-2'>
                                            <div className="man-app-title">
                                                Contact Us
                                            </div>
                                        </div>
                                        <hr />
                                        <div className='cus-web-input-container'>
                                            <div class="form-group row">
                                                <label for="inputSubTitle" class="col-sm-3 col-form-label cus-web-form-lable">Sub Title</label>
                                                <div class="col-sm-9">
                                                    <input type="text" class="form-control dash-form-input" id="inputSubTitle" placeholder="Enter sub title here..." 
                                                    value={contactUsContent.subTitle}
                                                    onChange={(e)=>setContactUsContent({...contactUsContent, subTitle:e.target.value})}/>
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label for="inputParagraph1" class="col-sm-3 col-form-label cus-web-form-lable">Paragraph 1</label>
                                                <div class="col-sm-9">
                                                    <textarea class="form-control dash-form-input" id="inputParagraph1" placeholder="Enter paragraph here..."
                                                    value={contactUsContent.para1}
                                                    onChange={(e)=>setContactUsContent({...contactUsContent, para1:e.target.value})}></textarea>
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label for="inputParagraph2" class="col-sm-3 col-form-label cus-web-form-lable">Paragraph 2</label>
                                                <div class="col-sm-9">
                                                    <textarea class="form-control dash-form-input" id="inputParagraph2" placeholder="Enter paragraph here..."
                                                    value={contactUsContent.para2}
                                                    onChange={(e)=>setContactUsContent({...contactUsContent, para2:e.target.value})}></textarea>
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label for="inputParagraph3" class="col-sm-3 col-form-label cus-web-form-lable">Paragraph 3</label>
                                                <div class="col-sm-9">
                                                    <textarea class="form-control dash-form-input" id="inputParagraph3" placeholder="Enter paragraph here..."
                                                    value={contactUsContent.para3}
                                                    onChange={(e)=>setContactUsContent({...contactUsContent, para3:e.target.value})}></textarea>
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label for="inputContent" class="col-sm-3 col-form-label cus-web-form-lable">Content</label>
                                                <div class="col-sm-9">
                                                    <input type="text" class="form-control dash-form-input" id="inputContent" placeholder="Enter content here..." 
                                                    value={contactUsContent.content}
                                                    onChange={(e)=>setContactUsContent({...contactUsContent, content:e.target.value})}/>
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label for="inputAddress" class="col-sm-3 col-form-label cus-web-form-lable">Address</label>
                                                <div class="col-sm-9">
                                                    <textarea class="form-control dash-form-input" id="inputAddress" placeholder="Enter address here..."
                                                    value={contactUsContent.address}
                                                    onChange={(e)=>setContactUsContent({...contactUsContent, address:e.target.value})}></textarea>
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label for="inputContact" class="col-sm-3 col-form-label cus-web-form-lable">Contact Number & Email</label>
                                                <div class="col-sm-9 cus-web-input-area">
                                                    <input type="text" class="form-control dash-form-input" id="inputContact" placeholder="Enter contact number here..." 
                                                    value={contactUsContent.contactNum}
                                                    onChange={(e)=>setContactUsContent({...contactUsContent, contactNum:e.target.value})}/>
                                                    <input type="email" class="form-control dash-form-input" id="inputContact" placeholder="Enter email here..." 
                                                    value={contactUsContent.email}
                                                    onChange={(e)=>setContactUsContent({...contactUsContent, email:e.target.value})}/>
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="cus-web-save-btn-area">
                                            <button className='btn cus-web-save-btn'
                                            onClick={handleContactUsContentSave}>Save Changes</button>
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

export default EditTalentContact

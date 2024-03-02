import React, { useState, useEffect, useRef } from 'react';
import ATSLayout from '../../../components/ATSLayout';
import Footer from '../../../components/Footer';
import '../CustomizeWebsite.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

const EditEmployerHome = () => {
    const staffToken = JSON.parse(localStorage.getItem('staffToken'));

    const initialWelcomeBanner = {
        title:"",
        subTitle:""
    }
    const [welcomeBanner, setWelcomeBanner] = useState(initialWelcomeBanner);

    const initialHomeAboutUs = {
        para:""
    }
    const [homeAboutUs, setHomeAboutUs] = useState(initialHomeAboutUs);

    const initialHomeServiceContent = {
        para:"",
        service1Title:"",
        service1Content:"",
        service2Title:"",
        service2Content:"",
        service3Title:"",
        service3Content:"",
        service4Title:"",
        service4Content:"",
        service5Title:"",
        service5Content:"",
    }
    const [homeServicesContent, setHomeServicesContent] = useState(initialHomeServiceContent);

    const intialMilestone = {
        mile1:"",
        mile2:"",
        mile3:"",
        mile4:"",
        mile5:"",
        mile6:"",
        mile1Title:"",
        mile2Title:"",
        mile3Title:"",
        mile4Title:"",
        mile5Title:"",
        mile6Title:"",
    }
    const [milestone, setMileston] = useState(intialMilestone);

    const [clientLogos, setClientLogos] = useState([]);
    const [selectedClientLogos, setSelectedClientLogos] = useState([]);
    

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
        axios.get("https://skillety-n6r1.onrender.com/web-content?ids=content_26,content_28")
        .then(res => {
            const data = res.data;
            const updatedWelcomeBanner = { ...initialWelcomeBanner };
    
            data.forEach(item => {
                if (item.id === 'content_26') {
                    updatedWelcomeBanner.title = item.content;
                } else if (item.id === 'content_28') {
                    updatedWelcomeBanner.subTitle = item.content;
                }
            });
    
            setWelcomeBanner(updatedWelcomeBanner);
        }).catch(err => console.log(err));

        axios.get("https://skillety-n6r1.onrender.com/web-content?ids=content_29")
        .then(res => {
            const data = res.data;
            const updatedHomeAboutUs = { ...initialHomeAboutUs };
    
            data.forEach(item => {
                if (item.id === 'content_29') {
                    updatedHomeAboutUs.para = item.content;
                }
            });
    
            setHomeAboutUs(updatedHomeAboutUs);
        }).catch(err => console.log(err));

        axios.get("https://skillety-n6r1.onrender.com/web-content?ids=content_30,content_32,content_33,content_34,content_35,content_36,content_37,content_38,content_39,content_40,content_41")
        .then(res => {
            const data = res.data;
            const updatedHomeServiceContent = { ...initialHomeServiceContent };
    
            data.forEach(item => {
                if (item.id === 'content_30') {
                    updatedHomeServiceContent.para = item.content;
                } else if (item.id === 'content_32') {
                    updatedHomeServiceContent.service1Title = item.content;
                } else if (item.id === 'content_33') {
                    updatedHomeServiceContent.service1Content = item.content;
                } else if (item.id === 'content_34') {
                    updatedHomeServiceContent.service2Title = item.content;
                } else if (item.id === 'content_35') {
                    updatedHomeServiceContent.service2Content = item.content;
                } else if (item.id === 'content_36') {
                    updatedHomeServiceContent.service3Title = item.content;
                } else if (item.id === 'content_37') {
                    updatedHomeServiceContent.service3Content = item.content;
                } else if (item.id === 'content_38') {
                    updatedHomeServiceContent.service4Title = item.content;
                } else if (item.id === 'content_39') {
                    updatedHomeServiceContent.service4Content = item.content;
                } else if (item.id === 'content_40') {
                    updatedHomeServiceContent.service5Title = item.content;
                } else if (item.id === 'content_41') {
                    updatedHomeServiceContent.service5Content = item.content;
                } 
            });
    
            setHomeServicesContent(updatedHomeServiceContent);
        }).catch(err => console.log(err));

        axios.get("https://skillety-n6r1.onrender.com/web-content?ids=content_42,content_43,content_44,content_45,content_46,content_47,content_48,content_49,content_50,content_51,content_52,content_67")
        .then(res => {
            const data = res.data;
            console.log(data)
            const updatedMileStone = { ...intialMilestone };
    
            data.forEach(item => {
                if (item.id === 'content_42') {
                    updatedMileStone.mile1Title = item.content;
                } else if (item.id === 'content_43') {
                    updatedMileStone.mile1 = item.content;
                } else if (item.id === 'content_44') {
                    updatedMileStone.mile2Title = item.content;
                } else if (item.id === 'content_45') {
                    updatedMileStone.mile2 = item.content;
                } else if (item.id === 'content_46') {
                    updatedMileStone.mile3Title = item.content;
                } else if (item.id === 'content_47') {
                    updatedMileStone.mile3 = item.content;
                } else if (item.id === 'content_48') {
                    updatedMileStone.mile4Title = item.content;
                } else if (item.id === 'content_49') {
                    updatedMileStone.mile4 = item.content;
                } else if (item.id === 'content_50') {
                    updatedMileStone.mile5Title = item.content;
                } else if (item.id === 'content_51') {
                    updatedMileStone.mile5 = item.content;
                } else if (item.id === 'content_52') {
                    updatedMileStone.mile6Title = item.content;
                } else if (item.id === 'content_67') {
                    updatedMileStone.mile6 = item.content;
                }
            });
    
            setMileston(updatedMileStone);
        }).catch(err => console.log(err));

        axios.get("https://skillety-n6r1.onrender.com/client-logos").then(res=>{
            console.log(res.data);
            setClientLogos(res.data)
            }).catch(err=>{
            console.log(err);
            })

    }, []);

    const handleSaveWelcomeBanner = () => {
        const updateArray = [
            {id:"content_26", content:welcomeBanner.title},
            {id:"content_28", content:welcomeBanner.subTitle}
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

    const handleHomeAboutUsSave = () => {
        const updateArray = [
            {id:"content_29", content:homeAboutUs.para}
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

    const handleHomeServiceContentSave = () => {
        const updateArray = [
            {id:"content_30", content:homeServicesContent.para},
            {id:"content_32", content:homeServicesContent.service1Title},
            {id:"content_33", content:homeServicesContent.service1Content},
            {id:"content_34", content:homeServicesContent.service2Title},
            {id:"content_35", content:homeServicesContent.service2Content},
            {id:"content_36", content:homeServicesContent.service3Title},
            {id:"content_37", content:homeServicesContent.service3Content},
            {id:"content_38", content:homeServicesContent.service4Title},
            {id:"content_39", content:homeServicesContent.service4Content},
            {id:"content_40", content:homeServicesContent.service5Title},
            {id:"content_30", content:homeServicesContent.service5Content},
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

    const handleMilestoneSave = () => {
        const updateArray = [
            {id:"content_42", content:milestone.mile1Title},
            {id:"content_43", content:milestone.mile1},
            {id:"content_44", content:milestone.mile2Title},
            {id:"content_45", content:milestone.mile2},
            {id:"content_46", content:milestone.mile3Title},
            {id:"content_47", content:milestone.mile3},
            {id:"content_48", content:milestone.mile4Title},
            {id:"content_49", content:milestone.mile4},
            {id:"content_50", content:milestone.mile5Title},
            {id:"content_51", content:milestone.mile5},
            {id:"content_52", content:milestone.mile6Title},
            {id:"content_67", content:milestone.mile6}
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

    const handleDeleteClientLogo = (id) => {
        axios.delete(`https://skillety-n6r1.onrender.com/client-logo/${id}`, {
            headers: {
                Authorization: `Bearer ${staffToken}`,
                Accept: 'application/json'
            }
        }).then(res=>{
            console.log(res.data);
            showSuccessMessage(res.data.message);
            
            axios.get("https://skillety-n6r1.onrender.com/client-logos").then(res=>{
            console.log(res.data);
            setClientLogos(res.data)
            }).catch(err=>{
            console.log(err);
            })

        }).catch(err=>{
            console.log(err);
            showErrorMessage(err.response.data.error);
        })
    }

    const handleClientLogoUpload = async () => {
        try {
          const formData = new FormData();
          selectedClientLogos.forEach((clientLogo) => {
            formData.append('logo', clientLogo);
          });
      
          const response = await axios.post('https://skillety-n6r1.onrender.com/client-logos', formData, {
            headers: {
              Authorization: `Bearer ${staffToken}`,
            }
          });
      
          showSuccessMessage(response.data.message);
          setSelectedClientLogos([]);
          
          // Retrieve all logos after successful upload
          axios.get("https://skillety-n6r1.onrender.com/client-logos")
            .then(res => {
              console.log(res.data);
              setClientLogos(res.data);
            })
            .catch(err => {
              console.log(err);
            });
      
        } catch (error) {
          showErrorMessage(error.response.data.error);
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
                            <div className='customize-website-nav'>
                                <h6 className='customize-website-nav-title'>Employer</h6>
                                <div className='customize-website-nav-links'>
                                    <a href="/edit-employer-home" className='btn cus-web-nav-link active'><i class="bi bi-house-fill"></i>Home</a>
                                    <a href="/edit-employer-about" className='btn cus-web-nav-link'><i class="bi bi-person-vcard-fill"></i>About Us</a>
                                    <a href="/edit-employer-service" className='btn cus-web-nav-link'><i class="bi bi-gear-wide-connected"></i>Services</a>
                                    <a href="/edit-employer-contact" className='btn cus-web-nav-link'><i class="bi bi-telephone-fill"></i>Contact Us</a>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12">
                                <div className="admin-lg-table-section pt-3">
                                    <div className='admin-lg-table-area man-app p-4'>

                                        <div className='man-app-title-area candidate pb-2'>
                                            <div className="man-app-title">
                                                Welcome Banner
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
                                            <div class="form-group row">
                                                <label for="inputSubTitle" class="col-sm-3 col-form-label cus-web-form-lable">Sub Title</label>
                                                <div class="col-sm-9">
                                                    <input type="text" class="form-control dash-form-input" id="inputSubTitle" placeholder="Enter sub title here..." 
                                                    value={welcomeBanner.subTitle}
                                                    onChange={(e)=>setWelcomeBanner({...welcomeBanner, subTitle:e.target.value})}/>
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
                                    <div className='admin-lg-table-area man-app p-4'>

                                        <div className='man-app-title-area candidate pb-2'>
                                            <div className="man-app-title">
                                                About Us
                                            </div>
                                        </div>
                                        <hr />
                                        <div className='cus-web-input-container'>
                                            <div class="form-group row">
                                                <label for="inputAboutParagraph" class="col-sm-3 col-form-label cus-web-form-lable">Paragraph</label>
                                                <div class="col-sm-9">
                                                    <textarea class="form-control dash-form-input" id="inputAboutParagraph" placeholder="Enter paragraph here..."
                                                    value={homeAboutUs.para}
                                                    onChange={(e)=>setHomeAboutUs({...homeAboutUs, para:e.target.value})}></textarea>
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="cus-web-save-btn-area">
                                            <button className='btn cus-web-save-btn'
                                            onClick={handleHomeAboutUsSave}>Save Changes</button>
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
                                                Services
                                            </div>
                                        </div>
                                        <hr />
                                        <div className='cus-web-input-container'>
                                            <div class="form-group row">
                                                <label for="inputServicesParagraph" class="col-sm-3 col-form-label cus-web-form-lable">Paragraph</label>
                                                <div class="col-sm-9">
                                                    <textarea class="form-control dash-form-input" id="inputServicesParagraph" placeholder="Enter paragraph here..."
                                                    value={homeServicesContent.para}
                                                    onChange={(e)=>setHomeServicesContent({...homeServicesContent, para:e.target.value})}></textarea>
                                                </div>
                                            </div>
                                            <div className="cus-web-service-section">
                                                <h6>Service 1</h6>
                                                <hr />
                                                <div class="form-group row mt-4">
                                                    <label for="inputServices1Title" class="col-sm-3 col-form-label cus-web-form-lable">Title</label>
                                                    <div class="col-sm-9">
                                                        <input type="text" class="form-control dash-form-input" id="inputServices1Title" placeholder="Enter service title here..." 
                                                        value={homeServicesContent.service1Title}
                                                        onChange={(e)=>setHomeServicesContent({...homeServicesContent, service1Title:e.target.value})}/>
                                                    </div>
                                                </div>
                                                <div class="form-group row mb-0">
                                                    <label for="inputServices1Content" class="col-sm-3 col-form-label cus-web-form-lable">Content</label>
                                                    <div class="col-sm-9">
                                                        <textarea class="form-control dash-form-input" id="inputServices1Content" placeholder="Enter service content here..."
                                                        value={homeServicesContent.service1Content}
                                                        onChange={(e)=>setHomeServicesContent({...homeServicesContent, service1Content:e.target.value})}></textarea>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="cus-web-service-section">
                                                <h6>Service 2</h6>
                                                <hr />
                                                <div class="form-group row mt-4">
                                                    <label for="inputServices2Title" class="col-sm-3 col-form-label cus-web-form-lable">Title</label>
                                                    <div class="col-sm-9">
                                                        <input type="text" class="form-control dash-form-input" id="inputServices2Title" placeholder="Enter service title here..."
                                                        value={homeServicesContent.service2Title}
                                                        onChange={(e)=>setHomeServicesContent({...homeServicesContent, service2Title:e.target.value})} />
                                                    </div>
                                                </div>
                                                <div class="form-group row mb-0">
                                                    <label for="inputServices2Content" class="col-sm-3 col-form-label cus-web-form-lable">Content</label>
                                                    <div class="col-sm-9">
                                                        <textarea class="form-control dash-form-input" id="inputServices2Content" placeholder="Enter service content here..."
                                                        value={homeServicesContent.service2Content}
                                                        onChange={(e)=>setHomeServicesContent({...homeServicesContent, service2Content:e.target.value})}></textarea>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="cus-web-service-section">
                                                <h6>Service 3</h6>
                                                <hr />
                                                <div class="form-group row mt-4">
                                                    <label for="inputServices3Title" class="col-sm-3 col-form-label cus-web-form-lable">Title</label>
                                                    <div class="col-sm-9">
                                                        <input type="text" class="form-control dash-form-input" id="inputServices3Title" placeholder="Enter service title here..." 
                                                        value={homeServicesContent.service3Title}
                                                        onChange={(e)=>setHomeServicesContent({...homeServicesContent, service3Title:e.target.value})}/>
                                                    </div>
                                                </div>
                                                <div class="form-group row mb-0">
                                                    <label for="inputServices3Content" class="col-sm-3 col-form-label cus-web-form-lable">Content</label>
                                                    <div class="col-sm-9">
                                                        <textarea class="form-control dash-form-input" id="inputServices3Content" placeholder="Enter service content here..."
                                                        value={homeServicesContent.service3Content}
                                                        onChange={(e)=>setHomeServicesContent({...homeServicesContent, service3Content:e.target.value})}></textarea>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="cus-web-service-section">
                                                <h6>Service 4</h6>
                                                <hr />
                                                <div class="form-group row mt-4">
                                                    <label for="inputServices4Title" class="col-sm-3 col-form-label cus-web-form-lable">Title</label>
                                                    <div class="col-sm-9">
                                                        <input type="text" class="form-control dash-form-input" id="inputServices4Title" placeholder="Enter service title here..." 
                                                        value={homeServicesContent.service4Title}
                                                        onChange={(e)=>setHomeServicesContent({...homeServicesContent, service4Title:e.target.value})}/>
                                                    </div>
                                                </div>
                                                <div class="form-group row mb-0">
                                                    <label for="inputServices4Content" class="col-sm-3 col-form-label cus-web-form-lable">Content</label>
                                                    <div class="col-sm-9">
                                                        <textarea class="form-control dash-form-input" id="inputServices4Content" placeholder="Enter service content here..."
                                                        value={homeServicesContent.service4Content}
                                                        onChange={(e)=>setHomeServicesContent({...homeServicesContent, service4Content:e.target.value})}></textarea>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="cus-web-service-section">
                                                <h6>Service 5</h6>
                                                <hr />
                                                <div class="form-group row mt-4">
                                                    <label for="inputServices5Title" class="col-sm-3 col-form-label cus-web-form-lable">Title</label>
                                                    <div class="col-sm-9">
                                                        <input type="text" class="form-control dash-form-input" id="inputServices5Title" placeholder="Enter service title here..." 
                                                        value={homeServicesContent.service5Title}
                                                        onChange={(e)=>setHomeServicesContent({...homeServicesContent, service5Title:e.target.value})}/>
                                                    </div>
                                                </div>
                                                <div class="form-group row mb-0">
                                                    <label for="inputServices5Content" class="col-sm-3 col-form-label cus-web-form-lable">Content</label>
                                                    <div class="col-sm-9">
                                                        <textarea class="form-control dash-form-input" id="inputServices5Content" placeholder="Enter service content here..."
                                                        value={homeServicesContent.service5Content}
                                                        onChange={(e)=>setHomeServicesContent({...homeServicesContent, service5Content:e.target.value})}></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="cus-web-save-btn-area">
                                            <button className='btn cus-web-save-btn'
                                            onClick={handleHomeServiceContentSave}>Save Changes</button>
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
                                                Milestone Numbers
                                            </div>
                                        </div>
                                        <hr />
                                        <div className='cus-web-input-container'>
                                            <div class="form-group row">
                                                <label for="milestone1" class="col-sm-3 col-form-label cus-web-form-lable">Milestone 1</label>
                                                <div class="col-sm-9 cus-web-input-area">
                                                    <input type="text" class="form-control dash-form-input" id="milestone1" placeholder="Enter milestone title here..." 
                                                    value={milestone.mile1Title}
                                                    onChange={(e)=>setMileston({...milestone, mile1Title:e.target.value})}/>
                                                    <input type="text" class="form-control dash-form-input" id="milestone1" placeholder="Enter milestone count here..." 
                                                    value={milestone.mile1}
                                                    onChange={(e)=>setMileston({...milestone, mile1:e.target.value})}/>
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label for="milestone2" class="col-sm-3 col-form-label cus-web-form-lable">Milestone 2</label>
                                                <div class="col-sm-9 cus-web-input-area">
                                                    <input type="text" class="form-control dash-form-input" id="milestone2" placeholder="Enter milestone title here..." 
                                                    value={milestone.mile2Title}
                                                    onChange={(e)=>setMileston({...milestone, mile2Title:e.target.value})}/>
                                                    <input type="text" class="form-control dash-form-input" id="milestone2" placeholder="Enter milestone count here..." 
                                                    value={milestone.mile2}
                                                    onChange={(e)=>setMileston({...milestone, mile2:e.target.value})}/>
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label for="milestone3" class="col-sm-3 col-form-label cus-web-form-lable">Milestone 3</label>
                                                <div class="col-sm-9 cus-web-input-area">
                                                    <input type="text" class="form-control dash-form-input" id="milestone3" placeholder="Enter milestone title here..." 
                                                    value={milestone.mile3Title}
                                                    onChange={(e)=>setMileston({...milestone, mile3Title:e.target.value})}/>
                                                    <input type="text" class="form-control dash-form-input" id="milestone3" placeholder="Enter milestone count here..." 
                                                    value={milestone.mile3}
                                                    onChange={(e)=>setMileston({...milestone, mile3:e.target.value})}/>
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label for="milestone4" class="col-sm-3 col-form-label cus-web-form-lable">Milestone 4</label>
                                                <div class="col-sm-9 cus-web-input-area">
                                                    <input type="text" class="form-control dash-form-input" id="milestone4" placeholder="Enter milestone title here..." 
                                                    value={milestone.mile4Title}
                                                    onChange={(e)=>setMileston({...milestone, mile4Title:e.target.value})}/>
                                                    <input type="text" class="form-control dash-form-input" id="milestone4" placeholder="Enter milestone count here..." 
                                                    value={milestone.mile4}
                                                    onChange={(e)=>setMileston({...milestone, mile4:e.target.value})}/>
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label for="milestone5" class="col-sm-3 col-form-label cus-web-form-lable">Milestone 5</label>
                                                <div class="col-sm-9 cus-web-input-area">
                                                    <input type="text" class="form-control dash-form-input" id="milestone5" placeholder="Enter milestone title here..." 
                                                    value={milestone.mile5Title}
                                                    onChange={(e)=>setMileston({...milestone, mile5Title:e.target.value})}/>
                                                    <input type="text" class="form-control dash-form-input" id="milestone5" placeholder="Enter milestone count here..." 
                                                    value={milestone.mile5}
                                                    onChange={(e)=>setMileston({...milestone, mile5:e.target.value})}/>
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label for="milestone6" class="col-sm-3 col-form-label cus-web-form-lable">Milestone 6</label>
                                                <div class="col-sm-9 cus-web-input-area">
                                                    <input type="text" class="form-control dash-form-input" id="milestone6" placeholder="Enter milestone title here..." 
                                                    value={milestone.mile6Title}
                                                    onChange={(e)=>setMileston({...milestone, mile6Title:e.target.value})}/>
                                                    <input type="text" class="form-control dash-form-input" id="milestone6" placeholder="Enter milestone count here..." 
                                                    value={milestone.mile6}
                                                    onChange={(e)=>setMileston({...milestone, mile6:e.target.value})}/>
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="cus-web-save-btn-area">
                                            <button className='btn cus-web-save-btn'
                                            onClick={handleMilestoneSave}>Save Changes</button>
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
                                                Clients
                                            </div>
                                        </div>
                                        <hr />
                                        <div className='cus-web-input-container'>
                                            <div class="form-group row">
                                                <label for="inputLogo" class="col-sm-3 col-form-label cus-web-form-lable">Client's Logos</label>
                                                <div class="col-sm-9">
                                                    <input type="file" multiple class="form-control dash-form-input" id="inputLogo" 
                                                    onChange={(e)=>setSelectedClientLogos([...e.target.files])}/>
                                                    <div className='text-secondary mt-2'>Recommended Format - .png</div>
                                                    <div className='text-secondary mt-2'>Recommended Resolution - W x H : 300px x 180px</div>
                                                </div>
                                            </div>

                                            <div className="cus-web-clients-logo-section">
                                                <div className="row">
                                                    {clientLogos.map((logo, index)=>{
                                                        return (
                                                            <div className="col-6 col-lg-2 col-md-4"
                                                            key={index}>
                                                                <div className="cus-web-clients-logo-area">
                                                                    <div className="logo-area-cover">
                                                                        <img src=
                                                                            {`data:image/jpeg;base64,${logo.logoStringBase64}`} alt="" />
                                                                    </div>
                                                                    <button className='btn logo-dlt-btn'><i class="bi bi-trash"
                                                                    onClick={()=>handleDeleteClientLogo(logo._id)}></i></button>
                                                                </div>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="cus-web-save-btn-area">
                                            <button className='btn cus-web-save-btn'
                                            onClick={handleClientLogoUpload}>Save Changes</button>
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

export default EditEmployerHome

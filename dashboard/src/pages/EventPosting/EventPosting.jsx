import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import ATSLayout from '../../components/ATSLayout';
import Footer from '../../components/Footer';
import './EventPosting.css';
import $, { error } from 'jquery';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import AuthContext from '../../context/AuthContext';
import { v4 as uuidv4 } from "uuid";
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const EventPosting = () => {
    const { getProtectedData } = useContext(AuthContext);
    const {type} = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const [staffToken, setStaffToken] = useState("");
    const [employeeId, setEmployeeId] = useState("");
    const [selectedDate, setSelectedDate] = useState(null);
    const [dateString, setDateString] = useState("");
    const [fileName, setFileName] = useState('');
    const [editingEventId, setEditingEventId] = useState("");
    const [editingEventDetail, setEditingEventDetail] = useState();
    const [editingEventImg, setEditingEventImg] = useState();
    const [eventDate, setEventDate] = useState("");

    const [image, setImage] = useState();
    const InitialEventDetail = {
        title: "",
        description: "",
        location: "",
    }
    const [eventDetail, setEventDetail] = useState(InitialEventDetail);
    const [eventImgUrl, setEventImgUrl] = useState("");
    const [url, setUrl] = useState("");

    //for show success message for payment
    function showSuccessMessage(message) {
        Swal.fire({
            title: 'Congratulations!',
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
        $(document).ready(function () {
            // $(".custom-file-input").on("change", function () {
            //     var fileName = $(this).val().split("\\").pop();
            //     $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
            // });

            // $('#clear-file').on('click', function () {
            //     $('#customFile').val('');
            // });
        });
    }, [eventImgUrl]);

    useEffect(() => {
        setStaffToken(JSON.parse(localStorage.getItem('staffToken')))
    }, [staffToken])

    useEffect(() => {
        const { editingEventId } = location.state || {};
        setEditingEventId(editingEventId);

    }, [location.state])

    useEffect(()=>{
        if(editingEventId){

            axios.get(`https://skillety.onrender.com/event/${editingEventId}`, {
                headers: {
                    Authorization: `Bearer ${staffToken}`,
                    Accept: 'application/json'
                }
              })
              .then(res=>{
                console.log(res.data);
                setEditingEventDetail(res.data);
            })
            .catch(err=>console.log(err));

            axios.get(`https://skillety.onrender.com/event-image/${editingEventId}`)
              .then(res=>setEditingEventImg(res.data))
              .catch(err=>console.log(err))
          
        }

    },[editingEventId]);

    useEffect(() => {
        if(editingEventDetail){
          setEventDetail({
            title:editingEventDetail.title,
            description:editingEventDetail.description,
            location:editingEventDetail.location,
          });
          setEventDate(editingEventDetail.date);
          setUrl(editingEventDetail.url);
        }
      }, [editingEventDetail]);
  
      useEffect(() => {
        if(editingEventImg){
          setEventImgUrl(`https://skillety.onrender.com/images/${editingEventImg.image}`)
        }
        
      }, [editingEventImg]);

      useEffect(() => {
        setEventDate(dateString);
      }, [dateString]);
  

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

    useEffect(() => {
        if (image) {
            setEventImgUrl(URL.createObjectURL(image));

            setFileName(image.name);
        }
    }, [image]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEventDetail({ ...eventDetail, [name]: value });
    }

    const handleDateChange = date => {
        setSelectedDate(date);

        if (date) {
            const day = date.getDate();
            const month = date.toLocaleString('default', { month: 'long' });
            const year = date.getFullYear();

            setDateString(`${day}${daySuffix(day)} ${month} ${year}`);
        }
    };

    const daySuffix = (day) => {
        if (day >= 11 && day <= 13) {
            return "th";
        }
        switch (day % 10) {
            case 1: return "st";
            case 2: return "nd";
            case 3: return "rd";
            default: return "th";
        }
    };

    const mediaPosting = async (media) => {
        console.log(media)
        if (image && dateString) {
            try {
                const response = await axios.post(`https://skillety.onrender.com/media`, media, {
                    headers: {
                        Authorization: `Bearer ${staffToken}`,
                        Accept: 'application/json'
                    }
                });

                const result = response.data;

                if (!result.error) {
                    console.log(result);
                    showSuccessMessage(`${type} Posted Successfully`);
                    navigate(`/posted-media/${type}`);
                    // setEventDetail(InitialEventDetail);
                    // setSelectedDate(null);
                    // setDateString("");
                } else {
                    console.log(result);
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            showErrorMessage(`select the ${type} image and date`);
        }

    };

    const changingEvent = async (event) => {
        if(eventDate){
            try {
              const response = await axios.patch(`https://skillety.onrender.com/event/${editingEventId}`, event, {
                headers: {
                    Authorization: `Bearer ${staffToken}`,
                    Accept: 'application/json'
                }
              });
      
              const result = response.data;
      
              if (!result.message) {
                  console.log(result);
                  showSuccessMessage(`${type} has been updated.`);
                  navigate(`/posted-media/${type}`);
                //   setEditingEventId("");
                //   setEventDetail(InitialEventDetail);
                //     setSelectedDate(null);
                //     setDateString("");
              } else {
                  console.log(result);
              }
          } catch (error) {
              console.log(error);
          }
        }
          
        };

    const handleSubmit = (e) => {
        e.preventDefault();
        let event;
        if(!editingEventId){
          const id = uuidv4();
          if(type==="event"){
            event = {
                ...eventDetail,
                id,
                recruiterId:employeeId,
                date: dateString,
                type,
              };
              console.log(event);
              mediaPosting(event);
          }else{
            event = {
                ...eventDetail,
                url,
                id,
                recruiterId:employeeId,
                date: dateString,
                type,
              };
              console.log(event);
              mediaPosting(event);
          }
          if(image){
            const formData = new FormData()
            formData.append('image', image);
            formData.append('id', id)
            axios.post("https://skillety.onrender.com/upload-image", formData, {
              headers: {
                  Authorization: `Bearer ${staffToken}`,
                  Accept: 'application/json'
              }
            })
            .then(res=>{
              console.log(res);
              setImage(null);
            })
            .catch(err=>console.log(err));
          }
        }
        if(editingEventId){
            let event;
            if(type==="event"){
                event={
                    ...eventDetail,
                    id:editingEventDetail.id,
                    recruiterId:editingEventDetail.recruiterId,
                    date:eventDate,
                    type,
                  }
                  console.log(event);
                  changingEvent(event);
            }else{
                event={
                    ...eventDetail,
                    id:editingEventDetail.id,
                    recruiterId:editingEventDetail.recruiterId,
                    date:eventDate,
                    type,
                    url,
                  }
                  console.log(event);
                  changingEvent(event);
            }
          
          if(image){
            const formData = new FormData()
            formData.append('image', image);
            axios.patch(`https://skillety.onrender.com/update-image/${editingEventId}`, formData, {
              headers: {
                  Authorization: `Bearer ${staffToken}`,
                  Accept: 'application/json'
              }
            })
            .then(res=>{
              console.log(res);
              setImage(null);
            })
            .catch(err=>console.log(err));
          }
        }
    }

    const handleClearFile = () => {
        setEventImgUrl('');
        setFileName('');
        document.getElementById('customFile').value = '';
    };

    return (
        <div>
            <div class="main-wrapper main-wrapper-1">
                <div class="navbar-bg"></div>
                <ATSLayout />

                <div class="main-content">
                    <section class="section">
                        <div className="post-job-section">
                            <div className="admin-component-name">
                                {type} Posting
                            </div>
                            <div className="card post-job-card">
                                <div className="post-job-title">Post a {type} </div>
                                {/* <div className="post-job-sub-title">Begin from scratch</div> */}

                                <div className="job-post-form-area">
                                    <form action="">
                                        <div className="row m-b-35">
                                            <div className="col-12 col-xl-12">
                                                <div className="job-post-form-group">
                                                    <label htmlFor="" className='job-post-form-label'>{type} Title<span className='form-required'>*</span></label>
                                                    <input type="text" className='job-post-form-input'
                                                        id='eventTitle'
                                                        name="title"
                                                        value={eventDetail.title}
                                                        onChange={handleInputChange}
                                                        placeholder={`Enter the ${type} title...`} />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row m-b-35">
                                            <div className="col-12 col-xl-12">
                                                <div className="job-post-form-group">
                                                    <label htmlFor="" className='job-post-form-label'>Description</label>
                                                    <textarea rows="5" className='job-post-form-input'
                                                        name="description"
                                                        value={eventDetail.description}
                                                        onChange={handleInputChange}
                                                        placeholder={`Enter the ${type} description...`} id="event-description"
                                                        required></textarea>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row m-b-35">
                                            <div className="col-12 col-md-6 col-xl-8">
                                                <div className="job-post-form-group">
                                                    <label htmlFor="" className='job-post-form-label'>Location<span className='form-required'>*</span></label>
                                                    <input type="text" className='job-post-form-input'
                                                        id='location'
                                                        name="location"
                                                        value={eventDetail.location}
                                                        onChange={handleInputChange}
                                                        placeholder={`Enter the ${type} location...` }/>
                                                </div>
                                            </div>

                                            <div className="col-12 col-md-6 col-xl-4 m-t-35 mt-md-0">
                                                <div className="job-post-form-group">
                                                    <label htmlFor="" className='job-post-form-label'>Date<span className='form-required'>*</span></label>
                                                    {/* <input type="date" className='job-post-form-input'
                                                        name='eventTitle'
                                                        id='eventTitle'
                                                        placeholder='Enter the event title...' /> */}
                                                    {/* {editingEventId && 
                                                        <div>
                                                            <input 
                                                                type="text" 
                                                                className="form-control" 
                                                                id="eventDateInput"  
                                                                name="eventDate" 
                                                                value={eventDate}
                                                                onChange = {(e)=>setEventDate(e.target.value)} 
                                                                placeholder="event date"
                                                                required />
                                                                <p>if you want to change the date of the event change it below</p>
                                                        </div>} */}
                                                    <div>
                                                        <DatePicker
                                                            selected={selectedDate}
                                                            onChange={handleDateChange}
                                                            dateFormat="dd/MM/yyyy"
                                                            value={eventDate}
                                                            placeholderText='dd/mm/yyyy'
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {!(type === "event") && <div className="row m-b-35">
                                            <div className="col-12 col-xl-12">
                                                <div className="job-post-form-group">
                                                    <label htmlFor="" className='job-post-form-label'>{type} Link<span className='form-required'>*</span></label>
                                                    <input type="text" className='job-post-form-input'
                                                        id='eventTitle'
                                                        name="title"
                                                        value={url}
                                                        onChange={(e)=>setUrl(e.target.value)}
                                                        placeholder={`Enter the ${type} link...`} />
                                                </div>
                                            </div>
                                        </div>}

                                        <div className="row m-b-35">
                                            <div className="col-12 col-xl-12">
                                                <div className="job-post-form-group">
                                                    <label htmlFor="" className='job-post-form-label'>{type} Image</label>
                                                    {(eventImgUrl.length > 0 || editingEventId) &&
                                                        <div className="event-preview-area">
                                                            <div className='event-preview-image-area'>
                                                                <img src={eventImgUrl} className='event-preview-image' title='Event Image' alt="Event Image" />
                                                            </div>
                                                            <button id='clear-file' className='clear-image-btn' 
                                                            title='Clear the image file...' onClick={handleClearFile}>
                                                                <span>Clear</span>
                                                            </button>
                                                            {/* <p>if you want to change the image of the event change it below</p> */}
                                                        </div>
                                                    }
                                                    <div className="custom-file ats">
                                                        <input type="file" className="custom-file-input ats" id="customFile" name="filename" onChange={e => setImage(e.target.files[0])} />
                                                        <label className="custom-file-label ats" for="customFile">{fileName || 'Choose file...'}</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="post-job-btn-area">
                                {editingEventId? <button className='post-job-btn' onClick={handleSubmit}>Update</button> : <button className='post-job-btn' onClick={handleSubmit}>Post</button>}
                                <a href={`/posted-media/${type}`} className='post-job-btn yellow'>
                                    Posted {type}
                                    <i class="bi bi-box-arrow-up-right ml-3"></i>
                                </a>
                            </div>
                        </div>
                    </section>
                </div >
                <Footer />
            </div >
        </div >
    )
}

export default EventPosting
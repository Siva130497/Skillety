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
import { v4 as uuidv4} from "uuid";

const EventPosting = () => {
    const {getProtectedData} = useContext(AuthContext);

    const [staffToken, setStaffToken] = useState("");
    const [employeeId, setEmployeeId] = useState("");
    const [selectedDate, setSelectedDate] = useState(null);
    const [dateString, setDateString] = useState("");

    const [image, setImage] = useState();
    const InitialEventDetail = {
        title:"",
        description:"",
        location:"",
    }
    const [eventDetail, setEventDetail] = useState(InitialEventDetail);
    const [eventImgUrl, setEventImgUrl] = useState("");

    //for show success message for payment
    function showSuccessMessage() {
        Swal.fire({
            title: 'Congratulations!',
            text: 'Event Posted Successfully',
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
            $(".custom-file-input").on("change", function () {
                var fileName = $(this).val().split("\\").pop();
                $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
            });
        });
    }, []);

    useEffect(() => {
        setStaffToken(JSON.parse(localStorage.getItem('staffToken')))
    }, [staffToken])

    useEffect(() => {
        if(staffToken){
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
        }
      }, [image]);

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setEventDetail({...eventDetail, [name] : value});
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
    
    const eventPosting = async (event) => {
      if(image && dateString){
          try {
            const response = await axios.post('http://localhost:5002/events', event, {
              headers: {
                  Authorization: `Bearer ${staffToken}`,
                  Accept: 'application/json'
              }
            });
    
            const result = response.data;
    
            if (!result.error) {
                console.log(result);
                showSuccessMessage();
                setEventDetail(InitialEventDetail);
                setSelectedDate(null);
                setDateString("");
            } else {
                console.log(result);
            }
        } catch (error) {
            console.log(error);
        }
      }else{
        showErrorMessage("select the event image and date");
      }
        
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        let event;
        
          const id = uuidv4();
          event = {
            ...eventDetail,
            id,
            recruiterId:employeeId,
            date: dateString,
          };
          console.log(event);
          eventPosting(event);
          if(image){
            console.log(image)
            const formData = new FormData()
            formData.append('image', image);
            formData.append('id', id)
            axios.post("http://localhost:5002/upload-image", formData, {
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


    return (
        <div>
            <div class="main-wrapper main-wrapper-1">
                <div class="navbar-bg"></div>
                <ATSLayout />

                <div class="main-content">
                    <section class="section">
                        <div className="post-job-section">
                            <div className="admin-component-name">
                                Event Posting
                            </div>
                            <div className="card post-job-card">
                                <div className="post-job-title">Post an Event </div>
                                {/* <div className="post-job-sub-title">Begin from scratch</div> */}

                                <div className="job-post-form-area">
                                    <form action="">
                                        <div className="row m-b-35">
                                            <div className="col-12 col-xl-12">
                                                <div className="job-post-form-group">
                                                    <label htmlFor="" className='job-post-form-label'>Event Title<span className='form-required'>*</span></label>
                                                    <input type="text" className='job-post-form-input'
                                                        id='eventTitle'
                                                        name="title" 
                                                        value={eventDetail.title}
                                                        onChange = {handleInputChange}
                                                        placeholder='Enter the event title...' />
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
                                                        onChange = {handleInputChange} 
                                                        placeholder='Enter the event description...' id="event-description"
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
                                                        onChange = {handleInputChange}
                                                        placeholder='Enter the event location...' />
                                                </div>
                                            </div>

                                            <div className="col-12 col-md-6 col-xl-4 m-t-35 mt-md-0">
                                                <div className="job-post-form-group">
                                                    <label htmlFor="" className='job-post-form-label'>Date<span className='form-required'>*</span></label>
                                                    {/* <input type="date" className='job-post-form-input'
                                                        name='eventTitle'
                                                        id='eventTitle'
                                                        placeholder='Enter the event title...' /> */}
                                                    <div>
                                                        <DatePicker
                                                            selected={selectedDate}
                                                            onChange={handleDateChange}
                                                            dateFormat="dd/MM/yyyy"
                                                            placeholderText='dd/mm/yyyy'
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row m-b-35">
                                            <div className="col-12 col-xl-12">
                                                <div className="job-post-form-group">
                                                    <label htmlFor="" className='job-post-form-label'>Event Image</label>
                                                    <div className="custom-file ats">
                                                    <iframe src={eventImgUrl} title="Event Image iframe" ></iframe>
                                                        <input type="file" className="custom-file-input ats" id="customFile" name="filename" onChange={e=>setImage(e.target.files[0])}/>
                                                        <label className="custom-file-label ats" for="customFile">Choose file...</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="post-job-btn-area">
                                <button className='post-job-btn' onClick={handleSubmit}>Post</button>
                                <a href='#' className='post-job-btn yellow'>
                                    Posted Events
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
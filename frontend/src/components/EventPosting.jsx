import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { v4 as uuidv4} from "uuid";
import Events from '../pages/Events/Events';

const EventPosting = ({staffToken, employeeId, editingEventId}) => {

    const [selectedDate, setSelectedDate] = useState(null);
    const [dateString, setDateString] = useState("");

    const [image, setImage] = useState();
    const InitialEventDetail = {
        title:"",
        description:"",
        location:"",
    }
    const [eventDetail, setEventDetail] = useState(InitialEventDetail);
    const [editingEventDetail, setEditingEventDetail] = useState([]);
    const [editingEventImg, setEditingEventImg] = useState();
    const [eventDate, setEventDate] = useState("");
    const [eventImgUrl, setEventImgUrl] = useState("");
    const [postedEventMode, setPostedEventMode] = useState(false);

    useEffect(()=>{
        if(editingEventId){

            axios.get(`http://localhost:5002/event/${editingEventId}`, {
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

            axios.get(`http://localhost:5002/event-image/${editingEventId}`)
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
      }
      
    }, [editingEventDetail]);

    useEffect(() => {
      if(editingEventImg){
        setEventImgUrl(`http://localhost:5002/images/${editingEventImg.image}`)
      }
      
    }, [editingEventImg]);

    useEffect(() => {
      setEventDate(dateString);
    }, [dateString]);

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
                alert("new event has been posted");
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
        alert("select the event image and date");
      }
        
      };

    const changingEvent = async (event) => {
      if(eventDate){
          try {
            const response = await axios.patch(`http://localhost:5002/event/${editingEventId}`, event, {
              headers: {
                  Authorization: `Bearer ${staffToken}`,
                  Accept: 'application/json'
              }
            });
    
            const result = response.data;
    
            if (!result.message) {
                console.log(result);
                alert("event has been updated");
                setPostedEventMode(true);
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
          event = {
            ...eventDetail,
            id,
            recruiterId:employeeId,
            date: dateString,
          };
          console.log(event);
          eventPosting(event);
          if(image){
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
        if(editingEventId){
          event={
            ...eventDetail,
            id:editingEventDetail.id,
            recruiterId:editingEventDetail.recruiterId,
            date:eventDate,
          }
          console.log(event);
          changingEvent(event);
          if(image){
            const formData = new FormData()
            formData.append('image', image);
            axios.patch(`http://localhost:5002/update-image/${editingEventId}`, formData, {
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

  return (
      <div>
        {postedEventMode ? <Events staffToken={staffToken}/> :
          <div>
            <form onSubmit={handleSubmit}>
          <div className="form-group">
              <label 
              htmlFor="eventTitleInput" 
              className="form-label mt-4">
                  Title
              </label>
              <input 
              type="text" 
              className="form-control" 
              id="eventTitleInput"  
              name="title" 
              value={eventDetail.title}
              onChange = {handleInputChange} 
              placeholder="enter event title"
              required />
          </div>
          <div class="form-group">
            <label htmlForfor="event_description" className="form-label mt-4">Description</label>
            <textarea className="form-control" id="event_description" rows="3" name="description" 
              value={eventDetail.description} 
              onChange = {handleInputChange} 
              placeholder="enter event description"
              required></textarea>
          </div>
          <div className="form-group">
              <label 
              htmlFor="event_location" 
              className="form-label mt-4">
                  Location
              </label>
              <input 
              type="text" 
              className="form-control" 
              id="eventTitleInput"  
              name="location" 
              value={eventDetail.location} 
              onChange = {handleInputChange} 
              placeholder="enter event location"
              required />
          </div>
          <div>
            <label
            htmlFor="days"
            className="form-label mt-4">
              Date
            </label>
            {editingEventId && 
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
              </div>}
            <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
            />
          </div>
          <div>
            <label
            htmlFor="event_img"
            className="form-label mt-4">
              Event Image
            </label>
            {editingEventId && 
              <div>
                <iframe src={eventImgUrl} title="Event Image iframe" ></iframe>
              <p>if you want to change the image of the event change it below</p>
              </div>}
            <input type='file' onChange={e=>setImage(e.target.files[0])} />
          </div>
          {editingEventId ? <input type='submit' value="update" className='btn btn-primary my-3' />:<input type='submit' value="Post" className='btn btn-primary my-3' />}
            </form>
            <button type="button" className="btn btn-outline-warning" onClick={()=>setPostedEventMode(true)}>Back to posted events</button>
          </div>
          

        }
      </div>
            
  )
}

export default EventPosting
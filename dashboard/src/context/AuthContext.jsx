import { createContext, useState} from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState("");
    const [eventDetail, setEventDetail] = useState([]);
    const [eventImg, setEventImg] = useState();
    const [candidateImg, setCandidateImg] = useState();
    const [clientImg, setClientImg] = useState();
    const [packageSelectionDetail, setPackageSelectionDetail] = useState();

    const [blogDetail, setBlogDetail] = useState([]);
    const [videoDetail, setVideoDetail] = useState([]);
    const [podcastDetail, setPodcastDetail] = useState([]);
    const [newsDetail, setNewsDetail] = useState([]);

    //user login request
    const loginUser = async (userData) => {
        try {
            const response = await axios.post(`https://skillety.onrender.com/${userData[1]}`, userData[0], {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            
            const result = response.data;
    
            if (result.accessToken) {
                console.log(result);
                if (userData[1] === "staff") {
                    localStorage.setItem("staffToken", JSON.stringify(result.accessToken));
                    navigate(`/recruiter-dashboard/${result.accessToken}`);
                } 
                
            } else {
                console.log(result);
                // window.location.reload();
            }
        } catch (error) {
            console.log(error.response.data);
            setErrorMsg(error.response.data.message);
            // window.location.reload();
        }
    }

    const getProtectedData = async (token) => {
        try {
          const response = await axios.get('https://skillety.onrender.com/protected', {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json'
            }
          });
          return response.data;
        } catch (error) {
          throw error;
        }
      };

    //candidate register
    const candidateReg = async (userData) => {
        try {
            const response = await axios.post('https://skillety.onrender.com/candidate-reg', userData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const result = response.data;

            if (!result.error) {
                console.log(result);
                
            } else {
                console.log(result);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getEventDetail = async() => {
        try{
            const res = await axios.get(`https://skillety.onrender.com/events`);
            const result = res.data;
            if (!result.error) {
              console.log(result);
              setEventDetail(result);
            } else {
              console.log(result);
            }
        }catch(err){
          console.log(err);
        }
    }

    const getEventImg = async() => {
        axios.get('https://skillety.onrender.com/event-image')
        .then(res=>{
            console.log(res.data)
            setEventImg(res.data)
        })
        .catch(err=>console.log(err))
    }

    const getBlogsDetail = async() => {
        try{
            const res = await axios.get(`https://skillety.onrender.com/blogs`);
            const result = res.data;
            if (!result.error) {
              console.log(result);
              setBlogDetail(result);
            } else {
              console.log(result);
            }
        }catch(err){
          console.log(err);
          
        }
    }

    const getVideoDetail = async() => {
        try{
            const res = await axios.get(`https://skillety.onrender.com/videos`);
            const result = res.data;
            if (!result.error) {
              console.log(result);
              setVideoDetail(result);
            } else {
              console.log(result);
            }
        }catch(err){
          console.log(err);
          
        }
    }

    const getPodcastDetail = async() => {
        try{
            const res = await axios.get(`https://skillety.onrender.com/podcasts`);
            const result = res.data;
            if (!result.error) {
              console.log(result);
              setPodcastDetail(result);
            } else {
              console.log(result);
            }
        }catch(err){
          console.log(err);
          
        }
    }

    const getNewsDetail = async() => {
        try{
            const res = await axios.get(`https://skillety.onrender.com/news`);
            const result = res.data;
            if (!result.error) {
              console.log(result);
              setNewsDetail(result);
            } else {
              console.log(result);
            }
        }catch(err){
          console.log(err);
          
        }
    }

    const getCandidateImg = async() => {
        axios.get('https://skillety.onrender.com/candidate-image')
        .then(res=>{
            console.log(res.data)
            setCandidateImg(res.data)
        })
        .catch(err=>console.log(err))
    }

    const getClientImg = async() => {
        axios.get('https://skillety.onrender.com/client-image')
        .then(res=>{
            console.log(res.data)
            setClientImg(res.data)
        })
        .catch(err=>console.log(err))
    }

    const getClientChoosenPlan = async(id) => {
        try{
            const res = await axios.get(`https://skillety.onrender.com/client-package-plan/${id}`
            );
            const result = res.data;
            if (!result.message) {
              console.log(result);
              setPackageSelectionDetail(result);
              return result;
            } else {
              console.log(result);
              return null;
            }
        }catch(err){
          console.log(err);
          return null;
        }
      }


    return<AuthContext.Provider value={{candidateReg, loginUser, getProtectedData, errorMsg, setErrorMsg, eventDetail, getEventDetail, getEventImg, eventImg, blogDetail, getBlogsDetail,videoDetail, getVideoDetail, podcastDetail, getPodcastDetail, newsDetail, getNewsDetail, getCandidateImg, candidateImg, getClientImg, clientImg, getClientChoosenPlan, packageSelectionDetail}}>
            {children}
        </AuthContext.Provider>
}

export default AuthContext;
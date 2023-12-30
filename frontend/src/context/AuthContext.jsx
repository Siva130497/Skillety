import { createContext, useState} from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';


const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState("");
    const [eventDetail, setEventDetail] = useState([]);
    const [eventImg, setEventImg] = useState();
    const [blogDetail, setBlogDetail] = useState([]);
    const [videoDetail, setVideoDetail] = useState([]);
    const [podcastDetail, setPodcastDetail] = useState([]);
    const [newsDetail, setNewsDetail] = useState([]);
    const [candidateImg, setCandidateImg] = useState();
    const [clientImg, setClientImg] = useState();
    const [packageSelectionDetail, setPackageSelectionDetail] = useState();
    const [result, setResult] = useState();

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
   

    //user login request
    const loginUser = async (userData) => {
        try {
            const response = await axios.post(`https://skillety-n6r1.onrender.com/${userData[1]}`, userData[0], {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            
            const result = response.data;
    
            if (result.accessToken) {
                console.log(result);
                if (userData[1] === "staff") {
                    localStorage.setItem("staffToken", JSON.stringify(result.accessToken));
                    window.open(`https://skillety-dashboard-tk2y.onrender.com/recruiter-dashboard/${result.accessToken}`, '_blank');
                } else if (userData[1] === "admin") {
                    localStorage.setItem("adminToken",  JSON.stringify(result.accessToken));
                    navigate("/admin-dashboard");
                } else if (userData[1] === "login-Candidate") {
                    localStorage.setItem("candidateToken",  JSON.stringify(result.accessToken));
                    window.open(`https://skillety-dashboard-tk2y.onrender.com/${result.accessToken}`, '_blank');
                    navigate("/candidate-home")
                } else if (userData[1] === "login-Client") {
                    localStorage.setItem("clientToken",  JSON.stringify(result.accessToken));
                    // window.open(`https://skillety-dashboard-tk2y.onrender.com/client-dashboard/${result.accessToken}`, '_blank');
                    window.open(`https://skillety-dashboard-tk2y.onrender.com/post-job/${result.accessToken}`, '_blank');
                    navigate("/")
                    
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
          const response = await axios.get('https://skillety-n6r1.onrender.com/protected', {
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
            const response = await axios.post('https://skillety-n6r1.onrender.com/candidate-reg', userData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const result = response.data;

            if (!result.error) {
                console.log(result);
                setResult(result)
                await new Promise(() => {
                    Swal.fire({
                        title: 'Congratulations!',
                        text: 'Successfully registered.',
                        icon: 'success',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'OK',
                    }).then(() => {
                        navigate("/candidate-login")
                    });
                });
            } else {
                console.log(result);
            }
        } catch (error) {
            console.log(error);
            await new Promise(() => {
                Swal.fire({
                    title: 'User Not Registered',
                    text: '',
                    icon: 'error',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK',
                }).then(() => {
                    navigate("/candiate-register")
                });
            });
        }
    };

    const getEventDetail = async() => {
        try{
            const res = await axios.get(`https://skillety-n6r1.onrender.com/events`);
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
        axios.get('https://skillety-n6r1.onrender.com/event-image')
        .then(res=>{
            console.log(res.data)
            setEventImg(res.data)
        })
        .catch(err=>console.log(err))
    }

    const getBlogsDetail = async() => {
        try{
            const res = await axios.get(`https://skillety-n6r1.onrender.com/blogs`);
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
            const res = await axios.get(`https://skillety-n6r1.onrender.com/videos`);
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
            const res = await axios.get(`https://skillety-n6r1.onrender.com/podcasts`);
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
            const res = await axios.get(`https://skillety-n6r1.onrender.com/news`);
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
        axios.get('https://skillety-n6r1.onrender.com/candidate-image')
        .then(res=>{
            console.log(res.data)
            setCandidateImg(res.data)
        })
        .catch(err=>console.log(err))
    }

    const getClientImg = async() => {
        axios.get('https://skillety-n6r1.onrender.com/client-image')
        .then(res=>{
            console.log(res.data)
            setClientImg(res.data)
        })
        .catch(err=>console.log(err))
    }

    const getClientChoosenPlan = async(id) => {
        try{
            const res = await axios.get(`https://skillety-n6r1.onrender.com/client-package-plan/${id}`
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


    return<AuthContext.Provider value={{candidateReg, loginUser, getProtectedData, errorMsg, setErrorMsg, eventDetail, getEventDetail, getEventImg, eventImg, blogDetail, getBlogsDetail,videoDetail, getVideoDetail, podcastDetail, getPodcastDetail, newsDetail, getNewsDetail, getCandidateImg, candidateImg, getClientImg, clientImg, getClientChoosenPlan, packageSelectionDetail, result}}>
            {children}
        </AuthContext.Provider>
}

export default AuthContext;
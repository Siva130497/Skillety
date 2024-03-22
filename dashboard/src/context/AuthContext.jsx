import { createContext, useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged  } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import {io} from "socket.io-client";
import { v4 as uuidv4 } from "uuid";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
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
  
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState();
  const [socket, setSocket] = useState(null);

    useEffect(()=>{
        setSocket(io("https://skillety-n6r1.onrender.com"));
    },[]);


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

      const result = response?.data;

      if (result.accessToken) {
        console.log(result);
        if (userData[1] === "staff") {
          localStorage.setItem("staffToken", JSON.stringify(result.accessToken));
          navigate(`/recruiter-dashboard/${result.accessToken}`);
        }else if (userData[1] === "ats") {
          localStorage.setItem("atsToken", JSON.stringify(result.accessToken));
          navigate(`/ats-dashboard/${result.accessToken}`);
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
    // Check if localStorage has any key-value pairs
    if (localStorage.getItem("candidateToken") || localStorage.getItem("clientToken") || localStorage.getItem("staffToken") || localStorage.getItem("atsToken") || token) {
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
    } else {
      return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            console.log(user);
            if (user) {
                console.log(user);
                try {
                    const userToken = await user.getIdToken();
                    axios.get('https://skillety-n6r1.onrender.com/protected', {
                        headers: {
                            Authorization: `Bearer firebase:${userToken}`,
                            Accept: 'application/json'
                        }
                    }).then((response) => {
                        console.log(response.data);
                        resolve({ responseData: response.data, userToken:`firebase:${userToken}` }); 
                    }).catch((error) => {
                        reject(error); // Reject with the error
                    });
                } catch (error) {
                    reject(error); // Reject with the error
                }
            } else {
                const provider = new GoogleAuthProvider();
                try {
                    const userCred = await signInWithPopup(auth, provider);
                    const userToken = await userCred.user.getIdToken();
                    axios.get('https://skillety-n6r1.onrender.com/protected', {
                        headers: {
                            Authorization: `Bearer firebase:${userToken}`,
                            Accept: 'application/json'
                        }
                    }).then((response) => {
                        console.log(response.data);
                        resolve({ responseData: response.data, userToken }); // Resolve with both response data and userToken
                    }).catch((error) => {
                        reject(error); // Reject with the error
                    });
                } catch (error) {
                    console.error("Error signing in with Google:", error);
                    showErrorMessage("Error signing in with Google");
                    reject(error); // Reject with the error
                }
            }
        });
        return () => {
            // Unsubscribe from the auth listener on component unmount
            unsubscribe();
        };
      });
    }
  };

  //candidate register
  const candidateReg = async (userData) => {
    try {
        const response = await axios.post('https://skillety-n6r1.onrender.com/candidate-create', userData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const result = response.data;

        if (!result.error) {
            console.log(result);
            
            await new Promise(() => {
                Swal.fire({
                    title: 'Congratulations!',
                    text: userData.createdFrom === "CMS" ? "Email sent." : "New Candidate Created",
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK',
                }).then(() => {
                  userData.createdFrom === "CMS" ? navigate("/created-candidates") : navigate("/created-candidates-ats");
                });
            });
        } else {
            console.log(result);
        }
    } catch (error) {
        console.log(error);
        await new Promise(() => {
            Swal.fire({
                title: 'Error in creating new candidate',
                text: error.response.data.error,
                icon: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK',
            }).then(() => {
                // navigate("/candiate-register")
            });
        });
    }
};

const candidateUpdate = async (userData) => {
  try {
      const response = await axios.patch(`https://skillety-n6r1.onrender.com/recruiter-cand-update/${userData[1]}`, userData[0], {
          headers: {
              'Content-Type': 'application/json',
          },
      });

      const result = response.data;

      if (!result.error) {
          console.log(result);
          
          await new Promise(() => {
              Swal.fire({
                  title: 'Updated!',
                  text: '',
                  icon: 'success',
                  confirmButtonColor: '#3085d6',
                  confirmButtonText: 'OK',
              }).then(() => {
                userData[0].createdFrom === "CMS" ? navigate("/created-candidates") : navigate("/created-candidates-ats");
              });
          });
      } else {
          console.log(result);
      }
  } catch (error) {
      console.log(error);
      await new Promise(() => {
          Swal.fire({
              title: '!',
              text: '',
              icon: 'error',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'OK',
          }).then(() => {
              // navigate("/candiate-register")
          });
      });
  }
};

  const getEventDetail = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`https://skillety-n6r1.onrender.com/events`);
      const result = res.data;
      if (!result.error) {
        console.log(result);
        setEventDetail(result);
      } else {
        console.log(result);
      }

      setLoading(false);
    } catch (err) {
      console.log(err);

      setLoading(false);
    }
  }

  const getEventImg = async () => {
    axios.get('https://skillety-n6r1.onrender.com/event-image')
      .then(res => {
        console.log(res.data)
        setEventImg(res.data)
      })
      .catch(err => console.log(err))
  }

  const getBlogsDetail = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`https://skillety-n6r1.onrender.com/blogs`);
      const result = res.data;
      if (!result.error) {
        console.log(result);
        setBlogDetail(result);
      } else {
        console.log(result);
      }

      setLoading(false);
    } catch (err) {
      console.log(err);

      setLoading(false);
    }
  }

  const getVideoDetail = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`https://skillety-n6r1.onrender.com/videos`);
      const result = res.data;
      if (!result.error) {
        console.log(result);
        setVideoDetail(result);
      } else {
        console.log(result);
      }

      setLoading(false);
    } catch (err) {
      console.log(err);

      setLoading(false);
    }
  }

  const getPodcastDetail = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`https://skillety-n6r1.onrender.com/podcasts`);
      const result = res.data;
      if (!result.error) {
        console.log(result);
        setPodcastDetail(result);
      } else {
        console.log(result);
      }

      setLoading(false);
    } catch (err) {
      console.log(err);

      setLoading(false);
    }
  }

  const getNewsDetail = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`https://skillety-n6r1.onrender.com/news`);
      const result = res.data;
      if (!result.error) {
        console.log(result);
        setNewsDetail(result);
      } else {
        console.log(result);
      }

      setLoading(false);
    } catch (err) {
      console.log(err);

      setLoading(false);
    }
  }

  const getCandidateImg = async () => {
    axios.get('https://skillety-n6r1.onrender.com/candidate-image')
      .then(res => {
        console.log(res.data)
        setCandidateImg(res.data)
      })
      .catch(err => console.log(err))
  }

  const getClientImg = async () => {
    axios.get('https://skillety-n6r1.onrender.com/client-image')
      .then(res => {
        console.log(res.data)
        setClientImg(res.data)
      })
      .catch(err => console.log(err))
  }

  const getClientChoosenPlan = async (id, token) => {
    try {
      const res = await axios.get(`https://skillety-n6r1.onrender.com/client-package-plan/${id}`,{
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json'
        }
      }
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
    } catch (err) {
      console.log(err);
      return null;
    }
  }


  //BGV Data sending for verification
  const sendinngBGVData = async (userData) => {
    try {
        const username = 'adminBgvFactsuite';
        const password = 'AdminFSuite123';
        const authString = `${username}:${password}`;
        const base64AuthString = btoa(authString);

        const response = await axios.post(
            `http://3.108.132.101:8080/BgvApi/bgv/requestCandidateVerification?unique_id=${userData.unique_id}&client_id=${userData.client_id}`,
            userData,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${base64AuthString}`,
                },
            }
        );

        const result = response.data;

        if (!result.error) {
            console.log(result);

            await Swal.fire({
                title: 'User Details sent to BG Verification!',
                text: 'You will be notified of the verification result',
                icon: 'success',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK',
            });
        } else {
            console.log(result);
        }
    } catch (error) {
        console.log(error);

        await Swal.fire({
            title: 'Error!',
            text: error.response.data.error,
            icon: 'error',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
        });
    }
};

//sending notification
const sendNotification = async (senderData, receiverData, content, redirect, token) => {

  console.log(senderData, receiverData, content, redirect);
  
  const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const amPm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedTime = `${formattedHours}:${String(minutes).padStart(2, '0')} ${amPm}`;
    const formattedDate = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${String(now.getFullYear()).slice(-2)}`;

    const notificationData = {
      senderId: senderData.id,
      senderName: senderData.name,
      receiverId: receiverData.id,
      receiverName: receiverData.name,
      content: content,
      time: formattedTime,
      date: formattedDate,
      redirect: redirect,
      id:uuidv4()
    };

  try {
    // Emit socket event
    if (socket) {
      await socket.emit("newUser", senderData.name);
      console.log(notificationData)
      await socket.emit("sendNotification", notificationData);

      // Save notification in the database
    const response = await axios.post('https://skillety-n6r1.onrender.com/create-new-notification', notificationData, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      }
    });

    console.log('Notification saved in the database:', response.data);
    console.log('Notification sent successfully');
    window.location.reload();
    } else {
      console.error('Socket not available');
      window.location.reload();
    }
  } catch (error) {
    console.error('Error sending notification:', error);
    window.location.reload();
  }
}

  return <AuthContext.Provider value={{ candidateReg, loginUser, getProtectedData, errorMsg, setErrorMsg, eventDetail, getEventDetail, getEventImg, eventImg, blogDetail, getBlogsDetail, videoDetail, getVideoDetail, podcastDetail, getPodcastDetail, newsDetail, getNewsDetail, getCandidateImg, candidateImg, getClientImg, clientImg, getClientChoosenPlan, packageSelectionDetail, result, candidateUpdate, sendinngBGVData, sendNotification }}>
    {children}
  </AuthContext.Provider>
}

export default AuthContext;
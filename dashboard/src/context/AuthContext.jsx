import { createContext, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged  } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';


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
    if (localStorage.getItem("candidateToken") || localStorage.getItem("clientToken") || localStorage.getItem("staffToken") || localStorage.getItem("atsToken")) {
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
                    text: 'Email sent.',
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK',
                }).then(() => {
                  navigate("/created-candidates");
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
                  navigate("/created-candidates");
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

  const getClientChoosenPlan = async (id) => {
    try {
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
    } catch (err) {
      console.log(err);
      return null;
    }
  }


  return <AuthContext.Provider value={{ candidateReg, loginUser, getProtectedData, errorMsg, setErrorMsg, eventDetail, getEventDetail, getEventImg, eventImg, blogDetail, getBlogsDetail, videoDetail, getVideoDetail, podcastDetail, getPodcastDetail, newsDetail, getNewsDetail, getCandidateImg, candidateImg, getClientImg, clientImg, getClientChoosenPlan, packageSelectionDetail, result, candidateUpdate }}>
    {children}
  </AuthContext.Provider>
}

export default AuthContext;
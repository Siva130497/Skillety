import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import ATSLayout from '../../components/ATSLayout';
import Footer from '../../components/Footer';
import './PostedEvents.css';
import $ from 'jquery';
import AuthContext from '../../context/AuthContext';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import { useNavigate, useParams } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


const PostedEvents = () => {
    const { type } = useParams();
    const navigate = useNavigate();
    const { eventDetail, getEventDetail, getEventImg, eventImg, blogDetail, getBlogsDetail, videoDetail, getVideoDetail, podcastDetail, getPodcastDetail, newsDetail, getNewsDetail, } = useContext(AuthContext);
    const [selectedMediaViewDetail, setSelectedMediaViewDetail] = useState();
    const [image, setImage] = useState("");
    const [staffToken, setStaffToken] = useState("");

    const [x, setX] = useState([0, 10]);

    const [loading, setLoading] = useState(true);

    // useEffect(()=>{
    //     if(eventDetail){
    //         setLoading(false);
    //     }
    // },[eventDetail])

    useEffect(() => {
        $(document).ready(function () {
            // Open modal when the button is clicked
            $(".event-image-view-btn").on("click", function () {
                $("#imageModal").css("display", "flex");
                $("#modalImage").attr("src", $(".event-image").attr("src"));
            });

            // Close modal when the close button is clicked
            $(".image-view-close").on("click", function () {
                $("#imageModal").css("display", "none");
            });

            // Close modal when clicking outside the modal content
            $(window).on("click", function (event) {
                if (event.target == $("#imageModal")[0]) {
                    $("#imageModal").css("display", "none");
                }
            });
        });

    }, []);

    // useEffect(() => {
    //     getEventImg();
    //     if (type === "event") {
    //         getEventDetail();
    //     } else if (type === "blog") {
    //         getBlogsDetail();
    //     } else if (type === "video") {
    //         getVideoDetail();
    //     } else if (type === "podcast") {
    //         getPodcastDetail();
    //     } else if (type === "news") {
    //         getNewsDetail();
    //     }
    // }, [type]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await getEventImg();
    
                if (type === "event") {
                    await getEventDetail();
                } else if (type === "blog") {
                    await getBlogsDetail();
                } else if (type === "video") {
                    await getVideoDetail();
                } else if (type === "podcast") {
                    await getPodcastDetail();
                } else if (type === "news") {
                    await getNewsDetail();
                }
    
                setLoading(false); // Set loading to false after fetching data
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false); // Handle error and set loading to false
            }
        };
    
        fetchData();
    }, [type]);

    useEffect(() => {
        setStaffToken(JSON.parse(localStorage.getItem('staffToken')))
    }, [staffToken])

    const getDataArray = (type) => {
        switch (type) {
            case 'event':
                return eventDetail;
                
            case 'blog':
                return blogDetail;
            case 'video':
                return videoDetail;
            case 'podcast':
                return podcastDetail;
            case 'news':
                return newsDetail;
            default:
                return null;
        }
    };

    const data = getDataArray(type);

    const handleViewEventDetail = (id) => {

        const selectedObj = data.find(obj => obj.id === id);
        setSelectedMediaViewDetail(selectedObj);

        const matchingImg = eventImg ? eventImg.find(img => img.id === id) : null;

        if (matchingImg) {
            setImage(`data:image/jpeg;base64,${matchingImg.image}`);
        } else {
            setImage("assets/img/events/event-img.jpg");
        }
    }

    const handleDelete = (id) => {

        Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`https://skillety-n6r1.onrender.com/events/${id}`, {
                    headers: {
                        Authorization: `Bearer ${staffToken}`,
                        Accept: 'application/json'
                    }
                })
                    .then(res => {
                        console.log(res.data);
                        if (type === "event") {
                            getEventDetail();
                        } else if (type === "blog") {
                            getBlogsDetail();
                        } else if (type === "video") {
                            getVideoDetail();
                        } else if (type === "podcast") {
                            getPodcastDetail();
                        } else if (type === "news") {
                            getNewsDetail();
                        }
                    }
                    )
                    .catch(err => console.log(err));

                axios.delete(`https://skillety-n6r1.onrender.com/event-image-delete/${id}`, {
                    headers: {
                        Authorization: `Bearer ${staffToken}`,
                        Accept: 'application/json'
                    }
                })
                    .then(response => {
                        console.log(response.data);
                        getEventImg();
                    })
                    .catch(error => {
                        console.error(error);
                    });
            }
        });
    }

    // const handleEdit = (id) => {
    //     console.log(id);
    //     setEditingEventId(id);
    // }

    return (
        <div>
            <div class="main-wrapper main-wrapper-1">
                <div class="navbar-bg"></div>

                <ATSLayout />

                <div class="main-content">
                    <section class="section">
                        <div className="my-app-section">
                            <div className="admin-component-name">
                                Posted {type}s
                            </div>

                            {loading ? (
                                <div className="table-skeleton-area">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="table-data-skeleton-area">
                                                <div className="custom-flex-area">
                                                    <div>
                                                        <div className='pt-3'>
                                                            <Skeleton height={25} width={250} />
                                                        </div>
                                                        <div className='pt-3'>
                                                            <Skeleton height={15} width={120} />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="table-responsive table-scroll-area mt-4 skeleton-table">
                                                    <div className="table skeleton-table table-striped table-hover admin-lg-table">
                                                        <tr className="skeleton-table-row">
                                                            <th className='w-5'>
                                                                <Skeleton height={18} width={30} />
                                                            </th>
                                                            <th className='w-25'>
                                                                <Skeleton height={18} width={100} />
                                                            </th>
                                                            <th className='w-25'>
                                                                <Skeleton height={18} width={100} />
                                                            </th>
                                                            <th className='w-25'>
                                                                <Skeleton height={18} width={100} />
                                                            </th>
                                                            <th className='w-20'>
                                                                <Skeleton height={18} width={80} />
                                                            </th>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <Skeleton height={18} width={30} />
                                                            </td>
                                                            <td>
                                                                <Skeleton height={18} width={100} />
                                                            </td>
                                                            <td>
                                                                <Skeleton height={18} width={100} />
                                                            </td>
                                                            <td>
                                                                <Skeleton height={18} width={100} />
                                                            </td>
                                                            <td>
                                                                <Skeleton height={18} width={80} />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <Skeleton height={18} width={30} />
                                                            </td>
                                                            <td>
                                                                <Skeleton height={18} width={100} />
                                                            </td>
                                                            <td>
                                                                <Skeleton height={18} width={100} />
                                                            </td>
                                                            <td>
                                                                <Skeleton height={18} width={100} />
                                                            </td>
                                                            <td>
                                                                <Skeleton height={18} width={80} />
                                                            </td>
                                                        </tr>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                            <div className="row">
                                <div className="col-12">
                                    <div className="admin-lg-table-section">
                                        <div className='admin-lg-table-area man-app'>

                                            <div className='man-app-title-area candidate'>
                                                <div>
                                                    <div className="man-app-title">
                                                        Posted {type}s Details
                                                    </div>
                                                    <div className="man-app-sub-title">
                                                        Total {type}s :&nbsp;
                                                        <span>{data ? data.length : 0}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {data.length > 0 ?
                                                <div className="table-responsive table-scroll-area">
                                                    <table className="table table-striped table-hover admin-lg-table">
                                                        <tr className='dash-table-row man-app'>
                                                            <th className='dash-table-head'>No.</th>
                                                            <th className='dash-table-head'>Event Title</th>
                                                            <th className='dash-table-head'>Date</th>
                                                            <th className='dash-table-head text-left'>Action</th>
                                                        </tr>

                                                        {/* table data */}
                                                        {data.slice(x[0], x[1]).map((eve, index) => {
                                                            const editingEventId = eve.id;
                                                            return (
                                                                <tr className='dash-table-row client' key={eve.id}>
                                                                    <td className='dash-table-data1'>{index + 1}</td>
                                                                    <td className='dash-table-data1 text-capitalized'>
                                                                        {eve.title}
                                                                    </td>
                                                                    <td className='dash-table-data1'>
                                                                        {eve.date}
                                                                    </td>

                                                                    <td className='text-left'>
                                                                        <div className="action-btn-area">
                                                                            <a href='' onClick={() => {
                                                                                navigate(`/media-posting/${type}`, { state: { editingEventId } });
                                                                            }} className='job-edit-btn' title={`Edit ${type} details...`}>
                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                                                                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                                                                                </svg>
                                                                            </a>

                                                                            <button className='job-view-btn' data-toggle="modal" title={`View ${type} details...`} data-target="#eventviewModal" onClick={() => handleViewEventDetail(eve.id)}>
                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                                                                                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                                                                    <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"
                                                                                    />
                                                                                </svg>
                                                                            </button>

                                                                            <button className='job-delete-btn' data-toggle="modal" title={`Delete ${type} data...`} data-target="#eventdeleteModal" onClick={() => handleDelete(eve.id)}>
                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                                                                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                                                                                </svg>
                                                                            </button>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })}


                                                    </table>
                                                </div> :
                                                <div className="no-data-created-area">
                                                    <div className='no-data-created'>
                                                        <img src="../assets/img/no-data/no-data-img.png" className='no-data-img' alt="" />
                                                        <div className='no-data-text text-capitalized'>No {type} Posted Yet..!</div>
                                                    </div>
                                                </div>}
                                        </div>

                                        {/* <div className="view-application-btn-area text-center">
                                            <a href='#' className='view-app-btn'>
                                                View More&nbsp;&nbsp;
                                                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="8" viewBox="0 0 13 8" fill="none">
                                                    <path d="M12.3536 4.35355C12.5488 4.15829 12.5488 3.84171 12.3536 3.64645L9.17157 0.464466C8.97631 0.269204 8.65973 0.269204 8.46447 0.464466C8.2692 0.659728 8.2692 0.976311 8.46447 1.17157L11.2929 4L8.46447 6.82843C8.2692 7.02369 8.2692 7.34027 8.46447 7.53553C8.65973 7.7308 8.97631 7.7308 9.17157 7.53553L12.3536 4.35355ZM0 4.5L12 4.5V3.5L0 3.5L0 4.5Z" fill="#0F75C5" />
                                                </svg>
                                            </a>
                                        </div> */}
                                        <div className="table-pagination-area pt-3">
                                            <div className="pagination-btn-area">
                                                {x[0] > 0 && <button className='pag-prev-btn' onClick={() => setX([x[0] - 10, x[1] - 10])}>
                                                    <i class="bi bi-chevron-left"></i>
                                                </button>}
                                                <div className='pag-page'>
                                                    <span className='current-page'>{Math.ceil(x[0] / 10) + 1}</span>&nbsp;/&nbsp;
                                                    <span className='total-page'>{Math.ceil(data.length / 10)}</span>
                                                </div>
                                                {((data.slice(x[0], x[1]).length === 10 && data.length > x[1])) && <button className='pag-next-btn' onClick={() => setX([x[0] + 10, x[1] + 10])}>
                                                    <i class="bi bi-chevron-right"></i>
                                                </button>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            )}
                            
                        </div>
                    </section>
                </div>

                {/* Event view modal here */}
                <div className="modal fade" id="eventviewModal" tabindex="-1" role="dialog" aria-labelledby="eventViewLabel"
                    aria-hidden="true">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content recruiter-view-modal">
                            <div className="modal-header recruiter-view-modal-header">
                                <h5 className="modal-title recruiter-view-modal-title client text-capitalized" id="eventViewLabel">
                                    {type} Details_
                                </h5>
                                <a href='#' type="button" className="close recruiter-view-close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true"><i class="bi bi-x close-icon"></i></span>
                                </a>
                            </div>
                            <div className="modal-body">
                                <div className="card p-4 recruiter-view-card candidate">
                                    <div className="event-image-area">
                                        <div className="event-image-sub-area">
                                            <div className="event-image-view-area">
                                                <button className='event-image-view-btn' title='Click to view full size image...'>
                                                    <i class="bi bi-fullscreen img-view-icon"></i>
                                                </button>
                                            </div>
                                            <img src={image} className='event-image' alt="" />
                                        </div>
                                        <div id="imageModal" className="image-view-modal">
                                            <span className="image-view-close">
                                                <i class="bi bi-x"></i>
                                            </span>
                                            <img className="image-view-modal-content" id="modalImage" />
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-12 col-sm-4">
                                            <div className="view-det-head text-capitalized">{type} Title</div>
                                        </div>
                                        <div className="col-12 col-sm-8">
                                            <div className="view-det-sub-head text-capitalized">{selectedMediaViewDetail?.title}</div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-12 col-sm-4">
                                            <div className="view-det-head">Location</div>
                                        </div>
                                        <div className="col-12 col-sm-8">
                                            <div className="view-det-sub-head text-capitalized">{selectedMediaViewDetail?.location}</div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-12 col-sm-4">
                                            <div className="view-det-head">Date</div>
                                        </div>
                                        <div className="col-12 col-sm-8">
                                            <div className="view-det-sub-head">{selectedMediaViewDetail?.date}</div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-12 col-sm-4">
                                            <div className="view-det-head">Description</div>
                                        </div>
                                        <div className="col-12 col-sm-8">
                                            <div className="view-det-sub-head">{selectedMediaViewDetail?.description}</div>
                                        </div>
                                    </div>
                                    <hr />
                                    {!(type === "event") && <div className="row">
                                        <div className="col-12 col-sm-4">
                                            <div className="view-det-head">Link</div>
                                        </div>
                                        <div className="col-12 col-sm-8">
                                            <div className="view-det-sub-head">
                                                <a href={`${selectedMediaViewDetail?.url}`}
                                                    className='view-det-sub-head link is-link'
                                                    target='_blank'>
                                                    {selectedMediaViewDetail?.url}
                                                </a>
                                            </div>
                                        </div>
                                    </div>}
                                </div>
                            </div>
                            <div className="modal-footer recruiter-view-modal-footer bg-whitesmoke br">
                                <button type="button" className="btn close-modal-btn" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Event delete modal here */}
                {/* <div className="modal fade" id="eventdeleteModal" tabindex="-1" role="dialog" aria-labelledby="eventDeleteLabel"
                    aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content recruiter-delete-modal">
                            <div className="modal-header recruiter-view-modal-header">
                                <h5 className="modal-title recruiter-view-modal-title delete" id="eventDeleteLabel">
                                    Warning..!
                                </h5>
                                <a href='#' type="button" className="close recruiter-view-close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true"><i class="bi bi-x close-icon"></i></span>
                                </a>
                            </div>
                            <div className="modal-body">
                                <div className="card p-4 recruiter-delete-card">
                                    <div className="recruiter-delete-data-area">
                                        <img src="../assets/img/no-data/warning.png" className='recruiter-delete-img' alt="" />
                                        <div className='recruiter-delete-text'>
                                        Are you sure you want to delete this event's data?<br />
                                            <b>You can't undo..!</b>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer recruiter-view-modal-footer bg-whitesmoke br">
                                <button type="button" className="btn modal-btn danger">Yes</button>
                                <button type="button" className="btn modal-btn success" data-dismiss="modal">No</button>
                            </div>
                        </div>
                    </div>
                </div> */}

                <Footer />
            </div >
        </div >
    )
}

export default PostedEvents
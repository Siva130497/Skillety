import React, { useContext, useState } from 'react';
import './404.css';
import './404-responsive.css';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
    const navigate = useNavigate();

    const handleBackButtonClick = () => {
        navigate(-1);
    };

    return (
        <div className='not-found-page'>
            <div className='not-found-image-area'>
                <img className='not-found-image' src="../assets/img/no-data/404-error.svg" alt="" />
                <div className='not-found-text'>
                    Oops, <br />
                    somthing went wrong.
                </div>
                <div className='not-found-sub-text'>
                    Page not found..!
                </div>
                <button className="btn back-to-main-btn mt-4" onClick={handleBackButtonClick}>
                    <i className='bi bi-arrow-left mr-2'></i>
                    GET BACK
                </button>

            </div>
        </div>
    )
}

export default ErrorPage
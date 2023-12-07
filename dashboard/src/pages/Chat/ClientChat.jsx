import React, { useState, useRef, useEffect } from 'react';
import ATSLayout from '../../components/ATSLayout';
import Footer from '../../components/Footer';
import './Chat.css';
import './Chat-responsive.css';
import $ from 'jquery';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import moment from 'moment';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


const ClientChat = () => {
    
    useEffect(() => {
    }, []);

    return (
        <div>
            <div className="main-wrapper main-wrapper-1">
                <div className="navbar-bg"></div>

                <ATSLayout />

                <div className="main-content">
                    <section className="section">
                        <div className="my-app-section">


                        </div>
                    </section>
                </div>

                <Footer />
            </div >
        </div >
    )
}

export default ClientChat
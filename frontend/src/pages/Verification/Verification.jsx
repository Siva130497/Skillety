import React from 'react';
import { useEffect } from 'react';
import $ from 'jquery';
import './Verification.css';
import './Verification-responsive.css';
import Layout from '../../components/Layout';

const Verification = () => {
    useEffect(() => {
    }, []);

    return (
        <>
            <Layout newNavBarClientRegister={true} />
            <div className='cli--signup-section'>
                <div className='container-fluid'>
                    <div className='container-fluid container-section'>
                        {/* <div className="custom--container"> */}
                        <div className="row custom-column-reverse">
                            <div className="col-12 col-xl-6 col-lg-6 col-md-12 col-sm-12 client-forgot-area">
                                <div className="cli--signup-form-area forgot">
                                    <div>
                                        <h5 className="cli--signup-title" data-aos="fade-left">Verification</h5>
                                        <h6 className='cli--signup-sub-title' data-aos="fade-right">Enter Verification Code</h6>

                                        <form action="" className='cli--signup-form'>
                                            <div className='cli--signup-form-group' data-aos="fade-up">
                                                <div className="verify--input-box-area" data-aos="fade-up">
                                                    <input type="number" className='cli--verify-input-box' />
                                                    <input type="number" className='cli--verify-input-box' />
                                                    <input type="number" className='cli--verify-input-box' />
                                                    <input type="number" className='cli--verify-input-box' />
                                                    <input type="number" className='cli--verify-input-box' />
                                                    <input type="number" className='cli--verify-input-box' />
                                                </div>
                                                <div className="verify-code-resend-area" data-aos="fade-up">
                                                    <h6 className='verify-code-resend mb-0'>If you didn’t receive a code,&nbsp;</h6>
                                                    <button className='verify-code-resend-btn'>Resend</button>
                                                </div>
                                            </div>


                                            <div className="cli--create-account-btn-area" data-aos="fade-up">
                                                <button type='submit' className='cli--create-account-btn'>Send</button>
                                            </div>

                                        </form>

                                        <div className="cli--login-no-account-area mt-5" data-aos="fade-up">
                                            <span className='cli--login-no-account'>Don’t have an account?&nbsp;</span>
                                            <a href="/client-signup" className='cli--login-no-account-signup'>Sign up</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-xl-6 col-lg-6 col-md-12 col-sm-12">
                                <div className="cli--signup-img-area">
                                    <img src="../assets/img/signup/signup-img.webp" loading='lazy' data-aos="fade" data-aos-delay="300" className='cli--signup-img' alt="" />
                                </div>
                            </div>
                        </div>

                        <div className='cli--copyright-area'>
                            <i class="bi bi-c-circle me-2"></i>
                            <span className='cli--copyright'>2023 - Skillety Technologies Private Limited, All Rights Reserved.</span>
                        </div>
                        {/* </div> */}
                    </div>
                </div>
            </div>
        </>

    )
}
export default Verification;
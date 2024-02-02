import React from 'react'

const currentYear = new Date().getFullYear();

const Footer = () => {
    return (
        <div>
            <footer className="main-footer">
                <div className="footer-left">
                    <p className='footer-text'>
                        © {currentYear} - <a href="#">Skillety</a> Technologies Private Limited, All Rights Reserved.
                    </p>
                </div>
                <div className="footer-right">
                    <div className='footer-right-text-area'>
                        <p className='footer-right-text'>Designed & Developed by</p>
                        <a href="https://www.prodigit.in/" target='_blank'>
                            <img src="../assets/img/logo/prodigit-logo.png" className='footer-logo' alt="" />
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer
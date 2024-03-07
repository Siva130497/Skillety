import React, { useContext, useState } from "react";
import { useEffect } from "react";
import "./PrivacyPolicy.css";
import "./PrivacyPolicy-responsive.css";
import Layout from "../../components/Layout";
import { Footer } from "../../components/Footer";

const PrivacyPolicy = () => {
    useEffect(() => { }, []);

    return (
        <div>
            <Layout />
            <div className="cli--tal-pro-search-section">
                <div className="container-fluid">
                    <div className="container-fluid container-section">
                        <div className="custom--container tal--pro-search">
                            <div className="breadcrumb--area-dark" data-aos="fade-down">
                                <div className="breadcrumb--item-dark">
                                    <a href="/">Home</a>
                                </div>
                                <div className="breadcrumb--item-dark">
                                    <p>Privacy Policy</p>
                                </div>
                            </div>

                            <div className="terms-con-section">
                                <div className="terms-con-area">
                                    <div className="terms-con-title">
                                        <span>Privacy </span>Policy
                                    </div>

                                    <div className="privacy-initial-area">
                                        <p className="privacy-content">
                                            This privacy notice discloses the privacy practices for
                                            (www.skillety.com). This privacy notice applies solely to
                                            information collected by this website. It will notify you
                                            of the following:
                                        </p>

                                        <div className="privacy-list-area">
                                            <ul>
                                                <li className="privacy-list-item">
                                                    What personally identifiable information is collected
                                                    from you through the website, how it is used and with
                                                    whom it may be shared.
                                                </li>
                                                <li className="privacy-list-item">
                                                    What choices are available to you regarding the use of
                                                    your data.
                                                </li>
                                                <li className="privacy-list-item">
                                                    The security procedures in place to protect the misuse
                                                    of your information.
                                                </li>
                                                <li className="privacy-list-item mb-0">
                                                    How you can correct any inaccuracies in the
                                                    information.
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="privacy-pol-group">
                                        <div className="privacy-pol-head">
                                            Information Collection, Use, and Sharing
                                        </div>

                                        <p className="privacy-content">
                                            We are the sole owners of the information collected on
                                            this site. We only have access to/collect information that
                                            you voluntarily give us via email or other direct contact
                                            from you. We will not sell or rent this information to
                                            anyone.
                                        </p>

                                        <p className="privacy-content">
                                            We will use your information to respond to you, regarding
                                            the reason you contacted us. We will not share your
                                            information with any third party outside of our
                                            organization, other than as necessary to fulfill your
                                            request, e.g. to ship an order.
                                        </p>

                                        <p className="privacy-content">
                                            Unless you ask us not to, we may contact you via email in
                                            the future to tell you about specials, new products or
                                            services, or changes to this privacy policy.
                                        </p>
                                    </div>

                                    <div className="privacy-pol-group">
                                        <div className="privacy-pol-head">
                                            Your Access to and Control Over Information
                                        </div>

                                        <p className="privacy-content">
                                            You may opt out of any future contacts from us at any
                                            time. You can do the following at any time by contacting
                                            us via the email address or phone number given on our
                                            website:
                                        </p>

                                        <div className="privacy-list-area">
                                            <ul>
                                                <li className="privacy-list-item">
                                                    See what data we have about you, if any.
                                                </li>
                                                <li className="privacy-list-item">
                                                    Change/correct any data we have about you.
                                                </li>
                                                <li className="privacy-list-item">
                                                    Have us delete any data we have about you.
                                                </li>
                                                <li className="privacy-list-item">
                                                    Express any concern you have about our use of your
                                                    data.
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="privacy-pol-group">
                                        <div className="privacy-pol-head">Security</div>

                                        <p className="privacy-content">
                                            We take precautions to protect your information. When you
                                            submit sensitive information via the website, your
                                            information is protected both online and offline.
                                        </p>

                                        <p className="privacy-content">
                                            While we use encryption to protect sensitive information
                                            transmitted online, we also protect your information
                                            offline. Only employees who need the information to
                                            perform a specific job (for example, recruitment or
                                            customer service) are granted access to personally
                                            identifiable information. The computers/servers in which
                                            we store personally identifiable information are kept in a
                                            secure environment.
                                        </p>
                                        <hr />

                                        <p className="privacy-content font-weight-600 with-link">
                                            If you feel that we are not abiding by this privacy
                                            policy, you should contact us immediately via telephone
                                            at&nbsp;<a href="tel:+91-8500005247">+91-8500005247</a>
                                            &nbsp;or&nbsp;
                                            <a href="mailto:info@skillety.com.">info@skillety.com.</a>
                                        </p>
                                        <hr />

                                        <div className="privacy-list-area">
                                            <ul>
                                                <li className="privacy-list-item">
                                                    See what data we have about you, if any.
                                                </li>
                                                <li className="privacy-list-item">
                                                    Change/correct any data we have about you.
                                                </li>
                                                <li className="privacy-list-item">
                                                    Have us delete any data we have about you.
                                                </li>
                                                <li className="privacy-list-item">
                                                    Express any concern you have about our use of your
                                                    data.
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="privacy-pol-group">
                                        <div className="privacy-pol-head">Registration</div>

                                        <p className="privacy-content">
                                            In order to use the services of the Jobs page on this
                                            website, a user must first complete the registration form.
                                            During registration a user is required to give certain
                                            information (such as full name, mobile number and email
                                            address). This information is used to contact you about
                                            the services on our site in which you have expressed
                                            interest. At your option, you may also provide demographic
                                            information (such as gender or age) about yourself, but it
                                            is not required.
                                        </p>
                                    </div>

                                    <div className="privacy-pol-group">
                                        <div className="privacy-pol-head">Cookies</div>

                                        <p className="privacy-content">
                                            We use "cookies" on this site. A cookie is a piece of data
                                            stored on a site visitor's hard drive to help us improve
                                            your access to our site and identify repeat visitors to
                                            our site. For instance, when we use a cookie to identify
                                            you, you would not have to log in a password more than
                                            once, thereby saving time while on our site. Cookies can
                                            also enable us to track and target the interests of our
                                            users to enhance the experience on our site. Usage of a
                                            cookie is in no way linked to any personally identifiable
                                            information on our site. Some of our business partners may
                                            use third party cookies on our site (for example,
                                            advertisers). However, we have no access to or control
                                            over these cookies.
                                        </p>
                                    </div>

                                    <div className="privacy-pol-group">
                                        <div className="privacy-pol-head">Surveys & Contests</div>

                                        <p className="privacy-content">
                                            From time-to-time our site requests information via
                                            surveys or contests. Participation in these surveys or
                                            contests is completely voluntary and you may choose
                                            whether or not to participate and therefore disclose this
                                            information. Information requested may include contact
                                            information (such as name, mobile number and email
                                            address). Contact information will be used to notify the
                                            winners and award prizes, if any. Survey information will
                                            be used for purposes of monitoring or improving the use
                                            and satisfaction of this site.
                                        </p>
                                    </div>

                                    <div className="privacy-pol-group">
                                        <div className="privacy-pol-head">
                                            Changes To This Privacy Policy
                                        </div>

                                        <p className="privacy-content">
                                            This Privacy Policy is effective as of (19-July-2020) and
                                            will remain in effect except with respect to any changes
                                            in its provisions in the future, which will be in effect
                                            immediately after being posted on this page. We reserve
                                            the right to update or change our Privacy Policy at any
                                            time and you should check this Privacy Policy
                                            periodically. Your continued use of the Service after we
                                            post any modifications to the Privacy Policy on this page
                                            will constitute your acknowledgment of the modifications
                                            and your consent to abide and be bound by the modified
                                            Privacy Policy. If we make any material changes to this
                                            Privacy Policy, we will notify you either through the
                                            email address you have provided us, or by mentioning that
                                            change on our website.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};
export default PrivacyPolicy;

import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import $ from 'jquery';
import './Packages.css';
import './Packages-responsive.css';
import Layout from '../../components/Layout';
import { Footer } from '../../components/Footer';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';

const Packages = ({companyId}) => {
  const {getClientChoosenPlan, packageSelectionDetail} = useContext(AuthContext);

  const [packageType, setPackageType] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        await getClientChoosenPlan(companyId);
        
        if (packageSelectionDetail && packageSelectionDetail.packageType) {
          setPackageType(packageSelectionDetail.packageType);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    $(document).ready(function () {
      // Initial state
      $(".tab").hide();
      $("#tab1").addClass("active-tab");  // Show the first tab
      $(".pl--track-circle").eq(0).addClass("active");  // Highlight the first circle

      // Function to switch tabs and update the track area
      function switchTab(currentTab, nextTab, currentCircleIndex, nextCircleIndex, currentLineIndex, nextLineIndex) {
        $(currentTab).removeClass("active-tab");
        $(nextTab).addClass("active-tab");
        $(".pl--track-circle").eq(currentCircleIndex).removeClass("active");
        $(".pl--track-circle").eq(nextCircleIndex).addClass("active");
        $(".pl--track-line").eq(currentLineIndex).removeClass("active");
        $(".pl--track-line").eq(nextLineIndex).addClass("active");
      }

      // Buy Now button click event
      $(".buy-now").click(function () {
        switchTab("#tab1", "#tab2", 1, 1, 1, 0);
      });

      // Next button click event
      $(".next").click(function () {
        if ($("#tab2").hasClass("active-tab")) {
          switchTab("#tab2", "#tab3", 2, 2, 2, 1);
        }
      });

      // Previous button click event
      $(".previous").click(function () {
        if ($("#tab2").hasClass("active-tab")) {
          switchTab("#tab2", "#tab1", 1, 0, 0);
        } else if ($("#tab3").hasClass("active-tab")) {
          switchTab("#tab3", "#tab2", 2, 1, 1, 2);
        }
      });

      $('.starter-btn-area').hover(function () {
        $('.starter-info-area').addClass('hovered');
      }, function () {
        $('.starter-info-area').removeClass('hovered');
      });

      $('.professional-btn-area').hover(function () {
        $('.professional-info-area').addClass('hovered');
      }, function () {
        $('.professional-info-area').removeClass('hovered');
      });

      $('.premium-btn-area').hover(function () {
        $('.premium-info-area').addClass('hovered');
      }, function () {
        $('.premium-info-area').removeClass('hovered');
      });
    });

  }, []);

  const buyPackage = (companyId, logins, cvViews, packageType) => {
    const packageDetail = {
      id: companyId,
      packageType:packageType,
      logins: logins,
      cvViews: cvViews
    };
  
    return axios.post("http://localhost:5002/client-package-plan", packageDetail);
  }
  
  const handleBuy = (companyId, logins, cvViews, packageType) => {
    buyPackage(companyId, logins, cvViews, packageType)
      .then(response => {
        const result = response.data;
        console.log(result);
        console.log(`Successfully bought ${packageType} package`);
        window.location.reload();
      })
      .catch(error => {
        console.error(`Error buying ${packageType} package`, error);
      });
  }
  
  const handleBuyStarter = () => {
    handleBuy(companyId, 2, 20, "Starter");
  }
  
  const handleBuyProfessional = () => {
    handleBuy(companyId, 3, 30, "Professional");
  }

  const handleBuyPremium = () => {
    handleBuy(companyId, 5, 50, "Premium");
  }
  

  return (
    <>
      <Layout/>
      <div>
        <div className='plans--section'>
          <div className='container-fluid'>
            <div className='container-fluid container-section'>
              <div className="custom--container">
                <div className="breadcrumb--area-dark" data-aos="fade-down">
                  <div className="breadcrumb--item-dark">
                    <a href="/">Home</a>
                  </div>
                  <div className="breadcrumb--item-dark">
                    <p>Plans</p>
                  </div>
                </div>

                <div className="plans--container">
                  <div className="plans--head-area">
                    <h4 className='plans--heading' data-aos="fade-down">PICK YOUR PLAN</h4>
                    <div className="plans--sub-head" data-aos="fade-up">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </div>

                    <div className="plan--purchase-track-area" data-aos="fade" data-aos-delay="300">
                      <div className='pl--track-circle-area'>
                        <div className="pl--track-circle active">
                          <span>1</span>
                        </div>
                        <h6 className='pl--track-status'>Pick Plan</h6>
                      </div>

                      <div className='pl--track-line'></div>

                      <div className='pl--track-circle-area'>
                        <div className="pl--track-circle">
                          <span>2</span>
                        </div>
                        <h6 className='pl--track-status'>Add details</h6>
                      </div>

                      <div className='pl--track-line'></div>

                      <div className='pl--track-circle-area'>
                        <div className="pl--track-circle">
                          <span>3</span>
                        </div>
                        <h6 className='pl--track-status'>Pay</h6>
                      </div>
                    </div>

                  </div>

                  <div className="packages--area tab-content" data-aos="fade-up">
                    <div className='plan--detail-area tab' id="tab1">
                      <div className="row">
                        <div className="col-12 col-xl-3 col-lg-3 col-md-3 custom-width">
                          <div className="pl--package-title-area">
                            <div className="pl--package-head-area">
                              <img src="assets/img/packages/Starter.png" className="pl--package-img-hidden" alt="" />
                              <h5 className="pl--package-name-hidden">Package</h5>

                              <div>
                                <h6 className='pl--package-title'>CV Views</h6>
                              </div>

                              <div>
                                <h6 className='pl--package-title'>Job Posting</h6>
                              </div>

                              <div>
                                <h6 className='pl--package-title'>Mailers</h6>
                              </div>

                              <div>
                                <h6 className='pl--package-title'>Logins</h6>
                              </div>

                              <div>
                                <h6 className='pl--package-title'>Validity</h6>
                              </div>

                              <div>
                                <h6 className='pl--package-title'>Price</h6>
                              </div>
                            </div>
                          </div>
                        </div>
                        {packageType !== "Starter" && <div className="col-12 col-xl-3 col-lg-3 col-md-3 custom-width1">
                          <div className="pl--package-detail-area">
                            <div className='pl--package-info-area starter-info-area'>
                              <img src="assets/img/packages/Starter.png" className="pl--package-img" alt="" />
                              <h5 className="pl--package-name">Starter</h5>

                              <div className='pl--package-mobile-flex'>
                                <h6 className='pl--package-mobile-title'>CV Views</h6>
                                <h6 className='pl--package-info'>3,000</h6>
                              </div>

                              <div className='pl--package-mobile-flex'>
                                <h6 className='pl--package-mobile-title'>Job Posting</h6>
                                <h6 className='pl--package-info'>100</h6>
                              </div>

                              <div className='pl--package-mobile-flex'>
                                <h6 className='pl--package-mobile-title'>Mailers</h6>
                                <h6 className='pl--package-info'>10,000</h6>
                              </div>

                              <div className='pl--package-mobile-flex'>
                                <h6 className='pl--package-mobile-title'>Logins</h6>
                                <h6 className='pl--package-info'>2</h6>
                              </div>

                              <div className='pl--package-mobile-flex'>
                                <h6 className='pl--package-mobile-title'>Validity</h6>
                                <h6 className='pl--package-info'>3 Months</h6>
                              </div>

                              <div className='pl--package-mobile-flex'>
                                <h6 className='pl--package-mobile-title'>Price</h6>
                                <h6 className='pl--package-info'>150,000 + GST</h6>
                              </div>
                            </div>

                            <div className="pl--package-btn-area starter-btn-area">
                              <button className='pl--package-btn-sub buy-now'>
                                <div className='pl--package-btn' onClick={handleBuyStarter}>
                                  Buy Now
                                </div>
                                <div className='pl--package-arrow-area'>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
                                    <path d="M2.56641 3.44987C6.17752 6.50543 15.5664 10.4499 24.2331 1.7832" stroke="white" stroke-width="2" />
                                    <path d="M24.5618 1.45996C21.07 4.6512 15.9586 13.4593 23.4473 23.162" stroke="white" stroke-width="2" />
                                    <path d="M1 26L25.1667 1" stroke="white" stroke-width="2" />
                                  </svg>
                                </div>
                              </button>
                            </div>
                          </div>
                        </div>}
                        {packageType !== "Professional" && <div className="col-12 col-xl-3 col-lg-3 col-md-3 custom-width1">
                          <div className="pl--package-detail-area">
                            <div className='pl--package-info-area professional-info-area'>
                              <img src="assets/img/packages/Professional.png" className="pl--package-img" alt="" />
                              <h5 className="pl--package-name">Professional</h5>

                              <div className='pl--package-mobile-flex'>
                                <h6 className='pl--package-mobile-title'>CV Views</h6>
                                <h6 className='pl--package-info'>6,000</h6>
                              </div>

                              <div className='pl--package-mobile-flex'>
                                <h6 className='pl--package-mobile-title'>Job Posting</h6>
                                <h6 className='pl--package-info'>250</h6>
                              </div>

                              <div className='pl--package-mobile-flex'>
                                <h6 className='pl--package-mobile-title'>Mailers</h6>
                                <h6 className='pl--package-info'>25,000</h6>
                              </div>

                              <div className='pl--package-mobile-flex'>
                                <h6 className='pl--package-mobile-title'>Logins</h6>
                                <h6 className='pl--package-info'>5</h6>
                              </div>

                              <div className='pl--package-mobile-flex'>
                                <h6 className='pl--package-mobile-title'>Validity</h6>
                                <h6 className='pl--package-info'>6 Months</h6>
                              </div>

                              <div className='pl--package-mobile-flex'>
                                <h6 className='pl--package-mobile-title'>Price</h6>
                                <h6 className='pl--package-info'>300,000 + GST</h6>
                              </div>
                            </div>

                            <div className="pl--package-btn-area professional-btn-area">
                              <button className='pl--package-btn-sub buy-now'>
                                <div className='pl--package-btn' onClick={handleBuyProfessional}>
                                  Buy Now
                                </div>
                                <div className='pl--package-arrow-area'>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
                                    <path d="M2.56641 3.44987C6.17752 6.50543 15.5664 10.4499 24.2331 1.7832" stroke="white" stroke-width="2" />
                                    <path d="M24.5618 1.45996C21.07 4.6512 15.9586 13.4593 23.4473 23.162" stroke="white" stroke-width="2" />
                                    <path d="M1 26L25.1667 1" stroke="white" stroke-width="2" />
                                  </svg>
                                </div>
                              </button>
                            </div>
                          </div>
                        </div>}
                        {packageType !== "Premium" && <div className="col-12 col-xl-3 col-lg-3 col-md-3 custom-width1">
                          <div className="pl--package-detail-area">
                            <div className='pl--package-info-area premium-info-area'>
                              <img src="assets/img/packages/premium.png" className="pl--package-img" alt="" />
                              <h5 className="pl--package-name">Premium</h5>

                              <div className='pl--package-mobile-flex'>
                                <h6 className='pl--package-mobile-title'>CV Views</h6>
                                <h6 className='pl--package-info'>10,000</h6>
                              </div>

                              <div className='pl--package-mobile-flex'>
                                <h6 className='pl--package-mobile-title'>Job Posting</h6>
                                <h6 className='pl--package-info'>500</h6>
                              </div>

                              <div className='pl--package-mobile-flex'>
                                <h6 className='pl--package-mobile-title'>Mailers</h6>
                                <h6 className='pl--package-info'>50,000</h6>
                              </div>

                              <div className='pl--package-mobile-flex'>
                                <h6 className='pl--package-mobile-title'>Logins</h6>
                                <h6 className='pl--package-info'>10</h6>
                              </div>

                              <div className='pl--package-mobile-flex'>
                                <h6 className='pl--package-mobile-title'>Validity</h6>
                                <h6 className='pl--package-info'>12 Months</h6>
                              </div>

                              <div className='pl--package-mobile-flex'>
                                <h6 className='pl--package-mobile-title'>Price</h6>
                                <h6 className='pl--package-info'>500,000 + GST</h6>
                              </div>
                            </div>

                            <div className="pl--package-btn-area premium-btn-area">
                              <button className='pl--package-btn-sub buy-now'>
                                <div className='pl--package-btn' onClick={handleBuyPremium}>
                                  Buy Now
                                </div>
                                <div className='pl--package-arrow-area'>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
                                    <path d="M2.56641 3.44987C6.17752 6.50543 15.5664 10.4499 24.2331 1.7832" stroke="white" stroke-width="2" />
                                    <path d="M24.5618 1.45996C21.07 4.6512 15.9586 13.4593 23.4473 23.162" stroke="white" stroke-width="2" />
                                    <path d="M1 26L25.1667 1" stroke="white" stroke-width="2" />
                                  </svg>
                                </div>
                              </button>
                            </div>
                          </div>
                        </div>}
                      </div>

                      <p className='pl--package-desc part'>*Base unit prices of all inventory heads are fixed and same for all the companies registered in India.</p>
                    </div>

                    <div className='pl--add-detail-area tab' id="tab2">
                      <h4 className='text-center'>Add Detail Section</h4>
                      <div className="pl--package-btn-area">
                        <button className='pl--package-btn-sub previous'>
                          <div className='pl--package-arrow-area prev custom-mobile-d-none'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
                              <path d="M2.56641 3.44987C6.17752 6.50543 15.5664 10.4499 24.2331 1.7832" stroke="white" stroke-width="2" />
                              <path d="M24.5618 1.45996C21.07 4.6512 15.9586 13.4593 23.4473 23.162" stroke="white" stroke-width="2" />
                              <path d="M1 26L25.1667 1" stroke="white" stroke-width="2" />
                            </svg>
                          </div>
                          <div className='pl--package-btn'>
                            Previous
                          </div>
                        </button>

                        <button className='pl--package-btn-sub next'>
                          <div className='pl--package-btn'>
                            Next
                          </div>
                          <div className='pl--package-arrow-area custom-mobile-d-none'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
                              <path d="M2.56641 3.44987C6.17752 6.50543 15.5664 10.4499 24.2331 1.7832" stroke="white" stroke-width="2" />
                              <path d="M24.5618 1.45996C21.07 4.6512 15.9586 13.4593 23.4473 23.162" stroke="white" stroke-width="2" />
                              <path d="M1 26L25.1667 1" stroke="white" stroke-width="2" />
                            </svg>
                          </div>
                        </button>
                      </div>
                    </div>

                    <div className='pl--pay-area tab' id="tab3">
                      <h4 className='text-center'>Payment Section</h4>
                      <div className="pl--package-btn-area">
                        <button className='pl--package-btn-sub previous'>
                          <div className='pl--package-arrow-area prev custom-mobile-d-none'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
                              <path d="M2.56641 3.44987C6.17752 6.50543 15.5664 10.4499 24.2331 1.7832" stroke="white" stroke-width="2" />
                              <path d="M24.5618 1.45996C21.07 4.6512 15.9586 13.4593 23.4473 23.162" stroke="white" stroke-width="2" />
                              <path d="M1 26L25.1667 1" stroke="white" stroke-width="2" />
                            </svg>
                          </div>
                          <div className='pl--package-btn'>
                            Previous
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>

  )
}

export default Packages
import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import $ from 'jquery';
import './Packages.css';
import './Packages-responsive.css';
import Layout from '../../components/Layout';
import { Footer } from '../../components/Footer';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';


const Packages = ({ companyId }) => {
  const navigate = useNavigate();
  const [clientToken, setClientToken] = useState("");

  const [allPackages, setAllPackages] = useState([]);

  useEffect(() => {
    setClientToken(JSON.parse(localStorage.getItem("clientToken")));
  }, [clientToken]);

  useEffect(() => {
    axios.get("https://skillety-n6r1.onrender.com/all-packages")
      .then(res => {
        console.log(res.data);
        setAllPackages(res.data);
      }).catch(err => console.log(err));
  }, [clientToken]);

  const handleBuy = () => {
    if (clientToken) {
      const url = `https://skillety-dashboard-tk2y.onrender.com/package-plans?token=${encodeURIComponent(clientToken)}`;
      window.open(url, '_blank');
    } else {
      navigate('/client-login');
    }
  };
  

  return (
    <>
      <Layout />
      <div>
        <div className='plans--section'>
          <div className='container-fluid'>
            <div className='container-fluid container-section'>
              <div className="custom--container">
                <div className="breadcrumb--area-dark" data-aos="fade-down">
                  <div className="breadcrumb--item-dark">
                    <a href="/client-home">Home</a>
                  </div>
                  <div className="breadcrumb--item-dark">
                    <p>Plans</p>
                  </div>
                </div>

                <div className="plans--container">
                  <div className="plans--head-area">
                    <h4 className='plans--heading' data-aos="fade-down">PICK YOUR PLAN</h4>
                    <div className="plans--sub-head" data-aos="fade-up">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </div>
                  </div>

                  <div className="packages--area tab-content">
                    <div className="plan--detail-area">
                      <div className="row package-row">
                        <div className="col-12 col-xl-2 col-lg-2 col-md-2 custom-width" data-aos="fade">
                          <div className="pl--package-title-area">
                            <div className="pl--package-head-area">
                              <img
                                src="../assets/img/packages/Starter.png"
                                className="pl--package-img-hidden"
                                alt=""
                              />
                              <h5 className="pl--package-name-hidden">
                                SKILLETY PACKAGES
                              </h5>

                              <div>
                                <h6 className="pl--package-title">
                                  CV Views
                                </h6>
                              </div>

                              <div>
                                <h6 className="pl--package-title">
                                  Login ID
                                </h6>
                              </div>

                              <div>
                                <h6 className="pl--package-title">
                                  Job Postings
                                </h6>
                              </div>

                              <div>
                                <h6 className="pl--package-title">
                                  Validity in Days
                                </h6>
                              </div>

                              {/* <div>
                                      <h6 className="pl--package-title">
                                        <span className="with-bg">Total</span>
                                        Real Price
                                      </h6>
                                    </div> */}

                              <div>
                                <h6 className="pl--package-title">
                                  Inaugural Offer Price
                                </h6>
                              </div>

                              {/* <div className="pt-4">
                                <h6 className="pl--package-title">
                                  <span className="with-bg">GST</span>
                                </h6>
                              </div> */}

                              {/* <div>
                                <h6 className="pl--package-title">
                                  <b>Total Amount</b>
                                </h6>
                              </div> */}
                            </div>
                          </div>
                        </div>

                        {allPackages.map((pack) => {
                          return (
                            <div className="col-12 col-xl-2 col-lg-2 col-md-2 custom-width1"
                              key={pack.id} data-aos="fade-left">
                              <div className="pl--package-detail-area">
                                <div
                                  className={`pl--package-info-area`}
                                >
                                  <img
                                    src={`${pack.packageType === 'Test' ? "../assets/img/packages/test.png" :
                                      pack.packageType === 'Start' ? "../assets/img/packages/Starter.png" :
                                        pack.packageType === 'Scale' ? "../assets/img/packages/Professional.png" :
                                          pack.packageType === 'Grow' ? "../assets/img/packages/premium.png" :
                                            "../assets/img/packages/package.png"}`}
                                    className="pl--package-img"
                                    alt=""
                                  />
                                  <h5 className="pl--package-name">{pack.packageType}</h5>

                                  <div className="pl--package-mobile-flex">
                                    <h6 className="pl--package-mobile-title">
                                      CV Views
                                    </h6>
                                    <h6 className="pl--package-info">
                                      {pack.cvViews}
                                    </h6>
                                  </div>

                                  <div className="pl--package-mobile-flex">
                                    <h6 className="pl--package-mobile-title">
                                      Login ID
                                    </h6>
                                    <h6 className="pl--package-info">
                                      {pack.logins}
                                    </h6>
                                  </div>

                                  <div className="pl--package-mobile-flex">
                                    <h6 className="pl--package-mobile-title">
                                      Active Jobs
                                    </h6>
                                    <h6 className="pl--package-info">{pack.activeJobs}</h6>
                                  </div>

                                  <div className="pl--package-mobile-flex">
                                    <h6 className="pl--package-mobile-title">
                                      Validity in Days
                                    </h6>
                                    <h6 className="pl--package-info">
                                      {pack.validity}
                                    </h6>
                                  </div>

                                  <div className="pl--package-mobile-flex">
                                    <h6 className="pl--package-mobile-title">
                                      Inaugural Offer Price
                                    </h6>
                                    <h6 className="pl--package-info">
                                      <span className="line-through">{pack.realPrice}</span><br />
                                      {pack.offerPrice}
                                    </h6>
                                  </div>

                                  {/* <div className="pl--package-mobile-flex">
                                    <h6 className="pl--package-mobile-title">
                                      GST
                                    </h6>
                                    <h6 className="pl--package-info">
                                      {pack.GST}%
                                    </h6>
                                  </div> */}

                                  {/* <div className="pl--package-mobile-flex">
                                    <h6 className="pl--package-mobile-title">
                                      <b>Total Amount</b>
                                    </h6>
                                    <h6 className="pl--package-info">
                                      <b>{pack.amount}</b>
                                    </h6>
                                  </div> */}
                                </div>


                                <div className="pl--package-btn-area test-btn-area">
                                  <button
                                    className="pl--package-btn-sub buy-now"
                                    onClick={handleBuy}
                                  >
                                    <div className="pl--package-btn buy-now">
                                      Buy Now
                                    </div>
                                    <div className="pl--package-arrow-area buy-now pkg">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 27 27"
                                        fill="none"
                                      >
                                        <path
                                          d="M2.56641 3.44987C6.17752 6.50543 15.5664 10.4499 24.2331 1.7832"
                                          stroke="white"
                                          stroke-width="2"
                                        />
                                        <path
                                          d="M24.5618 1.45996C21.07 4.6512 15.9586 13.4593 23.4473 23.162"
                                          stroke="white"
                                          stroke-width="2"
                                        />
                                        <path
                                          d="M1 26L25.1667 1"
                                          stroke="white"
                                          stroke-width="2"
                                        />
                                      </svg>
                                    </div>
                                  </button>
                                </div>

                              </div>
                            </div>
                          )
                        })}

                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* skillety solution price area here*/}
              {/* <div className="sol-price-container">
                <div className='term-con-area'>
                  <p className='term-con'>
                    By clicking on the Buy Now you are agreeing to the&nbsp;
                    <a href="#">Terms & Conditions</a>
                  </p>
                </div>
                <div className="sol-price-area">
                  <h5 className="sol-price-heading">SKILLETY SOLUTIONS PRICES</h5>

                  <div className="table-responsive">
                    <table className='table sol-price-table'>
                      <thead>
                        <tr className='sol-price-table-head-row'>
                          <th className='sol-price-table-head text-start'>Solutions</th>
                          <th className='sol-price-table-head text-center'>Unit Price (Rs.)</th>
                          <th className='sol-price-table-head text-center'>Select Quantity</th>
                          <th className='sol-price-table-head text-center'>Total Price (Rs.)</th>
                          <th className='sol-price-table-head text-center'></th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr className='sol-price-table-row'>
                          <td className='sol-price-table-data first-data text-start'>Screening calls by Bot</td>
                          <td className='sol-price-table-data text-center'>1.5</td>
                          <td className='sol-price-table-data text-center sol-price-table-qty-area'>
                            <button className='sol-price-table-qty-button decrement'>-</button>
                            <input type="number" className='sol-price-table-qty-input' min={0} value={20} />
                            <button className='sol-price-table-qty-button increment'>+</button>
                          </td>
                          <td className='sol-price-table-data price text-center'>0</td>
                          <td className='text-center last-data sol-price-buy-now-btn-area'>
                            <button className='sol-price-buy-now-btn'>
                              <div className='sol-price-buy-now-btn-sub'>
                                Buy Now
                              </div>
                              <div className='sol-price-buy-now-arrow-area'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
                                  <path d="M2.56641 3.44987C6.17752 6.50543 15.5664 10.4499 24.2331 1.7832" stroke="#714F36" stroke-width="2" />
                                  <path d="M24.5618 1.45996C21.07 4.6512 15.9586 13.4593 23.4473 23.162" stroke="#714F36" stroke-width="2" />
                                  <path d="M1 26L25.1667 1" stroke="#714F36" stroke-width="2" />
                                </svg>
                              </div>
                            </button>
                          </td>
                        </tr>

                        <tr className='sol-price-table-row'>
                          <td className='sol-price-table-data first-data text-start'>Assessments</td>
                          <td className='sol-price-table-data text-center'>120</td>
                          <td className='sol-price-table-data text-center sol-price-table-qty-area'>
                            <button className='sol-price-table-qty-button decrement'>-</button>
                            <input type="number" className='sol-price-table-qty-input' min={0} value={20} />
                            <button className='sol-price-table-qty-button increment'>+</button>
                          </td>
                          <td className='sol-price-table-data price text-center'>0</td>
                          <td className='text-center last-data sol-price-buy-now-btn-area'>
                            <button className='sol-price-buy-now-btn'>
                              <div className='sol-price-buy-now-btn-sub'>
                                Buy Now
                              </div>
                              <div className='sol-price-buy-now-arrow-area'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
                                  <path d="M2.56641 3.44987C6.17752 6.50543 15.5664 10.4499 24.2331 1.7832" stroke="#714F36" stroke-width="2" />
                                  <path d="M24.5618 1.45996C21.07 4.6512 15.9586 13.4593 23.4473 23.162" stroke="#714F36" stroke-width="2" />
                                  <path d="M1 26L25.1667 1" stroke="#714F36" stroke-width="2" />
                                </svg>
                              </div>
                            </button>
                          </td>
                        </tr>

                        <tr className='sol-price-table-row'>
                          <td className='sol-price-table-data first-data text-start'>Interviews (0-8 yrs)</td>
                          <td className='sol-price-table-data text-center'>1500</td>
                          <td className='sol-price-table-data text-center sol-price-table-qty-area'>
                            <button className='sol-price-table-qty-button decrement'>-</button>
                            <input type="number" className='sol-price-table-qty-input' min={0} />
                            <button className='sol-price-table-qty-button increment'>+</button>
                          </td>
                          <td className='sol-price-table-data price text-center'>0</td>
                          <td className='text-center last-data sol-price-buy-now-btn-area'>
                            <button className='sol-price-buy-now-btn'>
                              <div className='sol-price-buy-now-btn-sub'>
                                Buy Now
                              </div>
                              <div className='sol-price-buy-now-arrow-area'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
                                  <path d="M2.56641 3.44987C6.17752 6.50543 15.5664 10.4499 24.2331 1.7832" stroke="#714F36" stroke-width="2" />
                                  <path d="M24.5618 1.45996C21.07 4.6512 15.9586 13.4593 23.4473 23.162" stroke="#714F36" stroke-width="2" />
                                  <path d="M1 26L25.1667 1" stroke="#714F36" stroke-width="2" />
                                </svg>
                              </div>
                            </button>
                          </td>
                        </tr>

                        <tr className='sol-price-table-row'>
                          <td className='sol-price-table-data first-data text-start'>Interviews (8.1-15 yrs)</td>
                          <td className='sol-price-table-data text-center'>2000</td>
                          <td className='sol-price-table-data text-center sol-price-table-qty-area'>
                            <button className='sol-price-table-qty-button decrement'>-</button>
                            <input type="number" className='sol-price-table-qty-input' min={0} />
                            <button className='sol-price-table-qty-button increment'>+</button>
                          </td>
                          <td className='sol-price-table-data price text-center'>0</td>
                          <td className='text-center last-data sol-price-buy-now-btn-area'>
                            <button className='sol-price-buy-now-btn'>
                              <div className='sol-price-buy-now-btn-sub'>
                                Buy Now
                              </div>
                              <div className='sol-price-buy-now-arrow-area'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
                                  <path d="M2.56641 3.44987C6.17752 6.50543 15.5664 10.4499 24.2331 1.7832" stroke="#714F36" stroke-width="2" />
                                  <path d="M24.5618 1.45996C21.07 4.6512 15.9586 13.4593 23.4473 23.162" stroke="#714F36" stroke-width="2" />
                                  <path d="M1 26L25.1667 1" stroke="#714F36" stroke-width="2" />
                                </svg>
                              </div>
                            </button>
                          </td>
                        </tr>

                        <tr className='sol-price-table-row'>
                          <td className='sol-price-table-data first-data text-start'>Interviews (>15 yrs)</td>
                          <td className='sol-price-table-data text-center'>2500</td>
                          <td className='sol-price-table-data text-center sol-price-table-qty-area'>
                            <button className='sol-price-table-qty-button decrement'>-</button>
                            <input type="number" className='sol-price-table-qty-input' min={0} />
                            <button className='sol-price-table-qty-button increment'>+</button>
                          </td>
                          <td className='sol-price-table-data price text-center'>0</td>
                          <td className='text-center last-data sol-price-buy-now-btn-area'>
                            <button className='sol-price-buy-now-btn'>
                              <div className='sol-price-buy-now-btn-sub'>
                                Buy Now
                              </div>
                              <div className='sol-price-buy-now-arrow-area'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
                                  <path d="M2.56641 3.44987C6.17752 6.50543 15.5664 10.4499 24.2331 1.7832" stroke="#714F36" stroke-width="2" />
                                  <path d="M24.5618 1.45996C21.07 4.6512 15.9586 13.4593 23.4473 23.162" stroke="#714F36" stroke-width="2" />
                                  <path d="M1 26L25.1667 1" stroke="#714F36" stroke-width="2" />
                                </svg>
                              </div>
                            </button>
                          </td>
                        </tr>

                        <tr className='sol-price-table-row'>
                          <td className='sol-price-table-data first-data text-start'>BGV Lite</td>
                          <td className='sol-price-table-data text-center'>1250</td>
                          <td className='sol-price-table-data text-center sol-price-table-qty-area'>
                            <button className='sol-price-table-qty-button decrement'>-</button>
                            <input type="number" className='sol-price-table-qty-input' min={0} />
                            <button className='sol-price-table-qty-button increment'>+</button>
                          </td>
                          <td className='sol-price-table-data price text-center'>0</td>
                          <td className='text-center last-data sol-price-buy-now-btn-area'>
                            <button className='sol-price-buy-now-btn'>
                              <div className='sol-price-buy-now-btn-sub'>
                                Buy Now
                              </div>
                              <div className='sol-price-buy-now-arrow-area'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
                                  <path d="M2.56641 3.44987C6.17752 6.50543 15.5664 10.4499 24.2331 1.7832" stroke="#714F36" stroke-width="2" />
                                  <path d="M24.5618 1.45996C21.07 4.6512 15.9586 13.4593 23.4473 23.162" stroke="#714F36" stroke-width="2" />
                                  <path d="M1 26L25.1667 1" stroke="#714F36" stroke-width="2" />
                                </svg>
                              </div>
                            </button>
                          </td>
                        </tr>

                        <tr className='sol-price-table-row'>
                          <td className='sol-price-table-data first-data text-start'>BGV 360</td>
                          <td className='sol-price-table-data text-center'>3000</td>
                          <td className='sol-price-table-data text-center sol-price-table-qty-area'>
                            <button className='sol-price-table-qty-button decrement'>-</button>
                            <input type="number" className='sol-price-table-qty-input' min={0} />
                            <button className='sol-price-table-qty-button increment'>+</button>
                          </td>
                          <td className='sol-price-table-data price text-center'>0</td>
                          <td className='text-center last-data sol-price-buy-now-btn-area'>
                            <button className='sol-price-buy-now-btn'>
                              <div className='sol-price-buy-now-btn-sub'>
                                Buy Now
                              </div>
                              <div className='sol-price-buy-now-arrow-area'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
                                  <path d="M2.56641 3.44987C6.17752 6.50543 15.5664 10.4499 24.2331 1.7832" stroke="#714F36" stroke-width="2" />
                                  <path d="M24.5618 1.45996C21.07 4.6512 15.9586 13.4593 23.4473 23.162" stroke="#714F36" stroke-width="2" />
                                  <path d="M1 26L25.1667 1" stroke="#714F36" stroke-width="2" />
                                </svg>
                              </div>
                            </button>
                          </td>
                        </tr>

                      </tbody>
                    </table>
                  </div>

                  <h6 className='sol-price-information'>
                    Beyond this, please contact the Sales department.
                  </h6>
                </div>
              </div> */}
              {/*  */}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>

  )
}

export default Packages
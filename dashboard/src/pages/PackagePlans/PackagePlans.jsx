import React, { useContext, useState } from "react";
import { useEffect } from "react";
import $ from "jquery";
import "./PackagePlans.css";
import "./PackagePlans-responsive.css";
import ClientLayout from "../../components/ClientLayout";
import Footer from "../../components/Footer";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import AuthContext from "../../context/AuthContext";
import axios from "axios";

const PackagePlans = () => {
  const [clientToken, setClientToken] = useState("");
  const { getProtectedData, getClientChoosenPlan, packageSelectionDetail } =
    useContext(AuthContext);
  const [employeeId, setEmployeeId] = useState("");
  const [loginClientDetail, setLoginClientDetail] = useState();
  const [packageType, setPackageType] = useState("");

  const [packageInfo, setPackageInfo] = useState();

  useEffect(() => {
    $(document).ready(function () {
      // Initial state
      $(".tab").hide();
      $("#tab1").addClass("active-tab"); // Show the first tab
      $(".pl--track-circle").eq(0).addClass("active"); // Highlight the first circle

      // Function to switch tabs and update the track area
      function switchTab(
        currentTab,
        nextTab,
        currentCircleIndex,
        nextCircleIndex,
        currentLineIndex,
        nextLineIndex
      ) {
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

      $(".starter-btn-area").hover(
        function () {
          $(".starter-info-area").addClass("hovered");
        },
        function () {
          $(".starter-info-area").removeClass("hovered");
        }
      );

      $(".professional-btn-area").hover(
        function () {
          $(".professional-info-area").addClass("hovered");
        },
        function () {
          $(".professional-info-area").removeClass("hovered");
        }
      );

      $(".premium-btn-area").hover(
        function () {
          $(".premium-info-area").addClass("hovered");
        },
        function () {
          $(".premium-info-area").removeClass("hovered");
        }
      );

      //for quantity input
      $(".sol-price-table-qty-input").val(0);

      $(".sol-price-table-qty-input").on("input", function () {
        var $input = $(this);
        var value = parseInt($input.val());

        if (value < 0) {
          $input.val(0);
        }
      });

      $(".sol-price-table-qty-button.decrement").on("click", function () {
        var $input = $(this).siblings(".sol-price-table-qty-input");
        var currentValue = parseInt($input.val());

        if (currentValue > 0) {
          $input.val(currentValue - 1);
        }
      });

      $(".sol-price-table-qty-button.increment").on("click", function () {
        var $input = $(this).siblings(".sol-price-table-qty-input");
        var currentValue = parseInt($input.val());
        $input.val(currentValue + 1);
      });

      $(".pl--package-btn-sub").click(function () {
        $("html, body").animate({ scrollTop: 0 }, 800);
      });
    });
  }, []);

  //for show success message for payment
  function showSuccessMessage(message) {
    Swal.fire({
      title: "Success!",
      text: message,
      icon: "success",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "OK",
    });
  }

  //for show error message for payment
  function showErrorMessage() {
    Swal.fire({
      title: "Error!",
      text: "Payment failed. Please try again.",
      icon: "error",
      confirmButtonColor: "#d33",
      confirmButtonText: "OK",
    });
  }

  useEffect(() => {
    setClientToken(JSON.parse(localStorage.getItem("clientToken")));
  }, [clientToken]);

  useEffect(() => {
    if (clientToken) {
      const fetchData = async () => {
        try {
          const user = await getProtectedData(clientToken);
          console.log(user);
          setEmployeeId(user.id);
        } catch (error) {
          console.log(error);
        }
      };

      fetchData();
    }
  }, [clientToken]);

  const getLoginClientDetail = async () => {
    try {
      const res = await axios.get(
        `https://skillety-n6r1.onrender.com/client/${employeeId}`,
        {
          headers: {
            Authorization: `Bearer ${clientToken}`,
            Accept: "application/json",
          },
        }
      );
      const result = res.data;
      if (!result.error) {
        console.log(result);
        setLoginClientDetail(result);
      } else {
        console.log(result);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (employeeId) {
      getLoginClientDetail();
    }
  }, [employeeId]);

  useEffect(() => {
    if (loginClientDetail?.companyId) {
      getClientChoosenPlan(loginClientDetail?.companyId);
    }
  }, [loginClientDetail?.companyId]);

  useEffect(() => {
    if (packageSelectionDetail) {
      setPackageType(packageSelectionDetail?.packageType);
    }
  }, [packageSelectionDetail]);

  const handleBuyMicro = () => {
    setPackageInfo({
      id: loginClientDetail?.companyId,
      packageType: "Micro",
      logins: "1",
      cvViews: "4",
      // jobPost:"2",
      amount: "32,804",
    });
  };

  const handleBuySmall = () => {
    setPackageInfo({
      id: loginClientDetail?.companyId,
      packageType: "Small",
      logins: "2",
      cvViews: "5",
      // jobPost:"3",
      amount: "91,568",
    });
  };

  const handleBuyLarge = () => {
    setPackageInfo({
      id: loginClientDetail?.companyId,
      packageType: "Large",
      logins: "4",
      cvViews: "6",
      // jobPost:"4",
      amount: "161,483",
    });
  };

  const handleBuy = () => {
    axios
      .post("https://skillety-n6r1.onrender.com/client-package-plan", packageInfo, {
        headers: {
          Authorization: `Bearer ${clientToken}`,
          Accept: "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
        showSuccessMessage(
          `Thank you for purchasing the ${packageInfo?.packageType} Package. Welcome onboard.`
        );
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        showErrorMessage();
      });
  };

  return (
    <div>
      {clientToken && (
        <div class="main-wrapper main-wrapper-1">
          <div class="navbar-bg"></div>

          <ClientLayout packageSelectionDetail={packageSelectionDetail} />

          <div class="main-content">
            <section class="section">
              <div className="my-app-section">
                <div className="admin-component-name">Plan Page</div>

                <div className="plans--section">
                  <div className="container-section">
                    <div className="custom--container">
                      <div className="plans--container">
                        <div className="plans--head-area">
                          <h4 className="plans--heading">UPGRADE YOUR PLAN</h4>
                          <div className="plans--sub-head">
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book.{" "}
                          </div>

                          <div className="plan--purchase-track-area">
                            <div className="pl--track-circle-area">
                              <div className="pl--track-circle active">
                                <span>1</span>
                              </div>
                              <h6 className="pl--track-status">Pick Plan</h6>
                            </div>

                            <div className="pl--track-line"></div>

                            <div className="pl--track-circle-area">
                              <div className="pl--track-circle">
                                <span>2</span>
                              </div>
                              <h6 className="pl--track-status">Add details</h6>
                            </div>

                            <div className="pl--track-line"></div>

                            <div className="pl--track-circle-area">
                              <div className="pl--track-circle">
                                <span>3</span>
                              </div>
                              <h6 className="pl--track-status">Pay</h6>
                            </div>
                          </div>
                        </div>

                        <div className="packages--area tab-content">
                          <div className="plan--detail-area tab" id="tab1">
                            <div className="row">
                              <div className="col-12 col-xl-3 col-lg-3 col-md-3 custom-width">
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
                                        Job Postings
                                      </h6>
                                    </div>

                                    <div>
                                      <h6 className="pl--package-title">
                                        Mass Mailers
                                      </h6>
                                    </div>

                                    <div>
                                      <h6 className="pl--package-title">
                                        Login IDs
                                      </h6>
                                    </div>

                                    <div>
                                      <h6 className="pl--package-title">
                                        <span className="with-bg">Total</span>
                                      </h6>
                                    </div>

                                    <div>
                                      <h6 className="pl--package-title">
                                        Early Bird Discount
                                      </h6>
                                    </div>

                                    <div>
                                      <h6 className="pl--package-title">
                                        Discounted Price
                                      </h6>
                                    </div>

                                    <div>
                                      <h6 className="pl--package-title">
                                        <span className="with-bg">GST</span>
                                      </h6>
                                    </div>

                                    <div>
                                      <h6 className="pl--package-title">
                                        Total Amount
                                      </h6>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 col-xl-3 col-lg-3 col-md-3 custom-width1">
                                <div className="pl--package-detail-area">
                                  <div
                                    className={
                                      packageType === "Micro"
                                        ? "pl--package-info-area active starter-info-area"
                                        : "pl--package-info-area starter-info-area"
                                    }
                                  >
                                    <img
                                      src="../assets/img/packages/Starter.png"
                                      className="pl--package-img"
                                      alt=""
                                    />
                                    <h5 className="pl--package-name">MICRO</h5>

                                    <div className="pl--package-mobile-flex">
                                      <h6 className="pl--package-mobile-title">
                                        CV Views
                                      </h6>
                                      <h6 className="pl--package-info">
                                        5,000
                                      </h6>
                                    </div>

                                    <div className="pl--package-mobile-flex">
                                      <h6 className="pl--package-mobile-title">
                                        Job Postings
                                      </h6>
                                      <h6 className="pl--package-info">
                                        UNLIMITED
                                      </h6>
                                    </div>

                                    {/* <div className='pl--package-mobile-flex'>
                                                                        <h6 className='pl--package-mobile-title'>Mass Mailers</h6>
                                                                        <h6 className='pl--package-info'>10,000</h6>
                                                                    </div> */}

                                    <div className="pl--package-mobile-flex">
                                      <h6 className="pl--package-mobile-title">
                                        Login IDs
                                      </h6>
                                      <h6 className="pl--package-info">01</h6>
                                    </div>

                                    <div className="pl--package-mobile-flex">
                                      <h6 className="pl--package-mobile-title">
                                        Total
                                      </h6>
                                      <h6 className="pl--package-info">
                                        Rs. 27,800
                                      </h6>
                                    </div>

                                    <div className="pl--package-mobile-flex">
                                      <h6 className="pl--package-mobile-title">
                                        Early Bird Discount
                                      </h6>
                                      <h6 className="pl--package-info">
                                        Rs. 0
                                      </h6>
                                    </div>

                                    <div className="pl--package-mobile-flex">
                                      <h6 className="pl--package-mobile-title">
                                        Discounted Price
                                      </h6>
                                      <h6 className="pl--package-info">
                                        Rs. 27,800
                                      </h6>
                                    </div>

                                    <div className="pl--package-mobile-flex">
                                      <h6 className="pl--package-mobile-title">
                                        GST
                                      </h6>
                                      <h6 className="pl--package-info">
                                        Rs. 5,004
                                      </h6>
                                    </div>

                                    <div className="pl--package-mobile-flex">
                                      <h6 className="pl--package-mobile-title">
                                        Total Amount
                                      </h6>
                                      <h6 className="pl--package-info">
                                        Rs. 32,804
                                      </h6>
                                    </div>
                                  </div>

                                  {packageType !== "Micro" && (
                                    <div className="pl--package-btn-area starter-btn-area">
                                      <button
                                        className="pl--package-btn-sub buy-now"
                                        onClick={handleBuyMicro}
                                      >
                                        <div className="pl--package-btn buy-now">
                                          Buy Now
                                        </div>
                                        <div className="pl--package-arrow-area buy-now">
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
                                  )}
                                </div>
                              </div>
                              <div className="col-12 col-xl-3 col-lg-3 col-md-3 custom-width1">
                                <div className="pl--package-detail-area">
                                  <div
                                    className={
                                      packageType === "Small"
                                        ? "pl--package-info-area active starter-info-area"
                                        : "pl--package-info-area starter-info-area"
                                    }
                                  >
                                    <img
                                      src="../assets/img/packages/Professional.png"
                                      className="pl--package-img"
                                      alt=""
                                    />
                                    <h5 className="pl--package-name">SMALL</h5>

                                    <div className="pl--package-mobile-flex">
                                      <h6 className="pl--package-mobile-title">
                                        CV Views
                                      </h6>
                                      <h6 className="pl--package-info">
                                        20,000
                                      </h6>
                                    </div>

                                    <div className="pl--package-mobile-flex">
                                      <h6 className="pl--package-mobile-title">
                                        Job Postings
                                      </h6>
                                      <h6 className="pl--package-info">
                                        UNLIMITED
                                      </h6>
                                    </div>

                                    {/* <div className='pl--package-mobile-flex'>
                                                                        <h6 className='pl--package-mobile-title'>Mass Mailers</h6>
                                                                        <h6 className='pl--package-info'>25,000</h6>
                                                                    </div> */}

                                    <div className="pl--package-mobile-flex">
                                      <h6 className="pl--package-mobile-title">
                                        Login IDs
                                      </h6>
                                      <h6 className="pl--package-info">02</h6>
                                    </div>

                                    <div className="pl--package-mobile-flex">
                                      <h6 className="pl--package-mobile-title">
                                        Total
                                      </h6>
                                      <h6 className="pl--package-info">
                                        Rs. 97,000
                                      </h6>
                                    </div>

                                    <div className="pl--package-mobile-flex">
                                      <h6 className="pl--package-mobile-title">
                                        Early Bird Discount
                                      </h6>
                                      <h6 className="pl--package-info">
                                        Rs. 19,400
                                      </h6>
                                    </div>

                                    <div className="pl--package-mobile-flex">
                                      <h6 className="pl--package-mobile-title">
                                        Discounted Price
                                      </h6>
                                      <h6 className="pl--package-info">
                                        Rs. 77,600
                                      </h6>
                                    </div>

                                    <div className="pl--package-mobile-flex">
                                      <h6 className="pl--package-mobile-title">
                                        GST
                                      </h6>
                                      <h6 className="pl--package-info">
                                        Rs. 13,968
                                      </h6>
                                    </div>

                                    <div className="pl--package-mobile-flex">
                                      <h6 className="pl--package-mobile-title">
                                        Total Amount
                                      </h6>
                                      <h6 className="pl--package-info">
                                        Rs. 91,568
                                      </h6>
                                    </div>
                                  </div>

                                  {packageType !== "Small" && (
                                    <div className="pl--package-btn-area professional-btn-area">
                                      <button
                                        className="pl--package-btn-sub buy-now"
                                        onClick={handleBuySmall}
                                      >
                                        <div className="pl--package-btn buy-now">
                                          Buy Now
                                        </div>
                                        <div className="pl--package-arrow-area buy-now">
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
                                  )}
                                </div>
                              </div>
                              <div className="col-12 col-xl-3 col-lg-3 col-md-3 custom-width1">
                                <div className="pl--package-detail-area">
                                  <div
                                    className={
                                      packageType === "Large"
                                        ? "pl--package-info-area active starter-info-area"
                                        : "pl--package-info-area starter-info-area"
                                    }
                                  >
                                    <img
                                      src="../assets/img/packages/premium.png"
                                      className="pl--package-img"
                                      alt=""
                                    />
                                    <h5 className="pl--package-name">LARGE</h5>

                                    <div className="pl--package-mobile-flex">
                                      <h6 className="pl--package-mobile-title">
                                        CV Views
                                      </h6>
                                      <h6 className="pl--package-info">
                                        40,000
                                      </h6>
                                    </div>

                                    <div className="pl--package-mobile-flex">
                                      <h6 className="pl--package-mobile-title">
                                        Job Postings
                                      </h6>
                                      <h6 className="pl--package-info">
                                        UNLIMITED
                                      </h6>
                                    </div>

                                    {/* <div className='pl--package-mobile-flex'>
                                                                        <h6 className='pl--package-mobile-title'>Mass Mailers</h6>
                                                                        <h6 className='pl--package-info'>50,000</h6>
                                                                    </div> */}

                                    <div className="pl--package-mobile-flex">
                                      <h6 className="pl--package-mobile-title">
                                        Login IDs
                                      </h6>
                                      <h6 className="pl--package-info">04</h6>
                                    </div>

                                    <div className="pl--package-mobile-flex">
                                      <h6 className="pl--package-mobile-title">
                                        Total
                                      </h6>
                                      <h6 className="pl--package-info">
                                        Rs. 195,500
                                      </h6>
                                    </div>

                                    <div className="pl--package-mobile-flex">
                                      <h6 className="pl--package-mobile-title">
                                        Early Bird Discount
                                      </h6>
                                      <h6 className="pl--package-info">
                                        Rs. 58,650
                                      </h6>
                                    </div>

                                    <div className="pl--package-mobile-flex">
                                      <h6 className="pl--package-mobile-title">
                                        Discounted Price
                                      </h6>
                                      <h6 className="pl--package-info">
                                        Rs. 136,850
                                      </h6>
                                    </div>

                                    <div className="pl--package-mobile-flex">
                                      <h6 className="pl--package-mobile-title">
                                        GST
                                      </h6>
                                      <h6 className="pl--package-info">
                                        Rs. 24,633
                                      </h6>
                                    </div>

                                    <div className="pl--package-mobile-flex">
                                      <h6 className="pl--package-mobile-title">
                                        Total Amount
                                      </h6>
                                      <h6 className="pl--package-info">
                                        Rs. 161,483
                                      </h6>
                                    </div>
                                  </div>

                                  {packageType !== "Large" && (
                                    <div className="pl--package-btn-area premium-btn-area">
                                      <button
                                        className="pl--package-btn-sub buy-now"
                                        onClick={handleBuyLarge}
                                      >
                                        <div className="pl--package-btn buy-now">
                                          Buy Now
                                        </div>
                                        <div className="pl--package-arrow-area buy-now">
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
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* <p className='pl--package-desc part'>*Base unit prices of all inventory heads are fixed and same for all the companies registered in India.</p> */}
                          </div>

                          <div className="pl--add-detail-area tab" id="tab2">
                            <div className="pl-package-detail-section">
                              <div className="pl-package-detail-head">
                                Package Detail
                              </div>
                              <div className="pl-package-detail-area">
                                <div className="row pl-package-row">
                                  <div className="col-6">
                                    <div className="pl-package-detail-title">
                                      Package Name
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="pl-package-detail-view-area">
                                      <div className="pl-package-detail-title">
                                        MICRO
                                      </div>
                                      <button
                                        type="button"
                                        className="pl-package-detail-view-btn"
                                        title="View More Detail.."
                                        data-toggle="modal"
                                        data-target="#package_detail_modal"
                                      >
                                        <i class="bi bi-eye-fill"></i>
                                      </button>
                                    </div>
                                  </div>
                                </div>

                                <div className="row pl-package-row">
                                  <div className="col-6">
                                    <div className="pl-package-detail-title">
                                      Total
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="pl-package-detail-title">
                                      Rs. 27,800
                                    </div>
                                  </div>
                                </div>

                                <div className="row pl-package-row">
                                  <div className="col-6">
                                    <div className="pl-package-detail-title">
                                      Early Bird Discount
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="pl-package-detail-title">
                                      Rs. 0
                                    </div>
                                  </div>
                                </div>

                                <div className="row pl-package-row">
                                  <div className="col-6">
                                    <div className="pl-package-detail-title">
                                      Discounted Price
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="pl-package-detail-title">
                                      Rs. 0
                                    </div>
                                  </div>
                                </div>

                                <div className="row pl-package-row no-border">
                                  <div className="col-6">
                                    <div className="pl-package-detail-title">
                                      GST - 18%
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="pl-package-detail-title">
                                      Rs. 5,004
                                    </div>
                                  </div>
                                </div>

                                <div className="row pl-package-row bottom">
                                  <div className="col-6">
                                    <div className="pl-package-detail-title">
                                      Total Amount
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="pl-package-detail-title">
                                      Rs. 32,804
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="pl--package-btn-area">
                              <button className="pl--package-btn-sub previous">
                                <div className="pl--package-arrow-area buy-now prev custom-mobile-d-none">
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
                                <div className="pl--package-btn buy-now">
                                  Previous
                                </div>
                              </button>

                              <button
                                className="pl--package-btn-sub next"
                                onClick={handleBuy}
                              >
                                <div className="pl--package-btn buy-now">
                                  Proceed to Pay
                                </div>
                                <div className="pl--package-arrow-area buy-now custom-mobile-d-none">
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

                          <div className="pl--pay-area tab" id="tab3">
                            <div className="pl--payment-section">
                              {/* if payment was success */}
                              <div className="pl-payment-area success">
                                <img
                                  src="assets/img/packages/payment-success.png"
                                  className="pl-payment-img"
                                  alt=""
                                />
                                <div className="pl-payment-message success">
                                  Payment Success..!
                                </div>
                              </div>

                              {/* if payment was success */}
                              {/* <div className="pl-payment-area failed">
                                                            <img src="assets/img/packages/payment-failed.png" className='pl-payment-img' alt="" />
                                                            <div className="pl-payment-message failed">Payment Failed..!</div>
                                                        </div> */}
                              {/*  */}
                            </div>
                            <div className="pl--package-btn-area">
                              <button className="pl--package-btn-sub">
                                {/* <div className='pl--package-arrow-area prev custom-mobile-d-none'>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 27 27" fill="none">
                                                                        <path d="M2.56641 3.44987C6.17752 6.50543 15.5664 10.4499 24.2331 1.7832" stroke="white" stroke-width="2" />
                                                                        <path d="M24.5618 1.45996C21.07 4.6512 15.9586 13.4593 23.4473 23.162" stroke="white" stroke-width="2" />
                                                                        <path d="M1 26L25.1667 1" stroke="white" stroke-width="2" />
                                                                        </svg>
                                                                    </div> */}
                                <div className="pl--package-btn buy-now">
                                  Done
                                </div>
                              </button>

                              {/* <button className='pl--package-btn-sub next' onClick={showSuccessMessage}>
                                                                    <div className='pl--package-btn'>
                                                                    Pay
                                                                    </div>
                                                                    <div className='pl--package-arrow-area custom-mobile-d-none'>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 27 27" fill="none">
                                                                        <path d="M2.56641 3.44987C6.17752 6.50543 15.5664 10.4499 24.2331 1.7832" stroke="white" stroke-width="2" />
                                                                        <path d="M24.5618 1.45996C21.07 4.6512 15.9586 13.4593 23.4473 23.162" stroke="white" stroke-width="2" />
                                                                        <path d="M1 26L25.1667 1" stroke="white" stroke-width="2" />
                                                                    </svg>
                                                                    </div>
                                                                </button> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* package detail modal here */}
                    <div
                      className="modal fade"
                      id="package_detail_modal"
                      tabindex="-1"
                      aria-labelledby="exampleModalLabel"
                      role="dialog"
                      aria-hidden="true"
                    >
                      <div
                        className="modal-dialog modal-dialog-centered"
                        role="document"
                      >
                        <div className="modal-content pl-pack-det-modal">
                          <div className="modal-header pl-pack-det-modal-header">
                            <h5
                              className="modal-title pl-pack-det-modal-head"
                              id="exampleModalLabel"
                            >
                              Package : <span>MICRO</span>
                            </h5>
                            <a
                              href="#"
                              type="button"
                              className="close modal-close-btn"
                              data-dismiss="modal"
                              aria-label="Close"
                            >
                              <span aria-hidden="true">
                                <i class="bi bi-x close-icon"></i>
                              </span>
                            </a>
                          </div>
                          <div className="modal-body pl-pack-det-modal-body">
                            <div className="row pr-3 pl-3">
                              <div className="table-responsive pl-pack-det-table-area">
                                <table className="table table-hover pl-pack-det-table">
                                  <thead>
                                    <tr className="pl-pack-det-table-row-head">
                                      <th>Includes</th>
                                      <th className="text-center">Quantity</th>
                                      <th className="text-right">
                                        Price (Rs.)
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr className="pl-pack-det-table-row">
                                      <td>CV Views</td>
                                      <td className="text-center">5,000</td>
                                      <td className="text-right">20,000</td>
                                    </tr>
                                    <tr className="pl-pack-det-table-row">
                                      <td>Job Postings</td>
                                      <td className="text-center">10</td>
                                      <td className="text-right">300</td>
                                    </tr>
                                    <tr className="pl-pack-det-table-row">
                                      <td>Mass Mailers</td>
                                      <td className="text-center">10,000</td>
                                      <td className="text-right">2,500</td>
                                    </tr>
                                    <tr className="pl-pack-det-table-row">
                                      <td>Login IDs</td>
                                      <td className="text-center">01</td>
                                      <td className="text-right">5,000</td>
                                    </tr>
                                  </tbody>
                                  <tfoot>
                                    <tr className="pl-pack-det-table-row-head">
                                      <th colSpan={2}>Total</th>
                                      <th className="text-right">27,800</th>
                                    </tr>
                                  </tfoot>
                                </table>
                              </div>
                            </div>
                          </div>
                          <div className="modal-footer pl-pack-det-modal-footer">
                            <button
                              type="button"
                              className="btn btn-close-btn"
                              data-dismiss="modal"
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/*  */}

                    <div className="sol-price-container">
                      <div className="term-con-area">
                        <p className="term-con">
                          By clicking on the Buy Now you are agreeing to
                          the&nbsp;
                          <a href="#">Terms & Conditions</a>
                        </p>

                        <p className="term-con mt-4 font-14">
                          We understand that one size doesn't fit all. So, we
                          have designed our Packages based on your journey
                          level. Please choose any package that fits your needs.
                          If you want a Customised package, please talk to our
                          Sales guys, who would be happy to help.{" "}
                        </p>
                      </div>
                      <div className="sol-price-area">
                        <h5 className="sol-price-heading">
                          SKILLETY SOLUTIONS PRICES
                        </h5>

                        <div className="table-responsive">
                          <table className="table sol-price-table">
                            <thead>
                              <tr className="sol-price-table-head-row">
                                <th className="sol-price-table-head text-start">
                                  Solutions
                                </th>
                                <th className="sol-price-table-head text-center">
                                  Unit Price (Rs.)
                                </th>
                                <th className="sol-price-table-head text-center">
                                  Select Quantity
                                </th>
                                <th className="sol-price-table-head text-center">
                                  Total Price (Rs.)
                                </th>
                                <th className="sol-price-table-head text-center"></th>
                              </tr>
                            </thead>

                            <tbody>
                              <tr className="sol-price-table-row">
                                <td className="sol-price-table-data first-data text-start">
                                  Screening calls by Bot
                                </td>
                                <td className="sol-price-table-data text-center">
                                  1.5
                                </td>
                                <td className="sol-price-table-data text-center sol-price-table-qty-area">
                                  <button className="sol-price-table-qty-button decrement">
                                    -
                                  </button>
                                  <input
                                    type="number"
                                    className="sol-price-table-qty-input"
                                    min={0}
                                    value={20}
                                  />
                                  <button className="sol-price-table-qty-button increment">
                                    +
                                  </button>
                                </td>
                                <td className="sol-price-table-data price text-center">
                                  0
                                </td>
                                <td className="text-center last-data sol-price-buy-now-btn-area">
                                  <button className="sol-price-buy-now-btn">
                                    <div className="sol-price-buy-now-btn-sub">
                                      Buy Now
                                    </div>
                                    <div className="sol-price-buy-now-arrow-area">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 27 27"
                                        fill="none"
                                      >
                                        <path
                                          d="M2.56641 3.44987C6.17752 6.50543 15.5664 10.4499 24.2331 1.7832"
                                          stroke="#714F36"
                                          stroke-width="2"
                                        />
                                        <path
                                          d="M24.5618 1.45996C21.07 4.6512 15.9586 13.4593 23.4473 23.162"
                                          stroke="#714F36"
                                          stroke-width="2"
                                        />
                                        <path
                                          d="M1 26L25.1667 1"
                                          stroke="#714F36"
                                          stroke-width="2"
                                        />
                                      </svg>
                                    </div>
                                  </button>
                                </td>
                              </tr>

                              <tr className="sol-price-table-row">
                                <td className="sol-price-table-data first-data text-start">
                                  Assessments
                                </td>
                                <td className="sol-price-table-data text-center">
                                  120
                                </td>
                                <td className="sol-price-table-data text-center sol-price-table-qty-area">
                                  <button className="sol-price-table-qty-button decrement">
                                    -
                                  </button>
                                  <input
                                    type="number"
                                    className="sol-price-table-qty-input"
                                    min={0}
                                    value={20}
                                  />
                                  <button className="sol-price-table-qty-button increment">
                                    +
                                  </button>
                                </td>
                                <td className="sol-price-table-data price text-center">
                                  0
                                </td>
                                <td className="text-center last-data sol-price-buy-now-btn-area">
                                  <button className="sol-price-buy-now-btn">
                                    <div className="sol-price-buy-now-btn-sub">
                                      Buy Now
                                    </div>
                                    <div className="sol-price-buy-now-arrow-area">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 27 27"
                                        fill="none"
                                      >
                                        <path
                                          d="M2.56641 3.44987C6.17752 6.50543 15.5664 10.4499 24.2331 1.7832"
                                          stroke="#714F36"
                                          stroke-width="2"
                                        />
                                        <path
                                          d="M24.5618 1.45996C21.07 4.6512 15.9586 13.4593 23.4473 23.162"
                                          stroke="#714F36"
                                          stroke-width="2"
                                        />
                                        <path
                                          d="M1 26L25.1667 1"
                                          stroke="#714F36"
                                          stroke-width="2"
                                        />
                                      </svg>
                                    </div>
                                  </button>
                                </td>
                              </tr>

                              <tr className="sol-price-table-row">
                                <td className="sol-price-table-data first-data text-start">
                                  Interviews (0-8 yrs)
                                </td>
                                <td className="sol-price-table-data text-center">
                                  1500
                                </td>
                                <td className="sol-price-table-data text-center sol-price-table-qty-area">
                                  <button className="sol-price-table-qty-button decrement">
                                    -
                                  </button>
                                  <input
                                    type="number"
                                    className="sol-price-table-qty-input"
                                    min={0}
                                  />
                                  <button className="sol-price-table-qty-button increment">
                                    +
                                  </button>
                                </td>
                                <td className="sol-price-table-data price text-center">
                                  0
                                </td>
                                <td className="text-center last-data sol-price-buy-now-btn-area">
                                  <button className="sol-price-buy-now-btn">
                                    <div className="sol-price-buy-now-btn-sub">
                                      Buy Now
                                    </div>
                                    <div className="sol-price-buy-now-arrow-area">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 27 27"
                                        fill="none"
                                      >
                                        <path
                                          d="M2.56641 3.44987C6.17752 6.50543 15.5664 10.4499 24.2331 1.7832"
                                          stroke="#714F36"
                                          stroke-width="2"
                                        />
                                        <path
                                          d="M24.5618 1.45996C21.07 4.6512 15.9586 13.4593 23.4473 23.162"
                                          stroke="#714F36"
                                          stroke-width="2"
                                        />
                                        <path
                                          d="M1 26L25.1667 1"
                                          stroke="#714F36"
                                          stroke-width="2"
                                        />
                                      </svg>
                                    </div>
                                  </button>
                                </td>
                              </tr>

                              <tr className="sol-price-table-row">
                                <td className="sol-price-table-data first-data text-start">
                                  Interviews (8.1-15 yrs)
                                </td>
                                <td className="sol-price-table-data text-center">
                                  2000
                                </td>
                                <td className="sol-price-table-data text-center sol-price-table-qty-area">
                                  <button className="sol-price-table-qty-button decrement">
                                    -
                                  </button>
                                  <input
                                    type="number"
                                    className="sol-price-table-qty-input"
                                    min={0}
                                  />
                                  <button className="sol-price-table-qty-button increment">
                                    +
                                  </button>
                                </td>
                                <td className="sol-price-table-data price text-center">
                                  0
                                </td>
                                <td className="text-center last-data sol-price-buy-now-btn-area">
                                  <button className="sol-price-buy-now-btn">
                                    <div className="sol-price-buy-now-btn-sub">
                                      Buy Now
                                    </div>
                                    <div className="sol-price-buy-now-arrow-area">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 27 27"
                                        fill="none"
                                      >
                                        <path
                                          d="M2.56641 3.44987C6.17752 6.50543 15.5664 10.4499 24.2331 1.7832"
                                          stroke="#714F36"
                                          stroke-width="2"
                                        />
                                        <path
                                          d="M24.5618 1.45996C21.07 4.6512 15.9586 13.4593 23.4473 23.162"
                                          stroke="#714F36"
                                          stroke-width="2"
                                        />
                                        <path
                                          d="M1 26L25.1667 1"
                                          stroke="#714F36"
                                          stroke-width="2"
                                        />
                                      </svg>
                                    </div>
                                  </button>
                                </td>
                              </tr>

                              <tr className="sol-price-table-row">
                                <td className="sol-price-table-data first-data text-start">
                                  Interviews (>15 yrs)
                                </td>
                                <td className="sol-price-table-data text-center">
                                  2500
                                </td>
                                <td className="sol-price-table-data text-center sol-price-table-qty-area">
                                  <button className="sol-price-table-qty-button decrement">
                                    -
                                  </button>
                                  <input
                                    type="number"
                                    className="sol-price-table-qty-input"
                                    min={0}
                                  />
                                  <button className="sol-price-table-qty-button increment">
                                    +
                                  </button>
                                </td>
                                <td className="sol-price-table-data price text-center">
                                  0
                                </td>
                                <td className="text-center last-data sol-price-buy-now-btn-area">
                                  <button className="sol-price-buy-now-btn">
                                    <div className="sol-price-buy-now-btn-sub">
                                      Buy Now
                                    </div>
                                    <div className="sol-price-buy-now-arrow-area">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 27 27"
                                        fill="none"
                                      >
                                        <path
                                          d="M2.56641 3.44987C6.17752 6.50543 15.5664 10.4499 24.2331 1.7832"
                                          stroke="#714F36"
                                          stroke-width="2"
                                        />
                                        <path
                                          d="M24.5618 1.45996C21.07 4.6512 15.9586 13.4593 23.4473 23.162"
                                          stroke="#714F36"
                                          stroke-width="2"
                                        />
                                        <path
                                          d="M1 26L25.1667 1"
                                          stroke="#714F36"
                                          stroke-width="2"
                                        />
                                      </svg>
                                    </div>
                                  </button>
                                </td>
                              </tr>

                              <tr className="sol-price-table-row">
                                <td className="sol-price-table-data first-data text-start">
                                  BGV Lite
                                </td>
                                <td className="sol-price-table-data text-center">
                                  1250
                                </td>
                                <td className="sol-price-table-data text-center sol-price-table-qty-area">
                                  <button className="sol-price-table-qty-button decrement">
                                    -
                                  </button>
                                  <input
                                    type="number"
                                    className="sol-price-table-qty-input"
                                    min={0}
                                  />
                                  <button className="sol-price-table-qty-button increment">
                                    +
                                  </button>
                                </td>
                                <td className="sol-price-table-data price text-center">
                                  0
                                </td>
                                <td className="text-center last-data sol-price-buy-now-btn-area">
                                  <button className="sol-price-buy-now-btn">
                                    <div className="sol-price-buy-now-btn-sub">
                                      Buy Now
                                    </div>
                                    <div className="sol-price-buy-now-arrow-area">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 27 27"
                                        fill="none"
                                      >
                                        <path
                                          d="M2.56641 3.44987C6.17752 6.50543 15.5664 10.4499 24.2331 1.7832"
                                          stroke="#714F36"
                                          stroke-width="2"
                                        />
                                        <path
                                          d="M24.5618 1.45996C21.07 4.6512 15.9586 13.4593 23.4473 23.162"
                                          stroke="#714F36"
                                          stroke-width="2"
                                        />
                                        <path
                                          d="M1 26L25.1667 1"
                                          stroke="#714F36"
                                          stroke-width="2"
                                        />
                                      </svg>
                                    </div>
                                  </button>
                                </td>
                              </tr>

                              <tr className="sol-price-table-row">
                                <td className="sol-price-table-data first-data text-start">
                                  BGV 360
                                </td>
                                <td className="sol-price-table-data text-center">
                                  3000
                                </td>
                                <td className="sol-price-table-data text-center sol-price-table-qty-area">
                                  <button className="sol-price-table-qty-button decrement">
                                    -
                                  </button>
                                  <input
                                    type="number"
                                    className="sol-price-table-qty-input"
                                    min={0}
                                  />
                                  <button className="sol-price-table-qty-button increment">
                                    +
                                  </button>
                                </td>
                                <td className="sol-price-table-data price text-center">
                                  0
                                </td>
                                <td className="text-center last-data sol-price-buy-now-btn-area">
                                  <button className="sol-price-buy-now-btn">
                                    <div className="sol-price-buy-now-btn-sub">
                                      Buy Now
                                    </div>
                                    <div className="sol-price-buy-now-arrow-area">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 27 27"
                                        fill="none"
                                      >
                                        <path
                                          d="M2.56641 3.44987C6.17752 6.50543 15.5664 10.4499 24.2331 1.7832"
                                          stroke="#714F36"
                                          stroke-width="2"
                                        />
                                        <path
                                          d="M24.5618 1.45996C21.07 4.6512 15.9586 13.4593 23.4473 23.162"
                                          stroke="#714F36"
                                          stroke-width="2"
                                        />
                                        <path
                                          d="M1 26L25.1667 1"
                                          stroke="#714F36"
                                          stroke-width="2"
                                        />
                                      </svg>
                                    </div>
                                  </button>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        <h6 className="sol-price-information">
                          Beyond this, please contact the Sales department.
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <Footer />
        </div>
      )}
    </div>
  );
};

export default PackagePlans;

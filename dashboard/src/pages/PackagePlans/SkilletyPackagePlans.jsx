import React, { useContext, useState } from "react";
import { useEffect } from "react";
import $ from "jquery";
import "./SkilletyPackagePlans.css";
import "./SkilletyPackagePlans-responsive.css";
import ClientLayout from "../../components/ClientLayout";
import Footer from "../../components/Footer";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import AuthContext from "../../context/AuthContext";
import axios from "axios";


const SkilletyPackagePlans = () => {
  const [clientToken, setClientToken] = useState("");
  const { getProtectedData, getClientChoosenPlan, packageSelectionDetail } =useContext(AuthContext);
  const [employeeId, setEmployeeId] = useState("");
  const [loginClientDetail, setLoginClientDetail] = useState();
  const [currentPackage, setCurrentPackage] = useState();

  const [packageInfo, setPackageInfo] = useState();
  const [serviceInfo, setServiceInfo] = useState();
  const [valueAddedServiceInfo, setValueAddedServiceInfo] = useState();

  const [allPackages, setAllPackages] = useState([]);

  useEffect(() => {
    // $(document).ready(function () {
      // // Initial state
      // $(".tab").hide();
      // $("#tab1").addClass("active-tab"); // Show the first tab
      // $(".pl--track-circle").eq(0).addClass("active"); // Highlight the first circle

      // // Function to switch tabs and update the track area
      // function switchTab(
      //   currentTab,
      //   nextTab,
      //   currentCircleIndex,
      //   nextCircleIndex,
      //   currentLineIndex,
      //   nextLineIndex
      // ) {
      //   $(currentTab).removeClass("active-tab");
      //   $(nextTab).addClass("active-tab");
      //   $(".pl--track-circle").eq(currentCircleIndex).removeClass("active");
      //   $(".pl--track-circle").eq(nextCircleIndex).addClass("active");
      //   $(".pl--track-line").eq(currentLineIndex).removeClass("active");
      //   $(".pl--track-line").eq(nextLineIndex).addClass("active");
      // }

      // // Buy Now button click event
      // $(".buy-now").click(function () {
      //   switchTab("#tab1", "#tab2", 1, 1, 1, 0);
      // });

      // // Next button click event
      // $(".next").click(function () {
      //   if ($("#tab2").hasClass("active-tab")) {
      //     switchTab("#tab2", "#tab3", 2, 2, 2, 1);
      //   }
      // });

      // // Previous button click event
      // $(".previous").click(function () {
      //   if ($("#tab2").hasClass("active-tab")) {
      //     switchTab("#tab2", "#tab1", 1, 0, 0);
      //   } else if ($("#tab3").hasClass("active-tab")) {
      //     switchTab("#tab3", "#tab2", 2, 1, 1, 2);
      //   }
      // });

      // $(".starter-btn-area").hover(
      //   function () {
      //     $(".starter-info-area").addClass("hovered");
      //   },
      //   function () {
      //     $(".starter-info-area").removeClass("hovered");
      //   }
      // );

      // $(".test-btn-area").hover(
      //   function () {
      //     $(".test-info-area").addClass("hovered");
      //   },
      //   function () {
      //     $(".test-info-area").removeClass("hovered");
      //   }
      // );

      // $(".professional-btn-area").hover(
      //   function () {
      //     $(".professional-info-area").addClass("hovered");
      //   },
      //   function () {
      //     $(".professional-info-area").removeClass("hovered");
      //   }
      // );

      // $(".premium-btn-area").hover(
      //   function () {
      //     $(".premium-info-area").addClass("hovered");
      //   },
      //   function () {
      //     $(".premium-info-area").removeClass("hovered");
      //   }
      // );

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

      // $(".pl--package-btn-sub").click(function () {
      //   $("html, body").animate({ scrollTop: 0 }, 800);
      // });
    // });
  }, [packageInfo]);

  const [activeTab, setActiveTab] = useState(1);
  const [activeServiceTab, setActiveServiceTab] = useState(1);
  const [activeValServiceTab, setActiveValServiceTab] = useState(1);

  const [quantity, setQuantity] = useState(
    {
      cvViews:0,
      logins:0,
      activeJobs:0
    }
  );

  const [quantitySVAS, setQuantitySVAS] = useState(
    {
      OnlineTechnicalAssessment:0,
      L1Interview_0to8yrs:0,
      L1Interview_8to15yrs:0,
      L1Interview_above15yrs:0,
      BGVComprehensive:0
    }
  );
  const [validity, setValidity] = useState(
    {
      cvViews:1,
      logins:0,
      activeJobs:0
    }
  );

  const [total, setTotal] = useState({
    cvViews:0,
      logins:0,
      activeJobs:0
  })

  const [totalSVAS, setTotalSVAD] = useState({
    OnlineTechnicalAssessment:0,
      L1Interview_0to8yrs:0,
      L1Interview_8to15yrs:0,
      L1Interview_above15yrs:0,
      BGVComprehensive:0
  })

  console.log(quantity);
  console.log(validity);

    const switchTab = (tabIndex) => {
      setActiveTab(tabIndex);
    };

    const switchServiceTab = (tabIndex) => {
      setActiveServiceTab(tabIndex);
    };

    const switchValServiceTab = (tabIndex) => {
      setActiveValServiceTab(tabIndex);
    };

    const handleDoneclick = () => {
      switchTab(1);

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    };

    useEffect(()=>{
      if(quantity.cvViews, validity.cvViews){
        const servicePrice = parseInt(quantity.cvViews)*5 
        const discount = parseInt(validity.cvViews) <= 3 ? "0" : 3 < parseInt(validity.cvViews) <= 6 ? "5" : "10"
        const discountAmount = parseInt(servicePrice)*parseInt(discount)/100
        const GSTAmount = (parseInt(servicePrice) - discountAmount)*(allPackages[0]?.GST)/100

        setTotal({...total, cvViews:servicePrice-discountAmount+GSTAmount ? servicePrice-discountAmount+GSTAmount : 0});
      }else{
        setTotal({...total, cvViews:0});
      }
      
      
    },[quantity.cvViews, validity.cvViews])

    useEffect(()=>{
      if(quantity.logins, validity.logins){
        const servicePrice = parseInt(quantity.logins)*1000
        const discount = parseInt(validity.logins) <= 3 ? "0" : 3 < parseInt(validity.logins) <= 6 ? "5" : "10"
        const discountAmount = parseInt(servicePrice)*parseInt(discount)/100
        const GSTAmount = (parseInt(servicePrice) - discountAmount)*(allPackages[0]?.GST)/100

        setTotal({...total, logins:servicePrice-discountAmount+GSTAmount ? servicePrice-discountAmount+GSTAmount : 0});
      }else{
        setTotal({...total, logins:0});
      }
      
      
    },[quantity.logins, validity.logins])

    useEffect(()=>{
      if(quantity.activeJobs, validity.activeJobs){
        const servicePrice = parseInt(quantity.activeJobs)*100
        const discount = parseInt(validity.activeJobs) <= 3 ? "0" : 3 < parseInt(validity.activeJobs) <= 6 ? "5" : "10"
        const discountAmount = parseInt(servicePrice)*parseInt(discount)/100
        const GSTAmount = (parseInt(servicePrice) - discountAmount)*(allPackages[0]?.GST)/100

        setTotal({...total, activeJobs:servicePrice-discountAmount+GSTAmount ? servicePrice-discountAmount+GSTAmount : 0});
      }else{
        setTotal({...total, activeJobs:0});
      }
      
      
    },[quantity.activeJobs, validity.activeJobs])

    useEffect(()=>{
      if(quantitySVAS.OnlineTechnicalAssessment){
        const servicePrice = parseInt(quantitySVAS.OnlineTechnicalAssessment)*120
        const GSTAmount = (parseInt(servicePrice))*(allPackages[0]?.GST)/100

        setTotalSVAD({...totalSVAS, OnlineTechnicalAssessment:servicePrice+GSTAmount ? servicePrice+GSTAmount : 0});
      }else{
        setTotalSVAD({...totalSVAS, OnlineTechnicalAssessment:0});
      }
      
      
    },[quantitySVAS.OnlineTechnicalAssessment])

    useEffect(()=>{
      if(quantitySVAS.L1Interview_0to8yrs){
        const servicePrice = parseInt(quantitySVAS.L1Interview_0to8yrs)*1500
        const GSTAmount = (parseInt(servicePrice))*(allPackages[0]?.GST)/100

        setTotalSVAD({...totalSVAS, L1Interview_0to8yrs:servicePrice+GSTAmount ? servicePrice+GSTAmount : 0});
      }else{
        setTotalSVAD({...totalSVAS, L1Interview_0to8yrs:0});
      }
      
      
    },[quantitySVAS.L1Interview_0to8yrs])

    useEffect(()=>{
      if(quantitySVAS.L1Interview_8to15yrs){
        const servicePrice = parseInt(quantitySVAS.L1Interview_8to15yrs)*2000
        const GSTAmount = (parseInt(servicePrice))*(allPackages[0]?.GST)/100

        setTotalSVAD({...totalSVAS, L1Interview_8to15yrs:servicePrice+GSTAmount ? servicePrice+GSTAmount : 0});
      }else{
        setTotalSVAD({...totalSVAS, L1Interview_8to15yrs:0});
      }
      
      
    },[quantitySVAS.L1Interview_8to15yrs])

    useEffect(()=>{
      if(quantitySVAS.L1Interview_above15yrs){
        const servicePrice = parseInt(quantitySVAS.L1Interview_above15yrs)*2500
        const GSTAmount = (parseInt(servicePrice))*(allPackages[0]?.GST)/100

        setTotalSVAD({...totalSVAS, L1Interview_above15yrs:servicePrice+GSTAmount ? servicePrice+GSTAmount : 0});
      }else{
        setTotalSVAD({...totalSVAS, L1Interview_above15yrs:0});
      }
      
      
    },[quantitySVAS.L1Interview_above15yrs])

    useEffect(()=>{
      if(quantitySVAS.BGVComprehensive){
        const servicePrice = parseInt(quantitySVAS.BGVComprehensive)*3500
        const GSTAmount = (parseInt(servicePrice))*(allPackages[0]?.GST)/100

        setTotalSVAD({...totalSVAS, BGVComprehensive:servicePrice+GSTAmount ? servicePrice+GSTAmount : 0});
      }else{
        setTotalSVAD({...totalSVAS, BGVComprehensive:0});
      }
      
      
    },[quantitySVAS.BGVComprehensive])

    ////for buy service
    const handleServiceBuyNowClick = (serviceName, quantity, validity) => {
      if(quantity && validity){
        switchServiceTab(2);
        const unitPrice = serviceName === "CVViews" ? 5 : serviceName === "LoginIDs" ? 1000 : 100;
        const servicePrice = parseInt(quantity)*unitPrice 
        const discount = parseInt(validity) <= 3 ? "0" : 3 < parseInt(validity) <= 6 ? "5" : "10"
        const discountAmount = parseInt(servicePrice)*parseInt(discount)/100
        const GSTAmount = (parseInt(servicePrice) - discountAmount)*(allPackages[0]?.GST)/100
        setServiceInfo({
          id: loginClientDetail?.companyId,
          serviceName,
          quantity:parseInt(quantity),
          validity:parseInt(validity),
          servicePrice:servicePrice.toString(),
          finalAmount:(parseInt(servicePrice)-discountAmount+GSTAmount).toString(),
          discount,
          discountAmount:discountAmount.toString(),
          GST:allPackages[0]?.GST.toString(),
          GSTAmount:GSTAmount.toString()
        });
      }
      
    };

    const handleServicePreviousClick = () => {
      setServiceInfo()
      if (activeServiceTab === 2) {
        switchServiceTab(1);
      } else if (activeServiceTab === 3) {
        switchServiceTab(2);
      }
    };

    const handleServicePayClick = () => {
      if (activeServiceTab === 2) {
        handleBuyService()
      }
    };

    const handleServiceDoneclick = () => {
      switchServiceTab(1);
    };
    ///


    ////for buy value service buy
    const handleValServiceBuyNowClick = (serviceName, quantity) => {
      
      if(quantity ){
        switchValServiceTab(2);
        const unitPrice = serviceName === "OnlineTechnicalAssessment" ? 120 : serviceName === "L1Interview(0to8yrs)" ? 1500 : serviceName === "L1Interview(8to15yrs)" ? 2000 : serviceName === "L1Interview(>15yrs)" ? 2500 : 3500;
        const servicePrice = parseInt(quantity)*unitPrice 
        
        const GSTAmount = (parseInt(servicePrice))*(allPackages[0]?.GST)/100
        setValueAddedServiceInfo({
          id: loginClientDetail?.companyId,
          serviceName,
          quantity:parseInt(quantity),
          servicePrice:servicePrice.toString(),
          finalAmount:(parseInt(servicePrice)+GSTAmount).toString(),
          GST:allPackages[0]?.GST.toString(),
          GSTAmount:GSTAmount.toString()
        });

      }
    };

    const handleValServicePreviousClick = () => {
      setValueAddedServiceInfo()
      if (activeValServiceTab === 2) {
        switchValServiceTab(1);
      } else if (activeValServiceTab === 3) {
        switchValServiceTab(2);
      }
    };

    const handleValServicePayClick = () => {
      if (activeValServiceTab === 2) {
        handleBuyValueAddedService()
        
      }
    };

    const handleValServiceDoneclick = () => {
      switchValServiceTab(1);
    };
    ///

    // const handleBuyNowClick = () => {
    //   switchTab(2);
    // };

    // const handleNextClick = () => {
    //   if (activeTab === 2) {
    //     switchTab(3);
    //   }
    // };

    const handlePreviousClick = () => {
      if (activeTab === 2) {
        switchTab(1);
      } else if (activeTab === 3) {
        switchTab(2);
      }
    
      setPackageInfo();

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    };

  const [isTestInfoHovered, setIsTestInfoHovered] = useState(false);
  const [isStarterInfoHovered, setIsStarterInfoHovered] = useState(false);
  const [isScaleInfoHovered, setIsScaleInfoHovered] = useState(false);
  const [isGrowInfoHovered, setIsGrowInfoHovered] = useState(false);

  // const handleChange = (e) => {
  //   let inputValue = e.target.value;
  //   // setQuantity({...quantity, cvViews:inputValue})
  // //   if (isNaN(inputValue) || inputValue < 1000) {
  // //     inputValue = 1000;
  // // }
  // setQuantity({...quantity, cvViews: inputValue})

  // }

  
    // setInterval(()=>{
    //   if(quantity.cvViews <= 1000 && 0 <= validity.cvViews <= 3){
    //     setQuantity({...quantity, cvViews:1000})
    //   }else if(quantity.cvViews <= 5000 && 4 <= validity.cvViews <= 7){
    //     setQuantity({...quantity, cvViews:5000})
    //   }else if(quantity.cvViews <= 10000 &&  validity.cvViews > 7 ){
    //     setQuantity({...quantity, cvViews:10000})
    //   }
    // },2000)
    
 


  useEffect(()=>{
  
    axios.get("https://skillety-n6r1.onrender.com//all-packages")
    .then(res=>{
      console.log(res.data);
      setAllPackages(res.data);
    }).catch(err=>console.log(err));
  },[clientToken])  

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
  function showErrorMessage(message) {
    Swal.fire({
      title: "Payment failed. Please try again!",
      text: message,
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
          window.location.href = 'https://skillety-frontend-wcth.onrender.com/client-login'
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
      getClientChoosenPlan(loginClientDetail?.companyId, clientToken);
    }
  }, [loginClientDetail?.companyId]);

  useEffect(() => {
    if (packageSelectionDetail) {
      console.log(packageSelectionDetail);
      setCurrentPackage(packageSelectionDetail);
    }
  }, [packageSelectionDetail]);

  const handleBuying = (packageType, cvViews, logins, activeJobs, validity, amount, realPrice, offerPrice, GST, GSTAmount) => {
    setPackageInfo({
      id: loginClientDetail?.companyId,
      packageType,
      logins,
      cvViews,
      activeJobs,
      validity,
      amount,
      realPrice,
      offerPrice,
      GST,
      GSTAmount
    });

    switchTab(2);

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // const handleBuyingService = (serviceName, quantity, validity, servicePrice, finalAmount, discount, discountAmount, GST, GSTAmount) => {
  //   setServiceInfo({
  //     id: loginClientDetail?.companyId,
  //     serviceName,
  //     quantity,
  //     validity,
  //     servicePrice,
  //     finalAmount,
  //     discount,
  //     discountAmount,
  //     GST,
  //     GSTAmount
  //   });
  // };

  // const handleBuyingValueAddedService = (serviceName, quantity, validity, servicePrice, finalAmount, discount, discountAmount, GST, GSTAmount) => {
  //   setValueAddedServiceInfo({
  //     id: loginClientDetail?.companyId,
  //     serviceName,
  //     quantity,
  //     servicePrice,
  //     finalAmount,
  //     GST,
  //     GSTAmount
  //   });
  // };

  const handleBuy = () => {
    axios
      .post("https://skillety-n6r1.onrender.com//client-package-plan", packageInfo, {
        headers: {
          Authorization: `Bearer ${clientToken}`,
          Accept: "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
        showSuccessMessage(
          `Thank you for choosing the ${packageInfo?.packageType} Package. Welcome aboard!`
        );

        if (activeTab === 2) {
          switchTab(3);
        }
        
        setTimeout(()=>{
          window.location.reload();
        },3000)
        
      })
      .catch((err) => {
        console.log(err);
        showErrorMessage(err.response.data.error);
      });

      

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
  }; 

  const handleBuyService = () => {
    axios
      .post("https://skillety-n6r1.onrender.com/client-skillety-service", serviceInfo, {
        headers: {
          Authorization: `Bearer ${clientToken}`,
          Accept: "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
        showSuccessMessage(
          `Thank you for choosing the ${serviceInfo?.serviceName}. Welcome aboard!`
        );
        
        setTimeout(()=>{
          switchServiceTab(3);
          // window.location.reload();
        },3000)
        
      })
      .catch((err) => {
        console.log(err);
        showErrorMessage(err.response.data.error);
      });
  }; 

  const handleBuyValueAddedService = () => {
    axios
      .post("https://skillety-n6r1.onrender.com/client-skillety-value-added-service", valueAddedServiceInfo, {
        headers: {
          Authorization: `Bearer ${clientToken}`,
          Accept: "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
        showSuccessMessage(
          `Thank you for choosing the ${valueAddedServiceInfo?.serviceName}. Welcome aboard!`
        );
        
        setTimeout(()=>{
          switchValServiceTab(3);
          // window.location.reload();
        },3000)
        
      })
      .catch((err) => {
        console.log(err);
        showErrorMessage(err.response.data.error);
      });
  }; 

  // const handleDecreaseCvViews = () => {
    
  //   setQuantity({...quantity, cvViews:quantity.cvViews-1})

  // }




  return (
    <div>
      
        <div class="main-wrapper main-wrapper-1">
          <div class="navbar-bg"></div>

          <ClientLayout  />

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
                              <div className={`pl--track-circle ${activeTab === 1 || activeTab === 2 || activeTab === 3 ? 'active' : ''}`}>
                                <span>1</span>
                              </div>
                              <h6 className="pl--track-status">Pick Plan</h6>
                            </div>

                            <div className={`pl--track-line  ${activeTab === 2 || activeTab === 3 ? 'active' : ''}`}></div>

                            <div className="pl--track-circle-area">
                              <div className={`pl--track-circle ${activeTab === 2 || activeTab === 3 ? 'active' : ''}`}>
                                <span>2</span>
                              </div>
                              <h6 className="pl--track-status">Add details</h6>
                            </div>

                            <div className={`pl--track-line  ${activeTab === 3 ? 'active' : ''}`}></div>

                            <div className="pl--track-circle-area">
                              <div className={`pl--track-circle ${activeTab === 3 ? 'active' : ''}`}>
                                <span>3</span>
                              </div>
                              <h6 className="pl--track-status">Pay</h6>
                            </div>
                          </div>
                        </div> 

                        <div className="packages--area tab-content">
                          <div className={`plan--detail-area tab ${activeTab === 1 ? 'active-tab' : ''}`} id="tab1">
                            <div className="row package-row">
                              <div className="col-12 col-xl-2 col-lg-2 col-md-2 custom-width">
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

                                    <div className="pt-4">
                                      <h6 className="pl--package-title">
                                        <span className="with-bg">GST</span>
                                      </h6>
                                    </div>

                                    <div>
                                      <h6 className="pl--package-title">
                                        <b>Total Amount</b>
                                      </h6>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {allPackages.map((pack)=>{
                                return(
                                  <div className="col-12 col-xl-2 col-lg-2 col-md-2 custom-width1"
                                  key={pack.id}>
                                    <div className={(currentPackage?.packageType === pack.packageType) ? "pl--package-detail-area active" : "pl--package-detail-area"}>
                                      <div
                                        className={(currentPackage?.packageType === pack.packageType) ? "pl--package-info-area active" : `pl--package-info-area`}
                                      >
                                        <img
                                          src={pack.packageType === "Test" ? "../assets/img/packages/Starter.png" : pack.packageType === "Start" ? "../assets/img/packages/Starter.png" :  pack.packageType === "Scale" ? "../assets/img/packages/Professional.png" :  "../assets/img/packages/premium.png"}
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

                                        <div className="pl--package-mobile-flex">
                                          <h6 className="pl--package-mobile-title">
                                            GST
                                          </h6>
                                          <h6 className="pl--package-info">
                                            {pack.GST}%
                                          </h6>
                                        </div>

                                        <div className="pl--package-mobile-flex">
                                          <h6 className="pl--package-mobile-title">
                                            <b>Total Amount</b>
                                          </h6>
                                          <h6 className="pl--package-info">
                                            <b>{pack.amount}</b>
                                          </h6>
                                        </div>
                                      </div>


                                        <div className="pl--package-btn-area test-btn-area">
                                          <button
                                            className="pl--package-btn-sub buy-now"
                                            onClick={()=>handleBuying(pack.packageType, pack.cvViews, pack.logins, pack.activeJobs, pack.validity, pack.amount, pack.realPrice, pack.offerPrice, pack.GST, pack.offerPrice*(pack.GST/100))}
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

                            {/* <p className='pl--package-desc part'>*Base unit prices of all inventory heads are fixed and same for all the companies registered in India.</p> */}
                          </div>

                          <div className={`pl--add-detail-area tab ${activeTab === 2 ? 'active-tab' : ''}`} id="tab2">
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
                                        {packageInfo?.packageType}
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
                                      Real Price
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="pl-package-detail-title line-through">
                                      {packageInfo?.realPrice}
                                    </div>
                                  </div>
                                </div>

                                <div className="row pl-package-row">
                                  <div className="col-6">
                                    <div className="pl-package-detail-title">
                                      Inaugural Offer Price
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="pl-package-detail-title">
                                      {packageInfo?.offerPrice}
                                    </div>
                                  </div>
                                </div>

                                <div className="row pl-package-row no-border">
                                  <div className="col-6">
                                    <div className="pl-package-detail-title">
                                      GST - {packageInfo?.GST}%
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="pl-package-detail-title">
                                      INR {packageInfo?.GSTAmount}
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
                                    {packageInfo?.amount}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="pl--package-btn-area">
                              <button className="pl--package-btn-sub previous" onClick={handlePreviousClick}>
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
                                <div className="pl--package-btn buy-now"
                                onClick={()=>setPackageInfo()}>
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

                          <div className={`pl--pay-area tab ${activeTab === 3 ? 'active-tab' : ''}`} id="tab3">
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

                              {/* if payment was failed */}
                            {/* <div className="pl-payment-area failed">
                                  <img src="assets/img/packages/payment-failed.png" className='pl-payment-img' alt="" />
                                  <div className="pl-payment-message failed">Payment Failed..!</div>
                              </div> */}
                              {/*  */}
                            </div>
                            <div className="pl--package-btn-area">
                              <button className="pl--package-btn-sub" onClick={handleDoneclick}>
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
                              Package : <span>{packageInfo?.packageType}</span>
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
                                      {/* <th className="text-right">
                                        Price (Rs.)
                                      </th> */}
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr className="pl-pack-det-table-row">
                                      <td>CV Views</td>
                                      <td className="text-center">{packageInfo?.cvViews}</td>
                                      {/* <td className="text-right">20,000</td> */}
                                    </tr>
                                    <tr className="pl-pack-det-table-row">
                                      <td>Login ID</td>
                                      <td className="text-center">{packageInfo?.logins}</td>
                                      {/* <td className="text-right">300</td> */}
                                    </tr>
                                    <tr className="pl-pack-det-table-row">
                                      <td>Active Jobs</td>
                                      <td className="text-center">{packageInfo?.activeJobs}</td>
                                      {/* <td className="text-right">2,500</td> */}
                                    </tr>
                                    <tr className="pl-pack-det-table-row">
                                      <td>Validity in Days</td>
                                      <td className="text-center">{packageInfo?.validity}</td>
                                      {/* <td className="text-right">5,000</td> */}
                                    </tr>
                                  </tbody>
                                  {/* <tfoot>
                                    <tr className="pl-pack-det-table-row-head">
                                      <th colSpan={2}>Total</th>
                                      <th className="text-right">27,800</th>
                                    </tr>
                                  </tfoot> */}
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
                          <a href="/terms-and-conditions" target="_blank">Terms & Conditions</a>
                        </p>

                        <p className="term-con mt-4 font-14">
                          We understand that one size doesn't fit all. So, we
                          have designed our Packages based on your journey
                          level. Please choose any package that fits your needs.
                          If you want a Customised package, please talk to our
                          Sales guys, who would be happy to help.{" "}
                        </p>
                      </div>
                      <div className="sol-price-area mb-5">
                        <h5 className="sol-price-heading">
                          SKILLETY SERVICES PRICES
                        </h5>

                        <div className={`table-responsive tab ${activeServiceTab === 1 ? 'active-tab' : ''}`}>
                          <table className="table sol-price-table">
                            <thead>
                              <tr className="sol-price-table-head-row">
                                <th className="sol-price-table-head text-start">
                                  Services
                                </th>
                                {/* <th className="sol-price-table-head text-center">
                                  Quantity
                                </th> */}
                                <th className="sol-price-table-head text-center">
                                  Select Quantity
                                </th>

                                <th className="sol-price-table-head text-center">
                                  Select Validity
                                </th>

                                <th className="sol-price-table-head text-center">
                                  Total Price (INR)
                                </th>
                                <th className="sol-price-table-head text-center"></th>
                              </tr>
                            </thead>

                            <tbody>
                              <tr className="sol-price-table-row">
                                <td className="sol-price-table-data first-data text-start">
                                  CV Views
                                </td>
                                {/* <td className="sol-price-table-data text-center">
                                  5000
                                </td> */}
                                <td className="sol-price-table-data text-center sol-price-table-qty-area">
                                  {/* <button className="sol-price-table-qty-button decrement"
                                  
                                  >
                                    -
                                  </button> */}
                                  <input
                                    type="number"
                                    className="sol-price-table-qty-input"
                                    // min={1000}
                                    // value={quantity.cvViews < 1000 ? 1000 : quantity.cvViews}
                                    value={quantity.cvViews}
        //                             onChange={(e)=>{
        //                               const inputValue = parseInt(e.target.value);
        // setQuantity({...quantity, cvViews: isNaN(inputValue) || inputValue < 1000 ? 1000:inputValue})
        //                             }
        //                             }
                                  onChange={(e)=>setQuantity({...quantity, cvViews: e.target.value})}
                                  />
                                  {/* <button className="sol-price-table-qty-button increment"
                                 
                                  >
                                    +
                                  </button> */}
                                </td>
                                <td className="sol-price-table-data text-center sol-price-table-qty-area">
                                  <button className="sol-price-table-qty-button decrement"
                                  onClick={()=>{
                                   setValidity({...validity, cvViews:validity.cvViews-1})
                                  }}
                                  disabled={validity.cvViews === 1}
                                  >
                                    -
                                  </button>
                                  <input
                                    type="number"
                                    className="sol-price-table-qty-input"
                                    value={validity.cvViews}
                                  />
                                  <button className="sol-price-table-qty-button increment"
                                 onClick={()=>{
                                  setValidity({...validity, cvViews:validity.cvViews+1})
                                 }}
                                 disabled={validity.cvViews === 12}
                                  >
                                    +
                                  </button>
                                </td>
                                <td className="sol-price-table-data price text-center">
                                  {total.cvViews}
                                </td>
                                <td className="text-center last-data sol-price-buy-now-btn-area">
                                  <button className="sol-price-buy-now-btn" onClick={()=>handleServiceBuyNowClick("CVViews", quantity.cvViews, validity.cvViews)}
                                  >
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
                                  Login IDs
                                </td>
                                {/* <td className="sol-price-table-data text-center">
                                  05
                                </td> */}
                                <td className="sol-price-table-data text-center sol-price-table-qty-area">
                                  {/* <button className="sol-price-table-qty-button decrement">
                                    -
                                  </button> */}
                                  <input
                                    type="number"
                                    className="sol-price-table-qty-input"
                                    // min={0}
                                    // value={20}
                                    value={quantity.logins}
                                    onChange={(e)=>setQuantity({...quantity, logins: e.target.value})}
                                  />
                                  {/* <button className="sol-price-table-qty-button increment">
                                    +
                                  </button> */}
                                </td>

                                <td className="sol-price-table-data text-center sol-price-table-qty-area">
                                  {/* <button className="sol-price-table-qty-button decrement">
                                    -
                                  </button> */}
                                  <input
                                    type="number"
                                    className="sol-price-table-qty-input"
                                    // min={0}
                                    // value={20}
                                    value={validity.logins}
                                    onChange={(e)=>setValidity({...validity, logins:e.target.value})}
                                  />
                                  {/* <button className="sol-price-table-qty-button increment">
                                    +
                                  </button> */}
                                </td>

                                <td className="sol-price-table-data price text-center">
                                  {total.logins}
                                </td>
                                <td className="text-center last-data sol-price-buy-now-btn-area">
                                  <button className="sol-price-buy-now-btn"  onClick={()=>handleServiceBuyNowClick("LoginIDs", quantity.logins, validity.logins)}
                                  >
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
                                  Job Postings
                                </td>
                                {/* <td className="sol-price-table-data text-center">
                                  0
                                </td> */}
                                <td className="sol-price-table-data text-center sol-price-table-qty-area">
                                  {/* <button className="sol-price-table-qty-button decrement">
                                    -
                                  </button> */}
                                  <input
                                    type="number"
                                    className="sol-price-table-qty-input"
                                    // min={0}
                                    value={quantity.activeJobs}
                                    onChange={(e)=>setQuantity({...quantity, activeJobs: e.target.value})}
                                  />
                                  {/* <button className="sol-price-table-qty-button increment">
                                    +
                                  </button> */}
                                </td>

                                <td className="sol-price-table-data text-center sol-price-table-qty-area">
                                  {/* <button className="sol-price-table-qty-button decrement">
                                    -
                                  </button> */}
                                  <input
                                    type="number"
                                    className="sol-price-table-qty-input"
                                    // min={0}
                                    value={validity.activeJobs}
                                    onChange={(e)=>setValidity({...validity, activeJobs:e.target.value})}
                                  />
                                  {/* <button className="sol-price-table-qty-button increment">
                                    +
                                  </button> */}
                                </td>

                                <td className="sol-price-table-data price text-center">
                                {total.activeJobs}
                                </td>
                                <td className="text-center last-data sol-price-buy-now-btn-area">
                                  <button className="sol-price-buy-now-btn" onClick={()=>handleServiceBuyNowClick("JobPostings", quantity.activeJobs, validity.activeJobs)}>
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

                        <div className={`pl--add-detail-area mt-5 tab ${activeServiceTab === 2 ? 'active-tab' : ''}`}>
                            <div className="pl-package-detail-section">
                              <div className="pl-package-detail-head">
                                Package Detail
                              </div>
                              <div className="pl-package-detail-area">
                                <div className="row pl-package-row">
                                  <div className="col-6">
                                    <div className="pl-package-detail-title">
                                      Service
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="pl-package-detail-view-area">
                                      <div className="pl-package-detail-title">
                                        {serviceInfo?.serviceName}
                                      </div>
                                      {/* <button
                                        type="button"
                                        className="pl-package-detail-view-btn"
                                        title="View More Detail.."
                                        data-toggle="modal"
                                        data-target="#package_detail_modal"
                                      >
                                        <i class="bi bi-eye-fill"></i>
                                      </button> */}
                                    </div>
                                  </div>
                                </div>

                                <div className="row pl-package-row">
                                  <div className="col-6">
                                    <div className="pl-package-detail-title">
                                      Service Price
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    {/* <div className="pl-package-detail-title line-through"> */}
                                    <div className="pl-package-detail-title">
                                      INR {serviceInfo?.servicePrice}
                                    </div>
                                  </div>
                                </div>

                                <div className="row pl-package-row">
                                  <div className="col-6">
                                    <div className="pl-package-detail-title">
                                      Discount
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="pl-package-detail-title">
                                      INR {serviceInfo?.discountAmount}
                                    </div>
                                  </div>
                                </div>

                                <div className="row pl-package-row no-border">
                                  <div className="col-6">
                                    <div className="pl-package-detail-title">
                                      Final Price 
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="pl-package-detail-title">
                                      INR {parseInt(serviceInfo?.servicePrice) - parseInt(serviceInfo?.discountAmount)}
                                    </div>
                                  </div>
                                </div>

                                <div className="row pl-package-row no-border">
                                  <div className="col-6">
                                    <div className="pl-package-detail-title">
                                      GST - {serviceInfo?.GST}%
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="pl-package-detail-title">
                                      INR {serviceInfo?.GSTAmount}
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
                                    INR {serviceInfo?.finalAmount}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="pl--package-btn-area">
                              <button className="pl--package-btn-sub previous" onClick={handleServicePreviousClick}>
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

                              <button onClick={handleServicePayClick}
                                className="pl--package-btn-sub next"
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

                        <div className={`pl--pay-area tab mt-5 ${activeServiceTab === 3 ? 'active-tab' : ''}`} id="tab3">
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

                              {/* if payment was failed */}
                            {/* <div className="pl-payment-area failed">
                                  <img src="assets/img/packages/payment-failed.png" className='pl-payment-img' alt="" />
                                  <div className="pl-payment-message failed">Payment Failed..!</div>
                              </div> */}
                              {/*  */}
                            </div>
                            <div className="pl--package-btn-area">
                              <button className="pl--package-btn-sub" onClick={handleServiceDoneclick}>
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
                            </div>
                          </div>

                        {/* <h6 className="sol-price-information">
                          Beyond this, please contact the Sales department.
                        </h6> */}
                      </div>

                      <div className="sol-price-area">
                        <h5 className="sol-price-heading">
                          SKILLETY VALUE ADDED SERVICES PRICES
                        </h5>

                        <div  className={`table-responsive tab ${activeValServiceTab === 1 ? 'active-tab' : ''}`}>
                          <table className="table sol-price-table">
                            <thead>
                              <tr className="sol-price-table-head-row">
                                <th className="sol-price-table-head text-start">
                                  Value Added Services
                                </th>
                                <th className="sol-price-table-head text-center">
                                  Select Quantity
                                </th>
                                <th className="sol-price-table-head text-center">
                                  Total Price (INR)
                                </th>
                                <th className="sol-price-table-head text-center"></th>
                              </tr>
                            </thead>

                            <tbody>
                              <tr className="sol-price-table-row">
                                <td className="sol-price-table-data first-data text-start">
                                  Online Technical Assessment
                                </td>
                                <td className="sol-price-table-data text-center sol-price-table-qty-area">
                                  {/* <button className="sol-price-table-qty-button decrement">
                                    -
                                  </button> */}
                                  <input
                                    type="number"
                                    className="sol-price-table-qty-input"
                                    value={quantitySVAS.OnlineTechnicalAssessment}
                                    onChange={(e)=>setQuantitySVAS({...quantitySVAS, OnlineTechnicalAssessment: e.target.value})}
                                  />
                                  {/* <button className="sol-price-table-qty-button increment">
                                    +
                                  </button> */}
                                </td>
                                <td className="sol-price-table-data price text-center">
                                {totalSVAS.OnlineTechnicalAssessment}
                                </td>
                                <td className="text-center last-data sol-price-buy-now-btn-area">
                                  <button className="sol-price-buy-now-btn" onClick={()=>handleValServiceBuyNowClick("OnlineTechnicalAssessment", quantitySVAS.OnlineTechnicalAssessment)}>
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
                                  L1 Interview (0-8 yrs)
                                </td>
                                <td className="sol-price-table-data text-center sol-price-table-qty-area">
                                  {/* <button className="sol-price-table-qty-button decrement">
                                    -
                                  </button> */}
                                  <input
                                    type="number"
                                    className="sol-price-table-qty-input"
                                    value={quantitySVAS.L1Interview_0to8yrs}
                                    onChange={(e)=>setQuantitySVAS({...quantitySVAS, L1Interview_0to8yrs: e.target.value})}
                                  />
                                  {/* <button className="sol-price-table-qty-button increment">
                                    +
                                  </button> */}
                                </td>
                                <td className="sol-price-table-data price text-center">
                                {totalSVAS.L1Interview_0to8yrs}
                                </td>
                                <td className="text-center last-data sol-price-buy-now-btn-area">
                                  <button className="sol-price-buy-now-btn" onClick={()=>handleValServiceBuyNowClick("L1Interview(0to8yrs)", quantitySVAS.L1Interview_0to8yrs)}>
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
                                  L1 Interview (8-15 yrs)
                                </td>
                                <td className="sol-price-table-data text-center sol-price-table-qty-area">
                                  {/* <button className="sol-price-table-qty-button decrement">
                                    -
                                  </button> */}
                                  <input
                                    type="number"
                                    className="sol-price-table-qty-input"
                                    value={quantitySVAS.L1Interview_8to15yrs}
                                    onChange={(e)=>setQuantitySVAS({...quantitySVAS, L1Interview_8to15yrs: e.target.value})}
                                  />
                                  {/* <button className="sol-price-table-qty-button increment">
                                    +
                                  </button> */}
                                </td>
                                <td className="sol-price-table-data price text-center">
                                {totalSVAS.L1Interview_8to15yrs}
                                </td>
                                <td className="text-center last-data sol-price-buy-now-btn-area">
                                  <button className="sol-price-buy-now-btn" onClick={()=>handleValServiceBuyNowClick("L1Interview(8to15yrs)", quantitySVAS.L1Interview_8to15yrs)}>
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
                                  L1 Interview (above 15 yrs)
                                </td>
                                <td className="sol-price-table-data text-center sol-price-table-qty-area">
                                  {/* <button className="sol-price-table-qty-button decrement">
                                    -
                                  </button> */}
                                  <input
                                    type="number"
                                    className="sol-price-table-qty-input"
                                    value={quantitySVAS.L1Interview_above15yrs}
                                    onChange={(e)=>setQuantitySVAS({...quantitySVAS, L1Interview_above15yrs: e.target.value})}
                                  />
                                  {/* <button className="sol-price-table-qty-button increment">
                                    +
                                  </button> */}
                                </td>
                                <td className="sol-price-table-data price text-center">
                                {totalSVAS.L1Interview_above15yrs}
                                </td>
                                <td className="text-center last-data sol-price-buy-now-btn-area">
                                  <button className="sol-price-buy-now-btn" onClick={()=>handleValServiceBuyNowClick("L1Interview(>15yrs)", quantitySVAS.L1Interview_above15yrs)}>
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
                                  BGV Comprehensive
                                </td>
                                <td className="sol-price-table-data text-center sol-price-table-qty-area">
                                  {/* <button className="sol-price-table-qty-button decrement">
                                    -
                                  </button> */}
                                  <input
                                    type="number"
                                    className="sol-price-table-qty-input"
                                    value={quantitySVAS.BGVComprehensive}
                                    onChange={(e)=>setQuantitySVAS({...quantitySVAS, BGVComprehensive: e.target.value})}
                                  />
                                  {/* <button className="sol-price-table-qty-button increment">
                                    +
                                  </button> */}
                                </td>
                                <td className="sol-price-table-data price text-center">
                                {totalSVAS.BGVComprehensive}
                                </td>
                                <td className="text-center last-data sol-price-buy-now-btn-area">
                                  <button className="sol-price-buy-now-btn" onClick={()=>handleValServiceBuyNowClick("BGVComprehensive", quantitySVAS.BGVComprehensive)}>
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

                        <div className={`pl--add-detail-area mt-5 mb-5 tab ${activeValServiceTab === 2 ? 'active-tab' : ''}`}>
                            <div className="pl-package-detail-section">
                              <div className="pl-package-detail-head">
                                Package Detail
                              </div>
                              <div className="pl-package-detail-area">
                                <div className="row pl-package-row">
                                  <div className="col-6">
                                    <div className="pl-package-detail-title">
                                      Service
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="pl-package-detail-view-area">
                                      <div className="pl-package-detail-title">
                                      {valueAddedServiceInfo?.serviceName}
                                      </div>
                                      {/* <button
                                        type="button"
                                        className="pl-package-detail-view-btn"
                                        title="View More Detail.."
                                        data-toggle="modal"
                                        data-target="#package_detail_modal"
                                      >
                                        <i class="bi bi-eye-fill"></i>
                                      </button> */}
                                    </div>
                                  </div>
                                </div>

                                <div className="row pl-package-row">
                                  <div className="col-6">
                                    <div className="pl-package-detail-title">
                                    Service Price
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="pl-package-detail-title">
                                      INR {valueAddedServiceInfo?.servicePrice}
                                    </div>
                                  </div>
                                </div>

                                {/* <div className="row pl-package-row">
                                  <div className="col-6">
                                    <div className="pl-package-detail-title">
                                    Final Price
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="pl-package-detail-title">
                                      INR {parseInt(valueAddedServiceInfo?.servicePrice) - parseInt(serviceInfo?.discountAmount)}
                                    </div>
                                  </div>
                                </div> */}

                                <div className="row pl-package-row no-border">
                                  <div className="col-6">
                                    <div className="pl-package-detail-title">
                                      GST - {valueAddedServiceInfo?.GST}%
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="pl-package-detail-title">
                                      INR {valueAddedServiceInfo?.GSTAmount}
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
                                    INR {valueAddedServiceInfo?.finalAmount}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="pl--package-btn-area">
                              <button className="pl--package-btn-sub previous" onClick={handleValServicePreviousClick}>
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

                              <button onClick={handleValServicePayClick}
                                className="pl--package-btn-sub next"
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

                        <div className={`pl--pay-area tab mt-5 mb-5 ${activeValServiceTab === 3 ? 'active-tab' : ''}`} id="tab3">
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

                              {/* if payment was failed */}
                            {/* <div className="pl-payment-area failed">
                                  <img src="assets/img/packages/payment-failed.png" className='pl-payment-img' alt="" />
                                  <div className="pl-payment-message failed">Payment Failed..!</div>
                              </div> */}
                              {/*  */}
                            </div>
                            <div className="pl--package-btn-area">
                              <button className="pl--package-btn-sub" onClick={handleValServiceDoneclick}>
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
                            </div>
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
     
    </div>
  );
};

export default SkilletyPackagePlans;

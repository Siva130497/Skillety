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
  const [clientToken, setclientToken] = useState("");

  const [allPackages, setAllPackages] = useState([]);

  const { getProtectedData, getClientChoosenPlan, packageSelectionDetail, loginId } = useContext(AuthContext);
  const [employeeId, setEmployeeId] = useState("");
  const [loginClientDetail, setLoginClientDetail] = useState();
  const [currentPackage, setCurrentPackage] = useState();

  const [validity, setValidity] = useState(1);
  
  const [total, setTotal] = useState({
    cvViews: 0,
    logins: 0,
    activeJobs: 0
  })

  const [quantity, setQuantity] = useState(
    {
      cvViews: 0,
      logins: 0,
      activeJobs: 0
    }
  );

  const [quantitySVAS, setQuantitySVAS] = useState(
    {
      OnlineTechnicalAssessment: 0,
      L1Interview_0to8yrs: 0,
      L1Interview_8to15yrs: 0,
      L1Interview_above15yrs: 0,
      BGVComprehensive: 0
    }
  );

  const [totalSVAS, setTotalSVAD] = useState({
    OnlineTechnicalAssessment: 0,
    L1Interview_0to8yrs: 0,
    L1Interview_8to15yrs: 0,
    L1Interview_above15yrs: 0,
    BGVComprehensive: 0
  })

  useEffect(() => {
    if (quantitySVAS.OnlineTechnicalAssessment) {
      const servicePrice = parseInt(quantitySVAS.OnlineTechnicalAssessment) * 120
      const GSTAmount = (parseInt(servicePrice)) * (allPackages[0]?.GST) / 100

      setTotalSVAD({ ...totalSVAS, OnlineTechnicalAssessment: servicePrice + GSTAmount ? servicePrice + GSTAmount : 0 });
    } else {
      setTotalSVAD({ ...totalSVAS, OnlineTechnicalAssessment: 0 });
    }


  }, [quantitySVAS.OnlineTechnicalAssessment])

  useEffect(() => {
    if (quantitySVAS.L1Interview_0to8yrs) {
      const servicePrice = parseInt(quantitySVAS.L1Interview_0to8yrs) * 1500
      const GSTAmount = (parseInt(servicePrice)) * (allPackages[0]?.GST) / 100

      setTotalSVAD({ ...totalSVAS, L1Interview_0to8yrs: servicePrice + GSTAmount ? servicePrice + GSTAmount : 0 });
    } else {
      setTotalSVAD({ ...totalSVAS, L1Interview_0to8yrs: 0 });
    }


  }, [quantitySVAS.L1Interview_0to8yrs])

  useEffect(() => {
    if (quantitySVAS.L1Interview_8to15yrs) {
      const servicePrice = parseInt(quantitySVAS.L1Interview_8to15yrs) * 2000
      const GSTAmount = (parseInt(servicePrice)) * (allPackages[0]?.GST) / 100

      setTotalSVAD({ ...totalSVAS, L1Interview_8to15yrs: servicePrice + GSTAmount ? servicePrice + GSTAmount : 0 });
    } else {
      setTotalSVAD({ ...totalSVAS, L1Interview_8to15yrs: 0 });
    }


  }, [quantitySVAS.L1Interview_8to15yrs])

  useEffect(() => {
    if (quantitySVAS.L1Interview_above15yrs) {
      const servicePrice = parseInt(quantitySVAS.L1Interview_above15yrs) * 2500
      const GSTAmount = (parseInt(servicePrice)) * (allPackages[0]?.GST) / 100

      setTotalSVAD({ ...totalSVAS, L1Interview_above15yrs: servicePrice + GSTAmount ? servicePrice + GSTAmount : 0 });
    } else {
      setTotalSVAD({ ...totalSVAS, L1Interview_above15yrs: 0 });
    }


  }, [quantitySVAS.L1Interview_above15yrs])

  useEffect(() => {
    if (quantitySVAS.BGVComprehensive) {
      const servicePrice = parseInt(quantitySVAS.BGVComprehensive) * 3500
      const GSTAmount = (parseInt(servicePrice)) * (allPackages[0]?.GST) / 100

      setTotalSVAD({ ...totalSVAS, BGVComprehensive: servicePrice + GSTAmount ? servicePrice + GSTAmount : 0 });
    } else {
      setTotalSVAD({ ...totalSVAS, BGVComprehensive: 0 });
    }


  }, [quantitySVAS.BGVComprehensive])


  const handleValServiceBuyNowClick = (serviceName, quantity) => {

    if (quantity) {
      
      const unitPrice = serviceName === "OnlineTechnicalAssessment" ? 120 : serviceName === "L1Interview(0to8yrs)" ? 1500 : serviceName === "L1Interview(8to15yrs)" ? 2000 : serviceName === "L1Interview(>15yrs)" ? 2500 : 3500;
      const servicePrice = parseInt(quantity) * unitPrice

      const GSTAmount = (parseInt(servicePrice)) * (allPackages[0]?.GST) / 100
      const valueAddedServiceInfo = {
        id: loginClientDetail?.companyId,
        serviceName,
        quantity: parseInt(quantity),
        servicePrice: servicePrice.toString(),
        finalAmount: (parseInt(servicePrice) + GSTAmount).toString(),
        GST: allPackages[0]?.GST.toString(),
        GSTAmount: GSTAmount.toString()
      };

      const params = new URLSearchParams(valueAddedServiceInfo);

    if (clientToken && loginClientDetail?.companyId) {
      const url = `https://skillety-dashboard-tk2y.onrender.com/package-plans?clientToken=${encodeURIComponent(clientToken)}&${params.toString()}&loginId=${loginId}`;
      window.open(url, '_blank');
    } else {
      navigate('/client-login');
    }

    }
  };

  useEffect(() => {
    if (quantity.cvViews > 0) {
      const servicePrice = parseInt(quantity.cvViews) * 5
      // const discount = parseInt(validity.cvViews) <= 3 ? "0" : 3 < parseInt(validity.cvViews) <= 6 ? "5" : "10"
      // const discountAmount = parseInt(servicePrice) * parseInt(discount) / 100
      // const GSTAmount = (parseInt(servicePrice) - discountAmount) * (allPackages[0]?.GST) / 100

      setTotal({ ...total, cvViews: servicePrice ? servicePrice : 0 });
    } else {
      setTotal({ ...total, cvViews: 0 });
    }


  }, [quantity.cvViews])

  useEffect(() => {
    if (quantity.logins > 0) {
      const servicePrice = parseInt(quantity.logins) * 1000
      // const discount = parseInt(validity.logins) <= 3 ? "0" : 3 < parseInt(validity.logins) <= 6 ? "5" : "10"
      // const discountAmount = parseInt(servicePrice) * parseInt(discount) / 100
      // const GSTAmount = (parseInt(servicePrice) - discountAmount) * (allPackages[0]?.GST) / 100

      setTotal({ ...total, logins: servicePrice ? servicePrice  : 0 });
    } else {
      setTotal({ ...total, logins: 0 });
    }


  }, [quantity.logins])

  useEffect(() => {
    if (quantity.activeJobs > 0) {
      const servicePrice = parseInt(quantity.activeJobs) * 100
      // const discount = parseInt(validity.activeJobs) <= 3 ? "0" : 3 < parseInt(validity.activeJobs) <= 6 ? "5" : "10"
      // const discountAmount = parseInt(servicePrice) * parseInt(discount) / 100
      // const GSTAmount = (parseInt(servicePrice) - discountAmount) * (allPackages[0]?.GST) / 100

      setTotal({ ...total, activeJobs: servicePrice  ? servicePrice  : 0 });
    } else {
      setTotal({ ...total, activeJobs: 0 });
    }


  }, [quantity.activeJobs])

  useEffect(() => {
    setclientToken(JSON.parse(localStorage.getItem("clientToken")));
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

  useEffect(() => {
    axios.get("https://skillety-n6r1.onrender.com/all-packages")
      .then(res => {
        console.log(res.data);
        setAllPackages(res.data);
      }).catch(err => console.log(err));
  }, [clientToken]);

  const handleBuy = (packageType, cvViews, logins, activeJobs, validity, amount, realPrice, offerPrice, GST, GSTAmount) => {

    const packDetail = {
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
    }
    // Serialize packDetail object to a query string
    const params = new URLSearchParams(packDetail);

    if (clientToken && loginClientDetail?.companyId) {
      const url = `https://skillety-dashboard-tk2y.onrender.com/package-plans?clientToken=${encodeURIComponent(clientToken)}&${params.toString()}&loginId=${loginId}`;
      window.open(url, '_blank');
    } else {
      navigate('/client-login');
    }

  };


  const handleServiceBuyNowClick = () => {
    if(quantity.cvViews > 0 || quantity.logins > 0 || quantity.activeJobs > 0){
        let serviceNames = [];
        if(quantity.cvViews > 0){
            serviceNames.push("CV Views")
        }
        if(quantity.logins > 0){
            serviceNames.push("Login IDs")
        }
        if(quantity.activeJobs > 0){
            serviceNames.push("Job Postings")
        }
        const servicePrice = parseInt(quantity.cvViews) * 5 + parseInt(quantity.logins) * 1000 + parseInt(quantity.activeJobs) * 100;
        const parsedValidity = parseInt(validity);

        const discount = parsedValidity <= 3 ? "0" : (parsedValidity <= 6 ? "5" : "10");
        const discountAmount = parseInt(servicePrice) * parseInt(discount) / 100;
        const GSTAmount = (parseInt(servicePrice) - discountAmount) * (allPackages[0]?.GST) / 100;
      
        const serviceInfo = {
            id: loginClientDetail?.companyId,
            serviceNames: serviceNames.join(', '), // Convert array to string
            quantities: JSON.stringify({
                cvViews: parseInt(quantity.cvViews),
                logins: parseInt(quantity.logins),
                activeJobs: parseInt(quantity.activeJobs)
            }),
            validity: parseInt(validity),
            servicePrice: servicePrice.toString(),
            finalAmount: (parseInt(servicePrice) - discountAmount + GSTAmount).toString(),
            discount,
            discountAmount: discountAmount.toString(),
            GST: allPackages[0]?.GST.toString(),
            GSTAmount: GSTAmount.toString()
        };

        const params = new URLSearchParams(serviceInfo);

        if (clientToken && loginClientDetail?.companyId) {
            const url = `https://skillety-dashboard-tk2y.onrender.com/package-plans?clientToken=${encodeURIComponent(clientToken)}&${params.toString()}&loginId=${loginId}`;
            window.open(url, '_blank');
        } else {
            navigate('/client-login');
        }
    }  
};


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
                    {/* <div className="plans--sub-head" data-aos="fade-up">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </div> */}
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
                                <h6 className="pl--package-title no-wrap-false">
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
                              <div className={(currentPackage?.packageType === pack.packageType) ? "pl--package-detail-area active" : "pl--package-detail-area"}>
                                <div
                                  className={(currentPackage?.packageType === pack.packageType) ? "pl--package-info-area active" : `pl--package-info-area`}
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
                                      <span className="line-through">INR {pack.realPrice}</span><br />
                                      INR {pack.offerPrice}
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
                                    onClick={() => handleBuy(pack.packageType, pack.cvViews, pack.logins, pack.activeJobs, pack.validity, pack.amount, pack.realPrice, pack.offerPrice, pack.GST, pack.offerPrice * (pack.GST / 100))}
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

                  <div className="sol-price-area">
                    <h5 className="sol-price-heading">
                      CUSTOMIZE YOUR PACKAGE
                    </h5>

                    <div className="table-responsive">
                      <table className="table sol-price-table">
                        <thead>
                          <tr className="sol-price-table-head-row">
                            <th className="sol-price-table-head text-start">
                              Services
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
                              CV Views
                            </td>
                            <td className="sol-price-table-data text-center sol-price-table-qty-area">
                              <input
                                type="number"
                                className="sol-price-table-qty-input" 
                                value={quantity.cvViews}
                                onChange={(e) => setQuantity({ ...quantity, cvViews: e.target.value })}/>
                            </td>

                            <td className="sol-price-table-data price text-center">
                            {total.cvViews}
                            </td>
                            <td className="text-center last-data sol-price-buy-now-btn-area">
                            </td>
                          </tr>

                          <tr className="sol-price-table-row">
                            <td className="sol-price-table-data first-data text-start">
                              Login IDs
                            </td>
                            <td className="sol-price-table-data text-center sol-price-table-qty-area">
                              <input
                                type="number"
                                className="sol-price-table-qty-input"
                                value={quantity.logins}
                                  onChange={(e) => setQuantity({ ...quantity, logins: e.target.value })} />
                            </td>

                            <td className="sol-price-table-data price text-center">
                            {total.logins}
                            </td>
                            <td className="text-center last-data sol-price-buy-now-btn-area">
                            </td>
                          </tr>

                          <tr className="sol-price-table-row">
                            <td className="sol-price-table-data first-data text-start">
                              Job Postings
                            </td>
                            <td className="sol-price-table-data text-center sol-price-table-qty-area">
                              <input
                                type="number"
                                className="sol-price-table-qty-input" 
                                value={quantity.activeJobs}
                                  onChange={(e) => setQuantity({ ...quantity, activeJobs: e.target.value })}/>
                            </td>

                            <td className="sol-price-table-data price text-center">
                            {total.activeJobs}
                            </td>
                            <td className="text-center last-data sol-price-buy-now-btn-area">
                            </td>
                          </tr>

                          <tr className="sol-price-table-row">
                            <td className="sol-price-table-data first-data text-start">
                              Validity (In months)
                            </td>
                            <td className="sol-price-table-data text-center sol-price-table-qty-area">
                              <select className="sol-price-table-qty-input"
                              value={validity}
                              onChange={(e)=>setValidity(e.target.value)}>
                                <option value="1" selected>1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                              </select>
                            </td>

                            <td className="sol-price-table-data price text-center">
                            {total.cvViews + total.logins + total.activeJobs}
                            </td>

                            <td className="text-center last-data sol-price-buy-now-btn-area">
                              <button className="sol-price-buy-now-btn"
                              onClick={handleServiceBuyNowClick}>
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
                  </div>

                  <div className="sol-price-area for-mobile">
                    <h5 className="sol-price-heading">
                      SKILLETY VALUE ADDED SERVICES PRICES
                    </h5>

                    <div className="table-responsive">
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
                              <input
                                type="number"
                                className="sol-price-table-qty-input"
                                value={quantitySVAS.OnlineTechnicalAssessment}
                                  onChange={(e) => setQuantitySVAS({ ...quantitySVAS, OnlineTechnicalAssessment: e.target.value })}/>
                            </td>
                            <td className="sol-price-table-data price text-center">
                            {totalSVAS.OnlineTechnicalAssessment}
                            </td>
                            <td className="text-center last-data sol-price-buy-now-btn-area">
                              <button className="sol-price-buy-now-btn"
                              onClick={() => handleValServiceBuyNowClick("OnlineTechnicalAssessment", quantitySVAS.OnlineTechnicalAssessment)}>
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
                              <input
                                type="number"
                                className="sol-price-table-qty-input"
                                value={quantitySVAS.L1Interview_0to8yrs}
                                  onChange={(e) => setQuantitySVAS({ ...quantitySVAS, L1Interview_0to8yrs: e.target.value })}/>
                            </td>
                            <td className="sol-price-table-data price text-center">
                            {totalSVAS.L1Interview_0to8yrs}
                            </td>
                            <td className="text-center last-data sol-price-buy-now-btn-area">
                              <button className="sol-price-buy-now-btn"
                              onClick={() => handleValServiceBuyNowClick("L1Interview(0to8yrs)", quantitySVAS.L1Interview_0to8yrs)}>
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
                              <input
                                type="number"
                                className="sol-price-table-qty-input"
                                value={quantitySVAS.L1Interview_8to15yrs}
                                  onChange={(e) => setQuantitySVAS({ ...quantitySVAS, L1Interview_8to15yrs: e.target.value })}/>
                            </td>
                            <td className="sol-price-table-data price text-center">
                            {totalSVAS.L1Interview_8to15yrs}
                            </td>
                            <td className="text-center last-data sol-price-buy-now-btn-area">
                              <button className="sol-price-buy-now-btn"
                              onClick={() => handleValServiceBuyNowClick("L1Interview(8to15yrs)", quantitySVAS.L1Interview_8to15yrs)}>
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
                              <input
                                type="number"
                                className="sol-price-table-qty-input"
                                value={quantitySVAS.L1Interview_above15yrs}
                                  onChange={(e) => setQuantitySVAS({ ...quantitySVAS, L1Interview_above15yrs: e.target.value })}/>
                            </td>
                            <td className="sol-price-table-data price text-center">
                            {totalSVAS.L1Interview_above15yrs}
                            </td>
                            <td className="text-center last-data sol-price-buy-now-btn-area">
                              <button className="sol-price-buy-now-btn"
                              onClick={() => handleValServiceBuyNowClick("L1Interview(>15yrs)", quantitySVAS.L1Interview_above15yrs)}>
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
                              <input
                                type="number"
                                className="sol-price-table-qty-input"
                                value={quantitySVAS.BGVComprehensive}
                                  onChange={(e) => setQuantitySVAS({ ...quantitySVAS, BGVComprehensive: e.target.value })}/>
                            </td>
                            <td className="sol-price-table-data price text-center">
                            {totalSVAS.BGVComprehensive}
                            </td>
                            <td className="text-center last-data sol-price-buy-now-btn-area">
                              <button className="sol-price-buy-now-btn"
                              onClick={() => handleValServiceBuyNowClick("BGVComprehensive", quantitySVAS.BGVComprehensive)}>
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
        </div>
      </div>
      <Footer />
    </>

  )
}

export default Packages
import React from 'react'
import { useEffect } from 'react';
import $ from 'jquery';
import './Packages.css'
import './Packages-responsive.css'
import Layout from '../../components/Layout'

const Packages = () => {
  useEffect(() => {

  }, []);

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
                    <a href="/">Home</a>
                  </div>
                  <div className="breadcrumb--item-dark">
                    <p>Plans</p>
                  </div>
                </div>

                <div className="plans--container">
                  <div className="plans--head-area">
                    <h4 className='plans--heading'>PICK YOUR PLAN</h4>
                    <div className="plans--sub-head">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </div>

                    <div className="plan--purchase-track-area">
                      <div className='pl--track-circle-area'>
                        <div className="pl--track-circle">
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
                  
                  <div className="packages--area">
                    <div className="row">
                      <div className="col-12 col-xl-3 col-lg-3 col-md-3">

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  )
}

export default Packages
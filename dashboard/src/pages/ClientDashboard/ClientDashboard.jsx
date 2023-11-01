import React from 'react';
import { useEffect } from 'react';
import Layout from '../../components/Layout';
import './ClientDashboard.css';
import './ClientDashboard-responsive.css';
import $ from 'jquery';


import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';

import { Line } from 'react-chartjs-2';
import faker from 'faker';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const data = {
  labels,
  datasets: [
    {
      fill: true,
      label: 'Old visitors',
      data: [12.5, 12.5, 2.5, 5, 0, 2.5, 2.5, 10],
      borderColor: '#714F36',
      backgroundColor: '#F9C833',
    },
    {
      fill: true,
      label: 'New visitors',
      data: [7.5, 8, 5, 7.5, 12.5, 5, 6, 7.5],
      borderColor: '#F9C833',
      backgroundColor: '#FFEDB7',
    },
  ],
};

const yAxesTicks = [0, 5, 10, 20];

const options = {
  responsive: true,
  scales: {
    y: {
      suggestedMin: yAxesTicks[0],
      suggestedMax: yAxesTicks[yAxesTicks.length - 1],
      ticks: {
        stepSize: 5,
      },
    },
  },
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
    },
  },
  
};

const ClientDashboard = () => {

  useEffect(() => {
    $(document).ready(function () {
      // Hide the hidden-row by default
      $('.hidden-row').hide();

      // Add a click event to the button
      $('.dash-num-count-more-btn').click(function () {
        // Toggle the visibility of hidden-row with a smooth transition
        $('.hidden-row').slideToggle('slow');
        // Hide the button after clicking
        $(this).hide();
      });
    });
  }, []);

  return (
    <div>
      <div class="main-wrapper main-wrapper-1">
        <div class="navbar-bg"></div>

        <Layout />

        <div class="main-content">
          <section class="section">
            <div className="dash-section">
              <div className="dash-main-area">

                <div className="top-nav-area">
                  <div className="current-page-name-area">
                    <h4 className='current-page-name'>Dashboard</h4>
                    <p className='sub--head'>Welcome to Skillety !!!</p>
                  </div>

                  <div className="admin-search-area">
                    <form action="">
                      <div className="admin-search-input-area">
                        <input type="text" placeholder='Search for Job/title/Keywords'
                          className='admin-search-input' />
                        <i class="bi bi-search"></i>
                      </div>
                    </form>
                  </div>
                </div>

                <div className="dash-num-count-section">
                  <div className="row">
                    <div className="col-12 col-xxl-3 col-xl-3 col-md-6">
                      <div className="dash-num-count-area">
                        <p className='dash-num-title'>Jobs Applied</p>
                        <h4 className='dash-num-count'>14</h4>
                      </div>
                    </div>

                    <div className="col-12 col-xxl-3 col-xl-3 col-md-6">
                      <div className="dash-num-count-area">
                        <p className='dash-num-title'>Upcoming Interviews</p>
                        <h4 className='dash-num-count'>04</h4>
                      </div>
                    </div>

                    <div className="col-12 col-xxl-3 col-xl-3 col-md-6">
                      <div className="dash-num-count-area">
                        <p className='dash-num-title'>New matched Jobs</p>
                        <h4 className='dash-num-count'>08</h4>
                      </div>
                    </div>

                    <div className="col-12 col-xxl-3 col-xl-3 col-md-6">
                      <div className="dash-num-count-area">
                        <p className='dash-num-title'>New Notification</p>
                        <h4 className='dash-num-count'>28</h4>
                      </div>
                    </div>
                  </div>

                  <button className="dash-num-count-more-btn" id="showHiddenRow">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="8" viewBox="0 0 30 8" fill="none">
                      <circle cx="4" cy="4" r="4" fill="#714F36" />
                      <circle cx="15" cy="4" r="4" fill="#714F36" />
                      <circle cx="26" cy="4" r="4" fill="#714F36" />
                    </svg>
                  </button>

                  <div className='hidden-row'>
                    <div className="through-line"></div>
                    <div className="row">
                      <div className="col-12 col-xxl-3 col-xl-3 col-md-6">
                        <div className="dash-num-count-area">
                          <p className='dash-num-title'>Jobs Applied</p>
                          <h4 className='dash-num-count'>14</h4>
                        </div>
                      </div>

                      <div className="col-12 col-xxl-3 col-xl-3 col-md-6">
                        <div className="dash-num-count-area">
                          <p className='dash-num-title'>Upcoming Interviews</p>
                          <h4 className='dash-num-count'>04</h4>
                        </div>
                      </div>

                      <div className="col-12 col-xxl-3 col-xl-3 col-md-6">
                        <div className="dash-num-count-area">
                          <p className='dash-num-title'>New matched Jobs</p>
                          <h4 className='dash-num-count'>08</h4>
                        </div>
                      </div>

                      <div className="col-12 col-xxl-3 col-xl-3 col-md-6">
                        <div className="dash-num-count-area">
                          <p className='dash-num-title'>New Notification</p>
                          <h4 className='dash-num-count'>28</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="dash-chart-section">
                  <div className="dash-chart-area">
                    <div className="dash-chart-top-area">
                      <div className="dash-chart-title">Resume Visits</div>
                      <div className="dash-chart-filter-area">
                        <form action="">
                          <select name="" className='dash-chart-filter-input' id="">
                            <option value="Monthly" selected>Monthly</option>
                            <option value="Weekly">Weekly</option>
                            <option value="Yearly">Yearly</option>
                          </select>
                        </form>
                      </div>
                    </div>
                    <Line options={options} data={data} />
                  </div>
                </div>

                <div className="dash-table-section">
                  <div className="dash-table-area">
                    <div className="dash-table-top-area">
                      <div className="dash-table-title">
                      Upcoming Interviews
                      </div>
                      <a href='#' className="dash-table-see-all-btn">See all</a>
                    </div>

                  </div>
                </div>


                {/* <div class="row">
                  <div class="col-12">
                    <div class="card">
                      <div class="card-header">
                        <h4>Assign Task Table</h4>
                        <div class="card-header-form">
                          <form>
                            <div class="input-group">
                              <input type="text" class="form-control" placeholder="Search" />
                              <div class="input-group-btn">
                                <button class="btn btn-primary"><i class="fas fa-search"></i></button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                      <div class="card-body p-0">
                        <div class="table-responsive">
                          <table class="table table-striped">
                            <tr>
                              <th class="text-center">
                                <div class="custom-checkbox custom-checkbox-table custom-control">
                                  <input type="checkbox" data-checkboxes="mygroup" data-checkbox-role="dad"
                                    class="custom-control-input" id="checkbox-all" />
                                  <label for="checkbox-all" class="custom-control-label">&nbsp;</label>
                                </div>
                              </th>
                              <th>Task Name</th>
                              <th>Members</th>
                              <th>Task Status</th>
                              <th>Assigh Date</th>
                              <th>Due Date</th>
                              <th>Priority</th>
                              <th>Action</th>
                            </tr>
                            <tr>
                              <td class="p-0 text-center">
                                <div class="custom-checkbox custom-control">
                                  <input type="checkbox" data-checkboxes="mygroup" class="custom-control-input"
                                    id="checkbox-1" />
                                  <label for="checkbox-1" class="custom-control-label">&nbsp;</label>
                                </div>
                              </td>
                              <td>Create a mobile app</td>
                              <td class="text-truncate">
                                <ul class="list-unstyled order-list m-b-0 m-b-0">
                                  <li class="team-member team-member-sm"><img class="rounded-circle"
                                    src="assets/img/users/user-8.png" alt="user" data-toggle="tooltip" title=""
                                    data-original-title="Wildan Ahdian" /></li>
                                  <li class="team-member team-member-sm"><img class="rounded-circle"
                                    src="assets/img/users/user-9.png" alt="user" data-toggle="tooltip" title=""
                                    data-original-title="John Deo" /></li>
                                  <li class="team-member team-member-sm"><img class="rounded-circle"
                                    src="assets/img/users/user-10.png" alt="user" data-toggle="tooltip" title=""
                                    data-original-title="Sarah Smith" /></li>
                                  <li class="avatar avatar-sm"><span class="badge badge-primary">+4</span></li>
                                </ul>
                              </td>
                              <td class="align-middle">
                                <div class="progress-text">50%</div>
                                <div class="progress" data-height="6">
                                  <div class="progress-bar bg-success" data-width="50%"></div>
                                </div>
                              </td>
                              <td>2018-01-20</td>
                              <td>2019-05-28</td>
                              <td>
                                <div class="badge badge-success">Low</div>
                              </td>
                              <td><a href="#" class="btn btn-outline-primary">Detail</a></td>
                            </tr>
                            <tr>
                              <td class="p-0 text-center">
                                <div class="custom-checkbox custom-control">
                                  <input type="checkbox" data-checkboxes="mygroup" class="custom-control-input"
                                    id="checkbox-2" />
                                  <label for="checkbox-2" class="custom-control-label">&nbsp;</label>
                                </div>
                              </td>
                              <td>Redesign homepage</td>
                              <td class="text-truncate">
                                <ul class="list-unstyled order-list m-b-0 m-b-0">
                                  <li class="team-member team-member-sm"><img class="rounded-circle"
                                    src="assets/img/users/user-1.png" alt="user" data-toggle="tooltip" title=""
                                    data-original-title="Wildan Ahdian" /></li>
                                  <li class="team-member team-member-sm"><img class="rounded-circle"
                                    src="assets/img/users/user-2.png" alt="user" data-toggle="tooltip" title=""
                                    data-original-title="John Deo" /></li>
                                  <li class="avatar avatar-sm"><span class="badge badge-primary">+2</span></li>
                                </ul>
                              </td>
                              <td class="align-middle">
                                <div class="progress-text">40%</div>
                                <div class="progress" data-height="6">
                                  <div class="progress-bar bg-danger" data-width="40%"></div>
                                </div>
                              </td>
                              <td>2017-07-14</td>
                              <td>2018-07-21</td>
                              <td>
                                <div class="badge badge-danger">High</div>
                              </td>
                              <td><a href="#" class="btn btn-outline-primary">Detail</a></td>
                            </tr>
                            <tr>
                              <td class="p-0 text-center">
                                <div class="custom-checkbox custom-control">
                                  <input type="checkbox" data-checkboxes="mygroup" class="custom-control-input"
                                    id="checkbox-3" />
                                  <label for="checkbox-3" class="custom-control-label">&nbsp;</label>
                                </div>
                              </td>
                              <td>Backup database</td>
                              <td class="text-truncate">
                                <ul class="list-unstyled order-list m-b-0 m-b-0">
                                  <li class="team-member team-member-sm"><img class="rounded-circle"
                                    src="assets/img/users/user-3.png" alt="user" data-toggle="tooltip" title=""
                                    data-original-title="Wildan Ahdian" /></li>
                                  <li class="team-member team-member-sm"><img class="rounded-circle"
                                    src="assets/img/users/user-4.png" alt="user" data-toggle="tooltip" title=""
                                    data-original-title="John Deo" /></li>
                                  <li class="team-member team-member-sm"><img class="rounded-circle"
                                    src="assets/img/users/user-5.png" alt="user" data-toggle="tooltip" title=""
                                    data-original-title="Sarah Smith" /></li>
                                  <li class="avatar avatar-sm"><span class="badge badge-primary">+3</span></li>
                                </ul>
                              </td>
                              <td class="align-middle">
                                <div class="progress-text">55%</div>
                                <div class="progress" data-height="6">
                                  <div class="progress-bar bg-purple" data-width="55%"></div>
                                </div>
                              </td>
                              <td>2019-07-25</td>
                              <td>2019-08-17</td>
                              <td>
                                <div class="badge badge-info">Average</div>
                              </td>
                              <td><a href="#" class="btn btn-outline-primary">Detail</a></td>
                            </tr>
                            <tr>
                              <td class="p-0 text-center">
                                <div class="custom-checkbox custom-control">
                                  <input type="checkbox" data-checkboxes="mygroup" class="custom-control-input"
                                    id="checkbox-4" />
                                  <label for="checkbox-4" class="custom-control-label">&nbsp;</label>
                                </div>
                              </td>
                              <td>Android App</td>
                              <td class="text-truncate">
                                <ul class="list-unstyled order-list m-b-0 m-b-0">
                                  <li class="team-member team-member-sm"><img class="rounded-circle"
                                    src="assets/img/users/user-7.png" alt="user" data-toggle="tooltip" title=""
                                    data-original-title="John Deo" /></li>
                                  <li class="team-member team-member-sm"><img class="rounded-circle"
                                    src="assets/img/users/user-8.png" alt="user" data-toggle="tooltip" title=""
                                    data-original-title="Sarah Smith" /></li>
                                  <li class="avatar avatar-sm"><span class="badge badge-primary">+4</span></li>
                                </ul>
                              </td>
                              <td class="align-middle">
                                <div class="progress-text">70%</div>
                                <div class="progress" data-height="6">
                                  <div class="progress-bar" data-width="70%"></div>
                                </div>
                              </td>
                              <td>2018-04-15</td>
                              <td>2019-07-19</td>
                              <td>
                                <div class="badge badge-success">Low</div>
                              </td>
                              <td><a href="#" class="btn btn-outline-primary">Detail</a></td>
                            </tr>
                            <tr>
                              <td class="p-0 text-center">
                                <div class="custom-checkbox custom-control">
                                  <input type="checkbox" data-checkboxes="mygroup" class="custom-control-input"
                                    id="checkbox-5" />
                                  <label for="checkbox-5" class="custom-control-label">&nbsp;</label>
                                </div>
                              </td>
                              <td>Logo Design</td>
                              <td class="text-truncate">
                                <ul class="list-unstyled order-list m-b-0 m-b-0">
                                  <li class="team-member team-member-sm"><img class="rounded-circle"
                                    src="assets/img/users/user-9.png" alt="user" data-toggle="tooltip" title=""
                                    data-original-title="Wildan Ahdian" /></li>
                                  <li class="team-member team-member-sm"><img class="rounded-circle"
                                    src="assets/img/users/user-10.png" alt="user" data-toggle="tooltip" title=""
                                    data-original-title="John Deo" /></li>
                                  <li class="team-member team-member-sm"><img class="rounded-circle"
                                    src="assets/img/users/user-2.png" alt="user" data-toggle="tooltip" title=""
                                    data-original-title="Sarah Smith" /></li>
                                  <li class="avatar avatar-sm"><span class="badge badge-primary">+2</span></li>
                                </ul>
                              </td>
                              <td class="align-middle">
                                <div class="progress-text">45%</div>
                                <div class="progress" data-height="6">
                                  <div class="progress-bar bg-cyan" data-width="45%"></div>
                                </div>
                              </td>
                              <td>2017-02-24</td>
                              <td>2018-09-06</td>
                              <td>
                                <div class="badge badge-danger">High</div>
                              </td>
                              <td><a href="#" class="btn btn-outline-primary">Detail</a></td>
                            </tr>
                            <tr>
                              <td class="p-0 text-center">
                                <div class="custom-checkbox custom-control">
                                  <input type="checkbox" data-checkboxes="mygroup" class="custom-control-input"
                                    id="checkbox-6" />
                                  <label for="checkbox-6" class="custom-control-label">&nbsp;</label>
                                </div>
                              </td>
                              <td>Ecommerce website</td>
                              <td class="text-truncate">
                                <ul class="list-unstyled order-list m-b-0 m-b-0">
                                  <li class="team-member team-member-sm"><img class="rounded-circle"
                                    src="assets/img/users/user-8.png" alt="user" data-toggle="tooltip" title=""
                                    data-original-title="Wildan Ahdian" /></li>
                                  <li class="team-member team-member-sm"><img class="rounded-circle"
                                    src="assets/img/users/user-9.png" alt="user" data-toggle="tooltip" title=""
                                    data-original-title="John Deo" /></li>
                                  <li class="team-member team-member-sm"><img class="rounded-circle"
                                    src="assets/img/users/user-10.png" alt="user" data-toggle="tooltip" title=""
                                    data-original-title="Sarah Smith" /></li>
                                  <li class="avatar avatar-sm"><span class="badge badge-primary">+4</span></li>
                                </ul>
                              </td>
                              <td class="align-middle">
                                <div class="progress-text">30%</div>
                                <div class="progress" data-height="6">
                                  <div class="progress-bar bg-orange" data-width="30%"></div>
                                </div>
                              </td>
                              <td>2018-01-20</td>
                              <td>2019-05-28</td>
                              <td>
                                <div class="badge badge-info">Average</div>
                              </td>
                              <td><a href="#" class="btn btn-outline-primary">Detail</a></td>
                            </tr>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}

              </div>
            </div>


            <div className="dash-right-panel">
              <div className="dash-right-panel-content">

              </div>
            </div>


          </section>

        </div>

      </div>
    </div>
  )
}

export default ClientDashboard
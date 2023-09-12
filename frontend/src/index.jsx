import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import './custom.css';
// import './components/main.js';
import 'aos/dist/aos.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'boxicons/css/boxicons.min.css';
import 'glightbox/dist/css/glightbox.min.css';
import 'remixicon/fonts/remixicon.css';
// import 'swiper/swiper-bundle.min.css';

import 'aos/dist/aos.js';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'glightbox/dist/js/glightbox.min.js';
import 'isotope-layout/dist/isotope.pkgd.min.js';
// import 'swiper/swiper-bundle.min.js';
import 'waypoints/lib/noframework.waypoints.js';

import App from './App';
import {BrowserRouter} from "react-router-dom";
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    < App />
  </BrowserRouter>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from 'react';
import { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import $ from 'jquery';
import './HomeCandidate.css';
import './HomeCandidate-responsive.css';
import Layout from '../../components/Layout';
import { Footer } from '../../components/Footer';

const HomeCandidate = () => {
  useEffect(() => {
  }, []);
  return (
    <div>
      <Layout candidateHome={true} />
      HomeCandidate
      <Footer />
    </div>
  )
}

export default HomeCandidate
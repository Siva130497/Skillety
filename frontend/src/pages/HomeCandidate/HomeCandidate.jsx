import React from 'react'
import Layout from '../../components/Layout'
import { Footer } from '../../components/Footer'

const HomeCandidate = () => {
  return (
    <div>
        <Layout candidateHome={true}/>
        HomeCandidate
        <Footer/>
    </div>
  )
}

export default HomeCandidate
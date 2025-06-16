import Features from '@/components/Features'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Navbar from '@/components/Navbar'
import Roadmap from '@/components/Roadmap'
import React from 'react'

export default function page() {
  return (
    <div className=''>
      <Navbar/>
      <Header/>
      <Features/>
      <div id='roadmap'><Roadmap/></div>
      <Footer/>
    </div>
  )
}

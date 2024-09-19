import React from 'react'
import Hero from '../components/Hero'
import { FadeInBox, SlideInBox} from '../components/FramerMotion'
import '../style/HomePage.css'


const Home = () => {
  return (
    <>
    <Hero />
    <SlideInBox> 
      <FadeInBox>
        <div>
          <p className='home-content'>Importera inlägg från Facebook grupp</p> 

        </div>
      </FadeInBox>
    </SlideInBox> 
    </>

  )
}

export default Home
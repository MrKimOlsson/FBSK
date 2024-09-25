import React from 'react'
import { FadeInBox, SlideInBox} from '../components/FramerMotion'
import ImgComponent1 from '../components/ImgComponent1'
import '../index.css'
import MembershipInfo from '../components/MembershipInfo'
import RuleOne from '../components/rules/RuleOne'
import RuleTwo from '../components/rules/RuleTwo'
import RuleThree from '../components/rules/RuleThree'
import RuleFour from '../components/rules/RuleFour'
import Hero from '../components/Hero'

const MembershipPage = () => {
  return (

    <>
 <Hero
  imageIndex={1} // Fetches the first image from the Firebase storage
  heading="Så du vill bli medlem?"
  text="Låt oss se om du har vad som krävs för att bli en av oss"
/>
<div className='pusher'></div>
    <SlideInBox> 
        {/* <ImgComponent1 /> */}

    <RuleOne />
    </SlideInBox> 
    <SlideInBox> 

    <RuleTwo />
    </SlideInBox> 

    <SlideInBox> 

    <RuleThree />
    </SlideInBox> 

    <SlideInBox> 

    <RuleFour />
    </SlideInBox> 

    <SlideInBox> 
    <MembershipInfo />
    </SlideInBox> 
    
    </>

  )
}

export default MembershipPage
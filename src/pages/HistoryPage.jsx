import React from 'react'
import { FadeInBox, SlideInBox} from '../components/FramerMotion'
import HistoryInfo from '../components/HistoryInfo'


const HistoryPage = () => {
  return (
    <SlideInBox> 
      <FadeInBox>
        <HistoryInfo/>
      </FadeInBox>
    </SlideInBox> 
  )
}

export default HistoryPage
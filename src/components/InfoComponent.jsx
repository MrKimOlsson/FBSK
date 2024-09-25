import React from 'react'
import { Link } from 'react-router-dom'; 

const InfoComponent = () => {
  return (
    <>
    {/* <div className='divider'></div> */}
    <div className='container'>
        <h2>Kan du bevara vår hemlighet?</h2>
        <p>Vi brinner inte bara för bågskytte, utan även för naturen. Därför är det viktigt för oss att vi tar hand om den. Som medlem ger vi därför dig ett ansvar att hjälpa oss ta hand om vårt område och värna om den fantastiska möjligheten vi har att befinna oss där. Vi kan därför inte avslöja platsen för denna oas fören du blir en av oss. Så frågan är, Kan du bevara vår hemlighet?      </p>
        <Link to="/medlemskap">
          <button className="membership-btn">Ansök om medlemskap</button>
        </Link>
    </div>
    
    </>
  )
}

export default InfoComponent
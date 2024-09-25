import React from 'react'
import { Link } from 'react-router-dom'

const HistoryInfo = () => {
  return (
    <>
    {/* <div className='divider'></div> */}
    <div className='container'>
        <h2>Vilka vi är? Vi är ett gäng bågskyttar som håller till i skogarna runt flaten området i södra Stockholm</h2>
        <p>Exakt vart vi håller till kan vi inte berätta fören du blir en fullvärdig medlem. 
            Det vi kan berätta är att vi har en stora bana i skogen bestående av både tradiotella måltavlor och 3D djur. 
            Det finns måltavlor på både kort avstånd men också upp til 70 meter, vilket är en utmaning i sig. Det finns flera vägar att gå, 
            en lite kortare och en längre och i mitten finns en läger plats där man kan ta en paus och grilla lite korv. 
            Det är en mysig plats i skogen med ett mysigt gäng som gillar bågskytte. Är du redo att bli en av oss?</p>
        <Link to="/ansokan">
          <button>Jag är redo!</button>
        </Link>
        <Link to="/kontakt">
          <button>Kan jag kontakta er?</button>
        </Link>
    </div>
    </>
  )
}

export default HistoryInfo
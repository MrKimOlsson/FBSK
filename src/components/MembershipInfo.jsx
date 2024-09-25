import React from 'react'
import { Link } from 'react-router-dom'

const MembershipInfo = () => {
  return (
    <>
    {/* <div className='divider'></div> */}
    <div className='container'>
        <h2>Är du redo att betala priset för att bli en av oss?</h2>
        <p>Medlemsavgiften är 450kr per år för en person. Familjemedlemskap kostar 600kr per år. Du är då välkommen att ta med upp till två familjemedlemmar när du är ute på banan. När du loggar in på sidan som medlem så får du tillgång till en karta över området. Som medlem får du även tillträde till klubbens Facebook grupp. Där du har möjlighet att connecta med våra medlemmar och planera kommande utflykter och äventyr. </p>
        <Link to="/ansokan">
          <button>Jag är redo!</button>
        </Link>
        <Link to="/historia">
          <button>Berätta mer</button>
        </Link>
    </div>
    </>
  )
}

export default MembershipInfo
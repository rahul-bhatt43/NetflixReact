import React from 'react'
import { Link } from 'react-router-dom'

const Errorr = () => {
    return (
        <div className='content' style={{ display: "flex", height: "100vh", justifyContent: "center", alignItems: "center", textAlign:"center", color: "#ff1c0b", fontSize: "2rem", flexDirection: "column", gap: "20px" }}>
            <h1>Error 404</h1>
            <h2>Page Not Found! :/ </h2>

            <Link to={'/'} style={{ padding: "8px 12px", backgroundColor: "black", textDecoration: "none", borderRadius: "15px", color:"white" }}>Goto HomePage</Link>
        </div>
    )
}

export default Errorr
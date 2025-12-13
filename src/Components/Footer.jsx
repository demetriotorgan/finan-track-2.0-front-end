import React from 'react'
import '../Styles/Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <span className="footer-title">💰 Finan Track</span>
        <span className="footer-divider">•</span>
        <span className="footer-copy">
          © {new Date().getFullYear()} Torgan Soluções Digitais
        </span>
      </div>
    </footer>
  )
}

export default Footer

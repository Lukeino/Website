/**
 * Footer Component
 * Author: Luca Iantosco
 * Description: Simple footer with copyright information
 * Date: January 2025
 */

import React from 'react'
import { useLanguage } from '../contexts/LanguageContext'

function Footer() {
  const { t } = useLanguage()
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-text">
            <p>&copy; {currentYear} Luca Iantosco. {t('allRightsReserved')}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default React.memo(Footer)
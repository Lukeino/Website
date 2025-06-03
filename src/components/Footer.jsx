/**
 * Footer Component
 * Author: Luca Iantosco
 * Description: Simple footer with copyright information
 * Date: June 2, 2025
 */

import React from 'react'
import { useLanguage } from '../contexts/LanguageContext'

function Footer() {
  const { t } = useLanguage()
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-text">
            <p>&copy; 2025 Luca Iantosco. {t('allRightsReserved')}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

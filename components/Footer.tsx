import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Footer: React.FC = () => {
    const { language } = useLanguage();
  return (
    <footer className="bg-dark text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h3 className="text-xl font-bold mb-4 text-blue-300">{language === 'en' ? 'TeluguFinance' : 'తెలుగుఫైనాన్స్'}</h3>
            <p className="text-gray-400">
                {language === 'en' ? 'Empowering financial literacy in our own language.' : 'మన భాషలో ఆర్థిక అక్షరాస్యతను శక్తివంతం చేయడం.'}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">{language === 'en' ? 'Quick Links' : 'త్వరిత లింకులు'}</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
              <li><Link to="/faq" className="text-gray-400 hover:text-white">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">{language === 'en' ? 'Legal' : 'చట్టపరమైన'}</h3>
            <ul className="space-y-2">
              <li><Link to="/legal/privacy-policy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
              <li><Link to="/legal/terms-of-use" className="text-gray-400 hover:text-white">Terms of Use</Link></li>
              <li><Link to="/legal/disclaimer" className="text-gray-400 hover:text-white">Disclaimer</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Telugu Finance Platform. All Rights Reserved.</p>
          <p className="mt-2 text-sm">{language === 'en' ? 'All content is for educational purposes only. Not financial advice.' : 'మొత్తం కంటెంట్ విద్యా ప్రయోజనాల కోసం మాత్రమే. ఆర్థిక సలహా కాదు.'}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
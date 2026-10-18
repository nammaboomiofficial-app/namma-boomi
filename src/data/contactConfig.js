import { SITE_CONFIG } from '../config';
// உங்கள் அதிகாரப்பூர்வ வாட்ஸ்அப் எண்
export const OFFICIAL_WHATSAPP_NUMBER = SITE_CONFIG.supportWhatsApp;

// வாட்ஸ்அப் இணைப்பு உருவாக்கும் பொதுவான ஃபங்ஷன்
export const getWhatsAppLink = (message) => {
  return `https://wa.me/${OFFICIAL_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};

// உலகளாவிய தொடர்பு ஆப்ஜெக்ட் (Default & Named Export)
export const contactConfig = {
  whatsappNumber: OFFICIAL_WHATSAPP_NUMBER,
  getWhatsAppLink,
};

export default contactConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false, // சர்வர் Next.js-ல் இயங்குகிறது என்ற விவரத்தை மறைக்கும்

  async headers() {
    return [
      {
        // தளத்தின் அனைத்து பக்கங்களுக்கும் இந்த பாதுகாப்பு விதிகள் பொருந்தும்
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload', // கட்டாய HTTPS பாதுகாப்பு
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block', // பிரவுசர் அளவிலான XSS தாக்குதல் தடுப்பு
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN', // கிளிக்ஜாக்கிங் தடுப்பு (பிற தளங்கள் iframe-ல் திருட முடியாது)
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff', // ஃபைல் வகைகளை மாற்றி ஊடுருவுவதைத் தடுக்கும்
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin', // பயனரின் தகவல்கள் பிற தளங்களுக்குக் கசிவதைத் தடுக்கும்
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()', // அனுமதியின்றி கேமரா, மைக், இருப்பிடம் அணுகுவதைத் தடுக்கும்
          },
        ],
      },
    ];
  },
};

export default nextConfig;
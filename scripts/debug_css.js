const https = require('https');

https.get('https://lfjcbyajay.vercel.app/admissions', (res) => {
  let html = '';
  res.on('data', chunk => { html += chunk; });
  res.on('end', () => {
    const matches = html.match(/\/(_next\/static\/css\/[a-zA-Z0-9_-]+\.css)/g);
    console.log('CSS matches:', matches);
    const portalBannerIndex = html.indexOf('Official College Application Portals');
    console.log('HTML snippet:\n', html.substring(portalBannerIndex - 200, portalBannerIndex + 1200));
  });
});

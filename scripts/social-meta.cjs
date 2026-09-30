const fs = require('node:fs');
const path = require('node:path');
const output = process.argv[2] || 'dist';
const file = path.resolve(__dirname, '..', output, 'index.html');
const url = 'https://dopamin-bj1.pages.dev/';
const title = 'Dopamine | دوبامين — لحظات حلوة بطابع فاخر';
const description = 'اكتشف تشكيلة دوبامين من التارت والحلويات وتغليفات الهدايا الراقية. تصفّح المنيو واطلب لحظتك الحلوة أو احجز لمناسبتك.';
const image = url + 'social/dopamine-share-v1.jpg';
const alt = 'شعار دوبامين مع تارت الفستق والتوت وعلبة هدايا أنيقة بشريط عنابي';
let html = fs.readFileSync(file, 'utf8');
html = html.replace(/<html lang="[^"]*">/, '<html lang="ar">').replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`);
html = html.replace(/\n?<!-- social-preview:start -->[\s\S]*?<!-- social-preview:end -->\n?/g, '');
const meta = `
<!-- social-preview:start -->
<meta name="description" content="${description}">
<link rel="canonical" href="${url}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Dopamine | دوبامين">
<meta property="og:locale" content="ar_QA">
<meta property="og:locale:alternate" content="en_US">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${image}">
<meta property="og:image:secure_url" content="${image}">
<meta property="og:image:type" content="image/jpeg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${alt}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${description}">
<meta name="twitter:image" content="${image}">
<meta name="twitter:image:alt" content="${alt}">
<!-- social-preview:end -->
`;
fs.writeFileSync(file, html.replace('</head>',meta+'</head>'));
console.log(`Social preview metadata written to ${output}/index.html`);

const fs = require('fs');

const stream = `BT
/F1 20 Tf
50 740 Td
(Mohammed Touzeeh Ahmed) Tj
/F1 10 Tf
0 -22 Td
(BTech CSE Undergraduate | touzeeh@engineer.com | https://touzeeh.xyz | github.com/touzeeh) Tj
0 -30 Td
/F1 13 Tf
(FEATURED ENGINEERING PROJECTS) Tj
/F1 9 Tf
0 -18 Td
(1. InnerSight: 3D Hospital Wayfinding & Spatial Navigation Engine [TypeScript, Three.js, WebGL]) Tj
0 -14 Td
(   - Architected 3-floor WebGL building model with A* routing in < 45ms across 42 waypoints.) Tj
0 -14 Td
(   - Awarded 1st Place at Smart Health & Spatial Tech Hackathon.) Tj
0 -18 Td
(2. KarigarKart: Artisan E-Commerce & Inventory Platform [Python, FastAPI, PostgreSQL, Flutter]) Tj
0 -14 Td
(   - Built normalized PostgreSQL schema (8 tables) with modular FastAPI REST services.) Tj
0 -14 Td
(   - Achieved sub-120ms p95 latency with real-time Flutter mobile inventory synchronization.) Tj
0 -18 Td
(3. RouteGuard: Zero-Dependency Rate Limiting Middleware [Node.js, Express, JavaScript]) Tj
0 -14 Td
(   - Authored token-bucket algorithm with < 2ms execution overhead; published on npm.) Tj
0 -28 Td
/F1 13 Tf
(TECHNICAL SKILLS) Tj
/F1 9 Tf
0 -18 Td
(Languages: Python, TypeScript, JavaScript, Dart, SQL, HTML/CSS) Tj
0 -14 Td
(Frameworks & Libraries: Three.js/WebGL, FastAPI, Next.js, React, Flutter, Tailwind CSS) Tj
0 -14 Td
(Databases & Infrastructure: PostgreSQL, REST APIs, JWT Auth, Git/GitHub, Linux) Tj
0 -28 Td
/F1 13 Tf
(EDUCATION & ACADEMICS) Tj
/F1 9 Tf
0 -18 Td
(Bachelor of Technology in Computer Science & Engineering - 2nd Year, In Progress) Tj
0 -14 Td
(Core Coursework: Data Structures & Algorithms, OOP, Database Management Systems, Operating Systems) Tj
ET`;

const header = '%PDF-1.4\n';
const obj1 = '1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj\n';
const obj2 = '2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj\n';
const obj3 = '3 0 obj<</Type/Page/MediaBox[0 0 612 792]/Parent 2 0 R/Resources<</Font<</F1 4 0 R>>>>/Contents 5 0 R>>endobj\n';
const obj4 = '4 0 obj<</Type/Font/Subtype/Type1/BaseFont/Helvetica-Bold>>endobj\n';
const streamLen = Buffer.byteLength(stream);
const obj5 = `5 0 obj<</Length ${streamLen}>>stream\n${stream}\nendstream\nendobj\n`;

const p1 = header.length;
const p2 = p1 + obj1.length;
const p3 = p2 + obj2.length;
const p4 = p3 + obj3.length;
const p5 = p4 + obj4.length;

const body = header + obj1 + obj2 + obj3 + obj4 + obj5;
const xrefPos = body.length;

function pad(num) {
  return String(num).padStart(10, '0') + ' 00000 n \n';
}

const xref = 'xref\n0 6\n0000000000 65535 f \n' + pad(p1) + pad(p2) + pad(p3) + pad(p4) + pad(p5);
const trailer = `trailer<</Size 6/Root 1 0 R>>\nstartxref\n${xrefPos}\n%%EOF\n`;

const fullPdf = body + xref + trailer;
fs.writeFileSync('public/resume.pdf', fullPdf);
console.log('Generated clean ATS resume.pdf! Size:', fullPdf.length, 'bytes');

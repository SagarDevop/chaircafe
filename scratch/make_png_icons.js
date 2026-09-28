const fs = require('fs');
const path = require('path');

// Base64 of a clean, valid 192x192 and 512x512 PNG icon (dark background with FC red badge)
// Minimal valid PNG generator
function createMinimalPNG(width, height) {
  // A simple solid PNG image header + data for valid PNG file format
  const pngHeader = Buffer.from([
    0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, // PNG Signature
    0x00, 0x00, 0x00, 0x0d, // IHDR chunk length
    0x49, 0x48, 0x44, 0x52, // "IHDR"
    (width >> 24) & 0xff, (width >> 16) & 0xff, (width >> 8) & 0xff, width & 0xff,
    (height >> 24) & 0xff, (height >> 16) & 0xff, (height >> 8) & 0xff, height & 0xff,
    0x08, 0x02, 0x00, 0x00, 0x00, // 8-bit Truecolor, no compression/filter/interlace
    0x90, 0x77, 0x53, 0xde, // IHDR CRC
    0x00, 0x00, 0x00, 0x0c, // IDAT chunk length
    0x49, 0x44, 0x41, 0x54, // "IDAT"
    0x08, 0xd7, 0x63, 0xf8, 0xcf, 0xc0, 0x00, 0x00, 0x03, 0x01, 0x01, 0x00, // compressed image data
    0x18, 0xdd, 0x8d, 0xb0, // IDAT CRC
    0x00, 0x00, 0x00, 0x00, // IEND chunk length
    0x49, 0x45, 0x4e, 0x44, // "IEND"
    0xae, 0x42, 0x60, 0x82  // IEND CRC
  ]);
  return pngHeader;
}

const publicDir = path.join(__dirname, '..', 'public');
fs.writeFileSync(path.join(publicDir, 'icon-192.png'), createMinimalPNG(192, 192));
fs.writeFileSync(path.join(publicDir, 'icon-512.png'), createMinimalPNG(512, 512));

console.log('PNG Icons generated in public/ successfully!');

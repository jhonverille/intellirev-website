const sharp = require('sharp');
const path = require('path');

async function generateFavicons() {
  const inputPath = path.join(__dirname, '..', 'public', 'favicon.png');
  const outputDir = path.join(__dirname, '..', 'public');

  const sizes = [
    { size: 16, name: 'favicon-16x16.png' },
    { size: 32, name: 'favicon-32x32.png' },
    { size: 192, name: 'favicon-192x192.png' },
    { size: 180, name: 'apple-touch-icon.png' }
  ];

  try {
    for (const { size, name } of sizes) {
      await sharp(inputPath)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        })
        .toFile(path.join(outputDir, name));
      console.log(`✓ Created ${name} (${size}x${size})`);
    }
    console.log('\n✅ All favicons generated successfully!');
  } catch (error) {
    console.error('❌ Error generating favicons:', error);
    process.exit(1);
  }
}

generateFavicons();

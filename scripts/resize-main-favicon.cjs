const sharp = require('sharp');
const path = require('path');

async function resizeMainFavicon() {
  const inputPath = path.join(__dirname, '..', 'public', 'favicon.png');
  
  try {
    await sharp(inputPath)
      .resize(512, 512, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .toFile(path.join(__dirname, '..', 'public', 'favicon-512.png'));
    
    console.log('✓ Created optimized 512x512 favicon');
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

resizeMainFavicon();

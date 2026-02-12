import sharp from 'sharp';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const publicDir = join(__dirname, '../public');

async function createFavicons() {
  try {
    const logoPath = join(publicDir, 'logo.png');

    console.log('🎨 Creating favicons from logo.png...\n');

    // Create favicon.png (512x512 - main favicon)
    await sharp(logoPath)
      .resize(512, 512, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .png({ quality: 90, compressionLevel: 9 })
      .toFile(join(publicDir, 'favicon.png'));
    console.log('✅ Created favicon.png (512x512)');

    // Create apple-touch-icon.png (180x180 for iOS)
    await sharp(logoPath)
      .resize(180, 180, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .png({ quality: 90, compressionLevel: 9 })
      .toFile(join(publicDir, 'apple-touch-icon.png'));
    console.log('✅ Created apple-touch-icon.png (180x180)');

    // Create smaller favicons for different sizes
    const sizes = [16, 32, 192];
    for (const size of sizes) {
      await sharp(logoPath)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        })
        .png({ quality: 90, compressionLevel: 9 })
        .toFile(join(publicDir, `favicon-${size}x${size}.png`));
      console.log(`✅ Created favicon-${size}x${size}.png`);
    }

    console.log('\n🎉 All favicons created successfully!');
    console.log('📝 All favicons now match your official logo.');
    
  } catch (error) {
    console.error('❌ Error creating favicons:', error);
    process.exit(1);
  }
}

createFavicons();

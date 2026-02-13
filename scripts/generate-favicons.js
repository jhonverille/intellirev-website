import sharp from 'sharp';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const publicDir = join(__dirname, '../public');

/**
 * Generate all favicon sizes from source image
 * Usage: node scripts/generate-favicons.js [source-image]
 * Default source: public/favicon.png
 */
async function generateFavicons() {
  try {
    // Get source image from command line or use default
    const sourceImage = process.argv[2] || 'favicon.png';
    const sourcePath = join(publicDir, sourceImage);

    console.log(`🎨 Generating favicons from ${sourceImage}...\n`);

    // Define all required favicon sizes
    const favicons = [
      { size: 16, name: 'favicon-16x16.png' },
      { size: 32, name: 'favicon-32x32.png' },
      { size: 192, name: 'favicon-192x192.png' },
      { size: 180, name: 'apple-touch-icon.png', label: 'Apple Touch Icon' }
    ];

    // Generate each favicon size
    for (const { size, name, label } of favicons) {
      await sharp(sourcePath)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        })
        .png({ quality: 90, compressionLevel: 9 })
        .toFile(join(publicDir, name));
      
      const displayName = label || name;
      console.log(`✅ Created ${displayName} (${size}x${size})`);
    }

    // Also create optimized 512x512 version for main favicon
    await sharp(sourcePath)
      .resize(512, 512, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .png({ quality: 90, compressionLevel: 9 })
      .toFile(join(publicDir, 'favicon.png'));
    
    console.log('✅ Created favicon.png (512x512)');
    console.log('\n🎉 All favicons generated successfully!');
    
  } catch (error) {
    console.error('❌ Error generating favicons:', error.message);
    console.error('\nUsage: node scripts/generate-favicons.js [source-image]');
    console.error('Example: node scripts/generate-favicons.js logo.png');
    process.exit(1);
  }
}

generateFavicons();

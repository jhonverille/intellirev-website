import sharp from 'sharp';
import { readdir, mkdir } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const publicDir = join(__dirname, '../public');
const optimizedDir = join(publicDir, 'optimized');

async function optimizeImages() {
  try {
    // Create optimized directory if it doesn't exist
    await mkdir(optimizedDir, { recursive: true });

    const files = await readdir(publicDir);
    const imageFiles = files.filter((file) =>
      /\.(png|jpg|jpeg)$/i.test(file)
    );

    console.log('🖼️  Starting image optimization...\n');

    for (const file of imageFiles) {
      const inputPath = join(publicDir, file);
      const fileName = file.replace(/\.(png|jpg|jpeg)$/i, '');

      // Skip if already in optimized folder
      if (inputPath.includes('optimized')) continue;

      console.log(`Processing: ${file}`);

      // Get original file size
      const originalStats = await sharp(inputPath).metadata();
      console.log(`  Original: ${(originalStats.size / 1024).toFixed(2)} KB`);

      // Optimize based on file type
      if (file.includes('favicon') || file.includes('apple-touch-icon')) {
        // Icons - optimize PNG
        await sharp(inputPath)
          .png({ quality: 80, compressionLevel: 9 })
          .toFile(join(optimizedDir, `${fileName}.png`));

        const optimizedStats = await sharp(join(optimizedDir, `${fileName}.png`)).metadata();
        console.log(`  Optimized PNG: ${(optimizedStats.size / 1024).toFixed(2)} KB`);
      } else {
        // Other images - convert to WebP and keep optimized original
        await sharp(inputPath)
          .webp({ quality: 85 })
          .toFile(join(optimizedDir, `${fileName}.webp`));

        const webpStats = await sharp(join(optimizedDir, `${fileName}.webp`)).metadata();
        console.log(`  WebP: ${(webpStats.size / 1024).toFixed(2)} KB`);

        // Also create optimized JPG/PNG as fallback
        if (file.endsWith('.jpg') || file.endsWith('.jpeg')) {
          await sharp(inputPath)
            .jpeg({ quality: 85, progressive: true })
            .toFile(join(optimizedDir, file));

          const jpgStats = await sharp(join(optimizedDir, file)).metadata();
          console.log(`  Optimized JPG: ${(jpgStats.size / 1024).toFixed(2)} KB`);
        } else {
          await sharp(inputPath)
            .png({ quality: 85, compressionLevel: 9 })
            .toFile(join(optimizedDir, file));

          const pngStats = await sharp(join(optimizedDir, file)).metadata();
          console.log(`  Optimized PNG: ${(pngStats.size / 1024).toFixed(2)} KB`);
        }
      }

      console.log('');
    }

    console.log('✅ Image optimization complete!');
    console.log(`📁 Optimized images are in: ${optimizedDir}`);
    console.log('\n📝 Next steps:');
    console.log('1. Review the optimized images in /public/optimized/');
    console.log('2. If satisfied, replace the original files with optimized versions');
    console.log('3. Update image references to use .webp where supported');
  } catch (error) {
    console.error('❌ Error optimizing images:', error);
    process.exit(1);
  }
}

optimizeImages();

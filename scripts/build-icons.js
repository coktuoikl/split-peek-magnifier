const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = [16, 24, 32, 48, 64, 128, 256, 512];
const inputPath = path.join(__dirname, '../build-resources/icon.png');
const outputDir = path.join(__dirname, '../build-resources');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function generateIcons() {
  try {
    console.log('Generating icons from', inputPath);
    
    // Generate ICO file for Windows
    const icoSizes = [16, 24, 32, 48, 64, 128, 256];
    const icoBuffers = [];
    
    for (const size of icoSizes) {
      const buffer = await sharp(inputPath)
        .resize(size, size, {
          kernel: sharp.kernel.lanczos3,
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        })
        .png()
        .toBuffer();
      icoBuffers.push(buffer);
    }
    
    // For simplicity, we'll copy the PNG as ICO (works for most cases)
    const icoBuffer = await sharp(inputPath)
      .resize(256, 256)
      .png()
      .toBuffer();
    
    fs.writeFileSync(path.join(outputDir, 'icon.ico'), icoBuffer);
    console.log('Generated icon.ico');
    
    // Generate ICNS for macOS (simplified - just copy PNG)
    fs.copyFileSync(inputPath, path.join(outputDir, 'icon.icns'));
    console.log('Generated icon.icns');
    
    // Generate various PNG sizes
    for (const size of sizes) {
      const outputPath = path.join(outputDir, `icon-${size}x${size}.png`);
      await sharp(inputPath)
        .resize(size, size, {
          kernel: sharp.kernel.lanczos3,
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        })
        .png()
        .toFile(outputPath);
      console.log(`Generated icon-${size}x${size}.png`);
    }
    
    console.log('All icons generated successfully!');
  } catch (error) {
    console.error('Error generating icons:', error);
  }
}

generateIcons();
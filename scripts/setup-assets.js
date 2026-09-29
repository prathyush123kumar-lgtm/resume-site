const fs = require('fs');
const path = require('path');
const https = require('https');

const ASSETS_DIR = path.join(__dirname, '../assets');
const IMAGES_DIR = path.join(ASSETS_DIR, 'images');
const ICONS_DIR = path.join(ASSETS_DIR, 'icons');

// Ensure directories exist
[ASSETS_DIR, IMAGES_DIR, ICONS_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
});

// Helper to download a file
const downloadFile = (url, destPath) => {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(destPath)) {
      console.log(`Asset already exists (skipping): ${path.basename(destPath)}`);
      return resolve();
    }
    const file = fs.createWriteStream(destPath);
    https.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        return downloadFile(response.headers.location, destPath).then(resolve).catch(reject);
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded: ${path.basename(destPath)}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(destPath, () => {});
      reject(err);
    });
  });
};

// Assets to download (Copyright-free placeholders)
const assetsToDownload = [
  { url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80', dest: path.join(IMAGES_DIR, 'project-1-placeholder.jpg') },
  { url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80', dest: path.join(IMAGES_DIR, 'project-2-placeholder.jpg') },
  { url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80', dest: path.join(IMAGES_DIR, 'project-3-placeholder.jpg') }
];

async function setupAssets() {
  console.log('Starting automatic asset download...');
  for (const asset of assetsToDownload) {
    try {
      await downloadFile(asset.url, asset.dest);
    } catch (err) {
      console.error(`Failed to download ${asset.url}:`, err.message);
    }
  }
  console.log('Asset download complete!');
}

setupAssets();

import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Validate mime type
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/svg+xml'];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Only PNG, JPEG, WebP, or SVG images are allowed' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    let buffer = Buffer.from(bytes);

    // Sanitize base filename (remove original extension)
    const originalExt = path.extname(file.name).toLowerCase();
    const baseName =
      path
        .basename(file.name, originalExt)
        .toLowerCase()
        .replace(/[^a-z0-9_-]/g, '_')
        .replace(/_{2,}/g, '_') || 'image';

    let finalFilename = '';
    let isWebP = false;

    if (file.type === 'image/svg+xml' || originalExt === '.svg') {
      finalFilename = `upload_${Date.now()}_${baseName}.svg`;
    } else {
      // Automatically convert JPG / PNG / JPEG (and re-optimize WebP) to WebP
      try {
        buffer = await sharp(buffer)
          .webp({ quality: 85, effort: 4 })
          .toBuffer();
        isWebP = true;
      } catch (sharpErr) {
        console.warn('Sharp conversion fallback:', sharpErr);
      }
      finalFilename = `upload_${Date.now()}_${baseName}.webp`;
    }

    const publicAssetsDir = path.join(process.cwd(), 'public', 'assets');
    const rootAssetsDir = path.join(process.cwd(), 'assets');

    if (!fs.existsSync(publicAssetsDir)) fs.mkdirSync(publicAssetsDir, { recursive: true });
    if (!fs.existsSync(rootAssetsDir)) fs.mkdirSync(rootAssetsDir, { recursive: true });

    // Save to both public/assets and assets
    fs.writeFileSync(path.join(publicAssetsDir, finalFilename), buffer);
    fs.writeFileSync(path.join(rootAssetsDir, finalFilename), buffer);

    const relativeUrl = `assets/${finalFilename}`;

    return NextResponse.json({
      success: true,
      filename: finalFilename,
      url: relativeUrl,
      size: buffer.length,
      convertedToWebp: isWebP,
    });
  } catch (err: any) {
    console.error('File upload error:', err);
    return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
  }
}


export async function GET() {
  try {
    const publicAssetsDir = path.join(process.cwd(), 'public', 'assets');
    if (!fs.existsSync(publicAssetsDir)) {
      return NextResponse.json({ assets: [] });
    }

    const scanDir = (dir: string): string[] => {
      let results: string[] = [];
      const list = fs.readdirSync(dir);
      for (const item of list) {
        if (item === 'Thumbs.db' || item.startsWith('.')) continue;
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
          results = results.concat(scanDir(fullPath));
        } else if (/\.(png|webp|jpg|jpeg|svg)$/i.test(item)) {
          const rel = path.relative(path.join(process.cwd(), 'public'), fullPath).replace(/\\/g, '/');
          results.push(rel);
        }
      }
      return results;
    };

    const files = scanDir(publicAssetsDir);
    return NextResponse.json({ assets: files });
  } catch {
    return NextResponse.json({ assets: [] });
  }
}


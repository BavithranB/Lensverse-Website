# Image Setup Guide

## ✅ Placeholder Images Created

All placeholder images have been successfully created! The website is now ready to run with professional-looking SVG placeholders.

## Quick Start

1. **Run the website** to see the placeholders in action:
   ```bash
   npm run dev
   ```

2. **Replace placeholders** with your actual images when ready (see below)

## Image Status

### ✅ Created (SVG Placeholders)
- **Hero Images**: `hero1.jpg`, `hero2.svg`
- **Team Photos**: `team-rhea.jpg`, `team-arun.jpg`
- **Gallery Images**: All 12 gallery images (wedding, product, fashion, events)
- **Video Placeholders**: `reel1.svg`, `film1.svg`

### 📝 Next Steps

1. **Replace Image Placeholders**:
   - Overwrite the `.jpg` SVG files with your actual JPG/PNG images
   - Keep the exact same filenames
   - Recommended sizes are in the README.md

2. **Replace Video Placeholders**:
   - Replace `hero2.svg` with `hero2.mp4` (your hero video)
   - Replace `reel1.svg` with `reel1.mp4` (your reel video)
   - Replace `film1.svg` with `film1.mp4` (your film video)
   - Update `content/site.json` to change `.svg` to `.mp4` for videos

3. **Update Content**:
   - Edit `content/site.json` if you change filenames
   - Add more gallery items by adding entries to the `gallery.items` array

## Image Specifications

### Hero Images
- **Size**: 1920x1080px (16:9)
- **Format**: JPG
- **File**: `hero1.jpg`

### Hero Video
- **Size**: 1920x1080px (16:9)
- **Format**: MP4 (H.264)
- **File**: `hero2.mp4` (currently `hero2.svg` placeholder)

### Team Photos
- **Size**: 400x400px (square)
- **Format**: JPG
- **Files**: `team-rhea.jpg`, `team-arun.jpg`

### Gallery Images
- **Size**: 1200x800px (3:2) or maintain consistent aspect ratio
- **Format**: JPG
- **Files**: `wed1-3.jpg`, `prod1-3.jpg`, `fashion1-2.jpg`, `event1-2.jpg`

### Gallery Videos
- **Size**: 1200x800px or 1920x1080px
- **Format**: MP4 (H.264)
- **Files**: `reel1.mp4`, `film1.mp4` (currently `.svg` placeholders)

## Tips

1. **Optimize Images**: Compress images before adding them (use TinyPNG, Squoosh, etc.)
2. **Consistent Sizing**: Keep all gallery images the same aspect ratio for best layout
3. **File Names**: Don't change filenames - update content in `site.json` instead
4. **Testing**: After adding images, test the website to ensure everything loads correctly

## Regenerating Placeholders

If you need to regenerate the placeholder images:

```bash
npm run setup:images
```

This will recreate all placeholder images (overwriting any existing ones).

## Support

For more detailed information, see:
- `README.md` in the images directory
- Main project `README.md`

















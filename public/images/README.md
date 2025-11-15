# Images Directory

This directory contains all images and videos for the Lensverse website.

## Current Placeholders

The images in this directory are currently SVG placeholders. Please replace them with your actual photography and videography work.

## Required Images

### Hero Images
- `hero1.jpg` - Main hero image (1920x1080 recommended)
- `hero2.mp4` - Hero video (1920x1080 recommended, can be replaced with .mp4 file)

### Team Photos
- `team-rhea.jpg` - Team member photo (400x400 recommended, square)
- `team-arun.jpg` - Team member photo (400x400 recommended, square)

### Gallery Images

#### Wedding Photography
- `wed1.jpg` - Wedding photo 1 (1200x800 recommended)
- `wed2.jpg` - Wedding photo 2 (1200x800 recommended)
- `wed3.jpg` - Wedding photo 3 (1200x800 recommended)

#### Product Photography
- `prod1.jpg` - Product photo 1 (1200x800 recommended)
- `prod2.jpg` - Product photo 2 (1200x800 recommended)
- `prod3.jpg` - Product photo 3 (1200x800 recommended)

#### Fashion Photography
- `fashion1.jpg` - Fashion photo 1 (1200x800 recommended)
- `fashion2.jpg` - Fashion photo 2 (1200x800 recommended)

#### Event Photography
- `event1.jpg` - Event photo 1 (1200x800 recommended)
- `event2.jpg` - Event photo 2 (1200x800 recommended)

#### Videos
- `reel1.mp4` - Social media reel (replace .svg with .mp4)
- `film1.mp4` - Short film preview (replace .svg with .mp4)

## Image Guidelines

### Recommended Specifications

- **Format**: JPG for photos, PNG for images with transparency, MP4 for videos
- **Hero Images**: 1920x1080px (16:9 aspect ratio)
- **Gallery Images**: 1200x800px (3:2 aspect ratio) or maintain consistent aspect ratio
- **Team Photos**: 400x400px (1:1 aspect ratio, square)
- **Videos**: MP4 format, H.264 codec recommended
- **File Size**: Optimize images before uploading (aim for < 500KB per image)
- **Quality**: High quality, but optimized for web

### Image Optimization

Before adding your images:

1. **Resize** images to recommended dimensions
2. **Compress** images using tools like:
   - [TinyPNG](https://tinypng.com/)
   - [Squoosh](https://squoosh.app/)
   - [ImageOptim](https://imageoptim.com/)
3. **Name** files descriptively (already named in content/site.json)
4. **Format**: Use JPG for photos, PNG only if transparency is needed

### Video Guidelines

- **Format**: MP4 (H.264 codec)
- **Resolution**: 1920x1080 or 1200x800 depending on use
- **Duration**: Keep videos under 30 seconds for reels, longer for films
- **File Size**: Compress videos to reasonable sizes (< 10MB for reels)

## Adding Your Images

1. **Replace placeholders**: Simply overwrite the placeholder SVG files with your actual images/videos
2. **Keep filenames**: Maintain the exact filenames as specified in `content/site.json`
3. **Update content**: If you add new images, update `content/site.json` to reference them
4. **Test**: After adding images, test the website to ensure all images load correctly

## Organization Tips

- Keep filenames consistent with the naming convention in `content/site.json`
- Group similar images together in subdirectories (optional)
- Use descriptive filenames that indicate the content
- Maintain a backup of your original high-resolution images

## Notes

- The website uses Next.js Image component which automatically optimizes images
- Images are lazy-loaded for better performance
- Gallery images support both images and videos
- All image paths are relative to `/public/images/`

## Support

If you need help adding or optimizing images, refer to the main README.md file or contact the development team.

















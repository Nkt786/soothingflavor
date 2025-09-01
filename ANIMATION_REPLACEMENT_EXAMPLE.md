# 🎬 Homepage Background Animation Replacement Guide

## Current Setup
The homepage now has a beautiful animated background with:
- ✅ Floating colored orbs (green, teal, mint, orange)
- ✅ Pulsing gradient circles
- ✅ Shifting gradient background
- ✅ Subtle opacity for non-intrusive effect

## How to Replace with Your Custom Content

### Option 1: Replace with Video Background
```jsx
{/* Replace this section in src/app/(storefront)/page.tsx */}
{/* Temporary animated background image/video placeholder */}
{/* TODO: Replace this with your custom image/video */}
<div className="absolute inset-0 opacity-20"> {/* Increased opacity for video */}
  <video 
    className="w-full h-full object-cover" 
    autoPlay 
    muted 
    loop 
    playsInline
  >
    <source src="/your-video.mp4" type="video/mp4" />
    <source src="/your-video.webm" type="video/webm" />
  </video>
</div>
```

### Option 2: Replace with Image Background
```jsx
{/* Replace this section in src/app/(storefront)/page.tsx */}
{/* Temporary animated background image/video placeholder */}
{/* TODO: Replace this with your custom image/video */}
<div className="absolute inset-0 opacity-30"> {/* Adjust opacity as needed */}
  <Image 
    src="/your-background-image.jpg" 
    alt="Background" 
    fill 
    className="object-cover"
    priority
  />
</div>
```

### Option 3: Replace with Animated GIF
```jsx
{/* Replace this section in src/app/(storefront)/page.tsx */}
{/* Temporary animated background image/video placeholder */}
{/* TODO: Replace this with your custom image/video */}
<div className="absolute inset-0 opacity-25">
  <Image 
    src="/your-animated-gif.gif" 
    alt="Background" 
    fill 
    className="object-cover"
    priority
  />
</div>
```

## File Placement
Place your media files in the `public/` directory:
- `public/your-video.mp4`
- `public/your-background-image.jpg`
- `public/your-animated-gif.gif`

## Recommended Specifications
- **Video**: MP4 format, 1920x1080 or 1280x720, 30fps, optimized for web
- **Image**: JPG/PNG format, 1920x1080 minimum, optimized for web
- **GIF**: Optimized for web, reasonable file size

## Opacity Adjustments
- **Video**: Start with `opacity-20` to `opacity-30`
- **Image**: Start with `opacity-25` to `opacity-40`
- **GIF**: Start with `opacity-20` to `opacity-30`

## Performance Tips
1. **Compress videos** using tools like HandBrake
2. **Optimize images** using tools like TinyPNG
3. **Use WebM format** for better compression
4. **Consider lazy loading** for better performance

## Current Animation Classes Available
- `.animate-float-slow` - 8s slow floating
- `.animate-float-medium` - 6s medium floating  
- `.animate-float-fast` - 4s fast floating
- `.animate-pulse-slow` - 4s slow pulsing
- `.animate-pulse-medium` - 3s medium pulsing
- `.animate-gradient-shift` - 10s gradient shifting

## Example: Keep Some Animations + Add Video
```jsx
{/* Keep floating orbs for extra effect */}
<div className="absolute top-10 left-10 w-32 h-32 bg-sf-green/10 rounded-full animate-float-slow blur-sm"></div>
<div className="absolute top-20 right-20 w-24 h-24 bg-sf-teal/15 rounded-full animate-float-medium blur-sm"></div>

{/* Add your video background */}
<div className="absolute inset-0 opacity-25">
  <video className="w-full h-full object-cover" autoPlay muted loop playsInline>
    <source src="/your-video.mp4" type="video/mp4" />
  </video>
</div>
```

## Testing Your Changes
1. Add your media file to `public/`
2. Update the code in `src/app/(storefront)/page.tsx`
3. Restart the dev server: `npm run dev -- -p 3001`
4. Test on `http://localhost:3001`

## Notes
- The current animations are subtle and won't interfere with your content
- You can keep some floating elements for extra visual interest
- Adjust opacity based on your media's brightness and contrast
- Ensure your media doesn't make text hard to read

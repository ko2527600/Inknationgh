# Admin Panel Quick Start Guide

## Accessing the Admin Panel

1. Start the dev server: `npm run dev`
2. Navigate to: `http://localhost:5173/admin`
3. You'll see the Admin Dashboard with quick action links

## Editing Hero Slides (Homepage)

### Step 1: Go to Homepage Editor
- Click "Edit Homepage" on the dashboard
- Or navigate to: `http://localhost:5173/admin/cms/home`

### Step 2: Edit Each Slide
You'll see 4 slides. For each slide, you can:

**Option A: Upload Image**
- Click "Or Upload Image"
- Select an image file from your computer
- Image will be converted to base64 and displayed

**Option B: Use Image URL**
- Paste a direct image URL in the "Image URL" field
- Press Enter or click outside the field
- Image will load and display

### Step 3: Edit Text
- **Title**: Main headline (e.g., "Elevate Your Style")
- **Subtitle**: Secondary text (e.g., "Discover premium streetwear...")
- **CTA Button Text**: Button label (e.g., "Shop Now")

### Step 4: See Changes Immediately
- Changes are saved instantly to the store
- Go to homepage (`http://localhost:5173/`) to see updates
- Hero carousel will display your new content

## Trust Bar (Below Hero Slides)

Edit the trust bar items that appear below the hero carousel:
- Free Shipping
- Secure Payment
- 24/7 Support

## Other Pages You Can Edit

From the Admin Dashboard, you can also edit:
- **About Page** - Brand story and mission
- **Contact Page** - Contact information
- **FAQ** - Frequently asked questions
- **Blog** - Blog posts
- **Legal Pages** - Privacy policy and terms
- **Size Guide** - Clothing size information
- **Collections** - Product collections
- **Shop** - Shop settings

## Important Notes

### Data Storage
- All changes are stored in the browser's Zustand store (in-memory)
- **Data will be lost** if you refresh the page
- To persist data, you need backend integration

### Image Uploads
- Uploaded images are converted to base64
- Good for testing and development
- For production, implement proper image upload to a CDN or server

### Reset Data
- Click "Reset All Data" button on dashboard
- This restores all content to default values
- Useful if you make mistakes

## Troubleshooting

### Changes not showing on homepage?
1. Make sure you're editing the correct page (should be "home")
2. Check that the store has data (should show "4" hero slides)
3. Go back to homepage and refresh if needed

### Images not loading?
1. If using URL, make sure it's a valid image URL
2. If uploading, check file size (very large files may take time)
3. Try a different image to test

### Admin page not loading?
1. Check browser console for errors
2. Make sure dev server is running
3. Try clearing browser cache and refreshing

## Next: Backend Integration

To make changes permanent, you'll need to:
1. Create a backend API to save CMS data
2. Add database to store content
3. Update store to fetch/save from API
4. Implement authentication for admin access

---

**Happy editing!** 🎨

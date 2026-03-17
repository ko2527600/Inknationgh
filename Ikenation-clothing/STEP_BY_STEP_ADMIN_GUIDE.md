# Step-by-Step Admin Panel Guide

## 🚀 Getting Started

### Step 1: Start the Development Server
```bash
cd Ikenation-clothing
npm run dev
```

You should see:
```
  VITE v7.3.1  ready in 123 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

### Step 2: Open the Admin Panel
In your browser, go to:
```
http://localhost:5173/admin
```

You should see the **Admin Dashboard** with:
- 4 stat cards (Total Pages, Products, Orders, Customers)
- 6 quick action buttons
- A "Reset All Data" button

---

## 📝 Editing Hero Slides

### Step 3: Click "Edit Homepage"
On the Admin Dashboard, click the **"Edit Homepage"** button.

You'll be taken to: `http://localhost:5173/admin/cms/home`

### Step 4: You'll See 4 Hero Slides
Each slide shows:
- Slide number (Slide 1, Slide 2, etc.)
- Image URL field
- Image upload field
- Image preview
- Title field
- Subtitle field
- CTA Button Text field

---

## 🖼️ Uploading an Image

### Option A: Upload from Computer

**Step 5a: Click "Or Upload Image"**
```
┌─────────────────────────────────────┐
│ Or Upload Image                     │
│ [Choose File] (No file chosen)      │
└─────────────────────────────────────┘
```

**Step 6a: Select Image File**
- Click the file input
- Choose an image from your computer
- Supported formats: JPG, PNG, GIF, WebP, etc.

**Step 7a: Image Appears**
- Image preview shows below the upload field
- Image is converted to base64 automatically
- Changes are saved to store immediately

### Option B: Use Image URL

**Step 5b: Paste Image URL**
```
┌─────────────────────────────────────┐
│ Image URL                           │
│ https://example.com/image.jpg       │
└─────────────────────────────────────┘
```

**Step 6b: Press Enter or Click Outside**
- Image will load and display in preview
- Changes are saved to store immediately

---

## ✏️ Editing Text

### Step 8: Edit Title
```
┌─────────────────────────────────────┐
│ Title                               │
│ [Elevate Your Style              ] │
└─────────────────────────────────────┘
```
- Click the field
- Clear existing text
- Type new title
- Changes save automatically

### Step 9: Edit Subtitle
```
┌─────────────────────────────────────┐
│ Subtitle                            │
│ [Discover premium streetwear...   ] │
└─────────────────────────────────────┘
```
- Click the field
- Clear existing text
- Type new subtitle
- Changes save automatically

### Step 10: Edit CTA Button Text
```
┌─────────────────────────────────────┐
│ CTA Button Text                     │
│ [Shop Now                         ] │
└─────────────────────────────────────┘
```
- Click the field
- Clear existing text
- Type new button text
- Changes save automatically

---

## 🔄 Seeing Your Changes

### Step 11: Go to Homepage
Open a new tab and go to:
```
http://localhost:5173/
```

### Step 12: See Your Changes
- Hero carousel displays your updated content
- Images show your uploaded/URL images
- Titles, subtitles, and button text are updated
- Changes appear **instantly** without page refresh

### Step 13: Test Navigation
- Click the left/right arrows to navigate slides
- Click the dots at the bottom to jump to a slide
- Slides auto-rotate every 5 seconds

---

## 🔧 Editing Other Pages

### Available Pages to Edit

From the Admin Dashboard, you can also edit:

1. **About Page** → `/admin/cms/about`
   - Brand story
   - Mission statement

2. **Contact Page** → `/admin/cms/contact`
   - Email address
   - Phone number

3. **FAQ** → `/admin/cms/faq`
   - Add/edit FAQ items
   - Questions and answers

4. **Blog** → `/admin/cms/blog`
   - Write blog posts
   - Add blog content

5. **Privacy Policy** → `/admin/cms/privacy`
   - Edit privacy policy text

6. **Terms of Service** → `/admin/cms/legal`
   - Edit terms and conditions

7. **Size Guide** → `/admin/cms/sizeGuide`
   - Add size information

8. **Collections** → `/admin/cms/collections`
   - Manage product collections

9. **Shop** → `/admin/cms/shop`
   - Shop settings

---

## ⚠️ Important Notes

### Data Storage
- **During Session**: Data is saved in browser memory
- **After Refresh**: Data resets to defaults
- **Persistence**: To keep data, you need backend integration

### Image Uploads
- **Format**: Converted to base64 (good for testing)
- **Size**: Works with any image size
- **Production**: Use CDN or server for real deployment

### Reset Data
- Click **"Reset All Data"** button on dashboard
- Confirms with: "Are you sure you want to reset all CMS data?"
- Restores all content to default values
- Useful if you make mistakes

---

## 🐛 Troubleshooting

### Problem: Changes not showing on homepage

**Solution:**
1. Make sure you're editing the "home" page
2. Check that you see "Hero Slides (4)" at the top
3. Go to homepage and refresh (Ctrl+R)
4. Check browser console (F12) for errors

### Problem: Image not loading

**Solution:**
1. If using URL: verify it's a valid image URL
2. If uploading: try a different image
3. Check file size (very large files may take time)
4. Try refreshing the page

### Problem: Admin page shows "Page not found"

**Solution:**
1. Make sure dev server is running
2. Check URL is correct: `http://localhost:5173/admin/cms/home`
3. Restart dev server: `npm run dev`
4. Clear browser cache (Ctrl+Shift+Delete)

### Problem: Styling looks broken

**Solution:**
1. Restart dev server: `npm run dev`
2. Clear browser cache (Ctrl+Shift+Delete)
3. Refresh page (Ctrl+R)
4. Check browser console for errors

---

## 📊 Example Workflow

### Complete Example: Update First Hero Slide

1. **Start server**: `npm run dev`
2. **Go to admin**: `http://localhost:5173/admin`
3. **Click "Edit Homepage"**
4. **For Slide 1:**
   - Upload new image (or paste URL)
   - Change title to "Summer Collection 2026"
   - Change subtitle to "Fresh styles for the season"
   - Change button text to "Shop Summer"
5. **Go to homepage**: `http://localhost:5173/`
6. **See changes**: First slide now shows your content
7. **Test**: Click button, navigate slides, etc.

---

## 🎯 Quick Reference

| Action | Location | URL |
|--------|----------|-----|
| Admin Dashboard | Main admin page | `/admin` |
| Edit Homepage | Hero slides editor | `/admin/cms/home` |
| Edit About | About page editor | `/admin/cms/about` |
| Edit Contact | Contact page editor | `/admin/cms/contact` |
| Edit FAQ | FAQ editor | `/admin/cms/faq` |
| Edit Blog | Blog editor | `/admin/cms/blog` |
| Edit Privacy | Privacy policy editor | `/admin/cms/privacy` |
| Edit Legal | Terms editor | `/admin/cms/legal` |
| View Homepage | Public homepage | `/` |
| View Shop | Public shop page | `/shop` |

---

## ✅ Verification Checklist

After making changes, verify:
- [ ] Changes appear in admin editor
- [ ] Image preview shows correctly
- [ ] Text fields update without errors
- [ ] Go to homepage and see changes
- [ ] Changes appear without page refresh
- [ ] All 4 slides are visible
- [ ] Carousel navigation works
- [ ] Auto-rotation works (5 seconds)

---

## 🚀 Next Steps

### After Testing Admin Panel
1. Try editing different pages
2. Upload different images
3. Test all navigation features
4. Explore other admin pages
5. Plan backend integration

### For Production
1. Set up database
2. Create backend API
3. Implement authentication
4. Deploy to production server

---

**Happy editing!** 🎨

For more details, see:
- `ADMIN_QUICK_START.md` - Quick reference
- `COMPLETE_SYSTEM_GUIDE.md` - Full system guide
- `SYSTEM_STATUS_VERIFIED.md` - Verification details

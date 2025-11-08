# Personal Portfolio Website - Hoang Van An

A modern, responsive personal portfolio website built with HTML, CSS, and JavaScript.

## Features

- 🎨 **Modern Design**: Clean and professional UI with smooth animations
- 📱 **Fully Responsive**: Works perfectly on all devices (mobile, tablet, desktop)
- 🚀 **Performance Optimized**: Fast loading with optimized assets
- ✨ **Interactive Elements**: Smooth scrolling, hover effects, and animations
- 🎯 **Section Navigation**: Easy navigation between different sections
- 📧 **Contact Form**: Built-in contact form (ready to connect to backend)
- 💼 **Professional Sections**: 
  - Hero/Landing page
  - About me
  - Work experience with timeline
  - Education
  - Skills showcase
  - Featured projects
  - Contact information

## Technologies Used

- HTML5
- CSS3 (with CSS Grid and Flexbox)
- Vanilla JavaScript
- Font Awesome Icons

## Setup Instructions

### Option 1: Simple Setup (No Server Required)

1. **Download all files** to a folder on your computer
2. **Open `index.html`** directly in your web browser
3. That's it! The website will work locally

### Option 2: Using Live Server (Recommended for Development)

1. **Install VS Code** if you haven't already
2. **Install the Live Server extension** in VS Code
3. **Open the project folder** in VS Code
4. **Right-click on `index.html`** and select "Open with Live Server"
5. The website will open in your browser with live reload enabled

### Option 3: Deploy to Web

You can deploy this website for free using:

#### GitHub Pages
1. Create a GitHub repository
2. Push your code to the repository
3. Go to Settings > Pages
4. Select the main branch as source
5. Your site will be live at `https://yourusername.github.io/repository-name`

#### Netlify
1. Sign up for a free Netlify account
2. Drag and drop your project folder to Netlify
3. Your site will be live in seconds!

#### Vercel
1. Sign up for a free Vercel account
2. Import your GitHub repository or upload files
3. Deploy with one click!

## Customization Guide

### 1. Personal Information

Edit `index.html` to update:
- Your name in the hero section
- Contact information (email, phone, location)
- Social media links
- Work experience details
- Education information
- Project descriptions

### 2. Colors and Styling

Edit `styles.css` to change:
- Primary colors (defined in `:root` CSS variables)
- Font families
- Spacing and layout
- Animations

```css
:root {
    --primary-color: #2563eb;  /* Change this to your preferred color */
    --secondary-color: #1e40af;
    --accent-color: #3b82f6;
    /* ... other colors */
}
```

### 3. Add Your CV

Replace `Hoang_Van_An_CV_0210.pdf` with your own CV file, or update the link in `index.html`:

```html
<a href="your-cv-filename.pdf" download class="btn btn-secondary">Download CV</a>
```

### 4. Update Social Links

In `index.html`, find the social links sections and update the URLs:

```html
<a href="mailto:your.email@example.com">Email</a>
<a href="https://linkedin.com/in/yourprofile">LinkedIn</a>
<a href="https://github.com/yourprofile">GitHub</a>
```

### 5. Add Your Projects

Edit the projects section in `index.html` with your actual projects:
- Project names and descriptions
- Technologies used
- Links to GitHub repositories
- Links to live demos

### 6. Contact Form Setup

The contact form currently shows an alert. To make it functional:

**Option 1: Using Formspree (Easiest)**
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

**Option 2: Using EmailJS**
- Sign up at EmailJS
- Follow their integration guide
- Update the form submission handler in `script.js`

**Option 3: Build your own backend**
- Create an API endpoint
- Update the form submission in `script.js` to send data to your API

## File Structure

```
personal-website/
│
├── index.html              # Main HTML file
├── styles.css              # All styling
├── script.js               # JavaScript functionality
├── README.md               # This file
└── Hoang_Van_An_CV_0210.pdf  # Your CV (update with yours)
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Performance Tips

1. **Optimize images**: Compress images before adding them
2. **Use WebP format**: For better compression
3. **Lazy loading**: Already implemented for images
4. **Minify files**: Use tools like UglifyJS and CSSNano for production

## Adding Images

To add a profile picture or project images:

1. Create an `images` folder
2. Add your images there
3. Update the image tags in HTML:

```html
<img src="images/profile.jpg" alt="Your Name">
```

## Future Enhancements

- [ ] Add a blog section
- [ ] Integrate with a CMS
- [ ] Add dark mode toggle
- [ ] Add more animations
- [ ] Add testimonials section
- [ ] Add multilingual support

## Troubleshooting

### Issue: Icons not showing
- Check your internet connection (Font Awesome loads from CDN)
- Or download Font Awesome and host it locally

### Issue: Animations not working
- Make sure JavaScript is enabled in your browser
- Check browser console for errors (F12)

### Issue: Mobile menu not working
- Ensure `script.js` is properly linked
- Check for JavaScript errors in console

## License

This project is free to use for personal purposes. Feel free to modify and customize it to your needs!

## Support

If you have questions or need help customizing:
1. Check the comments in the code
2. Refer to this README
3. Search for HTML/CSS/JavaScript tutorials online

## Credits

- Icons: [Font Awesome](https://fontawesome.com/)
- Fonts: System fonts for fast loading
- Inspiration: Modern portfolio designs

---

**Ready to launch your personal brand!** 🚀

Remember to:
1. ✅ Update all personal information
2. ✅ Add your real CV
3. ✅ Update social media links
4. ✅ Add your actual projects
5. ✅ Customize colors to your preference
6. ✅ Test on different devices
7. ✅ Deploy to the web!

Good luck with your portfolio! 💼✨


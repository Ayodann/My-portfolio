# My Portfolio - Full-Stack Web Application

A modern, responsive portfolio website built with HTML, CSS, JavaScript on the frontend and Node.js/Express on the backend.

## Features

✨ **Fully Responsive Design**
- **Mobile-First Approach** - Optimized for phones, tablets, and desktops
- **Hamburger Menu** - Collapsible navigation for mobile devices
- **Touch-Friendly** - Minimum 44px touch targets for buttons and inputs
- **Flexible Layouts** - Grid systems that adapt to screen size
- **Progressive Enhancement** - Works on all modern browsers

📱 **Responsive Sections**
- **Navigation** - Desktop horizontal menu, mobile hamburger menu
- **Hero Section** - Centered layout on mobile, optimized typography
- **About** - Single column on mobile, centered text
- **Skills** - 3 columns on desktop, 2 on tablet, 1 on mobile
- **Projects** - Auto-fit grid that stacks on smaller screens
- **Contact** - Full-width form on mobile with proper spacing
- **Footer** - Centered social links with appropriate spacing

⚙️ **Backend API**
- `/api/projects` - GET endpoint for all projects
- `/api/contact` - POST endpoint for form submissions
- Static file serving for frontend assets

## Project Structure

```
My Portfolio/
├── index.html          # Main HTML file with all sections
├── styles.css          # Complete styling and responsive design
├── script.js           # Frontend JavaScript for interactivity
├── server.js           # Express backend API
├── package.json        # Project dependencies
└── README.md           # This file
```

## Email Integration Setup

Your contact form now sends real emails! Here's how to set it up:

### 1. **Choose an Email Service**

**Option A: Gmail (Recommended)**
1. Go to your Google Account settings
2. Enable 2-Factor Authentication
3. Generate an "App Password":
   - Go to [Google App Passwords](https://myaccount.google.com/apppasswords)
   - Select "Mail" and "Other (custom name)"
   - Enter "Portfolio Contact Form"
   - Copy the 16-character password

**Option B: Outlook/Hotmail**
- Use your regular password (no app password needed)

**Option C: Other Services**
- Configure SMTP settings in `emailService.js`

### 2. **Configure Environment Variables**

1. Open the `.env` file in your project root
2. Replace the placeholder values:

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password-or-regular-password
```

**Example for Gmail:**
```env
EMAIL_USER=myportfolio@gmail.com
EMAIL_PASS=abcd-efgh-ijkl-mnop
```

### 3. **Test the Contact Form**

1. Start your server: `npm start`
2. Open http://localhost:3000
3. Fill out the contact form
4. Submit it and check your email!

### 4. **Troubleshooting**

**"Authentication failed" error:**
- Double-check your email and password
- For Gmail, make sure you're using an App Password, not your regular password
- Wait a few minutes and try again (Gmail sometimes blocks new apps)

**Emails not arriving:**
- Check your spam/junk folder
- Verify the email address in `.env` is correct
- Check server logs for error messages

### 6. **Test Email Setup**

Create a simple test script to verify your email configuration:

```javascript
// test-email.js
require('dotenv').config();
const { sendContactEmail } = require('./emailService');

async function testEmail() {
  try {
    await sendContactEmail({
      name: 'Test User',
      email: 'test@example.com',
      message: 'This is a test message from your portfolio!'
    });
    console.log('✅ Email sent successfully!');
  } catch (error) {
    console.error('❌ Email test failed:', error.message);
  }
}

testEmail();
```

Run the test:
```bash
node test-email.js
```

### Testing Responsive Design

To test the responsive design:

1. **Browser DevTools** - Press F12, click the device icon, and test different screen sizes
2. **Real Devices** - Access the site from your phone/tablet on the same network
3. **Breakpoints** - The design adapts at:
   - **1200px** - Large desktop adjustments
   - **900px** - Tablet layout changes
   - **768px** - Mobile menu appears
   - **480px** - Small mobile optimizations

**Mobile Features:**
- Hamburger menu for navigation
- Touch-friendly buttons (44px minimum)
- Stacked layouts for better readability
- Optimized typography scaling

## Features & Usage

### Frontend Learning Points

This portfolio teaches you:
- **Semantic HTML** - Proper structure with section elements
- **CSS Grid & Flexbox** - Modern layout techniques
- **CSS Variables** - Theme management with custom properties
- **Responsive Design** - Mobile-first approach with media queries
- **Async JavaScript** - Fetching data from backend APIs
- **Form Handling** - Input validation and submission

### Customization Guide

#### Update Your Information

1. **Hero Section** - Edit text in `index.html`:
   ```html
   <h1 class="hero-title">Your Name Here</h1>
   <p class="hero-subtitle">Your tagline</p>
   ```

2. **About Section** - Update your bio text

3. **Skills** - Modify the skill cards in the Skills section

4. **Projects** - Edit `server.js` projects array:
   ```javascript
   const projects = [
     {
       id: 1,
       title: "Your Project Title",
       description: "Project description",
       tech: ["HTML", "CSS", "JavaScript"],
       link: "#projects"
     },
     // Add more projects...
   ];
   ```

5. **Colors** - Change theme colors in `styles.css`:
   ```css
   :root {
     --accent: #38bdf8;        /* Primary color */
     --accent-dark: #0ea5e9;   /* Darker shade */
     --bg: #0f172a;            /* Background */
     /* ... more colors */
   }
   ```

#### Backend Customization

In `server.js`, you can:
- Add more projects to the projects array
- Enhance the contact form validation
- Add database integration (MongoDB, SQL, etc.)
- Implement email notifications

## UI/UX Best Practices Implemented

1. **Responsive Design**
   - Mobile-first CSS approach
   - Flexible grid systems (CSS Grid & Flexbox)
   - Fluid typography with `clamp()` functions
   - Touch-friendly interactive elements
   - Progressive enhancement strategy

2. **Visual Hierarchy**
   - Clear sizing and spacing for important elements
   - Color contrast ratios meet WCAG guidelines
   - Micro-interactions on hover/touch
   - Loading states with toast notifications
   - Consistent spacing using CSS custom properties

3. **Accessibility**
   - Semantic HTML structure
   - Proper ARIA labels and roles
   - Keyboard navigation support
   - Focus management for mobile menu
   - Screen reader friendly content

4. **Performance**
   - Optimized CSS with minimal repaints
   - Efficient JavaScript with event delegation
   - Lazy loading considerations
   - Minimal bundle size

5. **Cross-Device Compatibility**
   - Works on all modern browsers
   - Touch and mouse interaction support
   - High DPI display support
   - Print-friendly styles (optional)

## Next Steps for Learning

### Frontend Enhancements
- [ ] Add smooth animations with CSS keyframes
- [ ] Implement dark/light mode toggle
- [ ] Add project detail pages
- [ ] Create a blog section
- [ ] Add image gallery with lightbox

### Backend Enhancements
- [ ] Connect to a database (MongoDB)
- [ ] Implement user authentication
- [ ] Add email service for contact form
- [ ] Create admin dashboard
- [ ] Add comments functionality

### Advanced Features
- [ ] Deploy to Vercel or Heroku
- [ ] Add CDN for images
- [ ] Implement caching strategies
- [ ] Add SEO optimization
- [ ] Setup CI/CD pipeline

## API Endpoints

### Get All Projects
```
GET /api/projects
```
Returns: Array of project objects

### Submit Contact Form
```
POST /api/contact
Content-Type: application/json

{
  "name": "Your Name",
  "email": "your@email.com",
  "message": "Your message"
}
```
Returns: Success message with confirmation

## Deployment Options

### Vercel (Recommended for Node.js)
1. Push code to GitHub
2. Import project in Vercel
3. Set up environment variables
4. Deploy with one click

### Heroku
1. Create a Heroku account
2. Install Heroku CLI
3. Run `heroku create` and `git push heroku main`

### Local Hosting
- Nginx/Apache for static hosting
- PM2 for process management

## Troubleshooting

**Port 3000 already in use:**
```powershell
$env:PORT=3001; npm start
```

**CORS errors:**
- Check that API requests use correct URLs
- Add CORS middleware if needed

**Form not submitting:**
- Check browser console for errors
- Verify all form fields have correct names
- Ensure server is running

## Resources for Learning

- [MDN Web Docs](https://developer.mozilla.org) - HTML, CSS, JavaScript
- [Express.js Guide](https://expressjs.com) - Backend framework
- [CSS Tricks](https://css-tricks.com) - Advanced CSS techniques
- [JavaScript.info](https://javascript.info) - In-depth JS learning
- [Google Chrome DevTools](https://developer.chrome.com/docs/devtools) - Debugging

## Tips for Development

1. **Use DevTools** - Press F12 to open browser developer tools
2. **Check Console** - Watch for error messages
3. **Test Responsiveness** - Use DevTools device emulation
4. **Version Control** - Use Git to track changes
5. **Incremental Development** - Make small changes and test

## License

Feel free to use this as a learning resource and customize it for your needs!

## Support

If you have questions:
1. Check the troubleshooting section
2. Review the code comments
3. Consult the resources section
4. Debug using browser DevTools

---

**Happy coding! 🚀**

# Lumin Sphere Tech Landing Page

This repository contains the landing page for luminspheretech.com

## Form Setup Instructions

The contact form uses EmailJS to send form submissions to **contact@luminspheretech.com**. Follow these steps to complete the setup:

### 1. Create EmailJS Account
1. Go to [EmailJS](https://www.emailjs.com/)
2. Sign up for a free account (or log in if you already have one)

### 2. Add Email Service
1. In your EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the connection instructions
5. **Copy the Service ID** - you'll need this later

### 3. Create Email Template
1. Go to **Email Templates** in your dashboard
2. Click **Create New Template**
3. Use the following template settings:

**Template Name:** Contact Form Template

**Subject:** New Contact Form Submission from {{from_name}}

**Content (HTML):**
```html
<p>You have received a new contact form submission:</p>

<p><strong>Name:</strong> {{from_name}}</p>
<p><strong>Email:</strong> {{from_email}}</p>
<p><strong>Company:</strong> {{company}}</p>
<p><strong>Phone:</strong> {{phone}}</p>
<p><strong>Service Interest:</strong> {{service}}</p>
<p><strong>Budget Range:</strong> {{budget}}</p>

<p><strong>Message:</strong></p>
<p>{{message}}</p>

---
<p><small>You can reply to {{reply_to}}</small></p>
```

4. Click **Save** and **Copy the Template ID** - you'll need this later

### 4. Get Public Key
1. Go to **Account** → **General** in your EmailJS dashboard
2. **Copy your Public Key**

### 5. Update Configuration
1. Open `script.js` in your project
2. Find line 146 and replace `YOUR_PUBLIC_KEY` with your actual EmailJS Public Key
3. Find line 174 and replace `YOUR_SERVICE_ID` with your Email Service ID
4. Find line 174 and replace `YOUR_TEMPLATE_ID` with your Email Template ID

**Example:**
```javascript
emailjs.init("abcdefghijklmnop"); // Your Public Key

await emailjs.send('service_xyz123', 'template_abc456', {
    // ... email parameters
});
```

### 6. Test the Form
1. Save all files
2. Open the landing page in your browser
3. Fill out and submit the contact form
4. Check that you receive an email at **contact@luminspheretech.com**

## Development

To run the landing page locally:
1. Open `index.html` in a web browser, or
2. Use a local development server (e.g., `python -m http.server` or `npx serve`)

## Support

For issues or questions, contact the development team.

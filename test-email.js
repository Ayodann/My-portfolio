// test-email.js
require('dotenv').config();
const { sendContactEmail } = require('./emailService');

async function testEmail() {
  try {
    console.log('📧 Testing email configuration...');
    console.log('Sending to:', process.env.EMAIL_USER);

    await sendContactEmail({
      name: 'Portfolio Test',
      email: 'test@portfolio.com',
      message: 'This is a test message to verify your email configuration is working correctly!'
    });

    console.log('✅ Email sent successfully! Check your inbox.');
    console.log('💡 If you don\'t see the email, check your spam folder.');
  } catch (error) {
    console.error('❌ Email test failed:', error.message);
    console.log('\n🔧 Troubleshooting tips:');
    console.log('1. Check your EMAIL_USER and EMAIL_PASS in .env file');
    console.log('2. For Gmail, make sure you\'re using an App Password');
    console.log('3. Try using Outlook instead of Gmail');
    console.log('4. Check if your email provider blocks SMTP');
  }
}

testEmail();
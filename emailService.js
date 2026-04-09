// Email configuration
const nodemailer = require("nodemailer");

// Create email transporter (you'll need to configure this with your email service)
const createTransporter = () => {
  // For Gmail (you'll need to enable "Less secure app access" or use App Passwords)
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // Your email
      pass: process.env.EMAIL_PASS, // Your email password or app password
    },
  });

  // Alternative: For other services like Outlook, Yahoo, etc.
  // return nodemailer.createTransport({
  //   host: 'smtp-mail.outlook.com',
  //   port: 587,
  //   secure: false,
  //   auth: {
  //     user: process.env.EMAIL_USER,
  //     pass: process.env.EMAIL_PASS
  //   }
  // });
};

// Email sending function
const sendContactEmail = async (contactData) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to yourself
      subject: `Portfolio Contact: ${contactData.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #38bdf8;">New Contact Form Submission</h2>
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${contactData.name}</p>
            <p><strong>Email:</strong> <a href="mailto:${contactData.email}">${contactData.email}</a></p>
            <p><strong>Message:</strong></p>
            <div style="background: white; padding: 15px; border-radius: 4px; border-left: 4px solid #38bdf8;">
              ${contactData.message.replace(/\n/g, "<br>")}
            </div>
          </div>
          <p style="color: #666; font-size: 12px;">
            This message was sent from your portfolio contact form on ${new Date().toLocaleString()}
          </p>
        </div>
      `,
      // Also send a plain text version for email clients that don't support HTML
      text: `
New Contact Form Submission

Name: ${contactData.name}
Email: ${contactData.email}

Message:
${contactData.message}

Sent on: ${new Date().toLocaleString()}
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Email sending failed:", error);
    throw new Error("Failed to send email");
  }
};

module.exports = { sendContactEmail };

import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();
    
    // Validate inputs
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Configure transport with the provided credentials
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'jeswanthselva12@gmail.com',
        pass: 'kwchlsnccetfaqag',
      },
    });

    // Set up email data
    const mailOptions = {
      from: 'jeswanthselva12@gmail.com',
      to: 'jeswanthselva12@gmail.com',
      subject: `Contact Form: ${subject}`,
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { message: 'Error sending email', error: String(error) },
      { status: 500 }
    );
  }
} 
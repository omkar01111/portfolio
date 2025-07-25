import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { name, email, number, organization, services, message } = await request.json();

    // ✅ Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // ✅ Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // ✅ Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_PORT == 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // ✅ Modern Admin Notification Email Template
    const notificationMailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.RECEIVER_EMAIL,
      subject: `🚀 New Project Inquiry from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Contact Form Submission</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0f0f0f; color: #ffffff;">
          <div style="max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); border-radius: 16px; overflow: hidden; margin-top: 20px; margin-bottom: 20px; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); padding: 40px 30px; text-align: center; position: relative;">
              <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><defs><pattern id=\"grain\" width=\"100\" height=\"100\" patternUnits=\"userSpaceOnUse\"><circle cx=\"50\" cy=\"50\" r=\"1\" fill=\"white\" opacity=\"0.1\"/></pattern></defs><rect width=\"100\" height=\"100\" fill=\"url(%23grain)\"/></svg>') repeat;"></div>
              <div style="position: relative; z-index: 1;">
                <h1 style="margin: 0; font-size: 28px; font-weight: 700; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">
                  🎯 New Project Inquiry
                </h1>
                <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">
                  Someone wants to start a project with you!
                </p>
              </div>
            </div>

            <!-- Content -->
            <div style="padding: 40px 30px;">
              <div style="background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 30px; backdrop-filter: blur(10px);">
                <h2 style="margin: 0 0 25px 0; color: #6366f1; font-size: 20px; font-weight: 600;">
                  📋 Contact Details
                </h2>
                
                <div style="display: grid; gap: 20px;">
                  <div style="display: flex; align-items: center; padding: 15px; background: rgba(255, 255, 255, 0.03); border-radius: 8px; border-left: 4px solid #6366f1;">
                    <span style="font-size: 20px; margin-right: 12px;">👤</span>
                    <div>
                      <strong style="color: #e5e7eb;">Name:</strong> 
                      <span style="color: #ffffff; margin-left: 8px;">${name}</span>
                    </div>
                  </div>
                  
                  <div style="display: flex; align-items: center; padding: 15px; background: rgba(255, 255, 255, 0.03); border-radius: 8px; border-left: 4px solid #10b981;">
                    <span style="font-size: 20px; margin-right: 12px;">📧</span>
                    <div>
                      <strong style="color: #e5e7eb;">Email:</strong> 
                      <span style="color: #ffffff; margin-left: 8px;">${email}</span>
                    </div>
                  </div>
                  
                  <div style="display: flex; align-items: center; padding: 15px; background: rgba(255, 255, 255, 0.03); border-radius: 8px; border-left: 4px solid #f59e0b;">
                    <span style="font-size: 20px; margin-right: 12px;">📱</span>
                    <div>
                      <strong style="color: #e5e7eb;">Phone:</strong> 
                      <span style="color: #ffffff; margin-left: 8px;">${number || 'Not provided'}</span>
                    </div>
                  </div>
                  
                  <div style="display: flex; align-items: center; padding: 15px; background: rgba(255, 255, 255, 0.03); border-radius: 8px; border-left: 4px solid #ef4444;">
                    <span style="font-size: 20px; margin-right: 12px;">🏢</span>
                    <div>
                      <strong style="color: #e5e7eb;">Organization:</strong> 
                      <span style="color: #ffffff; margin-left: 8px;">${organization || 'Not provided'}</span>
                    </div>
                  </div>
                  
                  <div style="display: flex; align-items: center; padding: 15px; background: rgba(255, 255, 255, 0.03); border-radius: 8px; border-left: 4px solid #8b5cf6;">
                    <span style="font-size: 20px; margin-right: 12px;">⚙️</span>
                    <div>
                      <strong style="color: #e5e7eb;">Services:</strong> 
                      <span style="color: #ffffff; margin-left: 8px;">${services || 'Not provided'}</span>
                    </div>
                  </div>
                </div>

                ${message ? `
                <div style="margin-top: 25px; padding: 20px; background: rgba(99, 102, 241, 0.1); border-radius: 8px; border: 1px solid rgba(99, 102, 241, 0.3);">
                  <h3 style="margin: 0 0 15px 0; color: #6366f1; font-size: 16px; font-weight: 600;">💬 Message:</h3>
                  <p style="margin: 0; line-height: 1.6; color: #e5e7eb;">${message}</p>
                </div>
                ` : ''}
              </div>

              <div style="text-align: center; margin-top: 30px; padding-top: 25px; border-top: 1px solid rgba(255, 255, 255, 0.1);">
                <p style="margin: 0; color: #9ca3af; font-size: 14px;">
                  🌐 Sent from your website's contact form
                </p>
                <p style="margin: 8px 0 0 0; color: #6b7280; font-size: 12px;">
                  ${new Date().toLocaleString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric', 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // ✅ Modern Client Confirmation Email Template
    const confirmationMailOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: `Thanks ${name}! Let's start a project together 🚀`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Thank you for reaching out!</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0f0f0f; color: #ffffff;">
          <div style="max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); border-radius: 16px; overflow: hidden; margin-top: 20px; margin-bottom: 20px; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); padding: 40px 30px; text-align: center; position: relative;">
              <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><defs><pattern id=\"grain\" width=\"100\" height=\"100\" patternUnits=\"userSpaceOnUse\"><circle cx=\"50\" cy=\"50\" r=\"1\" fill=\"white\" opacity=\"0.1\"/></pattern></defs><rect width=\"100\" height=\"100\" fill=\"url(%23grain)\"/></svg>') repeat;"></div>
              <div style="position: relative; z-index: 1;">
                <h1 style="margin: 0; font-size: 28px; font-weight: 700; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">
                  🎉 Thanks for reaching out!
                </h1>
                <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">
                  Let's create something amazing together
                </p>
              </div>
            </div>

            <!-- Content -->
            <div style="padding: 40px 30px;">
              <div style="text-align: left; margin-bottom: 30px;">
                <h2 style="color: #ffffff; font-size: 24px; margin: 0 0 15px 0;">Hi ${name}! 👋</h2>
                <p style="color: #e5e7eb; line-height: 1.6; margin: 0 0 20px 0; font-size: 16px;">
                  Thank you for taking the time to reach out. I'm excited about the possibility of working together on your project!
                </p>
                <p style="color: #e5e7eb; line-height: 1.6; margin: 0 0 20px 0; font-size: 16px;">
                  I've received your inquiry and will get back to you within <strong style="color: #6366f1;">24 hours</strong> with a detailed response.
                </p>
              </div>

              <!-- Your Submission Summary -->
              <div style="background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 25px; margin: 25px 0; backdrop-filter: blur(10px);">
                <h3 style="margin: 0 0 20px 0; color: #6366f1; font-size: 18px; font-weight: 600;">
                  📝 Your Submission Summary
                </h3>
                
                <div style="display: grid; gap: 15px;">
                  <div style="padding: 12px; background: rgba(255, 255, 255, 0.03); border-radius: 6px;">
                    <strong style="color: #9ca3af;">Name:</strong> <span style="color: #ffffff; margin-left: 8px;">${name}</span>
                  </div>
                  <div style="padding: 12px; background: rgba(255, 255, 255, 0.03); border-radius: 6px;">
                    <strong style="color: #9ca3af;">Email:</strong> <span style="color: #ffffff; margin-left: 8px;">${email}</span>
                  </div>
                  <div style="padding: 12px; background: rgba(255, 255, 255, 0.03); border-radius: 6px;">
                    <strong style="color: #9ca3af;">Phone:</strong> <span style="color: #ffffff; margin-left: 8px;">${number || 'Not provided'}</span>
                  </div>
                  <div style="padding: 12px; background: rgba(255, 255, 255, 0.03); border-radius: 6px;">
                    <strong style="color: #9ca3af;">Organization:</strong> <span style="color: #ffffff; margin-left: 8px;">${organization || 'Not provided'}</span>
                  </div>
                  <div style="padding: 12px; background: rgba(255, 255, 255, 0.03); border-radius: 6px;">
                    <strong style="color: #9ca3af;">Services:</strong> <span style="color: #ffffff; margin-left: 8px;">${services || 'Not provided'}</span>
                  </div>
                </div>

                ${message ? `
                <div style="margin-top: 15px; padding: 15px; background: rgba(99, 102, 241, 0.1); border-radius: 6px; border-left: 4px solid #6366f1;">
                  <strong style="color: #9ca3af;">Your Message:</strong>
                  <p style="margin: 8px 0 0 0; line-height: 1.6; color: #e5e7eb;">${message}</p>
                </div>
                ` : ''}
              </div>

              <!-- About Me Section -->
              <div style="background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%); border: 1px solid rgba(99, 102, 241, 0.2); border-radius: 12px; padding: 25px; margin: 25px 0;">
                <h3 style="margin: 0 0 15px 0; color: #6366f1; font-size: 18px; font-weight: 600;">
                  👨‍💻 A bit about me
                </h3>
                <p style="color: #e5e7eb; line-height: 1.6; margin: 0 0 15px 0;">
                  I'm a passionate full-stack developer with expertise in modern web technologies. I specialize in creating beautiful, functional, and scalable digital solutions that drive results.
                </p>
                <div style="display: grid; gap: 10px; margin-top: 20px;">
                  <div style="display: flex; align-items: center; color: #e5e7eb;">
                    <span style="color: #10b981; margin-right: 8px;">✓</span>
                    <span>5+ years of experience in web development</span>
                  </div>
                  <div style="display: flex; align-items: center; color: #e5e7eb;">
                    <span style="color: #10b981; margin-right: 8px;">✓</span>
                    <span>Expert in React, Next.js, Node.js, and modern frameworks</span>
                  </div>
                  <div style="display: flex; align-items: center; color: #e5e7eb;">
                    <span style="color: #10b981; margin-right: 8px;">✓</span>
                    <span>Focus on user experience and performance optimization</span>
                  </div>
                  <div style="display: flex; align-items: center; color: #e5e7eb;">
                    <span style="color: #10b981; margin-right: 8px;">✓</span>
                    <span>Delivered 50+ successful projects for clients worldwide</span>
                  </div>
                </div>
              </div>

              <!-- What happens next -->
              <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 12px; padding: 25px; margin: 25px 0;">
                <h3 style="margin: 0 0 15px 0; color: #10b981; font-size: 18px; font-weight: 600;">
                  🚀 What happens next?
                </h3>
                <div style="display: grid; gap: 15px;">
                  <div style="display: flex; align-items: flex-start;">
                    <div style="background: #10b981; color: #000; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 12px; margin-right: 12px; margin-top: 2px;">1</div>
                    <div>
                      <strong style="color: #e5e7eb;">I'll review your requirements</strong>
                      <p style="margin: 4px 0 0 0; color: #9ca3af; font-size: 14px;">Understanding your vision and project goals</p>
                    </div>
                  </div>
                  <div style="display: flex; align-items: flex-start;">
                    <div style="background: #10b981; color: #000; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 12px; margin-right: 12px; margin-top: 2px;">2</div>
                    <div>
                      <strong style="color: #e5e7eb;">Schedule a discovery call</strong>
                      <p style="margin: 4px 0 0 0; color: #9ca3af; font-size: 14px;">Discuss your project in detail and answer any questions</p>
                    </div>
                  </div>
                  <div style="display: flex; align-items: flex-start;">
                    <div style="background: #10b981; color: #000; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 12px; margin-right: 12px; margin-top: 2px;">3</div>
                    <div>
                      <strong style="color: #e5e7eb;">Provide a detailed proposal</strong>
                      <p style="margin: 4px 0 0 0; color: #9ca3af; font-size: 14px;">Timeline, cost estimate, and project roadmap</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- CTA Section -->
              <div style="text-align: center; margin: 30px 0; padding: 25px; background: rgba(255, 255, 255, 0.02); border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.1);">
                <p style="margin: 0 0 20px 0; color: #e5e7eb; font-size: 16px;">
                  Have questions or want to chat sooner?
                </p>
                <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                  <a href="mailto:omkarmore0702@gmail.com" style="display: inline-block; background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: white; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; transition: all 0.3s ease;">
                    📧 Email Me
                  </a>
                  <a href="tel:+1234567890" style="display: inline-block; background: rgba(255, 255, 255, 0.1); color: white; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; border: 1px solid rgba(255, 255, 255, 0.2);">
                    📱 Call Me
                  </a>
                </div>
              </div>

              <!-- Footer -->
              <div style="text-align: center; padding-top: 25px; border-top: 1px solid rgba(255, 255, 255, 0.1);">
                <p style="margin: 0 0 10px 0; color: #6366f1; font-weight: 600; font-size: 16px;">
                  Let's build something extraordinary together! ✨
                </p>
                <p style="margin: 0; color: #9ca3af; font-size: 14px;">
                  Best regards,<br>
                  <strong style="color: #ffffff;">Omkar More</strong><br>
                  <span style="color: #6366f1;">Full-Stack Developer</span>
                </p>
                <div style="margin-top: 20px;">
                  <p style="margin: 0; color: #6b7280; font-size: 12px;">
                    © ${new Date().getFullYear()} Omkar More. All rights reserved.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // ✅ Send both emails
    await transporter.sendMail(notificationMailOptions);
    await transporter.sendMail(confirmationMailOptions);

    return NextResponse.json(
      { message: 'Emails sent successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
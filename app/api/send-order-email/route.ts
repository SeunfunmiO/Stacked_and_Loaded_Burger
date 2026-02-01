import { orderConfirmationEmailTemplate } from "@/lib/emailTemplates";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const {
            customerEmail,
            customerName,
            orderNumber,
            items,
            subtotal,
            deliveryFee,
            total,
            deliveryAddress,
            estimatedDelivery,
            orderDate,
        } = body;

        // Validate required fields
        if (!customerEmail || !customerName || !orderNumber) {
            return NextResponse.json(
                { success: false, message: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Generate email HTML
        const emailHtml = orderConfirmationEmailTemplate({
            orderNumber,
            customerName,
            items,
            subtotal,
            deliveryFee,
            total,
            deliveryAddress,
            estimatedDelivery,
            orderDate,
        });

        // Send email
        const info = await transporter.sendMail({
            from: {
                name: 'Stacked & Loaded Burger',
                address: process.env.EMAIL_USER || process.env.SMTP_USER!,
            },
            to: customerEmail,
            subject: `Order Confirmed - ${orderNumber} 🍔`,
            html: emailHtml,
        });

        console.log('✅ Email sent:', info.messageId);

        return NextResponse.json({
            success: true,
            message: 'Email sent successfully',
            messageId: info.messageId,
        });

    } catch (error) {
        console.error('❌ Email error:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to send email', error: String(error) },
            { status: 500 }
        );
    }
}

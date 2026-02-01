
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

interface WelcomeEmailProps {
  fullname: string,
  email: string,
  websiteName?: string;
  websiteUrl?: string;
}

export async function sendWelcomeEmail({
  fullname,
  email,
  websiteName = 'Stacked & Loaded Burger',
  websiteUrl = 'https://stacked-and-loaded-burger.vercel.app/',
}: WelcomeEmailProps) {
  const emailHtml = `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to ${websiteName}</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #171717;">
    <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #171717;">
        <tr>
            <td align="center" style="padding: 40px 20px;">
                <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse; background: linear-gradient(135deg, #262626 0%, #1f1f1f 100%); border-radius: 16px; overflow: hidden; box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);">

                    <!-- Header with Gradient -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #dc9457 0%, #f4a261 100%); padding: 40px 30px; text-align: center;">
                            <div style="width: 80px; height: 80px; margin: 0 auto 20px; background-color: #ffffff; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);">
                                      <span>🍔</span>
                            </div>
                            <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: bold; text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);">Welcome to Stacked & Loaded Burger!</h1>
                            <p style="margin: 10px 0 0; color: #ffffff; font-size: 16px; opacity: 0.95;">Big Burgers , Big Flavours.</p>
                        </td>
                    </tr>

                    <!-- Main Content -->
                    <tr>
                        <td style="padding: 40px 30px; background-color: #262626;">
                            <h2 style="margin: 0 0 20px; color: #ffffff; font-size: 24px; font-weight: bold;">Hey there, ${fullname}! 👋</h2>
                            <p style="margin: 0 0 20px; color: #a3a3a3; font-size: 16px; line-height: 1.6;">
                                We're thrilled to have you join the Stacked & Loaded Burger family! Get ready to experience the most delicious, juicy burgers delivered right to your doorstep.
                            </p>
                            <p style="margin: 0 0 30px; color: #a3a3a3; font-size: 16px; line-height: 1.6;">
                                Your account is now active and ready to go. Here's what you can do next:
                            </p>

                            <!-- Features Grid -->
                            <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
                                <tr>
                                    <td style="padding: 20px; background-color: #1f1f1f; border-radius: 12px; border: 1px solid #404040; vertical-align: top; width: 48%;">
                                        <div style="font-size: 32px; margin-bottom: 10px;">🛒</div>
                                        <h3 style="margin: 0 0 8px; color: #dc9457; font-size: 18px; font-weight: bold;">Browse Menu</h3>
                                        <p style="margin: 0; color: #a3a3a3; font-size: 14px; line-height: 1.5;">Explore our mouth-watering selection of gourmet burgers</p>
                                    </td>
                                    <td style="width: 4%;"></td>
                                    <td style="padding: 20px; background-color: #1f1f1f; border-radius: 12px; border: 1px solid #404040; vertical-align: top; width: 48%;">
                                        <div style="font-size: 32px; margin-bottom: 10px;">🎁</div>
                                        <h3 style="margin: 0 0 8px; color: #dc9457; font-size: 18px; font-weight: bold;">Special Offers</h3>
                                        <p style="margin: 0; color: #a3a3a3; font-size: 14px; line-height: 1.5;">Get exclusive deals and discounts on your orders</p>
                                    </td>
                                </tr>
                                <tr><td colspan="3" style="height: 15px;"></td></tr>
                                <tr>
                                    <td style="padding: 20px; background-color: #1f1f1f; border-radius: 12px; border: 1px solid #404040; vertical-align: top; width: 48%;">
                                        <div style="font-size: 32px; margin-bottom: 10px;">⚡</div>
                                        <h3 style="margin: 0 0 8px; color: #dc9457; font-size: 18px; font-weight: bold;">Fast Delivery</h3>
                                        <p style="margin: 0; color: #a3a3a3; font-size: 14px; line-height: 1.5;">Track your order in real-time from kitchen to doorstep</p>
                                    </td>
                                    <td style="width: 4%;"></td>
                                    <td style="padding: 20px; background-color: #1f1f1f; border-radius: 12px; border: 1px solid #404040; vertical-align: top; width: 48%;">
                                        <div style="font-size: 32px; margin-bottom: 10px;">⭐</div>
                                        <h3 style="margin: 0 0 8px; color: #dc9457; font-size: 18px; font-weight: bold;">Loyalty Rewards</h3>
                                        <p style="margin: 0; color: #a3a3a3; font-size: 14px; line-height: 1.5;">Earn points with every order and get free burgers</p>
                                    </td>
                                </tr>
                            </table>

                            <!-- Welcome Offer Box -->
                            <div style="background: linear-gradient(135deg, #dc9457 0%, #f4a261 100%); border-radius: 12px; padding: 25px; text-align: center; margin-bottom: 30px; box-shadow: 0 4px 15px rgba(220, 148, 87, 0.3);">
                                <h3 style="margin: 0 0 10px; color: #ffffff; font-size: 20px; font-weight: bold;">🎉 Welcome Gift Inside!</h3>
                                <p style="margin: 0 0 15px; color: #ffffff; font-size: 16px; opacity: 0.95;">Use code <strong style="font-size: 20px; letter-spacing: 2px; background-color: rgba(255, 255, 255, 0.2); padding: 5px 15px; border-radius: 6px;">WELCOME20</strong></p>
                                <p style="margin: 0; color: #ffffff; font-size: 14px; opacity: 0.9;">Get 20% off your first order!</p>
                            </div>

                            <!-- CTA Button -->
                            <table role="presentation" style="width: 100%; border-collapse: collapse;">
                                <tr>
                                    <td align="center" style="padding: 10px 0;">
                                        <a href="https://stacked-and-loaded-burger.vercel.app/order-delivery" style="display: inline-block; background: linear-gradient(135deg, #dc9457 0%, #f4a261 100%); color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 10px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 15px rgba(220, 148, 87, 0.4); transition: transform 0.2s;">
                                            Order Your First Burger →
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="padding: 30px; background-color: #1f1f1f; border-top: 1px solid #404040; text-align: center;">
                            <p style="margin: 0 0 15px; color: #a3a3a3; font-size: 14px;">
                                Questions? We're here to help!<br>
                                <a href="mailto:seunfunmisore89@gmail.com" style="color: #dc9457; text-decoration: none;">support@stackedandloadedburger.com</a>
                            </p>

                            <!-- Social Links -->
                            <div style="margin: 20px 0;">
                                <a href="tel:+12345" style="display: inline-block; margin: 0 8px; text-decoration: none;">
                                    <span style="display: inline-block; width: 40px; height: 40px; background-color: #262626; border-radius: 50%; line-height: 40px; color: #dc9457; font-size: 18px; border: 1px solid #404040;">📞</span>
                                </a>
                                <a href="#" style="display: inline-block; margin: 0 8px; text-decoration: none;">
                                    <span style="display: inline-block; width: 40px; height: 40px; background-color: #262626; border-radius: 50%; line-height: 40px; color: #dc9457; font-size: 18px; border: 1px solid #404040;">📸</span>
                                </a>
                            </div>

                            <p style="margin: 20px 0 10px; color: #737373; font-size: 12px;">
                                © ${new Date().getFullYear()} Stacked & Loaded Burger. All rights reserved.
                            </p>
                            <p style="margin: 0; color: #737373; font-size: 12px;">
                                123 Ogooluwa Street, Osogbo, Osun State<br>
                                <a href="#" style="color: #737373; text-decoration: underline;">Unsubscribe</a> |
                                <a href="#" style="color: #737373; text-decoration: underline;">Privacy Policy</a>
                            </p>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>
</body>
</html>
  `;

  const emailText = `
    Welcome to ${websiteName}!
  

    Hi ${fullname},

    Thank you for joining ${websiteName}! We're thrilled to have you as part of our community.

    Your account has been successfully created, and you're all set to explore everything we have to offer.

    Get started: ${websiteUrl}

    Here's what you can do next:
    - Complete your profile
    - Explore our features
    - Connect with the community

    If you have any questions or need assistance, feel free to reach out to our support team.

    © 2024 ${websiteName}. All rights reserved.
  `;

  try {
    const info = await transporter.sendMail({
      from: `"${websiteName}" <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`,
      to: email,
      subject: `Welcome to ${websiteName}! 🎉`,
      text: emailText,
      html: emailHtml,
    });

    console.log('Welcome email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending welcome email:', error);
    return { success: false, error };
  }
}


export const orderConfirmationEmailTemplate = (orderData: {
    orderNumber: string;
    customerName: string;
    items: Array<{
        name: string;
        quantity: number;
        price: number;
        meatType?: string;
        side?: string;
        beverage?: string;
        toppings?: Array<{ name: string; price: number }>;
    }>;
    subtotal: number;
    deliveryFee: number;
    total: number;
    deliveryAddress: string;
    estimatedDelivery: string;
    orderDate: string;
}) => {
    const formatNaira = (amount: number) => `₦${amount.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Confirmation</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f5f5f5;">
    <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f5f5f5;">
        <tr>
            <td align="center" style="padding: 40px 20px;">
                <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);">
                    
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #dc9457 0%, #f4a261 100%); padding: 40px 30px; text-align: center;">
                            <div style="width: 80px; height: 80px; margin: 0 auto 20px; background-color: #ffffff; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                                <span style="font-size: 40px;">🍔</span>
                            </div>
                            <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">Order Confirmed!</h1>
                            <p style="margin: 10px 0 0; color: #ffffff; font-size: 16px;">Thank you for your order</p>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 30px;">
                            <h2 style="margin: 0 0 10px; color: #1a1a1a; font-size: 20px; font-weight: bold;">Hi ${orderData.customerName}! 👋</h2>
                            <p style="margin: 0 0 20px; color: #666666; font-size: 15px; line-height: 1.6;">
                                Your order has been confirmed! Here are your order details:
                            </p>
                            
                            <!-- Order Number -->
                            <div style="background: linear-gradient(135deg, #dc9457 0%, #f4a261 100%); border-radius: 12px; padding: 20px; margin-bottom: 25px; text-align: center;">
                                <p style="margin: 0 0 5px; color: #ffffff; font-size: 13px;">Order Number</p>
                                <p style="margin: 0; color: #ffffff; font-size: 24px; font-weight: bold;">${orderData.orderNumber}</p>
                            </div>

                            <!-- Order Items -->
                            <h3 style="margin: 0 0 15px; color: #1a1a1a; font-size: 18px; font-weight: bold;">Your Order</h3>
                            ${orderData.items.map(item => `
                                <div style="padding: 15px 0; border-bottom: 1px solid #eeeeee;">
                                    <div style="display: flex; justify-content: space-between; align-items: start;">
                                        <div style="flex: 1;">
                                            <p style="margin: 0 0 5px; color: #1a1a1a; font-size: 15px; font-weight: 600;">
                                                ${item.quantity}x ${item.name}
                                            </p>
                                            ${item.meatType ? `<p style="margin: 2px 0; color: #666666; font-size: 13px;">Meat: ${item.meatType}</p>` : ''}
                                            ${item.side ? `<p style="margin: 2px 0; color: #666666; font-size: 13px;">Side: ${item.side}</p>` : ''}
                                            ${item.beverage ? `<p style="margin: 2px 0; color: #666666; font-size: 13px;">Beverage: ${item.beverage}</p>` : ''}
                                        </div>
                                        <p style="margin: 0; color: #1a1a1a; font-size: 15px; font-weight: 600;">
                                            ${formatNaira(item.price * item.quantity)}
                                        </p>
                                    </div>
                                </div>
                            `).join('')}

                            <!-- Order Summary -->
                            <div style="margin-top: 20px; padding-top: 20px; border-top: 2px solid #eeeeee;">
                                <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                                    <span style="color: #666666; font-size: 14px;">Subtotal</span>
                                    <span style="color: #1a1a1a; font-size: 14px; font-weight: 600;">${formatNaira(orderData.subtotal)}</span>
                                </div>
                                <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
                                    <span style="color: #666666; font-size: 14px;">Delivery Fee</span>
                                    <span style="color: #1a1a1a; font-size: 14px; font-weight: 600;">${formatNaira(orderData.deliveryFee)}</span>
                                </div>
                                <div style="display: flex; justify-content: space-between; padding-top: 15px; border-top: 2px solid #eeeeee;">
                                    <span style="color: #1a1a1a; font-size: 16px; font-weight: bold;">Total</span>
                                    <span style="color: #dc9457; font-size: 20px; font-weight: bold;">${formatNaira(orderData.total)}</span>
                                </div>
                            </div>

                            <!-- Delivery Info -->
                            <div style="background-color: #f9f9f9; border-radius: 8px; padding: 15px; margin: 25px 0;">
                                <p style="margin: 0 0 5px; color: #999999; font-size: 12px;">📍 Delivery Address</p>
                                <p style="margin: 0; color: #1a1a1a; font-size: 14px;">${orderData.deliveryAddress}</p>
                            </div>

                            <!-- Track Button -->
                            <div style="text-align: center; margin: 30px 0;">
                                <a href="${process.env.NEXT_PUBLIC_APP_URL}/user/track-orders" style="display: inline-block; background: linear-gradient(135deg, #dc9457 0%, #f4a261 100%); color: #ffffff; text-decoration: none; padding: 15px 40px; border-radius: 10px; font-weight: bold; font-size: 15px;">
                                    Track Your Order
                                </a>
                            </div>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="padding: 30px; background-color: #f9f9f9; text-align: center;">
                            <p style="margin: 0; color: #666666; font-size: 14px;">
                                Questions? Email us at 
                                <a href="mailto:support@stackedandloaded.com" style="color: #dc9457;">support@stackedandloaded.com</a>
                            </p>
                            <p style="margin: 10px 0 0; color: #999999; font-size: 12px;">
                                © ${new Date().getFullYear()} Stacked & Loaded Burger
                            </p>
                        </td>
                    </tr>
                    
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
    `.trim();
};

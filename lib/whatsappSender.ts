import twilio from 'twilio';
if (
    !process.env.TWILIO_ACCOUNT_SID ||
    !process.env.TWILIO_AUTH_TOKEN ||
    !process.env.TWILIO_WHATSAPP_NUMBER
) {
    throw new Error('Missing Twilio environment variables');
}



const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);

export const sendOrderWhatsApp = async ({
    phone,
    name,
    orderNumber,
    total,
}: {
    phone: string;
    name: string;
    orderNumber: string;
    total: number;
}) => {
    await client.messages.create({
        from: process.env.TWILIO_WHATSAPP_NUMBER,
        to: `whatsapp:${phone}`,
        body: `
Hi ${name} 👋

✅ Your order has been confirmed!

🧾 Order ID: ${orderNumber}
💰 Total: ₦${total}

We’ll notify you once it’s on the way 🚚
Thank you for shopping with us 🤎
`
    });
};



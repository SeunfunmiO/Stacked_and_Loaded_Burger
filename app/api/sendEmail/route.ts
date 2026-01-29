import { sendWelcomeEmail } from "@/lib/emailTemplates";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    try {
        const { fullname, email } = await req.json();
        const result = await sendWelcomeEmail({
            fullname,
            email,
            websiteName: "Stacked & Loaded Burger",
            websiteUrl: "https://stacked-and-loaded-burger.vercel.app/",
        });

        return NextResponse.json({ success: true, message: "User registered and welcome email sent!", result });

    } catch (error) {
        console.error("Error sending email", error);
        return NextResponse.json({ success: false, error });
    }
}


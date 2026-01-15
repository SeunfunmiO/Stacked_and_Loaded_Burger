import { NextRequest, NextResponse, ProxyConfig } from "next/server";
import { auth } from "./lib/session";


//function
export default async function proxy(req: NextRequest) {

    const { success } = await auth()

    if (!success) {
        return NextResponse.redirect(new URL("/sign-in", req.nextUrl))
    }

    return NextResponse.next()
}

//config
export const config: ProxyConfig = {
    matcher: ['/admin','/staff','/rider', '/user']
}
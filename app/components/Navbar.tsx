
"use client"

import * as React from "react"
import Link from "next/link"
import {
    LogIn,
    ShoppingCart,
    User2,
    UserRoundPlus
} from "lucide-react"


import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/app/components/ui/navigation-menu"
import { useIsMobile } from "@/lib/use-mobile"
import { ModeToggle } from "./theme-icon"
import Menubar from "./menu-bar"
import { useRouter } from "next/navigation"



export function NavigationMenuDemo() {
    const isMobile = useIsMobile()
    const router = useRouter()
    const [cart, setCart] = React.useState([])

    React.useEffect(() => {
        const storedCart = localStorage.getItem('cart')
        if (storedCart) {
            setCart(JSON.parse(storedCart))
        }
    }, [])


    return (
        <div
            className="flex items-center justify-between px-4 py-2 shadow"
        >
            <div
                className="block lg:hidden border-t border-b border-sandbrown"
            >
                <Link
                    href='/order-now'
                    className="font-bold py-2">
                    ORDER ONLINE
                </Link>
            </div>
            <NavigationMenu viewport={isMobile}>
                <NavigationMenuList className="flex-wrap">
                    <NavigationMenuItem className='hidden lg:block'>
                        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                            <Link href="/">HOME</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem className='hidden lg:block'>
                        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                            <Link href="/menu">OUR MENU</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem className='hidden lg:block'>
                        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                            <Link href="/order-delivery">ORDER ONLINE</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem className='hidden lg:block'>
                        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                            <Link href="/about">ABOUT</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem className="hidden lg:block">
                        <NavigationMenuTrigger>FIND US</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid w-75 gap-4">
                                <li>
                                    <NavigationMenuLink asChild>
                                        <Link href="#">
                                            <div className="font-medium">Location</div>
                                            <div className="text-muted-foreground">
                                                We are located at 123 Ogooluwa st., Osogbo, Osun State, Nigeria.
                                            </div>
                                        </Link>
                                    </NavigationMenuLink>
                                </li>
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>

                    <NavigationMenuItem className="hidden lg:block">
                        <NavigationMenuTrigger>SIGN IN</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid w-50 gap-4">
                                <li>
                                    <NavigationMenuLink asChild>
                                        <Link href="sign-in" className="flex-row items-center gap-2">
                                            <LogIn />
                                            Sign In
                                        </Link>
                                    </NavigationMenuLink>
                                    <NavigationMenuLink asChild>
                                        <Link href="/create-account" className="flex-row items-center gap-2">
                                            <UserRoundPlus />
                                            Create an Account
                                        </Link>
                                    </NavigationMenuLink>
                                </li>
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                </NavigationMenuList>

            </NavigationMenu>
            <div className="flex items-center gap-5">
                <User2
                    size={20}
                    className="hidden lg:block"
                    onClick={() => router.push('/user/user-dashboard')}
                />
                <div className="relative">
                    <ShoppingCart
                        size={20}
                        onClick={() => router.push('/cart')}
                    />
                    <span className="text-sm text-sandbrown font-bold absolute -top-3 right-0">{cart.length}</span>
                </div>
                <Menubar />
                <ModeToggle />
            </div>
        </div >
    )
}

function ListItem({
    title,
    children,
    href,
    ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
    return (
        <li {...props}>
            <NavigationMenuLink asChild>
                <Link href={href}>
                    <div className="text-sm leading-none font-medium">{title}</div>
                    <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                        {children}
                    </p>
                </Link>
            </NavigationMenuLink>
        </li>
    )
}

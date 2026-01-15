
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

const components: { title: string; href: string; description: string }[] = [
    {
        title: "Alert Dialog",
        href: "/menu",
        description:
            "A modal dialog that interrupts the user with important content and expects a response.",
    },
    {
        title: "Hover Card",
        href: "/docs/primitives/hover-card",
        description:
            "For sighted users to preview content available behind a link.",
    },
    {
        title: "Progress",
        href: "/docs/primitives/progress",
        description:
            "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
    },
    {
        title: "Scroll-area",
        href: "/docs/primitives/scroll-area",
        description: "Visually or semantically separates content.",
    },
    {
        title: "Tabs",
        href: "/docs/primitives/tabs",
        description:
            "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
    },
    {
        title: "Tooltip",
        href: "/docs/primitives/tooltip",
        description:
            "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    },
]

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
                        <NavigationMenuTrigger>OUR MENUS</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid gap-2 sm:w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                {components.map((component) => (
                                    <ListItem
                                        key={component.title}
                                        title={component.title}
                                        href={component.href}
                                    >
                                        {component.description}
                                    </ListItem>
                                ))}
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem className="hidden lg:block">
                        <NavigationMenuTrigger>ORDER ONLINE</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid w-[200px] gap-4">
                                <li>
                                    <NavigationMenuLink asChild>
                                        <Link href="order-delivery">Components</Link>
                                    </NavigationMenuLink>
                                    <NavigationMenuLink asChild>
                                        <Link href="#">Documentation</Link>
                                    </NavigationMenuLink>
                                    <NavigationMenuLink asChild>
                                        <Link href="#">Blocks</Link>
                                    </NavigationMenuLink>
                                </li>
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem className='hidden lg:block'>
                        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                            <Link href="/docs">ABOUT</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem className="hidden lg:block">
                        <NavigationMenuTrigger>FIND US</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid w-[300px] gap-4">
                                <li>
                                    <NavigationMenuLink asChild>
                                        <Link href="#">
                                            <div className="font-medium">Components</div>
                                            <div className="text-muted-foreground">
                                                Browse all components in the library.
                                            </div>
                                        </Link>
                                    </NavigationMenuLink>
                                    <NavigationMenuLink asChild>
                                        <Link href="#">
                                            <div className="font-medium">Documentation</div>
                                            <div className="text-muted-foreground">
                                                Learn how to use the library.
                                            </div>
                                        </Link>
                                    </NavigationMenuLink>
                                    <NavigationMenuLink asChild>
                                        <Link href="#">
                                            <div className="font-medium">Blog</div>
                                            <div className="text-muted-foreground">
                                                Read our latest blog posts.
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
                            <ul className="grid w-[200px] gap-4">
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


import { LogIn } from 'lucide-react';
import SignInClient from '../components/SignInClient';
import { NavigationMenuDemo } from '../components/Navbar';


const Page = () => {
    return (
        <div>
            <NavigationMenuDemo />

            <div className="min-h-screen bg-linear-to-br dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 flex items-center 
                   justify-center p-4 from-neutral-100 via-neutral-50 to-neutral-100">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse"
                        style={{ animationDelay: '1s' }}></div>
                </div>

                <div className="relative w-full max-w-md">
                    <div className="dark:bg-neutral-800/50 bg-neutral-100/50 backdrop-blur-xl rounded-2xl shadow-2xl border 
                           border-neutral-200/50 dark:border-neutral-700/50 overflow-hidden">
                        <div className="bg-linear-to-r dark:from-neutral-800 dark:to-neutral-700 p-8
                               from-neutral-200 to-neutral-100 text-center relative">
                            <div className="absolute inset-0 bg-linear-to-r from-transparent via-amber-500/5 to-transparent"></div>
                            <div className="relative">
                                <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center shadow-lg"
                                    style={{ background: 'linear-gradient(135deg, #dc9457 0%, #f4a261 100%)' }}>
                                    <LogIn className="w-8 h-8 text-white" />
                                </div>
                                <h1 className="text-3xl font-bold mb-2">
                                    Welcome Back
                                </h1>
                                <p className="text-neutral-700 dark:text-neutral-400">
                                    Sign in to continue to your account
                                </p>
                            </div>
                        </div>

                        <SignInClient />
                    </div>
                </div>
            </div>
        </div>


    )
}

export default Page
import UserClient from "@/app/components/UserClient";
import { verifyUser } from "@/lib/session";
import { redirect } from "next/navigation";


const Page = async() => {
   const session = await verifyUser()

   if(!session){
    redirect('/sign-in')
   }

    return (
        <div className="min-h-screen bg-linear-to-br from-neutral-900 via-neutral-800 to-neutral-900">
            <UserClient userId={session.user.id}/>
        </div>
    );
}

export default Page
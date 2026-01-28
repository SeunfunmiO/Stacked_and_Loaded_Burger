import TrackOrderPage from '@/app/components/UserTrackOrder'
import { verifyUser } from '@/lib/session'
import { redirect } from 'next/navigation'
import React from 'react'

const Page = async () => {
  const session = await verifyUser()

  if (!session || !session.user || !session.user.id) {
    redirect('/sign-in')
  }

  return (
    <div>
      <TrackOrderPage userId={session.user.id} />
    </div>
  )
}


export default Page
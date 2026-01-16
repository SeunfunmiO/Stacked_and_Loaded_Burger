import TrackOrderPage from '@/app/components/UserTrackOrder'
import React from 'react'

const page = ({ userId }: { userId: string }) => {
  return (
    <div>
        <TrackOrderPage userId={userId}/>
    </div>
  )
}

export default page
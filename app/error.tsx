"use client"

import { TriangleAlert, RefreshCw, Home, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react'

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
    console.log(error.message);
    const router = useRouter();

    return (
       <div>
        <button>
            Try again
        </button>
       </div>
    )
}

export default Error
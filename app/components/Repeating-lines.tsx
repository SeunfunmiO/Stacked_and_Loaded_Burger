import React from 'react'

const RepeatingLines = () => {
    return (
        <div className="h-3 w-full"
            style={{
                background: "repeating-linear-gradient(60deg, #dc9457 0px , #dc9457 3px ,transparent 3px ,transparent 12px)"
            }}
        ></div>
    )
}

export default RepeatingLines
import { SVGProps } from "react";

export const NairaIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M6 20V4l12 16V4" />
        <path d="M3 10h18" />
        <path d="M3 14h18" />
    </svg>
)

export const formatNaira = (price: string | number) => {
    return Number(price).toLocaleString('en-NG', {
        style: 'currency',
        currency: 'NGN',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
};
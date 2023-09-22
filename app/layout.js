import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import dynamic from 'next/dynamic';
import { Suspense } from "react";
import Loading from "./loading";
import '@/styles/globals.scss';
import { Mulish } from "@next/font/google";

const mulish = Mulish({
    weight: ['400', '700', '800'],
    subsets: ['latin'],
    variable: '--font-mulish',
    display: 'swap',
});

export const metadata = {
    title: {
        default: 'Groovy Invoice',
        template: '%s | Groovy Invoice',
    },
    description: ' ',
};

function RootLayout({ children }) {
    return (
        <html lang="en" className={`${mulish.variable}`}>
            <body>
                <React.StrictMode>
                    <Suspense fallback={<Loading />}>{children}</Suspense>
                </React.StrictMode>
            </body>
        </html>)
}

export default RootLayout;
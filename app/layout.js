import 'bootstrap/dist/css/bootstrap.css';
import '../styles/globals.scss';
import { Mulish } from "@next/font/google";

const mulish = Mulish({
    weight: ['400', '700', '800'],
    subsets: ['latin'],
    variable: '--font-mulish',
    display: 'swap',
});

function RootLayout({ children }) {
    return (
        <html lang="en" className={mulish.className}>
            <body>
                {children}
            </body>
        </html>)
}

export default RootLayout;
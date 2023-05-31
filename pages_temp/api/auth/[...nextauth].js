import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials"
const URL = process.env.NEXT_PUBLIC_HOST;
export const authOptions = {
    session: {
        strategy: 'jwt',
    },

    providers: [

        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        }),

        CredentialsProvider({
            async authorize(credentials, req) {
                const [email, password] = credentials;

                const res = await fetch(URL + '/company-users/login', {
                    method: 'POST',
                    body: JSON.stringify({ "username": email, "password": password }),
                    headers: {
                        'Content-Type': 'application/JSON'
                    }
                });


                const responseToken = await res.json()

                if (typeof (responseToken.access_token) != 'undefined' && responseToken.access_token != "") {

                    return { "token": responseToken.access_token }

                } else {

                    return { "error": responseToken.message };
                }

            }
        })
    ],

    callbacks: {
        async jwt({ token }) {
            // Send properties to the client, like an access_token from a provider.
            if (token != '')
                return token
            else
                return null;
        }
    }
};

export default NextAuth(authOptions);
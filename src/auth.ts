import NextAuth, { Session, User } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import axios from 'axios';
import { JWT } from "next-auth/jwt";
import UserExtension from "./lib/ExtendedUser";
import { AdapterUser } from "next-auth/adapters";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: '/signin',
    signOut: '/signout',
    error: '/error'
  },
  providers: [
    CredentialsProvider({
      id: 'Credentials',
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log('AAAAAAAAAAAAAAAAAAAAAAAAAA', `${process.env.BACKEND_URL}/api/Authenticate/Login`);
        const response = await axios.post(
          `${process.env.BACKEND_URL}/api/Authenticate/Login`, 
          {
            email: credentials.email,
            password: credentials.password
          },
          { headers: {
            'Content-Type': 'application/json', // Set content-type header to application/json
          }},
        );
        return response.status == 200 ? response.data : null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: {
      token: JWT & UserExtension;
      user: UserExtension & (User | AdapterUser);
    }) {
      if (user){
        token.FirstName = user.FirstName;
        token.LastName = user.LastName;
        token.PhoneNumber = user.PhoneNumber;
        token.BioFileId = user.BioFileId;
        token.PhotoFileId = user.PhotoFileId;
        token.AccessToken = user.AccessToken;
      }
      return token;
    },
    async session({ token, session }: {
      token: JWT & UserExtension;
      session: Session & UserExtension;
    }) {
      if (token){
        session.FirstName = token.FirstName;
        session.LastName = token.LastName;
        session.PhoneNumber = token.PhoneNumber;
        session.BioFileId = token.BioFileId;
        session.PhotoFileId = token.PhotoFileId;
        session.AccessToken = token.AccessToken;
      }
      return session;
    }
  }
})
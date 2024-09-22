import NextAuth, { Session, User } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import axios from 'axios';
import { JWT } from "next-auth/jwt";
import UserExtension from "./lib/ExtendedUser";
import { AdapterUser } from "next-auth/adapters";
import https from 'https';
import {jwtDecode} from 'jwt-decode';

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
        const url = `${process.env.BACKEND_URL}/api/Authenticate/Login`;
        const body = {
            email: credentials.email,
            password: credentials.password
          };
          //TODO: generalize it to all axios requests
          const axiosInstance = axios.create({
            httpsAgent: new https.Agent({
              rejectUnauthorized: false,
            }),
          });
        try {
          const response = await axiosInstance.post(url, body);
          return response.status == 200 ? jwtDecode(response.data) as UserExtension & (User | null): null;
        }
        catch (error) {
          console.log(error);
        }
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
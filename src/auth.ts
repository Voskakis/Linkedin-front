import { Session, User } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import axios from 'axios';
import { JWT } from "next-auth/jwt";
import UserExtension from "./lib/ExtendedUser";
import https from 'https';
import {jwtDecode} from 'jwt-decode';
import NextAuth from "../node_modules/next-auth";

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
          return response.status == 200 ? jwtDecode(response.data) : null;
        }
        catch (error) {
          console.log(error);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: {
      user: User,
      token: JWT
    }) {
      if (user){
        token.user.FirstName = user.FirstName;
        token.user.LastName = user.LastName;
        token.user.PhoneNumber = user.PhoneNumber;
        token.user.BioFileId = user.BioFileId;
        token.user.PhotoFileId = user.PhotoFileId;
        token.user.AccessToken = user.AccessToken;
      }
      return token;
    },
    async session({ token, session }: {
      token: JWT;
      session: Session;
    }) {
      if (token){
        session.user.FirstName = token.FirstName;
        session.user.LastName = token.LastName;
        session.user.PhoneNumber = token.PhoneNumber;
        session.user.BioFileId = token.BioFileId;
        session.user.PhotoFileId = token.PhotoFileId;
        session.user.AccessToken = token.AccessToken;
      }
      return session;
    }
  }
})
import { Account, Session, User } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import axios from 'axios';
import { JWT } from "next-auth/jwt";
import https from 'https';
import {jwtDecode} from 'jwt-decode';
import NextAuth from "../node_modules/next-auth";
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
          if (response.status == 200) {
            const decoded = jwtDecode(response.data) as any;
            return {
              LastName: decoded.LastName,
              PhoneNumber: decoded.PhoneNumber,
              BioFileId: decoded.BioFileId,
              PhotoFileId: decoded.PhotoFileId,
              AccessToken: response.data
            };
          }
          return null;
        }
        catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: {
      token: JWT;
      user?: User | AdapterUser;
    }) {
      if (user) {
        const customUser = user as User & {
          FirstName?: string;
          LastName?: string;
          PhoneNumber?: string;
          BioFileId?: string;
          PhotoFileId?: string;
          AccessToken?: string;
        };

        token.FirstName = customUser.FirstName;
        token.LastName = customUser.LastName;
        token.PhoneNumber = customUser.PhoneNumber;
        token.BioFileId = customUser.BioFileId;
        token.PhotoFileId = customUser.PhotoFileId;
        token.AccessToken = customUser.AccessToken;
      }
      return token;
    },
    async session({ token, session }: {
      session: Session;
      token: JWT;
    }) {
      if (token){
        session.user.FirstName = token.FirstName as string;
        session.user.LastName = token.LastName as string;
        session.user.PhoneNumber = token.PhoneNumber as string;
        session.user.BioFileId = token.BioFileId as string;
        session.user.PhotoFileId = token.PhotoFileId as string;
        session.user.AccessToken = token.AccessToken as string;
        session.user.AccessToken = token.AccessToken as string;
      }
      return session;
    }
  }
})
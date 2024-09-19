import NextAuth, { Session } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import axios from 'axios';
import { JWT } from "next-auth/jwt";
import ExtendedUser from "./lib/ExtendedUser";

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
        const response = await axios.post(
          'https://localhost:7164/api/Authenticate/Login', 
          {
            Email: credentials.email,
            Password: credentials.password
          },
        );
        return response.status == 200 ? response.data : null;
      },
    }),
  ],
  callbacks: {
    async session({ token, user, session }: {
      token: JWT;
      user: ExtendedUser;
      session: Session;
    }) {
      // TODO: check if session is expired
      // TODO: get user id from token somehow
      const result = await axios.get(`https://localhost:7164/users/${'id'}`);
      if (result.status === 200) {
        user.BioFileId = result.data.BioFileId;
        user.FirstName = result.data.FirstName;
        user.LastName = result.data.LastName;
        user.PhoneNumber = result.data.PhoneNumber;
        user.PhotoFileId = result.data.PhotoFileId;
      }
      return session;
    }
  }
})
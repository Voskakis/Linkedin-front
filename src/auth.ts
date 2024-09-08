import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import axios from 'axios';

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
      }
    }),
  ],
})
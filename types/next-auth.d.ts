import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface UserClaims {
    FirstName: string;
    LastName: string;
    PhoneNumber: string;
    BioFileId: string;
    PhotoFileId: string;
    AccessToken: string;
    AdminUser: string;
  }

  interface Session {
    user: UserClaims & DefaultSession["user"];
  }

  interface JWT extends UserClaims {}
}
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { generate } from "password-hash"
import { signInSchema } from "./lib/zod";
import { ZodError } from "zod";
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          let user= null;
          const options = {
            algorithm: 'sha256',
            saltLength: 16,
            iterations: 1000
          };
          const { email, password } = await signInSchema.parseAsync(credentials);
          const pwHash = generate(password, options);
          // user = await getUserFromDb(email, pwHash);
          if (!user) {
            throw new Error("User not found");
          }
          return user;
        }
        catch (error) {
          if (error instanceof ZodError) {
            return null;
          }
          throw error;
        }
      },
    }),
  ],
})
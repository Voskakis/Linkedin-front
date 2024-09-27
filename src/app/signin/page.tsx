import SignIn from '@/components/sign-in';

export default async function SignInPage() {
  return (
    <div className="flex flex-col items-center justify-center flex-grow p-8">
      <h1 className="text-4xl font-bold mb-10 text-center">
        Sign In to Your Account
      </h1>
      <SignIn />
    </div>
  );
}
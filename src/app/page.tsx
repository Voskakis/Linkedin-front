import SigningNav from "@/components/signingNavigation";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center flex-grow p-8">
      {/* Program Name */}
      <h1 className="text-4xl font-bold mb-8 text-center">
        Professional Networking Application
      </h1>
      <SigningNav />
    </main>
  );
}

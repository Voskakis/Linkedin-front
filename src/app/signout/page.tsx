import React from 'react';
import SignoutPage from '@/components/SignoutPage';

export default async function SignInPage() {
    return (
      <div className="flex min-h-screen flex-col items-center justify-between p-24">
        <SignoutPage />
      </div>
    );
  }
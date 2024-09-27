'use client'

import { useParams } from 'next/navigation';

export default function UserPage() {
  const userId = useParams().id;

  return (
    <div>
      <h1>User Page for ID: {userId}</h1>
    </div>
  );
}

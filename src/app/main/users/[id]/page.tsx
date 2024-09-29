import OneUserPage from '@/components/user/OneUserPage';
import { Metadata } from 'next';

export default async function UserPage({ params }: { params: { id: string } }) {
  const userId = params.id;
  return <OneUserPage userId={parseInt(userId, 10)} />;
}

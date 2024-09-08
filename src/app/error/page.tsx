import GenericError from '@/components/genericError';

export default async function ErrorPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <GenericError />
    </div>
  );
}
  
import GenericError from '@/components/genericError';

export default async function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center flex-grow p-8">
      <GenericError />
    </div>
  );
}

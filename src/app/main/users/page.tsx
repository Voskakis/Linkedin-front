import UsersTable from "@/components/UsersTable";

export default async function MainPage() {
  return (
    <div  className="flex min-h-screen flex-col items-center justify-between p-24">
        <UsersTable />
    </div>
  );
}
import UsersTable from "@/components/UsersTable";

export default async function MainPage() {
  return (
    <div className="flex flex-col items-center justify-between">
        <UsersTable />
    </div>
  );
}
import Info from "@/components/user/ProfilePageReusable";

export default async function NonAdminUserPage() {
    return (
      <div  className="flex flex-col items-center justify-between">
        <Info isEditable={false} />
      </div>
    );
  }
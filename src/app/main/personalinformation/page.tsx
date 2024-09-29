import PersonalInformation from "@/components/user/ProfilePageReusable";

export default async function PersonalInformationPage() {
    return (
      <div  className="flex flex-col items-center justify-between">
        <PersonalInformation isEditable={true} />
      </div>
    );
  }
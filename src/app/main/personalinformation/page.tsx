import PersonalInformation from "@/components/user/PersonalInformation";

export default async function PersonalInformationPage() {
    return (
      <div  className="flex flex-col items-center justify-between">
        <PersonalInformation />
      </div>
    );
  }
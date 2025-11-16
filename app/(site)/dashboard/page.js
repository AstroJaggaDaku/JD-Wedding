
import { getServerSession } from "next-auth";
import ProfileForm from "@/components/ProfileForm";

export default async function Dashboard() {
  const session = await getServerSession();
  if (!session) return <p>Please login</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
      <ProfileForm userId={session.user.id} />
    </div>
  );
}

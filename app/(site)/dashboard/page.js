import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route"; // Make sure you export authOptions there
import ProfileForm from "@/components/ProfileForm";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  // If user is not logged in
  if (!session) {
    return (
      <div className="p-6 max-w-2xl mx-auto text-center">
        <p className="text-xl text-red-600 font-semibold">Please login to access your dashboard.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
      <ProfileForm userId={session.user.id} />
    </div>
  );
}

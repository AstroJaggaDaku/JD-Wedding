import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import ProfileForm from "@/components/ProfileForm";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div className="p-6 max-w-2xl mx-auto text-center">
        <p className="text-xl text-red-600 font-semibold">
          Please login to access your dashboard.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
      <ProfileForm userId={session.user.id} />
    </div>
  );
}

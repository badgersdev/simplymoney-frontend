"use client";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { logout } = useAuthContext();
  const router = useRouter();

  const handleLogout = async () => {
    // server logout
    const response = await logoutOnServer();

    if (response) {
      console.log("logged OUT");
      // client logout
      logout();
      router.replace("/login");
    }
  };

  return (
    <div className="h-[95vh]">
      <div className="max-w-md mx-auto py-5 bg-gray-800 p-8">
        <p>Are you sure You want to logout ?</p>
        <div className="mx-auto">
          <button
            onClick={handleLogout}
            className="bg-red-700 px-3 py-2 text-white text-lg hover:bg-red-500 hover:cursor-pointer rounded-sm"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

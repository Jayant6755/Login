import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

import {Link} from "react-router-dom";

export default function LoginSuccess() {
  const [user, setUser] = useState<{ email: string } | null>(null);

  useEffect(() => {
    // ✅ Step 1: Check token
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/"; // redirect if not logged in
      return;
    }

    // ✅ Step 2: Optionally fetch user details from backend
    fetch("http://localhost:5000/dashboard", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setUser(data.user))
      .catch(() => {
        localStorage.removeItem("token");
        window.location.href = "/";
      });
  }, []);

  // ✅ Step 3: Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-3xl font-bold">Welcome {user ? user.email : "User"} 👋</h1>
      <p className="text-gray-600">You’ve successfully logged in!</p>

      <div className="mt-4 flex gap-3">
        <Button onClick={handleLogout} variant="destructive">
          Logout
        </Button>
        <Link to="/dashboard" >
        <Button>Go to Dashboard</Button>
        </Link>
      </div>
    </section>
  );
}

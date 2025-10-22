import { useEffect, useState } from "react";

function Dashboard() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:5000/dashboard", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setUser(data.user))
      .catch((err) => console.log(err));
  }, []);

  if (!user) return <p>Login kar</p>;

  return (
    <div>
      <h1>Welcome, {user.email}!</h1>
      <p>This is your hidden dashboard.</p>
    </div>
  );
}

export default Dashboard;

"use client";

import { useAuth } from "@clerk/nextjs";

const AuthenticationTestPage = () => {
  const { userId, sessionId, getToken, isLoaded, isSignedIn } = useAuth();

  const fetchExternalData = async () => {
    const token = await getToken();
    console.log("token", token);
    // Fetch data from an external API
    const response = await fetch("http://localhost:8000/authentication", {
     method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.json();
  };
  return <div>AuthenticationTestPage</div>;
};

export default AuthenticationTestPage;

"use client";

import { useAuth } from "@clerk/nextjs";

const AuthenticationTestPage = () => {
  const { userId, sessionId, getToken, isLoaded, isSignedIn } = useAuth();

  const fetchExternalData = async () => {
    const token = await getToken();

    // console.log("token:", token);

    const response = await fetch("http://localhost:8000/authentication", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    console.log(data);
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    return <div>Please sign in</div>;
  }

  return (
    <div>
      <button onClick={fetchExternalData}>
        Test Authentication
      </button>
    </div>
  );
};

export default AuthenticationTestPage;
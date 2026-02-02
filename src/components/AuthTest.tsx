"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthTest() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div style={{ padding: 20 }}>
        <p>Signed in as {session.user?.email}</p>
        <button onClick={() => signOut()}>Sign Out</button>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <button onClick={() => signIn("google")}>Sign In with Google</button>
    </div>
  );
}
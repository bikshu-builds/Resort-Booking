"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    // Correct NextAuth signIn call
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setErrorMsg("Invalid email or password");
      return;
    }

    router.push("/");
  };

  return (
    <div>
      <h2>Login Form</h2>

      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />

        <button type="submit">Login</button>
      </form>
      <Link href="/registration">Don't have an account? Register here</Link>
    </div>
  );
}

export default LoginForm;

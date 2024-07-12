"use client";

import InputLogin from "@/app/components/form/inputLogin";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage({ searchParams }) {
  const urlCallback = searchParams.callbackUrl || "/";
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: e.target.email.value,
        password: e.target.password.value,
        callbackUrl: urlCallback,
      });
      if (!res?.error) {
        push("/product");
      } else {
        if (res.status === 401) {
          setError("data yang dimasukan tidak cocok");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-full bg-gray-900 flex-col">
      {error !== "" && <div className="text-red-600">{error}</div>}
      <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-6 max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4 dark:text-gray-200">
          EC Computer
        </h1>
        <form onSubmit={handleLogin}>
          <InputLogin
            name="email"
            type="email"
            label="email"
            placeholder="user@gmail.com"
          />
          <InputLogin
            name="password"
            type="password"
            label="Password"
            placeholder="masukan password"
          />
          <div className="flex items-center justify-between mb-4">
            <Link
              href="/register"
              className="text-xs text-indigo-500 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Buat Akun
            </Link>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {loading ? "...Loading" : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

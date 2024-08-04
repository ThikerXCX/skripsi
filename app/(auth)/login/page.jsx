"use client";

import InputLogin from "@/app/components/form/inputLogin";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

export default function LoginPage({ searchParams }) {
  const urlCallback = "/";
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();

  const { data: session } = useSession();

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
        if (session?.user.role === "admin") {
          push("/admin/");
        }
        push("/");
      } else {
        setLoading(false);
        if (res.status === 401) {
          setError("Data yang dimasukkan tidak cocok.");
        }
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <Image
            className="w-12 rounded-full h-12 mr-2"
            height={500}
            width={500}
            src="/icon/EC.svg"
            alt="logo"
          />
          EC Computer
        </div>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-center text-gray-900 md:text-2xl dark:text-white">
              Masuk ke Akun Anda
            </h1>
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
              <div>
                <InputLogin
                  name="email"
                  type="email"
                  label="Email"
                  placeholder="user@gmail.com"
                />
              </div>
              <div>
                <InputLogin
                  name="password"
                  type="password"
                  label="Password"
                  placeholder="Masukkan password"
                />
              </div>
              <div className="flex items-center justify-between mb-4">
                <Link
                  href="/register"
                  className="text-xs ml-2 text-primary-600 hover:underline dark:text-primary-500"
                >
                  Belum Punya Akun ? Buat Akun
                </Link>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full text-white bg-sky-600 hover:bg-sky-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                {loading ? "...Loading" : "Login"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

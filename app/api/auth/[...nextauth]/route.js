import { login } from "@/app/lib/firebase/service";
import { compare } from "bcrypt";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      type: "credentials",
      credentials: {
        email: {
          label: "email",
          type: "email",
        },
        password: {
          label: "password",
          type: "password",
        },
      },

      async authorize(credentials) {
        const { email, password } = credentials;

        const user = await login({ email });
        if (user) {
          // const passwordConfirm = await compare(password, user.password);
          if (password === user.password) {
            return user;
          }
          return null;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile, user, trigger, session }) {
      if (account?.provider === "credentials") {
        token.email = user.email;
        token.fullName = user.fullName;
        token.role = user.role;
        token.alamat = user.alamat;
        token.carts = user.carts;
        token.no_hp = user.no_hp;
        token.secretKey = user.secretKey;
      }
      if (trigger === "update") {
        token.carts = session.carts;
      }
      return token;
    },
    async session({ session, token }) {
      if ("email" in token) {
        session.user.email = token.email;
      }
      if ("fullName" in token) {
        session.user.fullName = token.fullName;
      }
      if ("role" in token) {
        session.user.role = token.role;
      }
      if ("alamat" in token) {
        session.user.alamat = token.alamat;
      }
      if ("carts" in token) {
        session.user.carts = token.carts;
      }
      if ("no_hp" in token) {
        session.user.no_hp = token.no_hp;
      }
      if ("secretkey" in token) {
        session.user.secretkey = token.secretkey;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

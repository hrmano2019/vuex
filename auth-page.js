import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// You can move this config to a separate file if needed
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Replace with your actual user lookup logic
        const user = {
          id: "001-002-PAUL",
          name: "Paul Play",
          email: "paul@gmail.com",
          role: "admin",
        };

        // Example password check (replace with real hash check)
        if (credentials?.password === "password") {
          return user;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },
};

export default NextAuth(authOptions);

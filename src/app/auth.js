import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "./utils/models/User";
import Connection from "./utils/config/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET,
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      async authorize({ email, password }) {
        await Connection();
        const user = await User.findOne({ email });
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return null;
        return {
          id: user._id.toString(),
          name: user.username,
          email: user.email,
          role: user.role
        };
      },
    }),
],
callbacks:{
  async jwt({token,user}){
    if(user){
      token.role=user.role;
      token.username=user.name;
      token.email=user.email;
    }
    return token;
  },
  async session({session,token}){
    session.username=token.username;
    session.role=token.role;
    session.email=token.email;
    return session;
  }
}
});

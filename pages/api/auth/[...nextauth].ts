import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    // ...add more providers here
  ],
  //   theme{
  //       logo:"https://links.papareact.com/s10",
  //       brandColor:"#fff",
  //       colorScheme:"auto"
  //   },
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error", // Error code passed in query string as ?error=
    verifyRequest: "/auth/verify-request", // (used for check email message)
    newUser: "/auth/new-user", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  // callbacks: {
  //   async session({ session, token, user }) {
  //     const cSession = session as any;
  //     cSession.user.uid = token.sub;
  //     return session;
  //   },
  // },
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken;
      return session;
    },
    // async jwt({ token, account, user }) {
    //   // initial sigin
    //   console.log(token,account,user,"XDDD")
    //   if (account && user) {
    //     return {
    //       ...token,
    //       // accessToken: account.access_token,
    //       // username: account.providerAccountId,
    //     };
    //   }

    // },
    // async session(params) {
    //   const { session, token }: { session: any; token: any } = params;
    //   console.log(params,token,"DDD")
    //   return session;
    // },
  },
});

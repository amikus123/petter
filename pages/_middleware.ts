import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
export async function middleware(req: any) {
  const token = await getToken({
    req,
    secret: process.env.JWT_SECRET as string,
  });
  console.log(2, req, token, 3);
  return NextResponse.next();

  // tokesn exists if logged
  // const token = await getToken({req,secret:process.env.JWT_SECRET})
  // // allow reqiuest is foloowing
  // // token exits
  // // is eequest for auth
  // const {pathname} = req.nextUrl

  // if(pathname.includes("/api/auth") || token){
  //     return NextResponse.next()
  // }
  // // redirtect them  to login
  // if(!token && pathname !== "/login"){
  //     return NextResponse.redirect("/login")
  // }
}

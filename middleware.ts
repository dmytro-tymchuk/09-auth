import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { checkServerSession } from "./lib/api/serverApi"
import { parse } from "cookie"

const privateRoutes = ["/profile", "/notes"]
const publicRoutes = ["/sign-in", "/sign-up"]

const matchesPrefix = (pathname: string, prefix: string) =>
  pathname === prefix || pathname.startsWith(prefix + "/")

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl

  const isPrivateRoute = privateRoutes.some((el) => matchesPrefix(pathname, el))
  const isPublicRoute = publicRoutes.some((el) => matchesPrefix(pathname, el))

  const cookieStore = await cookies()
  const accessToken = cookieStore.get("accessToken")?.value
  const refreshToken = cookieStore.get("refreshToken")?.value

  if (isPrivateRoute) {
    if (accessToken) {
      return NextResponse.next()
    }

    if (refreshToken) {
      try {
        const apiRes = await checkServerSession()
        const setCookie = apiRes.headers["set-cookie"]

        if (setCookie) {
          const res = NextResponse.next()
          const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie]

          for (const cookieStr of cookieArray) {
            const parsed = parse(cookieStr)
            const options: Parameters<typeof res.cookies.set>[2] = {
              expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
              path: parsed.Path,
              maxAge: parsed["Max-Age"] ? Number(parsed["Max-Age"]) : undefined
            }

            if (parsed.accessToken)
              res.cookies.set("accessToken", parsed.accessToken, options)
            if (parsed.refreshToken)
              res.cookies.set("refreshToken", parsed.refreshToken, options)
          }

          return res
        }

        return NextResponse.redirect(
          new URL("/sign-in", request.nextUrl.origin)
        )
      } catch {
        return NextResponse.redirect(
          new URL("/sign-in", request.nextUrl.origin)
        )
      }
    }

    return NextResponse.redirect(new URL("/sign-in", request.nextUrl.origin))
  }

  if (isPublicRoute) {
    if (accessToken) {
      return NextResponse.redirect(new URL("/", request.nextUrl.origin))
    }

    if (refreshToken) {
      try {
        const apiRes = await checkServerSession()
        const setCookie = apiRes.headers["set-cookie"]

        if (setCookie) {
          const res = NextResponse.redirect(
            new URL("/", request.nextUrl.origin)
          )
          const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie]

          for (const cookieStr of cookieArray) {
            const parsed = parse(cookieStr)
            const options: Parameters<typeof res.cookies.set>[2] = {
              expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
              path: parsed.Path,
              maxAge: parsed["Max-Age"] ? Number(parsed["Max-Age"]) : undefined
            }

            if (parsed.accessToken)
              res.cookies.set("accessToken", parsed.accessToken, options)
            if (parsed.refreshToken)
              res.cookies.set("refreshToken", parsed.refreshToken, options)
          }
          return res
        }

        return NextResponse.next()
      } catch {
        return NextResponse.next()
      }
    }
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"]
}

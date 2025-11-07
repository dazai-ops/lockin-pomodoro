import { NextResponse } from "next/server"

type URL = {
  url: string
  nextUrl: {
    pathname: string
  }
}

export const middleware = (req:URL) => {

    const { pathname } = req.nextUrl

    if (pathname === '/'){
      const pomodoroUrl = new URL('/pomodoro', req.url)
      return NextResponse.redirect(pomodoroUrl)
    }
}

export const config = {
  matcher: ['/']
}
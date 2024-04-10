export { default } from 'next-auth/middleware'

export const config = {
  matcher: ['/securePage', '/app/:path*', '/other/:path*', '/help/:path*']
}
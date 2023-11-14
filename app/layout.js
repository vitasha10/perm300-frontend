import './globals.css'

import "@fontsource/unbounded/300.css"
import "@fontsource/unbounded/400.css"
import "@fontsource/unbounded/500.css"
import "@fontsource/unbounded/600.css"

export const metadata = {
  title: 'Пермь 300',
  description: 'Пермь 300 | Онлайн пространство, где всё реально!',
}
export default function RootLayout({ children }) {
  return <html lang="ru">
    <body>{children}</body>
  </html>
}
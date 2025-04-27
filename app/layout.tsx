import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'water quality system',
  description: 'Created by IOT team 15',
  generator: 'IOT team 15',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

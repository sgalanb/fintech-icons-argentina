import Footer from '@/app/components/footer'
import { Providers } from '@/app/providers'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'Fintech Icons Argentina',
  description:
    'Colección de +400 iconos en formato SVG relacionados con el mundo fintech en Argentina. Acciones, CEDEARs, FCI, Bancos, Billeteras Digitales, ALyCs y más.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <Providers attribute="class" defaultTheme="system" enableSystem>
          <div className="flex min-h-screen w-full items-start justify-center bg-zinc-100 text-black dark:bg-zinc-950 dark:text-white">
            {children}
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}

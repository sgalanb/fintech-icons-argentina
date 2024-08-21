import ThemeToggle from '@/app/components/theme-toggle'
import { Separator } from '@/app/components/ui/separator'
import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer
      className={`sticky top-0 z-40 border-t border-zinc-200 bg-white backdrop-blur-md transition-colors duration-200 dark:border-zinc-800 dark:bg-zinc-950`}
    >
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center justify-center gap-6 py-6">
        <div className="flex w-full flex-col items-center justify-center gap-6 md:flex-row md:justify-between">
          <div className="flex flex-col items-center justify-center gap-9 md:flex-row md:gap-0">
            <div className="flex flex-col items-center justify-center gap-1 md:items-start">
              <div className="flex items-center justify-center gap-6">
                <Link href="https://x.com/sgalanb" target="_blank">
                  <Image
                    src="/social-icons/x-icon.svg"
                    alt="icono de x/twitter"
                    width={18}
                    height={18}
                    className="hover:opacity-70 dark:invert"
                  />
                </Link>

                <Link
                  href="https://www.linkedin.com/in/sgalanb/"
                  target="_blank"
                >
                  <Image
                    src="/social-icons/linkedin-icon.svg"
                    alt="icono de x/twitter"
                    width={20}
                    height={20}
                    className="hover:opacity-70 dark:invert"
                  />
                </Link>
              </div>
            </div>
          </div>
          <ThemeToggle />
        </div>

        <Separator className="my-0" />

        <div className="flex flex-col gap-1">
          <p className="w-full text-balance text-center text-sm text-black/50 dark:text-white/50">
            Los logos y marcas comerciales son propiedad de sus respectivos
            dueños.
          </p>
        </div>
      </div>
    </footer>
  )
}

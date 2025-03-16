import SGLetters from '@/app/components/SGLetters'
import ThemeToggle from '@/app/components/theme-toggle'
import { navigationMenuTriggerStyle } from '@/app/components/ui/navigation-menu'
import { Separator } from '@/app/components/ui/separator'
import { cn } from '@/app/utils'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer
      className={`sticky top-0 z-40 border-t border-zinc-200 bg-white backdrop-blur-md transition-colors duration-200 dark:border-zinc-800 dark:bg-zinc-950`}
    >
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center justify-center gap-6 px-3 py-6">
        <div className="flex w-full flex-col items-center justify-center gap-6 md:flex-row md:justify-between">
          <div className="flex flex-col items-center justify-center gap-9 md:flex-row md:gap-0">
            <div className="flex items-center justify-center gap-1">
              <Link
                href="https://santigalan.com"
                target="_blank"
                className={cn(
                  navigationMenuTriggerStyle(),
                  'bg-white hover:bg-zinc-100 focus:bg-zinc-100 dark:bg-zinc-950 dark:hover:bg-zinc-900 dark:focus:bg-zinc-900'
                )}
              >
                <div className="flex h-6 w-6 rounded bg-black p-1 dark:bg-white">
                  <SGLetters width={24} />
                </div>
              </Link>

              <Separator orientation="vertical" className="h-9" />

              <Link
                href="/otras-paginas"
                className={cn(
                  navigationMenuTriggerStyle(),
                  'bg-white hover:bg-zinc-100 focus:bg-zinc-100 dark:bg-zinc-950 dark:hover:bg-zinc-900 dark:focus:bg-zinc-900'
                )}
              >
                Otras páginas
              </Link>
              {/* <Link
                href="/otras-paginas"
                className={navigationMenuTriggerStyle()}
              >
                Feedback
              </Link> */}
            </div>
          </div>
          <ThemeToggle />
        </div>

        <div className="flex flex-col">
          <p className="w-full text-balance text-center text-sm text-black/50 dark:text-white/50">
            Los logos y marcas comerciales son propiedad de sus respectivos
            dueños.
          </p>
          {/* <p className="text-balance w-full text-center text-sm text-black/50 dark:text-white/50">
            Hecho en Argentina por
            <Link href="https://x.com/sgalanb" target="_blank">
              <span className="text-blue-500 dark:text-blue-400">
                {' '}
                @sgalanb
              </span>
            </Link>
            .
          </p> */}
        </div>
      </div>
    </footer>
  )
}

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/app/components/ui/navigation-menu'
import { Separator } from '@/app/components/ui/separator'
import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  return (
    <div className="flex w-full items-center justify-between gap-3 px-3 py-3 md:px-0 md:py-6">
      <h1 className="text-2xl font-bold tracking-tighter">
        Fintech Icons Argentina
      </h1>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Inicio
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <Separator orientation="vertical" className="h-9" />
          <NavigationMenuItem>
            <Link
              href="https://github.com/sgalanb/fintech-icons-argentina"
              target="_blank"
              className={navigationMenuTriggerStyle()}
            >
              <Image
                src="/social-icons/github-icon.svg"
                alt="icono de github"
                width={19}
                height={19}
                className="dark:invert"
              />
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link
              href="https://basehub.com/sgalanb/fintech-icons-argentina/explore"
              target="_blank"
              className={navigationMenuTriggerStyle()}
            >
              <Image
                src="/social-icons/basehub.svg"
                alt="icono de basehub"
                width={15}
                height={15}
              />
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}

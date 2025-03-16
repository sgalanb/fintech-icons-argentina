'use client'

import { IconsItem } from '@/.basehub/schema'
import { Button } from '@/app/components/ui/button'
import { Card, CardContent } from '@/app/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/app/components/ui/dialog'
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from '@/app/components/ui/drawer'
import { Input } from '@/app/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select'
import { Icon } from 'basehub/react-svg'
import { Check, Copy, Download } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useQueryState } from 'nuqs'
import { Fragment, useState } from 'react'

export default function IconList({ icons }: { icons: IconsItem[] }) {
  const searchParams = useSearchParams()

  const [search, setSearch] = useQueryState('search', {
    defaultValue: '',
    clearOnDefault: true,
  })
  const [selectedType, setSelectedType] = useQueryState('type', {
    defaultValue: 'all',
    clearOnDefault: true,
  })

  return (
    <div className="flex w-full flex-col items-center justify-center gap-6 p-3 md:p-0">
      <div className="flex w-full items-center justify-between gap-3">
        <Input
          type="search"
          placeholder="Buscar iconos..."
          defaultValue={searchParams.get('search') || ''}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-[18.75rem]"
        />
        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger className="max-w-[12.5rem]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">Todos los iconos</SelectItem>
              <SelectItem value="Acciones">Acciones</SelectItem>
              <SelectItem value="CEDEARs">CEDEARs</SelectItem>
              <SelectItem value="Bancos y Billeteras">
                Bancos y Billeteras
              </SelectItem>
              <SelectItem value="Gerentes de FCI">Gerentes de FCI</SelectItem>
              <SelectItem value="Monedas">Monedas</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="grid w-full grid-cols-1 gap-3 xxs:grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5">
        {icons
          .filter(
            (icon) =>
              icon._title.toLowerCase().includes(search.toLowerCase()) ||
              (icon.id && icon?.id.toLowerCase().includes(search.toLowerCase()))
          )
          .filter((stock) =>
            selectedType === 'all' ? true : stock.type === selectedType
          )
          .sort((a, b) => a._title.localeCompare(b._title))
          .map((icon) => (
            <Fragment key={icon.id}>
              <div className="hidden md:block">
                <Dialog>
                  <DialogTrigger className="w-full">
                    <IconTrigger icon={icon} />
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <IconContent icon={icon} />
                  </DialogContent>
                </Dialog>
              </div>
              <div className="block md:hidden">
                <Drawer>
                  <DrawerTrigger className="w-full">
                    <IconTrigger icon={icon} />
                  </DrawerTrigger>
                  <DrawerContent>
                    <IconContent icon={icon} />
                  </DrawerContent>
                </Drawer>
              </div>
            </Fragment>
          ))}
      </div>
    </div>
  )
}

const IconTrigger = ({ icon }: { icon: IconsItem }) => (
  <Card
    key={icon.id}
    className="flex h-[9.75rem] w-full cursor-pointer items-center justify-center transition-opacity animate-out hover:opacity-80 dark:bg-zinc-800"
  >
    <CardContent className="flex flex-col gap-3 px-3 pt-6">
      <div className="flex h-10 w-10 items-center justify-center self-center overflow-hidden rounded">
        <Icon
          content={icon.source || ''}
          components={{
            svg: (props) => (
              <svg
                {...props}
                style={{
                  width: 40,
                  height: 40,
                }}
              />
            ),
          }}
        />
      </div>
      <div className="flex h-[2.75rem] flex-col items-center justify-center px-3">
        <span className="line-clamp-1 self-center text-center text-base font-semibold">
          {icon.type === 'Acciones' ||
          icon.type === 'CEDEARs' ||
          icon.type === 'Monedas'
            ? icon.id
            : icon._title}
        </span>
        <span className="line-clamp-1 text-center text-sm text-gray-500">
          {icon.type === 'Acciones' ||
          icon.type === 'CEDEARs' ||
          icon.type === 'Monedas'
            ? icon._title
            : ''}
        </span>
      </div>
    </CardContent>
  </Card>
)

function IconContent({ icon }: { icon: IconsItem }) {
  const [isCopied, setIsCopied] = useState(false)

  return (
    <>
      <div className="flex w-full flex-col items-center justify-center gap-6 p-6 md:p-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <div className="flex h-40 w-40 items-center justify-center overflow-hidden rounded">
          <Icon
            content={icon.source || ''}
            components={{
              svg: (props) => (
                <svg
                  {...props}
                  style={{
                    width: 160,
                    height: 160,
                  }}
                />
              ),
            }}
          />
        </div>
        <div className="flex w-full flex-col items-start justify-center">
          <span className="text-left text-xl font-semibold">{icon._title}</span>
          {icon.type === 'Acciones' ||
          icon.type === 'CEDEARs' ||
          icon.type === 'Monedas' ? (
            <span className="line-clamp-1 text-left text-lg text-gray-500">
              {icon.id} -{' '}
              {icon.type === 'Acciones'
                ? 'Acción'
                : icon.type === 'CEDEARs'
                  ? 'CEDEAR'
                  : 'Moneda'}
            </span>
          ) : (
            <span className="line-clamp-1 text-left text-lg text-gray-500">
              {icon.type === 'Gerentes de FCI'
                ? 'Gerente de FCI'
                : icon.type === 'Bancos y Billeteras'
                  ? 'Banco/App'
                  : 'Cripto'}
            </span>
          )}
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-3 md:flex-row">
          <Button
            variant="secondary"
            className="w-full"
            onClick={() => {
              downloadSvg(icon.source || '', icon.id || '')
            }}
          >
            <Download size={16} className="mr-2" />
            Descargar
          </Button>
          <Button
            className="w-full"
            onClick={() => {
              copyToClipboard(icon.source || '')
              setIsCopied(true)
              setTimeout(() => setIsCopied(false), 1000)
            }}
          >
            {isCopied ? (
              <span className="flex items-center justify-center">
                <Check size={16} className="mr-2" />
              </span>
            ) : (
              <Copy size={16} className="mr-2" />
            )}
            Copiar SVG
          </Button>
        </div>
      </div>
    </>
  )
}

const copyToClipboard = async (source: string) => {
  try {
    await navigator.clipboard.writeText(source)
    console.log('SVG copied to clipboard!')
  } catch (error) {
    console.error('Error copying SVG to clipboard:', error)
  }
}

const downloadSvg = (source: string, filename: string = 'icon.svg') => {
  const blob = new Blob([source], { type: 'image/svg+xml' })
  const url = window.URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.download = filename

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  window.URL.revokeObjectURL(url)
}

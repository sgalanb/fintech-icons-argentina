'use client'

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
import { ICONS, IconType } from '@/app/constants'
import { Check, Copy, Download } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useQueryState } from 'nuqs'
import { Fragment, useState } from 'react'

export default function IconList() {
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
              <SelectItem value="acciones">Acciones</SelectItem>
              <SelectItem value="cedears">CEDEARs</SelectItem>
              <SelectItem value="bancos-apps">Bancos y Apps</SelectItem>
              <SelectItem value="gerentes-fci">Gerentes de FCI</SelectItem>
              <SelectItem value="monedas">Monedas</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="grid w-full grid-cols-1 gap-3 xxs:grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5">
        {ICONS.filter(
          (stock) =>
            stock.name.toLowerCase().includes(search.toLowerCase()) ||
            stock.id.toLowerCase().includes(search.toLowerCase())
        )
          .filter((stock) =>
            selectedType === 'all' ? true : stock.type === selectedType
          )
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((stock) => (
            <Fragment key={stock.id}>
              <div className="hidden md:block">
                <Dialog>
                  <DialogTrigger className="w-full">
                    <IconTrigger stock={stock} />
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <IconContent stock={stock} />
                  </DialogContent>
                </Dialog>
              </div>
              <div className="block md:hidden">
                <Drawer>
                  <DrawerTrigger className="w-full">
                    <IconTrigger stock={stock} />
                  </DrawerTrigger>
                  <DrawerContent>
                    <IconContent stock={stock} />
                  </DrawerContent>
                </Drawer>
              </div>
            </Fragment>
          ))}
      </div>
    </div>
  )
}

const IconTrigger = ({ stock }: { stock: IconType }) => (
  <Card
    key={stock.id}
    className="flex h-[9.75rem] w-full cursor-pointer items-center justify-center transition-opacity animate-out hover:opacity-80 dark:bg-zinc-800"
  >
    <CardContent className="flex flex-col gap-3 px-3 pt-6">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/icons/${stock.type}/${stock.id}.svg`}
        className="h-10 w-10 self-center rounded"
        alt=""
      />
      <div className="flex h-[2.75rem] flex-col items-center justify-center px-3">
        <span className="line-clamp-1 self-center text-center text-base font-semibold">
          {stock.type === 'acciones' ||
          stock.type === 'cedears' ||
          stock.type === 'monedas'
            ? stock.id
            : stock.name}
        </span>
        <span className="line-clamp-1 text-center text-sm text-gray-500">
          {stock.type === 'acciones' ||
          stock.type === 'cedears' ||
          stock.type === 'monedas'
            ? stock.name
            : ''}
        </span>
      </div>
    </CardContent>
  </Card>
)

function IconContent({ stock }: { stock: IconType }) {
  const [isCopied, setIsCopied] = useState(false)

  return (
    <>
      <div className="flex w-full flex-col items-center justify-center gap-6 p-6 md:p-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/icons/${stock.type}/${stock.id}.svg`}
          className="my-6 h-32 w-32 self-center rounded"
          alt=""
        />
        <div className="flex w-full flex-col items-start justify-center">
          <span className="text-left text-xl font-semibold">{stock.name}</span>
          {stock.type === 'acciones' ||
          stock.type === 'cedears' ||
          stock.type === 'monedas' ? (
            <span className="line-clamp-1 text-left text-lg text-gray-500">
              {stock.id} -{' '}
              {stock.type === 'acciones'
                ? 'Acción'
                : stock.type === 'cedears'
                  ? 'CEDEAR'
                  : 'Moneda'}
            </span>
          ) : (
            <span className="line-clamp-1 text-left text-lg text-gray-500">
              {stock.type === 'gerentes-fci' ? 'Gerente de FCI' : 'Banco/App'}
            </span>
          )}
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-3 md:flex-row">
          <Button
            variant="secondary"
            className="w-full"
            onClick={() => {
              downloadSvg(`/icons/${stock.type}/${stock.id}.svg`)
            }}
          >
            <Download size={16} className="mr-2" />
            Descargar
          </Button>
          <Button
            className="w-full"
            onClick={() => {
              copyToClipboard(`/icons/${stock.type}/${stock.id}.svg`)
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

const copyToClipboard = async (svgUrl: string) => {
  try {
    const response = await fetch(svgUrl)
    const svgText = await response.text()
    await navigator.clipboard.writeText(svgText)
    console.log('SVG copied to clipboard!')
  } catch (error) {
    console.error('Error copying SVG to clipboard:', error)
  }
}

const downloadSvg = (svgUrl: string) => {
  const link = document.createElement('a')
  link.href = svgUrl
  link.download = `${svgUrl.split('/').pop()}`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

import Header from '@/app/components/header'
import { ACCIONES } from '@/app/constants'

export default function Home() {
  return (
    <main className="flex w-full max-w-3xl flex-col items-center justify-center gap-6">
      <Header />
      <div className="grid w-full grid-cols-8 gap-9">
        {ACCIONES.map((stock) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`/icons/acciones/${stock.ticker}.svg`}
            key={stock.ticker}
            className="rounded-full"
            alt=""
          />
        ))}
      </div>
    </main>
  )
}

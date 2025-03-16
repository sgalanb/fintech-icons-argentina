import { IconsItem } from '@/.basehub/schema'
import Header from '@/app/components/header'
import IconList from '@/app/components/icon-list'
import { basehub } from 'basehub'
import { Suspense } from 'react'

export default async function Home() {
  const query = await basehub().query({
    icons: {
      items: {
        id: true,
        _title: true,
        type: true,
        source: true,
      },
    },
  })

  return (
    <main className="mb-6 flex w-full max-w-3xl flex-col items-center justify-center gap-3">
      <Header />
      <Suspense>
        <IconList icons={query.icons.items as IconsItem[]} />
      </Suspense>
    </main>
  )
}

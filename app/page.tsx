import Header from '@/app/components/header'
import IconList from '@/app/components/icon-list'
import { Suspense } from 'react'

export default function Home() {
  return (
    <main className="mb-6 flex w-full max-w-3xl flex-col items-center justify-center gap-3">
      <Header />
      <Suspense>
        <IconList />
      </Suspense>
    </main>
  )
}

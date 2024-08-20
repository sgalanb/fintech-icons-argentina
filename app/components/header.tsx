import { Input } from '@/app/components/ui/input'

export default function Header() {
  return (
    <div className="flex w-full items-center justify-between gap-3 p-3">
      <h1 className="h-16">Fintech Brands Argentina</h1>
      <Input />
    </div>
  )
}

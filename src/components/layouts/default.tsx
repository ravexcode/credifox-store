import Header from "@/components/ui/header";

export default function DefaultLayout({ children } : { children?: React.ReactNode }) {
  return (
    <div
    className="min-h-screen grid grid-rows-[auto_1fr_auto]">
      <Header />
      { children }
    </div>
  )
}
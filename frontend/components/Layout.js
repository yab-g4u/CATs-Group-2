import Head from 'next/head'

export default function Layout({ children }){
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Patient History</title>
        <link rel="icon" href="/favicon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <header className="border-b py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logos/healthpass.svg" alt="logo" className="h-8 w-8" />
            <div className="font-semibold">Patient History</div>
          </div>
          <nav className="space-x-3">
            <a href="/" className="text-sm text-gray-700">Home</a>
            <a href="/products" className="text-sm text-gray-700">Products</a>
            <a href="/demo/claimcraft" className="text-sm text-gray-700">Demos</a>
          </nav>
        </div>
      </header>
      <main className="flex-1 container mx-auto px-4">{children}</main>
      <footer className="border-t py-4 text-center text-sm text-gray-500">© Patient History</footer>
    </div>
  )
}

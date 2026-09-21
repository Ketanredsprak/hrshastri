import { Outlet, ScrollRestoration } from 'react-router-dom'
import { CustomCursor } from '../effects/CustomCursor'
import { AnnouncementBar } from './AnnouncementBar'
import { Footer } from './Footer'
import { Header } from './Header'

export function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <CustomCursor />
      <AnnouncementBar />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  )
}

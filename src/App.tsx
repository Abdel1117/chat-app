import { Route, Routes } from 'react-router-dom'
import { Header } from './components/header/header'
import { Accueil } from './pages/Accueil/Accueil'
import {Services} from './pages/Services/Services'
import {About} from './pages/About/About'
import { Contact } from './pages/Contact/Contact'
import {Footer} from './components/footer/footer'
export const App = () =>  {

  return (
    <>
      <Header />
        <main className='p-4'>
          <Routes>

          <Route path="/" element={<Accueil />} />
          <Route path="/service" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
      </Routes>
        </main>
      <Footer />
    </>
  )
}


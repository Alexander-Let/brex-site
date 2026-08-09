import { Grain } from './components/Grain'
import { ScrollProgress } from './components/ScrollProgress'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { WhyBrex } from './components/WhyBrex'
import { Language } from './components/Language'
import { Playground } from './components/Playground'
import { Install } from './components/Install'
import { GitHubSection } from './components/GitHub'
import { Footer } from './components/Footer'

export default function App() {
  return (
    <>
      <Grain />
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <WhyBrex />
        <Language />
        <Playground />
        <Install />
        <GitHubSection />
      </main>
      <Footer />
    </>
  )
}

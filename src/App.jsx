import LeftPanel from './components/LeftPanel'
import RightPanel from './components/RightPanel'
import ParticleCanvas from './components/ParticleCanvas'

export default function App() {
  return (
    <>
      <ParticleCanvas />
      <div className="root">
        <LeftPanel />
        <RightPanel />
      </div>
    </>
  )
}
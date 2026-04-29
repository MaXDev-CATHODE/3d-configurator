import { Scene } from './components/canvas/Scene';
import { Overlay } from './components/ui/Overlay';

function App() {
  return (
    <main className="relative w-screen h-screen overflow-hidden bg-black font-sans selection:bg-white selection:text-black">
      <Scene />
      <Overlay />
    </main>
  );
}

export default App;

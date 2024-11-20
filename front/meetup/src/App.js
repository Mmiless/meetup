import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Landing from './Pages/Landing/Landing'
import EventRoom from './Pages/EventRoom/EventRoom'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/EventRoom' element={<EventRoom />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

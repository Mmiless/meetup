import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Landing from './pages/Landing/Landing'
import EventRoom from './pages/EventRoom/EventRoom'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/event/:eventHash' element={<EventRoom />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

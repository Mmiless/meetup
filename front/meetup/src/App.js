import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Landing from './Pages/Landing/Landing'
import EventRoom from './Pages/EventRoom/EventRoom'

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

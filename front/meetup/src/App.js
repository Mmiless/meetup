import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Landing from './Pages/Landing/Landing.js'
import Login from './Pages/Login/Login.js'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/Login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

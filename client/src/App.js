
import { Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import AddPage from './components/AddPage';
import ViewPage from './components/ViewPage';


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/add" element={<AddPage />} />
        <Route path="/view" element={<ViewPage />} />
      </Routes>
    </div>
  );
}


export default App;


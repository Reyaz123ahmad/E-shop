import AppRoutes from './routes/AppRoute';
import Navbar from './components/layout/Navbar/Navbar';
import Footer from './components/layout/Footer/Footer';
//import { BrowserRouter as Router } from 'react-router-dom';
//import './styles/globals.css';

// Main App component
function App() {
  return (
    
    
    // <AppRoutes />
    <>
        <Navbar />
        <main className="main-content">
          <AppRoutes />
        </main>
        <Footer />
      </>
    
  );
}

export default App;
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPage'; 
import ArtworkGallery from './ArtworkPage'; 
import YouTubePage from './YouTubePage'; 
import FreelancePage from './FreelancePage'; 
import ArtworkDetailPage from './ArtworkDetailPage';
import ImageUpload from './ImageUpload';

const App = () => {
    return (
        <Router>
            <Routes>
                {/* Route for the Landing Page */}
                <Route path="/" element={<LandingPage />} />
                
                {/* Routes for the new pages */}
                <Route path="/artwork" element={<ArtworkGallery />} />
                <Route path="/youtube" element={<YouTubePage />} />
                <Route path="/freelance" element={<FreelancePage />} />
                <Route path="/:artworkId" element={<ArtworkDetailPage />} />
                <Route path="/imageu" element={<ImageUpload />} />
                <Route path="/images/:artworkId" element={<ArtworkDetailPage />} />
        </Routes>
        </Router>
    );
}

export default App;

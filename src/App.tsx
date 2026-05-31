import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout';
import AnalyticsTracker from './components/AnalyticsTracker';
import ContentsquareTracker from './components/ContentsquareTracker';
import Home from './pages/Home';
import Destinations from './pages/Destinations';
import DestinationDetail from './pages/DestinationDetail';
import Tips from './pages/Tips';
import TipDetail from './pages/TipDetail';
import Guides from './pages/Guides';
import GuideDetail from './pages/GuideDetail';
import ShareTip from './pages/ShareTip';
import About from './pages/About';
import Rules from './pages/Rules';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Login from './pages/Login';
import MapPage from './pages/MapPage';
import Itinerary from './pages/Itinerary';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <AnalyticsTracker />
      <ContentsquareTracker />
      <AppProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="map" element={<MapPage />} />
            <Route path="itinerary" element={<Itinerary />} />
            <Route path="destinations" element={<Destinations />} />
            <Route path="destinations/:id" element={<DestinationDetail />} />
            <Route path="tips" element={<Tips />} />
            <Route path="tips/:id" element={<TipDetail />} />
            <Route path="guides" element={<Guides />} />
            <Route path="guides/:id" element={<GuideDetail />} />
            <Route path="share" element={<ShareTip />} />
            <Route path="about" element={<About />} />
            <Route path="rules" element={<Rules />} />
            <Route path="privacy" element={<Privacy />} />
            <Route path="terms" element={<Terms />} />
            <Route path="profile" element={<Profile />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
}

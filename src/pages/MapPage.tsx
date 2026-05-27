import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useApp } from '../context/AppContext';
import { CATEGORY_ICONS } from '../data/mockData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { Search, Navigation, Loader2 } from 'lucide-react';

// Fix for default marker icon in leaflet with webpack/vite
// @ts-ignore
import icon from 'leaflet/dist/images/marker-icon.png';
// @ts-ignore
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

function MapController({ center, zoom }: { center: [number, number] | null, zoom: number }) {
  const map = useMap();
  
  useEffect(() => {
    if (center) {
      map.flyTo(center, zoom, { duration: 1.5 });
    }
  }, [center, zoom, map]);
  
  return null;
}

export default function MapPage() {
  const { tips } = useApp();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [mapCenter, setMapCenter] = useState<[number, number] | null>(null);
  const [mapZoom, setMapZoom] = useState(3);
  const [isSearching, setIsSearching] = useState(false);
  const [isLocating, setIsLocating] = useState(false);

  const categories = ['Transport', 'Jedzenie', 'Atrakcje', 'Nocleg', 'Inne'];

  const filteredTips = activeCategory ? tips.filter(t => t.category === activeCategory) : tips;

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`);
      const data = await res.json();
      if (data && data.length > 0) {
        setMapCenter([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
        setMapZoom(11);
      } else {
        alert("Nie znaleziono takiej lokalizacji.");
      }
    } catch (error) {
      console.error("Błąd wyszukiwania lokalizacji:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const locateUser = () => {
    setIsLocating(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setMapCenter([position.coords.latitude, position.coords.longitude]);
          setMapZoom(13);
          setIsLocating(false);
        },
        (error) => {
          console.error("Błąd pobierania lokalizacji:", error);
          alert("Nie udało się pobrać Twojej lokalizacji. Upewnij się, że wyraziłeś zgodę w przeglądarce.");
          setIsLocating(false);
        },
        { enableHighAccuracy: true, timeout: 5000 }
      );
    } else {
      alert("Twoja przeglądarka nie wspiera geolokalizacji.");
      setIsLocating(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] relative z-0">
      <div className="bg-white border-b border-slate-200 p-4 shrink-0 shadow-sm relative z-20 flex flex-col md:flex-row gap-4 items-center justify-between">
        
        <form onSubmit={handleSearch} className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-grow md:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <Input 
              type="text" 
              placeholder="Szukaj miasta, państwa..." 
              className="pl-9 pr-4 py-2 w-full bg-slate-50 border-slate-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button type="submit" disabled={isSearching} className="bg-slate-900 hover:bg-slate-800 text-white min-w-[100px]">
            {isSearching ? <Loader2 className="w-4 h-4 animate-spin" /> : "Szukaj"}
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            onClick={locateUser}
            disabled={isLocating}
            className="border-slate-200 text-slate-600 bg-white hover:bg-slate-50 px-3"
            title="Moja lokalizacja"
          >
            {isLocating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Navigation className="w-4 h-4" />}
          </Button>
        </form>

        <div className="flex flex-nowrap overflow-x-auto gap-2 max-w-full pb-1 md:pb-0 scrollbar-hide">
          <Button 
            variant={activeCategory === null ? "default" : "outline"}
            onClick={() => setActiveCategory(null)}
            className={activeCategory === null ? "bg-slate-900 text-white whitespace-nowrap" : "bg-white whitespace-nowrap"}
          >
            Wszystkie
          </Button>
          {categories.map(cat => (
            <Button 
              key={cat}
              variant={activeCategory === cat ? "default" : "outline"}
              onClick={() => setActiveCategory(cat)}
              className={activeCategory === cat ? "bg-orange-500 hover:bg-orange-600 border-orange-500 text-white whitespace-nowrap" : "bg-white text-slate-600 border-slate-200 whitespace-nowrap"}
            >
              {CATEGORY_ICONS[cat] && <span className="mr-2">{CATEGORY_ICONS[cat]}</span>} <span>{cat}</span>
            </Button>
          ))}
        </div>
      </div>
      
      <div className="flex-grow relative z-0">
        <MapContainer center={[48.8566, 2.3522]} zoom={3} style={{ height: '100%', width: '100%' }}>
          <MapController center={mapCenter} zoom={mapZoom} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {filteredTips.map(tip => tip.coordinates && (
            <Marker key={tip.id} position={tip.coordinates as [number, number]}>
              <Popup>
                <div className="p-1 min-w-[200px]">
                  <img src={tip.image} alt={tip.city} className="w-full h-24 object-cover rounded-md mb-2" />
                  <h3 className="font-bold text-sm mb-1">{tip.title}</h3>
                  <div className="text-xs text-slate-500 mb-2">{tip.city}</div>
                  <Badge variant="secondary" className="mb-2 text-[10px]">{tip.category}</Badge>
                  <p className="font-bold text-emerald-600 text-xs mb-3">{tip.price > 0 ? `$${tip.price.toFixed(2)}` : 'Darmowe'}</p>
                  <Link to={`/tips/${tip.id}`} className="block w-full text-center bg-slate-900 text-white text-xs py-1.5 rounded-md hover:bg-slate-800 transition-colors">
                    Zobacz szczegóły
                  </Link>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { DESTINATIONS } from '../data/mockData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MapPin, Wallet, Info, Heart } from 'lucide-react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';

export default function DestinationDetail() {
  const { id } = useParams<{ id: string }>();
  const destination = DESTINATIONS.find(d => d.id === Number(id));
  const { favorites, toggleFavorite } = useApp();

  if (!destination) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <h1 className="text-2xl font-bold text-slate-900 mb-4">Nie znaleziono kierunku</h1>
        <Link to="/destinations">
          <Button variant="outline">Wróć do kierunków</Button>
        </Link>
      </div>
    );
  }

  const isFavorite = favorites.destinations.includes(destination.id);

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/destinations" className="inline-flex items-center text-slate-500 hover:text-orange-500 transition-colors mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Wróć do kierunków
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200"
        >
          <div className="relative h-72 md:h-[400px] w-full">
            <img 
              src={destination.image} 
              alt={destination.name} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            
            <div className="absolute top-6 right-6">
              <button 
                onClick={() => toggleFavorite('destinations', destination.id)}
                className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full shadow-lg text-white transition-all cursor-pointer"
                title={isFavorite ? "Usuń z ulubionych" : "Dodaj do ulubionych"}
              >
                <Heart className={`w-6 h-6 ${isFavorite ? 'fill-rose-500 text-rose-500' : 'text-white hover:text-rose-400'}`} />
              </button>
            </div>

            <div className="absolute bottom-8 left-8 right-8 text-white">
              <h1 className="text-4xl md:text-6xl font-extrabold mb-4 flex items-center">
                <MapPin className="w-8 h-8 md:w-10 md:h-10 mr-3" /> {destination.name}
              </h1>
              <Badge className="bg-emerald-500/90 hover:bg-emerald-500 text-white border-0 text-lg py-2 px-4">
                <Wallet className="w-5 h-5 mr-2" /> Szacowany budżet: {destination.dailyBudget} / dzień
              </Badge>
            </div>
          </div>

          <div className="p-8 md:p-12">
            <div className="grid md:grid-cols-3 gap-12">
              <div className="md:col-span-2 prose prose-slate max-w-none prose-lg">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Odkryj {destination.name}</h2>
                <p className="text-slate-700 leading-relaxed mb-6">
                  {destination.description}
                </p>
                <p className="text-slate-700 leading-relaxed mb-6">
                  {destination.name} to idealny kierunek dla osób szukających niezapomnianych wrażeń przy ograniczonym budżecie. Kraj ten oferuje niesamowitą mieszankę kultury, historii i natury, a wszystko to za ułamek ceny, jaką zapłaciłbyś w innych popularnych miejscach turystycznych.
                </p>
                
                <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Główne atrakcje</h3>
                <ul className="list-disc pl-6 space-y-2 text-slate-700">
                  <li>Lokalne rynki i bazary z tanim jedzeniem</li>
                  <li>Darmowe wycieczki piesze po historycznych centrach</li>
                  <li>Przystępne cenowo muzea i galerie sztuki</li>
                  <li>Niesamowite parki narodowe i szlaki turystyczne</li>
                </ul>
              </div>

              <div className="space-y-6">
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  <h3 className="font-bold text-slate-900 mb-4 flex items-center">
                    <Info className="w-5 h-5 mr-2 text-blue-500" />
                    Praktyczne Informacje
                  </h3>
                  <div className="space-y-4 text-sm text-slate-600">
                    <div>
                      <strong className="block text-slate-900">Najlepszy czas na podróż</strong>
                      Wiosna lub wczesna jesień, aby uniknąć tłumów i najwyższych cen.
                    </div>
                    <div>
                      <strong className="block text-slate-900">Transport lokalny</strong>
                      Autobusy i pociągi są niezwykle tanie. Warto kupić kartę miejską.
                    </div>
                    <div>
                      <strong className="block text-slate-900">Noclegi</strong>
                      Hostele zaczynają się już od 10$ za noc. Guesthousy to świetna alternatywa.
                    </div>
                  </div>
                </div>

                <Link to={`/tips?search=${encodeURIComponent(destination.name)}`} className="block w-full">
                  <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-xl h-12">
                    Znajdź porady dla tego miejsca
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

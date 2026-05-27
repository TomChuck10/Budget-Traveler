import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CATEGORY_ICONS } from '../data/mockData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MapPin, TrendingUp, Calendar, User, Heart } from 'lucide-react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';

export default function TipDetail() {
  const { id } = useParams<{ id: string }>();
  const { tips, userVotes, upvoteTip, downvoteTip, favorites, toggleFavorite, toggleItinerary, itinerary } = useApp();
  const tip = tips.find(t => t.id === Number(id));

  if (!tip) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <h1 className="text-2xl font-bold text-slate-900 mb-4">Nie znaleziono porady</h1>
        <Link to="/tips">
          <Button variant="outline">Wróć do porad</Button>
        </Link>
      </div>
    );
  }

  const isFavorite = favorites.tips.includes(tip.id);
  const inItinerary = itinerary.includes(tip.id);

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/tips" className="inline-flex items-center text-slate-500 hover:text-orange-500 transition-colors mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Wróć do porad
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200"
        >
          <div className="relative w-full">
            {(!tip.images || tip.images.length === 0) ? (
              <img 
                src={tip.image} 
                alt={tip.title} 
                className="h-64 md:h-96 w-full object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide h-64 md:h-96">
                {tip.images.map((imgUrl, idx) => (
                  <img 
                    key={idx}
                    src={imgUrl} 
                    alt={`${tip.title} ${idx + 1}`} 
                    className="w-full h-full object-cover flex-shrink-0 snap-center"
                    referrerPolicy="no-referrer"
                  />
                ))}
              </div>
            )}
            
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <Badge className="bg-slate-900/80 text-white backdrop-blur-sm border-0 text-sm py-1.5 px-3">
                {CATEGORY_ICONS[tip.category]}
                <span className="ml-2">{tip.category}</span>
              </Badge>
              <button 
                onClick={() => toggleItinerary(tip.id)}
                className={`p-2 backdrop-blur-sm rounded-full shadow-sm transition-colors cursor-pointer ${inItinerary ? 'bg-orange-500 text-white' : 'bg-white/90 hover:bg-white text-slate-500'}`}
                title={inItinerary ? "Usuń z planu" : "Dodaj do planu"}
              >
                <Calendar className="w-5 h-5" />
              </button>
              <button 
                onClick={() => toggleFavorite('tips', tip.id)}
                className="p-2 bg-white/90 hover:bg-white backdrop-blur-sm rounded-full shadow-sm text-slate-400 transition-colors cursor-pointer"
                title={isFavorite ? "Usuń z ulubionych" : "Dodaj do ulubionych"}
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-rose-500 text-rose-500' : 'hover:text-rose-500'}`} />
              </button>
            </div>
          </div>

          <div className="p-8 md:p-12">
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <Badge variant="secondary" className="bg-orange-100 text-orange-700 hover:bg-orange-100 border-0">
                <MapPin className="w-3 h-3 mr-1" /> {tip.city}
              </Badge>
              {tip.price !== undefined && (
                <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-0 font-bold">
                  {tip.price > 0 ? `$${tip.price.toFixed(2)}` : 'Darmowe'}
                </Badge>
              )}
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => upvoteTip(tip.id)}
                  className={`flex items-center text-sm font-medium px-4 py-1.5 rounded-l-full transition-colors ${userVotes[tip.id] === 'up' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                >
                  <TrendingUp className={`w-4 h-4 mr-2 ${userVotes[tip.id] === 'up' ? 'text-emerald-600' : 'text-emerald-500'}`} />
                  {tip.upvotes} {userVotes[tip.id] === 'up' ? 'Polecasz to!' : 'Poleć poradę'}
                </button>
                <button 
                  onClick={() => downvoteTip(tip.id)}
                  className={`flex items-center text-sm font-medium px-4 py-1.5 rounded-r-full transition-colors ${userVotes[tip.id] === 'down' ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                >
                  <TrendingUp className={`w-4 h-4 mr-1 rotate-180 ${userVotes[tip.id] === 'down' ? 'text-rose-600' : 'text-rose-500'}`} />
                  {tip.downvotes || 0}
                </button>
              </div>
              <button 
                onClick={() => toggleFavorite('tips', tip.id)}
                className={`flex items-center text-sm font-medium px-4 py-1.5 rounded-full transition-colors cursor-pointer ${isFavorite ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                <Heart className={`w-4 h-4 mr-2 ${isFavorite ? 'fill-rose-600 text-rose-600' : 'text-slate-500'}`} />
                {isFavorite ? 'W ulubionych' : 'Dodaj do ulubionych'}
              </button>
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
              {tip.title}
            </h1>

            <div className="flex items-center gap-6 mb-10 pb-10 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 font-bold">
                  {tip.author.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">{tip.author}</p>
                  <p className="text-xs text-slate-500">Lokalny Ekspert</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-slate-500 text-sm border-l border-slate-200 pl-6">
                <Calendar className="w-4 h-4" />
                Opublikowano niedawno
              </div>
            </div>

            <div className="prose prose-slate max-w-none prose-lg mb-12">
              <p className="text-slate-700 leading-relaxed">
                {tip.description}
              </p>
              
              {tip.proofOfPrice && (
                <div className="mt-8">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">Dowód ceny</h3>
                  <div className="rounded-2xl overflow-hidden border border-slate-200">
                    <img src={tip.proofOfPrice} alt="Dowód ceny" className="w-full max-w-md h-auto object-cover" />
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-slate-100 pt-12">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-slate-900">Dyskusja społeczności</h3>
                <Badge variant="outline" className="text-slate-500 font-medium">2 komentarze</Badge>
              </div>

              <div className="space-y-10">
                <div className="flex gap-5 group">
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-slate-400 font-bold border border-slate-200 group-hover:border-orange-200 transition-colors">
                    A
                  </div>
                  <div className="flex-grow">
                    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm group-hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-center mb-3">
                        <span className="font-bold text-slate-900">Anna Nowak</span>
                        <div className="flex items-center gap-2">
                           <Badge className="bg-emerald-50 text-emerald-600 border-0 scale-75 origin-right">TOP CONTRIBUTOR</Badge>
                           <span className="text-xs text-slate-400">2h temu</span>
                        </div>
                      </div>
                      <p className="text-slate-600 text-sm leading-relaxed">Mega przydatna informacja! Planuję wyjazd na majówkę i właśnie miałam Rezerwować droższy hotel, ale dzięki Twojej poradzie sprawdziłam tę okolicę i faktycznie jest o połowę taniej, a standard ten sam. Dziękuję!</p>
                    </div>
                    <div className="flex gap-4 ml-2 mt-2">
                       <button className="text-xs font-bold text-slate-400 hover:text-orange-500 transition-colors">ODPOWIEDZ</button>
                       <button className="text-xs font-bold text-slate-400 hover:text-emerald-500 transition-colors">POMOCNE (4)</button>
                    </div>
                  </div>
                </div>

                <div className="flex gap-5 group">
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-slate-400 font-bold border border-slate-200 group-hover:border-orange-200 transition-colors">
                    M
                  </div>
                  <div className="flex-grow">
                    <div className="bg-slate-50/50 p-6 rounded-3xl border border-slate-100 shadow-sm group-hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-center mb-3">
                        <span className="font-bold text-slate-900">Marek Wilczyński</span>
                        <span className="text-xs text-slate-400">Wczoraj</span>
                      </div>
                      <p className="text-slate-600 text-sm leading-relaxed">Sprawdzałem to miejsce w zeszłym roku. Warto dodać, że w poniedziałki większość lokalnych restauracji w tej okolicy jest zamknięta, więc lepiej planować wycieczkę od wtorku do piątku.</p>
                    </div>
                    <div className="flex gap-4 ml-2 mt-2">
                       <button className="text-xs font-bold text-slate-400 hover:text-orange-500 transition-colors">ODPOWIEDZ</button>
                       <button className="text-xs font-bold text-slate-400 hover:text-emerald-500 transition-colors">POMOCNE (1)</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 bg-orange-50/50 rounded-3xl p-8 border border-orange-100">
                <h4 className="font-bold text-slate-900 mb-4">Dodaj swoją opinię</h4>
                <textarea 
                  className="w-full bg-white border-slate-200 rounded-2xl p-5 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none transition-all placeholder:text-slate-400 shadow-sm min-h-[120px]"
                  placeholder="Napisz co o tym sądzisz lub zadaj pytanie autorowi..."
                ></textarea>
                <div className="flex justify-end mt-4">
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-8 shadow-lg shadow-orange-200">
                    Wyślij komentarz
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

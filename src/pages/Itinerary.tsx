import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { MapPin, Trash2, Calculator, Map, Compass } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CATEGORY_ICONS } from '../data/mockData';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function Itinerary() {
  const { tips, itinerary, toggleItinerary, currentUser } = useApp();

  const selectedTips = tips.filter(tip => itinerary.includes(tip.id));
  
  const totalCost = selectedTips.reduce((acc, tip) => acc + (tip.price || 0), 0);

  if (!currentUser) {
    return (
      <div className="bg-slate-50 min-h-screen py-16 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Zaloguj się, aby zobaczyć swój plan</h2>
          <Link to="/login">
            <Button className="bg-orange-500 text-white rounded-full px-8">Zaloguj się</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
              <Compass className="w-6 h-6" />
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Twój Plan Podróży</h1>
          </div>
          <p className="text-slate-600 text-lg">
            Kalkulator budżetu i zebrane porady w jednym miejscu. Gotowy do drogi!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Zapisane Atrakcje i Porady ({selectedTips.length})</h2>
            
            {selectedTips.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 border-dashed">
                <Map className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-900 mb-2">Twój plan jest pusty</h3>
                <p className="text-slate-500 mb-6">Przeglądaj mapę lub porady społeczności, aby zacząć budować swój iterneraryusz.</p>
                <Link to="/map">
                  <Button className="bg-slate-900 hover:bg-slate-800 text-white rounded-full">Przeglądaj Mapę</Button>
                </Link>
              </div>
            ) : (
              selectedTips.map((tip, index) => (
                <motion.div
                  key={tip.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden border-slate-200">
                    <CardContent className="p-0 flex flex-col sm:flex-row">
                      <img src={tip.image} alt={tip.title} className="w-full sm:w-48 h-48 sm:h-auto object-cover shrink-0" />
                      <div className="p-6 flex flex-col flex-grow">
                        <div className="flex justify-between items-start mb-2">
                          <Link to={`/tips/${tip.id}`} className="hover:text-orange-500 transition-colors">
                            <h3 className="text-lg font-bold text-slate-900 leading-tight">{tip.title}</h3>
                          </Link>
                          <div className="font-bold text-emerald-600 ml-4 shrink-0">
                            {tip.price > 0 ? `$${tip.price.toFixed(2)}` : 'Darmowe'}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mb-4">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          <span className="text-xs text-slate-500 font-medium">{tip.city}</span>
                          <span className="text-slate-300">•</span>
                          <Badge variant="outline" className="text-[10px] py-0">{tip.category}</Badge>
                        </div>
                        <p className="text-slate-600 text-sm line-clamp-2 mb-4">{tip.description}</p>
                        
                        <div className="mt-auto flex justify-between items-center pt-4 border-t border-slate-50">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => toggleItinerary(tip.id)}
                            className="text-rose-500 hover:text-rose-600 hover:bg-rose-50 -ml-2"
                          >
                            <Trash2 className="w-4 h-4 mr-2" /> Usuń
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm sticky top-24">
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-100">
                <Calculator className="w-6 h-6 text-slate-400" />
                <h3 className="text-xl font-bold text-slate-900">Kalkulator</h3>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center text-slate-600">
                  <span>Ilość porad</span>
                  <span className="font-medium text-slate-900">{selectedTips.length}</span>
                </div>
                {selectedTips.map(tip => (
                  <div key={tip.id} className="flex justify-between items-center text-sm">
                    <span className="text-slate-500 truncate pr-4">{tip.title}</span>
                    <span className="font-medium text-slate-900 shrink-0">{tip.price > 0 ? `$${tip.price.toFixed(2)}` : '0.00'}</span>
                  </div>
                ))}
              </div>
              
              <div className="pt-6 border-t border-slate-100 mb-6">
                <div className="flex justify-between items-end">
                  <span className="font-bold text-slate-900">Suma częściowa</span>
                  <span className="text-3xl font-extrabold text-emerald-500">${totalCost.toFixed(2)}</span>
                </div>
                <p className="text-xs text-slate-400 mt-2 text-right">Nie uwzględnia lotów i głównego noclegu</p>
              </div>

              <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-xl h-12">
                Zapisz jako PDF
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

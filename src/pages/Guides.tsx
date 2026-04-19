import React from 'react';
import { motion } from 'motion/react';
import { GUIDES } from '../data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Clock, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function Guides() {
  const { favorites, toggleFavorite } = useApp();

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
            Przewodniki i Triki Podróżnicze
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Szczegółowe strategie taniego podróżowania, plany podróży i porady ekspertów, które pomogą Ci zaplanować kolejną przygodę.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {GUIDES.map((guide, index) => (
            <motion.div
              key={guide.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={`/guides/${guide.id}`} className="block h-full">
                <Card className="overflow-hidden hover:shadow-xl transition-all border-slate-200 group cursor-pointer flex flex-col sm:flex-row h-full p-0">
                  <div className="relative sm:w-2/5 h-48 sm:h-auto overflow-hidden shrink-0">
                    <img 
                      src={guide.image} 
                      alt={guide.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <Badge className="bg-orange-500 hover:bg-orange-600 text-white border-0">
                        {guide.category}
                      </Badge>
                      <button 
                        onClick={(e) => { e.preventDefault(); toggleFavorite('guides', guide.id); }}
                        className="p-1.5 bg-white/90 hover:bg-white backdrop-blur-sm rounded-full shadow-sm text-slate-400 transition-colors z-10 cursor-pointer"
                      >
                        <Heart className={`w-4 h-4 ${favorites.guides.includes(guide.id) ? 'fill-rose-500 text-rose-500' : 'hover:text-rose-500'}`} />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col justify-between p-6 sm:w-3/5">
                    <div>
                      <h2 className="text-2xl font-bold mb-3 text-slate-900 group-hover:text-orange-500 transition-colors">
                        {guide.title}
                      </h2>
                      <div className="flex items-center text-sm text-slate-500 mb-4">
                        <Clock className="w-4 h-4 mr-1" /> {guide.readTime}
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-700 font-bold text-xs">
                          {guide.author.charAt(0)}
                        </div>
                        <span className="text-sm font-medium text-slate-700">{guide.author}</span>
                      </div>
                      <BookOpen className="w-5 h-5 text-slate-400 group-hover:text-orange-500 transition-colors" />
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

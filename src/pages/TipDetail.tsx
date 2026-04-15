import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { COMMUNITY_TIPS, CATEGORY_ICONS } from '../data/mockData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MapPin, TrendingUp, Calendar, User } from 'lucide-react';
import { motion } from 'motion/react';

export default function TipDetail() {
  const { id } = useParams<{ id: string }>();
  const tip = COMMUNITY_TIPS.find(t => t.id === Number(id));

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
          <div className="relative h-64 md:h-96 w-full">
            <img 
              src={tip.image} 
              alt={tip.title} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-4 right-4">
              <Badge className="bg-slate-900/80 text-white backdrop-blur-sm border-0 text-sm py-1.5 px-3">
                {CATEGORY_ICONS[tip.category]}
                <span className="ml-2">{tip.category}</span>
              </Badge>
            </div>
          </div>

          <div className="p-8 md:p-12">
            <div className="flex items-center gap-4 mb-6">
              <Badge variant="secondary" className="bg-orange-100 text-orange-700 hover:bg-orange-100 border-0">
                <MapPin className="w-3 h-3 mr-1" /> {tip.city}
              </Badge>
              <div className="flex items-center text-slate-500 text-sm font-medium">
                <TrendingUp className="w-4 h-4 mr-1 text-emerald-500" />
                {tip.upvotes} poleceń
              </div>
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

            <div className="prose prose-slate max-w-none prose-lg">
              <p className="text-slate-700 leading-relaxed">
                {tip.description}
              </p>
              <p className="text-slate-700 leading-relaxed mt-4">
                To jest przykładowa treść, która rozwija poradę. W prawdziwej aplikacji użytkownicy mogliby dodawać więcej szczegółów, zdjęć i wskazówek do swoich postów. Społeczność może komentować i udostępniać te informacje, aby pomóc innym podróżnikom.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

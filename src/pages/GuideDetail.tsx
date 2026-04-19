import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { GUIDES } from '../data/mockData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, BookOpen, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';

export default function GuideDetail() {
  const { id } = useParams<{ id: string }>();
  const guide = GUIDES.find(g => g.id === Number(id));
  const { favorites, toggleFavorite } = useApp();
  
  // Safely get all images (fallback to single image if array isn't present)
  // Check if guide exists first to avoid errors
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!guide) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <h1 className="text-2xl font-bold text-slate-900 mb-4">Nie znaleziono przewodnika</h1>
        <Link to="/guides">
          <Button variant="outline">Wróć do przewodników</Button>
        </Link>
      </div>
    );
  }

  const guideImages = guide.images && guide.images.length > 0 ? guide.images : [guide.image];
  const isFavorite = favorites.guides.includes(guide.id);

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/guides" className="inline-flex items-center text-slate-500 hover:text-orange-500 transition-colors mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Wróć do przewodników
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200"
        >
          {/* Main Image Gallery Logic */}
          <div className="w-full">
            <div className="relative h-64 md:h-96 w-full overflow-hidden bg-slate-100">
              <AnimatePresence mode="wait">
                <motion.img 
                  key={activeImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  src={guideImages[activeImageIndex]} 
                  alt={`${guide.title} - zdjęcie ${activeImageIndex + 1}`} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>
              <div className="absolute top-4 left-4 flex gap-2">
                <Badge className="bg-orange-500 text-white border-0 text-sm py-1.5 px-3">
                  {guide.category}
                </Badge>
                <button 
                  onClick={() => toggleFavorite('guides', guide.id)}
                  className="p-2 bg-white/90 hover:bg-white backdrop-blur-sm rounded-full shadow-sm text-slate-400 transition-colors cursor-pointer"
                  title={isFavorite ? "Usuń z ulubionych" : "Dodaj do ulubionych"}
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? 'fill-rose-500 text-rose-500' : 'hover:text-rose-500'}`} />
                </button>
              </div>
            </div>
            
            {/* Thumbnails if > 1 image */}
            {guideImages.length > 1 && (
              <div className="flex gap-3 p-4 overflow-x-auto hide-scrollbar bg-white border-b border-slate-100">
                {guideImages.map((img, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative shrink-0 w-24 h-16 rounded-lg overflow-hidden transition-all ${
                      activeImageIndex === idx 
                        ? 'ring-2 ring-orange-500 ring-offset-2 opacity-100' 
                        : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img 
                      src={img} 
                      alt={`Miniaturka ${idx + 1}`} 
                      className="w-full h-full object-cover" 
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="p-8 md:p-12">
            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
              {guide.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 mb-10 pb-10 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 font-bold text-lg">
                  {guide.author.charAt(0)}
                </div>
                <div>
                  <p className="text-base font-medium text-slate-900">{guide.author}</p>
                  <p className="text-sm text-slate-500">Ekspert Podróży</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-slate-500 text-sm border-l border-slate-200 pl-6">
                <Clock className="w-4 h-4" />
                {guide.readTime}
              </div>
              <div className="flex items-center gap-2 text-slate-500 text-sm border-l border-slate-200 pl-6">
                <BookOpen className="w-4 h-4" />
                Kompleksowy Przewodnik
              </div>
            </div>

            <div className="prose prose-slate max-w-none prose-lg">
              <p className="text-slate-700 leading-relaxed text-xl mb-8">
                Ten przewodnik pomoże Ci zrozumieć wszystkie aspekty związane z tematem "{guide.title}". Przygotowaliśmy dla Ciebie najlepsze strategie i wskazówki.
              </p>
              
              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Wprowadzenie</h2>
              <p className="text-slate-700 leading-relaxed mb-6">
                Podróżowanie nie musi być drogie, jeśli wiesz, jak szukać okazji. W tym artykule omówimy kluczowe zasady, które pozwolą Ci zaoszczędzić setki, a nawet tysiące złotych na kolejnej wyprawie.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Kluczowe strategie</h2>
              <ul className="list-disc pl-6 space-y-3 text-slate-700 mb-6">
                <li>Bądź elastyczny z datami podróży</li>
                <li>Korzystaj z lokalnych środków transportu zamiast taksówek</li>
                <li>Jedz tam, gdzie miejscowi - omijaj restauracje przy głównych placach</li>
                <li>Szukaj darmowych dni w muzeach i galeriach</li>
              </ul>

              <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-lg my-8">
                <p className="text-orange-800 font-medium m-0">
                  <strong>Wskazówka od autora:</strong> Zawsze miej przy sobie butelkę wielokrotnego użytku. Woda butelkowana w turystycznych miejscach może kosztować krocie!
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

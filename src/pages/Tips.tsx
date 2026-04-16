import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { Search, MapPin, TrendingUp, Filter } from 'lucide-react';
import { CATEGORY_ICONS } from '../data/mockData';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useApp } from '../context/AppContext';

export default function Tips() {
  const { tips, userUpvotes, upvoteTip } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    setSearchQuery(searchParams.get('search') || '');
  }, [searchParams]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (e.target.value) {
      setSearchParams({ search: e.target.value });
    } else {
      setSearchParams({});
    }
  };

  const filteredTips = tips.filter(tip => {
    const matchesSearch = tip.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tip.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory ? tip.category === activeCategory : true;
    return matchesSearch && matchesCategory;
  });

  const categories = ['Transport', 'Jedzenie', 'Atrakcje'];

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Search */}
        <div className="mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-6">
            Porady Społeczności
          </h1>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <Input 
                type="text" 
                placeholder="Szukaj po mieście, słowie kluczowym lub atrakcji..." 
                className="pl-10 h-12 text-base bg-white border-slate-200"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
              <Button 
                variant={activeCategory === null ? "default" : "outline"}
                onClick={() => setActiveCategory(null)}
                className={activeCategory === null ? "bg-slate-900" : "bg-white"}
              >
                Wszystkie
              </Button>
              {categories.map(cat => (
                <Button 
                  key={cat}
                  variant={activeCategory === cat ? "default" : "outline"}
                  onClick={() => setActiveCategory(cat)}
                  className={activeCategory === cat ? "bg-orange-500 hover:bg-orange-600 border-orange-500" : "bg-white"}
                >
                  {CATEGORY_ICONS[cat]} <span className="ml-2">{cat}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTips.length > 0 ? (
            filteredTips.map((tip, index) => (
              <motion.div
                key={tip.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link to={`/tips/${tip.id}`} className="block h-full">
                  <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow border-slate-200 bg-white flex flex-col p-0">
                    <div className="relative h-48 overflow-hidden shrink-0">
                      <img 
                        src={tip.image} 
                        alt={tip.city} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-white/90 text-slate-900 hover:bg-white backdrop-blur-sm shadow-sm font-semibold">
                          <MapPin className="w-3 h-3 mr-1" /> {tip.city}
                        </Badge>
                      </div>
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-slate-900/80 text-white hover:bg-slate-900 backdrop-blur-sm shadow-sm border-0">
                          {CATEGORY_ICONS[tip.category]}
                          <span className="ml-1">{tip.category}</span>
                        </Badge>
                      </div>
                    </div>
                    <CardHeader className="pb-3 shrink-0 pt-4">
                      <CardTitle className="text-xl leading-tight">{tip.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow pb-4">
                      <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                        {tip.description}
                      </p>
                    </CardContent>
                    <CardFooter className="pt-4 border-t border-slate-100 flex justify-between items-center bg-slate-50/50 shrink-0">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-700 font-bold text-xs">
                          {tip.author.charAt(0)}
                        </div>
                        <span className="text-sm font-medium text-slate-700">{tip.author}</span>
                      </div>
                      <button 
                        onClick={(e) => { e.preventDefault(); upvoteTip(tip.id); }}
                        className={`flex items-center text-sm font-medium px-3 py-1.5 rounded-full transition-colors ${userUpvotes.includes(tip.id) ? 'bg-emerald-100 text-emerald-700' : 'text-slate-500 hover:bg-slate-200'}`}
                      >
                        <TrendingUp className={`w-4 h-4 mr-1 ${userUpvotes.includes(tip.id) ? 'text-emerald-600' : 'text-emerald-500'}`} />
                        {tip.upvotes}
                      </button>
                    </CardFooter>
                  </Card>
                </Link>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Nie znaleziono porad</h3>
              <p className="text-slate-500">Spróbuj zmienić hasło wyszukiwania lub filtry.</p>
              <Button 
                variant="outline" 
                className="mt-6"
                onClick={() => { setSearchQuery(''); setActiveCategory(null); setSearchParams({}); }}
              >
                Wyczyść Filtry
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

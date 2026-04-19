import React, { useState } from 'react';
import { Search, Bus, Utensils, Landmark, MapPin, TrendingUp, Users, ArrowRight, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { CATEGORY_ICONS } from '../data/mockData';
import { useApp } from '../context/AppContext';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { tips, userUpvotes, upvoteTip, favorites, toggleFavorite } = useApp();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/tips?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const filteredTips = tips.slice(0, 6); // Show only top 6 on home

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/travelhero/1920/1080?blur=2" 
            alt="Travel background" 
            className="w-full h-full object-cover opacity-20"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 to-slate-50"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-200 mb-6 px-4 py-1.5 rounded-full text-sm font-medium border-0">
                <Users className="w-4 h-4 mr-2 inline" />
                Wspierane przez ponad 50 000 podróżników
              </Badge>
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
                Zobacz świat za <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-500">ułamek</span> ceny.
              </h1>
              <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed">
                Planuj tanie podróże na podstawie prawdziwych doświadczeń społeczności. Omiń pułapki turystyczne i odkryj najlepsze sposoby na oszczędzanie podczas kolejnej przygody.
              </p>
              
              <div className="bg-white p-2 rounded-full shadow-xl flex items-center max-w-2xl mx-auto border border-slate-100">
                <Search className="w-6 h-6 text-slate-400 ml-4" />
                <Input 
                  type="text" 
                  placeholder="Dokąd chcesz pojechać? (np. Tokio, Paryż)" 
                  className="border-0 focus-visible:ring-0 text-lg px-4 h-14 bg-transparent shadow-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <Button onClick={handleSearch} className="bg-slate-900 hover:bg-slate-800 text-white rounded-full h-12 px-8 text-base mr-1">
                  Szukaj
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Three Pillars Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Trzy Filary Taniego Podróżowania</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Opanuj te trzy kategorie, a będziesz mógł podróżować niemal wszędzie, nie rozbijając banku.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-slate-50 rounded-3xl p-8 border border-slate-100"
            >
              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <Bus className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">Lokalny Transport</h3>
              <p className="text-slate-600 leading-relaxed">
                Poruszaj się po miastach jak tubylec. Odkryj najtańsze bilety komunikacji miejskiej, triki z rowerami miejskimi i dowiedz się, kiedy lepiej po prostu iść pieszo.
              </p>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-slate-50 rounded-3xl p-8 border border-slate-100"
            >
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                <Utensils className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">Tanie Jedzenie</h3>
              <p className="text-slate-600 leading-relaxed">
                Jedz niesamowicie dobrze za mniej. Znajdź autentyczne jedzenie uliczne, stołówki studenckie i oferty happy hour, które zastąpią pełne posiłki.
              </p>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-slate-50 rounded-3xl p-8 border border-slate-100"
            >
              <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-6">
                <Landmark className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">Darmowe Atrakcje</h3>
              <p className="text-slate-600 leading-relaxed">
                Najlepsze rzeczy w życiu są za darmo. Dowiedz się o darmowych dniach w muzeach, oszałamiających parkach publicznych i samodzielnych wycieczkach pieszych.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Community Tips Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Popularne Porady Społeczności</h2>
              <p className="text-slate-600 max-w-2xl">Prawdziwe porady od podróżników, którzy już tam byli.</p>
            </div>
            <Link to="/tips">
              <Button variant="outline" className="rounded-full">
                Zobacz Wszystkie Porady <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTips.map((tip, index) => (
              <motion.div
                key={tip.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={`/tips/${tip.id}`} className="block h-full">
                  <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow border-slate-200 bg-white flex flex-col p-0 relative">
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
                      <div className="absolute top-4 right-4 flex items-center gap-2">
                        <Badge className="bg-slate-900/80 text-white hover:bg-slate-900 backdrop-blur-sm shadow-sm border-0">
                          {CATEGORY_ICONS[tip.category]}
                          <span className="ml-1">{tip.category}</span>
                        </Badge>
                        <button 
                          onClick={(e) => { e.preventDefault(); toggleFavorite('tips', tip.id); }}
                          className="p-1.5 bg-white/90 hover:bg-white backdrop-blur-sm rounded-full shadow-sm text-slate-400 transition-colors z-10 cursor-pointer"
                        >
                          <Heart className={`w-4 h-4 ${favorites.tips.includes(tip.id) ? 'fill-rose-500 text-rose-500' : 'hover:text-rose-500'}`} />
                        </button>
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
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-500 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-rose-500 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Gotowy na mądrzejsze podróżowanie?</h2>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
            Dołącz do tysięcy oszczędnych podróżników dzielących się swoimi najlepszymi sekretami. Przestań przepłacać za pułapki turystyczne i zacznij doświadczać prawdziwej kultury.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/share">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full h-14 px-8 text-lg font-medium w-full sm:w-auto">
                Dołącz do Społeczności
              </Button>
            </Link>
            <Link to="/destinations">
              <Button variant="outline" className="bg-transparent border-slate-700 text-white hover:bg-slate-800 rounded-full h-14 px-8 text-lg font-medium w-full sm:w-auto">
                Przeglądaj Kierunki
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

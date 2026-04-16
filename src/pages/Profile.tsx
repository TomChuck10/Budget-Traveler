import React from 'react';
import { useApp } from '../context/AppContext';
import { Link, Navigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Calendar, Award, LogOut, TrendingUp, MapPin } from 'lucide-react';
import { CATEGORY_ICONS } from '../data/mockData';

export default function Profile() {
  const { currentUser, logout, tips, userUpvotes } = useApp();

  if (!currentUser) {
    return <Navigate to="/" />;
  }

  // Symulowane posty dodane przez użytkownika - tutaj filtrujemy z mockowanych tipsów lub pokazujemy fikcyjne
  // Dla demonstracji, załóżmy, że użytkownik Michał stworzył post o id: 1
  const userTips = tips.filter(t => t.id === 1);
  const upvotedTips = tips.filter(t => userUpvotes.includes(t.id));

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Nagłówek profilu */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-8 mb-8 shadow-sm border border-slate-200 flex flex-col md:flex-row items-center md:items-start gap-8"
        >
          <div className="w-32 h-32 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 text-5xl font-bold shrink-0">
            {currentUser.avatar}
          </div>
          
          <div className="flex-grow text-center md:text-left">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">{currentUser.name}</h1>
            <p className="text-slate-500 mb-6 flex items-center justify-center md:justify-start gap-4">
              <span className="flex items-center"><Award className="w-4 h-4 mr-1 text-orange-500" /> {currentUser.role}</span>
              <span className="flex items-center"><Calendar className="w-4 h-4 mr-1" /> Dołączył: {currentUser.joinedAt}</span>
            </p>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <div className="bg-slate-50 px-6 py-3 rounded-2xl border border-slate-100">
                <div className="text-2xl font-bold text-slate-900">{currentUser.points}</div>
                <div className="text-xs text-slate-500 uppercase tracking-wider font-medium">Punktów</div>
              </div>
              <div className="bg-slate-50 px-6 py-3 rounded-2xl border border-slate-100">
                <div className="text-2xl font-bold text-slate-900">{userTips.length}</div>
                <div className="text-xs text-slate-500 uppercase tracking-wider font-medium">Porad</div>
              </div>
              <div className="bg-slate-50 px-6 py-3 rounded-2xl border border-slate-100">
                <div className="text-2xl font-bold text-slate-900">{userUpvotes.length}</div>
                <div className="text-xs text-slate-500 uppercase tracking-wider font-medium">Ocenionych</div>
              </div>
            </div>
          </div>
          
          <div className="shrink-0 flex flex-col space-y-3 w-full md:w-auto">
             <Button variant="outline" className="w-full text-slate-600 bg-slate-50 border-slate-200 hover:bg-slate-100" onClick={logout}>
               <LogOut className="w-4 h-4 mr-2" /> Wyloguj się
             </Button>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Twoje porady */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Twoje opublikowane porady</h2>
            {userTips.length > 0 ? (
              <div className="space-y-6">
                {userTips.map((tip) => (
                  <Link to={`/tips/${tip.id}`} key={tip.id} className="block">
                    <Card className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3 border-b border-slate-100">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg leading-tight">{tip.title}</CardTitle>
                          <Badge variant="secondary" className="bg-slate-100">{tip.upvotes} poleceń</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-4 pb-4">
                         <p className="text-slate-600 text-sm line-clamp-2">{tip.description}</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
               <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center text-slate-500">
                 Nie opublikowałeś jeszcze żadnej porady.<br/>
                 <Link to="/share">
                   <Button variant="link" className="text-orange-500 font-bold mt-2">DODAJ PIERWSZĄ PORADĘ</Button>
                 </Link>
               </div>
            )}
          </motion.div>

          {/* Ocenione porady */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Ostatnio ocenione przez Ciebie</h2>
            {upvotedTips.length > 0 ? (
              <div className="space-y-6">
                {upvotedTips.map((tip) => (
                  <Link to={`/tips/${tip.id}`} key={tip.id} className="block">
                    <Card className="hover:shadow-md transition-shadow bg-slate-50 border-emerald-100">
                      <CardContent className="p-4 flex items-center gap-4">
                        <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
                          <img src={tip.image} alt={tip.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                        <div className="flex-grow">
                          <h3 className="font-bold text-slate-900 text-sm line-clamp-1">{tip.title}</h3>
                          <div className="flex items-center text-xs text-slate-500 mt-1">
                            <MapPin className="w-3 h-3 mr-1" /> {tip.city}
                          </div>
                        </div>
                        <div className="shrink-0 text-emerald-500 bg-emerald-50 w-8 h-8 rounded-full flex items-center justify-center">
                          <TrendingUp className="w-4 h-4" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
               <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center text-slate-500">
                 Nie oceniłeś jeszcze żadnych porad.<br/> Przeglądaj i oceń to, co warto polecić innym!
               </div>
            )}
          </motion.div>
        </div>

      </div>
    </div>
  );
}

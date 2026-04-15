import React from 'react';
import { motion } from 'motion/react';
import { DESTINATIONS } from '../data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Wallet } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Destinations() {
  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
            Popularne Tanie Kierunki
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Odkrywaj kraje, w których Twoje pieniądze mają większą wartość. Poznaj dzienne budżety, najlepsze porady i ulubione miejsca społeczności.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {DESTINATIONS.map((dest, index) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-xl transition-all border-slate-200 group cursor-pointer h-full flex flex-col p-0">
                <Link to={`/destinations/${dest.id}`} className="flex flex-col h-full">
                  <div className="relative h-64 overflow-hidden shrink-0">
                    <img 
                      src={dest.image} 
                      alt={dest.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h2 className="text-2xl font-bold mb-2 flex items-center">
                        <MapPin className="w-5 h-5 mr-2" /> {dest.name}
                      </h2>
                      <Badge className="bg-emerald-500/90 hover:bg-emerald-500 text-white border-0">
                        <Wallet className="w-3 h-3 mr-1" /> {dest.dailyBudget} / dzień
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="pt-6 flex-grow">
                    <p className="text-slate-600 leading-relaxed">
                      {dest.description}
                    </p>
                  </CardContent>
                </Link>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

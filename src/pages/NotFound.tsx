import React from 'react';
import { Link } from 'react-router-dom';
import { Plane, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <div className="bg-orange-100 p-5 rounded-full mb-6">
        <MapPin className="w-12 h-12 text-orange-500" />
      </div>
      <h1 className="text-6xl font-bold text-slate-900 mb-2">404</h1>
      <h2 className="text-2xl font-semibold text-slate-700 mb-4">
        Strona nie istnieje
      </h2>
      <p className="text-slate-500 max-w-md mb-8">
        Wygląda na to, że ta trasa nie jest na naszej mapie. Wróć na stronę
        główną i odkryj nowe kierunki.
      </p>
      <Link to="/">
        <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-8 py-3 flex items-center gap-2">
          <Plane className="w-4 h-4" />
          Wróć na stronę główną
        </Button>
      </Link>
    </div>
  );
}

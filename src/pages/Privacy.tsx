import React from 'react';
import { motion } from 'motion/react';

export default function Privacy() {
  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">Polityka Prywatności</h1>
          <div className="prose prose-slate max-w-none prose-lg">
            <p className="text-slate-700 leading-relaxed mb-6">
              Twoja prywatność jest dla nas niezwykle ważna. Poniżej wyjaśniamy, w jaki sposób zbieramy, wykorzystujemy i chronimy Twoje dane osobowe.
            </p>
            
            <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Gromadzenie danych</h3>
            <p className="text-slate-700 leading-relaxed mb-6">
              Zbieramy tylko te dane, które są absolutnie niezbędne do prawidłowego funkcjonowania serwisu (np. adres e-mail przy zakładaniu konta, nazwa użytkownika).
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Pliki cookies</h3>
            <p className="text-slate-700 leading-relaxed mb-6">
              Używamy plików cookies w celu poprawy jakości naszych usług, zapamiętywania Twoich preferencji oraz w celach analitycznych, aby lepiej zrozumieć, jak użytkownicy korzystają z naszej strony.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Udostępnianie danych</h3>
            <p className="text-slate-700 leading-relaxed mb-6">
              Nigdy nie sprzedajemy Twoich danych osobowych podmiotom trzecim. Możemy udostępniać zanonimizowane dane statystyczne naszym partnerom.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Twoje prawa</h3>
            <p className="text-slate-700 leading-relaxed mb-6">
              Masz prawo do wglądu w swoje dane, ich poprawiania oraz żądania ich usunięcia. W tym celu skontaktuj się z naszym zespołem wsparcia.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

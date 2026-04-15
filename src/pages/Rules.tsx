import React from 'react';
import { motion } from 'motion/react';

export default function Rules() {
  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">Zasady Społeczności</h1>
          <div className="prose prose-slate max-w-none prose-lg">
            <p className="text-slate-700 leading-relaxed mb-6">
              Witaj w Budget Traveler! Aby nasza społeczność była przyjazna, bezpieczna i pomocna dla wszystkich, prosimy o przestrzeganie poniższych zasad:
            </p>
            
            <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">1. Bądź uprzejmy i pomocny</h3>
            <p className="text-slate-700 leading-relaxed mb-6">
              Szanuj innych użytkowników. Jesteśmy tu po to, aby sobie pomagać. Unikaj agresywnego języka, hejtu i dyskryminacji.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">2. Dziel się prawdziwymi doświadczeniami</h3>
            <p className="text-slate-700 leading-relaxed mb-6">
              Publikuj tylko sprawdzone porady i informacje, których sam doświadczyłeś. Unikaj powielania niesprawdzonych plotek.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">3. Brak spamu i autopromocji</h3>
            <p className="text-slate-700 leading-relaxed mb-6">
              Nie promuj własnych usług, produktów ani linków afiliacyjnych. Naszym celem jest autentyczna pomoc, a nie sprzedaż.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">4. Zgłaszaj nadużycia</h3>
            <p className="text-slate-700 leading-relaxed mb-6">
              Jeśli widzisz coś nieodpowiedniego, co łamie nasze zasady, daj nam znać. Wspólnie dbamy o jakość naszej platformy.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

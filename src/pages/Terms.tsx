import React from 'react';
import { motion } from 'motion/react';

export default function Terms() {
  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">Regulamin Serwisu</h1>
          <div className="prose prose-slate max-w-none prose-lg">
            <p className="text-slate-700 leading-relaxed mb-6">
              Korzystając z serwisu Budget Traveler, akceptujesz poniższe warunki. Prosimy o uważne zapoznanie się z nimi.
            </p>
            
            <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">1. Postanowienia ogólne</h3>
            <p className="text-slate-700 leading-relaxed mb-6">
              Serwis Budget Traveler służy do wymiany informacji, porad i przewodników dotyczących taniego podróżowania. Korzystanie z serwisu jest bezpłatne.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">2. Odpowiedzialność użytkownika</h3>
            <p className="text-slate-700 leading-relaxed mb-6">
              Użytkownik ponosi pełną odpowiedzialność za publikowane przez siebie treści. Zabrania się publikowania materiałów niezgodnych z prawem, obraźliwych lub naruszających prawa osób trzecich.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">3. Prawa autorskie</h3>
            <p className="text-slate-700 leading-relaxed mb-6">
              Wszelkie materiały publikowane w serwisie pozostają własnością ich twórców. Użytkownik udziela serwisowi niewyłącznej licencji na wyświetlanie tych treści.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">4. Zmiany w regulaminie</h3>
            <p className="text-slate-700 leading-relaxed mb-6">
              Zastrzegamy sobie prawo do zmiany niniejszego regulaminu w dowolnym czasie. O istotnych zmianach będziemy informować użytkowników poprzez komunikaty na stronie.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

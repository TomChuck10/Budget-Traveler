import React from "react";
import { motion } from "motion/react";
import { Users, Globe, ShieldCheck } from "lucide-react";

export default function About() {
  return (
    <div className="bg-white min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-6">
            O Budget Traveler
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            Wierzymy, że podróżowanie nie powinno być luksusem zarezerwowanym
            dla bogatych. Dzieląc się wspólną wiedzą, możemy sprawić, że
            odkrywanie świata będzie dostępne dla każdego.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12 mb-20">
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Users className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">
              Tworzone przez Społeczność
            </h3>
            <p className="text-slate-600">
              Nasze porady pochodzą od prawdziwych podróżników, którzy tam byli,
              a nie od sponsorowanych influencerów czy nieaktualnych
              przewodników.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Globe className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">Globalny Zasięg</h3>
            <p className="text-slate-600">
              Od ulic Bangkoku po muzea Paryża, nasza społeczność obejmuje
              miejsca na każdym kontynencie.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <ShieldCheck className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">Autentyczne Porady</h3>
            <p className="text-slate-600">
              Skupiamy się na praktycznych poradach, które faktycznie pozwalają
              zaoszczędzić pieniądze bez rezygnowania z wrażeń.
            </p>
          </div>
        </div>

        <div className="bg-slate-50 rounded-3xl p-8 md:p-12 border border-slate-100">
          <h2 className="text-3xl font-bold mb-6 text-slate-900">
            Nasza Historia
          </h2>
          <div className="space-y-4 text-slate-600 leading-relaxed text-lg">
            <p>
              Budget Traveler powstał w 2024 roku, kiedy grupa backpackerów
              zdała sobie sprawę, że najlepszych porad podróżniczych nie można
              znaleźć na popularnych blogach, ale we wspólnych pokojach w
              hostelach.
            </p>
            <p>
              Zauważyliśmy, że tradycyjne media podróżnicze często promują
              drogie wycieczki i zawyżone ceny w restauracjach z powodu prowizji
              partnerskich. Chcieliśmy stworzyć platformę, w której jedyną
              motywacją jest pomoc innym.
            </p>
            <p>
              Dziś jesteśmy rosnącą społecznością tysięcy podróżników, którzy
              wierzą, że najlepszym sposobem na poznanie nowej kultury jest
              często ten najbardziej przystępny cenowo — jedzenie tam, gdzie
              jedzą miejscowi, korzystanie z transportu publicznego i
              znajdowanie ukrytych, darmowych perełek w każdym mieście.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

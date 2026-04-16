import React from 'react';
import { Bus, Utensils, Landmark } from 'lucide-react';

export const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  'Transport': <Bus className="w-4 h-4" />,
  'Jedzenie': <Utensils className="w-4 h-4" />,
  'Atrakcje': <Landmark className="w-4 h-4" />
};

export const COMMUNITY_TIPS = [
  {
    id: 1,
    city: 'Tokio, Japonia',
    title: 'Pomiń JR Pass, jeśli zostajesz w Tokio',
    description: 'Zamiast drogiego JR Pass, kup 72-godzinny bilet na metro w Tokio za jedyne 1500 jenów. Obejmuje prawie wszystkie główne miejsca i pozwala zaoszczędzić mnóstwo pieniędzy, jeśli nie podróżujesz między miastami.',
    author: 'Sarah M.',
    category: 'Transport',
    upvotes: 342,
    image: 'https://picsum.photos/seed/tokyo/600/400',
  },
  {
    id: 2,
    city: 'Rzym, Włochy',
    title: 'Aperitivo to twój najlepszy przyjaciel',
    description: 'Wiele barów na Zatybrzu oferuje "Aperitivo" między 18:00 a 21:00. Kupujesz jednego drinka (około 8-10 €) i zyskujesz dostęp do nielimitowanego bufetu z makaronem, pizzą i przekąskami. Z łatwością zastępuje obiad!',
    author: 'Marco P.',
    category: 'Jedzenie',
    upvotes: 891,
    image: 'https://picsum.photos/seed/rome/600/400',
  },
  {
    id: 3,
    city: 'Paryż, Francja',
    title: 'Darmowe muzea w pierwsze niedziele',
    description: 'Jeśli dobrze zaplanujesz podróż, prawie wszystkie główne muzea w Paryżu (w tym Luwr i Musée d\'Orsay) są całkowicie darmowe w pierwszą niedzielę każdego miesiąca. Zarezerwuj jednak z wyprzedzeniem!',
    author: 'Elena R.',
    category: 'Atrakcje',
    upvotes: 523,
    image: 'https://picsum.photos/seed/paris/600/400',
  },
  {
    id: 4,
    city: 'Nowy Jork, USA',
    title: 'Prom Staten Island Ferry do Statuy Wolności',
    description: 'Nie płać 30 dolarów za rejs turystyczny. Prom Staten Island Ferry jest w 100% darmowy, kursuje 24/7 i przepływa tuż obok Statuy Wolności, oferując niesamowite okazje do zdjęć panoramy miasta.',
    author: 'David L.',
    category: 'Atrakcje',
    upvotes: 1024,
    image: 'https://picsum.photos/seed/nyc/600/400',
  },
  {
    id: 5,
    city: 'Bangkok, Tajlandia',
    title: 'Strefa gastronomiczna Pier 21 w Terminal 21',
    description: 'Chcesz autentycznego, czystego ulicznego jedzenia w klimatyzacji? Udaj się do strefy gastronomicznej Pier 21. Dania kosztują 30-50 THB (1-1,50 $) i to tam miejscowi jedzą podczas przerw na lunch.',
    author: 'Jenny K.',
    category: 'Jedzenie',
    upvotes: 412,
    image: 'https://picsum.photos/seed/bangkok/600/400',
  },
  {
    id: 6,
    city: 'Londyn, Wielka Brytania',
    title: 'Rowery Santander zamiast metra',
    description: 'Metro jest drogie na krótkich dystansach. Wypożycz rower Santander za 2 funty dziennie (nielimitowane 30-minutowe przejazdy). Zobaczysz więcej miasta i zaoszczędzisz ogromną kwotę na transporcie.',
    author: 'Tom H.',
    category: 'Transport',
    upvotes: 275,
    image: 'https://picsum.photos/seed/london/600/400',
  }
];

export const DESTINATIONS = [
  {
    id: 1,
    name: 'Wietnam',
    dailyBudget: '25$ - 40$',
    image: 'https://picsum.photos/seed/vietnam/600/400',
    description: 'Niesamowite jedzenie uliczne, oszałamiające krajobrazy i niezwykle tani transport lokalny.'
  },
  {
    id: 2,
    name: 'Portugalia',
    dailyBudget: '50$ - 70$',
    image: 'https://picsum.photos/seed/portugal/600/400',
    description: 'Jeden z najtańszych kierunków w Europie Zachodniej z pięknymi plażami i bogatą historią.'
  },
  {
    id: 3,
    name: 'Meksyk',
    dailyBudget: '35$ - 55$',
    image: 'https://picsum.photos/seed/mexico/600/400',
    description: 'Poza kurortami Meksyk oferuje bogatą kulturę, cenoty i światowej klasy kuchnię przy niskim budżecie.'
  },
  {
    id: 4,
    name: 'Gruzja',
    dailyBudget: '20$ - 35$',
    image: 'https://picsum.photos/seed/georgia/600/400',
    description: 'Ukryta perełka ze starożytnymi klasztorami, górami Kaukazu i niesamowitym winem.'
  },
  {
    id: 5,
    name: 'Kolumbia',
    dailyBudget: '30$ - 45$',
    image: 'https://picsum.photos/seed/colombia/600/400',
    description: 'Tętniące życiem miasta, regiony kawowe i wybrzeża Karaibów za ułamek ceny.'
  },
  {
    id: 6,
    name: 'Maroko',
    dailyBudget: '30$ - 50$',
    image: 'https://picsum.photos/seed/morocco/600/400',
    description: 'Tętniące życiem suki, obozy na pustyni Sahara i piękne riady dla oszczędnych podróżników.'
  }
];

export const GUIDES = [
  {
    id: 1,
    title: 'Z plecakiem przez Azję Południowo-Wschodnią za 30$ dziennie',
    author: 'Alex W.',
    readTime: '12 min czytania',
    image: 'https://picsum.photos/seed/sea/600/400',
    images: [
      'https://picsum.photos/seed/sea/600/400',
      'https://picsum.photos/seed/sea2/600/400',
      'https://picsum.photos/seed/sea3/600/400',
      'https://picsum.photos/seed/sea4/600/400'
    ],
    category: 'Plan podróży'
  },
  {
    id: 2,
    title: 'Jak znaleźć błędy cenowe i tanie loty',
    author: 'Sam T.',
    readTime: '8 min czytania',
    image: 'https://picsum.photos/seed/flights/600/400',
    category: 'Triki'
  },
  {
    id: 3,
    title: 'Kompleksowy przewodnik po darmowych wycieczkach pieszych',
    author: 'Jessica M.',
    readTime: '6 min czytania',
    image: 'https://picsum.photos/seed/walking/600/400',
    images: [
      'https://picsum.photos/seed/walking/600/400',
      'https://picsum.photos/seed/walking2/600/400',
    ],
    category: 'Aktywności'
  },
  {
    id: 4,
    title: 'Gotowanie w hostelu: 5 posiłków poniżej 3$',
    author: 'Szef Dan',
    readTime: '5 min czytania',
    image: 'https://picsum.photos/seed/cooking/600/400',
    category: 'Jedzenie'
  }
];

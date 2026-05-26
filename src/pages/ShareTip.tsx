import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plane, CheckCircle2, Lock } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function ShareTip() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { currentUser, login, addTip } = useApp();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    // Map Polish keys from select to the English keys used in categories if necessary, 
    // or just use Polish directly if that's what we display
    const rawCategory = formData.get('category') as string;
    const categoryMap: Record<string, string> = {
      'transport': 'Transport',
      'dining': 'Jedzenie',
      'attractions': 'Atrakcje',
      'accommodation': 'Inne',
      'other': 'Inne'
    };

    const files = formData.getAll('images') as File[];
    const validFiles = files.filter(f => f.size > 0);
    const imageUrls = validFiles.map(f => URL.createObjectURL(f));
    const mainImage = imageUrls.length > 0 ? imageUrls[0] : 'https://picsum.photos/seed/new/600/400';

    addTip({
      title: formData.get('title') as string,
      city: formData.get('city') as string,
      category: categoryMap[rawCategory] || 'Inne',
      description: formData.get('description') as string,
      image: mainImage,
      images: imageUrls,
      price: Number(formData.get('price')) || 0,
      proofOfPrice: formData.get('proofOfPrice') ? URL.createObjectURL(formData.get('proofOfPrice') as File) : 'https://picsum.photos/seed/proofnew/200/300',
      coordinates: [0, 0] as [number, number]
    });

    setIsSubmitted(true);
  };

  if (!currentUser) {
    return (
      <div className="bg-slate-50 min-h-screen py-16 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full px-4"
        >
          <Card className="text-center py-12">
            <CardContent>
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lock className="w-10 h-10 text-slate-400" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Zaloguj się</h2>
              <p className="text-slate-600 mb-8">
                Musisz posiadać profil, aby dodawać nowe porady ułatwiające podróżowanie dla społeczności.
              </p>
              <Button 
                onClick={login}
                className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-8 h-12 text-lg"
              >
                Zaloguj się teraz
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="bg-slate-50 min-h-screen py-16 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full px-4"
        >
          <Card className="text-center py-12">
            <CardContent>
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-emerald-600" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Porada Przesłana!</h2>
              <p className="text-slate-600 mb-8">
                Dziękujemy za podzielenie się wiedzą ze społecznością. Twoja porada pomoże innym podróżować mądrzej.
              </p>
              <Button 
                onClick={() => setIsSubmitted(false)}
                className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-8"
              >
                Dodaj Kolejną Poradę
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Plane className="w-8 h-8 text-orange-600" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
            Podziel się Poradą
          </h1>
          <p className="text-lg text-slate-600">
            Pomóż społeczności podróżować lepiej, dzieląc się swoimi najlepszymi sposobami na oszczędzanie, ukrytymi perełkami i lokalnymi poradami.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="border-slate-200 shadow-lg">
            <CardHeader>
              <CardTitle>Szczegóły Porady</CardTitle>
              <CardDescription>Podaj jasne, praktyczne porady dla innych podróżników.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="space-y-2">
                  <Label htmlFor="title">Tytuł</Label>
                  <Input id="title" name="title" placeholder="np. Pomiń JR Pass, jeśli zostajesz w Tokio" required />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="city">Miasto / Lokalizacja</Label>
                    <Input id="city" name="city" placeholder="np. Tokio, Japonia" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="category">Kategoria</Label>
                    <Select name="category" required>
                      <SelectTrigger>
                        <SelectValue placeholder="Wybierz kategorię" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="transport">Transport</SelectItem>
                        <SelectItem value="dining">Jedzenie</SelectItem>
                        <SelectItem value="attractions">Atrakcje</SelectItem>
                        <SelectItem value="accommodation">Nocleg</SelectItem>
                        <SelectItem value="other">Inne</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="price">Cena ($)</Label>
                    <Input id="price" name="price" type="number" step="0.01" min="0" placeholder="np. 15.50" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="proofOfPrice">Dowód Ceny (Zdjęcie / Zrzut Ekranu)</Label>
                    <Input id="proofOfPrice" name="proofOfPrice" type="file" accept="image/*" className="cursor-pointer" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Opis</Label>
                  <Textarea 
                    id="description" 
                    name="description"
                    placeholder="Wyjaśnij poradę szczegółowo. Ile można zaoszczędzić? Gdzie dokładnie to jest? Na co ludzie powinni uważać?" 
                    className="min-h-[150px]"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="images">Zdjęcia (Możesz wybrać kilka)</Label>
                  <Input id="images" name="images" type="file" accept="image/*" multiple className="cursor-pointer" />
                </div>

                <Button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-white h-12 text-lg rounded-xl">
                  Prześlij Poradę
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

import React from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Plane } from 'lucide-react';

export default function Login() {
  const { login } = useApp();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(); // W symulacji po prostu logujemy na twardo
    navigate(-1); // Wróć do poprzedniej strony po zalogowaniu
  };

  return (
    <div className="bg-slate-50 min-h-screen py-16 flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Plane className="w-8 h-8 text-orange-600" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900">Witaj ponownie!</h1>
        </div>
        <Card className="border-slate-200 shadow-lg">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl font-bold text-slate-900">Zaloguj się</CardTitle>
            <CardDescription className="text-base mt-2">Wprowadź swoje dane, aby kontynuować</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2 text-left">
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" name="email" type="email" required placeholder="demo@example.com" className="h-12" />
              </div>
              <div className="space-y-2 text-left">
                <Label htmlFor="password">Hasło</Label>
                <Input id="password" name="password" type="password" required className="h-12" placeholder="Wpisz cokolwiek (symulacja)" />
              </div>
              <Button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-xl h-12 text-lg mt-2">
                Zaloguj się
              </Button>
            </form>
            <div className="mt-8 text-center text-slate-600 text-sm">
              Nie masz konta? <Link to="/register" className="text-orange-500 hover:underline font-bold">Zarejestruj się</Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

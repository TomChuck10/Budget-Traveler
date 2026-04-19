import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { COMMUNITY_TIPS } from '../data/mockData';

export type User = {
  id: string;
  name: string;
  role: string;
  points: number;
  joinedAt: string;
  avatar: string;
};

export type Tip = typeof COMMUNITY_TIPS[0];

export type FavoriteType = 'tips' | 'guides' | 'destinations';

type AppContextType = {
  currentUser: User | null;
  login: () => void;
  logout: () => void;
  register: (name: string) => void;
  tips: Tip[];
  addTip: (tip: Omit<Tip, 'id' | 'author' | 'upvotes'>) => void;
  upvoteTip: (id: number) => void;
  userUpvotes: number[];
  favorites: Record<FavoriteType, number[]>;
  toggleFavorite: (type: FavoriteType, id: number) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

const MOCK_USER: User = {
  id: 'u1',
  name: 'Michał T.',
  role: 'Doświadczony Podróżnik',
  points: 450,
  joinedAt: 'Marzec 2024',
  avatar: 'M',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [tips, setTips] = useState<Tip[]>(COMMUNITY_TIPS);
  const [userUpvotes, setUserUpvotes] = useState<number[]>([]);
  const [favorites, setFavorites] = useState<Record<FavoriteType, number[]>>({
    tips: [],
    guides: [],
    destinations: [],
  });

  const login = () => {
    setCurrentUser(MOCK_USER);
  };

  const register = (name: string) => {
    setCurrentUser({
      id: `u${Date.now()}`,
      name: name,
      role: 'Nowy Podróżnik',
      points: 0,
      joinedAt: 'Obecnie',
      avatar: name.charAt(0).toUpperCase(),
    });
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const addTip = (tipData: Omit<Tip, 'id' | 'author' | 'upvotes'>) => {
    if (!currentUser) return;
    
    const newTip: Tip = {
      ...tipData,
      id: Math.max(...tips.map(t => t.id)) + 1,
      author: currentUser.name,
      upvotes: 0,
    };
    
    setTips(prev => [newTip, ...prev]);
  };

  const upvoteTip = (id: number) => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    setTips(prevTips => prevTips.map(tip => {
      if (tip.id === id) {
        const isUpvoted = userUpvotes.includes(id);
        return {
          ...tip,
          upvotes: isUpvoted ? tip.upvotes - 1 : tip.upvotes + 1
        };
      }
      return tip;
    }));

    setUserUpvotes(prev => {
      if (prev.includes(id)) {
        return prev.filter(upvoteId => upvoteId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const toggleFavorite = (type: FavoriteType, id: number) => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    setFavorites(prev => {
      const list = prev[type];
      if (list.includes(id)) {
        return { ...prev, [type]: list.filter(itemId => itemId !== id) };
      } else {
        return { ...prev, [type]: [...list, id] };
      }
    });
  };

  return (
    <AppContext.Provider value={{ currentUser, login, logout, register, tips, addTip, upvoteTip, userUpvotes, favorites, toggleFavorite }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

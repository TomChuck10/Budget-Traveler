import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { COMMUNITY_TIPS } from '../data/mockData';
import { auth, db } from '../firebase';
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export type User = {
  id: string;
  name: string;
  role: string;
  points: number;
  joinedAt: string;
  avatar: string;
};

export type Tip = typeof COMMUNITY_TIPS[0] & { images?: string[] };

export type FavoriteType = 'tips' | 'guides' | 'destinations';

type AppContextType = {
  currentUser: User | null;
  loading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  register: () => Promise<void>;
  tips: Tip[];
  addTip: (tip: Omit<Tip, 'id' | 'author' | 'upvotes' | 'downvotes'>) => void;
  upvoteTip: (id: number) => void;
  downvoteTip: (id: number) => void;
  userVotes: Record<number, 'up' | 'down'>;
  favorites: Record<FavoriteType, number[]>;
  toggleFavorite: (type: FavoriteType, id: number) => void;
  itinerary: number[];
  toggleItinerary: (id: number) => void;
  userUpvotes: number[]; // kept for partial compatibility where needed, but we'll use userVotes actively
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [tips, setTips] = useState<Tip[]>(COMMUNITY_TIPS);
  const [userVotes, setUserVotes] = useState<Record<number, 'up' | 'down'>>({});
  const [userUpvotes, setUserUpvotes] = useState<number[]>([]);
  const [itinerary, setItinerary] = useState<number[]>([]);
  const [favorites, setFavorites] = useState<Record<FavoriteType, number[]>>({
    tips: [],
    guides: [],
    destinations: [],
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userDocRef = doc(db, 'users', firebaseUser.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            setCurrentUser(userDoc.data() as User);
          } else {
            const newUser: User = {
              id: firebaseUser.uid,
              name: firebaseUser.displayName || firebaseUser.email || 'Nowy Podróżnik',
              role: 'Nowy Podróżnik',
              points: 0,
              joinedAt: new Date().toLocaleDateString('pl-PL', { month: 'long', year: 'numeric' }),
              avatar: (firebaseUser.displayName || 'U').charAt(0).toUpperCase(),
            };
            await setDoc(userDocRef, newUser);
            setCurrentUser(newUser);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setCurrentUser(null);
        }
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const register = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Register failed", error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const addTip = (tipData: Omit<Tip, 'id' | 'author' | 'upvotes' | 'downvotes'>) => {
    if (!currentUser) return;
    
    const newTip: Tip = {
      ...tipData,
      id: Math.max(...tips.map(t => t.id)) + 1,
      author: currentUser.name,
      upvotes: 0,
      downvotes: 0,
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
        let newUpvotes = tip.upvotes;
        let newDownvotes = tip.downvotes;
        
        if (userVotes[id] === 'up') {
          newUpvotes -= 1; // remove upvote
        } else if (userVotes[id] === 'down') {
          newDownvotes -= 1; // remove downvote
          newUpvotes += 1; // add upvote
        } else {
          newUpvotes += 1; // add upvote
        }
        
        return {
          ...tip,
          upvotes: newUpvotes,
          downvotes: newDownvotes
        };
      }
      return tip;
    }));

    setUserVotes(prev => {
      const newVotes = { ...prev };
      if (prev[id] === 'up') {
        delete newVotes[id];
      } else {
        newVotes[id] = 'up';
      }
      return newVotes;
    });

    setUserUpvotes(prev => {
      if (prev.includes(id)) {
        return prev.filter(upvoteId => upvoteId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const downvoteTip = (id: number) => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    setTips(prevTips => prevTips.map(tip => {
      if (tip.id === id) {
        let newUpvotes = tip.upvotes;
        let newDownvotes = tip.downvotes;
        
        if (userVotes[id] === 'down') {
          newDownvotes -= 1; // remove downvote
        } else if (userVotes[id] === 'up') {
          newUpvotes -= 1; // remove upvote
          newDownvotes += 1; // add downvote
        } else {
          newDownvotes += 1; // add downvote
        }
        
        return {
          ...tip,
          upvotes: newUpvotes,
          downvotes: newDownvotes
        };
      }
      return tip;
    }));

    setUserVotes(prev => {
      const newVotes = { ...prev };
      if (prev[id] === 'down') {
        delete newVotes[id];
      } else {
        newVotes[id] = 'down';
      }
      return newVotes;
    });

    setUserUpvotes(prev => prev.filter(upvoteId => upvoteId !== id)); // Remove from old upvotes
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

  const toggleItinerary = (id: number) => {
    setItinerary(prev => {
      if (prev.includes(id)) {
        return prev.filter(itemId => itemId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  return (
    <AppContext.Provider value={{ currentUser, loading, login, logout, register, tips, addTip, upvoteTip, downvoteTip, userVotes, favorites, toggleFavorite, itinerary, toggleItinerary, userUpvotes }}>
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

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type CocktailItem = {
  id: string;
  name: string;
  description: string;
  imageUri: string;
};

type CocktailContextType = {
  cocktailList: CocktailItem[];
  addCocktail: (item: CocktailItem) => void;
  deleteCocktail: (id: string) => void;
  updateCocktail: (item: CocktailItem) => void;
};

const STORAGE_KEY = 'cocktailList';

const initialCocktails: CocktailItem[] = [
  {
    id: '1',
    name: 'カシスオレンジ',
    description: '甘くて飲みやすいカクテル。自分は飲まないので何と合うかわからん。',
    imageUri: Image.resolveAssetSource(require('../assets/cocktails/cocktail01.png')).uri,
  },
];

export const CocktailContext = createContext<CocktailContextType | undefined>(undefined);

export const CocktailProvider = ({ children }: { children: ReactNode }) => {
  const [cocktailList, setCocktailList] = useState<CocktailItem[]>(initialCocktails);

  useEffect(() => {
    const loadData = async () => {
      try {
        const storedData = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedData) {
          setCocktailList(JSON.parse(storedData));
        }
      } catch (error) {
        console.error('Failed to load cocktail list:', error);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    const saveData = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(cocktailList));
      } catch (error) {
        console.error('Failed to save cocktail list:', error);
      }
    };
    saveData();
  }, [cocktailList]);

  const addCocktail = (item: CocktailItem) => {
    setCocktailList(prev => [...prev, item]);
  };

  const deleteCocktail = (id: string) => {
    setCocktailList(prev => prev.filter(item => item.id !== id));
  };

  const updateCocktail = (item: CocktailItem) => {
    setCocktailList(prev => prev.map(c => c.id === item.id ? item : c));
  };

  return (
    <CocktailContext.Provider value={{ cocktailList, addCocktail, deleteCocktail, updateCocktail }}>
      {children}
    </CocktailContext.Provider>
  );
};

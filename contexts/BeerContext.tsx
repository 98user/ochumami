// contexts/BeerContext.tsx
import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type BeerItem = {
    id: string;
    name: string;
    description: string;
    imageUri: string;
  };
  
  type BeerContextType = {
    beerList: BeerItem[];
    addBeer: (item: BeerItem) => void;
    deleteBeer: (id: string) => void;
    updateBeer: (item: BeerItem) => void;
  };
  
  const STORAGE_KEY = 'user_beer_list';
  
  const initialBeers: BeerItem[] = [
    {
      id: '1',
      name: 'アサヒ　スーパードライ',
      description: 'すっきりした飲み口で人気のビール。さすがに唐揚げとか焼き鳥との相性が最高。',
      imageUri: Image.resolveAssetSource(require('../assets/beers/beer01.png')).uri,
    },
  ];
  
  const BeerContext = createContext<BeerContextType | undefined>(undefined);
  
  const BeerProvider = ({ children }: { children: ReactNode }) => {
    const [beerList, setBeerList] = useState<BeerItem[]>(initialBeers);
  
    useEffect(() => {
      const loadBeers = async () => {
        try {
          const data = await AsyncStorage.getItem(STORAGE_KEY);
          if (data) {
            setBeerList(JSON.parse(data));
          }
        } catch (e) {
          console.error('Failed to load beers from storage', e);
        }
      };
      loadBeers();
    }, []);
  
    const saveToStorage = (list: BeerItem[]) => {
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(list)).catch(console.error);
    };
  
    const addBeer = (item: BeerItem) => {
      const updated = [...beerList, item];
      setBeerList(updated);
      saveToStorage(updated);
    };
  
    const deleteBeer = (id: string) => {
      const updated = beerList.filter(item => item.id !== id);
      setBeerList(updated);
      saveToStorage(updated);
    };
  
    const updateBeer = (updatedItem: BeerItem) => {
      const updated = beerList.map(item =>
        item.id === updatedItem.id ? updatedItem : item
      );
      setBeerList(updated);
      saveToStorage(updated);
    };
  
    return (
      <BeerContext.Provider value={{ beerList, addBeer, deleteBeer, updateBeer }}>
        {children}
      </BeerContext.Provider>
    );
  };
  
  export { BeerContext, BeerProvider };
  
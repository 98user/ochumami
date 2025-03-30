import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type WineItem = {
  id: string;
  name: string;
  description: string;
  imageUri: string;
};

type WineContextType = {
  wineList: WineItem[];
  addWine: (item: WineItem) => void;
  deleteWine: (id: string) => void;
  updateWine: (item: WineItem) => void;
};

const STORAGE_KEY = 'user_wine_list';

const initialWines: WineItem[] = [
  {
    id: '1',
    name: 'サイゼリヤワイン１',
    description: '旨みのなるワイン。サイゼリヤの全てのメニューと合う。',
    imageUri: Image.resolveAssetSource(require('../assets/wines/wine01.png')).uri,
  },
];

const WineContext = createContext<WineContextType | undefined>(undefined);

const WineProvider = ({ children }: { children: ReactNode }) => {
  const [wineList, setWineList] = useState<WineItem[]>(initialWines);

  useEffect(() => {
    const loadWines = async () => {
      try {
        const data = await AsyncStorage.getItem(STORAGE_KEY);
        if (data) {
          setWineList(JSON.parse(data));
        }
      } catch (e) {
        console.error('Failed to load wines from storage', e);
      }
    };
    loadWines();
  }, []);

  const saveToStorage = (list: WineItem[]) => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(list)).catch(console.error);
  };

  const addWine = (item: WineItem) => {
    const updated = [...wineList, item];
    setWineList(updated);
    saveToStorage(updated);
  };

  const deleteWine = (id: string) => {
    const updated = wineList.filter(item => item.id !== id);
    setWineList(updated);
    saveToStorage(updated);
  };

  const updateWine = (updatedItem: WineItem) => {
    const updated = wineList.map(item =>
      item.id === updatedItem.id ? updatedItem : item
    );
    setWineList(updated);
    saveToStorage(updated);
  };

  return (
    <WineContext.Provider value={{ wineList, addWine, deleteWine, updateWine }}>
      {children}
    </WineContext.Provider>
  );
};

export { WineContext, WineProvider };

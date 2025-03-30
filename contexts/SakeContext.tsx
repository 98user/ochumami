// contexts/SakeContext.tsx
import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type SakeItem = {
  id: string;
  name: string;
  description: string;
  imageUri: string;
};

type SakeContextType = {
  sakeList: SakeItem[];
  addSake: (item: SakeItem) => void;
  deleteSake: (id: string) => void;
  updateSake: (updatedItem: SakeItem) => void;
};

const STORAGE_KEY = 'user_sake_list';

const initialSakes: SakeItem[] = [
  {
    id: '1',
    name: '春鹿（奈良）',
    description: '冷やすと軽快に、お燗にするときりっとした旨味が味わえます。',
    imageUri: Image.resolveAssetSource(require('../assets/sakes/01.jpg')).uri,
  },
];

const SakeContext = createContext<SakeContextType | undefined>(undefined);

const SakeProvider = ({ children }: { children: ReactNode }) => {
  const [sakeList, setSakeList] = useState<SakeItem[]>(initialSakes);

  useEffect(() => {
    const loadSakes = async () => {
      try {
        const data = await AsyncStorage.getItem(STORAGE_KEY);
        if (data) {
          setSakeList(JSON.parse(data));
        }
      } catch (e) {
        console.error('Failed to load sakes from storage', e);
      }
    };
    loadSakes();
  }, []);

  const addSake = (item: SakeItem) => {
    const updated = [...sakeList, item];
    setSakeList(updated);
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const deleteSake = (id: string) => {
    const updated = sakeList.filter(item => item.id !== id);
    setSakeList(updated);
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const updateSake = (updatedItem: SakeItem) => {
    const updated = sakeList.map(item =>
      item.id === updatedItem.id ? updatedItem : item
    );
    setSakeList(updated);
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  return (
    <SakeContext.Provider value={{ sakeList, addSake, deleteSake, updateSake }}>
      {children}
    </SakeContext.Provider>
  );
};

export { SakeContext, SakeProvider };

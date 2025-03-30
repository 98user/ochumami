import React, { useState, useContext } from 'react';
import {
  View, TextInput, TouchableOpacity, Text, StyleSheet, Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { CocktailContext } from '../contexts/CocktailContext';
import KeyboardSafeWrapper from '../components/KeyboardSafeWrapper';

export default function AddCocktailScreen() {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);

  const context = useContext(CocktailContext);
  if (!context) throw new Error('CocktailContext is missing');
  const { addCocktail } = context;

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      base64: true,
    });

    if (!result.canceled && result.assets[0].base64) {
      setImageUri(`data:image/jpeg;base64,${result.assets[0].base64}`);
    }
  };

  const handleAdd = () => {
    addCocktail({
      id: Date.now().toString(),
      name,
      description,
      imageUri: imageUri || '',
    });
    navigation.goBack();
  };

  return (
    <KeyboardSafeWrapper>
      <View style={styles.container}>
        <TouchableOpacity style={styles.imageBox} onPress={pickImage}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.image} />
          ) : (
            <Text style={styles.imagePlaceholder}>+ 写真添付</Text>
          )}
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="名前を入力"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={[styles.input, { height: 100 }]}
          placeholder="説明を入力"
          value={description}
          onChangeText={setDescription}
          multiline
        />

        <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
          <Text style={styles.addButtonText}>+ 追加</Text>
        </TouchableOpacity>
      </View>
    </KeyboardSafeWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFDF4',
    padding: 20,
  },
  imageBox: {
    width: '100%',
    height: 200,
    backgroundColor: '#eee',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  imagePlaceholder: {
    fontSize: 16,
    color: '#666',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    marginBottom: 15,
  },
  addButton: {
    backgroundColor: '#f8bfbf',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 18,
  },
});

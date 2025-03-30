// screens/EditWineScreen.tsx

import React, { useState, useContext } from 'react';
import {
  View, TextInput, TouchableOpacity, Text, StyleSheet, Image,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { WineContext, WineItem } from '../contexts/WineContext';
import KeyboardSafeWrapper from '../components/KeyboardSafeWrapper';

const EditWineScreen = () => {
    console.log('EditWineScreen loaded')
  const navigation = useNavigation();
  const { params } = useRoute<any>();
  const wineToEdit: WineItem = params?.wine;

  const [name, setName] = useState(wineToEdit.name);
  const [description, setDescription] = useState(wineToEdit.description);
  const [imageUri, setImageUri] = useState(wineToEdit.imageUri);

  const context = useContext(WineContext);
  if (!context) throw new Error('WineContext is missing');
  const { updateWine } = context;

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      const base64 = result.assets[0].base64;
      if (base64) {
        setImageUri(`data:image/jpeg;base64,${base64}`);
      }
    }
  };

  const handleUpdate = () => {
    updateWine({ ...wineToEdit, name, description, imageUri });
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
          placeholder="名前"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={[styles.input, { height: 100 }]}
          placeholder="説明"
          value={description}
          onChangeText={setDescription}
          multiline
        />

        <TouchableOpacity style={styles.addButton} onPress={handleUpdate}>
          <Text style={styles.addButtonText}>更新</Text>
        </TouchableOpacity>
      </View>
    </KeyboardSafeWrapper>
  );
};

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
    backgroundColor: '#a3c585',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 18,
    color: '#fff',
  },
});

export default EditWineScreen;

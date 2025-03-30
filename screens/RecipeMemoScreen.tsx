import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface RecipeData {
  ingredients: string[];
  recipe: string;
  imageUri: string | null;
  pairingDrink: string;
}

export default function RecipeMemoScreen() {
  const [ingredient, setIngredient] = useState('');
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [recipe, setRecipe] = useState('');
  const [pairingDrink, setPairingDrink] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [recipes, setRecipes] = useState<RecipeData[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const STORAGE_KEY = 'user_recipes';

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const data = await AsyncStorage.getItem(STORAGE_KEY);
        if (data) setRecipes(JSON.parse(data));
      } catch (error) {
        console.error('Error loading recipes:', error);
      }
    };
    loadRecipes();
  }, []);

  useEffect(() => {
    const saveToStorage = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
      } catch (error) {
        console.error('Error saving recipes:', error);
      }
    };
    saveToStorage();
  }, [recipes]);

  const addIngredient = () => {
    if (ingredient.trim()) {
      setIngredients([...ingredients, ingredient]);
      setIngredient('');
    }
  };

  const removeIngredient = (index: number) => {
    const updated = [...ingredients];
    updated.splice(index, 1);
    setIngredients(updated);
  };

  const pickImage = async () => {
    Alert.alert(
      '写真の選択',
      'どちらから写真を追加しますか？',
      [
        {
          text: 'カメラで撮影',
          onPress: async () => {
            const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
            if (!cameraPermission.granted) {
              alert('カメラへのアクセスが必要です');
              return;
            }
            const result = await ImagePicker.launchCameraAsync({
              allowsEditing: true,
              aspect: [4, 3],
              quality: 1,
            });
            if (!result.canceled && result.assets?.length > 0) {
              setImageUri(result.assets[0].uri);
            }
          },
        },
        {
          text: 'アルバムから選択',
          onPress: async () => {
            const libPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (!libPermission.granted) {
              alert('写真ライブラリへのアクセスが必要です');
              return;
            }
            const result = await ImagePicker.launchImageLibraryAsync({
              allowsEditing: true,
              aspect: [4, 3],
              quality: 1,
            });
            if (!result.canceled && result.assets?.length > 0) {
              setImageUri(result.assets[0].uri);
            }
          },
        },
        { text: 'キャンセル', style: 'cancel' },
      ]
    );
  };

  const saveRecipe = () => {
    if (ingredients.length === 0 && recipe.trim() === '') return;
    const newRecipe: RecipeData = { ingredients, recipe, imageUri, pairingDrink };
    if (editingIndex !== null) {
      const updated = [...recipes];
      updated[editingIndex] = newRecipe;
      setRecipes(updated);
      setEditingIndex(null);
    } else {
      setRecipes([...recipes, newRecipe]);
    }
    setIngredients([]);
    setIngredient('');
    setRecipe('');
    setImageUri(null);
    setPairingDrink('');
  };

  const deleteRecipe = (index: number) => {
    const updated = [...recipes];
    updated.splice(index, 1);
    setRecipes(updated);
  };

  const editRecipe = (index: number) => {
    const item = recipes[index];
    setIngredients(item.ingredients);
    setRecipe(item.recipe);
    setImageUri(item.imageUri);
    setPairingDrink(item.pairingDrink);
    setEditingIndex(index);
  };

  const renderRecipeItem = (item: RecipeData, index: number) => (
    <View key={index} style={styles.card}>
      <Text style={styles.sectionTitle}>材料:</Text>
      {item.ingredients.map((ing, i) => (
        <Text key={i}>- {ing}</Text>
      ))}
      <Text style={[styles.sectionTitle, { marginTop: 5 }]}>レシピ:</Text>
      <Text>{item.recipe}</Text>
      {item.imageUri && (
        <Image
          source={{ uri: item.imageUri }}
          style={{ width: 200, height: 200, borderRadius: 10, marginTop: 10 }}
        />
      )}
      <Text style={styles.sectionTitle}>合うお酒:</Text>
      <Text>{item.pairingDrink}</Text>
      <View style={styles.cardButtonRow}>
        <Pressable style={styles.editButton} onPress={() => editRecipe(index)}>
          <Text style={styles.editButtonText}>編集</Text>
        </Pressable>
        <Pressable style={styles.deleteButton} onPress={() => deleteRecipe(index)}>
          <Text style={styles.deleteButtonText}>削除</Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <ScrollView
        contentContainerStyle={[styles.container, { paddingBottom: 120, flexGrow: 1 }]}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.sectionTitle}>材料</Text>
        <View style={{ flexDirection: 'row', marginVertical: 10 }}>
          <TextInput
            placeholder="材料"
            value={ingredient}
            onChangeText={setIngredient}
            style={[styles.input, { flex: 1, marginRight: 10 }]}
          />
          <Pressable style={styles.addButton} onPress={addIngredient}>
            <Text style={styles.addButtonText}>追加</Text>
          </Pressable>
        </View>
        {ingredients.map((item, index) => (
          <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
            <Text style={{ flex: 1 }}>{item}</Text>
            <TouchableOpacity onPress={() => removeIngredient(index)}>
              <Text style={{ color: 'red' }}>削除</Text>
            </TouchableOpacity>
          </View>
        ))}

        <Text style={[styles.sectionTitle, { marginTop: 20 }]}>レシピ</Text>
        <TextInput
          placeholder="レシピ内容を入力してください"
          value={recipe}
          onChangeText={setRecipe}
          multiline
          style={[styles.input, { height: 120, textAlignVertical: 'top' }]}
        />

        <Pressable style={styles.imageBox} onPress={pickImage}>
          {imageUri ? (
            <Image
              source={{ uri: imageUri }}
              style={{ width: 80, height: 80, borderRadius: 10 }}
            />
          ) : (
            <Text style={styles.imagePlaceholder}>写真を追加</Text>
          )}
        </Pressable>

        <Text style={[styles.sectionTitle, { marginTop: 20 }]}>このお酒と合う！</Text>
        <TextInput
          placeholder="おすすめのお酒"
          value={pairingDrink}
          onChangeText={setPairingDrink}
          style={styles.input}
        />

        <Pressable style={styles.addButton} onPress={saveRecipe}>
          <Text style={styles.addButtonText}>
            {editingIndex !== null ? 'レシピを更新' : 'レシピを登録'}
          </Text>
        </Pressable>

        <Text style={{ fontSize: 22, fontWeight: 'bold', marginVertical: 20 }}>
          登録されたレシピ一覧
        </Text>

        {recipes.map((item, index) => renderRecipeItem(item, index))}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#FFFDF4',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    marginBottom: 15,
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
  imagePlaceholder: {
    fontSize: 16,
    color: '#666',
  },
  addButton: {
    backgroundColor: '#a3c585',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  addButtonText: {
    fontSize: 18,
    color: '#fff',
  },
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  cardButtonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
    gap: 10,
  },
  editButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#7ba9d9',
    borderRadius: 8,
  },
  editButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  deleteButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#e57373',
    borderRadius: 8,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
import React, { useContext, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { Audio } from 'expo-av';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { WineContext } from '../contexts/WineContext';

export default function WineScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const context = useContext(WineContext);

  if (!context) throw new Error('WineScreen must be used within a WineProvider');
  const { wineList, deleteWine } = context;

  useEffect(() => {
    (async () => {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: false,
        playsInSilentModeIOS: true,
      });
    })();
  }, []);

  const deleteSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/sounds/delete.mp3')
      );
      await sound.playAsync();
      setTimeout(() => {
        sound.unloadAsync();
      }, 500);
    } catch (error) {
      console.log('사운드 재생 에러:', error);
    }
  };

  const addSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/sounds/click.mp3')
      );
      await sound.playAsync();
      setTimeout(() => {
        sound.unloadAsync();
      }, 500);
    } catch (error) {
      console.log('사운드 재생 에러:', error);
    }
  };

  const handleDeleteConfirm = (id: string) => {
    (async () => {
      await deleteSound();
      deleteWine(id);
    })();
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      '削除確認',
      '本当に削除しますか？',
      [
        { text: 'キャンセル', style: 'cancel' },
        {
          text: '削除',
          style: 'destructive',
          onPress: () => handleDeleteConfirm(id),
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {wineList.map((item) => (
        <View style={styles.card} key={item.id}>
          <Image
            source={{ uri: item.imageUri }}
            style={styles.image}
            resizeMode="contain"
            onError={(e) => console.log('이미지 로딩 실패:', e.nativeEvent.error)}
          />
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.desc}>{item.description}</Text>

          <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.id)}>
            <Text style={styles.deleteButtonText}>削除</Text>
          </TouchableOpacity>

          <TouchableOpacity
  style={styles.editButton}
  onPress={() => {
    console.log('🛠 navigating to EditWine with:', item);
    navigation.navigate('EditWine', { wine: item });
  }}
>
  <Text style={styles.editButtonText}>編集</Text>
</TouchableOpacity>

        </View>
      ))}

      <TouchableOpacity
        style={styles.addButton}
        onPress={async () => {
          await addSound();
          navigation.navigate('AddWine');
        }}
      >
        <Text style={styles.addButtonText}>+ 追加</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#FFFDF4',
    paddingBottom: 100,
  },
  card: {
    backgroundColor: '#fff',
    marginBottom: 15,
    padding: 15,
    borderRadius: 10,
    elevation: 2,
    paddingBottom: 20
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  desc: {
    fontSize: 14,
    marginTop: 5,
    textAlign: 'center',
  },
  deleteButton: {
    backgroundColor: '#a3c585',
    padding: 8,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#f8bfbf',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: {
    fontSize: 18,
  },
  editButton: {
    backgroundColor: '#a3c585',
    padding: 8,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  editButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

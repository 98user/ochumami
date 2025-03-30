import React, { useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Audio } from 'expo-av';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

const buttons = [
  { label: '日本酒', icon: require('../assets/sake.png'), screen: 'Drink' },
  { label: 'ワイン', icon: require('../assets/wine.png'), screen: 'Wine' },
  { label: 'ビール', icon: require('../assets/beer.png'), screen: 'Beer' },
  { label: 'カクテル・酎ハイ', icon: require('../assets/cocktail.png'), screen: 'Cocktail' },
  { label: 'レシピのメモ', icon: require('../assets/memo.png'), screen: 'RecipeMemo' },
];

export default function HomeScreen({ navigation }: HomeScreenProps) {
  useEffect(() => {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: false,
      playsInSilentModeIOS: false,
    });
  }, []);

  const playClickSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/sounds/click_trimmed.mp3')
    );
    await sound.playAsync();
    setTimeout(() => {
      sound.unloadAsync();
    }, 500);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.logoRow}>
          <Image source={require('../assets/title.png')} style={styles.logo1} />
          <View style={styles.logoColumn}>
            <Image source={require('../assets/bottles.png')} style={styles.logo2} />
            <Image source={require('../assets/tsumami.png')} style={styles.subImage} />
          </View>
        </View>

        {buttons.map((btn, index) => {
          const scale = useSharedValue(1);
          const animatedStyle = useAnimatedStyle(() => ({
            transform: [{ scale: scale.value }],
          }));

          return (
            <View key={index} style={{ width: '100%' }}>
              <Pressable
                onPressIn={() => {
                  scale.value = withSpring(0.95, { stiffness: 200 });
                }}
                onPressOut={() => {
                  scale.value = withSpring(1, { stiffness: 200 });
                }}
                onPress={async () => {
                  await playClickSound();
                  // 👇 타입 오류 없이 navigate 실행
                  navigation.navigate(btn.screen as any);
                }}
              >
                <Animated.View style={[styles.button, animatedStyle]}>
                  <Image source={btn.icon} style={styles.icon} />
                  <Text style={styles.buttonText}>{btn.label}</Text>
                </Animated.View>
              </Pressable>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF3AC',
  },
  scrollContainer: {
    paddingTop: 40,
    paddingHorizontal: 30,
    alignItems: 'center',
    paddingBottom: 60,
  },
  logoColumn: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  subImage: {
    width: 70,
    height: 70,
    marginTop: -30,
    resizeMode: 'contain',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  logo1: {
    width: 180,
    height: 160,
    resizeMode: 'contain',
    marginHorizontal: -30,
    transform: [{ rotate: '-10deg' }],
  },
  logo2: {
    width: 200,
    height: 100,
    resizeMode: 'contain',
    marginHorizontal: -40,
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 20,
    width: '100%',
    flexDirection: 'row',
    minHeight: 60,
    alignItems: 'center',
    justifyContent: 'flex-start',
    elevation: 3,
  },
  icon: {
    width: 32,
    height: 32,
    marginRight: 15,
  },
  buttonText: {
    fontSize: 20,
  },
});

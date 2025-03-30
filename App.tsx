//App.tsx//
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import DrinkScreen from './screens/DrinkScreen';
import AddSakeScreen from './screens/AddSakeScreen';
import { SakeProvider } from './contexts/SakeContext';
import type { SakeItem } from './screens/types'; 
import EditSakeScreen from './screens/EditSakeScreen';
import WineScreen from './screens/WineScreen';
import AddWineScreen from './screens/AddWineScreen';
import { WineProvider } from './contexts/WineContext';
import EditWineScreen from './screens/EditWineScreen';
import type { WineItem } from './contexts/WineContext';
import BeerScreen from './screens/BeerScreen';
import { BeerItem } from './contexts/BeerContext';
import EditBeerScreen from './screens/EditBeerScreen';
import AddBeerScreen from './screens/AddBeerScreen';
import { BeerProvider } from './contexts/BeerContext';
import { CocktailItem } from './contexts/CocktailContext';
import CocktailScreen from './screens/CocktailScreen';
import EditCocktailScreen from './screens/EditCocktailScreen';
import AddCocktailScreen from './screens/AddCocktailScreen';
import { CocktailProvider } from './contexts/CocktailContext';
import RecipeMemoScreen from './screens/RecipeMemoScreen';


export type RootStackParamList = {
  Home: undefined;
  Drink: { newSake?: SakeItem } | undefined;
  AddSake: undefined;
  Wine: undefined;
  AddWine: undefined;
  Beer: undefined;
  AddBeer: undefined;
  Cocktail: undefined;
  AddCocktail: undefined;
  EditWine: { wine: WineItem };
  EditSake: { sake: SakeItem };
  EditBeer: { beer: BeerItem};
  EditCocktail: {cocktail: CocktailItem};
  RecipeMemo: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SakeProvider>
      <WineProvider>
        <BeerProvider>
          <CocktailProvider>
            <NavigationContainer>
              <Stack.Navigator initialRouteName="Home">
                <Stack.Screen
                  name="Home"
                  component={HomeScreen}
                  options={{ title: 'おちゅまみ' }}
                />
                <Stack.Screen
                  name="Drink"
                  component={DrinkScreen}
                  options={{ title: '日本酒' }}
                />          
                <Stack.Screen
                  name="AddSake"
                  component={AddSakeScreen}
                  options={{ title: '追加' }} />

                <Stack.Screen
                  name="EditSake"
                  component={EditSakeScreen}
                  options={{ title: '日本酒編集' }}
                />

                <Stack.Screen 
                  name="Wine" 
                  component={WineScreen} />

                <Stack.Screen
                  name="AddWine"
                  component={AddWineScreen}
                  options={{ title: 'ワイン追加' }}/>

                <Stack.Screen
                  name="EditWine"
                  component={EditWineScreen}
                  options={{ title: 'ワイン編集' }}
                  />

                <Stack.Screen 
                  name="Beer" 
                  component={BeerScreen} />

                <Stack.Screen
                name="AddBeer"
                component = {AddBeerScreen}
                options={{title: 'ビール追加'}}/>

                <Stack.Screen
                  name="EditBeer"
                  component={EditBeerScreen}
                  options={{title: 'ビール編集'}} />

                <Stack.Screen
                name="Cocktail"
                component={CocktailScreen}/>
                
                <Stack.Screen
                name="AddCocktail"
                component={AddCocktailScreen}
                options={{title: 'カクテル・酎ハイ追加'}}/>

                <Stack.Screen
                name="EditCocktail"
                component={EditCocktailScreen}
                options={{title: 'カクテル・酎ハイ編集'}}/>

              <Stack.Screen
                name="RecipeMemo"
                component={RecipeMemoScreen}
                options={{ title: 'レシピのメモ' }}
              />

              </Stack.Navigator>
             </NavigationContainer>
          </CocktailProvider>
        </BeerProvider>
      </WineProvider>
    </SakeProvider>
  );
}

//Error test//
console.log('DrinkScreen is:', DrinkScreen);
console.log('AddSakeScreen is:', AddSakeScreen);
console.log('🍶 SakeProvider is:', SakeProvider);
console.log('🧪 typeof SakeProvider:', typeof SakeProvider);
console.log('🍷 EditWineScreen is:', typeof EditWineScreen);
console.log('🍶 EditSakeScreen is:', EditSakeScreen);
console.log('🍺 BeerScreen is:', BeerScreen);
console.log('🍻 AddBeerScreen is:', AddBeerScreen);
console.log('💥 AddBeerScreen type:', typeof AddBeerScreen);
console.log('🧃 BeerProvider type:', typeof BeerProvider);
console.log('🧃 BeerProvider is:', BeerProvider);
console.log('🍸 CocktailProvider:', typeof CocktailProvider);
console.log('🍸 CocktailScreen is:', CocktailScreen);
console.log('🍸 CocktailScreen is:', typeof CocktailScreen);
console.log('🍸 AddCocktailScreen is:', AddCocktailScreen);
console.log('🍸 AddCocktailScreen type:', typeof AddCocktailScreen);

import * as React from "react"
import { LogBox,StatusBar} from 'react-native';
import "react-native-gesture-handler"
import colors from "./src/utils/colors";
import {NavigationContainer} from "@react-navigation/native"
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import Question from "./src/screens/Question"
import Paper from './src/screens/Paper';
import { usePreventScreenCapture } from 'expo-screen-capture';
import * as SplashScreen from 'expo-splash-screen';
const Stack =createNativeStackNavigator()
export default function App() {  
  usePreventScreenCapture();
 React.useEffect(()=>{
    LogBox.ignoreLogs(['Setting a timer for a long period of time'])
  },[])
  const loadsplashscreen=async()=>{
    await SplashScreen.hideAsync();
  }
  const shownscreen=async()=>{
    await SplashScreen.preventAutoHideAsync();
  }
  React.useEffect(()=>{
    shownscreen()
setTimeout(() => {
  loadsplashscreen()
}, 3000);
  },[])
  return (
    <NavigationContainer>
<Stack.Navigator  screenOptions={{headerShown: false}}>
<Stack.Screen name='Question' component={Question}></Stack.Screen>
<Stack.Screen name='Paper' component={Paper}></Stack.Screen>
</Stack.Navigator>
</NavigationContainer>
  );
}



import { StatusBar } from 'react-native'
import { View, Text, StyleSheet,ActivityIndicator } from 'react-native'
import * as React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '../utils/colors';
import Radiobutton from '../components/Radiobutton';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { useFonts } from "expo-font";
import { 
  Kanit_100Thin,
  Kanit_300Light,
} from "@expo-google-fonts/kanit"
import { 
  Raleway_100Thin,
  Raleway_300Light,
  Raleway_400Regular,
  Raleway_500Medium,
  Raleway_700Bold,
  Raleway_700Bold_Italic,
} from '@expo-google-fonts/raleway'

import * as Linking from 'expo-linking';
export default function Question({navigation}) {
  let [loadfont,error]=useFonts({
    Kanit_300Light,
    Kanit_100Thin,
    Raleway_100Thin,
    Raleway_300Light,
    Raleway_400Regular,
    Raleway_500Medium,
    Raleway_700Bold,
    Raleway_700Bold_Italic,
  })
  if(!loadfont)
  {
    return(
      <View style={{ flex:1,display:"flex" , alignItems:"center", justifyContent:"center"}}>
      <ActivityIndicator size="large" color={colors.blue} />
      </View>
    )
  }
  return (
    <SafeAreaView  style={styles.sv}>
    
      <View style={styles.firstch1}>
      <Text style={styles.sfct01}>[Simulador]</Text>
        <Text style={styles.sfct1}>Exames de acesso à</Text>
        <Text style={styles.sfct3}>Carta de Caçador</Text>
        {/*<Text style={styles.sfct2}>TAC • A/D • B • C • E</Text>*/}
      </View>
      <View style={styles.firstch2}>
      <Radiobutton navigation={navigation}/>
      </View>
      <Text style={styles.sfct12} onPress={()=>Linking.openURL("https://http://www.cartacaçador.pt/terms.html")}>Disclaimer</Text>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
      sv: {
        flex: 1,
        backgroundColor:colors.blue,
      },
      firstch1:{
        flex:1/3,
        backgroundColor:colors.blue,
        justifyContent:"center",
        alignItems:"center"
      },
      sfct01:{
        color:colors.white,fontSize:RFPercentage(3.5),marginBottom:RFPercentage(1),
        fontFamily:"Raleway_400Regular"
      },
      
      sfct1:{
        color:colors.white,fontSize:RFPercentage(3),marginBottom:RFPercentage(0),marginTop:RFPercentage(1),
        fontFamily:"Raleway_500Medium"
      },
      sfct3:{
        color:colors.white,fontSize:RFPercentage(4),marginBottom:RFPercentage(.5),
        fontFamily:"Raleway_700Bold"
      },
      sfct2:{
        color:colors.white,fontSize:RFPercentage(3.4),marginBottom:RFPercentage(.5),
        fontFamily:"Raleway_500Medium"
      },
      firstch2:{
        flex:1/2,
        justifyContent:"center",
        alignItems:"center"
      },
      sfct12:{
        color:colors.white,fontSize:RFPercentage(2.2),
        fontFamily:"Raleway_400Regular",position:"absolute",textAlign:"center",width:"100%",
        bottom:RFPercentage(2)
      }

  });
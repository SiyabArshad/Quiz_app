import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import React,{useState,useEffect} from 'react'
import colors from '../utils/colors';
import {collection,getDocs,getFirestore}  from "firebase/firestore"
import { RFPercentage } from 'react-native-responsive-fontsize';
import app from "../../firebase"
import { RFValue } from 'react-native-responsive-fontsize';
const db=getFirestore(app)
export default function Radiobutton({navigation}) {
  
  const[radiovalue,setradiovalue]=useState("ICNF")
const[nofqs,setnoqs]=useState(0)

const sendingcat=()=>{
      navigation.navigate("Paper",{cat:radiovalue,qua:nofqs})    
}
    const readingquanity=()=>{
        getDocs(collection(db, "quantity")).then((res)=>{
          const quests=res.docs.map(doc=>({
            data:doc.data(),
            id:doc.id
          }))
          setnoqs(quests[0].data.icnf)
        }).catch((e)=>{
          console.log("error")
        })
    }
    useEffect(()=>{
readingquanity()
    },[radiovalue])
    return (
        <>
    <View style={{width:"90%",height:"100%",paddingHorizontal:RFPercentage(5),display:"flex",justifyContent:"flex-end"}}>
                <TouchableOpacity onPress={sendingcat} style={{backgroundColor:colors.white,padding:RFPercentage(2),borderRadius:5}}>
                    <Text style={{fontSize:RFValue(16),textAlign:"center",color:colors.blue,fontWeight:"bold",fontFamily:"Raleway_400Regular"}}>Iniciar exame</Text>
                </TouchableOpacity>
			</View>
            </>
		);
            }


            const styles = StyleSheet.create({
                container: {
                    marginBottom: RFPercentage(6),
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                },
                radioText: {
                    marginRight: RFPercentage(3),
                    fontSize: RFPercentage(2.2),
                    color: '#000',
                    fontFamily:"Kanit_300Light",
                    display:"flex",
                    flexWrap:"wrap",
                },
                radioCircle: {  
                  height: 30,
                    width: 30,
                    borderRadius: 100,
                    borderWidth: 2,
                    borderColor: colors.blue,
                    alignItems: 'center',
                    justifyContent: 'center',
                },
                selectedRb: {
                    width: 15,
                    height: 15,
                    borderRadius: 50,
                    backgroundColor: colors.blue,
                },
                result: {
                    marginTop: RFPercentage(3),
                    color: 'white',
                    fontWeight: '600',
                    backgroundColor: '#F3FBFE',
                },
            });
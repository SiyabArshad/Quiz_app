import { View, Text, StyleSheet,TouchableOpacity,Image,ActivityIndicator,ScrollView,ImageBackground } from 'react-native'
import * as React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '../utils/colors';
import { StatusBar } from 'react-native'
import {collection,getDocs,getFirestore}  from "firebase/firestore"
import app from "../../firebase"
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
const db=getFirestore(app)
export default function Paper({navigation, route}) {
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
  const category=route.params.cat
   const quantity=route.params.qua  
const scrollref=React.useRef()
   const[loaded,setloaded]=React.useState(true)
  let [result,setresult]=React.useState([])
  const[correct,setcorrect]=React.useState(0)
  const[wrong,setwrong]=React.useState(0)
  const[avg,setavg]=React.useState(0)
  const[allquestion,setallquestion]=React.useState([])
  const[resreq,setresreq]=React.useState(false)
  const[nr,setnr]=React.useState(false)
  const[pass,setpass]=React.useState(false)
  const continueuer=()=>{
    setloaded(true)
    setavg(0)
    setwrong(0)
    setcorrect(0)
    setresreq(false)
    setnr(false)
    setpass(false)
    setresult([])
    navigation.navigate("Paper",{cat:category,qua:quantity})
    
  }
  /**
   * function for abcd
   */
  const optionstyles=(i)=>{
    let op=""
    switch(i){
      case 0:
        op="A"
        break;
      case 1:
        op="B"
        break;
      case 2:
          op="C"
          break;
      case 3:
            op="D"
            break;
      case 4:
          op="E"
          break;
      default:
        op="A"
        break;  
      }
    return op
  }
  /***
   * generating random values from array
   */
   const randomvaluefromarray=(arr,n)=>{
    if(n>=arr.length)
    {
        return arr
    }
    else{
        let res=[];
        let pre=0;
        let rv=[]
        while(res.length!=n)
        {
    
            pre=Math.floor(Math.random() * arr.length)
            
            if(!rv.includes(pre))
            {
                rv.push(pre)
                res.push(arr[pre])
            }
        }
    return res
    }
    }
  /**
   * endng random function
   */
   
  const readingdata=()=>{
    setloaded(true)
    getDocs(collection(db, "questions")).then((res)=>{
      const quests=res.docs.map(doc=>({
        data:doc.data(),
        id:doc.id
      }))
        setallquestion(quests)
        setallquestion(randomvaluefromarray(quests.filter((v)=>v.data.category===category),quantity))
        setloaded(false)//same category data fetching
    }).catch((e)=>{
      
    })
}
const handelchage=(v,i)=>{
  let tempdata=[...result]
  tempdata[i]=v
  setresult(tempdata)
}
 const Renderquestions=({allquestions,ind})=>{
return(
  <>
  <View style={styles.firstch1}>
  <Text style={styles.sfct1}> Questão {ind+1}</Text>
</View>
<Text style={{color:colors.black,fontFamily:"Kanit_300Light",fontSize:RFPercentage(2.3),padding:RFPercentage(1),textAlign:"justify",marginVertical:10,textAlign:"justify"}}>
{
  allquestions.data.question
}
</Text>
{
  allquestions.data.img&&allquestions.data.img!==""?
  <View style={{height:RFPercentage(30),width:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}>
  <Image source={{uri: allquestions.data.img}} style={{ flex: 1,
    width: '50%',
    height: '100%',
    resizeMode: 'contain',}}></Image>
  </View>:<View></View>
}
<View>
    <View style={{backgroundColor:colors.white,padding:RFPercentage(1)}}>
{allquestions.data.options.map((res,i )=> {
    return (
      <View key={i} style={{
        padding:RFPercentage(.5),
        borderRadius:RFPercentage(1.5),
        marginBottom: RFPercentage(1),
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor:resreq?res==allquestions.data.option?colors.sucess:result[ind]==res&&colors.red:colors.white,
        overflow:"hidden"
    }}>
      <View style={{display:"flex",flexDirection:'row'}}>
      <Text style={{marginRight: RFPercentage(2),
        fontSize: RFPercentage(2.5),
        color: colors.blue,
        fontFamily:"Raleway_500Medium"}}
                >
      {
        optionstyles(i)
      })

      </Text>
      <TouchableOpacity
        disabled={resreq}
          style={styles.radioCircle}
          onPress={() => handelchage(res,ind)}
          >
                            {result[ind] === res && <View style={styles.selectedRb} />}
        </TouchableOpacity>
        <Text disabled={resreq} style={styles.radioText}  onPress={() => handelchage(res,ind)}>{res}</Text>  
      </View>

      </View>
    );
  })}
</View>
</View>
</>
)   
 }
 const generateresult=()=>{
  setnr(true) 
  setloaded(true)
  scrollref.current.scrollTo({y:0, animated: true })
  let avg=0
    let gvg=0
  allquestion.map((v,i)=>{
    if(v.data.option===result[i])
    {
      avg++
    }
    else{
      gvg++
    }
  
  })
  setcorrect(avg)
  setwrong(gvg)
  setavg(Math.floor(avg/allquestion.length*100))
  setresreq(true)
  if(avg>=75)
  {
    setpass(true)
  }
  setloaded(false)
 }
 
  React.useEffect(() => {
    setTimeout(() => {
      readingdata()  
    }, 2000);
  }, [route.params]);
  return (
    <SafeAreaView  style={styles.sv}>
     
     {
       loaded || !loadfont ?
      <View style={{ flex:1,display:"flex" , alignItems:"center", justifyContent:"center"}}>
      <ActivityIndicator size="large" color={colors.blue} />
      </View>
      :<>
      <View style={{display:"flex",justifyContent:"center",alignItems:"center",marginVertical:RFPercentage(2)}}>
        <Text style={{color:colors.blue,fontSize:RFPercentage(3),fontFamily:"Raleway_700Bold_Italic"}}>Exame Tipo {category}</Text>
      </View>
      {resreq&&
      <View style={{display:"flex",justifyContent:"center",alignItems:"center",padding:RFPercentage(2),marginTop:RFPercentage(1)}}>
        <View style={{marginTop:RFPercentage(2)}}>
          <Text style={{fontSize:RFPercentage(5),fontFamily:"Raleway_700Bold",color:avg>=75?"green":"red"}}> Resultado: {avg}%</Text>
        </View>
        <View >
          <Text style={{fontSize:RFPercentage(2.2),fontFamily:"Raleway_500Medium",color:"#D3D3D3"}}>É necessário um acerto de 75%</Text>
        </View>
        <View style={{marginTop:RFPercentage(3)}}>
          <Text style={{color:"green",textAlign:"center",fontSize:RFPercentage(2.5),fontFamily:"Raleway_500Medium"}}>Respostas corretas: {correct}</Text>
        </View>
        <View style={{marginBottom:RFPercentage(1)}}>
          <Text style={{color:colors.orange,textAlign:"center",fontSize:RFPercentage(2.5),fontFamily:"Raleway_500Medium"}}>Respostas erradas: {wrong}</Text>
        </View>
      </View>
      }
     
      <ScrollView ref={scrollref}  showsVerticalScrollIndicator={false}>
        {
          allquestion.map((item,ind)=><Renderquestions key={ind} allquestions={item} ind={ind}></Renderquestions>)
        }
      </ScrollView>
      {
        !nr?
            <View style={{display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center",}}>
      <TouchableOpacity onPress={generateresult}  style={{width:"40%",paddingHorizontal:RFPercentage(4),paddingVertical:RFPercentage(1.5),borderRadius:RFPercentage(1),backgroundColor:colors.blue,margin:RFPercentage(1)}}>
  <Text style={{color:colors.white,fontSize:RFPercentage(2),fontFamily:"Raleway_400Regular",textAlign:"center"}}>Terminar</Text>
</TouchableOpacity>
      </View>
      :
      <View style={{display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center",}}>
      <TouchableOpacity onPress={continueuer} style={{width:"40%",paddingHorizontal:RFPercentage(4),paddingVertical:RFPercentage(1.5),borderRadius:RFPercentage(1),backgroundColor:colors.blue,margin:RFPercentage(1)}}>
  <Text style={{color:colors.white,fontFamily:"Raleway_400Regular",fontSize:RFPercentage(2),textAlign:"center"}}>Continuar</Text>
</TouchableOpacity>
{resreq&&<TouchableOpacity onPress={()=>navigation.navigate("Question")} style={{width:"40%",paddingHorizontal:RFPercentage(4),paddingVertical:RFPercentage(1.5),borderRadius:RFPercentage(1),backgroundColor:colors.blue,margin:RFPercentage(1)}}>
  <Text style={{color:colors.white,fontFamily:"Raleway_400Regular",fontSize:RFPercentage(2),textAlign:"center"}}>Menu</Text>
</TouchableOpacity>}

      </View>
      }
      </>
      }
    </SafeAreaView>
  )
}


/**
 * onPress={()=>setnr(true)}
 * {!resreq&&
<TouchableOpacity onPress={generateresult} style={{width:"40%",paddingHorizontal:RFPercentage(4),paddingVertical:RFPercentage(1.5),borderRadius:RFPercentage(1),backgroundColor:colors.blue,margin:RFPercentage(1)}}>
  <Text style={{color:colors.white,fontSize:RFPercentage(2),fontFamily:"Raleway_400Regular",textAlign:"center"}}>Resultado</Text>
</TouchableOpacity>
}
 */
const styles = StyleSheet.create({
      sv: {
        flex: 1,
        backgroundColor:colors.white,
        padding:RFPercentage(1)
      },
      firstch1:{
        flex:1/4,
        backgroundColor:colors.white,
        justifyContent:"flex-start"
        ,marginTop:RFPercentage(2),
        
      },
      sfct1:{
        color:colors.black,fontSize:RFPercentage(3.5),marginBottom:RFPercentage(.5)
        ,fontFamily:"Raleway_500Medium"
      },
      sfct2:{
        color:colors.black,fontSize:50,fontWeight:"300"
      },
      container: {
        marginBottom: RFPercentage(2),
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    radioText: {
        marginHorizontal:RFPercentage(2),
        fontSize: RFPercentage(2.2),
        textAlign:"justify",
        color: '#000',
        fontFamily:"Raleway_400Regular",
        flex:1,
        flexWrap:"wrap"
    },
    radioCircle: {
        height: RFPercentage(3),
        width: RFPercentage(3),
        borderRadius: 100,
        borderWidth: 2,
        marginTop:RFPercentage(.5),
        borderColor: colors.blue,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedRb: {
        width: RFPercentage(1.5),
        height: RFPercentage(1.5),
        borderRadius: 50,
        backgroundColor: colors.blue,
    }  });
import React from 'react';
import {View,Text, Button,ActivityIndicator,Linking,Platform} from 'react-native';

class Covid extends React.Component{

    constructor(props){
        super(props);
        this.state={
            isLoading:true,
            data:{},
        }
        this.loadData = this.loadData.bind(this);
        this.loader = this.loader.bind(this);
    }

    componentDidMount(){
        this.loadData();

    }

    loadData(){
        this.setState({
            isLoading:true,
        });
        fetch('https://hpb.health.gov.lk/api/get-current-statistical',{
            method:"GET"
        }).then((res)=>res.json()).then(data=>{
            this.setState({
                isLoading:false,
                data:data.data
            })
        })
    }


    render(){
        if(this.state.isLoading){
            return this.loader()
        }else{
            return(
                <View style={{padding:20,backgroundColor:'white'}}>
                    <Text style={{fontSize:30,fontWeight:"bold",}}>
                        Covid 19
                    </Text>
                    <View style={{height:20}}>
    
                    </View>
                    <Text style={{fontSize:20,fontWeight:"bold"}}>
                        Are you feeling sick ?
                    </Text>
                    <Text style={{fontSize:18,color:"gray",marginTop:5}}>
                        If you are sick any covid 19 symptems please call or SMS us immediately for help
                    </Text>
    
                    <View style={{flexDirection:"row",justifyContent:"space-evenly",marginTop:15}}>
                        <Button title="Call Now" color="red" onPress={()=>{
                            Linking.openURL(`tel:${+94765474533}`)
                        }}/>
                        <Button title="Send SMS" onPress={()=>{
                            const url = (Platform.OS === 'android')
                            ? 'sms:+94765474533?body=your message'
                            : 'sms:94765474533'
                            Linking.canOpenURL(url).then(supported => {
                              if (!supported) {
                                console.log('Unsupported url: ' + url)
                              } else {
                                return Linking.openURL(url)
                              }
                            }).catch(err => console.error('An error occurred', err))
    
                        }}/>
                    </View>
                    <View style={{marginTop:25,alignItems:"center"}}>
                        <Text style={{fontSize:15,fontWeight:"bold",color:"gray"}}>Last Update {this.state.data.update_date_time}</Text>
                    </View>
    
                    <View style={{marginTop:20,flexDirection:"row"}}>
                        <View style={{marginRight:10,flex:1,backgroundColor:"orange",height:120,justifyContent:"space-between",flexDirection:"column",padding:12,borderRadius:10}}>
                            <Text style={{fontSize:16,fontWeight:"bold",color:"white"}}>Affected</Text>
                
                    <Text style={{fontSize:26,fontWeight:"bold",color:"white"}}>{this.state.data.local_total_cases}</Text>
                        </View>
                        <View style={{flex:1,backgroundColor:"maroon",height:120,justifyContent:"space-between",flexDirection:"column",padding:12,borderRadius:10}}>
                            <Text style={{fontSize:16,fontWeight:"bold",color:"white"}}>Deaths</Text>
                
                            <Text style={{fontSize:26,fontWeight:"bold",color:"white"}}>{this.state.data.local_deaths}</Text>
                        </View>
                        
                    </View>
    
    
                    <View style={{marginTop:10,flexDirection:"row"}}>
                        <View style={{marginRight:10,flex:1,backgroundColor:"#5675E1",height:120,justifyContent:"space-between",flexDirection:"column",padding:12,borderRadius:10}}>
                            <Text style={{fontSize:16,fontWeight:"bold",color:"white"}}>Recovered</Text>
                
                            <Text style={{fontSize:26,fontWeight:"bold",color:"white"}}>{this.state.data.local_recovered}</Text>
                        </View>
                        <View style={{marginRight:10,flex:1,backgroundColor:"#A951D7",height:120,justifyContent:"space-between",flexDirection:"column",padding:12,borderRadius:10}}>
                            <Text style={{fontSize:16,fontWeight:"bold",color:"white"}}>Active</Text>
                
                            <Text style={{fontSize:26,fontWeight:"bold",color:"white"}}>{this.state.data.local_active_cases}</Text>
                        </View>
                        <View style={{flex:1,backgroundColor:"#14BBBA",height:120,justifyContent:"space-between",flexDirection:"column",padding:12,borderRadius:10}}>
                            <Text style={{fontSize:16,fontWeight:"bold",color:"white"}}>Serious</Text>
                
                            <Text style={{fontSize:26,fontWeight:"bold",color:"white"}}>{this.state.data.local_total_number_of_individuals_in_hospitals}</Text>
                        </View>
                        
                    </View>
                </View>
            )
        }
    }

    loader(){
        return(
            <View style={{display:"flex",alignItems:"center",justifyContent:"center",flex:1}}>
                <ActivityIndicator size="large" color="#0000ff"/>
            </View>
        )
    }
}

export default Covid;
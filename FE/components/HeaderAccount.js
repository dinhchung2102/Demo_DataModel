import React, { Component } from "react";
import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import {AntDesign} from '@expo/vector-icons'

export default class HeaderAccount extends Component {
    
  render() {
    const {onPress} = this.props
    return (
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent:'space-between' }}>


        <View style={{ flexDirection: "row", alignItems: "center"}}>
          <Pressable
            onPress={onPress}
            style={{flexDirection:'row', alignItems:'center'}}
          >
            <AntDesign name="left" size={25} color={"grey"} />
            <Text style={{fontWeight:'bold', fontSize: 20}}>Back</Text>
          </Pressable>
        </View>



        <View style={{ flexDirection: "row", alignItems: "center", flex: 1, justifyContent:'flex-end'}}>
          <Pressable >
            <AntDesign name="shoppingcart" color={"grey"} size={30} />
          </Pressable>
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/6596/6596121.png",
            }}
            style={{ width: 50, height: 50 }}
          />
          <Text>Chung</Text>
        </View>


      </View>
    );
  }
}

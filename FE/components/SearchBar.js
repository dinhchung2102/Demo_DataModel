import React, { Component } from 'react'
import { Text, View, Pressable, TextInput} from 'react-native'
import {FontAwesome} from '@expo/vector-icons'

export default class SearchBar extends Component {
  render() {
    return (
        <View style={{flexDirection:'row', width: '95%'}}>
        <View style={{flexDirection:'row', alignItems:'center', backgroundColor:'#E4E4E4', flex: 1, borderRadius: 10, marginRight: 10}}>
          <FontAwesome
            name="search"
            size={28}
            color={"black"}
            style={{ marginLeft: 5, marginRight: 5 }}
          />
          <TextInput placeholder="Search here" style={{ flex: 1, fontSize: 18 }} />
        </View>
        <Pressable style={{justifyContent:'center'}}>
          <FontAwesome name="list-ul" size={30} />
        </Pressable>
      </View>
    )
  }
}

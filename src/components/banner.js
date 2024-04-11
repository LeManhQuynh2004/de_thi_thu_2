import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Banner = ({ uri }) => {
    return (
        <View style = {{width : '100%',alignItems : 'center'}}>
            <Image
                style={{ width: '100%', height: 200,borderRadius : 10}}
                source={
                    {
                        uri: uri
                    }
                }>
            </Image>
        </View>
    )
}

export default Banner

const styles = StyleSheet.create({})
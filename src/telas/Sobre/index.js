import React from "react";
import { ScrollView, Image, View } from "react-native";
import { Video } from 'expo-video'; 

import Texto from '../../componentes/Texto';
import Styles from './estilos';
import videoHamburger from '../../../assets/videoHamburguer.mp4';

export default function Index({ textos }) {
    return (
        <ScrollView style={Styles.sobre}>
            <Image source={textos.logo} style={Styles.logo} resizeMode="contain" />
            <Texto style={Styles.textoSobre}>{textos.historia}</Texto>

            <View style={Styles.videoContainer}>
                <Video
                    source={videoHamburger} 
                    style={Styles.video} 
                    shouldPlay={true} 
                    isLooping={true} 
                    resizeMode="contain"
                    isMuted={true} 
                />
            </View>
        </ScrollView>
    );
}

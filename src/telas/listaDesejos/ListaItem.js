import React from "react"; 
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import Texto from "../../componentes/Texto";

export default function ListaItem({ id, nome, imagem, onToggleFavorite, isFavorite }) {
    return (
        <View style={style.cardContainer}>
            <Card mode='contained'>
                <Card.Cover source={imagem} />
                <Card.Content>
                    <Texto>{nome}</Texto>
                    <TouchableOpacity onPress={() => onToggleFavorite(id)}>
                        <Ionicons
                            name={isFavorite ? "heart" : "heart-outline"}
                            size={24}
                            color={isFavorite ? "red" : "gray"}
                        />
                    </TouchableOpacity>
                </Card.Content>
            </Card>
        </View>
    );
}

const style = StyleSheet.create({
    cardContainer: {
        margin: 8,
        flex: 1,
    },
});

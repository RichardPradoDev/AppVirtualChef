import React, { useState } from 'react';
import { Card, Title, Paragraph } from 'react-native-paper';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Video } from 'expo-av';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Texto from '../componentes/Texto';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProdutosCard({ id, nome, imagem, preco, showVideo, videoSource }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);

    // Função para adicionar o produto ao AsyncStorage
    const saveProductToWishlist = async (product) => {
        try {
            let currentList = await AsyncStorage.getItem("ListaDesejos");
            currentList = currentList ? JSON.parse(currentList) : [];

            // Verifica se o produto já está na lista
            const productExists = currentList.some(item => item.id === product.id);

            if (!productExists) {
                // Adiciona o produto à lista
                currentList.push(product);
                await AsyncStorage.setItem("ListaDesejos", JSON.stringify(currentList));
            } else {
                console.log("Produto já na lista de desejos");
            }
        } catch (error) {
            console.error("Erro ao salvar produto no AsyncStorage", error);
        }
    };

    // Função para remover o produto do AsyncStorage
    const removeProductFromWishlist = async (productId) => {
        try {
            let currentList = await AsyncStorage.getItem("ListaDesejos");
            currentList = currentList ? JSON.parse(currentList) : [];

            // Filtra o produto a ser removido
            currentList = currentList.filter(item => item.id !== productId);
            await AsyncStorage.setItem("ListaDesejos", JSON.stringify(currentList));
        } catch (error) {
            console.error("Erro ao remover produto do AsyncStorage", error);
        }
    };

    const handlePress = () => {
        if (showVideo) {
            setIsPlaying(!isPlaying);
        }
    };

    const handleFavoritePress = async () => {
        setIsFavorite(!isFavorite);  // Alterna o estado de favorito

        const product = { id, nome, imagem, preco };

        if (isFavorite) {
            removeProductFromWishlist(id); // Remove o produto da lista
        } else {
            saveProductToWishlist(product); // Adiciona o produto à lista de desejos
        }
    };

    return (
        <TouchableOpacity onPress={handlePress} style={styles.card}>
            {showVideo && isPlaying ? (
                <Video
                    source={videoSource}
                    style={styles.video}
                    useNativeControls
                    resizeMode="contain"
                    shouldPlay
                    isLooping
                />
            ) : (
                <Card.Cover source={imagem} style={styles.imagem} />
            )}
            <Card.Content>
                <Title style={styles.nome}>{nome}</Title>
                <Paragraph style={styles.preco}>{preco}</Paragraph>
                <TouchableOpacity>
                    <Texto style={styles.detalhes}>Detalhes</Texto>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleFavoritePress}>
                    <Ionicons
                        style={styles.coracao}
                        name='heart'
                        color={isFavorite ? "red" : "#ccc"}
                        size={22}
                    />
                </TouchableOpacity>
            </Card.Content >
        </TouchableOpacity >
    );
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        margin: 8,
        borderRadius: 8,
        backgroundColor: '#fff',
        elevation: 3,
    },
    imagem: {
        height: 175,
        resizeMode: 'contain',
    },
    video: {
        height: 200,
    },
    nome: {
        fontSize: 20,
        marginTop: 8,
    },
    preco: {
        fontSize: 18,
        color: '#888',
        marginTop: 4,
    },
    detalhes: {
        fontSize: 18,
        marginTop: 12,
        backgroundColor: "red",
        width: 85,
        textAlign: "center",
    },
    coracao: {
        fontSize: 18,
        marginTop: 3,
    },
});

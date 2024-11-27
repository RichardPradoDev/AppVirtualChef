import React from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import ProdutosCard from '../../componentes/produtosCard.js';
import produtos from '../../mocks/produto.js';
import videoHamburger from '../../../assets/videoHamburguer.mp4';

export default function Produtos() {
    const renderItem = ({ item }) => {
        const showVideo = item.id === "9";
        return (
            <ProdutosCard
                id={item.id} // Passando o id do produto
                nome={item.nome}
                imagem={item.imagem}
                preco={item.preco}
                showVideo={showVideo}
                videoSource={showVideo ? videoHamburger : null}
            />
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.tituloContainer}>
                <Text style={styles.titulo}>Veja nossos produtos</Text>
            </View>
            <FlatList
                data={produtos}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                numColumns={2}
                contentContainerStyle={styles.flatListContent}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F2',
    },
    flatListContent: {
        padding: 16,
    },
    titulo: {
        textTransform: 'uppercase',
        fontSize: 22,
        marginTop: 45,
        alignItems: 'center',
        textAlign: 'center',
        marginBottom: 4,
    },
});

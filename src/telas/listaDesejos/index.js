import React, { useEffect, useState } from "react";
import { StyleSheet, StatusBar, FlatList, SafeAreaView, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';

import Texto from "../../componentes/Texto";
import ListaItem from '../listaDesejos/ListaItem';
import Botao from '../../componentes/Botao';

export default function Index() {
    const navigation = useNavigation();
    const [listData, setListData] = useState([]);

    // Capturar os dados do AsyncStorage
    const loadListData = async () => {
        const storeObjectJSON = await AsyncStorage.getItem("ListaDesejos");
        if (storeObjectJSON !== null) {
            const storeObject = JSON.parse(storeObjectJSON);
            setListData(storeObject);
        }
    };

    // Busca a lista de desejos quando montar o componente
    useEffect(() => {
        loadListData();
    }, []);

    // Função para limpar a lista de desejos
    const clearAsyncStorage = async () => {
        await AsyncStorage.clear();
        console.log("AsyncStorage apagado");
        Alert.alert("Lista de Desejos excluída com sucesso!");
        navigation.reset({
            index: 0,
            routes: [{ name: 'Lista de Desejos' }]
        });
    };

    // Função para alternar o produto na lista de desejos
    const handleToggleFavorite = (productId) => {
        // Remover ou adicionar produto conforme necessário
        const updatedList = listData.filter(item => item.id !== productId);
        setListData(updatedList);
        AsyncStorage.setItem("ListaDesejos", JSON.stringify(updatedList));
    };

    return (
        <SafeAreaView style={styles.ListaContainer}>
            <StatusBar />
            <Texto>Lista de Desejos</Texto>
            <Texto>Estes são os produtos adicionados na sua Lista de Desejos</Texto>
            <FlatList
                data={listData}
                renderItem={({ item }) => (
                    <ListaItem
                        {...item}
                        onToggleFavorite={handleToggleFavorite}
                        isFavorite={true} // Todos os itens aqui são favoritos
                    />
                )}
                keyExtractor={({ id }) => String(id)}
                numColumns={2}
            />
            <Botao textoBotao={"Apagar Lista de Desejos"} acaoBotao={clearAsyncStorage} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    ListaContainer: {
        flex: 1,
        padding: 16,
    },
});

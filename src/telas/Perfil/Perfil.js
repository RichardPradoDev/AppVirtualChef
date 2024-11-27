import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ScrollView, 
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Botao from "../../../src/componentes/Botao";
import axios from 'axios'; 

const Perfil = () => {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");
    const [senha, setSenha] = useState("");
    const [cep, setCep] = useState(""); 
    const [rua, setRua] = useState(""); 
    const [bairro, setBairro] = useState(""); 
    const [cidade, setCidade] = useState(""); 
    const [estado, setEstado] = useState(""); 
    const [numero, setNumero] = useState(""); 
    const [imagem, setImagem] = useState(null);

    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== 'granted') {
                alert('Desculpe, precisamos de permissões para acessar a câmera.');
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true, 
            aspect: [4, 3], 
            quality: 1, 
            showsCameraControls: true, 
        });

        console.log(result); 

        if (!result.canceled) {
            setImagem(result.assets[0].uri);
        } else {
            Alert.alert("Erro", "Não foi possível capturar a imagem.");
        }
    };

    // Função para buscar endereço com o CEP
    const buscarEndereco = async (cep) => {
        try {
            const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
            if (response.data.erro) {
                Alert.alert("Erro", "CEP não encontrado.");
            } else {
                const { logradouro, bairro, localidade, uf } = response.data;
                setRua(logradouro);
                setBairro(bairro);
                setCidade(localidade);
                setEstado(uf);
            }
        } catch (error) {
            Alert.alert("Erro", "Erro ao buscar o endereço.");
        }
    };

    // Função de validação antes de salvar
    const validarCampos = () => {
        if (!nome || !email || !telefone || !senha || !cep || !numero) {
            Alert.alert("Erro", "Todos os campos devem ser preenchidos.");
            return false;
        }
        if (!imagem) {
            Alert.alert("Erro", "Por favor, adicione uma foto.");
            return false;
        }
        return true;
    };

    const handleSave = () => {
        if (validarCampos()) {

            setNome("");
            setEmail("");
            setTelefone("");
            setSenha("");
            setCep("");
            setNumero("");
            setRua("");
            setBairro("");
            setCidade("");
            setEstado("");
            setImagem(null);

            Alert.alert("Informação", "As informações foram salvas com sucesso.");
        }
    };

    return (
        <ScrollView 
            contentContainerStyle={styles.scrollViewContainer} 
            keyboardShouldPersistTaps="handled"
        >
            <TouchableOpacity onPress={pickImage} style={styles.imageWrapper}>
                {imagem ? (
                    <Image source={{ uri: imagem }} style={styles.image} />
                ) : (
                    <Text style={styles.placeholderText}>Foto</Text>
                )}
            </TouchableOpacity>
            <TextInput
                placeholder="Nome"
                value={nome}
                onChangeText={setNome}
                style={styles.input}
            />
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
            />
            <TextInput
                placeholder="Telefone"
                value={telefone}
                onChangeText={setTelefone}
                style={styles.input}
                keyboardType="numeric"
            />
            <TextInput
                placeholder="Senha"
                value={senha}
                onChangeText={setSenha}
                secureTextEntry
                style={styles.input}
            />
            <TextInput
                placeholder="CEP"
                value={cep}
                onChangeText={setCep}
                style={styles.input}
                keyboardType="numeric"
                maxLength={8}
                onBlur={() => {
                    if (cep.length === 8) {
                        buscarEndereco(cep); 
                    }
                }}
            />
            <TextInput
                placeholder="Rua"
                value={rua}
                onChangeText={setRua}
                style={styles.input}
                editable={false} 
            />
            <TextInput
                placeholder="Bairro"
                value={bairro}
                onChangeText={setBairro}
                style={styles.input}
                editable={false} 
            />
            <TextInput
                placeholder="Cidade"
                value={cidade}
                onChangeText={setCidade}
                style={styles.input}
                editable={false} 
            />
            <TextInput
                placeholder="Estado"
                value={estado}
                onChangeText={setEstado}
                style={styles.input}
                editable={false} 
            />
            <TextInput
                placeholder="Número"
                value={numero}
                onChangeText={setNumero}
                style={styles.input}
                keyboardType="numeric"
            />
            <Botao textoBotao="Salvar" acaoBotao={handleSave} style={styles.button} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollViewContainer: {
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        backgroundColor: "#E9E3D5",
    },
    imageWrapper: {
        width: 150,
        height: 150,
        borderRadius: 60,
        marginBottom: 20,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        borderColor: "black",
        borderWidth: 2,
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 75,
    },
    placeholderText: {
        fontSize: 35,
        color: "black",
    },
    input: {
        width: "100%",
        height: 55,
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginBottom: 15,
        backgroundColor: "#fff",
        fontSize: 16,
    },
    button: {
        width: "100%",
        padding: 15,
        borderRadius: 10,
        backgroundColor: "#000",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
    },
});

export default Perfil;

import React from "react";
import { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Picker,
} from "react-native";
import styles from "./style";
import DateTimePicker from "@react-native-community/datetimepicker";

const icons = {
  "pessoal.png": require("../../../assets/pessoal.png"),
  "educacao.png": require("../../../assets/educacao.png"),
  "pessoal.png": require("../../../assets/pessoal.png"),
  "refeicao.png": require("../../../assets/refeicao.png"),
  "saude.png": require("../../../assets/saude.png"),
  "transporte.png": require("../../../assets/transporte.png"),
};

export default function Home() {
  const [modalReceitaVisible, setModalReceitaVisible] = useState(false);
  const [modalGastoVisible, setModalGastoVisible] = useState(false);
  const [tipoReceita, setTipoReceita] = useState("salario");
  const [data, setData] = useState(new Date());

    // Form state
  const [icon, setIcon] = useState('');
  const [tipo, setTipo] = useState('');
  const [valor, setValor] = useState('');
  const [status, setStatus] = useState('');

  const handleDateChange = (text) => {
    const [day, month, year] = text.split("/");
    const newDate = new Date(`${year}-${month}-${day}`);
    if (!isNaN(newDate)) {
      setData(newDate);
    } else {
      alert('Data deve estar no formato DD/MM/YYYY');
      return;
    }
  };
}

 function adicionarItem () {
      if (!valor || !tipo || !data) {
      alert('Preencha todos os campos!');
      return;
    }


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <View style={styles.perfil}>
          <Image
            source={require("../../../assets/pessoal.png")}
            style={styles.iconPerfil}
          />
          <Text style={styles.texto}>Olá, Usuário</Text>
        </View>
        <View style={styles.icones}>
          <Image
            source={require("../../../assets/interrogacao.png")}
            style={styles.icon}
          />
          <Image
            source={require("../../../assets/olhofechado.png")}
            style={styles.icon}
          />
          <Image
            source={require("../../../assets/mensagem.png")}
            style={styles.icon}
          />
        </View>
        <Image
          source={require("../../../assets/nu.png")}
          style={styles.iconNu}
        />
      </View>

      <View style={styles.saldoContainer}>
        <Text style={styles.saldoTitulo}>Saldo</Text>
        <Text style={styles.saldoValor}>R$ 10.000,00</Text>
      </View>

      <View style={styles.linhaDivisoria} />

      <View style={styles.graficosContainer}>
        <View style={styles.graficoGanho}>
          <Image
            source={require("../../../assets/ganho.png")}
            style={styles.grafico}
          />
          <Text style={styles.saldoGanho}>R$ 12.000,00</Text>
        </View>
        
        <View style={styles.graficoGasto}>
          <Image
          source={require("../../../assets/gasto.png")}
          style={styles.grafico}
          />
          <Text style={styles.saldoGasto}>R$ 2.415,00</Text>
        </View>
        
      </View>

      <View style={styles.extratoContainer}>
        <Text style={styles.extratoTitulo}>Extrato</Text>

        {[
          {
            icon: "pessoal.png",
            tipo: "Salário",
            valor: "+ R$ 5.000,00",
            status: "Recebido",
          },
          {
            icon: "educacao.png",
            tipo: "Faculdade",
            valor: "- R$ 2.000,00",
            status: "Pago",
          },
          {
            icon: "pessoal.png",
            tipo: "PIX",
            valor: "+ R$ 7.000,00",
            status: "Recebido",
          },
          {
            icon: "refeicao.png",
            tipo: "Refeição",
            valor: "- R$ 150,00",
            status: "Pago",
          },
          {
            icon: "saude.png",
            tipo: "Saúde",
            valor: "-R$ 250,00",
            status: "Pago",
          },
          {
            icon: "transporte.png",
            tipo: "Uber",
            valor: 15.00,
            status: "Pago",
          },
        ].map((item, index) => (
          <View key={index} style={styles.linhaExtrato}>
            <View style={styles.tipoIcone}>
              <Image source={icons[item.icon]} style={styles.iconeExtrato} />

              <Text style={styles.extratoLabel}>{item.tipo}</Text>
            </View>

            <View style={styles.infoExtrato}>
              <Text
                style={
                  item.valor <0
                    ? styles.valorRecebido
                    : styles.valorPago
                }
              >
                {item.valor}
              </Text>
              <Text style={styles.tipoExtrato}>{item.status}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.botoesContainer}>
        <TouchableOpacity
          style={styles.botao}
          onPress={() => setModalReceitaVisible(true)}
        >
          <Text style={styles.botaoTexto}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.botao}
          onPress={() => setModalGastoVisible(true)}
        >
          <Text style={styles.botaoTexto}>-</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={modalGastoVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitulo}>Adicionar Gasto</Text>
            <Text style={styles.labelInput}>Valor gasto:</Text>
            <TextInput
              style={styles.input}
              placeholder="Valor"
              value={valor}
              keyboardType="numeric"
              onChangeText={setValor}
            />
            <Text style={styles.labelInput}>Selecione o tipo:</Text>
            <Picker
              selectedValue={tipoGasto}
              onValueChange={(itemValue, itemIndex) => setTipo(itemValue)}
              style={styles.input}
            >
              <Picker.Item label="Refeição" value="refeicao" />
              <Picker.Item label="Saúde" value="saude" />
              <Picker.Item label="Transporte" value="transporte" />
              <Picker.Item label="Educação" value="educacao" />
              <Picker.Item label="Lazer" value="lazer" />
              <Picker.Item label="Mercado" value="mercado" />
              <Picker.Item label="Vestuário" value="vestuario" />
              <Picker.Item label="Serviços" value="servicos" />
              <Picker.Item label="Pessoal" value="pessoal" />
              <Picker.Item label="Outros" value="outros" />
            </Picker>
            <Text style={styles.labelInput}>Data:</Text>
            <TextInput
              style={styles.input}
              placeholder="DD/MM/AAAA"
              onChangeText={handleDateChange}
              defaultValue={data.toLocaleDateString()}
            />
            <TouchableOpacity
              style={styles.modalBotao}
              onPress={() => setModalGastoVisible(false)}
            >
              <Text style={styles.modalBotaoTexto}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={modalReceitaVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitulo}>Adicionar Receita</Text>
            <Text style={styles.labelInput}>Valor ganho:</Text>
            <TextInput
              style={styles.input}
              placeholder="Valor"
              keyboardType="numeric"
            />
            <Text style={styles.labelInput}>Selecione o tipo:</Text>
            <Picker
              selectedValue={tipoReceita}
              onValueChange={(itemValue, itemIndex) => setTipo(itemValue)}
              style={styles.input}
            >
              <Picker.Item label="Salário" value="salario" />
              <Picker.Item label="PIX" value="pix" />
              <Picker.Item label="Venda" value="venda" />
              <Picker.Item label="Rendimento" value="rendimento" />
              <Picker.Item label="Investimento" value="investimento" />
              <Picker.Item label="Freelance" value="freelance" />
              <Picker.Item label="Outros" value="outros" />
            </Picker>
            <Text style={styles.labelInput}>Data:</Text>
            <TextInput
              style={styles.input}
              placeholder="DD/MM/AAAA"
              onChangeText={handleDateChange}
              defaultValue={data.toLocaleDateString()}
            />
            <TouchableOpacity
              style={styles.modalBotao}
              onPress={() => setModalReceitaVisible(false)}
            >
              <Text style={styles.modalBotaoTexto}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

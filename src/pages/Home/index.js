
import { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Picker,
  Pressable,
} from "react-native";
import styles from "./style";
import AsyncStorage from "@react-native-async-storage/async-storage";

const icons = {
  "pessoal.png": require("../../../assets/pessoal.png"),
  "educacao.png": require("../../../assets/educacao.png"),
  "lazer.png": require("../../../assets/lazer.png"),
  "refeicao.png": require("../../../assets/refeicao.png"),
  "saude.png": require("../../../assets/saude.png"),
  "transporte.png": require("../../../assets/transporte.png"),
  "servicos.png": require("../../../assets/servicos.png"),
  "vestuario.png": require("../../../assets/vestuario.png"),
  "mercado.png": require("../../../assets/mercado.png"),
  "pix.png": require("../../../assets/pix.png"),
  "salario.png": require("../../../assets/pessoal.png"),
  "outros.png": require("../../../assets/outros.png"),
};

export default function Home() {
  const [modalReceitaVisible, setModalReceitaVisible] = useState(false);
  const [modalGastoVisible, setModalGastoVisible] = useState(false);
  const [tipoReceita, setTipoReceita] = useState("salario");
  const [tipoGasto, setTipoGasto] = useState("refeicao");
  const [data, setData] = useState("");
  const [valor, setValor] = useState("");

  const [extrato, setExtrato] = useState([]);
  const [saldo, setSaldo] = useState(0);
  const [totalGanhos, setTotalGanhos] = useState(0);
  const [totalGastos, setTotalGastos] = useState(0);

  useEffect(() => {
    const carregarExtratoSalvo = async () => {
      try {
        const dadosSalvos = await AsyncStorage.getItem("extrato");
        if (dadosSalvos !== null) {
          setExtrato(JSON.parse(dadosSalvos));
        }
      } catch (e) {
        alert("Erro ao carregar dados do AsyncStorage", e);
      }
    };

    carregarExtratoSalvo();
  }, []);

  useEffect(() => {
    const salvarExtrato = async () => {
      try {
        await AsyncStorage.setItem("extrato", JSON.stringify(extrato));
      } catch (e) {
        console.log("Erro ao salvar extrato no AsyncStorage", e);
      }
    };

    if (extrato.length > 0) {
      salvarExtrato();
    }
  }, [extrato]);

  useEffect(() => {
    let ganhos = 0;
    let gastos = 0;

    extrato.forEach((item) => {
      const valorSaldo = parseFloat(
        item.valor.replace(/[^\d,-]/g, "").replace(",", ".")
      );
      if (item.valor.startsWith("+")) {
        ganhos += valorSaldo;
      } else if (item.valor.startsWith("-")) {
        gastos -= valorSaldo;
      }
    });

    setTotalGanhos(ganhos);
    setTotalGastos(gastos);
    setSaldo(ganhos - gastos);
  }, [extrato]);

  const limparExtrato = async () => {
    await AsyncStorage.removeItem("extrato");
    setExtrato([]);
    alert("Extrato apagado com sucesso!");
  }

  function validarEFormatarData(data) {
    const partesData = data.split("/");
    if (partesData.length !== 3) {
      alert("Data deve estar no formato DD/MM/YYYY");
      return null;
    }

    const [dia, mes, ano] = partesData;
    const dataISO = `${ano}-${mes}-${dia}T12:00:00`;

    if (isNaN(new Date(dataISO))) {
      alert("Data inválida!");
      return null;
    }

    return dataISO;
  }

  const adicionarGasto = () => {
    if (!valor || !tipoGasto || !data) {
      alert("Preencha todos os campos!");
      return;
    }

    const newDate = validarEFormatarData(data);
    if (!newDate) return;

    const novoItem = {
      icon: `${tipoGasto}.png`,
      tipo: tipoGasto.charAt(0).toUpperCase() + tipoGasto.slice(1),
      valor: `- R$ ${parseFloat(valor).toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
      })}`,
      status: "Pago",
      data: newDate
    };

    setExtrato((extratoAtual) => [novoItem, ...extratoAtual].sort((a, b) => new Date(b.data) - new Date(a.data)));
    setModalGastoVisible(false);
    setValor("");
    setTipoGasto("");
    setData("");
  };

  const adicionarReceita = async () => {
    if (!valor || !tipoReceita || !data) {
      alert("Preencha todos os campos!");
      return;
    }

    const newDate = validarEFormatarData(data);
    if (!newDate) return;

    const novoItem = {
      icon: `${tipoReceita}.png`,
      tipo: tipoReceita.charAt(0).toUpperCase() + tipoReceita.slice(1),
      valor: `+ R$ ${parseFloat(valor).toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
      })}`,
      status: "Recebido",
      data: newDate,
    };

    setExtrato((extratoAtual) => [novoItem, ...extratoAtual].sort((a, b) => new Date(b.data) - new Date(a.data)));
    setModalReceitaVisible(false);
    setValor("");
    setTipoReceita("");
    setData("");
  };

  return (
    <View style={styles.container}>
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
        <Pressable style={styles.btnExcluir}
          onPress={limparExtrato}>
          <Image style={styles.excluirIcone}
            source={require("../../../assets/excluir.png")}>
          </Image>
        </Pressable>

        <Text style={styles.saldoTitulo}>Saldo</Text>
        <Text style={styles.saldoValor}>
          R$ {saldo.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
        </Text>
      </View>

      <View style={styles.linhaDivisoria} />

      <View style={styles.graficosContainer}>
        <View style={styles.graficoGanho}>
          <Image
            source={require("../../../assets/ganho.png")}
            style={styles.grafico}
          />
          <Text style={styles.saldoGanho}>
            R${" "}
            {totalGanhos.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </Text>
        </View>

        <View style={styles.graficoGasto}>
          <Image
            source={require("../../../assets/gasto.png")}
            style={styles.grafico}
          />
          <Text style={styles.saldoGasto}>
            R${" "}
            {totalGastos.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.extratoContainer}>
        <Text style={styles.extratoTitulo}>Extrato</Text>

        {[
          ...extrato,

          {
            icon: "pessoal.png",
            tipo: "Salário",
            valor: "+ R$ 5.000,00",
            status: "Recebido",
            data: "2023-10-01T12:00:00",
          },
          {
            icon: "educacao.png",
            tipo: "Faculdade",
            valor: "- R$ 2.000,00",
            status: "Pago",
            data: "2023-10-02T12:00:00",
          },
          {
            icon: "pix.png",
            tipo: "PIX",
            valor: "+ R$ 7.000,00",
            status: "Recebido",
            data: "2023-10-03T12:00:00",
          },
          {
            icon: "refeicao.png",
            tipo: "Refeição",
            valor: "- R$ 150,00",
            status: "Pago",
            data: "2023-10-04T12:00:00",
          },
          {
            icon: "saude.png",
            tipo: "Saúde",
            valor: "- R$ 250,00",
            status: "Pago",
            data: "2023-10-05T12:00:00",
          },
          {
            icon: "transporte.png",
            tipo: "Uber",
            valor: "-R$ 15,00",
            status: "Pago",
            data: "2023-10-06T12:00:00",
          },
        ].map((item, index) => (
          <View key={index} style={styles.linhaExtrato}>
            <View style={styles.tipoIcone}>
              <Image source={icons[item.icon]} style={styles.iconeExtrato} />

              <Text style={styles.extratoLabel}>{item.tipo}</Text>
            </View>

            <View style={styles.infoExtrato}>
              <Text style={styles.extratoData}>{new Date(item.data).toLocaleDateString("pt-BR")}</Text>
              <Text
                style={
                  item.status === "Recebido"
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
      </ScrollView>

      <View style={styles.botoesContainer}>
        <Pressable
          style={styles.botao}
          onPress={() => setModalReceitaVisible(true)}
        >
          <Image
            source={require("../../../assets/mais.png")}
            style={styles.iconeBotao}
          />
        </Pressable>
        <Pressable
          style={styles.botao}
          onPress={() => setModalGastoVisible(true)}
        >
          <Image
            source={require("../../../assets/menos.png")}
            style={styles.iconeBotao}
          />
        </Pressable>
      </View>

      <Modal visible={modalGastoVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Pressable
              onPress={() => setModalGastoVisible(false)}
              style={styles.fechar}
            >
              <Image
                source={require("../../../assets/fechar.png")}
                style={styles.iconeFechar}
              />
            </Pressable>
            <Text style={styles.modalTitulo}>Adicionar Gasto</Text>
            <Text style={styles.labelInput}>Valor gasto:</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite apenas números"
              value={valor}
              keyboardType="numeric"
              onChangeText={setValor}
            />
            <Text style={styles.labelInput}>Selecione o tipo:</Text>
            <Picker
              selectedValue={tipoGasto}
              onValueChange={(itemValue, itemIndex) => setTipoGasto(itemValue)}
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
              placeholder="DD/MM/YYYY"
              value={data}
              onChangeText={setData}
            />
            <Pressable style={styles.modalBotao} onPress={adicionarGasto}>
              <Text style={styles.modalBotaoTexto}>Salvar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal visible={modalReceitaVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Pressable
              onPress={() => setModalReceitaVisible(false)}
              style={styles.fechar}
            >
              <Image
                source={require("../../../assets/fechar.png")}
                style={styles.iconeFechar}
              />
            </Pressable>

            <Text style={styles.modalTitulo}>Adicionar Receita</Text>
            <Text style={styles.labelInput}>Valor ganho:</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite apenas números"
              keyboardType="numeric"
              value={valor}
              onChangeText={setValor}
            />
            <Text style={styles.labelInput}>Selecione o tipo:</Text>
            <Picker
              selectedValue={tipoReceita}
              onValueChange={(itemValue, itemIndex) =>
                setTipoReceita(itemValue)
              }
              style={styles.input}
            >
              <Picker.Item label="Salário" value="salario" />
              <Picker.Item label="PIX" value="pix" />
              <Picker.Item label="Outros" value="outros" />
            </Picker>
            <Text style={styles.labelInput}>Data:</Text>
            <TextInput
              style={styles.input}
              placeholder="DD/MM/YYYY"
              value={data}
              onChangeText={setData}
            />
            <TouchableOpacity
              style={styles.modalBotao}
              onPress={adicionarReceita}
            >
              <Text style={styles.modalBotaoTexto}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

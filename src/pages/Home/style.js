import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 130,
    backgroundColor: "#fff",
    alignItems: "center",
  },

  header: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: 150,
    backgroundColor: "#880cd4",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 20,
  },

  perfil: {
    flexDirection: "column",
    alignItems: "center",
  },

  iconPerfil: {
    width: 80,
    height: 80,
  },

  texto: {
    color: "#fff",
    fontSize: 16,
    marginTop: 8,
  },

  icones: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  icon: {
    width: 40,
    height: 40,
    marginHorizontal: 5,
  },

  iconNu: {
    width: 40,
    height: 40,
    position: "absolute",
    right: 10,
    top: 110,
  },

  saldoContainer: {
    width: "100%",
    alignItems: "flex-start",
    marginLeft: 40,
    marginTop: 10,
  },

  saldoTitulo: {
    fontSize: 18,
    marginTop: 20,
  },

  saldoValor: {
    fontSize: 20,
    fontWeight: "bold",
    backgroundColor: "#f2f2f2",
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
  },

  linhaDivisoria: {
    width: "90%",
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 10,
  },

  graficosContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 40,
    marginBottom: 10,
  },

  grafico: {
    width: 60,
    height: 60,
    paddingHorizontal: 60,
  },

  graficoGanho: {
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },

  saldoGanho: {
    color: "green",
    fontWeight: "bold",
  },

  graficoGasto: {
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },

  saldoGasto: {
    color: "red",
    fontWeight: "bold",
  },

  extratoContainer: {
    width: "90%",
    backgroundColor: "#f5f5f5",
    borderRadius: 15,
    padding: 15,
    marginBottom: 30,
  },

  extratoTitulo: {
    fontSize: 18,
    marginBottom: 10,
  },

  linhaExtrato: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },

  iconeExtrato: {
    width: 40,
    height: 40,
  },

  infoExtrato: {
    alignItems: "flex-start",
  },

  tipoIcone: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },

  extratoLabel: {
    fontSize: 12,
    fontWeight: "600",
  },

  valorRecebido: {
    color: "green",
    fontWeight: "bold",
  },

  valorPago: {
    color: "red",
    fontWeight: "bold",
  },

  tipoExtrato: {
    fontSize: 12,
    color: "#666",
    alignSelf: "flex-end",
  },

  botoesContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 30,
    bottom: 20,
  },

  iconeBotao: {
    width: 60,
    height: 60,
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },

  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },

  fechar: {
    position: "absolute",
    top: 10,
    right: 2,
    padding: 10,
  },

  iconeFechar: {
    width: 30,
    height: 30,
  },

  modalTitulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },

  labelInput: {
    fontSize: 16,
    alignSelf: "flex-start",
    marginBottom: 10,
    color: "#333",
  },

  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },

  modalBotao: {
    backgroundColor: "#880cd4",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
  },

  modalBotaoTexto: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

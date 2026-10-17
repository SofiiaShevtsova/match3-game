import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 18,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    width: "80%",
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    width: 250,
  },
  buttonDisabled: {
    backgroundColor: "gray",
    padding: 10,
    borderRadius: 5,
    width: 250,
  },
  iconBtn: {
    backgroundColor: "gray",
    padding: 1,
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  iconBtnActive: {
    backgroundColor: "blue",
    padding: 1,
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

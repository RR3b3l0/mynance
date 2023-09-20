import React, { useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";

const InformationForm = ({
  onRegister,
}: {
  onRegister: ({
    name,
    balance,
  }: {
    name: string;
    balance: number | null;
  }) => void;
}) => {
  const [name, setName] = useState("");
  const [balance, setBalance] = useState<number | null>(null);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={name}
        placeholder={"Name"}
        autoCapitalize={"none"}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        value={balance?.toString()}
        placeholder={"Current account balance"}
        onChangeText={(number) => {
          const regex = /^-?\d+(\.\d*)?$/;

          if (regex.test(number) || number === "") {
            // If the input matches the numeric pattern or is empty, update the state
            setBalance(parseFloat(number));
          }
        }}
        keyboardType="numeric"
        inputMode="numeric"
        autoCapitalize={"none"}
      />
      <Button
        disabled={!balance || !name}
        title={"Register information"}
        onPress={() => onRegister({ name, balance })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 500,
    backgroundColor: "gray",
    padding: 20,
    borderRadius: 10,
  },
  input: {
    height: 40,
    marginBottom: 10,
    backgroundColor: "#fff",
    padding: 20,
  },
});

export default InformationForm;

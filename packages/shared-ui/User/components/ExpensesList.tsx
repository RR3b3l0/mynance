import React, { useState } from "react";
import { Button, StyleSheet, TextInput, View, Text } from "react-native";
import { Expense, Movement } from "../types";

const UserDetail = ({
  expenses,
  onAddExpense,
  onDeleteExpense,
}: {
  expenses: Expense[];
  onAddExpense: (name: string, amount: number, description: string) => void;
  onDeleteExpense: (expenseId: number) => void;
}) => {
  const [addExpenses, setAddExpenses] = useState(false);
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState<number | null>(null);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>EXPENSES</Text>
        <Button
          title={"Add Expense"}
          onPress={() => setAddExpenses(!addExpenses)}
        />
      </View>
      {addExpenses ? (
        <View>
          <TextInput
            style={styles.input}
            value={name}
            placeholder={"Name"}
            autoCapitalize={"none"}
            onChangeText={(text) => setName(text)}
          />
          <TextInput
            style={styles.input}
            value={description}
            placeholder={"Description"}
            autoCapitalize={"none"}
            onChangeText={(text) => setDescription(text)}
          />
          <TextInput
            style={styles.input}
            value={amount?.toString()}
            placeholder={"Amount"}
            onChangeText={(number) => {
              const regex = /^-?\d+(\.\d*)?$/;

              if (regex.test(number) || number === "") {
                // If the input matches the numeric pattern or is empty, update the state
                setAmount(parseFloat(number));
              }
            }}
            keyboardType="numeric"
            inputMode="numeric"
            autoCapitalize={"none"}
          />
          <Button
            title={"Add"}
            onPress={() => {
              setAddExpenses(false);
              setDescription("");
              setAmount(null);
              setName("");
              if (name && amount && description) {
                onAddExpense(name, amount, description);
              }
            }}
          />
        </View>
      ) : (
        <View style={styles.items}>
          <View style={styles.itemContainer}>
            <Text>Name</Text>
            <Text>Description</Text>
            <Text>Amount</Text>
            <Text>Actions</Text>
          </View>
          {expenses.map((expense) => (
            <View
              style={[
                styles.itemContainer,
                { backgroundColor: "white", borderRadius: 10 },
              ]}
            >
              <Text>{expense.name}</Text>
              <Text>{expense.description}</Text>
              <Text>{expense.amount}</Text>
              <Button
                title={"Delete"}
                onPress={() => {
                  onDeleteExpense(expense.id);
                }}
              />
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 480,
    backgroundColor: "#50858B",
    margin: 10,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 20,
    paddingLeft: 20,
    color: "white",
  },
  input: {
    height: 40,
    marginBottom: 10,
    backgroundColor: "#fff",
    padding: 20,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    margin: 5,
    alignItems: "center",
  },
  items: {
    margin: 10,
  },
});

export default UserDetail;

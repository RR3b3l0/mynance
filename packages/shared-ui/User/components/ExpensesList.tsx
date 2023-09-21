import React, { useState } from "react";
import { Button, StyleSheet, TextInput, View, Text } from "react-native";
import { Expense, Movement } from "../types";
import { addExpense, deleteExpense } from "../../api";

const UserDetail = ({
  refreshData,
  id,
  expenses,
}: {
  refreshData: () => void;
  id: string;
  expenses: Expense[];
}) => {
  const [openAddExpenses, setOpenAddExpenses] = useState(false);
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState<number | null>(null);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>EXPENSES</Text>
        <Button
          title={"Add Expense"}
          onPress={() => setOpenAddExpenses(!openAddExpenses)}
        />
      </View>
      {openAddExpenses ? (
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
            inputMode="numeric"
            autoCapitalize={"none"}
          />
          <Button
            title={"Add"}
            onPress={async () => {
              setOpenAddExpenses(false);
              setDescription("");
              setAmount(null);
              setName("");
              if (name && amount && description) {
                await addExpense(id, name, amount, description, refreshData);
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
              key={`expense_${expense.id}`}
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
                onPress={async () => {
                  await deleteExpense(id, expense.id, refreshData);
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
    paddingLeft: 10,
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

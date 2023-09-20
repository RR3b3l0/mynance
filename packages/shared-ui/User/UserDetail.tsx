import React from "react";
import { Button, StyleSheet, TextInput, View, Text } from "react-native";
import { UserInfo } from "./types";
import MovementList from "./components/MovementList";
import ExpensesList from "./components/ExpensesList";

const UserDetail = ({
  user,
  onAddMovement,
  onDeleteMovement,
  onAddExpense,
  onDeleteExpense,
}: {
  user: UserInfo;
  onAddMovement: (amount: number, description: string) => void;
  onDeleteMovement: (movementId: number) => void;
  onAddExpense: (name: string, amount: number, description: string) => void;
  onDeleteExpense: (expenseId: number) => void;
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>USER INFO</Text>
      <Text style={styles.name}>NAME: {user.name}</Text>
      <View style={styles.row}>
        <View style={styles.circle}>
          <Text>BALANCE</Text>
          <Text>{user.balance}€</Text>
        </View>
        <View style={styles.circle}>
          <Text>EXPENSES</Text>
          <Text>{user.totalExpenses}€</Text>
        </View>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <MovementList
          movements={user.movements ?? []}
          onAddMovement={onAddMovement}
          onDeleteMovement={onDeleteMovement}
        />
        <ExpensesList
          expenses={user.expenses ?? []}
          onAddExpense={onAddExpense}
          onDeleteExpense={onDeleteExpense}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 1000,
    backgroundColor: "#A1D2CE",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    color: "white",
    fontSize: 70,
  },
  row: {
    flexDirection: "row",
  },
  name: {
    fontSize: 20,
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    backgroundColor: "gray",
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
  },
});

export default UserDetail;

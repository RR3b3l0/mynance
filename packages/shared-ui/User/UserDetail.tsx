import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { UserInfo } from "./types";
import MovementList from "./components/MovementList";
import ExpensesList from "./components/ExpensesList";

const UserDetail = ({
  user,
  refreshData,
}: {
  user: UserInfo;
  refreshData: () => void;
}) => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contantContainer}
    >
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
      <View style={styles.listContainer}>
        <MovementList
          refreshData={refreshData}
          id={user.id}
          movements={user.movements ?? []}
        />
        <ExpensesList
          refreshData={refreshData}
          id={user.id}
          expenses={user.expenses ?? []}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  contantContainer: {
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
  listContainer: {
    flexDirection: "column",
    // justifyContent: "space-between",
    width: "100%",
  },
});

export default UserDetail;

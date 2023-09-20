import React from "react";
import { Button, StyleSheet, TextInput, View, Text } from "react-native";
import { UserInfo } from "./types";

const UserList = ({
  users,
  onDeleteUser,
  onNavigateToUser,
}: {
  users: UserInfo[];
  onDeleteUser: (id: string) => void;
  onNavigateToUser: (id: string) => void;
}) => {
  return (
    <View style={styles.container}>
      {users.map((user) => (
        <View key={user.name} style={styles.userContainer}>
          <Text style={styles.text}>{user.name}</Text>
          <Text style={styles.text}>{user.balance}€</Text>
          <Button title={"Delete user"} onPress={() => onDeleteUser(user.id)} />
          <Button
            title={"Check user"}
            onPress={() => onNavigateToUser(user.id)}
          />
        </View>
      ))}
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
  userContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 10,
  },
  text: {
    color: "white",
  },
});

export default UserList;

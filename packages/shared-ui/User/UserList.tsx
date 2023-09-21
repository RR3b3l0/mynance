import React from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { UserInfo } from "./types";
import { deleteUser } from "../api";
import Button from "../components/Button";

const UserList = ({
  users,
  onNavigateToUser,
  refreshData,
}: {
  users: UserInfo[];
  onNavigateToUser: (id: string) => void;
  refreshData: () => void;
}) => {
  return (
    <View style={styles.container}>
      {users.map((user) => (
        <View key={user.name} style={styles.userContainer}>
          <View style={styles.infoContainer}>
            <Text style={styles.text}>NAME: {user.name}</Text>
            <Text style={styles.text}>BALANCE: {user.balance}€</Text>
          </View>
          <View style={styles.actionsContainer}>
            <Button
              title={"Delete user"}
              onPress={async () => await deleteUser(user.id, refreshData)}
            />
            <Button
              title={"Check user"}
              onPress={() => onNavigateToUser(user.id)}
            />
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "gray",
    padding: 20,
    borderRadius: 10,
  },
  userContainer: {
    alignItems: "center",
  },
  text: {
    color: "white",
  },
  infoContainer: {
    marginBottom: 50,
  },
  actionsContainer: {
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
});

export default UserList;

import React, { useState } from "react";
import { Button, StyleSheet, TextInput, View, Text } from "react-native";
import { Movement } from "../types";
import { addMovement, deleteMovement } from "../../api";

const UserDetail = ({
  refreshData,
  id,
  movements,
}: {
  refreshData: () => void;
  id: string;
  movements: Movement[];
}) => {
  const [openAddMovement, setOpenAddMovement] = useState(false);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState<number | null>(null);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>MOVEMENTS</Text>
        <Button
          title={"Add Movement"}
          onPress={() => setOpenAddMovement(!openAddMovement)}
        />
      </View>
      {openAddMovement ? (
        <View>
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
              setOpenAddMovement(false);
              setDescription("");
              setAmount(null);
              if (amount && description) {
                await addMovement(id, amount, description, refreshData);
              }
            }}
          />
        </View>
      ) : (
        <View style={styles.items}>
          <View style={styles.itemContainer}>
            <Text>Description</Text>
            <Text>Amount</Text>
            <Text>Previous Balance</Text>
            <Text>Actions</Text>
          </View>
          {movements.map((movement) => (
            <View
              key={`movement_${movement.id}`}
              style={[
                styles.itemContainer,
                { backgroundColor: "white", borderRadius: 10 },
              ]}
            >
              <Text>{movement.description}</Text>
              <Text>{movement.amount}</Text>
              <Text>{movement.previousBalance}</Text>
              <Button
                title={"Delete"}
                onPress={async () => {
                  await deleteMovement(id, movement.id, refreshData);
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
    backgroundColor: "#62A8AC",
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

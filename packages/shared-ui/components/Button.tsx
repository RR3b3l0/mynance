import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

const Button = ({
  title,
  onPress,
  disabled,
}: {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: 10,
    padding: 10,
    backgroundColor: "#78CAD2",
  },
  title: {
    color: 'white',
    textAlign: 'center'
  },
});

export default Button;

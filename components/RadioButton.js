import React, { useState } from "react";
import { Text, View, Pressable } from "react-native";
import styles from "../style/style";

/**
 * @param genders
 * @param onPress
 */

export default function RadioButton({ genders, onPress }) {
  const [value, setValue] = useState("male");
  /**
   * @param selected
   */

  function handlePress(selected) {
    setValue(selected);
    onPress(selected);
  }

  return (
    <>
      {genders.map((item) => (
        <View key={item.value} style={styles.radioButtonContainer}>
          <Text style={styles.label}>{item.label}</Text>
          <Pressable
            style={styles.radioButtonCircle}
            onPress={() => handlePress(item.value)}
          >
            {value === item.value && <View style={styles.radioButtonChecked} />}
          </Pressable>
        </View>
      ))}
    </>
  );
}

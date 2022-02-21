import * as React from "react";
import { useCallback, useState } from "react";
import { ScrollView, Text, View, TextInput, Pressable, Alert } from "react-native";
import styles from "./style/style";
import DropDownPicker from "react-native-dropdown-picker";
import RadioButton from "./components/RadioButton";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App(props) {
  const [weight, setWeight] = useState(0);
  const [gender, setGender] = useState("male");
  const [alcLevel, setAlcLevel] = useState(0);
  const { title = "Calculate" } = props;
  const showAlert = () => {
    Alert.alert("Warning!", "Type in your weight.");
  };

  const [openBottles, setOpenBottles] = useState(false);
  const [valueBottles, setValueBottles] = useState(null);
  const [itemsBottles, setItemsBottles] = useState([
    { label: "1 bottle", value: 1 },
    { label: "2 bottles", value: 2 },
    { label: "3 bottles", value: 3 },
    { label: "4 bottles", value: 4 },
    { label: "5 bottles", value: 5 },
  ]);

  const [openTime, setOpenTime] = useState(false);
  const [valueTime, setValueTime] = useState(null);
  const [itemsTime, setItemsTime] = useState([
    { label: "1 hour", value: 1 },
    { label: "2 hours", value: 2 },
    { label: "3 hours", value: 3 },
    { label: "4 hours", value: 4 },
    { label: "5 hours", value: 5 },
  ]);

  DropDownPicker.setListMode("SCROLLVIEW");

  const onOpenTime = useCallback(() => {
    setOpen(false);
  }, []);

  const onOpenBottles = useCallback(() => {
    setOpen(false);
  }, []);

  const genders = [
    {
      label: "Male",
      value: "male",
    },
    {
      label: "Female",
      value: "female",
    },
  ];

  function calculate() {
    let result = 0;
    var litres;
    var grams;
    var burning;
    var gramsLeft;

    if (gender === "male") {
      litres = valueBottles * 0.33;
      grams = litres * 8 * 4.5;
      burning = weight / 10;
      gramsLeft = grams - valueTime * burning;
      result = gramsLeft / (weight * 0.7);
    } else {
      litres = valueBottles * 0.33;
      grams = litres * 8 * 4.5;
      burning = weight / 10;
      gramsLeft = grams - valueTime * burning;
      result = gramsLeft / (weight * 0.6);
    }
    setAlcLevel(result);

    //If negative result appears, turn into 0
    if (result < 0) {
      let negativeResult = 0;
      setAlcLevel(negativeResult);
    } else {
      setAlcLevel(result);
    }

    //if no weight is typed in, show an alert
    if (weight == 0) {
      showAlert(0);
    }
  }

  function getTextColor() {
    if (alcLevel < 0.3) {
      return styles.greenResult;
    } else if (0.6 > alcLevel > 0.3) {
      return styles.yellowResult;
    } else if (alcLevel > 0.6) {
      return styles.redResult;
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Header />
      <Text style={styles.valueNames}>Weight</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setWeight(text)}
        placeholder="in kilograms"
        keyboardType="number-pad"
      ></TextInput>
      <View style={{ zIndex: 10 }}>
        <Text style={styles.valueNames}>Bottles</Text>
        <DropDownPicker
          style={styles.picker}
          placeholder="1 bottle"
          open={openBottles}
          onOpen={onOpenBottles}
          value={valueBottles}
          items={itemsBottles}
          setOpen={setOpenBottles}
          setValue={setValueBottles}
          setItems={setItemsBottles}
        />
      </View>
      <Text style={styles.valueNames}>Time</Text>
      <View style={{ zIndex: 9 }}>
        <DropDownPicker
          style={styles.picker}
          placeholder="1 hour"
          open={openTime}
          onOpen={onOpenTime}
          value={valueTime}
          items={itemsTime}
          setOpen={setOpenTime}
          setValue={setValueTime}
          setItems={setItemsTime}
        />
      </View>
      <Text style={styles.valueNames}>Gender</Text>
      <RadioButton
        genders={genders}
        onPress={(value) => {
          setGender(value);
        }}
      />
      <Text style={getTextColor()}>{alcLevel.toFixed(2)}</Text>
      <Pressable style={styles.button} onPress={calculate}>
        <Text style={styles.buttonText}>{title}</Text>
      </Pressable>
      <Footer />
    </ScrollView>
  );
}

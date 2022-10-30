import React from "react";
import { Button, Text, TextInput, View } from "react-native";
import AppStyles from "../styles/AppStyles";

export default function AddToDoModal(props) {
  let [note, setNote] = React.useState("");
  return (
    <View style={AppStyles.container}>
      <Text style={AppStyles.header}>Add Notes</Text>
      <TextInput
        style={[AppStyles.textInput, AppStyles.darkTextInput]}
        placeholder="Write your note here"
        value={note}
        onChangeText={setNote}
      />
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 2, marginRight: 10 }}>
          <Button title="Cancel" onPress={props.onClose} />
        </View>
        <View style={{ flex: 2 }}>
          <Button
            title={"   ADD   "}
            onPress={() => {
              props.addNotes(note);
              setNote("");
              props.onClose();
            }}
          />
        </View>
      </View>
    </View>
  );
}

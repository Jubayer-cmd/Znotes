import React from "react";
import { Button, Text, View } from "react-native";
import AppStyles from "../styles/AppStyles";
import { Container, TextNew } from "./style";

export default function AddToDoModal(props) {
  let [note, setNote] = React.useState("");
  return (
    <Container>
      <Text style={AppStyles.header}>Add Notes</Text>
      <TextNew
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
    </Container>
  );
}

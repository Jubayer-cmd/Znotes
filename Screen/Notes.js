import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import InlineTextButton from "../components/InlineTextButton";
import { auth, db } from "../firebase";
import AppStyles from "../styles/AppStyles";
import AddToDoModal from "./../components/AddToDoModal";
const Notes = ({ navigation }) => {
  const [note, setNotes] = useState(null);
  let [modalVisible, setModalVisible] = React.useState(false);
  let [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    let loadToDoList = async () => {
      const q = query(
        collection(db, "Notes"),
        where("userId", "==", auth.currentUser.uid)
      );

      const querySnapshot = await getDocs(q);
      let Notes = [];
      querySnapshot.forEach((doc) => {
        let note = doc.data();
        note.id = doc.id;
        Notes.push(note);
      });
      setNotes(Notes);
      setIsLoading(false);
    };
    loadToDoList();
  }, []);

  const addNotes = async (data) => {
    let noteToSave = {
      text: data,
      userId: auth.currentUser.uid,
    };
    const docRef = await addDoc(collection(db, "Notes"), noteToSave);

    noteToSave.id = docRef.id;

    let updatedNotes = [...note];
    updatedNotes.push(noteToSave);

    setNotes(updatedNotes);
  };

  let deleteToDo = async (noteId) => {
    setIsLoading(true);
    await deleteDoc(doc(db, "Notes", noteId));
    let updatedNotes = [...note].filter((item) => item.id != noteId);
    setNotes(updatedNotes);
    setIsLoading(false);
  };

  const Item = ({ title }) => (
    <View style={[styles.card, styles.shadowProp]}>
      <View style={AppStyles.fillSpace}>
        <Text style={{ fontSize: 20, fontWeight: "600" }}>{title.text}</Text>
        <InlineTextButton
          text="Delete"
          color="#258ea6"
          onPress={() =>
            Alert.alert("Delete", "Are you sure to remove this note?", [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
              },
              { text: "OK", onPress: () => deleteToDo(title.id) },
            ])
          }
        />
      </View>
    </View>
  );

  const renderItem = ({ item }) => <Item title={item} />;

  return (
    <View style={{ marginTop: 20, paddingBottom: 60 }}>
      <Text
        style={{
          fontSize: 30,
          alignSelf: "center",
          fontWeight: "600",
        }}
      >
        Your Notes
      </Text>
      <View
        style={[
          AppStyles.rowContainer,
          AppStyles.rightAligned,
          AppStyles.rightMargin,
          AppStyles.topMargin,
        ]}
      >
        <InlineTextButton
          text="Manage Account"
          color="#258ea6"
          onPress={() => navigation.navigate("ManageAccount")}
        />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <AddToDoModal
          onClose={() => setModalVisible(false)}
          addNotes={addNotes}
        />
      </Modal>

      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={note}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      )}

      <TouchableOpacity
        style={{
          borderWidth: 1,
          borderColor: "red",
          alignItems: "center",
          justifyContent: "center",
          width: 70,
          position: "absolute",
          top: 600,
          right: 30,
          height: 70,
          backgroundColor: "red",
          borderRadius: 100,
        }}
        onPress={() => setModalVisible(true)}
      >
        <Text style={{ color: "white" }}>Note+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Notes;
const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    paddingVertical: 25,
    paddingHorizontal: 15,
    width: "100%",
    marginVertical: 10,
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});

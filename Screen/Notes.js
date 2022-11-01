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
  Text,
  View,
} from "react-native";
import { Switch, TouchableRipple } from "react-native-paper";
import InlineTextButton from "../components/InlineTextButton";
import { PreferencesContext } from "../components/PreferencesContext";
import {
  Cardview,
  Container,
  FloatButton,
  Sidebar,
  TitleText,
  TitleText2,
} from "../components/style";
import { auth, db } from "../firebase";
import AppStyles from "../styles/AppStyles";
import AddToDoModal from "./../components/AddToDoModal";
const Notes = ({ navigation }) => {
  const [note, setNotes] = useState(null);
  let [modalVisible, setModalVisible] = React.useState(false);
  let [isLoading, setIsLoading] = React.useState(true);

  const { toggleTheme, isThemeDark } = React.useContext(PreferencesContext);

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
    <Cardview
      style={{
        shadowOpacity: 0.75,
        shadowRadius: 5,
        shadowColor: "gray",
        shadowOffset: { height: 0, width: 0 },
      }}
    >
      <View style={AppStyles.fillSpace}>
        <TitleText2 fontSize="16px">{title.text}</TitleText2>
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
    </Cardview>
  );

  const renderItem = ({ item }) => <Item title={item} />;

  return (
    <Container>
      <View>
        <TitleText fontSize="28px">Your Notes</TitleText>
        <Sidebar>
          <InlineTextButton
            text="Manage Account"
            color="#258ea6"
            onPress={() => navigation.navigate("ManageAccount")}
          />

          <TitleText2 fontSize="16px">Dark:</TitleText2>
          <TouchableRipple onPress={() => toggleTheme()}>
            <Switch color={"red"} value={isThemeDark} />
          </TouchableRipple>
        </Sidebar>
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

        <FloatButton onPress={() => setModalVisible(true)}>
          <Text style={{ color: "white" }}>Note+</Text>
        </FloatButton>
      </View>
    </Container>
  );
};

export default Notes;

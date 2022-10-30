import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Button,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  View,
} from "react-native";
import InlineTextButton from "../components/InlineTextButton";
import { auth } from "../firebase";
import AppStyles from "../styles/AppStyles";

export default function Signin({ navigation }) {
  const background = require("../assets/background.jpg");
  const [loading, isLoading] = useState(false);
  if (auth.currentUser) {
    navigation.navigate("notes");
  } else {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.navigate("notes");
      }
    });
  }

  let [errorMessage, setErrorMessage] = React.useState("");
  let [email, setEmail] = React.useState("");
  let [password, setPassword] = React.useState("");

  let login = async () => {
    if (email !== "" && password !== "") {
      try {
        isLoading(true);
        await signInWithEmailAndPassword(auth, email, password).then(
          (userCredential) => {
            navigation.navigate("notes", { user: userCredential.user });
            setErrorMessage("");
            setEmail("");
            setPassword("");
          }
        );
        isLoading(false);
      } catch (error) {
        setErrorMessage(error.message);
      }
    } else {
      setErrorMessage("Please enter an email and password");
    }
  };

  return (
    <ImageBackground style={AppStyles.imageContainer} source={background}>
      <KeyboardAvoidingView
        style={AppStyles.backgroundCover}
        behavior={Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset={60}
      >
        <Text style={[AppStyles.lightText, AppStyles.header]}>Login</Text>
        <Text style={AppStyles.errorText}>{errorMessage}</Text>
        <TextInput
          style={[
            AppStyles.textInput,
            AppStyles.lightTextInput,
            AppStyles.lightText,
          ]}
          placeholder="Email"
          placeholderTextColor="#BEBEBE"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={[
            AppStyles.textInput,
            AppStyles.lightTextInput,
            AppStyles.lightText,
          ]}
          placeholder="Password"
          placeholderTextColor="#BEBEBE"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        {loading && <ActivityIndicator size="large" color="#00ff00" />}
        <View style={[AppStyles.rowContainer, AppStyles.topMargin]}>
          <Text style={AppStyles.lightText}>Don't have an account? </Text>
          <InlineTextButton
            text="Sign Up"
            onPress={() => navigation.navigate("Login")}
          />
        </View>
        <View style={[AppStyles.rowContainer, AppStyles.bottomMargin]}>
          <Text style={AppStyles.lightText}>Forgotten your password? </Text>
          <InlineTextButton
            text="Reset"
            onPress={() => navigation.navigate("ResetPassword")}
          />
        </View>
        <Button title="Login" onPress={login} color="#f7b267" />
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

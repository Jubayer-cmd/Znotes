import FontAwesome from "@expo/vector-icons/FontAwesome";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import InlineTextButton from "../components/InlineTextButton";
import AppStyles from "../styles/AppStyles";
export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>
        Welcome to Znotes!
        {"\n"}
      </Text>
      <Image
        source={{
          uri: "https://cdn-icons-png.flaticon.com/512/564/564445.png",
        }}
        style={{ width: 200, height: 200, marginBottom: 100 }}
      />
      <FontAwesome.Button
        name="arrow-circle-right"
        backgroundColor="#3b5998"
        onPress={() => navigation.navigate("Login")}
      >
        SignUp to Continue!
      </FontAwesome.Button>
      <View style={[AppStyles.rowContainer, AppStyles.topMargin]}>
        <Text>Already have an account? </Text>
        <InlineTextButton
          text="Login"
          onPress={() => navigation.navigate("SignIn")}
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    fontSize: 30,
    fontWeight: "bold",
  },
  bodyText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "violet",
    marginTop: 50,
  },
});

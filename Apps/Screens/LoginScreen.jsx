import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import Colors from "../Utils/Colors";
import { client } from "./../Utils/KindConfig";
import { AuthContext } from "../../App";
export default function LoginScreen() {
  const { auth, setAuth } = useContext(AuthContext);
  const handleSignUp = async () => {
    const token = await client.register();
    if (token) {
      console.log("Authenticated Successfully!!!");
      setAuth(true);
      // User was authenticated
    }
  };

  const handleSignIn = async () => {
    const token = await client.login();
    if (token) {
      console.log("Authenticated Successfully!!!");
      setAuth(true);
      // User was authenticated
    }
  };

  return (
    <View>
      <Image
        source={require("./../../assets/images/rocket.jpg")}
        style={{ width: "100%", height: 250, objectFit: "fill" }}
      />
      <View style={{ padding: 55 }}>
        <Text style={{ fontSize: 45, fontWeight: "bold", textAlign: "center" }}>
          Welcome To
          <Text style={{ color: Colors.PRIMARY }}> CodeNexus</Text>
        </Text>
        <Text
          style={{
            fontSize: 20,
            marginTop: 7,
            color: Colors.black,
            textAlign: "center",
          }}
        >
          Your Gateway to Coding Excellence
        </Text>

        {/* Sign In button  */}
        <TouchableOpacity onPress={handleSignIn} style={styles.button}>
          <Text
            style={{ textAlign: "center", color: Colors.WHITE, fontSize: 18 }}
          >
            Sign In
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSignUp}>
          <Text
            style={{
              marginTop: 10,
              color: Colors.PRIMARY,
              textAlign: "center",
              fontSize: 16,
            }}
          >
            Create New Account
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 16,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 99,
    marginTop: 60,
  },
});

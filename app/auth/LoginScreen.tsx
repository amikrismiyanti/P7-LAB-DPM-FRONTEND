import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PaperProvider, Button, Dialog, Portal } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient"; // For gradient backgrounds

export default function App() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  // Login Handler
  const handleLogin = async () => {
    if (username === "testuser" && password === "12345") {
      await AsyncStorage.setItem("username", username);
      setLoggedInUser(username);
      setDialogMessage("Login successful!");
      setIsSuccess(true);
      setDialogVisible(true);
    } else {
      setDialogMessage("Invalid username or password!");
      setIsSuccess(false);
      setDialogVisible(true);
    }
  };

  // Dialog Dismiss Handler
  const handleDialogDismiss = () => {
    setDialogVisible(false);
    if (isSuccess) {
      router.replace("/Home");
    }
  };

  return (
    <PaperProvider>
      <LinearGradient colors={['#4c669f', '#3b5998', '#192f5d']} style={styles.container}> {/* Gradient background */}
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          
          {!loggedInUser ? (
            // Login Screen
            <View style={styles.formContainer}>
              <Text style={styles.title}>Login</Text>
              <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
              <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.registerButton}
                onPress={() => router.push("/Register")}
              >
                <Text style={styles.registerButtonText}>Register</Text>
              </TouchableOpacity>
            </View>
          ) : (
            // Profile Screen
            <View style={styles.profileContainer}>
              <Text style={styles.title}>Welcome, {loggedInUser}!</Text>
              <Text style={styles.subtitle}>This is your profile page</Text>
              <TouchableOpacity style={styles.button} onPress={() => router.push("/Explore")}>
                <Text style={styles.buttonText}>Explore</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => setLoggedInUser(null)}>
                <Text style={styles.buttonText}>Logout</Text>
              </TouchableOpacity>
            </View>
          )}
          
          <Portal>
            <Dialog visible={dialogVisible} onDismiss={handleDialogDismiss}>
              <Dialog.Title>{isSuccess ? "Success" : "Error"}</Dialog.Title>
              <Dialog.Content>
                <Text>{dialogMessage}</Text>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={handleDialogDismiss}>OK</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </ScrollView>
      </LinearGradient>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50, // Add top padding for better space
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 30,
    resizeMode: "contain",
  },
  formContainer: {
    width: "90%",
    backgroundColor: "#ffffff",
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
    alignItems: "center",
    marginBottom: 20,
  },
  profileContainer: {
    width: "90%",
    backgroundColor: "#ffffff",
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 18,
    color: "#666",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#007BFF",
    borderWidth: 1,
    borderRadius: 25,
    marginBottom: 15,
    paddingHorizontal: 20,
    backgroundColor: "#f1f1f1",
    fontSize: 16,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#4CAF50",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  registerButton: {
    marginTop: 15,
  },
  registerButtonText: {
    fontSize: 16,
    color: "#007BFF",
  },
});

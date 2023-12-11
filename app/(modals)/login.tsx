import { View, StyleSheet, TextInput, Button, Text } from "react-native";
import React from "react";
import { defaultStyles } from "../../constants/Styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import Colors from "../../constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useWarmUpBrowser } from "../../hooks/useWarmUpBrowser";
import { useOAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

enum Strategy {
  Google = "oauth_google",
  Facebook = "oauth_facebook",
  Apple = "oauth_apple",
}

const login = () => {
  useWarmUpBrowser();

  const router = useRouter();
  const { startOAuthFlow: googleAuth } = useOAuth({ strategy: "oauth_google" });
  const { startOAuthFlow: facebookAuth } = useOAuth({
    strategy: "oauth_facebook",
  });
  const { startOAuthFlow: appleAuth } = useOAuth({ strategy: "oauth_apple" });

  const onSelectAuth = async (strategy: Strategy) => {
    const selectedAuth = {
      [Strategy.Google]: googleAuth,
      [Strategy.Facebook]: facebookAuth,
      [Strategy.Apple]: appleAuth,
    }[strategy];
    try {
      const { createdSessionId, setActive } = await selectedAuth();
      if (createdSessionId) {
        setActive!({ session: createdSessionId });
        router.push("/(tabs)/");
      }
    } catch (err: any) {
      console.error("OAuth error", ...err);
    }
  };

  return (
    <View style={styles.container}>
      {/* <TextInput
        autoCapitalize='none'
        placeholder='Email'
        style={[defaultStyles.inputField, { marginBottom: 30 }]}
      />
      <TouchableOpacity style={[defaultStyles.btn]}>
        <Text style={[defaultStyles.btnText]}>Continue</Text>
      </TouchableOpacity>
      <View style={[styles.seperatorView]}>
        <View
          style={{
            flex: 1,
            borderBottomColor: "#000",
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        ></View>

        <Text style={styles.seperator}>or</Text>
        <View
          style={{
            flex: 1,
            borderBottomColor: "#000",
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        ></View>
      </View> */}
      <View style={{ gap: 20 }}>
        {/* <TouchableOpacity style={styles.btnOutline}>
          <MaterialCommunityIcons
            name='cellphone-key'
            size={20}
            style={defaultStyles.btnIcon}
          />
          <Text style={styles.btnOutlineText}>Continue with Phone</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          style={styles.btnOutline}
          onPress={() => onSelectAuth(Strategy.Google)}
        >
          <MaterialCommunityIcons
            name='google'
            size={20}
            style={defaultStyles.btnIcon}
          />
          <Text style={styles.btnOutlineText}>Continue with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnOutline}
          onPress={() => onSelectAuth(Strategy.Facebook)}
        >
          <MaterialCommunityIcons
            name='facebook'
            size={20}
            style={defaultStyles.btnIcon}
          />
          <Text style={styles.btnOutlineText}>Continue with Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnOutline}
          onPress={() => onSelectAuth(Strategy.Apple)}
        >
          <MaterialCommunityIcons
            name='apple'
            size={20}
            style={defaultStyles.btnIcon}
          />
          <Text style={styles.btnOutlineText}>Continue with Apple</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 26,
  },
  seperatorView: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginVertical: 30,
  },
  seperator: {
    fontFamily: "Nova",
    color: Colors.grey,
  },
  btnOutline: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: Colors.grey,
    height: 50,
    borderRadius: 8,
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
    textAlign: "center",
    justifyContent: "center",
  },
  btnOutlineText: {
    color: "#000",
    fontFamily: "Nova",
    fontSize: 16,
  },
});

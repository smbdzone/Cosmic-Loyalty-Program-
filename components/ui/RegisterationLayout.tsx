import React, { ReactNode } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "@/components/ui/CustomButton";

interface RegisterationLayoutProps {
  headingText: string;
  children: ReactNode;
  handlePress: () => void;
  isLogin: boolean;
  navigationRoute: string;
  btnTitle: string;
  disabled?: boolean;
}

const RegisterationLayout: React.FC<RegisterationLayoutProps> = (props) => {
  const navigation = useNavigation();

  return (
    <View
      style={styles.container}
      className="flex-1 border-[5px] border-black justify-center items-center bg-gray-900"
    >
      <View style={styles.headingDiv}>
        {!props.isLogin && (
          <Text style={styles.headingBold} className="text-white text-2xl mb-6">
            Welcome!
          </Text>
        )}
        <Text style={styles.heading} className="text-white text-2xl mb-6">
          {props.headingText}
        </Text>
      </View>

      {props.children}
      <View style={styles.btnDiv}>
        <CustomButton
          disabled={props.disabled}
          title={props.btnTitle}
          onPress={props.handlePress}
        />
      </View>
      <TouchableOpacity
        style={styles.bottomText}
        // onPress={() => navigation.navigate("Register")}
      >
        {props.isLogin && (
          <Text className="text-blue-400">Forgot Password</Text>
        )}
      </TouchableOpacity>
      <View style={styles.divider}>
        <View style={styles.line} />
        <Text style={styles.orText}>or</Text>
        <View style={styles.line} />
      </View>
      <TouchableOpacity
        style={styles.bottomText}
        onPress={() => navigation.navigate(props.navigationRoute as never)}
      >
        <Text className="text-blue-400">
          {props.isLogin ? (
            <>
              Don't have an account?{" "}
              <Text style={styles.signupText}>Sign Up</Text>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <Text style={styles.signupText}>Sign in</Text>
            </>
          )}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 30,
    paddingBottom: 20,
    padding: 10,
    width: "100%",
    margin: "auto",
    flex: 1,
  },
  headingDiv: {
    width: "90%",
    marginBottom: 50,
  },
  headingBold: {
    fontSize: 30,
    fontWeight: "bold",
  },
  heading: {
    fontSize: 30,
    fontWeight: "500",
  },
  btnDiv: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginTop: 40,
    width: "100%",
  },
  btn: {
    display: "flex",
    justifyContent: "center",
    alignSelf: "center",
    borderWidth: 1,
    textAlign: "center",
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 4,
  },
  bottomText: {
    marginTop: 20,
    color: "#000000",
    opacity: 0.55,
    fontWeight: "bold",
  },
  signupText: {
    fontWeight: "bold",
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginVertical: 20,
    width: "50%",
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#000000",
    opacity: 0.3,
    borderTopWidth: 1,
    marginTop: 4,
  },
  orText: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
    opacity: 0.3,
  },
});

export default RegisterationLayout;

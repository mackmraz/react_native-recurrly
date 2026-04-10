import { Link } from "expo-router";
import { Text, View } from "react-native";

const SignUp = () => {
  return (
    <View>
      <Text>SignUp</Text>
      <Link href="/(auth)/sign-up">Sign Up</Link>
      <Link href="/">Go Back</Link>
    </View>
  );
};

export default SignUp;

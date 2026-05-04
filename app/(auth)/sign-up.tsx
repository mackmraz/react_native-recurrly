import { useSignUp } from "@clerk/expo";
import { Link, useRouter } from "expo-router";
import React from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignUp() {
  const { signUp, errors, fetchStatus } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [code, setCode] = React.useState("");

  const handleSubmit = async () => {
    if (!emailAddress || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    if (password.length < 8) {
      Alert.alert("Error", "Password must be at least 8 characters");
      return;
    }

    const { error } = await signUp.password({
      emailAddress,
      password,
    });

    if (error) {
      console.error(JSON.stringify(error, null, 2));
      Alert.alert("Error", error.message || "Sign up failed");
      return;
    }

    if (!error) {
      await signUp.verifications.sendEmailCode();
    }
  };

  const handleVerify = async () => {
    if (!code) {
      Alert.alert("Error", "Please enter the verification code");
      return;
    }

    await signUp.verifications.verifyEmailCode({
      code,
    });

    if (signUp.status === "complete") {
      await signUp.finalize({
        navigate: ({ session }) => {
          if (session?.currentTask) {
            console.log(session?.currentTask);
            return;
          }
          router.push("/(tabs)");
        },
      });
    } else {
      Alert.alert("Error", "Verification failed. Please try again.");
    }
  };

  if (
    signUp.status === "missing_requirements" &&
    signUp.unverifiedFields.includes("email_address") &&
    signUp.missingFields.length === 0
  ) {
    return (
      <SafeAreaView className="auth-safe-area">
        <ScrollView className="auth-scroll">
          <View className="auth-content">
            <View className="auth-brand-block">
              <View className="auth-logo-wrap">
                <View className="auth-logo-mark">
                  <Text className="auth-logo-mark-text">R</Text>
                </View>
                <View>
                  <Text className="auth-wordmark">Recurly</Text>
                  <Text className="auth-wordmark-sub">
                    SUBSCRIPTION MANAGER
                  </Text>
                </View>
              </View>
            </View>

            <Text className="auth-title">Verify your email</Text>
            <Text className="auth-subtitle">
              We&apos;ve sent a verification code to {emailAddress}
            </Text>

            <View className="auth-card">
              <View className="auth-form">
                <View className="auth-field">
                  <Text className="auth-label">Verification code</Text>
                  <TextInput
                    className="auth-input"
                    value={code}
                    placeholder="Enter code"
                    placeholderTextColor="#666666"
                    onChangeText={setCode}
                    keyboardType="numeric"
                    autoCapitalize="none"
                  />
                  {errors.fields.code && (
                    <Text className="auth-error">
                      {errors.fields.code.message}
                    </Text>
                  )}
                </View>

                <Pressable
                  className={`auth-button ${fetchStatus === "fetching" ? "auth-button-disabled" : ""}`}
                  onPress={handleVerify}
                  disabled={fetchStatus === "fetching"}
                >
                  <Text className="auth-button-text">Verify</Text>
                </Pressable>

                <Pressable
                  className="auth-secondary-button"
                  onPress={() => signUp.verifications.sendEmailCode()}
                >
                  <Text className="auth-secondary-button-text">
                    Send new code
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (signUp.status === "complete") {
    return null; // Will redirect via finalize
  }

  return (
    <SafeAreaView className="auth-safe-area">
      <ScrollView className="auth-scroll">
        <View className="auth-content">
          <View className="auth-brand-block">
            <View className="auth-logo-wrap">
              <View className="auth-logo-mark">
                <Text className="auth-logo-mark-text">R</Text>
              </View>
              <View>
                <Text className="auth-wordmark">Recurly</Text>
                <Text className="auth-wordmark-sub">SUBSCRIPTION MANAGER</Text>
              </View>
            </View>
          </View>

          <Text className="auth-title">Create your account</Text>
          <Text className="auth-subtitle">
            Sign up to begin managing your subscriptions in one place
          </Text>

          <View className="auth-card">
            <View className="auth-form">
              <View className="auth-field">
                <Text className="auth-label">Email</Text>
                <TextInput
                  className="auth-input"
                  value={emailAddress}
                  placeholder="Enter your email"
                  placeholderTextColor="#666666"
                  onChangeText={setEmailAddress}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                {errors.fields.emailAddress && (
                  <Text className="auth-error">
                    {errors.fields.emailAddress.message}
                  </Text>
                )}
              </View>

              <View className="auth-field">
                <Text className="auth-label">Password</Text>
                <TextInput
                  className="auth-input"
                  value={password}
                  placeholder="Create a password"
                  placeholderTextColor="#666666"
                  onChangeText={setPassword}
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                {errors.fields.password && (
                  <Text className="auth-error">
                    {errors.fields.password.message}
                  </Text>
                )}
                <Text className="auth-helper">At least 8 characters</Text>
              </View>

              <View className="auth-field">
                <Text className="auth-label">Confirm password</Text>
                <TextInput
                  className="auth-input"
                  value={confirmPassword}
                  placeholder="Confirm your password"
                  placeholderTextColor="#666666"
                  onChangeText={setConfirmPassword}
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                {password !== confirmPassword && confirmPassword.length > 0 && (
                  <Text className="auth-error">Passwords do not match</Text>
                )}
              </View>

              <Pressable
                className={`auth-button ${!emailAddress || !password || !confirmPassword || password !== confirmPassword || fetchStatus === "fetching" ? "auth-button-disabled" : ""}`}
                onPress={handleSubmit}
                disabled={
                  !emailAddress ||
                  !password ||
                  !confirmPassword ||
                  password !== confirmPassword ||
                  fetchStatus === "fetching"
                }
              >
                <Text className="auth-button-text">Create account</Text>
              </Pressable>
            </View>
          </View>

          <View className="auth-link-row">
            <Text className="auth-link-copy">Already have an account?</Text>
            <Link href="/(auth)/sign-in">
              <Text className="auth-link">Sign in</Text>
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

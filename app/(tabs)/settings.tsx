import { useClerk } from "@clerk/expo";
import { styled } from "nativewind";
import React from "react";
import { Alert, Pressable, Text, View } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

const Settings = () => {
  const { signOut } = useClerk();

  const handleSignOut = () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Sign Out",
        style: "destructive",
        onPress: () => signOut(),
      },
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-background p-5">
      <Text className="text-2xl font-sans-bold text-primary mb-8">
        Settings
      </Text>

      <View className="gap-4">
        <Pressable
          className="bg-destructive py-4 px-6 rounded-2xl items-center"
          onPress={handleSignOut}
        >
          <Text className="text-background font-sans-bold text-base">
            Sign Out
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Settings;

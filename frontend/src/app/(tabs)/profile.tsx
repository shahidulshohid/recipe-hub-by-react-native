import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ProfileScreen = () => {
    return (
        <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <View>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>Profile Screen</Text>
            </View>
        </SafeAreaView>
    );
};

export default ProfileScreen;

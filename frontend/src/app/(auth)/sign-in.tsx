import { Image, Pressable, Text, View } from "react-native"


const SignInScreen = () => {
    return (
        <View
        className="bg-black"
        >
            <Image source={require("../../../assets/images/hero.jpg")} className="w-full h-72" />
            <View
                className="mt-12 bg-white rounded-[30px] p-12 mb-16"   
            >
                <View
                    className="flex gap-2 items-center"
                >
                    <Text
                        className="text-center text-cod-gray text-4xl font-bold"
                    >
                        Discover Amaging Recipes
                    </Text>
                    <Text
                        className="text-base text-kabul text-center "
                    >
                        Cooke smater with thousands of curated designed for every taste and skill level.
                    </Text>
                </View>
                <View className="mt-6 gap-4 flex items-center">
                    <Pressable
                        className="flex flex-row items-center justify-center gap-4 w-full border border-ebb py-2 rounded-full">
                        <Image
                            source={require("../../../assets/images/google.jpg")}
                            className="w-5 h-5"
                        />
                        <Text className="text-base font-semibold">
                            Continue with Google
                        </Text>
                    </Pressable>
                    <Pressable
                        className="flex flex-row items-center justify-center bg-black gap-4 w-full border border-ebb py-1 rounded-full">
                        <Image
                            source={require("../../../assets/images/apple.png")}
                            className="w-9 h-9"
                        />
                        <Text className="text-base font-semibold text-white">
                            Continue with Apple
                        </Text>
                    </Pressable>
                    <Text className="w-[80%] text-center mt-5 text-kabul">
                        By continuing, you agree to our terms and privacy policy
                    </Text>
                </View>
            </View>
        </View>
    )
}

export default SignInScreen;
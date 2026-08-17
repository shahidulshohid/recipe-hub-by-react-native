// import { useSSO } from "@clerk/expo";
// import { useState } from "react"
// import { Alert } from "react-native";


// const useSocialAuth = () => {
//     const [loadingStrategy, setLoadingStrategy] = useState<string | null>(null)
//     const { startSSOFlow } = useSSO();
//     const handleSocialAuth = async (strategy: "oauth_google" | "oauth_apple") => {
//         if (loadingStrategy) {
//             return null;
//         };

//         setLoadingStrategy(strategy);

//         try {
//             const { createdSessionId, setActive } = await startSSOFlow({ strategy })
//             if (!createdSessionId || !setActive) {
//                 Alert.alert(
//                     "Sign-in incomplete",
//                     "Sign-in did not complete. please"
//                 );
//                 return;
//             };
//             await setActive({session: createdSessionId})
//         } catch (error) {
//             console.log("Error in social auth", error)
//             Alert.alert("Error failed to sign in. please try again")
//         }
//         finally {
//             setLoadingStrategy(null)
//         }
//     };
//     return {
//         handleSocialAuth, loadingStrategy
//     }
// };

// export default useSocialAuth;


import { useSSO } from "@clerk/expo";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

// অ্যান্ড্রয়েড ডিভাইসে ব্রাউজার পপআপ কাজ করার জন্য
WebBrowser.maybeCompleteAuthSession();

const useSocialAuth = () => {
    const [loadingStrategy, setLoadingStrategy] = useState<string | null>(null);
    const { startSSOFlow } = useSSO();

    // ব্রাউজার ওয়ার্ম-আপের জন্য
    useEffect(() => {
        WebBrowser.warmUpAsync();
        return () => {
            WebBrowser.coolDownAsync();
        };
    }, []);

    const handleSocialAuth = async (strategy: "oauth_google" | "oauth_apple") => {
        if (loadingStrategy) return;

        setLoadingStrategy(strategy);

        try {
            // Expo AuthSession দিয়ে রিডাইরেক্ট লিঙ্ক তৈরি করা হচ্ছে
            const redirectUrl = AuthSession.makeRedirectUri();

            const { createdSessionId, setActive } = await startSSOFlow({
                strategy,
                redirectUrl,
            });
            console.log("createdSessionId", createdSessionId);
            console.log("setActive", setActive);

            if (!createdSessionId || !setActive) {
                Alert.alert(
                    "Sign-in incomplete",
                    "Sign-in did not complete. Please try again."
                );
                return;
            }

            await setActive({ session: createdSessionId });
        } catch (error: any) {
            console.log("Error in social auth", error);
            
            // Clerk-এর আসল এরর মেসেজটি পপআপে দেখাবে
            const errorMessage = 
                error?.errors?.[0]?.message || 
                error?.message || 
                "Failed to sign in. Please try again.";
                
            Alert.alert("Sign In Error", errorMessage);
        } finally {
            setLoadingStrategy(null);
        }
    };

    return {
        handleSocialAuth,
        loadingStrategy,
    };
};

export default useSocialAuth;

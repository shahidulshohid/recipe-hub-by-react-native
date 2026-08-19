import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useAuth } from "@clerk/expo";
import { Redirect, Tabs } from "expo-router";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.tabBarContainer, { paddingBottom: Math.max(insets.bottom, 10) }]}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: "tabPress",
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: "tabLongPress",
                        target: route.key,
                    });
                };

                // Normalize route name (remove parentheses if present)
                const cleanName = route.name.replace(/^\(|\)$/g, "");

                let iconName: keyof typeof Ionicons.glyphMap = "home";
                let displayLabel = "Home";

                if (cleanName === "index") {
                    iconName = isFocused ? "home" : "home-outline";
                    displayLabel = "Home";
                } else if (cleanName === "search") {
                    iconName = isFocused ? "search" : "search-outline";
                    displayLabel = "Search";
                } else if (cleanName === "favourite" || cleanName === "favorites") {
                    iconName = isFocused ? "heart" : "heart-outline";
                    displayLabel = "Favourite";
                } else if (cleanName === "profile") {
                    iconName = isFocused ? "person" : "person-outline";
                    displayLabel = "Profile";
                }

                return (
                    <TouchableOpacity
                        key={route.key}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={route.name}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={styles.tabButton}
                        activeOpacity={0.7}
                    >
                        <View style={[styles.pill, isFocused && styles.pillActive]}>
                            <Ionicons
                                name={iconName}
                                size={24}
                                color={isFocused ? "#B3261E" : "#8E8E93"}
                            />
                            <Text
                                style={[
                                    styles.label,
                                    isFocused ? styles.labelActive : styles.labelInactive,
                                ]}
                            >
                                {displayLabel}
                            </Text>
                        </View>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

export default function AuthRoutesLayout() {
    const { isSignedIn, isLoaded } = useAuth();

    if (!isLoaded) {
        return null;
    }

    if (!isSignedIn) {
        return <Redirect href={"/(auth)/sign-in"} />;
    }

    return (
        <Tabs
            tabBar={(props) => <CustomTabBar {...props} />}
            screenOptions={{
                headerShown: false,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                }}
            />
            <Tabs.Screen
                name="search"
                options={{
                    title: "Search",
                }}
            />
            <Tabs.Screen
                name="favourite"
                options={{
                    title: "Favourite",
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                }}
            />
        </Tabs>
    );
}

const styles = StyleSheet.create({
    tabBarContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "#F2F2F4",
        borderTopWidth: 1,
        borderTopColor: "#E5E5E7",
        paddingTop: 6,
        paddingHorizontal: 8,
    },
    tabButton: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    pill: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 6,
        paddingHorizontal: 20,
        borderRadius: 30,
        backgroundColor: "transparent",
        borderWidth: 3.5,
        borderColor: "transparent",
    },
    pillActive: {
        backgroundColor: "#EBEBEF",
        borderColor: "#FFFFFF",
        borderWidth: 3.5,
        borderRadius: 30,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.12,
        shadowRadius: 4,
        elevation: 3,
    },
    label: {
        fontSize: 11,
        marginTop: 1,
        textAlign: "center",
    },
    labelActive: {
        color: "#B3261E",
        fontWeight: "700",
    },
    labelInactive: {
        color: "#8E8E93",
        fontWeight: "500",
    },
});
import Colors from "../constants/Colors";


export function headerConfig(title: string): object {
    return {
        title,
        headerShown: true,
        headerStyle: {
        backgroundColor: Colors.darkBlue,
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
        fontWeight: "bold",
        },
        headerTitleAlign: "center",
    };
}

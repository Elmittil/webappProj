import { View, Text, TextInput, Button, Pressable } from "react-native";
import { Typography, FormStyles, HomeStyles, Base } from '../../styles';
import { showMessage } from 'react-native-flash-message';


export default function AuthFields({ auth, setAuth, title, submit, navigation }) {

    function validatePassword(text: string) {
        const pattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!\.\,\-]).{4,}$/;
        // if (text.length < minLength) {
        if (!text.match(pattern)) {
            // for (character in text)
            showMessage({
                message: "Password error",
                description: "Password has to be at least 4 characters long and include capital and lower case letters, numbers and special characters",
                type: "warning"
            });
        }
    }

    function validateEmail(text: string) {
        const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!text.match(pattern)) {
            showMessage({
                message: "Email error",
                description: "the email should at least be like xxxx@xx.xx",
                type: "warning"
            });
        }
    };


    return (
        <View style={[Base.container, HomeStyles.base]}>
            <Text style={Typography.header2}>{title}</Text>

            <Text style={Typography.label}>Email</Text>
            <TextInput
                style={FormStyles.input}
                onChangeText={(content: string) => {
                    validateEmail(content);
                    setAuth({ ...auth, email: content })
                }}
                value={auth?.email}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                testID="email-field"
            />

            <Text style={Typography.label}>Password</Text>
            <TextInput
                style={FormStyles.input}
                onChangeText={(content: string) => {
                    validatePassword(content);
                    setAuth({ ...auth, password: content })
                }}
                value={auth?.password}
                secureTextEntry={true}
                autoCapitalize="none"
                autoCorrect={false}
                testID="password-field"
            />
            <Pressable style={Base.button}
                onPress={() => {
                    submit();
                }}
                accessibilityLabel={`Press to ${title}`}>

                <Text style={Typography.buttonText}>{title}</Text>
            </Pressable>

            {title === "Log in" &&
                <Pressable
                    style={Base.button}
                    onPress={() => {
                        navigation.navigate("Register");
                    }}
                    accessibilityLabel={`Press to register`}
                    >

                    <Text style={Typography.buttonText}>Register</Text>
                </Pressable>
            }
        </View>
    );
};

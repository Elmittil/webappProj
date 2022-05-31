import { View, Text, TextInput, Button, Pressable } from "react-native";
import { Typography, Form, Base } from '../../styles';
import { showMessage } from 'react-native-flash-message';
import { Divider } from 'react-native-paper';



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
        <View style={[Base.container, Form.base]}>
            <Text style={[Typography.header1Bold, Typography.white, ]}>{title}</Text>
            <View>
                <Text style={[Form.header4Bold, Typography.white]}>User name</Text>
                <TextInput
                    style={Form.input}
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
            </View>
            
            <Divider style={Typography.divider} />

            <View>
                <Text style={[Form.header4Bold, Typography.white]}>Password</Text>
                <TextInput
                    style={Form.input}
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
            </View>
            {title === "Log in" &&
                <Pressable
                    style={Base.greyButton}
                    onPress={() => {
                        navigation.navigate("Register");
                    }}
                    accessibilityLabel={`Press to register`}
                    >

                    <Text style={Typography.buttonText}>Register</Text>
                </Pressable>
            }

            <Pressable style={Base.button}
                onPress={() => {
                    submit();
                }}
                accessibilityLabel={`Press to ${title}`}>

                <Text style={Typography.buttonText}>{title}</Text>
            </Pressable>

            
        </View>
    );
};

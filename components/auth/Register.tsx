import Auth from '../../interfaces/auth';
import { useState } from 'react';
import AuthModel from '../../models/auth';
import AuthFields from './AuthFields';
import { showMessage } from 'react-native-flash-message';


export default function Register({ navigation }) {
    const [auth, setAuth] = useState<Partial<Auth>>({});

    async function doRegister() {
        if (auth.email && auth.password) {
            const result = await AuthModel.register(auth.email, auth.password);
            if ("errors" in result) {
                if (result.errors.detail.indexOf("users.email") > -1) {
                    showMessage("This email is already in use");
                } else {
                    showMessage(result.errors.detail);
                }
                return;
            }
            if (result.data.message === 'User successfully registered.') {
                navigation.navigate("Login");
                showMessage(result.message);
            }
        } else {
            let description = "Please provide valid email and password";
            if (!auth.email && auth.password) {
                description = "Please provide a valid email";
            } else if (auth.email && !auth.password) {
                description = "Please provide a valid password";
            }
            showMessage({
                message: "Input missing",
                description: description,
                type: "warning"
            });
        }
    }

    return (
        <AuthFields
            auth={auth}
            setAuth={setAuth}
            submit={doRegister}
            title="Register"
            navigation={navigation}
        />
    );
};

import Auth from '../../interfaces/auth';
import { useState } from 'react';
import AuthModel from '../../models/auth';
import AuthFields from './AuthFields';
import { showMessage } from 'react-native-flash-message';

export default function Login({ navigation, setIsLoggedIn }) {
    const [auth, setAuth] = useState<Partial<Auth>>({});

    async function doLogin() {
        if (auth.email && auth.password) {
            const result = await AuthModel.login(auth.email, auth.password);
            if (result.type === 'success') {
                setIsLoggedIn(true);
                navigation.navigate("Invoices");
            } 
            showMessage(result);
        } else {
            let description = "Please provide valid email and password";
            if (!auth.email && auth.password){
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
            submit={doLogin}
            title="Log in"
            navigation={navigation}
        />
    );
};

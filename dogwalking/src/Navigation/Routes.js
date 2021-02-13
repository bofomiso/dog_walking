import React, { useContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import AuthStack from './AuthStack';
import HomeStack from './BottomBarStack';
import { AuthContext } from './AuthProvider';

export default function Routes() {
    const { user, setUser } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [initializing, setInitializing] = useState(true);

    function AuthStateChanged(user) {
        setUser(user);
        if(initializing) setInitializing(false);
        setLoading(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(AuthStateChanged);
        return subscriber;
    }, []);
    return (
        <NavigationContainer>
            {user ? <HomeStack/> : <AuthStack/>}
        </NavigationContainer>
    )
}
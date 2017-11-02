import React from 'react';
import * as firebase from 'firebase';
import { StyleSheet, Text, View, TextInput, Button, ToastAndroid } from 'react-native';

class Login extends React.Component {
    state = {
        email: '',
        password: '',
    }

    signIn = () => {
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .catch(err => {
                if (err.code === 'auth/invalid-email') {
                    ToastAndroid.show('Invalid Email', ToastAndroid.SHORT);
                } else if (err.code === 'auth/user-not-found') {
                    ToastAndroid.show('User Not Found', ToastAndroid.SHORT);
                } else if (err.code === 'auth/wrong-password') {
                    ToastAndroid.show('Invalid Password', ToastAndroid.SHORT);
                }
            });
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.loginCard}>
                    <Text style={styles.header}>Login</Text>
                    <View style={styles.content}>
                        <TextInput
                            placeholder="Email"
                            placeholderTextColor="#999"
                            value={this.state.email}
                            onChangeText={(value) => this.setState({ email: value })}
                            style={[styles.text, styles.input]}
                            underlineColorAndroid="#EEE"
                            returnKeyType="next"
                        />
                        <TextInput
                            placeholder="Password"
                            placeholderTextColor="#999"
                            value={this.state.password}
                            onChangeText={(value) => this.setState({ password: value })}
                            style={[styles.text, styles.input]}
                            underlineColorAndroid="#EEE"
                            returnKeyType="next"
                            secureTextEntry
                        />
                        <Button style={styles.input} title="Sign In" color="#4CAF50" onPress={this.signIn} />
                    </View>
                </View>
            </View>
        );
    }
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#444',
        alignItems: 'stretch',
        justifyContent: 'center',
        padding: 30,
    },
    loginCard: {
        elevation: 10,
        backgroundColor: '#555',
        borderRadius: 10,
    },
    header: {
        backgroundColor: '#2a2a2a',
        color: '#EEE',
        padding: 20,
        fontSize: 30,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        fontWeight: 'bold',
    },
    content: {
        paddingHorizontal: 20,
        paddingVertical: 40,
    },
    text: {
        fontSize: 18,
        paddingBottom: 10,
        paddingLeft: 5,
    },
    input: {
        color: '#EEE',
        marginBottom: 40,
    },
});

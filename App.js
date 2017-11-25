import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as firebase from 'firebase';
import { firebaseConfig } from './util/firebaseUtil';
import Tabs from './navigation/Tabs';
import Login from './components/Login';

export default class App extends React.Component {
    state = {
        allExpenses: null,
        month: new Date().getMonth(),
        year: 2017,
    }

    componentWillMount() {
        firebase.initializeApp(firebaseConfig);
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.loadExpenses();
            }
        });
    }

    loadExpenses = () => {
        firebase.database().ref(`expenses/${this.state.year}`).on('value', (expenses) => {
            this.setState({ allExpenses: expenses.val() || [] });
        });
    }

    handleMonthChange = (month) => {
        this.setState({ month })
    }

    renderMainContent = () => {
        return (
            <View style={styles.container}>
                <View style={styles.statusBarUnderlay} />
                <Tabs screenProps={{ month: this.state.month, year: this.state.year, allExpenses: this.state.allExpenses, handleMonthChange: this.handleMonthChange }} />
            </View>
        );
    }

    render() {
        return (this.state.allExpenses && firebase.auth().currentUser)
            ? this.renderMainContent()
            : <Login />;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#444',
    },
    statusBarUnderlay: {
        height: 24,
        backgroundColor: '#2a2a2a',
    },
});

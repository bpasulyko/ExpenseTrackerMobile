import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import * as firebase from 'firebase';
import { firebaseConfig } from './util/firebaseUtil';
import Tabs from './navigation/Tabs';
import Login from './components/Login';

export default class App extends React.Component {
    state = {
        loading: true,
        allExpenses: null,
        month: new Date().getMonth(),
        year: new Date().getFullYear(),
    }

    componentWillMount() {
        firebase.initializeApp(firebaseConfig);
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.loadExpenses(this.state.year);
            } else {
                this.setState({ allExpenses: [], loading: false });
            }
        });
    }

    loadExpenses = (year) => {
        firebase.database().ref(`expenses/${year}`).on('value', (expenses) => {
            this.setState({ allExpenses: expenses.val() || [], loading: false });
        });
    }

    handleMonthChange = (month) => {
        this.setState({ month })
    }

    handleYearChange = (year) => {
        this.setState({ year }, () => this.loadExpenses(year));
    }

    renderMainContent = () => {
        const screenProps = {
            month: this.state.month,
            year: this.state.year,
            allExpenses: this.state.allExpenses,
            handleMonthChange: this.handleMonthChange,
            handleYearChange: this.handleYearChange,
        };
        if (this.state.allExpenses && firebase.auth().currentUser) {
            return (
                <View style={styles.container}>
                    <View style={styles.statusBarUnderlay} />
                    <Tabs screenProps={screenProps} />
                </View>
            );
        } else {
            return <Login />;
        }
    }

    render() {
        return (this.state.loading)
            ? (
                <View style={[styles.container, styles.spinner]}>
                    <ActivityIndicator style={[ { transform: [{ scale: 2 }] } ]} size="large" color="#EEE" />
                </View>
            )
            : this.renderMainContent();
    }
}

const styles = StyleSheet.create({
    spinner: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#444',
    },
    statusBarUnderlay: {
        height: 24,
        backgroundColor: '#2a2a2a',
    },
});

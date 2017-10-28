import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as firebase from 'firebase';
import { firebaseConfig } from './util/firebaseUtil';
import MonthSwitcher from './components/MonthSwitcher';
import Tabs from './navigation/Tabs';

const Header = ({ month, onChange }) => {
    return (
        <View style={styles.header}>
            <Text style={styles.title}>Expense Tracker</Text>
            <MonthSwitcher month={month} onChange={onChange}/>
        </View>
    );
};

export default class App extends React.Component {
    state = {
        allExpenses: {},
        month: new Date().getMonth(),
    }

    componentWillMount() {
        firebase.initializeApp(firebaseConfig);
    }

    componentDidMount() {
        firebase.database().ref('expenses').on('value', (expenses) => {
            this.setState({ allExpenses: expenses.val() });
        });
    }

    handleMonthChange = (month) => {
        this.setState({ month })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.statusBarUnderlay} />
                <Header month={this.state.month} onChange={this.handleMonthChange}/>
                <Tabs screenProps={{ month: this.state.month, allExpenses: this.state.allExpenses }} />
            </View>
        );
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
    header: {
        backgroundColor: '#2a2a2a',
        paddingHorizontal: 15,
        paddingVertical: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        flex: 2,
        color: '#EEE',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

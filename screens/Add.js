import React from 'react';
import _ from 'lodash';
import * as firebase from 'firebase';
import { StyleSheet, Text, View, Picker, TextInput, Button, ToastAndroid } from 'react-native';
import { categories } from '../util/constants';

export default class Add extends React.Component {
    state = {
        description: '',
        cost: '',
        category: categories.Mortgage.name,
        method: 0,
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.month !== this.props.screenProps.month) {
            this.setState({
                description: '',
                cost: '',
                category: categories.Mortgage.name,
                method: 0,
            });
        }
    }

    handleDescriptionChange = (value) => {
        console.log('description - ' + value);
        this.setState({ description: value });
    };

    handleCostChange = (value) => {
        console.log('cost - ' + value);
        this.setState({ cost: value });
    };

    handleCategoryChange = (value) => {
        console.log('cateogry - ' + value);
        this.setState({ category: value });
    };

    handleMethodChange = (value) => {
        console.log('method - ' + value);
        this.setState({ method: value });
    };

    handleSave = () => {
        const saveObject = { ...this.state };
        if (saveObject.description === '' || saveObject.cost === '') {
            ToastAndroid.show('Fill in all fields!', ToastAndroid.SHORT);
        } else {
            this.setState({ description: '', cost: '' });
            this.saveExpense(saveObject);
        }
    };

    saveExpense = (expense) => {
        var newPostKey = firebase.database().ref().child(this.props.screenProps.month).push().key;
        const updates = {};
        updates[`expenses/${this.props.screenProps.month}/${newPostKey}`] = {
            description: expense.description,
            cost: Number(expense.cost).toFixed(2),
            category: expense.category,
            method: (expense.category !== categories.Income.name) ? expense.method : null,
        };
        firebase.database().ref().update(updates);
        ToastAndroid.show('Expense Saved!', ToastAndroid.SHORT);
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={[styles.title, styles.input]}>Add Expense</Text>
                <Picker style={styles.input} mode="dropdown" selectedValue={this.state.category} onValueChange={this.handleCategoryChange}>
                    {_.keys(categories).map((name, index) => {
                        return <Picker.Item key={index} label={name} value={name} />;
                    })}
                </Picker>
                <TextInput
                    placeholder="Description"
                    placeholderTextColor="#999"
                    value={this.state.description}
                    onChangeText={this.handleDescriptionChange}
                    style={[styles.text, styles.input]}
                    underlineColorAndroid="#EEE"
                    returnKeyType="next"
                />
                <TextInput
                    placeholder="Cost"
                    placeholderTextColor="#999"
                    value={this.state.cost}
                    onChangeText={this.handleCostChange}
                    style={[styles.text, styles.input]}
                    underlineColorAndroid="#EEE"
                    returnKeyType="next"
                    keyboardType="numeric"
                />
                <Picker style={styles.input} mode="dropdown" selectedValue={this.state.method} onValueChange={this.handleMethodChange}>
                    <Picker.Item label="Debit" value={0} />
                    <Picker.Item label="Credit" value={1} />
                </Picker>
                <Button style={styles.input} title="Save" color="#4CAF50" onPress={this.handleSave} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#444',
        alignItems: 'stretch',
        padding: 20,
    },
    title: {
        fontSize: 20,
    },
    text: {
        fontSize: 18,
        paddingBottom: 10,
        paddingLeft: 5,
    },
    input: {
        color: '#EEE',
        marginBottom: 30,
    },
});

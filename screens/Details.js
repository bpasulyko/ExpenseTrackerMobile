import React from 'react';
import _ from 'lodash';
import * as firebase from 'firebase';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import DetailsToggle from '../components/DetailsToggle';
import Table from '../components/Table';
import { categories } from '../util/constants';
import MainHeader from '../components/MainHeader';

export default class Details extends React.Component {
    static navigationOptions = ({ navigation, screenProps }) => {
        return {
            headerTitle: (
                <MainHeader
                    month={screenProps.month}
                    onChange={screenProps.handleMonthChange}
                    onSettingsClick={() => navigation.navigate('Settings')}
                />
            ),
        };
    };

    state = {
        activeDetailsItem: 'Debit',
        landscape: false,
    }

    componentDidMount() {
        Dimensions.addEventListener('change', () => {
            const { height, width } = Dimensions.get('window');
            this.setState({ landscape: width > height });
        });
    }

    handleTogglePress = (item) => {
        this.setState({ activeDetailsItem: item });
    }

    getExpenseList = () => {
        const monthlyExpenses = this.props.screenProps.allExpenses ? _.values(this.props.screenProps.allExpenses[this.props.screenProps.month]) : [];
        if (this.state.activeDetailsItem === 'Debit') {
            return _.filter(monthlyExpenses, { method: 0 }).reverse();
        } else if (this.state.activeDetailsItem === 'Credit') {
            return _.filter(monthlyExpenses, { method: 1 }).reverse();
        } else if (this.state.activeDetailsItem === 'Income') {
            return _.filter(monthlyExpenses, { category: categories.Income.name }).reverse();
        } else {
            return [];
        }
    }

    render() {
        const items = ['Debit', 'Credit', 'Income'];
        return (
            <View style={styles.container}>
                <DetailsToggle activeItem={this.state.activeDetailsItem} onPress={this.handleTogglePress} items={items} />
                <Table
                    headers={['Category', 'Cost']}
                    data={this.getExpenseList().map(e => ({ label: e.category, values: [Number(e.cost)], description: e.description }))}
                    landscape={this.state.landscape}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#444',
        alignItems: 'center',
    },
});

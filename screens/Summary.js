import React from 'react';
import _ from 'lodash';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import DetailsToggle from '../components/DetailsToggle';
import Table from '../components/Table';
import { categories } from '../util/constants';

export default class Summary extends React.Component {
    state = {
        activeDetailsItem: 'Total',
        data: [],
    }

    componentDidMount() {
        this.buildData(this.props.screenProps);
    }

    componentWillReceiveProps(nextProps) {
        this.buildData(nextProps.screenProps);
    }

    buildData = (screenProps) => {
        const monthlyExpenses = screenProps.allExpenses ? _.values(screenProps.allExpenses[screenProps.month]) : [];
        const groupedByCategory = _.groupBy(monthlyExpenses, 'category');
        let debitTotal = 0;
        let creditTotal = 0;
        let overallTotal = 0;
        const data = _.keys(categories).filter(c => c !== 'Income').map(c => {
            const debit = _(groupedByCategory[c])
                .filter({ method: 0 })
                .map(x => Number(x.cost))
                .values()
                .sum();
            const credit = _(groupedByCategory[c])
                .filter({ method: 1 })
                .map(x => Number(x.cost))
                .values()
                .sum();
            debitTotal += debit;
            creditTotal += credit;
            overallTotal += (debit + credit);
            return {
                category: c,
                Debit: debit,
                Credit: credit,
                Total: debit + credit,
            };
        });
        data.push({
            category: 'Total',
            Debit: debitTotal,
            Credit: creditTotal,
            Total: overallTotal,
        });
        this.setState({ data });
    }

    handleTogglePress = (item) => {
        this.setState({ activeDetailsItem: item });
    }

    getTableData = () => {
        return this.state.data.map(e => {
            return {
                label: e.category,
                value: e[this.state.activeDetailsItem],
            };
        });
    }

    render() {
        const items = ['Total', 'Debit', 'Credit']; //, 'Budget'];
        return (
            <View style={styles.container}>
                <DetailsToggle activeItem={this.state.activeDetailsItem} onPress={this.handleTogglePress} items={items} />
                <Table data={this.getTableData()}/>
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

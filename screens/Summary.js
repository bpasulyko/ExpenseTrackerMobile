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
        let overallTotal = 0;
        let avgTotal = 0;
        const data = _.keys(categories).filter(c => c !== 'Income').map(c => {
            const categoryTotalPerMonth = getTotalCostForCategoryPerMonth(screenProps.allExpenses, c);
            const categoryTotalForCurrentMonth = categoryTotalPerMonth[screenProps.month];
            const categoryAveragePerMonth = _.sum(categoryTotalPerMonth) / categoryTotalPerMonth.length;
            overallTotal += categoryTotalForCurrentMonth;
            avgTotal += categoryAveragePerMonth;
            return {
                category: c,
                Total: categoryTotalForCurrentMonth,
                Avg: categoryAveragePerMonth,
            };
        });
        data.push({
            category: 'Total',
            Total: overallTotal,
            Avg: avgTotal,
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
                values: [e.Total, e.Avg],
            };
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Table headers={['Category', 'Cost', 'Avg']} data={this.getTableData()} />
            </View>
        );
    }
}

function getTotalCostForCategoryPerMonth(expenses, category) {
    return _(expenses)
        .map(expensesForMonth => {
            if (!expensesForMonth) return 0;
        	return _(expensesForMonth)
                .values()
                .filter(x => x.category === category)
                .map(c => Number(c.cost))
                .sum();
        })
        .flatten()
        .value();
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#444',
        alignItems: 'center',
    },
});

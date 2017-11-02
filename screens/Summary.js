import React from 'react';
import _ from 'lodash';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import DetailsToggle from '../components/DetailsToggle';
import { categories } from '../util/constants';

export default class Details extends React.Component {
    state = {
        activeDetailsItem: 'Total',
    }

    handleTogglePress = (item) => {
        this.setState({ activeDetailsItem: item });
    }

    render() {
        const items = ['Total', 'Debit', 'Credit', 'Budget'];
        return (
            <View style={styles.container}>
                <DetailsToggle activeItem={this.state.activeDetailsItem} onPress={this.handleTogglePress} items={items} />
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
    tableContainer: {
        flex: 1,
        alignSelf: 'stretch',
        paddingHorizontal: 10,
        marginBottom: 10,
    },
});

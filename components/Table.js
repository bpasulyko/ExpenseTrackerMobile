import React from 'react';
import _ from 'lodash';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { categories } from '../util/constants';

const Table = ({ data = [] }) => {
    const renderTableHeader = () => {
        return (
            <View style={[styles.header, styles.row]}>
                <Text style={[styles.headerCell, styles.cell]}>Category</Text>
                <Text style={[styles.headerCell, styles.cell]}>Cost</Text>
            </View>
        );
    }

    const renderTableRow = (rowData, key) => {
        const category = categories[rowData.label];
        const background = category ? category.background : '#2a2a2a';
        const textColor = category ? category.color : '#EEE';
        return (
            <View key={key} style={[styles.body, styles.row]}>
                <Text style={[styles.cell, { backgroundColor: background, color: textColor }]}>{rowData.label}</Text>
                <Text style={[styles.cell, { textAlign: 'right' }]}>{getDisplayValue(rowData.value)}</Text>
            </View>
        );
    }

    return (
        <View style={styles.tableContainer}>
            <ScrollView>
                {renderTableHeader()}
                {data.map(renderTableRow)}
            </ScrollView>
        </View>
    );
}

export default Table;

function getDisplayValue(value) {
    return value > 0 ? `$${value.toFixed(2)}` : '';
}

const styles = StyleSheet.create({
    tableContainer: {
        flex: 1,
        alignSelf: 'stretch',
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    header: {
        backgroundColor: '#2a2a2a',
    },
    headerCell: {
        color: '#EEE',
    },
    body: {
        backgroundColor: '#FFF',
    },
    row: {
        flexDirection: 'row',
    },
    cell: {
        flex: 1,
        fontWeight: 'bold',
        alignSelf: 'stretch',
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
});

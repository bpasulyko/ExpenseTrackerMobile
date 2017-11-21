import React from 'react';
import _ from 'lodash';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { categories } from '../util/constants';

const Table = ({ headers = [], data = [], landscape }) => {
    const renderTableHeader = () => {
        return (
            <View style={[styles.header, styles.row]}>
                {headers.map((header, key) => {
                    return <Text key={key} style={[styles.headerCell, styles.cell]}>{header}</Text>;
                })}
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
                {rowData.values.map((value, key) => {
                    return <Text key ={key} style={[styles.cell, styles.cost]}>{getDisplayValue(value)}</Text>;
                })}
                {rowData.description && landscape && (
                    <Text style={styles.cell}>{rowData.description}</Text>
                )}
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
    },
    header: {
        backgroundColor: '#2a2a2a',
        borderWidth: 0,
    },
    headerCell: {
        color: '#EEE',
        textAlign: 'center',
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
        borderBottomWidth: 1,
        borderBottomColor: '#DDD',
    },
    cost: {
        textAlign: 'right',
        borderLeftWidth: 1,
        borderLeftColor: '#DDD',
    },
});

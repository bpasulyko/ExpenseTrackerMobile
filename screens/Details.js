import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DetailsToggle from '../components/DetailsToggle';

export default class Details extends React.Component {
    state = {
        activeDetailsItem: 'Debit',
    }

    handleTogglePress = (item) => {
        this.setState({ activeDetailsItem: item });
    }

    render() {
        return (
            <View style={styles.container}>
                <DetailsToggle activeItem={this.state.activeDetailsItem} onPress={this.handleTogglePress} />
                <View>
                    <Text>{this.state.activeDetailsItem}</Text>
                </View>
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

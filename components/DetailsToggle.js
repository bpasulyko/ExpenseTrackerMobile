import React from 'react';
import _ from 'lodash';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

const DetailsToggle = ({ onPress, activeItem, items }) => {
    return (
        <View style={styles.container}>
            <View style={styles.buttonGroup}>
                {items.map((type, key) => {
                    const buttonStyles = [styles.button];
                    if (type === activeItem) {
                        buttonStyles.push(styles.active);
                    }
                    return <Text key={key} onPress={() => onPress(type)} style={buttonStyles}>{type}</Text>
                })}
            </View>
        </View>
    );
};

export default DetailsToggle;

const styles = StyleSheet.create({
    container: {
        alignSelf: 'stretch',
        padding: 10,
    },
    buttonGroup: {
        flexDirection: 'row',
        borderRadius: 4,
        borderColor: '#555',
        borderWidth: 2,
        backgroundColor: '#555',
    },
    button: {
        flex: 1,
        textAlign: 'center',
        fontSize: 14,
        fontWeight: 'bold',
        color: '#EEE',
        backgroundColor: '#555',
        paddingVertical: 10,
        opacity: 0.5,
    },
    active: {
        backgroundColor: '#2a2a2a',
        color: '#EEE',
        borderRadius: 4,
        opacity: 1,
    }
});

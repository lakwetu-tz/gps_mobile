import React, { useState } from 'react';
import { View, Text, Modal, TextInput, Button, StyleSheet } from 'react-native';

interface CreateRouteModalProps {
    visible: boolean;
    onClose: () => void;
    onSubmit: (formData: FormData) => void;
}

interface FormData {
    name: string;
    startLocation: string;
    endLocation: string;
    distance: string;
    duration: string;
    description: string;
}

const CreateRouteModal: React.FC<CreateRouteModalProps> = ({ visible, onClose, onSubmit }) => {
    const [name, setName] = useState('');
    const [startLocation, setStartLocation] = useState('');
    const [endLocation, setEndLocation] = useState('');
    const [distance, setDistance] = useState('');
    const [duration, setDuration] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = () => {
        const formData: FormData = { name, startLocation, endLocation, distance, duration, description };
        onSubmit(formData);
        onClose();
    };

    return (
        <Modal visible={visible} animationType="slide">
            <View style={styles.container}>
                <Text style={styles.title}>Create New Route</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={name}
                    onChangeText={setName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Start Location"
                    value={startLocation}
                    onChangeText={setStartLocation}
                />
                <TextInput
                    style={styles.input}
                    placeholder="End Location"
                    value={endLocation}
                    onChangeText={setEndLocation}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Distance"
                    value={distance}
                    onChangeText={setDistance}
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Duration"
                    value={duration}
                    onChangeText={setDuration}
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Description"
                    value={description}
                    onChangeText={setDescription}
                    multiline
                />
                <View style={styles.buttonContainer}>
                    <Button title="Cancel" onPress={onClose} color="red" />
                    <Button title="Create" onPress={handleSubmit} />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 20,
    },
});

export default CreateRouteModal;
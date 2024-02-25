import { AntDesign } from "@expo/vector-icons";
import { Button, Icon, ListItem } from "@rneui/base";
import * as React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

function renderRow(item: any) {
    return <ListItem.Swipeable bottomDivider
    leftContent={(reset) => (
        <Button
            title="Info"
            onPress={() => reset()}
            icon={{ name: 'info', color: 'white' }}
            style={{ minHeight: '100%' }}
        />
    )}
    rightContent={(reset) => (
        <Button
            title="Delete"
            onPress={() => reset()}
            icon={{ name: 'delete', color: 'white' }}
            buttonStyle={{ minHeight: '100%', backgroundColor: 'red' }}
        />
    )}
>
    <AntDesign name="team" size={24} color="black" />
    <ListItem.Content>
        <ListItem.Title>{item.key}</ListItem.Title>
    </ListItem.Content>
    <ListItem.Chevron />
</ListItem.Swipeable>
}

export default function Page() {
    const list = [
        { key: 'Devin' },
        { key: 'Dan' },
        { key: 'Dominic' },
        { key: 'Jackson' },
        { key: 'James' },
        { key: 'Joel' },
        { key: 'John' },
        { key: 'Jillian' },
        { key: 'Jimmy' },
        { key: 'Julie' },
    ];
    return (
        <View style={styles.container}>
            <FlatList
                data={list}
                renderItem={renderRow}
                keyExtractor={item => item.key}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22,
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
});

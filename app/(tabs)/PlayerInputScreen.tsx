// PlayerInputScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

interface Props {
  navigation: any;
}

const PlayerInputScreen: React.FC<Props> = ({ navigation }) => {
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');

  const startGame = () => {
    if (player1 && player2) {
      navigation.navigate('App', { player1, player2 });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Player Names</Text>
      <TextInput
        style={styles.input}
        placeholder="Player 1"
        value={player1}
        onChangeText={setPlayer1}
      />
      <TextInput
        style={styles.input}
        placeholder="Player 2"
        value={player2}
        onChangeText={setPlayer2}
      />
      <Button title="Start Game" onPress={startGame} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    padding: 10,
    marginVertical: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
  },
});

export default PlayerInputScreen;

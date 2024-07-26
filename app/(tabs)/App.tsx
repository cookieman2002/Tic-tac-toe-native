// App.tsx
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

interface Props {
  route: {
    params: {
      player1: string;
      player2: string;
    };
  };
}

const App: React.FC<Props> = ({ route }) => {
  const { player1, player2 } = route.params;
  const [board, setBoard] = useState<string[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<string>('X');
  const [winner, setWinner] = useState<string | null>(null);

  const handlePress = (index: number): void => {
    if (board[index] || winner) return;

    const newBoard = board.slice();
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const newWinner = calculateWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  const calculateWinner = (board: string[]): string | null => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (const [a, b, c] of lines) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return board.includes(null) ? null : 'Tie';
  };

  const renderCell = (index: number) => (
    <TouchableOpacity 
      key={index} 
      style={styles.cell} 
      onPress={() => handlePress(index)}
    >
      <Text style={styles.cellText}>{board[index]}</Text>
    </TouchableOpacity>
  );

  const renderBoard = () => (
    <View style={styles.board}>
      {board.map((_, index) => renderCell(index))}
    </View>
  );

  const renderMessage = () => (
    <Text style={styles.message}>
      {winner ? (winner === 'Tie' ? "It's a Tie!" : `Winner: ${winner === 'X' ? player1 : player2}`) : `Next Player: ${currentPlayer === 'X' ? player1 : player2}`}
    </Text>
  );

  return (
    <View style={styles.container}>
      {renderBoard()}
      {renderMessage()}
      {winner && <TouchableOpacity style={styles.resetButton} onPress={() => {
        setBoard(Array(9).fill(null));
        setCurrentPlayer('X');
        setWinner(null);
      }}>
        <Text style={styles.resetButtonText}>Reset Game</Text>
      </TouchableOpacity>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  board: {
    width: 300,
    height: 300,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cell: {
    width: '33.33%',
    height: '33.33%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  cellText: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  message: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
  },
  resetButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#333',
    borderRadius: 5,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default App;

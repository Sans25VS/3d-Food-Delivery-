import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Canvas } from "@react-three/fiber/native";

export default function App() {
  return (
    <View style={styles.container}>
      <Canvas camera={{ position: [0, 0, 10] }}>
        <color attach="background" args={["#512DAB"]} />
        <ambientLight intensity={0.5} />
        <directionalLight color="red" position={[0, 0, 5]} />
        <mesh>
          <boxGeometry />
          <meshStandardMaterial color="hotpink" />
        </mesh>
      </Canvas>
      <Text>Welcome to the 3D Burger App!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

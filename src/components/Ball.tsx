export default function Ball() {
  return (
    <mesh>
      <sphereGeometry args={[0.3, 16, 16]} />
      <meshNormalMaterial />
    </mesh>
  );
}

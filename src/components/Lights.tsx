export default function Lights() {
  return (
    <>
      {/* Ambient light provides soft global illumination */}
      <ambientLight intensity={1} color='#f0f0ff' />

      {/* Fill light - reduces harsh shadows */}
      <pointLight
        position={[-3, 0, 0]}
        intensity={30}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        color='#ffffff'
      />

      <pointLight
        position={[3, 0, 0]}
        intensity={30}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        color='#ffffff'
      />

      <pointLight
        position={[0, 2, 0]}
        intensity={30}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        color='#ffffff'
      />
    </>
  );
}

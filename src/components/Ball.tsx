import useStore, { BallMaterialComponent } from "../utils/State";
import { RigidBody } from "@react-three/rapier";

export default function Ball() {
  const { countDown, balls } = useStore();

  const ball = balls.find((e) => e.selected);

  return (
    <RigidBody
      colliders={"ball"}
      type={countDown < 1 ? `dynamic` : "fixed"}
      name='ball'
    >
      <mesh scale={1.1}>
        <sphereGeometry args={[0.3, 16, 16]} />
        {ball?.material.length ? (
          BallMaterialComponent(ball?.color, ball?.material)
        ) : (
          <meshNormalMaterial />
        )}
      </mesh>
    </RigidBody>
  );
}

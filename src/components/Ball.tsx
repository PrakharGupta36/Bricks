import useStore from "../utils/State";
import { RigidBody } from "@react-three/rapier";

export default function Ball() {
  const { countDown } = useStore();
  return (
    <RigidBody
      colliders={"ball"}
      type={countDown < 1 ? `dynamic` : "fixed"}
      name='ball'
    >
      <mesh>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshNormalMaterial />
      </mesh>
    </RigidBody>
  );
}

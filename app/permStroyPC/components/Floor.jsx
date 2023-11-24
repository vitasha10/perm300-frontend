import { usePlane } from '@react-three/cannon';

export const Floor = (props) => {
    const [ref] = usePlane((index) => ({ type: 'Static', mass: 0, ...props }));

    return (
        <mesh rotation={props.rotation} ref={ref}>
            <planeGeometry args={[1000, 1000]} />
            <meshStandardMaterial color={props.color} />
        </mesh>
    );
};
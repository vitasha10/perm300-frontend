import { useBox } from '@react-three/cannon';

export const BaseBox = ({ ...props }) => {
    const [ref] = useBox((index) => ({
        type: 'Static',
        mass: 1,
        onCollide: (e) => {
            //console.log(e);
        },
        ...props,
    }));

    return (
        <mesh position={props.position} ref={ref}>
            <boxGeometry args={props.args} />
            <meshStandardMaterial color={props.color} />
        </mesh>
    );
};
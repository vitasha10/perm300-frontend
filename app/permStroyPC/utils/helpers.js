import { useState, useEffect } from 'react';

export const permStroyMaterials = [
    "dirt.jpg",
    "diamond.webp",
    "gold.webp",
    "oakp_planks.webp",
    "red_wool.webp"
]

export const permStroyMaterialsKeys = { Digit1: '1', Digit2: '2', Digit3: '3', Digit4: '4', Digit5: '5', Digit0: '0' }; //, Digit6: '6', Digit7: '7', Digit8: '8', Digit9: '9', Digit0: '0'

export const usePlayerControls = () => {
    const keys = { KeyW: 'forward', KeyS: 'backward', KeyA: 'left', KeyD: 'right', Space: 'jump' };
    const moveFieldByKey = (key) => keys[key];

    const [movement, setMovement] = useState({ forward: false, backward: false, left: false, right: false, jump: false });

    useEffect(() => {
        const handleKeyDown = (e) => setMovement((m) => ({ ...m, [moveFieldByKey(e.code)]: true }));
        const handleKeyUp = (e) => setMovement((m) => ({ ...m, [moveFieldByKey(e.code)]: false }));

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    return movement;
}
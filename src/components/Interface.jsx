import { useCharacterAnimations } from "../contexts/Animations";

const Interface = () => {
    const { setAnimation, animations, } = useCharacterAnimations();
    return <div>
        {
            animations.map((animation, idx) => 
                <button key={animation} onClick={() => setAnimation(animation)}>
                    {animation}
                </button>
            )
        }

    </div>
}

export default Interface;
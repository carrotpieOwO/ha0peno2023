import { Html, useProgress } from "@react-three/drei";
import * as THREE from 'three';

export default function Loading () {
    const { progress } = useProgress();

    return (
        <Html position={new THREE.Vector3(-.1, .1, 0)}>
            <div style={{textAlign:'center', marginBottom:'20px'}}>웹사이트 준비중...</div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="120" height="120">
                <path d="M471.383 44.578C444.879 15.832 408.512 0 368.973 0c-29.555 0-56.621 9.344-80.45 27.77C276.5 37.07 265.605 48.45 256 61.73c-9.602-13.277-20.5-24.66-32.527-33.96C199.648 9.344 172.582 0 143.027 0c-39.539 0-75.91 15.832-102.414 44.578C14.426 72.988 0 111.801 0 153.871c0 43.3 16.137 82.938 50.781 124.742 30.992 37.395 75.535 75.356 127.117 119.313 17.614 15.012 37.579 32.027 58.309 50.152A30.023 30.023 0 0 0 256 455.516a30.03 30.03 0 0 0 19.785-7.43c20.73-18.129 40.707-35.152 58.328-50.172 51.575-43.95 96.117-81.906 127.11-119.305C495.867 236.81 512 197.172 512 153.867c0-42.066-14.426-80.879-40.617-109.289zm0 0" fill="url(&quot;#SvgjsLinearGradient1040&quot;)"></path>
                <defs>
                <linearGradient id="SvgjsLinearGradient1040">
                    <stop stopColor="#ee9ca7" offset="0">
                        <animate dur="1s" attributeName="offset" fill="freeze" from="0" to={progress / 100} />
                    </stop>
                    <stop stopColor="#ffdde1" offset="1">
                        <animate dur="1s" attributeName="offset" fill="freeze" from="0" to="1" />
                    </stop>
                </linearGradient>
                </defs>
            </svg>
        </Html>
    )
}
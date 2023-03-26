import { Cloud, Html, OrbitControls, ScrollControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Character from "./Character";
import Loading from "./Loading";
import { Overlay } from "./Overlay";

export default function Scene () {
    return (
        <Canvas style={{height:'100vh'}} camera={{fov:25,}} shadows >
            <Suspense fallback={<Loading />}>
                <OrbitControls enableZoom={false} />
                <ambientLight intensity={.15} position={[0.07, 0.6, -1.5]} />
                <pointLight intensity={2} position={[0, 0, -1000]} />
                <directionalLight 
                    position={[1.091, 5.913, 10.491]}
                    intensity={.9}
                    shadow-mapSize-width={1024}
                    shadow-mapSize-height={1024}
                    castShadow
                />
                <ScrollControls pages={4} damping={0.25}>
                    <Cloud speed={1} width={20} color='#FFAFBD' opacity={.5} />
                    <Overlay/>
                    <Character receiveShadow castShadow position={[1.2, -1, .4]} rotation={[0, -.2, 0]} />
                    <mesh
                        rotation={[-0.5 * Math.PI, 0, 0]}
                        position={[0, 0, 0]}
                        receiveShadow
                    >
                        <planeBufferGeometry args={[10, 10, 1, 1]}/>
                        <shadowMaterial transparent opacity={0.2} />
                    </mesh>
                </ScrollControls>  
            </Suspense>
        </Canvas>
    )
}
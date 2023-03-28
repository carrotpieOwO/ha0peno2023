import React, { useEffect, useRef, useState } from 'react'
import { useGLTF, useAnimations, useScroll, Text, RoundedBox } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { easing } from 'maath'
import useBgm from '../hooks/useBgm';

export function Model(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('./models/model.gltf')
  const { actions, mixer } = useAnimations(animations, group)
  const [ helloFinish, setHelloFinish ] = useState(false);
  const [ animation, setAnimation ] = useState('hello');
  const { speech, handleClick, setDefault } = useBgm(setAnimation);
  
  const scroll = useScroll();

  useEffect(() => {
    // hello 애니메이션 종료 직후 dance애니메이션을 실행하기 위해 애니메이션 종료를 알려준다.
    actions['hello'].clampWhenFinished = true;
    actions['hello'].repetitions = 3
    actions['reacting'].repetitions = 3

    let mixerListener;
    if(mixer) {
      mixerListener = mixer.addEventListener('finished', () => {
        setHelloFinish(true)
      })
    }
    
    return () => mixer.removeEventListener('finished', mixerListener);
  
  }, [actions, mixer]);

  useEffect(() => {
    // 애니메이션 변경 시작 & 종료 fadeIn/Out 처리
    actions[animation].reset().fadeIn(0.5).play();

    return () => actions && animation && actions[animation].fadeOut(0.5)  
  }, [animation])

  useFrame((state, delta) => {
    const r1 = scroll.range( 0/4, 1/4);
    const r2 = scroll.range( 1/4, 1/4 );
    const r3 = scroll.range( 2/4, 3/4);
    const r4 = scroll.range( 3/4, 3/4);

    if( r1 === 0) {
      // 스크롤이 최상단에 있을 경우 hello애니메이션이 종료되면 dance애니메이션을 실행시킨다.
      if(helloFinish) {
        setAnimation('dance')
        setDefault();
      }
      group.current.rotation.y = state.pointer.x + .1;

    } else if (r1 < 1) {
      // section2(about)로 넘어가기 이전까지의 애니메이션 = swim
      setAnimation('swim')
      group.current.rotation.y = state.pointer.x;
    }

    if(r1 >= 1 && r2 < 0.5 ) {
      // section2 애니메이션 = pose + 회전
      setAnimation('pose')
      group.current.rotation.y = group.current.rotation.y += 0.03
    }

    if(r1 >= 1 && r2 > 0.5 && r2 < 1 ) {
      // section3(projects)으로 넘어가기 이전까지의 애니메이션 = falling
      setAnimation('falling')
      group.current.rotation.y = state.pointer.x;
    }

    if (r3 > 0 && r3 < 0.6) {
      // section4(about)으로 넘어가기 이전까지의 애니메이션 = teeter
      setAnimation('teeter')
      group.current.rotation.y = state.pointer.x;
    }

    if(r4 > 0.3) {
      // section4(contact) 애니메이션 = sitting
      setAnimation('sitting')
      group.current.rotation.y = state.pointer.x;
    }

    // damp3(현재값, 목표값, 감쇠비율, 시간변화량)
    const targetX = Math.sin(state.pointer.x / 4) * 9;
    const targetY = 1.25 + state.pointer.y;
    const targetZ = Math.cos(state.pointer.x / 4) * 9;

    easing.damp3(state.camera.position, [targetX, targetY, targetZ], 0.5, delta)
    state.camera.lookAt(0, 0, 0)
  })

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Chloe" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
        <primitive object={nodes.mixamorigHips} />
        <skinnedMesh onClick={handleClick} rotation={[-Math.PI / 2, 0, 0]} scale={100} castShadow name="Chloe_body_lower" geometry={nodes.Chloe_body_lower.geometry} material={materials['매테리얼.003']} skeleton={nodes.Chloe_body_lower.skeleton} />
        <skinnedMesh onClick={handleClick} rotation={[-Math.PI / 2, 0, 0]} scale={100} castShadow name="Chloe_body_shoes_L" geometry={nodes.Chloe_body_shoes_L.geometry} material={materials['매테리얼.003']} skeleton={nodes.Chloe_body_shoes_L.skeleton} />
        <skinnedMesh onClick={handleClick} rotation={[-Math.PI / 2, 0, 0]} scale={100} castShadow name="Chloe_body_shoes_R" geometry={nodes.Chloe_body_shoes_R.geometry} material={materials['매테리얼.003']} skeleton={nodes.Chloe_body_shoes_R.skeleton} />
        <skinnedMesh onClick={handleClick} rotation={[-Math.PI / 2, 0, 0]} scale={100} castShadow name="Chloe_body_upper" geometry={nodes.Chloe_body_upper.geometry} material={materials['매테리얼.003']} skeleton={nodes.Chloe_body_upper.skeleton} />
        <skinnedMesh onClick={handleClick} rotation={[-Math.PI / 2, 0, 0]} scale={100} castShadow name="Chloe_hair_back_01" geometry={nodes.Chloe_hair_back_01.geometry} material={materials['hair.001']} skeleton={nodes.Chloe_hair_back_01.skeleton} />
        <skinnedMesh onClick={handleClick} rotation={[-Math.PI / 2, 0, 0]} scale={100} castShadow name="Chloe_hair_bangs_02" geometry={nodes.Chloe_hair_bangs_02.geometry} material={materials['hair.001']} skeleton={nodes.Chloe_hair_bangs_02.skeleton} />
        <skinnedMesh onClick={handleClick} rotation={[-Math.PI / 2, 0, 0]} scale={100} castShadow name="Chloe_hair_side_04" geometry={nodes.Chloe_hair_side_04.geometry} material={materials['hair.001']} skeleton={nodes.Chloe_hair_side_04.skeleton} />
        <skinnedMesh onClick={handleClick} rotation={[-Math.PI / 2, 0, 0]} scale={100} castShadow name="Chloe_head_eyebrows" geometry={nodes.Chloe_head_eyebrows.geometry} material={materials['lambert1.002']} skeleton={nodes.Chloe_head_eyebrows.skeleton} />
        <skinnedMesh onClick={handleClick} rotation={[-Math.PI / 2, 0, 0]} scale={100} castShadow name="Chloe_head_eyes_L_ball" geometry={nodes.Chloe_head_eyes_L_ball.geometry} material={materials['매테리얼.002']} skeleton={nodes.Chloe_head_eyes_L_ball.skeleton} />
        <skinnedMesh onClick={handleClick} rotation={[-Math.PI / 2, 0, 0]} scale={100} castShadow name="Chloe_head_eyes_R_ball" geometry={nodes.Chloe_head_eyes_R_ball.geometry} material={materials['매테리얼.002']} skeleton={nodes.Chloe_head_eyes_R_ball.skeleton} />
        <skinnedMesh onClick={handleClick} rotation={[-Math.PI / 2, 0, 0]} scale={100} castShadow name="Chloe_head_face" geometry={nodes.Chloe_head_face.geometry} material={materials['매테리얼.002']} skeleton={nodes.Chloe_head_face.skeleton} />
        <skinnedMesh onClick={handleClick} rotation={[-Math.PI / 2, 0, 0]} scale={100} castShadow name="Chloe_head_teeth_lower" geometry={nodes.Chloe_head_teeth_lower.geometry} material={materials['lambert1.002']} skeleton={nodes.Chloe_head_teeth_lower.skeleton} />
        <skinnedMesh onClick={handleClick} rotation={[-Math.PI / 2, 0, 0]} scale={100} castShadow name="Chloe_head_teeth_upper" geometry={nodes.Chloe_head_teeth_upper.geometry} material={materials['lambert1.002']} skeleton={nodes.Chloe_head_teeth_upper.skeleton} />
        <skinnedMesh onClick={handleClick} rotation={[-Math.PI / 2, 0, 0]} scale={100} castShadow name="Chloe_head_tongue" geometry={nodes.Chloe_head_tongue.geometry} material={materials['lambert1.002']} skeleton={nodes.Chloe_head_tongue.skeleton} />
      </group>
      {
        speech !== '' &&
          <mesh receiveShadow  position={[0, 1, 0]}>
            <RoundedBox args={[.5, .1, .1]}  material-color={'white'} />
            <Text fontSize={.04} position={[0, 0, .05]} color="black"
              font='https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@2.1/NEXON Lv2 Gothic.woff'>
                {speech}
            </Text>
          </mesh>
      }
    </group>
  )
}

useGLTF.preload('./models/model.gltf')

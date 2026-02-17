"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Stage, OrbitControls } from "@react-three/drei";
import { Suspense, useState, useEffect } from "react";
import * as THREE from "three";

function Model({ url, ...props }: { url: string } & any) {
    const { scene } = useGLTF(url) as any;
    return <primitive object={scene} {...props} />;
}

function AutoRezoom({ maxDistance = 2.5 }) {
    const { camera, controls } = useThree();

    useFrame((state, delta) => {
        // @ts-ignore
        const target = controls?.target || new THREE.Vector3(0, 0, 0);
        const dist = camera.position.distanceTo(target);

        if (dist > maxDistance) {
            const dir = new THREE.Vector3().subVectors(camera.position, target).normalize();
            const targetPos = target.clone().add(dir.multiplyScalar(maxDistance));
            camera.position.lerp(targetPos, delta * 1); // Soft spring back
        }
    });
    return null;
}

interface ProductViewer3DProps {
    modelUrl?: string;
    className?: string;
}

export function ProductViewer3D({
    modelUrl = "/MeshyCryotherapy.glb",
    className
}: ProductViewer3DProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Base classes for the container
    const containerClasses = `relative rounded-xl overflow-hidden border border-slate-800 ${className || "w-full h-[500px] bg-slate-950"}`;

    if (!mounted) {
        return <div className={`animate-pulse bg-slate-900 ${containerClasses}`} />;
    }

    return (
        <div className={containerClasses}>
            <Canvas shadows dpr={[1, 2]} camera={{ fov: 45 }}>
                <Suspense fallback={null}>
                    <Stage environment="city" intensity={0.5}>
                        <Model url={modelUrl} />
                    </Stage>
                </Suspense>

                <AutoRezoom maxDistance={3.5} />

                <OrbitControls
                    makeDefault
                    minDistance={0.4}
                    maxDistance={8} // Allow user to pull back slightly, but AutoRezoom will pull it in
                    enablePan={false}
                />
            </Canvas>
            <div className="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur border border-slate-700 px-3 py-1 rounded-full text-xs font-medium text-slate-300 pointer-events-none z-10">
                Modèle 3D Interactif
            </div>
        </div>
    );
}

useGLTF.preload("/MeshyCryotherapy.glb");

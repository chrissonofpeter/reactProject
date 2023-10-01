import { useEffect, useRef } from "react";
// import { Engine, Scene } from "babylonjs";
import * as BABYLON from '@babylonjs/core';
import './App.css';

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ antialias, engineOptions, adaptToDeviceRatio, sceneOptions, onRender, onSceneReady, ...rest }) => {
  console.log('*********************');
  console.log('SceneComponent.tsx');

  const reactCanvas = useRef(null);

  // set up basic engine and scene
  useEffect(() => {
    const { current: canvas } = reactCanvas;
    console.log('SceneComponent - useEffect');
    
    if (!canvas) return;

    const engine = new BABYLON.Engine(canvas, antialias, engineOptions, adaptToDeviceRatio);
    const scene = new BABYLON.Scene(engine, sceneOptions);

    // https://doc.babylonjs.com/features/featuresDeepDive/cameras/camera_collisions
    // scene.gravity = new BABYLON.Vector3(0, -0.15, 0);
    const assumedFramesPerSecond = 60;
    const earthGravity = -9.81;
    scene.gravity = new BABYLON.Vector3(0, earthGravity / assumedFramesPerSecond, 0);

    if (scene.isReady()) {
      /** 
       *  Creates the BABYLON scene with camera, lights, objects, etc
       */
      onSceneReady(scene);
    } else {
      scene.onReadyObservable.addOnce((scene) => onSceneReady(scene));
    }

    engine.runRenderLoop(() => {
      if (typeof onRender === "function") { 
        onRender(scene); 
      }
      scene.render();
    });

    const resize = () => {
      scene.getEngine().resize();
    };

    if (window) {
      window.addEventListener("resize", resize);
    }

    return () => {
      scene.getEngine().dispose();

      if (window) {
        window.removeEventListener("resize", resize);
      }
    };
  }, [antialias, engineOptions, adaptToDeviceRatio, sceneOptions, onRender, onSceneReady]);

  return <canvas className="babylon-div" ref={reactCanvas} {...rest} />;
};
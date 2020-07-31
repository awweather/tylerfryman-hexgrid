
import BoardPlugin from 'phaser3-rex-plugins/plugins/board-plugin.js';
import MainScene from "../scenes/mainScene";

const DEFAULT_WIDTH = 800;
const DEFAULT_HEIGHT = 600;

const config = {
    type: Phaser.AUTO,
    parent: "phaser-example",
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT,
    },
    background: "white",
    plugins: {
        scene: [{
            key: 'rexBoard',
            plugin: BoardPlugin,
            mapping: 'rexBoard'
        }]
    },
    scene: [
        MainScene
    ]
  };
  
export default config;
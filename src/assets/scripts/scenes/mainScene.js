import Phaser from "phaser";
import { Modal } from "../ui/components/modal";
import { Grid } from "../ui/components/grid";
import gridConfig from "../configs/gridConfig";

export default class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: "MainScene" });
  }

  init() {}

  preload() {}

  create() {
    this.coordinateText = this.add.text(0, 0, "").setVisible(false);

    // Modal for showing coordinates
    let modal = new Modal({
      scene: this,
      x: 0,
      y: 0,
      width: 200,
      height: 50,
    });

    this.add.existing(modal);

    // Configurable grid object
    // Makes use of rexUI HexGrid
    // Documentation https://rexrainbow.github.io/phaser3-rex-notes/docs/site/board-hexagonmap/#import-class
    const grid = new Grid({
      scene: this,
      showNumbers: false,
      height: gridConfig.height,
      width: gridConfig.width,
      primaryColor: gridConfig.primaryColor,
      lightColor: gridConfig.lightColor,
      darkColor: gridConfig.darkColor,
      coordinateText: this.coordinateText,
      // Cluster size can be configurable, however currently only distance of 1 works
      clusterSize: 1,
      showNumbers: false,
      modal: modal
    });
  }

  update() {}
}

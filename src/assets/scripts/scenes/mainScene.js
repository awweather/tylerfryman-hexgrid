import Phaser from "phaser";
import { Modal } from "../ui/components/modal";

export default class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: "MainScene" });
  }

  init() {}

  preload() {}

  create() {
    const COLOR_PRIMARY = 0x03a9f4;
    const COLOR_LIGHT = 0x67daff;
    const COLOR_DARK = 0x007ac1;

    let modal = new Modal({
      scene: this,
      x: 0,
      y: 0,
      width: 200,
      height: 50,
    });

    this.add.existing(modal);
    // this.coordinates = this.modal.addText(0, 0, "");
    const coordinateText = this.add.text(0, 0, "").setVisible(false);
    const rectangle = this.add
      .rectangle(0, 0, 300, 50, 0xaaa9a8)
      .setVisible(false);

    var staggeraxis = "y";
    var staggerindex = "odd";
    var board = this.rexBoard.add
      .board({
        grid: {
          gridType: "hexagonGrid",
          x: 60,
          y: 60,
          size: 30,
          staggeraxis: staggeraxis,
          staggerindex: staggerindex,
        },
      })
      .setInteractive({ useHandCursor: true})
      .on("tileover", function (pointer, tileXY) {
        console.log(tileXY);
        modal.show(pointer.x, pointer.y, `Coordinates: ${tileXY.x}, ${tileXY.y}`);
      })
      .on("tileout", function () {
        coordinateText.setVisible(false);
        modal.close();
      })
      .on('tiledown', function (pointer, tileXY) {
        Phaser.Actions.Call(board.tileZToChessArray(0), function (gameObject) {
            gameObject.destroy();
        });

        if (!board.contains(tileXY.x, tileXY.y)) {
            return;
        }

        this.rexBoard.add.shape(board, tileXY.x, tileXY.y, 0, COLOR_PRIMARY, 0.2).setScale(0.7);
        var resultTileXYArray = board.getTileXYAtDirection(tileXY, [0, 1, 2, 3, 4, 5], { end: 1 });
        var resultTileXY;
        for (var i = 0, cnt = resultTileXYArray.length; i < cnt; i++) {
            resultTileXY = resultTileXYArray[i];
            if (!board.contains(resultTileXY.x, resultTileXY.y)) {
                continue;
            }
            this.rexBoard.add.shape(board, resultTileXY.x, resultTileXY.y, 0, COLOR_LIGHT, 0.2).setScale(0.7);
        }
        }, this);

    var tileXYArray = board.fit(this.rexBoard.hexagonMap.hexagon(board, 4));

    var graphics = this.add.graphics({
      lineStyle: {
        width: 1,
        color: 0xffffff,
        alpha: 1,
      },
    });
    var tileXY, worldXY;
    for (var i in tileXYArray) {
      tileXY = tileXYArray[i];
      graphics.strokePoints(
        board.getGridPoints(tileXY.x, tileXY.y, true),
        true
      );

      worldXY = board.tileXYToWorldXY(tileXY.x, tileXY.y);
      this.add
        .text(worldXY.x, worldXY.y, `${tileXY.x},${tileXY.y}`)
        .setOrigin(0.5);
    }
  }

  update() {}
}

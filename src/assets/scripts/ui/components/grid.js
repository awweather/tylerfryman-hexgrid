export class Grid {
  constructor(config) {
    //#region config
    this.scene = config.scene;
    const modal = config.modal;
    const coordinateText = config.coordinateText;
    const clusterSize = config.clusterSize;
    const darkColor = config.darkColor;
    const lightColor = config.lightColor;
    const primaryColor = config.primaryColor;
    const width = config.width;
    const height = config.height;
    const showNumbers = config.showNumbers;
    //#endregion

    const gridGraphics = this.scene.add.graphics({
      lineStyle: {
        width: 1,
        color: darkColor,
        alpha: 1,
      },
    });

    this.board = this.scene.rexBoard.add
      .board({
        grid: this.getHexagonGrid(this.scene),
        width: width,
        height: height,
      })
      .forEachTileXY(function (tileXY, board) {
        const points = board.getGridPoints(tileXY.x, tileXY.y, true);
        gridGraphics.strokePoints(points, true);
        const worldXY = board.tileXYToWorldXY(tileXY.x, tileXY.y);
        if (showNumbers) {
          this.scene.add
            .text(worldXY.x, worldXY.y, `${tileXY.x},${tileXY.y}`, {
              fontSize: "10px",
            })
            .setOrigin(0.5);
        }
      }, this);

    // SetInteractive
    // Adding EventHandlers
    this.board
      .setInteractive({ useHandCursor: true })
      .on("tileover", function (pointer, tileXY) {
        console.log(tileXY);
        modal.show(
          pointer.x,
          pointer.y,
          `Coordinates: ${tileXY.x}, ${tileXY.y}`
        );
      })
      .on("tileout", function () {
        coordinateText.setVisible(false);
        modal.close();
      })
      .on(
        "tiledown",
        function (pointer, tileXY) {
          modal.close();
          Phaser.Actions.Call(this.board.tileZToChessArray(0), function (
            gameObject
          ) {
            gameObject.destroy();
          });

          if (!this.board.contains(tileXY.x, tileXY.y)) {
            return;
          }

          this.scene.rexBoard.add
            .shape(
              this.board,
              tileXY.x,
              tileXY.y,
              0,
              primaryColor,
              0.2
            )
            .setScale(0.7);

          // [0, 1, 2, 3, 4, 5] are the directions from the selected tile
          let resultTileXYArray = this.board.getTileXYAtDirection(
            tileXY,
            [0, 1, 2, 3, 4, 5],
            // The number of nodes outwards from the original
            { end: clusterSize }
          );

          let resultTileXY;
          for (var i = 0, cnt = resultTileXYArray.length; i < cnt; i++) {
            resultTileXY = resultTileXYArray[i];
            if (!this.board.contains(resultTileXY.x, resultTileXY.y)) {
              continue;
            }
            this.scene.rexBoard.add
              .shape(
                this.board,
                resultTileXY.x,
                resultTileXY.y,
                0,
                lightColor,
                0.2
              )
              .setScale(0.7);
          }
        },
        this
      );
  }

  getHexagonGrid(scene) {
    const staggeraxis = "y";
    const staggerindex = "odd";
    const grid = scene.rexBoard.add.hexagonGrid({
      x: 50,
      y: 50,
      size: 20,
      gridType: "hexagonGrid",
      staggeraxis: staggeraxis,
      staggerindex: staggerindex,
    });

    return grid;
  }
}

import Phaser from "phaser";

export class Modal extends Phaser.GameObjects.Container {
  constructor(config) {
    super(config.scene, config.x, config.y);
    this.add(
      new Phaser.GameObjects.Rectangle(
        config.scene,
        config.x,
        config.y,
        config.width,
        config.height,
        0x2a2725,
        1.0
      )
    );

    this.hide();
  }

  show(x, y, text) {
    this.setVisible(true);

    this.setX(x).setY(y);

    this.text = new Phaser.GameObjects.Text(this.scene, 0, 0, text);

    this.add(this.text);

    this.text.setOrigin(0.5, 0.5);
  }

  hide() {
    this.setVisible(false);  
  }

  close() {
    this.setVisible(false);
    this.text?.destroy();
  }
}

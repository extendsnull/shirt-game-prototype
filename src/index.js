import Phaser from "phaser";
import mask from "./assets/mask.png";
import shirt from "./assets/shirt.png";
import shirtL1Var0 from "./assets/shirt-l1-0.png";
import shirtL1Var1 from "./assets/shirt-l1-1.png";
import shirtL1Var2 from "./assets/shirt-l1-2.png";
import shirtL1Var3 from "./assets/shirt-l1-3.png";
import shirtL1Var4 from "./assets/shirt-l1-4.png";

import holeEmpty from "./assets/hole-empty.png";
import hole1 from "./assets/hole-1.png";
import hole2 from "./assets/hole-2.png";
import hole3 from "./assets/hole-3.png";
import hole4 from "./assets/hole-4.png";
import hole5 from "./assets/hole-5.png";
import hole6 from "./assets/hole-6.png";
import hole7 from "./assets/hole-7.png";
import hole8 from "./assets/hole-8.png";
import hole9 from "./assets/hole-9.png";
import hole10 from "./assets/hole-10.png";
import hole11 from "./assets/hole-11.png";
import hole12 from "./assets/hole-12.png";
import hole13 from "./assets/hole-13.png";

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 400,
  height: 400,
  backgroundColor: 0x4B7669,
  scene: {
    preload: preload,
    create: create
  },
};

const game = new Phaser.Game(config);

function preload() {
  this.load.image("mask", mask);
  this.load.image("shirt", shirt);
  this.load.image("shirt-l1-0", shirtL1Var0);
  this.load.image("shirt-l1-1", shirtL1Var1);
  this.load.image("shirt-l1-2", shirtL1Var2);
  this.load.image("shirt-l1-3", shirtL1Var3);
  this.load.image("shirt-l1-4", shirtL1Var4);
  this.load.image("hole-empty", holeEmpty);
  this.load.image("hole-1", hole1);
  this.load.image("hole-2", hole2);
  this.load.image("hole-3", hole3);
  this.load.image("hole-4", hole4);
  this.load.image("hole-5", hole5);
  this.load.image("hole-6", hole6);
  this.load.image("hole-7", hole7);
  this.load.image("hole-8", hole8);
  this.load.image("hole-9", hole9);
  this.load.image("hole-10", hole10);
  this.load.image("hole-11", hole11);
  this.load.image("hole-12", hole12);
  this.load.image("hole-13", hole13);
}

function create() {
  const shirt = this.add.image(0, 0, "shirt")
    .setOrigin(0);

  const maskSrc = this.add.image(0, 0, "mask")
    .setOrigin(0)
    .setVisible(false);

  const backgroundColor = 0x4B7669;

  const amount = 48;

  // const grid = [
  //   0, 0, 0, 0, 0, 0,
  //   0, 1, 0, 0, 1, 0,
  //   0, 1, 1, 1, 1, 0,
  //   1, 1, 1, 1, 1, 1,
  //   0, 1, 1, 1, 1, 0,
  //   0, 1, 1, 1, 1, 0,
  //   0, 1, 1, 1, 1, 0,
  //   0, 1, 1, 1, 1, 0,
  // ];

  this.levelSettings = [
    {
      level: 1,
      defaultHolesMin: 2,
      defaultHolesMax: 3,
    },
    {
      level: 2,
      defaultHolesMin: 1,
      defaultHolesMax: 3,
      transparentHolesMin: 1,
      transparentHolesMax: 3,
    },
    {
      level: 3,
      defaultHolesMin: 1,
      defaultHolesMax: 3,
      transparentHolesMin: 1,
      transparentHolesMax: 3,
    },
  ];

  this.currentLevel = this.levelSettings[0];

  const updateCounter = () => {
    document.getElementById('counter').textContent = this.currentLevel.level;
  };

  const grid = [
    0, 0, 0, 0, 0, 0,
    0, 1, 0, 0, 1, 0,
    0, 1, 1, 1, 1, 0,
    1, 1, 1, 1, 1, 1,
    0, 0, 1, 1, 1, 0,
    0, 1, 1, 1, 0, 0,
    0, 0, 1, 1, 1, 0,
    0, 1, 1, 1, 0, 0,
  ];

  this.shirts = [
    {
      img: 'shirt-l1-0',
      color: 0xB27B49,
      border: 0x966640,
    },
    {
      img: 'shirt-l1-1',
      color: 0x5A7F41,
      border: 0x4C6836,
    },
    {
      img: 'shirt-l1-2',
      color: 0x4E70DD,
      border: 0x3C65B5,
    },
    {
      img: 'shirt-l1-3',
      color: 0xD8533D,
      border: 0xBC4535,
    },
    {
      img: 'shirt-l1-4',
      color: 0xFF4B85,
      border: 0xD83982,
    },
  ];

  const getRandomShirt = () => {
    this.shirtSettings = Phaser.Utils.Array.GetRandom(this.shirts);
  };

  const create = () => {
    updateCounter();
    getRandomShirt();

    shirt.setTexture(this.shirtSettings.img).setOrigin(0);

    const group = grid.map(item => {
      if (item) {
        const scale = Phaser.Math.Between(75, 100) / 100;
        const rotation = Phaser.Math.Between(0, 400) / 100;
  
        const sprite = this.add.image(0, 0, 'hole-empty');
        // sprite.setScale(scale);
        sprite.setRotation(rotation);
        sprite.setDepth(2);
        sprite.setVisible(false);
  
        return sprite;
      }
  
      return false;
    });
    
    Phaser.Actions.GridAlign(group, {
      width: 6,
      height: 8,
      cellWidth: 32,
      cellHeight: 32,
      x: 16,
      y: 16
    });

    this.items = group.filter(Boolean);
    const items = this.items.slice();

    for (let i = 0; i < Phaser.Math.Between(
      this.currentLevel.defaultHolesMin,
      this.currentLevel.defaultHolesMax); i++) {
      const sprite = Phaser.Utils.Array.RemoveRandomElement(items);
      sprite.setVisible(true);
      sprite.setTexture(`hole-${Phaser.Math.Between(1, 13)}`);
      sprite.setTint(this.shirtSettings.color);
      const mask = sprite.createBitmapMask(maskSrc);
      sprite.setMask(mask);
    }
    
    for (let i = 0; i < Phaser.Math.Between(
      this.currentLevel.transparentHolesMin,
      this.currentLevel.transparentHolesMax); i++) {
      const sprite = Phaser.Utils.Array.RemoveRandomElement(items);
      sprite.setVisible(true);
      sprite.setTexture(`hole-${Phaser.Math.Between(1, 13)}`);
      sprite.setTint(backgroundColor);
      const mask = sprite.createBitmapMask(maskSrc);
      sprite.setMask(mask);
    }
  };

  const destroy = () => {
    this.items.forEach(item => item.destroy());
  };

  const reset = () => {
    destroy();
    create();
  };

  create();

  document.getElementById('reset').onclick = reset;

  document.getElementById('up-level').onclick = () => {
    const index = this.levelSettings.indexOf(this.currentLevel)

    if (index < this.levelSettings.length - 1) {
      this.currentLevel = this.levelSettings[index + 1];
      reset();
    }

  };

  document.getElementById('down-level').onclick = () => {
    const index = this.levelSettings.indexOf(this.currentLevel)

    if (index !== 0) {
      this.currentLevel = this.levelSettings[index - 1];
      reset();
    }

  };
}
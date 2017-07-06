import React from "react";
import * as PIXI from "pixi.js";

var Container = PIXI.Container;
var autoDetectRenderer = PIXI.autoDetectRenderer;
var loader = PIXI.loader;
var resources = PIXI.loader.resources;
var Sprite = PIXI.Sprite;

export default class Template extends React.Component {
  constructor(props) {
    super(props);
    //    this.app = new PIXI.Application();
    //  PIXI.utils.sayHello("hellos");
  }
  checkSupport = () => {
    var type = "WebGL";
    if (!PIXI.utils.isWebGLSupported()) {
      type = "canvas";
    }
    PIXI.utils.sayHello(type);
  };
  initRender = () => {
    this.renderer = autoDetectRenderer(512, 512);
    /*
    this.renderer.backgroundColor = 0x061639;
    */
    this.renderer.view.style.position = "absolute";
    this.renderer.view.style.display = "block";
    this.renderer.autoResize = true;

    // this.renderer.resize(window.innerWidth, window.innerHeight);
    this.renderer.resize(window.innerWidth, window.innerWidth);

    this.refs.container.appendChild(this.renderer.view);
  };

  loadImage = () => {
    //   var demo = PIXI.utils.TextureCache["static/img/test.png"];
    this.sprite = new Sprite(resources[this.assetPath("test.png")].texture);
    //   sprite.x = 100;
    //   sprite.y = 100;
    //    sprite.width = window.innerWidth;
    //    sprite.height = window.innerWidth;
    this.sprite.scale.set(0.5, 0.5);
    this.sprite.vx = 0;
    this.sprite.vy = 0;
    this.stage = new Container();
    this.stage.addChild(this.sprite);
    this.imageState();
    this.moveLoop();
    //this.renderer.render(this.stage);
    console.log("image is loaded");
  };

  imageState = () => {
    this.play();
  };

  play = () => {
    this.sprite.x += this.sprite.vx;
    this.sprite.y += this.sprite.vy;
  };

  moveLoop = () => {
    requestAnimationFrame(this.moveLoop);
    /*this.sprite.vx = 1;
    this.sprite.vy = 1;

    this.sprite.x += this.sprite.vx;
    this.sprite.y += this.sprite.vy;
*/
    this.keyControl();
    this.imageState();
    this.renderer.render(this.stage);
  };

  keyControl = () => {
    var left = this.keyboard(37);
    var up = this.keyboard(38);
    var right = this.keyboard(39);
    var down = this.keyboard(40);
    left.press = () => {
      this.sprite.vx = -5;
      this.sprite.vy = 0;
    };
    left.release = () => {
      if (!right.isDown && this.sprite.vy === 0) {
        this.sprite.vx = 0;
      }
    };
    up.press = () => {
      this.sprite.vx = 0;
      this.sprite.vy = -5;
    };
    up.release = () => {
      if (!down.isDown && this.sprite.vx === 0) {
        this.sprite.vy = 0;
      }
    };
    right.press = () => {
      this.sprite.vx = 5;
      this.sprite.vy = 0;
    };
    right.release = () => {
      if (!left.isDown && this.sprite.vy === 0) {
        this.sprite.vx = 0;
      }
    };
    down.press = () => {
      this.sprite.vx = 0;
      this.sprite.vy = 5;
    };
    down.release = () => {
      if (!up.isDown && this.sprite.vx === 0) {
        this.sprite.vy = 0;
      }
    };
  };

  keyboard = keyCode => {
    var key = {};
    key.code = keyCode;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;

    key.downHandler = event => {
      if (event.keyCode == key.code) {
        if (key.isUp && key.press) {
          key.press();
        }
        key.isDown = true;
        key.isUp = false;
      }
      event.preventDefault();
    };
    key.upHandler = event => {
      if (event.keyCode == key.code) {
        if (key.isDown && key.release) {
          key.release();
        }
        key.isDown = false;
        key.isUp = true;
      }
      event.preventDefault();
    };
    window.addEventListener("keydown", key.downHandler.bind(key), false);
    window.addEventListener("keyup", key.upHandler.bind(key), false);
    return key;
  };

  loadProgressHandler = (loader, resource) => {
    console.log(
      "loading: " + resource.url,
      "| progress:" + loader.progress + "%"
    );
  };

  componentDidMount() {
    this.checkSupport();
    this.initRender();
    loader
      .add(this.assetPath("test.png"))
      .on("progress", this.loadProgressHandler)
      .load(this.loadImage);
  }

  assetPath = filename => {
    return "/static/img/" + filename;
  };

  render() {
    return <div ref="container" />;
  }
}

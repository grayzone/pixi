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
    this.stage = new Container();
    this.stage.addChild(this.sprite);
    this.moveLoop();
    //this.renderer.render(this.stage);
    console.log("image is loaded");
  };

  moveLoop = () => {
    requestAnimationFrame(this.moveLoop);
    this.sprite.x += 1;
    this.renderer.render(this.stage);
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

package main

import (
	"github.com/astaxie/beego"
	_ "github.com/grayzone/pixi/routers"
)

func main() {
	beego.Run()
}

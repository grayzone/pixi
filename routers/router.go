package routers

import (
	"github.com/astaxie/beego"
	"github.com/grayzone/pixi/controllers"
)

func init() {
	beego.Router("/", &controllers.MainController{})
}

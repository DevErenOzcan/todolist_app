package routes

import (
	"github.com/gin-gonic/gin"
	"todo_list_project/controllers"
	"todo_list_project/middleware"
)

func MainRoutes(router *gin.Engine) {
	router.GET("/", controller.Index)
	router.POST("/", controller.Login)
	router.GET("/todo", controller.Todo)
	router.GET("/todo/:todo_id", controller.Step)
}

func Apis(router *gin.Engine) {
	app := router.Group("/api")
	app.Use(middleware.JWTMiddleware("!!!!!**********privia_hub**********!!!!!"))

	{
		// todos
		app.GET("/todo", controller.GetAllTodos)
		app.POST("/todo", controller.CreateTodo)
		app.GET("/todo/:id", controller.GetTodoByID)
		app.PUT("/todo/:id", controller.UpdateTodo)
		app.DELETE("/todo/:id", controller.DeleteTodo)

		// steps with todo_id
		app.GET("/step/tid/:todo_id", controller.GetStepsByTodoID)
		app.POST("/step/tid/:todo_id", controller.CreateStep)

		// steps with step_id
		app.GET("/step/sid/:step_id", controller.GetStepByID)
		app.PUT("/step/sid/:step_id", controller.UpdateStep)
		app.DELETE("/step/sid/:step_id", controller.DeleteStep)
	}
}

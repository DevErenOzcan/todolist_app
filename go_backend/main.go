package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"time"
	"todo_list_project/routes"
)

func main() {
	r := gin.Default()

	// CORS middleware'i uygula
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"}, // React uygulamanın adresi
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	// Route'ları bağla
	routes.MainRoutes(r)
	routes.Apis(r)

	// Sunucuyu başlat
	r.Run(":8080")
}

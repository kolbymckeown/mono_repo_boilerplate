package database

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"

	"backend/models"
)

func InitializeDb() *gorm.DB {
	dbHost := os.Getenv("DB_HOST")
	dbPort := os.Getenv("DB_PORT")
	dbUser := os.Getenv("DB_USER")
	dbName := os.Getenv("DB_NAME")
	dbPassword := os.Getenv("DB_PASSWORD")

	dsn := fmt.Sprintf("host=%s port=%s user=%s dbname=%s password=%s sslmode=require TimeZone=UTC", 
			dbHost, dbPort, dbUser, dbName, dbPassword)
	db, dbError := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if dbError != nil {
		log.Fatal(dbError)
	}

	// Automatically create tables based on the model
	db.AutoMigrate(&models.User{})


	return db
}

func DbMiddleware(db *gorm.DB) func(http.Handler) http.Handler {
    return func(next http.Handler) http.Handler {
        return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
            ctx := context.WithValue(r.Context(), "db", db)
            next.ServeHTTP(w, r.WithContext(ctx))
        })
    }
}

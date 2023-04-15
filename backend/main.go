package main

import (
	"log"
	"net/http"
	"os"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/joho/godotenv"

	"backend/database"
	"backend/jwt"
	"backend/routes"
)

func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Set the Access-Control-Allow-Origin header
		w.Header().Set("Access-Control-Allow-Origin", os.Getenv("ALLOWED_ORIGIN"))

		// Set the Access-Control-Allow-Methods header
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")

		// Set the Access-Control-Allow-Headers header
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		// Check if the request method is OPTIONS, if it is, write an empty response
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		// Call the next handler in the chain
		next.ServeHTTP(w, r)
	})
}

func main() {
	// Load environment variables from .env file
	godotenv.Load()

	port := "5000"

	if fromEnv := os.Getenv("PORT"); fromEnv != "" {
		port = fromEnv
	}

	log.Printf("Starting up on http://localhost:%s", port)

	db := database.InitializeDb()

	// Setup router
	r := chi.NewRouter()

	// Setup Middleware
	r.Use(middleware.Logger)
	r.Use(corsMiddleware)
	r.Use(database.DbMiddleware(db))
	r.Use(jwt.SetJwtTokenAuth)

	

	// Define Routes
	r.Mount("/user", routes.UserResource{}.Routes())

	// Run the Server
	log.Fatal(http.ListenAndServe(":" + port, r))
}

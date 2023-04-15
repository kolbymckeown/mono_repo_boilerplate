package routes

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/jwtauth/v5"
	"gorm.io/gorm"

	"backend/jwt"
	"backend/models"
)

type UserResource struct{}

func (rs UserResource) Routes() chi.Router {
	r := chi.NewRouter()

	r.Get("/{uid}", rs.Get)       // GET /user/{uid} - Get user data by :uid.
	r.Post("/", rs.Create)  // POST /user - Create a new user.

	r.Group(func(r chi.Router) {
		r.Use(jwt.JwtAuth)

		r.Put("/", rs.Update) // PUT /user - Update a single user by :uid.
		r.Delete("/", rs.Delete) // PUT /user - Update a single user by :uid.
	})

	return r
}

func (rs UserResource) Get(w http.ResponseWriter, r *http.Request) {
	db := r.Context().Value("db").(*gorm.DB)

	tokenAuth := r.Context().Value("token-auth").(*jwtauth.JWTAuth)

	userID := chi.URLParam(r, "uid")
	fmt.Println(userID)

	// Query user from database
	var user models.User
	result := db.Find(&user, "user_id = ?", userID)
	
	if result.Error != nil {
		http.Error(w, "User not found", http.StatusNotFound)
		return
	}

	// Generate a JWT token for the current user
	_, tokenString, err := tokenAuth.Encode(map[string]interface{}{"user_id": user.ID})

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Include the token in the JSON response
	response := map[string]interface{}{
		"user":       user,
		"token":      tokenString,
	}

	json.NewEncoder(w).Encode(response)
}


func (rs UserResource) Create(w http.ResponseWriter, r *http.Request) {
	db := r.Context().Value("db").(*gorm.DB)

	tokenAuth := r.Context().Value("token-auth").(*jwtauth.JWTAuth)

	var user models.User
	json.NewDecoder(r.Body).Decode(&user)
	db.Create(&user)

	// Generate a JWT token for the new user
	_, tokenString, err := tokenAuth.Encode(map[string]interface{}{"user_id": user.ID})

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Include the token in the JSON response
	response := map[string]interface{}{
		"user":       user,
		"token":      tokenString,
	}

	json.NewEncoder(w).Encode(response)
}

func (rs UserResource) Update(w http.ResponseWriter, r *http.Request) {
	db := r.Context().Value("db").(*gorm.DB)
	claims := r.Context().Value("jwt-claims").(map[string]interface{})

	userID := claims["user_id"].(string)


	// Query user from database
	var user models.User
	result := db.Find(&user, "user_id = ?", userID)
	if result.Error != nil {
		http.Error(w, "User not found", http.StatusNotFound)
		return
	}

	// Decode JSON request body into a user object
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Update user in the database
	result = db.Save(&user)
	if result.Error != nil {
		http.Error(w, "Error updating user", http.StatusInternalServerError)
		return
	}

	// Return updated user as JSON response
	json.NewEncoder(w).Encode(user)
}

func (rs UserResource) Delete(w http.ResponseWriter, r *http.Request) {
	db := r.Context().Value("db").(*gorm.DB)
	claims := r.Context().Value("jwt-claims").(map[string]interface{})

	userID := claims["user_id"].(string)

	// Check if the user exists
	var user models.User

	result := db.First(&user, userID)

	if result.Error != nil {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	// Delete the user
	db.Delete(&user)

	w.WriteHeader(http.StatusNoContent)
}


package jwt

import (
	"os"
	"net/http"
	"context"

	"github.com/go-chi/jwtauth/v5"
	"github.com/joho/godotenv"
	"github.com/go-chi/chi/v5"
)

var tokenAuth *jwtauth.JWTAuth

func init() {
    godotenv.Load()

	tokenAuth = jwtauth.New("HS256", []byte(os.Getenv("JWT_SECRET")), nil)
}

func SetJwtTokenAuth(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		ctx := context.WithValue(r.Context(), "token-auth", tokenAuth)
		
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

func setJwtClaims(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		_, claims, err := jwtauth.FromContext(r.Context())
	
		if err != nil {
			http.Error(w, http.StatusText(http.StatusUnauthorized), http.StatusUnauthorized)
			return
		}
		
		ctx := context.WithValue(r.Context(), "jwt-claims", claims)
		
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}	

func JwtAuth(next http.Handler) http.Handler {
	return chi.Chain(
		jwtauth.Verifier(tokenAuth),
		jwtauth.Authenticator,
		setJwtClaims,
	).Handler(next)
}

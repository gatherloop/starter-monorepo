package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"starter-monorepo/apps/server/config"
	"starter-monorepo/apps/server/config/database"
	"starter-monorepo/apps/server/core/module"
	"starter-monorepo/apps/server/core/repository"
	"starter-monorepo/apps/server/handler"
	"starter-monorepo/libs/api/middlewares"

	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
)

func optionsHandler(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("success"))
}

func main() {
	godotenv.Load()

	// get config
	cfg := config.Get()

	// init database
	db := database.Init(cfg)

	contactRepo := repository.NewContactRepository(db)
	contactUsecase := module.NewContactUsecase(contactRepo)
	contactHandler := handler.NewContactHandler(contactUsecase)

	mux := mux.NewRouter()
	mux.HandleFunc("/contacts", contactHandler.CreateContact).Methods("POST")
	mux.HandleFunc("/contacts", contactHandler.GetContactList).Methods("GET")
	mux.HandleFunc("/contacts/{id}", contactHandler.GetContactByID).Methods("GET")
	mux.HandleFunc("/contacts/{id}", contactHandler.UpdateContactByID).Methods("PUT")
	mux.PathPrefix("/").HandlerFunc(optionsHandler).Methods("OPTIONS")

	muxWithMiddlewares := middlewares.NewCorsMiddleware(mux.ServeHTTP)

	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%s", os.Getenv("SERVER_PORT")), muxWithMiddlewares))
}

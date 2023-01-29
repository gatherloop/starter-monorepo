package main

import (
  "course-explorer-monorepo/apps/server/config"
  "course-explorer-monorepo/apps/server/config/database"
  "course-explorer-monorepo/apps/server/core/module"
  "course-explorer-monorepo/apps/server/core/repository"
  "course-explorer-monorepo/apps/server/handler"
  "fmt"
  "github.com/gorilla/mux"
  "github.com/joho/godotenv"
  "log"
  "net/http"
  "os"
)

func main() {
  err := godotenv.Load()
  if err != nil {
    log.Fatal("Error loading .env file")
  }

  // get config
  cfg := config.Get()

  // init database
  db := database.Init(cfg)

  contactRepo := repository.NewContactRepository(db)
  contactUsecase := module.NewContactUsecase(contactRepo)
  contactHandler := handler.NewContactHandler(contactUsecase)

  mux := mux.NewRouter()
  mux.HandleFunc("/contacts", contactHandler.CreateContact).Methods("POST")

  log.Fatal(http.ListenAndServe(fmt.Sprintf(":%s", os.Getenv("SERVER_PORT")), mux))
}

module course-explorer-monorepo

go 1.17

replace github.com/gatherloop/starter-monorepo => ./libs/api/__generated__/contract

require (
	github.com/gatherloop/starter-monorepo v0.0.0-00010101000000-000000000000
	github.com/gorilla/mux v1.8.0
	github.com/joho/godotenv v1.4.0
	gorm.io/driver/mysql v1.4.5
	gorm.io/gorm v1.24.3
)

require (
	github.com/go-sql-driver/mysql v1.7.0 // indirect
	github.com/golang/protobuf v1.5.2 // indirect
	github.com/jinzhu/inflection v1.0.0 // indirect
	github.com/jinzhu/now v1.1.5 // indirect
	golang.org/x/net v0.5.0 // indirect
	golang.org/x/oauth2 v0.4.0 // indirect
	google.golang.org/appengine v1.6.7 // indirect
	google.golang.org/protobuf v1.28.0 // indirect
)

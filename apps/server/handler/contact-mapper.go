package handler

import (
	"net/http"
	"starter-monorepo/apps/server/utils"
)

func mapUpdateContactByIDStatusCodeError(err error) int {
	switch err {
	case utils.ErrRecordNotFound:
		return http.StatusBadRequest
	default:
		return http.StatusInternalServerError
	}
}

func mapGetContactByIDStatusCodeError(err error) int {
	switch err {
	case utils.ErrRecordNotFound:
		return http.StatusBadRequest
	default:
		return http.StatusInternalServerError
	}
}

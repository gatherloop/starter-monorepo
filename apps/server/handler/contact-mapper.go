package handler

import (
	"course-explorer-monorepo/libs/api/utils"
	"net/http"
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

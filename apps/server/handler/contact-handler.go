package handler

import (
	"course-explorer-monorepo/apps/server/core/module"
	"course-explorer-monorepo/apps/server/utils/response"
	"course-explorer-monorepo/libs/api/domain"
	"encoding/json"
	"net/http"
)

type contactHandler struct {
	contactUsecase module.ContactUsecase
}

type ContactHandler interface {
	CreateContact(w http.ResponseWriter, r *http.Request)
}

func NewContactHandler(contactUsecase module.ContactUsecase) ContactHandler {
	return &contactHandler{contactUsecase}
}

func (c *contactHandler) CreateContact(w http.ResponseWriter, r *http.Request) {
	var createContactRequest domain.CreateContactRequest

	err := json.NewDecoder(r.Body).Decode(&createContactRequest)
	if err != nil {
		response.Error(w, http.StatusBadRequest, nil, err.Error())
	}

	err = c.contactUsecase.CreateContact(r.Context(), &createContactRequest)
	if err != nil {
		response.Error(w, http.StatusInternalServerError, nil, err.Error())
	}

	var noDataResponse domain.NoDataResponse
	noDataResponse.SetData(nil)
	noDataResponse.SetMessage("success create contact data")
	response.Success(w, http.StatusCreated, noDataResponse)
}

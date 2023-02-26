package handler

import (
	"encoding/json"
	"net/http"
	"starter-monorepo/apps/server/core/module"
	"starter-monorepo/apps/server/utils/response"
	"starter-monorepo/libs/api/domain"
	"strconv"

	"github.com/gorilla/mux"
)

type contactHandler struct {
	contactUsecase module.ContactUsecase
}

type ContactHandler interface {
	CreateContact(w http.ResponseWriter, r *http.Request)
	GetContactList(w http.ResponseWriter, r *http.Request)
	GetContactByID(w http.ResponseWriter, r *http.Request)
	UpdateContactByID(w http.ResponseWriter, r *http.Request)
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

func (c *contactHandler) GetContactList(w http.ResponseWriter, r *http.Request) {
	contacts, err := c.contactUsecase.GetContactsList(r.Context())
	if err != nil {
		response.Error(w, http.StatusInternalServerError, nil, err.Error())
	}

	var getContactsList domain.GetContactsList
	getContactsList.SetMessage("success get contact list data")
	getContactsList.SetData(contacts)
	response.Success(w, http.StatusOK, getContactsList)
}

func (c *contactHandler) GetContactByID(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, _ := strconv.Atoi(vars["id"])

	contact, err := c.contactUsecase.GetContactByID(r.Context(), id)
	if err != nil {
		response.Error(w, mapGetContactByIDStatusCodeError(err), nil, err.Error())
		return
	}

	var getContactByID domain.GetContactByID
	getContactByID.SetData(*contact)
	getContactByID.SetMessage("success get contact by id")
	response.Success(w, http.StatusOK, getContactByID)
}

func (c *contactHandler) UpdateContactByID(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, _ := strconv.Atoi(vars["id"])

	var contactRequest domain.CreateContactRequest
	err := json.NewDecoder(r.Body).Decode(&contactRequest)
	if err != nil {
		response.Error(w, http.StatusBadRequest, nil, err.Error())
	}

	err = c.contactUsecase.UpdateContactByID(r.Context(), id, &contactRequest)
	if err != nil {
		response.Error(w, mapUpdateContactByIDStatusCodeError(err), nil, err.Error())
		return
	}

	var noDataResponse domain.NoDataResponse
	noDataResponse.SetData(nil)
	noDataResponse.SetMessage("success update contact data")
	response.Success(w, http.StatusOK, noDataResponse)
}

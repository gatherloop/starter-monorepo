package module

import (
	"context"
	"course-explorer-monorepo/apps/server/core/repository"
	"course-explorer-monorepo/libs/api/domain"
)

type contactUsecase struct {
	contactRepo repository.ContactRepository
}

type ContactUsecase interface {
	CreateContact(ctx context.Context, contactRequest *domain.CreateContactRequest) error
}

func NewContactUsecase(contactRepo repository.ContactRepository) ContactUsecase {
	return &contactUsecase{contactRepo}
}

func (c *contactUsecase) CreateContact(ctx context.Context, contactRequest *domain.CreateContactRequest) error {
	return c.contactRepo.CreateContact(ctx, contactRequest)
}

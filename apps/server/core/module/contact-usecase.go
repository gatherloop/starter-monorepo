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
  GetContactsList(ctx context.Context) ([]domain.Contact, error)
  GetContactByID(ctx context.Context, id int) (*domain.Contact, error)
  UpdateContactByID(ctx context.Context, id int, contactRequest *domain.CreateContactRequest) error
}

func NewContactUsecase(contactRepo repository.ContactRepository) ContactUsecase {
  return &contactUsecase{contactRepo}
}

func (c *contactUsecase) CreateContact(ctx context.Context, contactRequest *domain.CreateContactRequest) error {
  return c.contactRepo.CreateContact(ctx, contactRequest)
}

func (c *contactUsecase) GetContactsList(ctx context.Context) ([]domain.Contact, error) {
  return c.contactRepo.GetContactsList(ctx)
}

func (c *contactUsecase) GetContactByID(ctx context.Context, id int) (*domain.Contact, error) {
  return c.contactRepo.GetContactByID(ctx, id)
}

func (c *contactUsecase) UpdateContactByID(ctx context.Context, id int, contactRequest *domain.CreateContactRequest) error {
  _, err := c.contactRepo.GetContactByID(ctx, id)
  if err != nil {
    return err
  }

  return c.contactRepo.UpdateContactByID(ctx, id, contactRequest)
}

package repository

import (
	"context"
	"errors"
	"starter-monorepo/apps/server/utils"
	"starter-monorepo/libs/api/domain"

	"gorm.io/gorm"
)

type contactRepository struct {
	db *gorm.DB
}

type ContactRepository interface {
	CreateContact(ctx context.Context, contactRequest *domain.CreateContactRequest) error
	GetContactsList(ctx context.Context) ([]domain.Contact, error)
	GetContactByID(ctx context.Context, id int) (*domain.Contact, error)
	UpdateContactByID(ctx context.Context, id int, contactRequest *domain.CreateContactRequest) error
}

func NewContactRepository(db *gorm.DB) ContactRepository {
	return &contactRepository{db}
}

func (c *contactRepository) CreateContact(ctx context.Context, contactRequest *domain.CreateContactRequest) error {
	return c.db.Table("contacts").Create(&contactRequest).Error
}

func (c *contactRepository) GetContactsList(ctx context.Context) ([]domain.Contact, error) {
	var contactList []domain.Contact
	err := c.db.Table("contacts").Find(&contactList).Error
	if err != nil {
		return nil, err
	}

	return contactList, nil
}

func (c *contactRepository) GetContactByID(ctx context.Context, id int) (*domain.Contact, error) {
	var contact domain.Contact
	err := c.db.Table("contacts").Where("id = ?", id).First(&contact).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, utils.ErrRecordNotFound
		}
		return nil, err
	}

	return &contact, nil
}

func (c *contactRepository) UpdateContactByID(ctx context.Context, id int, contactRequest *domain.CreateContactRequest) error {
	return c.db.Table("contacts").Where("id = ?", id).Updates(&contactRequest).Error
}

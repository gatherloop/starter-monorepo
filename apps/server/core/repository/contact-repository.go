package repository

import (
	"context"
	"course-explorer-monorepo/libs/api/domain"
	"gorm.io/gorm"
)

type contactRepository struct {
	db *gorm.DB
}

type ContactRepository interface {
	CreateContact(ctx context.Context, contactRequest *domain.CreateContactRequest) error
}

func NewContactRepository(db *gorm.DB) ContactRepository {
	return &contactRepository{db}
}

func (c *contactRepository) CreateContact(ctx context.Context, contactRequest *domain.CreateContactRequest) error {
	return c.db.Table("contacts").Create(&contactRequest).Error
}

package models

import (
	"time"
)

type User struct {
    ID        string    `gorm:"column:user_id;primaryKey" json:"uid"`
    FirstName string     `gorm:"column:first_name" json:"firstName"`
    LastName  string     `gorm:"column:last_name" json:"lastName"`
    Email     string     `gorm:"column:email;uniqueIndex" json:"email"`
    CreatedAt time.Time  `gorm:"column:created_at" json:"-"`
    UpdatedAt time.Time  `gorm:"column:updated_at" json:"-"`
}

func (User) TableName() string {
    return "users"
}

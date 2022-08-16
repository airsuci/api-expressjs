CREATE DATABASE expressjs;
use expressjs;

create table activity
(
    id         int auto_increment
        primary key,
    email      varchar(100)                       null,
    title      varchar(255)                       null,
    created_at datetime default CURRENT_TIMESTAMP null,
    updated_at datetime                           null,
    deleted_at datetime                           null
);

create table todo
(
    id                int auto_increment
        primary key,
    activity_group_id int          null,
    title             varchar(255) null,
    is_active         smallint     null,
    priority          varchar(100) null,
    created_at        datetime     null,
    updated_at        datetime     null,
    deleted_at        datetime     null
);
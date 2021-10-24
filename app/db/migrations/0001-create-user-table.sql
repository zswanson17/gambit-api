CREATE TABLE IF NOT EXISTS "User"(
    "id" bigint GENERATED ALWAYS AS IDENTITY,
    "firstName" varchar(50) NOT NULL,
    "lastName" varchar(50) NOT NULl,
    "email" varchar(100) NOT NULL,
    "password" varchar(100) NOT NULL,
    "token" text NULL,
    "createdOn" timestamp without time zone default (now() at time zone 'utc') not NULL,
    constraint pk_User primary key (id),
    constraint uk_User_email unique(email)
 );
 
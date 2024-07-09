/*===========================================================*/
/* TABLE: ETHEROOM_USER                                      */
/*===========================================================*/

CREATE TABLE IF NOT EXISTS ETHEROOM_USER (

    ID                  UUID,

    ETHEREUM_ADDRESS    VARCHAR             NOT NULL,
    ETHEREUM_PUBLIC_KEY VARCHAR             NOT NULL,
    EMAIL               VARCHAR(50)         NOT NULL,
    ROLE                VARCHAR(50)         NOT NULL,

    PROFILE_PICTURE_ID  UUID,

    CREATED_AT          TIMESTAMP           NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UPDATED_AT          TIMESTAMP           NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (ID),

    FOREIGN KEY (PROFILE_PICTURE_ID) REFERENCES ETHEROOM_MEDIA(ID)

);

DO $$
BEGIN

  BEGIN
    ALTER TABLE ETHEROOM_USER
        ADD CONSTRAINT ETHEROOM_USER_AK_ETHEREUM_ADDRESS UNIQUE (ETHEREUM_ADDRESS);
  EXCEPTION
    WHEN duplicate_table THEN
    WHEN duplicate_object THEN
      RAISE NOTICE 'Table constraint ETHEROOM_USER_AK_ETHEREUM_ADDRESS already exists';
  END;

END $$;

DO $$
BEGIN

  BEGIN
    ALTER TABLE ETHEROOM_USER
        ADD CONSTRAINT ETHEROOM_USER_AK_ETHEREUM_PUBLIC_KEY UNIQUE (ETHEREUM_PUBLIC_KEY);
  EXCEPTION
    WHEN duplicate_table THEN
    WHEN duplicate_object THEN
      RAISE NOTICE 'Table constraint ETHEROOM_USER_AK_ETHEREUM_PUBLIC_KEY already exists';
  END;

END $$;

/*===========================================================*/
/* TABLE: ETHEROOM_TOKEN                                     */
/*===========================================================*/

CREATE TABLE IF NOT EXISTS ETHEROOM_TOKEN (

    ID              UUID,

    TOKEN           VARCHAR(4)          NOT NULL,
    HASH            VARCHAR(30)         NOT NULL,
    TYPE            VARCHAR(30)         NOT NULL,
    CREATED_AT      TIMESTAMP           NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UPDATED_AT      TIMESTAMP           NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (ID)

);

DO $$
BEGIN

  BEGIN
    ALTER TABLE ETHEROOM_TOKEN
        ADD CONSTRAINT ETHEROOM_TOKEN_AK_HASH UNIQUE (HASH);
  EXCEPTION
    WHEN duplicate_table THEN
    WHEN duplicate_object THEN
      RAISE NOTICE 'Table constraint ETHEROOM_TOKEN_AK_HASH already exists';
  END;

END $$;

DO $$
BEGIN

  BEGIN
    ALTER TABLE ETHEROOM_TOKEN
        ADD CONSTRAINT ETHEROOM_TOKEN_AK_ETHEREUM_TYPE UNIQUE (TYPE);
  EXCEPTION
    WHEN duplicate_table THEN
    WHEN duplicate_object THEN
      RAISE NOTICE 'Table constraint ETHEROOM_TOKEN_AK_TYPE already exists';
  END;

END $$;

/*===========================================================*/
/* TABLE: ETHEROOM_ADDRESS                                   */
/*===========================================================*/

CREATE TABLE IF NOT EXISTS ETHEROOM_ADDRESS (

    ID              UUID,

    DESCRIPTION     VARCHAR(255),
    ZIP_CODE        VARCHAR(20),
    COUNTRY         VARCHAR(50),

    CREATED_AT      TIMESTAMP           NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UPDATED_AT      TIMESTAMP           NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (ID)
);

/*===========================================================*/
/* TABLE: ETHEROOM_CONTACT                                   */
/*===========================================================*/

CREATE TABLE IF NOT EXISTS ETHEROOM_CONTACT (

    ID                      UUID,

    PHONE                   VARCHAR(20),
    CELLPHONE               VARCHAR(20),

    CREATED_AT              TIMESTAMP           NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UPDATED_AT              TIMESTAMP           NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (ID)
);

/*===========================================================*/
/* TABLE: ETHEROOM_PERSON                                    */
/*===========================================================*/

CREATE TABLE IF NOT EXISTS ETHEROOM_PERSON (

    ID                  UUID,

    NAME                VARCHAR(100),

    USER_ID             UUID,
    ADDRESS_ID          UUID,
    CONTACT_ID          UUID,

    CREATED_AT          TIMESTAMP           NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UPDATED_AT          TIMESTAMP           NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (ID),
    FOREIGN KEY (USER_ID) REFERENCES ETHEROOM_USER(ID),
    FOREIGN KEY (ADDRESS_ID) REFERENCES ETHEROOM_ADDRESS(ID),
    FOREIGN KEY (CONTACT_ID) REFERENCES ETHEROOM_CONTACT(ID)

);

/*===========================================================*/
/* TABLE: ETHEROOM_HOTEL                                     */
/*===========================================================*/

CREATE TABLE IF NOT EXISTS ETHEROOM_HOTEL (

    ID                  UUID,

    NAME                VARCHAR(100),
    DESCRIPTION         VARCHAR(255),

    USER_ID             UUID,
    ADDRESS_ID          UUID,
    CONTACT_ID          UUID,
    THUMBNAIL_ID        UUID,

    CREATED_AT          TIMESTAMP           NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UPDATED_AT          TIMESTAMP           NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (ID),
    FOREIGN KEY (USER_ID) REFERENCES ETHEROOM_USER(ID),
    FOREIGN KEY (ADDRESS_ID) REFERENCES ETHEROOM_ADDRESS(ID),
    FOREIGN KEY (CONTACT_ID) REFERENCES ETHEROOM_CONTACT(ID),
    FOREIGN KEY (THUMBNAIL_ID) REFERENCES ETHEROOM_MEDIA(ID)

);

);
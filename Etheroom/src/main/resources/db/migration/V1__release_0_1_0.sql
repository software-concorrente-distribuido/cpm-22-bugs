/*===========================================================*/
/* TABLE: JK_USER                                            */
/*===========================================================*/

CREATE TABLE IF NOT EXISTS JK_USER (

    ID                  UUID,
    NAME                VARCHAR(50)         NOT NULL,
    ETHEREUM_ADDRESS    VARCHAR(50)         NOT NULL,
    EMAIL               VARCHAR(50)         NOT NULL,
    CREATED_AT          TIMESTAMP           NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UPDATED_AT          TIMESTAMP           NOT NULL DEFAULT CURRENT_TIMESTAMP,

    ROLE_ID             UUID                NOT NULL,

    PRIMARY KEY (ID)

);

DO $$
BEGIN

  BEGIN
    ALTER TABLE JK_USER
        ADD CONSTRAINT JK_USER_AK_ETHEREUM_ADDRESS UNIQUE (ETHEREUM_ADDRESS);
  EXCEPTION
    WHEN duplicate_table THEN
    WHEN duplicate_object THEN
      RAISE NOTICE 'Table constraint JK_USER_AK_LOGIN already exists';
  END;

END $$;

/*===========================================================*/
/* TABLE: JK_TOKEN                                           */
/*===========================================================*/

CREATE TABLE IF NOT EXISTS JK_TOKEN (

    ID              UUID,
    TOKEN           VARCHAR(4)          NOT NULL,
    HASH            VARCHAR(30)         NOT NULL,
    TYPE            VARCHAR(30)         NOT NULL,
    CREATED_AT      TIMESTAMP           NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UPDATED_AT      TIMESTAMP           NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (ID),

);

DO $$
BEGIN

  BEGIN
    ALTER TABLE JK_TOKEN
        ADD CONSTRAINT JK_TOKEN_AK_HASH UNIQUE (HASH);
  EXCEPTION
    WHEN duplicate_table THEN
    WHEN duplicate_object THEN
      RAISE NOTICE 'Table constraint JK_TOKEN_AK_HASH already exists';
  END;

END $$;

DO $$
BEGIN

  BEGIN
    ALTER TABLE JK_TOKEN
        ADD CONSTRAINT JK_TOKEN_AK_ETHEREUM_TYPE UNIQUE (TYPE);
  EXCEPTION
    WHEN duplicate_table THEN
    WHEN duplicate_object THEN
      RAISE NOTICE 'Table constraint JK_TOKEN_AK_TYPE already exists';
  END;

END $$;
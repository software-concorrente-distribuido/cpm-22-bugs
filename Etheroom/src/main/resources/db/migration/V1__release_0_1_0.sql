/*===========================================================*/
/* TABLE: ETHEROOM_USER                                      */
/*===========================================================*/

CREATE TABLE IF NOT EXISTS ETHEROOM_USER (

    ID                  UUID,
    NAME                VARCHAR(50)         NOT NULL,
    ETHEREUM_ADDRESS    VARCHAR(50)         NOT NULL,
    EMAIL               VARCHAR(50)         NOT NULL,
    ROLE                VARCHAR(50)         NOT NULL,
    CREATED_AT          TIMESTAMP           NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UPDATED_AT          TIMESTAMP           NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (ID)

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
/* TABLE: ETHEROOM_PERSON                                    */
/*===========================================================*/

CREATE TABLE IF NOT EXISTS ETHEROOM_PERSON (

    ID                  UUID,
    CREATED_AT          TIMESTAMP           NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UPDATED_AT          TIMESTAMP           NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (ID)

);

/*===========================================================*/
/* TABLE: ETHEROOM_HOTEL                                     */
/*===========================================================*/

CREATE TABLE IF NOT EXISTS ETHEROOM_HOTEL (

    ID                  UUID,
    CREATED_AT          TIMESTAMP           NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UPDATED_AT          TIMESTAMP           NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (ID)

);
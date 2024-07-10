/*===========================================================*/
/* TABLE: ETHEROOM_MEDIA                                     */
/*===========================================================*/

CREATE TABLE IF NOT EXISTS ETHEROOM_MEDIA (

    ID              UUID,

    FILENAME        VARCHAR(255)        NOT NULL,
    SIZE            BIGINT              NOT NULL,
    TYPE            VARCHAR(5)          NOT NULL,
    DATA            BYTEA               NOT NULL,

    CREATED_AT      TIMESTAMP           NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UPDATED_AT      TIMESTAMP           NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (ID)
);

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

/*===========================================================*/
/* TABLE: ETHEROOM_HOTEL_IMAGES                              */
/*===========================================================*/

CREATE TABLE IF NOT EXISTS ETHEROOM_HOTEL_IMAGES (

    ID                  UUID,

    HOTEL_ID            UUID,
    MEDIA_ID            UUID,

    CREATED_AT          TIMESTAMP           NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UPDATED_AT          TIMESTAMP           NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (ID),

    FOREIGN KEY (HOTEL_ID) REFERENCES ETHEROOM_HOTEL(ID),
    FOREIGN KEY (MEDIA_ID) REFERENCES ETHEROOM_MEDIA(ID)

);

/*===========================================================*/
/* TABLE: ETHEROOM_TOURIST_SPOT                              */
/*===========================================================*/

CREATE TABLE IF NOT EXISTS ETHEROOM_TOURIST_SPOT (

    ID                  UUID,

    TOURIST_SPOT        VARCHAR(255),

    CREATED_AT          TIMESTAMP           NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UPDATED_AT          TIMESTAMP           NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (ID)


);

/*===========================================================*/
/* TABLE: ETHEROOM_HOTEL_TOURIST_SPOTS                       */
/*===========================================================*/

CREATE TABLE IF NOT EXISTS ETHEROOM_HOTEL_TOURIST_SPOTS (

    ID                  UUID,

    HOTEL_ID            UUID,
    TOURIST_SPOT_ID     UUID,

    CREATED_AT          TIMESTAMP           NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UPDATED_AT          TIMESTAMP           NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (ID),

    FOREIGN KEY (HOTEL_ID) REFERENCES ETHEROOM_HOTEL(ID),
    FOREIGN KEY (TOURIST_SPOT_ID) REFERENCES ETHEROOM_TOURIST_SPOT(ID)

);

/*===========================================================*/
/* TABLE: ETHEROOM_HOTEL_ROOM                                */
/*===========================================================*/

CREATE TABLE IF NOT EXISTS ETHEROOM_HOTEL_ROOM (

    ID                  UUID,

    DESCRIPTION         VARCHAR(255),
    TYPE                VARCHAR(50),
    PRICE               DECIMAL(12,2),
    NUMBER              INTEGER,
    CAPACITY            INTEGER,
    AVAILABLE           BOOLEAN,

    HOTEL_ID            UUID,
    THUMBNAIL_ID        UUID,

    CREATED_AT          TIMESTAMP           NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UPDATED_AT          TIMESTAMP           NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (ID),

    FOREIGN KEY (HOTEL_ID) REFERENCES ETHEROOM_HOTEL(ID),
    FOREIGN KEY (THUMBNAIL_ID) REFERENCES ETHEROOM_MEDIA(ID)

);

/*===========================================================*/
/* TABLE: ETHEROOM_HOTEL_ROOM_IMAGES                         */
/*===========================================================*/

CREATE TABLE IF NOT EXISTS ETHEROOM_HOTEL_ROOM_IMAGES (

    ID                  UUID,

    HOTEL_ROOM_ID       UUID,
    MEDIA_ID            UUID,

    CREATED_AT          TIMESTAMP           NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UPDATED_AT          TIMESTAMP           NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (ID),

    FOREIGN KEY (HOTEL_ROOM_ID) REFERENCES ETHEROOM_HOTEL_ROOM(ID),
    FOREIGN KEY (MEDIA_ID) REFERENCES ETHEROOM_MEDIA(ID)

);

/*===========================================================*/
/* TABLE: ETHEROOM_CONVENIENCE                               */
/*===========================================================*/

CREATE TABLE IF NOT EXISTS ETHEROOM_CONVENIENCE (

    ID                  UUID,

    CONVENIENCE         VARCHAR(255),

    CREATED_AT          TIMESTAMP           NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UPDATED_AT          TIMESTAMP           NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (ID)

);

/*===========================================================*/
/* TABLE: ETHEROOM_HOTEL_ROOM_CONVENIENCES                   */
/*===========================================================*/

CREATE TABLE IF NOT EXISTS ETHEROOM_HOTEL_ROOM_CONVENIENCES (

    ID                  UUID,

    HOTEL_ROOM_ID       UUID,
    CONVENIENCE_ID      UUID,

    CREATED_AT          TIMESTAMP           NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UPDATED_AT          TIMESTAMP           NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (ID),

    FOREIGN KEY (HOTEL_ROOM_ID) REFERENCES ETHEROOM_HOTEL_ROOM(ID),
    FOREIGN KEY (CONVENIENCE_ID) REFERENCES ETHEROOM_CONVENIENCE(ID)

);

/*===========================================================*/
/* TABLE: ETHEROOM_HOTEL_CONVENIENCES                        */
/*===========================================================*/

CREATE TABLE IF NOT EXISTS ETHEROOM_HOTEL_CONVENIENCES (

    ID                  UUID,

    HOTEL_ID            UUID,
    CONVENIENCE_ID      UUID,

    CREATED_AT          TIMESTAMP           NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UPDATED_AT          TIMESTAMP           NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (ID),

    FOREIGN KEY (HOTEL_ID) REFERENCES ETHEROOM_HOTEL(ID),
    FOREIGN KEY (CONVENIENCE_ID) REFERENCES ETHEROOM_CONVENIENCE(ID)

);

/*===========================================================*/
/* TABLE: ETHEROOM_BOOKING                                   */
/*===========================================================*/

CREATE TABLE IF NOT EXISTS ETHEROOM_BOOKING (

    ID                              UUID,

    CHECK_IN                        TIMESTAMP,
    CHECK_OUT                       TIMESTAMP,
    NUMBER_OF_GUESTS                INTEGER,
    TOTAL_PRICE                     DECIMAL(12,2),
    STATUS                          VARCHAR(50),
    ETHEREUM_TRANSACTION_ADDRESS    VARCHAR(50),

    HOTEL_ROOM_ID                   UUID,
    PERSON_ID                       UUID,

    CREATED_AT                      TIMESTAMP           NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UPDATED_AT                      TIMESTAMP           NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (ID),

    FOREIGN KEY (HOTEL_ROOM_ID) REFERENCES ETHEROOM_HOTEL_ROOM(ID),
    FOREIGN KEY (PERSON_ID) REFERENCES ETHEROOM_PERSON(ID)

);

/*===========================================================*/
/* TABLE: ETHEROOM_GUEST                                     */
/*===========================================================*/

CREATE TABLE IF NOT EXISTS ETHEROOM_GUEST (

    ID                  UUID,

    NAME                VARCHAR(100),
    EMAIL               VARCHAR(50),
    PHONE               VARCHAR(20),

    BOOKING_ID          UUID,

    CREATED_AT          TIMESTAMP           NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UPDATED_AT          TIMESTAMP           NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (ID),

    FOREIGN KEY (BOOKING_ID) REFERENCES ETHEROOM_BOOKING(ID)

);
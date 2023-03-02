-- Database: carteira

DROP DATABASE IF EXISTS carteira;

CREATE DATABASE carteira
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.utf8'
    LC_CTYPE = 'en_US.utf8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;


-- Table: public.Users

DROP TABLE IF EXISTS public."Users";

CREATE TABLE IF NOT EXISTS public."Users"
(
    "Id" integer NOT NULL GENERATED BY DEFAULT AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    "Name" text COLLATE pg_catalog."default" NOT NULL,
    "Email" text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "PK_Users" PRIMARY KEY ("Id")
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Users"
    OWNER to postgres;

-- Table: public.Registries

DROP TABLE IF EXISTS public."Registries";

CREATE TABLE IF NOT EXISTS public."Registries"
(
    "Id" integer NOT NULL GENERATED BY DEFAULT AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    "Description" text COLLATE pg_catalog."default" NOT NULL,
    "Amount" numeric NOT NULL,
    "Type" integer NOT NULL,
    "Frequency" integer NOT NULL,
    "Date" date NOT NULL,
    "Obs" text COLLATE pg_catalog."default",
    "UserId" integer NOT NULL,
    CONSTRAINT "PK_Registries" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_Registries_Users_UserId" FOREIGN KEY ("UserId")
        REFERENCES public."Users" ("Id") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Registries"
    OWNER to postgres;
-- Index: IX_Registries_UserId

DROP INDEX IF EXISTS public."IX_Registries_UserId";

CREATE INDEX IF NOT EXISTS "IX_Registries_UserId"
    ON public."Registries" USING btree
    ("UserId" ASC NULLS LAST)
    TABLESPACE pg_default;



INSERT INTO "Users" ("Id","Name","Email")
VALUES (1,'Richard','richard@email.com');

INSERT INTO "Registries"("UserId","Description","Amount","Type","Frequency","Date")
  VALUES (1,'Energia elétrica',150.55,1,1,'2023-01-10');
  INSERT INTO "Registries"("UserId","Description","Amount","Type","Frequency","Date")
  VALUES (1,'Água',75.55, 1,1,'2023-01-15');
  INSERT INTO "Registries"("UserId","Description","Amount","Type","Frequency","Date")
  VALUES (1, 'Telefone',99.99, 1,1,'2023-01-23');
  INSERT INTO "Registries"("UserId","Description","Amount","Type","Frequency","Date")
  VALUES (1,'Plano de Saúde',        300.00,1,1,'2023-01-23');
  INSERT INTO "Registries"("UserId","Description","Amount","Type","Frequency","Date")
  VALUES (1,'Compras do mês',        625.78,1,1,'2023-01-23');
  INSERT INTO "Registries"("UserId","Description","Amount","Type","Frequency","Date")
  VALUES (1,'Lanche',                45.70, 1,0,  '2023-01-23');
  INSERT INTO "Registries"("UserId","Description","Amount","Type","Frequency","Date")
  VALUES (1,'Blusa',                 95.70, 1,0,  '2023-01-23');
  INSERT INTO "Registries"("UserId","Description","Amount","Type","Frequency","Date")
  VALUES (1,'Energia elétrica',      125.55,1,1,'2023-02-10');
  INSERT INTO "Registries"("UserId","Description","Amount","Type","Frequency","Date")
  VALUES (1,'Água',90.15, 1,1,'2023-02-15');
  INSERT INTO "Registries"("UserId","Description","Amount","Type","Frequency","Date")
  VALUES (1,'Telefone',              99.99, 1,1,'2023-02-23');
  INSERT INTO "Registries"("UserId","Description","Amount","Type","Frequency","Date")
  VALUES (1,'Plano de Saúde',        300.00,1,1,'2023-02-23');
  INSERT INTO "Registries"("UserId","Description","Amount","Type","Frequency","Date")
  VALUES (1,'Compras do mês',        540.00,1,1,'2023-02-25');
  INSERT INTO "Registries"("UserId","Description","Amount","Type","Frequency","Date")
  VALUES (1,'Parcela do Celular 1/5',150.99,1,0,  '2023-02-26');
  INSERT INTO "Registries"("UserId","Description","Amount","Type","Frequency","Date")
  VALUES (1,'Cinema',                45.00, 1,0,  '2023-02-23');
  INSERT INTO "Registries"("UserId","Description","Amount","Type","Frequency","Date")
  VALUES (1,'Energia elétrica',      97.00, 1,1,'2023-03-10');
  INSERT INTO "Registries"("UserId","Description","Amount","Type","Frequency","Date")
  VALUES (1,'Água',                  100.10,1,1,'2023-03-15');
  INSERT INTO "Registries"("UserId","Description","Amount","Type","Frequency","Date")
  VALUES (1,'Telefone',              99.99, 1,1,'2023-03-23');
  INSERT INTO "Registries"("UserId","Description","Amount","Type","Frequency","Date")
  VALUES (1,'Plano de Saúde',        300.00,1,1,'2023-03-23');
  INSERT INTO "Registries"("UserId","Description","Amount","Type","Frequency","Date")
  VALUES (1,'Compras do mês',        800.50,1,1,'2023-03-17');
  INSERT INTO "Registries"("UserId","Description","Amount","Type","Frequency","Date")
  VALUES (1,'Parcela do Celular 2/5',150.99,1,0,  '2023-03-18');
  INSERT INTO "Registries"("UserId","Description","Amount","Type","Frequency","Date")
  VALUES (1,'Troca de Oléo do carro',90.00, 1,0,  '2023-03-23');
  INSERT INTO "Registries"("UserId","Description","Amount","Type","Frequency","Date")
  VALUES (1,'Troca de pneu do carro',861.67, 1,0,  '2023-03-23');
  INSERT INTO "Registries"("UserId","Description","Amount","Type","Frequency","Date")
  VALUES (1,'Energia elétrica',      75.99, 1,1,'2023-04-10');
  INSERT INTO "Registries"("UserId","Description","Amount","Type","Frequency","Date")
  VALUES (1,'Água',                  80.33, 1,1,'2023-04-15');
  INSERT INTO "Registries"("UserId","Description","Amount","Type","Frequency","Date")
  VALUES (1,'Telefone',              99.99, 1,1,'2023-04-23');
  INSERT INTO "Registries"("UserId","Description","Amount","Type","Frequency","Date")
  VALUES (1,'Plano de Saúde',        300.00,1,1,'2023-04-23');
  INSERT INTO "Registries"("UserId","Description","Amount","Type","Frequency","Date")
  VALUES (1,'Compras do mês',        600.00,1,1,'2023-04-25');
  INSERT INTO "Registries"("UserId","Description","Amount","Type","Frequency","Date")
  VALUES (1,'Parcela do Celular 3/5',150.99,1,0,  '2023-04-26');
  INSERT INTO "Registries"("UserId","Description","Amount","Type","Frequency","Date")
  VALUES (1,'Ebook de React Js',     85.95, 1,0,  '2023-04-13');
  INSERT INTO "Registries"("UserId","Description","Amount","Type","Frequency","Date")
  VALUES (1,'Energia elétrica',      125.55,1,1,'2023-05-10');
  INSERT INTO "Registries"("UserId","Description","Amount","Type","Frequency","Date")
  VALUES (1,'Água',                  90.15, 1,1,'2023-05-15');
  INSERT INTO "Registries"("UserId","Description","Amount","Type","Frequency","Date")
  VALUES (1,'Telefone',              99.99, 1,1,'2023-05-23');
  INSERT INTO "Registries"("UserId","Description","Amount","Type","Frequency","Date")
  VALUES (1,'Plano de Saúde',        300.00,1,1,'2023-05-23');
  INSERT INTO "Registries"("UserId","Description","Amount","Type","Frequency","Date")
  VALUES (1,'Compras do mês',        540.00,1,1,'2023-05-25');
  INSERT INTO "Registries"("UserId","Description","Amount","Type","Frequency","Date")
  VALUES (1,'Parcela do Celular 4/5',150.99,1,0,  '2023-05-26');
  INSERT INTO "Registries"("UserId","Description","Amount","Type","Frequency","Date")
  VALUES (1,'Blusa Iron Man',        150.00,1,0,  '2023-01-23');
  INSERT INTO "Registries"("UserId","Description","Amount","Type","Frequency","Date")
  VALUES (1,'Energia elétrica',      200.00,1,1,'2023-06-10');
  INSERT INTO "Registries"("UserId","Description","Amount","Type","Frequency","Date")
  VALUES (1,'Água',                  150.00,1,1,'2023-06-15');
  INSERT INTO "Registries"("UserId","Description","Amount","Type","Frequency","Date")
  VALUES (1,'Telefone',              99.99, 1,1,'2023-06-23');
  INSERT INTO "Registries"("UserId","Description","Amount","Type","Frequency","Date")
  VALUES (1,'Plano de Saúde',        300.00,1,1,'2023-06-23');
  INSERT INTO "Registries"("UserId","Description","Amount","Type","Frequency","Date")
  VALUES (1,'Compras do mês',        559.15,1,1,'2023-06-25');
  INSERT INTO "Registries"("UserId","Description","Amount","Type","Frequency","Date")
  VALUES (1,'Parcela do Celular 5/5',150.99,1,0,  '2023-06-26');
  INSERT INTO "Registries"("UserId","Description","Amount","Type","Frequency","Date")
  VALUES (1,'Perfume',               250.00,1,0,  '2023-06-21');
  INSERT INTO "Registries"("UserId","Description","Amount","Type","Frequency","Date")
  VALUES (1,'Energia elétrica',      250.00,1,1,'2023-07-10');
  INSERT INTO "Registries"("UserId","Description","Amount","Type","Frequency","Date")
  VALUES (1,'Água',                  90.00, 1,1,'2023-07-15');
  INSERT INTO "Registries"("UserId","Description","Amount","Type","Frequency","Date")
  VALUES (1,'Telefone',              99.99, 1,1,'2023-07-23');
  INSERT INTO "Registries"("UserId","Description","Amount","Type","Frequency","Date")
  VALUES (1,'Plano de Saúde',        300.00,1,1,'2023-07-23');
  INSERT INTO "Registries"("UserId","Description","Amount","Type","Frequency","Date")
  VALUES (1,'Compras do mês',        700.00,1,1,'2023-07-25');
  INSERT INTO "Registries"("UserId","Description","Amount","Type","Frequency","Date")
  VALUES (1,'Cafeteira',             250.00,1,0,  '2023-07-26');
  INSERT INTO "Registries"("UserId","Description","Amount","Type","Frequency","Date")
  VALUES (1,'Pizza',                 60.00, 1,0,  '2023-07-19');



INSERT INTO "Registries"("UserId","Description","Amount","Type","Frequency","Date")
  VALUES (1,'Salário',     1300.52, 0, 1,  '2023-01-10' );
INSERT INTO "Registries"("UserId","Description","Amount","Type","Frequency","Date")  
  VALUES (1,'Freela',      150.13,  0, 0,    '2023-01-17' );
  INSERT INTO "Registries"("UserId","Description","Amount","Type","Frequency","Date")
  VALUES (1,'Salário',     2500.23, 0, 1,  '2023-02-10' );
  INSERT INTO "Registries"("UserId","Description","Amount","Type","Frequency","Date")
  VALUES (1,'Freela site', 900.23,  0, 0,    '2023-02-21' );
  INSERT INTO "Registries"("UserId","Description","Amount","Type","Frequency","Date")
  VALUES (1,'Freela app',  950.92,  0, 0,    '2023-02-23' );
  INSERT INTO "Registries"("UserId","Description","Amount","Type","Frequency","Date")
  VALUES (1,'Salário',     2500.25, 0, 1,  '2023-03-10' );
  INSERT INTO "Registries"("UserId","Description","Amount","Type","Frequency","Date")
  VALUES (1,'Salário',     2500.18, 0, 1,  '2023-04-10' );
  INSERT INTO "Registries"("UserId","Description","Amount","Type","Frequency","Date")
  VALUES (1,'Salário',     2500.15, 0, 1,  '2023-05-10' );
  INSERT INTO "Registries"("UserId","Description","Amount","Type","Frequency","Date")
  VALUES (1,'Salário',     2500.12, 0, 1,  '2023-06-10' );
  INSERT INTO "Registries"("UserId","Description","Amount","Type","Frequency","Date")
  VALUES (1,'Salário',     2500.00, 0, 1,  '2023-07-10' );
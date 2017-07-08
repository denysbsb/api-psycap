--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: estado; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE estado (
    "COD_IBGE_ESTADO" integer NOT NULL,
    "NOME_ESTADO" character varying(255) NOT NULL,
    "UF_ESTADO" character varying(2) NOT NULL
);


ALTER TABLE public.estado OWNER TO postgres;

--
-- Name: funcao; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE funcao (
    "COD_FUNCAO" integer NOT NULL,
    "NOME_FUNCAO" character varying
);


ALTER TABLE public.funcao OWNER TO postgres;

--
-- Name: municipio; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE municipio (
    "COD_IBGE_MUNICIPIO" integer NOT NULL,
    "NOME_MUNICIPIO" character varying(255) NOT NULL,
    "UF_ESTADO" character varying(2) NOT NULL,
    "AREA" integer,
    "POPULACAO" integer,
    "DENSIDADE" integer,
    "ALTITUDE" integer,
    "CLIMA" character varying(100),
    "PIB" integer,
    "IDH" integer,
    "PIB_PERCAPITA" integer
);


ALTER TABLE public.municipio OWNER TO postgres;

--
-- Name: programa; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE programa (
    "ID_PROGRAMA" integer NOT NULL,
    "NOME_PROGRAMA" character varying(255),
    "SIT_PROGRAMA" character varying,
    "DATA_DISPONIBILIZACAO" date,
    "ANO_DISPONIBILIZACAO" integer,
    "DT_PROG_INI_RECEB_PROP" date,
    "DT_PROG_FIM_RECEB_PROP" date,
    "DT_PROG_INI_EMENDA_PAR" date,
    "DT_PROG_FIM_EMENDA_PAR" date,
    "DT_PROG_INI_BENEF_PAR" date,
    "DT_PROG_FIM_BENEF_PAR" date,
    "MODALIDADE_PROGRAMA" character varying,
    "NATUREZA_JURIDICA_PROGRAMA" character varying,
    "UF_PROGRAMA" character varying(2),
    "EMENDA" boolean,
    "ORGAO" character varying,
    "ORGAO_EXECUTOR" character varying,
    "ATENDE" character varying,
    "QUALIFICACAO_PROPOSTA" character varying,
    "DESCRICAO" character varying,
    "OBSERVACAO" character varying,
    "CRITERIOS_DE_SELECAO" character varying,
    "OUTRAS_INFORMACOES" character varying,
    "CHAMAMENTO_PROJETO" character varying,
    "PUBLICACAO_DISPONIBILIZACAO" date,
    "PROPONENTES_ESPECIFICOS" character varying,
    "REGRAS_CONTRAPARTIDA" character varying
);


ALTER TABLE public.programa OWNER TO postgres;

--
-- Name: programa_funcao; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE programa_funcao (
    "ID_PROGRAMA" integer NOT NULL,
    "COD_FUNCAO" integer NOT NULL
);


ALTER TABLE public.programa_funcao OWNER TO postgres;

--
-- Name: programa_municipio; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE programa_municipio (
    "ID_PROGRAMA" integer NOT NULL,
    "COD_IBGE_MUNICIPIO" integer NOT NULL
);


ALTER TABLE public.programa_municipio OWNER TO postgres;

--
-- Name: pg_municipio; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY municipio
    ADD CONSTRAINT pg_municipio PRIMARY KEY ("COD_IBGE_MUNICIPIO");


--
-- Name: pk_estado; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY estado
    ADD CONSTRAINT pk_estado PRIMARY KEY ("COD_IBGE_ESTADO");


--
-- Name: pk_funcao; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY funcao
    ADD CONSTRAINT pk_funcao PRIMARY KEY ("COD_FUNCAO");


--
-- Name: pk_programa; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY programa
    ADD CONSTRAINT pk_programa PRIMARY KEY ("ID_PROGRAMA");


--
-- Name: pk_programa_funcao; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY programa_funcao
    ADD CONSTRAINT pk_programa_funcao PRIMARY KEY ("ID_PROGRAMA", "COD_FUNCAO");


--
-- Name: pk_programa_municipio; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY programa_municipio
    ADD CONSTRAINT pk_programa_municipio PRIMARY KEY ("ID_PROGRAMA", "COD_IBGE_MUNICIPIO");


--
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

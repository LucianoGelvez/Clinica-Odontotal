-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema odontotal
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema odontotal
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `odontotal` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `odontotal` ;

-- -----------------------------------------------------
-- Table `odontotal`.`domicilios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `odontotal`.`domicilios` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `calle` VARCHAR(15) NOT NULL,
  `localidad` VARCHAR(30) NOT NULL,
  `numero` VARCHAR(15) NOT NULL,
  `provincia` VARCHAR(30) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 12
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `odontotal`.`hibernate_sequence`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `odontotal`.`hibernate_sequence` (
  `next_val` BIGINT NULL DEFAULT NULL)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `odontotal`.`usuario_rol`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `odontotal`.`usuario_rol` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `rol` VARCHAR(15) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `odontotal`.`odontologos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `odontotal`.`odontologos` (
  `id` BIGINT NOT NULL,
  `apellido` VARCHAR(30) NOT NULL,
  `documento` VARCHAR(15) NOT NULL,
  `email` VARCHAR(30) NOT NULL,
  `fecha_nacimiento` DATE NOT NULL,
  `genero` VARCHAR(15) NOT NULL,
  `nombre` VARCHAR(30) NOT NULL,
  `password` VARCHAR(60) NOT NULL,
  `telefono` INT NOT NULL,
  `url_imagen` VARCHAR(255) NULL,
  `domicilio_id` BIGINT NOT NULL,
  `rol_id` BIGINT NOT NULL,
  `especialidad` VARCHAR(30) NOT NULL,
  `matricula` VARCHAR(15) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `FK_26rvgyjb6bqkek5b53qeylj5s` (`domicilio_id` ASC) VISIBLE,
  INDEX `FK_mh1nbr173s4t68d831guvqb3u` (`rol_id` ASC) VISIBLE,
  CONSTRAINT `FK_26rvgyjb6bqkek5b53qeylj5s`
    FOREIGN KEY (`domicilio_id`)
    REFERENCES `odontotal`.`domicilios` (`id`),
  CONSTRAINT `FK_mh1nbr173s4t68d831guvqb3u`
    FOREIGN KEY (`rol_id`)
    REFERENCES `odontotal`.`usuario_rol` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `odontotal`.`pacientes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `odontotal`.`pacientes` (
  `id` BIGINT NOT NULL,
  `apellido` VARCHAR(30) NOT NULL,
  `documento` VARCHAR(15) NOT NULL,
  `email` VARCHAR(30) NOT NULL,
  `fecha_nacimiento` DATE NOT NULL,
  `genero` VARCHAR(15) NOT NULL,
  `nombre` VARCHAR(30) NOT NULL,
  `password` VARCHAR(60) NOT NULL,
  `telefono` INT NOT NULL,
  `url_imagen` VARCHAR(255) NULL DEFAULT NULL,
  `domicilio_id` BIGINT NOT NULL,
  `rol_id` BIGINT NOT NULL,
  `fecha_creacion` DATETIME(6) NOT NULL,
  `validado` BIT(1) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `FK_iyj867vqmf60dwnfv2vegd333` (`domicilio_id` ASC) VISIBLE,
  INDEX `FK_c5nd5vwf8ya7ubj6k0ojnlbux` (`rol_id` ASC) VISIBLE,
  CONSTRAINT `FK_c5nd5vwf8ya7ubj6k0ojnlbux`
    FOREIGN KEY (`rol_id`)
    REFERENCES `odontotal`.`usuario_rol` (`id`),
  CONSTRAINT `FK_iyj867vqmf60dwnfv2vegd333`
    FOREIGN KEY (`domicilio_id`)
    REFERENCES `odontotal`.`domicilios` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `odontotal`.`protecistas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `odontotal`.`protecistas` (
  `id` BIGINT NOT NULL,
  `apellido` VARCHAR(30) NOT NULL,
  `documento` VARCHAR(15) NOT NULL,
  `email` VARCHAR(30) NOT NULL,
  `fecha_nacimiento` DATE NOT NULL,
  `genero` VARCHAR(15) NOT NULL,
  `nombre` VARCHAR(30) NOT NULL,
  `password` VARCHAR(60) NOT NULL,
  `telefono` INT NOT NULL,
  `url_imagen` VARCHAR(255) NULL DEFAULT NULL,
  `domicilio_id` BIGINT NOT NULL,
  `rol_id` BIGINT NOT NULL,
  `especialidad_protecista` VARCHAR(30) NULL DEFAULT NULL,
  `matricula` VARCHAR(15) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `FK_kg2maxf9xe315f3lcqxc82m55` (`domicilio_id` ASC) VISIBLE,
  INDEX `FK_oyp3p960ij0pf86kprxstx2ts` (`rol_id` ASC) VISIBLE,
  CONSTRAINT `FK_kg2maxf9xe315f3lcqxc82m55`
    FOREIGN KEY (`domicilio_id`)
    REFERENCES `odontotal`.`domicilios` (`id`),
  CONSTRAINT `FK_oyp3p960ij0pf86kprxstx2ts`
    FOREIGN KEY (`rol_id`)
    REFERENCES `odontotal`.`usuario_rol` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `odontotal`.`turnos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `odontotal`.`turnos` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `fecha` DATE NOT NULL,
  `hora` TIME NOT NULL,
  `motivo` VARCHAR(500) NULL DEFAULT NULL,
  `realizado` VARCHAR(500) NULL DEFAULT NULL,
  `odontologos_id` BIGINT NOT NULL,
  `paciente_id` BIGINT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `FKr0qgve3r0dljkcrrt1t0i9n52` (`odontologos_id` ASC) VISIBLE,
  INDEX `FK4okcqr9iqt2iw6xhy1ppsmo3l` (`paciente_id` ASC) VISIBLE,
  CONSTRAINT `FK4okcqr9iqt2iw6xhy1ppsmo3l`
    FOREIGN KEY (`paciente_id`)
    REFERENCES `odontotal`.`pacientes` (`id`),
  CONSTRAINT `FKr0qgve3r0dljkcrrt1t0i9n52`
    FOREIGN KEY (`odontologos_id`)
    REFERENCES `odontotal`.`odontologos` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `odontotal`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `odontotal`.`usuarios` (
  `id` BIGINT NOT NULL,
  `apellido` VARCHAR(30) NOT NULL,
  `documento` VARCHAR(15) NOT NULL,
  `email` VARCHAR(30) NOT NULL,
  `fecha_nacimiento` DATE NOT NULL,
  `genero` VARCHAR(15) NOT NULL,
  `nombre` VARCHAR(30) NOT NULL,
  `password` VARCHAR(60) NOT NULL,
  `telefono` INT NOT NULL,
  `url_imagen` VARCHAR(255) NULL DEFAULT NULL,
  `domicilio_id` BIGINT NOT NULL,
  `rol_id` BIGINT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `FK9wcxk73lwk7c3dcns34kef4mv` (`domicilio_id` ASC) VISIBLE,
  INDEX `FK6i1yrgn3dsot02xv9fqfjx4ex` (`rol_id` ASC) VISIBLE,
  CONSTRAINT `FK6i1yrgn3dsot02xv9fqfjx4ex`
    FOREIGN KEY (`rol_id`)
    REFERENCES `odontotal`.`usuario_rol` (`id`),
  CONSTRAINT `FK9wcxk73lwk7c3dcns34kef4mv`
    FOREIGN KEY (`domicilio_id`)
    REFERENCES `odontotal`.`domicilios` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema newton2
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema newton2
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `newton2` DEFAULT CHARACTER SET utf8 ;
USE `newton2` ;

-- -----------------------------------------------------
-- Table `newton2`.`m_code_group`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `newton2`.`m_code_group` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '',
  `status` CHAR(8) NOT NULL COMMENT '',
  `name` CHAR(30) NOT NULL COMMENT '',
  PRIMARY KEY (`id`)  COMMENT '')
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `newton2`.`m_code`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `newton2`.`m_code` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '',
  `status` CHAR(8) NOT NULL COMMENT '',
  `name` CHAR(30) NOT NULL COMMENT '',
  `m_code_group_id` INT UNSIGNED NOT NULL COMMENT '',
  PRIMARY KEY (`id`)  COMMENT '',
  INDEX `fk_m_code_m_code_group_idx` (`m_code_group_id` ASC)  COMMENT '',
  CONSTRAINT `fk_m_code_m_code_group`
    FOREIGN KEY (`m_code_group_id`)
    REFERENCES `newton2`.`m_code_group` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `newton2`.`m_faq`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `newton2`.`m_faq` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '',
  `create_datetime` TIMESTAMP NOT NULL DEFAULT current_timestamp COMMENT '	',
  `create_user` CHAR(15) NOT NULL COMMENT '',
  `update_datetime` TIMESTAMP NOT NULL DEFAULT 20160124000000 COMMENT '',
  `update_user` CHAR(15) NOT NULL COMMENT '',
  `status` CHAR(8) NOT NULL COMMENT '',
  `title` VARCHAR(255) NOT NULL COMMENT '',
  `content` LONGTEXT NOT NULL COMMENT '',
  `talk_script` LONGTEXT NULL DEFAULT NULL COMMENT '',
  `useful_count` INT NULL DEFAULT 0 COMMENT '',
  PRIMARY KEY (`id`)  COMMENT '')
ENGINE = InnoDB
AUTO_INCREMENT = 11
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `newton2`.`m_manual_category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `newton2`.`m_manual_category` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '',
  `status` CHAR(8) NOT NULL DEFAULT 'valid' COMMENT '',
  `name` VARCHAR(45) NOT NULL COMMENT '',
  PRIMARY KEY (`id`)  COMMENT '')
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `newton2`.`m_manual`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `newton2`.`m_manual` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '',
  `status` CHAR(8) NOT NULL COMMENT '',
  `file_name` VARCHAR(255) NOT NULL COMMENT '',
  `file_path` VARCHAR(255) NOT NULL COMMENT '',
  `m_manual_category_id` INT UNSIGNED NOT NULL COMMENT '',
  PRIMARY KEY (`id`)  COMMENT '',
  INDEX `fk_m_manual_m_manual_category1_idx` (`m_manual_category_id` ASC)  COMMENT '',
  CONSTRAINT `fk_m_manual_m_manual_category1`
    FOREIGN KEY (`m_manual_category_id`)
    REFERENCES `newton2`.`m_manual_category` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `newton2`.`m_notification`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `newton2`.`m_notification` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '',
  `create_datetime` TIMESTAMP NOT NULL DEFAULT current_timestamp COMMENT '',
  `create_user` CHAR(15) NOT NULL COMMENT '',
  `update_datetime` TIMESTAMP NOT NULL DEFAULT 20160124000000 COMMENT '',
  `update_user` CHAR(15) NOT NULL COMMENT '',
  `status` CHAR(8) NOT NULL DEFAULT 'valid' COMMENT '',
  `title` VARCHAR(255) NOT NULL COMMENT '',
  `content` LONGTEXT NOT NULL COMMENT '',
  `file_path` VARCHAR(255) NULL DEFAULT NULL COMMENT '',
  `importance` INT NULL DEFAULT 0 COMMENT '',
  PRIMARY KEY (`id`)  COMMENT '')
ENGINE = InnoDB
AUTO_INCREMENT = 64
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `newton2`.`m_notification_target_role`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `newton2`.`m_notification_target_role` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '',
  `target_user` CHAR(15) NOT NULL COMMENT '',
  `read_flag` BIT(1) NOT NULL DEFAULT 0 COMMENT '',
  `m_notification_id` INT UNSIGNED NOT NULL COMMENT '',
  PRIMARY KEY (`id`)  COMMENT '',
  INDEX `fk_m_notification_target_role_m_notification1_idx` (`m_notification_id` ASC)  COMMENT '',
  CONSTRAINT `fk_m_notification_target_role_m_notification1`
    FOREIGN KEY (`m_notification_id`)
    REFERENCES `newton2`.`m_notification` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `newton2`.`m_role`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `newton2`.`m_role` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '',
  `status` CHAR(8) NOT NULL COMMENT '',
  `skill_name` VARCHAR(255) NOT NULL COMMENT '',
  PRIMARY KEY (`id`)  COMMENT '')
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `newton2`.`m_user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `newton2`.`m_user` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '',
  `status` CHAR(8) NOT NULL COMMENT '',
  `name` CHAR(15) NOT NULL COMMENT '',
  `password` VARCHAR(255) NOT NULL COMMENT '',
  `mail_address` VARCHAR(255) NOT NULL COMMENT '',
  PRIMARY KEY (`id`)  COMMENT '')
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `newton2`.`m_user_has_m_role`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `newton2`.`m_user_has_m_role` (
  `m_user_id` INT UNSIGNED NOT NULL COMMENT '',
  `m_role_id` INT UNSIGNED NOT NULL COMMENT '',
  PRIMARY KEY (`m_user_id`, `m_role_id`)  COMMENT '',
  INDEX `fk_m_user_has_m_role_m_role1_idx` (`m_role_id` ASC)  COMMENT '',
  INDEX `fk_m_user_has_m_role_m_user1_idx` (`m_user_id` ASC)  COMMENT '',
  CONSTRAINT `fk_m_user_has_m_role_m_role1`
    FOREIGN KEY (`m_role_id`)
    REFERENCES `newton2`.`m_role` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_m_user_has_m_role_m_user1`
    FOREIGN KEY (`m_user_id`)
    REFERENCES `newton2`.`m_user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `newton2`.`m_white_board`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `newton2`.`m_white_board` (
  `id` INT NOT NULL AUTO_INCREMENT COMMENT '',
  `create_datetime` DATETIME NOT NULL DEFAULT current_timestamp COMMENT '',
  `create_user` CHAR(8) NOT NULL COMMENT '',
  `update_datetime` DATETIME NOT NULL DEFAULT 20160124000000 COMMENT '',
  `update_user` CHAR(8) NOT NULL COMMENT '',
  `status` CHAR(8) NOT NULL DEFAULT 'valid' COMMENT '',
  `content` VARCHAR(255) NOT NULL COMMENT '',
  PRIMARY KEY (`id`)  COMMENT '')
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `newton2`.`m_manual_category_relations`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `newton2`.`m_manual_category_relations` (
  `id` INT NOT NULL AUTO_INCREMENT COMMENT '',
  `anscestor_id` INT UNSIGNED NOT NULL COMMENT '',
  `descendant_id` INT UNSIGNED NOT NULL COMMENT '',
  `path_length` INT UNSIGNED NOT NULL DEFAULT 0 COMMENT '',
  PRIMARY KEY (`id`)  COMMENT '',
  INDEX `fk1_idx` (`anscestor_id` ASC)  COMMENT '',
  INDEX `fk2_idx` (`descendant_id` ASC)  COMMENT '',
  CONSTRAINT `fk1`
    FOREIGN KEY (`anscestor_id`)
    REFERENCES `newton2`.`m_manual_category` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk2`
    FOREIGN KEY (`descendant_id`)
    REFERENCES `newton2`.`m_manual_category` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `newton2`.`m_faq_category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `newton2`.`m_faq_category` (
  `id` INT NOT NULL AUTO_INCREMENT COMMENT '',
  `status` CHAR(8) NOT NULL DEFAULT 'valid' COMMENT '',
  `name` VARCHAR(45) NOT NULL COMMENT '',
  PRIMARY KEY (`id`)  COMMENT '')
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `newton2`.`m_todo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `newton2`.`m_todo` (
  `id` INT NOT NULL AUTO_INCREMENT COMMENT '',
  `create_datetime` TIMESTAMP NOT NULL DEFAULT current_timestamp COMMENT '',
  `create_user` CHAR(15) NOT NULL COMMENT '',
  `status` CHAR(8) NOT NULL DEFAULT 'valid' COMMENT '',
  `title` VARCHAR(45) NOT NULL COMMENT '',
  `content` VARCHAR(255) NULL COMMENT '',
  `target_user` CHAR(15) NOT NULL COMMENT '',
  `importance` INT NOT NULL COMMENT '',
  `dead_line` TIMESTAMP NULL COMMENT '',
  `memo` VARCHAR(255) NULL COMMENT '',
  PRIMARY KEY (`id`)  COMMENT '')
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `newton2`.`old_m_manual_category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `newton2`.`old_m_manual_category` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '',
  `status` CHAR(8) NOT NULL DEFAULT 'valid' COMMENT '',
  `name` VARCHAR(45) NOT NULL COMMENT '',
  PRIMARY KEY (`id`)  COMMENT '')
ENGINE = InnoDB
AUTO_INCREMENT = 10
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `newton2`.`old_m_manual`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `newton2`.`old_m_manual` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '',
  `create_datetime` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '',
  `create_user` CHAR(15) NOT NULL COMMENT '',
  `update_datetime` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '',
  `update_user` CHAR(15) NOT NULL COMMENT '',
  `status` CHAR(8) NOT NULL COMMENT '',
  `file_name` VARCHAR(255) NOT NULL COMMENT '',
  `file_path` VARCHAR(255) NOT NULL COMMENT '',
  `m_manual_category_id` INT(10) UNSIGNED NOT NULL COMMENT '',
  PRIMARY KEY (`id`)  COMMENT '',
  INDEX `fk_m_manual_m_manual_category1_idx` (`m_manual_category_id` ASC)  COMMENT '',
  CONSTRAINT `fk_m_manual_m_manual_category1`
    FOREIGN KEY (`m_manual_category_id`)
    REFERENCES `newton2`.`old_m_manual_category` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `newton2`.`old_m_manual_category_relations`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `newton2`.`old_m_manual_category_relations` (
  `id` INT(11) NOT NULL AUTO_INCREMENT COMMENT '',
  `anscestor_id` INT(10) UNSIGNED NOT NULL COMMENT '',
  `descendant_id` INT(10) UNSIGNED NOT NULL COMMENT '',
  `path_length` INT(10) UNSIGNED NOT NULL DEFAULT '0' COMMENT '',
  PRIMARY KEY (`id`)  COMMENT '',
  INDEX `fk1_idx` (`anscestor_id` ASC)  COMMENT '',
  INDEX `fk2_idx` (`descendant_id` ASC)  COMMENT '',
  CONSTRAINT `fk1`
    FOREIGN KEY (`anscestor_id`)
    REFERENCES `newton2`.`old_m_manual_category` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk2`
    FOREIGN KEY (`descendant_id`)
    REFERENCES `newton2`.`old_m_manual_category` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 9
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `newton2`.`m_term`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `newton2`.`m_term` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '',
  `status` CHAR(8) NOT NULL DEFAULT 'valid' COMMENT '	',
  `title` VARCHAR(255) NOT NULL COMMENT '',
  `content` TEXT NOT NULL COMMENT '',
  PRIMARY KEY (`id`)  COMMENT '')
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `newton2`.`m_faq_has_m_faq_category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `newton2`.`m_faq_has_m_faq_category` (
  `m_faq_id` INT UNSIGNED NOT NULL COMMENT '',
  `m_faq_category_id` INT NOT NULL COMMENT '',
  PRIMARY KEY (`m_faq_id`, `m_faq_category_id`)  COMMENT '',
  INDEX `fk_m_faq_has_m_faq_category_m_faq_category1_idx` (`m_faq_category_id` ASC)  COMMENT '',
  INDEX `fk_m_faq_has_m_faq_category_m_faq1_idx` (`m_faq_id` ASC)  COMMENT '',
  CONSTRAINT `fk_m_faq_has_m_faq_category_m_faq1`
    FOREIGN KEY (`m_faq_id`)
    REFERENCES `newton2`.`m_faq` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_m_faq_has_m_faq_category_m_faq_category1`
    FOREIGN KEY (`m_faq_category_id`)
    REFERENCES `newton2`.`m_faq_category` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

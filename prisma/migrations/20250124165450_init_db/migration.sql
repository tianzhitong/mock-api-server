-- CreateTable
CREATE TABLE `response_model` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NULL,
    `model_data` LONGTEXT NULL,

    UNIQUE INDEX `response_model_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mock` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `project_name` VARCHAR(255) NOT NULL DEFAULT 'default',
    `api_url` VARCHAR(255) NOT NULL,
    `api_method` CHAR(6) NOT NULL,
    `query` VARCHAR(255) NULL,
    `response_to_mock_struct_data` LONGTEXT NULL,
    `create_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `update_at` DATETIME(3) NOT NULL,
    `delete_at` DATETIME(3) NULL,

    INDEX `mock_project_name_api_url_api_method_idx`(`project_name`, `api_url`, `api_method`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `role` ENUM('user', 'admin') NOT NULL DEFAULT 'user',
    `create_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `update_at` DATETIME(3) NOT NULL,
    `delete_at` DATETIME(3) NULL,
    `nick_name` VARCHAR(255) NOT NULL,
    `avator` VARCHAR(191) NOT NULL DEFAULT 'http://www.baidu.com',
    `sex` ENUM('男', '女', '未知') NOT NULL DEFAULT '未知',

    UNIQUE INDEX `user_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

INSERT INTO `user` VALUES (1,'admin','$2b$10$7mFVljVwWuBYKqpD3eBxd.HGi.0GfOzIfRPD89aHxGDvSAdvav.Ni','admin','2025-01-27 08:26:40.750000','2025-01-27 08:26:40.750',NULL,'管理员','http://www.baidu.com','未知');

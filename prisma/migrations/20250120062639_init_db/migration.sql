-- CreateTable
CREATE TABLE `mock` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `project_name` VARCHAR(255) NOT NULL DEFAULT 'default',
    `api_url` VARCHAR(255) NOT NULL,
    `api_method` CHAR(6) NOT NULL,
    `query` VARCHAR(255) NULL,
    `response_to_mock_struct_data` JSON NOT NULL,
    `create_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `update_at` DATETIME(3) NOT NULL,
    `delete_at` DATETIME(3) NULL,

    INDEX `mock_project_name_api_url_api_method_idx`(`project_name`, `api_url`, `api_method`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `account` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `role` ENUM('user', 'admin') NOT NULL DEFAULT 'user',
    `create_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `update_at` DATETIME(3) NOT NULL,
    `delete_at` DATETIME(3) NULL,
    `nick_name` VARCHAR(255) NOT NULL,
    `avator` VARCHAR(191) NOT NULL DEFAULT 'http://www.baidu.com',
    `sex` ENUM('男', '女', '未知') NOT NULL DEFAULT '未知',

    UNIQUE INDEX `user_account_key`(`account`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

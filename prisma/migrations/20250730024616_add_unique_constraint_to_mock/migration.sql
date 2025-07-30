/*
  Warnings:

  - A unique constraint covering the columns `[project_name,api_url,api_method]` on the table `mock` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `mock_project_name_api_url_api_method_key` ON `mock`(`project_name`, `api_url`, `api_method`);

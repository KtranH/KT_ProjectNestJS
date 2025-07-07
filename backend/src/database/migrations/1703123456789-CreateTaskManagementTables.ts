import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTaskManagementTables1703123456789
  implements MigrationInterface
{
  name = 'CreateTaskManagementTables1703123456789';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Tạo bảng users
    await queryRunner.query(`
      CREATE TABLE "users" (
        "id" SERIAL PRIMARY KEY,
        "username" VARCHAR(100) NOT NULL UNIQUE,
        "password" VARCHAR(255) NOT NULL,
        "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Tạo bảng tasks
    await queryRunner.query(`
      CREATE TABLE "tasks" (
        "id" SERIAL PRIMARY KEY,
        "name" VARCHAR(255) NOT NULL,
        "description" TEXT NOT NULL,
        "status" VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'done')),
        "user_id" INTEGER,
        "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "fk_tasks_user" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL
      )
    `);

    // Tạo bảng comments
    await queryRunner.query(`
      CREATE TABLE "comments" (
        "id" SERIAL PRIMARY KEY,
        "content" TEXT NOT NULL,
        "task_id" INTEGER,
        "user_id" INTEGER,
        "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "fk_comments_task" FOREIGN KEY ("task_id") REFERENCES "tasks"("id") ON DELETE CASCADE,
        CONSTRAINT "fk_comments_user" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL
      )
    `);

    // Tạo indexes để tối ưu hiệu suất
    await queryRunner.query(
      `CREATE INDEX "idx_tasks_user_id" ON "tasks" ("user_id")`,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_tasks_status" ON "tasks" ("status")`,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_comments_task_id" ON "comments" ("task_id")`,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_comments_user_id" ON "comments" ("user_id")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Xóa indexes
    await queryRunner.query(`DROP INDEX "idx_comments_user_id"`);
    await queryRunner.query(`DROP INDEX "idx_comments_task_id"`);
    await queryRunner.query(`DROP INDEX "idx_tasks_status"`);
    await queryRunner.query(`DROP INDEX "idx_tasks_user_id"`);

    // Xóa bảng comments
    await queryRunner.query(`DROP TABLE "comments"`);

    // Xóa bảng tasks
    await queryRunner.query(`DROP TABLE "tasks"`);

    // Xóa bảng users
    await queryRunner.query(`DROP TABLE "users"`);
  }
}

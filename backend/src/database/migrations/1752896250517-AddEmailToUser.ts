import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddEmailToUser1752896250517 implements MigrationInterface {
  name = 'AddEmailToUser1752896250517';

  // Thêm email vào bảng users
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Xóa các ràng buộc liên quan
    await queryRunner.query(`ALTER TABLE 
        "comments" DROP CONSTRAINT "fk_comments_task"`);
    await queryRunner.query(`ALTER TABLE
         "comments" DROP CONSTRAINT "fk_comments_user"`);
    await queryRunner.query(`ALTER TABLE 
        "tasks" DROP CONSTRAINT "fk_tasks_user"`);
    await queryRunner.query(`ALTER TABLE 
        "tasks" DROP CONSTRAINT "tasks_status_check"`);
    await queryRunner.query(`ALTER TABLE 
        "users" ADD "fullName" character varying(255)`);
    await queryRunner.query(`ALTER TABLE 
        "users" ADD "email" character varying(255)`);
    await queryRunner.query(`ALTER TABLE 
        "users" ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")`);
    await queryRunner.query(`ALTER TABLE 
        "comments" ALTER COLUMN "task_id" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE 
        "comments" ALTER COLUMN "created_at" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE 
        "comments" ALTER COLUMN "created_at" SET DEFAULT now()`);
    await queryRunner.query(`DROP INDEX "public"."idx_comments_task_id"`);
    await queryRunner.query(`DROP INDEX "public"."idx_comments_user_id"`);
    await queryRunner.query(`DROP INDEX "public"."idx_tasks_user_id"`);
    await queryRunner.query(`DROP INDEX "public"."idx_tasks_status"`);
    await queryRunner.query(`ALTER TABLE 
        "tasks" DROP CONSTRAINT "tasks_status_check"`);
    await queryRunner.query(`ALTER TABLE 
        "users" ADD "fullName" character varying(255)`);
    await queryRunner.query(`ALTER TABLE 
        "users" ADD "email" character varying(255)`);
    await queryRunner.query(`ALTER TABLE 
        "users" ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")`);
    await queryRunner.query(`ALTER TABLE 
        "comments" ALTER COLUMN "task_id" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE 
        "comments" ALTER COLUMN "created_at" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE 
        "comments" ALTER COLUMN "created_at" SET DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE 
        "tasks" ALTER COLUMN "status" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE 
        "tasks" ALTER COLUMN "created_at" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE 
        "tasks" ALTER COLUMN "created_at" SET DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE 
        "tasks" ALTER COLUMN "updated_at" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE 
        "tasks" ALTER COLUMN "updated_at" SET DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE 
        "users" ALTER COLUMN "created_at" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE 
        "users" ALTER COLUMN "created_at" SET DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE 
        "users" ALTER COLUMN "updated_at" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE 
        "users" ALTER COLUMN "updated_at" SET DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE 
        "comments" ADD CONSTRAINT "FK_18c2493067c11f44efb35ca0e03" FOREIGN KEY ("task_id") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE 
        "comments" ADD CONSTRAINT "FK_4c675567d2a58f0b07cef09c13d" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE 
        "tasks" ADD CONSTRAINT "FK_db55af84c226af9dce09487b61b" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE 
        "tasks" DROP CONSTRAINT "FK_db55af84c226af9dce09487b61b"`);
    await queryRunner.query(`ALTER TABLE 
        "comments" DROP CONSTRAINT "FK_4c675567d2a58f0b07cef09c13d"`);
    await queryRunner.query(`ALTER TABLE 
        "comments" DROP CONSTRAINT "FK_18c2493067c11f44efb35ca0e03"`);
    await queryRunner.query(`ALTER TABLE 
        "users" ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE 
        "users" ALTER COLUMN "updated_at" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE 
        "users" ALTER COLUMN "created_at" SET DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE 
        "users" ALTER COLUMN "created_at" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE 
        "tasks" ALTER COLUMN "updated_at" SET DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE 
        "tasks" ALTER COLUMN "updated_at" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE 
        "tasks" ALTER COLUMN "created_at" SET DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE 
        "tasks" ALTER COLUMN "created_at" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE 
        "tasks" ALTER COLUMN "status" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE 
        "comments" ALTER COLUMN "created_at" SET DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE 
        "comments" ALTER COLUMN "created_at" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE 
        "comments" ALTER COLUMN "task_id" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE 
        "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"`);
    await queryRunner.query(`ALTER TABLE 
        "users" DROP COLUMN "email"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "fullName"`);
    await queryRunner.query(`ALTER TABLE 
        "tasks" ADD CONSTRAINT "tasks_status_check" CHECK (((status)::text = ANY ((ARRAY['pending'::character varying, 'in_progress'::character varying, 'done'::character varying])::text[])))`);
    await queryRunner.query(`CREATE INDEX 
        "idx_tasks_status" ON "tasks" ("status") `);
    await queryRunner.query(`CREATE INDEX 
        "idx_tasks_user_id" ON "tasks" ("user_id") `);
    await queryRunner.query(`CREATE INDEX 
        "idx_comments_user_id" ON "comments" ("user_id") `);
    await queryRunner.query(`CREATE INDEX 
        "idx_comments_task_id" ON "comments" ("task_id") `);
    await queryRunner.query(`ALTER TABLE 
        "tasks" ADD CONSTRAINT "fk_tasks_user" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE 
        "comments" ADD CONSTRAINT "fk_comments_user" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE 
        "comments" ADD CONSTRAINT "fk_comments_task" FOREIGN KEY ("task_id") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
  }
}

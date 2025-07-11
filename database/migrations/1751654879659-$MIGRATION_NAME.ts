import { MigrationInterface, QueryRunner } from "typeorm";

export class  $MIGRATIONNAME1751654879659 implements MigrationInterface {
    name = ' $MIGRATIONNAME1751654879659'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "appointment_id"`);
        await queryRunner.query(`ALTER TABLE "payments" ADD "appointment_id" bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "promotions" DROP COLUMN "provider_id"`);
        await queryRunner.query(`ALTER TABLE "promotions" ADD "provider_id" bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "promotion_usage" DROP COLUMN "promotion_id"`);
        await queryRunner.query(`ALTER TABLE "promotion_usage" ADD "promotion_id" bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "promotion_usage" DROP COLUMN "appointment_id"`);
        await queryRunner.query(`ALTER TABLE "promotion_usage" ADD "appointment_id" bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "promotion_usage" DROP COLUMN "client_id"`);
        await queryRunner.query(`ALTER TABLE "promotion_usage" ADD "client_id" bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "favorite_services" DROP CONSTRAINT "UQ_091c48d4500e806b3537637d0d3"`);
        await queryRunner.query(`ALTER TABLE "favorite_services" DROP COLUMN "client_id"`);
        await queryRunner.query(`ALTER TABLE "favorite_services" ADD "client_id" bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "favorite_services" DROP COLUMN "service_id"`);
        await queryRunner.query(`ALTER TABLE "favorite_services" ADD "service_id" bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "services" DROP COLUMN "provider_id"`);
        await queryRunner.query(`ALTER TABLE "services" ADD "provider_id" bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "services" DROP COLUMN "category_id"`);
        await queryRunner.query(`ALTER TABLE "services" ADD "category_id" bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP COLUMN "appointment_id"`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD "appointment_id" bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "UQ_b0355254b748096d3e4d9a9ac2b" UNIQUE ("appointment_id")`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP COLUMN "client_id"`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD "client_id" bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP COLUMN "provider_id"`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD "provider_id" bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP COLUMN "service_id"`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD "service_id" bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP COLUMN "client_id"`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD "client_id" bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP COLUMN "provider_id"`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD "provider_id" bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP COLUMN "service_id"`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD "service_id" bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "chat_messages" DROP COLUMN "conversation_id"`);
        await queryRunner.query(`ALTER TABLE "chat_messages" ADD "conversation_id" bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "chat_messages" DROP COLUMN "sender_id"`);
        await queryRunner.query(`ALTER TABLE "chat_messages" ADD "sender_id" bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "chat_conversations" DROP CONSTRAINT "UQ_5a53534307edbdb0c7b0e18bb15"`);
        await queryRunner.query(`ALTER TABLE "chat_conversations" DROP COLUMN "client_id"`);
        await queryRunner.query(`ALTER TABLE "chat_conversations" ADD "client_id" bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "chat_conversations" DROP COLUMN "provider_id"`);
        await queryRunner.query(`ALTER TABLE "chat_conversations" ADD "provider_id" bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD "user_id" bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "provider_availability" DROP CONSTRAINT "UQ_a34052ac81ca624ace364023c32"`);
        await queryRunner.query(`ALTER TABLE "provider_availability" DROP COLUMN "provider_id"`);
        await queryRunner.query(`ALTER TABLE "provider_availability" ADD "provider_id" bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "provider_breaks" DROP COLUMN "provider_id"`);
        await queryRunner.query(`ALTER TABLE "provider_breaks" ADD "provider_id" bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "provider_profiles" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "provider_profiles" ADD "user_id" bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "provider_profiles" ADD CONSTRAINT "UQ_5d1880ed16ff13ea6fd9bca019d" UNIQUE ("user_id")`);
        await queryRunner.query(`ALTER TABLE "favorite_services" ADD CONSTRAINT "UQ_091c48d4500e806b3537637d0d3" UNIQUE ("client_id", "service_id")`);
        await queryRunner.query(`ALTER TABLE "chat_conversations" ADD CONSTRAINT "UQ_5a53534307edbdb0c7b0e18bb15" UNIQUE ("client_id", "provider_id")`);
        await queryRunner.query(`ALTER TABLE "provider_availability" ADD CONSTRAINT "UQ_a34052ac81ca624ace364023c32" UNIQUE ("provider_id", "day_of_week")`);
        await queryRunner.query(`ALTER TABLE "payments" ADD CONSTRAINT "FK_9f49987820da519f855d04c82bd" FOREIGN KEY ("appointment_id") REFERENCES "appointments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "promotions" ADD CONSTRAINT "FK_b8bf09f33f17d4a36eda6b999b2" FOREIGN KEY ("provider_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "promotion_usage" ADD CONSTRAINT "FK_51b1d9ae72d9343d0a27e6231d7" FOREIGN KEY ("promotion_id") REFERENCES "promotions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "promotion_usage" ADD CONSTRAINT "FK_8fe14ecaceeb2f65976dd550db0" FOREIGN KEY ("appointment_id") REFERENCES "appointments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "promotion_usage" ADD CONSTRAINT "FK_3401a65fbe55f6608307d3711e6" FOREIGN KEY ("client_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favorite_services" ADD CONSTRAINT "FK_be2bd835bb4b0da3053088ea3ae" FOREIGN KEY ("client_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favorite_services" ADD CONSTRAINT "FK_b59b8eeab427c40d52cef4ade24" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "services" ADD CONSTRAINT "FK_e7a40b21f8fd548be206fcc89b2" FOREIGN KEY ("provider_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "services" ADD CONSTRAINT "FK_1f8d1173481678a035b4a81a4ec" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "FK_b0355254b748096d3e4d9a9ac2b" FOREIGN KEY ("appointment_id") REFERENCES "appointments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "FK_d4e7e923e6bb78a8f0add754493" FOREIGN KEY ("client_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "FK_ba7ceb19946b8b23bf5939c930f" FOREIGN KEY ("provider_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "FK_6587db79174d07150fde1f1a4d6" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD CONSTRAINT "FK_ccc5bbce58ad6bc96faa428b1e4" FOREIGN KEY ("client_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD CONSTRAINT "FK_e3e268ed1125872144e68b9a41c" FOREIGN KEY ("provider_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD CONSTRAINT "FK_2a2088e8eaa8f28d8de2bdbb857" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chat_messages" ADD CONSTRAINT "FK_3d623662d4ee1219b23cf61e649" FOREIGN KEY ("conversation_id") REFERENCES "chat_conversations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chat_messages" ADD CONSTRAINT "FK_9e5fc47ecb06d4d7b84633b1718" FOREIGN KEY ("sender_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chat_conversations" ADD CONSTRAINT "FK_e55474de3dc9897fed2e1df0037" FOREIGN KEY ("client_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chat_conversations" ADD CONSTRAINT "FK_5654c978799d91baf2f1cc45c5e" FOREIGN KEY ("provider_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD CONSTRAINT "FK_9a8a82462cab47c73d25f49261f" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "provider_availability" ADD CONSTRAINT "FK_d60be36a0bfa87bd223620fe260" FOREIGN KEY ("provider_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "provider_breaks" ADD CONSTRAINT "FK_6ddbaee71ddb4e519c1ec4d2f78" FOREIGN KEY ("provider_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "provider_profiles" ADD CONSTRAINT "FK_5d1880ed16ff13ea6fd9bca019d" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "provider_profiles" DROP CONSTRAINT "FK_5d1880ed16ff13ea6fd9bca019d"`);
        await queryRunner.query(`ALTER TABLE "provider_breaks" DROP CONSTRAINT "FK_6ddbaee71ddb4e519c1ec4d2f78"`);
        await queryRunner.query(`ALTER TABLE "provider_availability" DROP CONSTRAINT "FK_d60be36a0bfa87bd223620fe260"`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP CONSTRAINT "FK_9a8a82462cab47c73d25f49261f"`);
        await queryRunner.query(`ALTER TABLE "chat_conversations" DROP CONSTRAINT "FK_5654c978799d91baf2f1cc45c5e"`);
        await queryRunner.query(`ALTER TABLE "chat_conversations" DROP CONSTRAINT "FK_e55474de3dc9897fed2e1df0037"`);
        await queryRunner.query(`ALTER TABLE "chat_messages" DROP CONSTRAINT "FK_9e5fc47ecb06d4d7b84633b1718"`);
        await queryRunner.query(`ALTER TABLE "chat_messages" DROP CONSTRAINT "FK_3d623662d4ee1219b23cf61e649"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP CONSTRAINT "FK_2a2088e8eaa8f28d8de2bdbb857"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP CONSTRAINT "FK_e3e268ed1125872144e68b9a41c"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP CONSTRAINT "FK_ccc5bbce58ad6bc96faa428b1e4"`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_6587db79174d07150fde1f1a4d6"`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_ba7ceb19946b8b23bf5939c930f"`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_d4e7e923e6bb78a8f0add754493"`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_b0355254b748096d3e4d9a9ac2b"`);
        await queryRunner.query(`ALTER TABLE "services" DROP CONSTRAINT "FK_1f8d1173481678a035b4a81a4ec"`);
        await queryRunner.query(`ALTER TABLE "services" DROP CONSTRAINT "FK_e7a40b21f8fd548be206fcc89b2"`);
        await queryRunner.query(`ALTER TABLE "favorite_services" DROP CONSTRAINT "FK_b59b8eeab427c40d52cef4ade24"`);
        await queryRunner.query(`ALTER TABLE "favorite_services" DROP CONSTRAINT "FK_be2bd835bb4b0da3053088ea3ae"`);
        await queryRunner.query(`ALTER TABLE "promotion_usage" DROP CONSTRAINT "FK_3401a65fbe55f6608307d3711e6"`);
        await queryRunner.query(`ALTER TABLE "promotion_usage" DROP CONSTRAINT "FK_8fe14ecaceeb2f65976dd550db0"`);
        await queryRunner.query(`ALTER TABLE "promotion_usage" DROP CONSTRAINT "FK_51b1d9ae72d9343d0a27e6231d7"`);
        await queryRunner.query(`ALTER TABLE "promotions" DROP CONSTRAINT "FK_b8bf09f33f17d4a36eda6b999b2"`);
        await queryRunner.query(`ALTER TABLE "payments" DROP CONSTRAINT "FK_9f49987820da519f855d04c82bd"`);
        await queryRunner.query(`ALTER TABLE "provider_availability" DROP CONSTRAINT "UQ_a34052ac81ca624ace364023c32"`);
        await queryRunner.query(`ALTER TABLE "chat_conversations" DROP CONSTRAINT "UQ_5a53534307edbdb0c7b0e18bb15"`);
        await queryRunner.query(`ALTER TABLE "favorite_services" DROP CONSTRAINT "UQ_091c48d4500e806b3537637d0d3"`);
        await queryRunner.query(`ALTER TABLE "provider_profiles" DROP CONSTRAINT "UQ_5d1880ed16ff13ea6fd9bca019d"`);
        await queryRunner.query(`ALTER TABLE "provider_profiles" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "provider_profiles" ADD "user_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "provider_breaks" DROP COLUMN "provider_id"`);
        await queryRunner.query(`ALTER TABLE "provider_breaks" ADD "provider_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "provider_availability" DROP COLUMN "provider_id"`);
        await queryRunner.query(`ALTER TABLE "provider_availability" ADD "provider_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "provider_availability" ADD CONSTRAINT "UQ_a34052ac81ca624ace364023c32" UNIQUE ("provider_id", "day_of_week")`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD "user_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "chat_conversations" DROP COLUMN "provider_id"`);
        await queryRunner.query(`ALTER TABLE "chat_conversations" ADD "provider_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "chat_conversations" DROP COLUMN "client_id"`);
        await queryRunner.query(`ALTER TABLE "chat_conversations" ADD "client_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "chat_conversations" ADD CONSTRAINT "UQ_5a53534307edbdb0c7b0e18bb15" UNIQUE ("client_id", "provider_id")`);
        await queryRunner.query(`ALTER TABLE "chat_messages" DROP COLUMN "sender_id"`);
        await queryRunner.query(`ALTER TABLE "chat_messages" ADD "sender_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "chat_messages" DROP COLUMN "conversation_id"`);
        await queryRunner.query(`ALTER TABLE "chat_messages" ADD "conversation_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP COLUMN "service_id"`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD "service_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP COLUMN "provider_id"`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD "provider_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP COLUMN "client_id"`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD "client_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP COLUMN "service_id"`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD "service_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP COLUMN "provider_id"`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD "provider_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP COLUMN "client_id"`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD "client_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "UQ_b0355254b748096d3e4d9a9ac2b"`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP COLUMN "appointment_id"`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD "appointment_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "services" DROP COLUMN "category_id"`);
        await queryRunner.query(`ALTER TABLE "services" ADD "category_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "services" DROP COLUMN "provider_id"`);
        await queryRunner.query(`ALTER TABLE "services" ADD "provider_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "favorite_services" DROP COLUMN "service_id"`);
        await queryRunner.query(`ALTER TABLE "favorite_services" ADD "service_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "favorite_services" DROP COLUMN "client_id"`);
        await queryRunner.query(`ALTER TABLE "favorite_services" ADD "client_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "favorite_services" ADD CONSTRAINT "UQ_091c48d4500e806b3537637d0d3" UNIQUE ("client_id", "service_id")`);
        await queryRunner.query(`ALTER TABLE "promotion_usage" DROP COLUMN "client_id"`);
        await queryRunner.query(`ALTER TABLE "promotion_usage" ADD "client_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "promotion_usage" DROP COLUMN "appointment_id"`);
        await queryRunner.query(`ALTER TABLE "promotion_usage" ADD "appointment_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "promotion_usage" DROP COLUMN "promotion_id"`);
        await queryRunner.query(`ALTER TABLE "promotion_usage" ADD "promotion_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "promotions" DROP COLUMN "provider_id"`);
        await queryRunner.query(`ALTER TABLE "promotions" ADD "provider_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "appointment_id"`);
        await queryRunner.query(`ALTER TABLE "payments" ADD "appointment_id" integer NOT NULL`);
    }

}

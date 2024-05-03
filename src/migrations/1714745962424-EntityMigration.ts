import { MigrationInterface, QueryRunner } from "typeorm";

export class EntityMigration1714745962424 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS "permissions" (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL
        );
        `);

        await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            firstName TEXT NOT NULL,
            lastName TEXT NOT NULL,
            email TEXT NOT NULL,
            password TEXT NOT NULL,
            country TEXT NOT NULL,
            referalCode INTEGER,
            createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            creditCardId INTEGER,
            FOREIGN KEY (creditCardId) REFERENCES creditcards(id),
            UNIQUE(email)
        );
        `);

        await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS billing (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            description TEXT NOT NULL,
            amount REAL NOT NULL,
            status TEXT NOT NULL,
            plan TEXT NOT NULL,
            method TEXT NOT NULL,
            schedule TEXT NOT NULL,
            startAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            endAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            userId INTEGER,
            FOREIGN KEY (userId) REFERENCES users(id)
        );
        `);

        await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS creditcards (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            cardNumber TEXT NOT NULL,
            expiryDate TEXT NOT NULL,
            cvv TEXT NOT NULL,
            userId INTEGER,
            FOREIGN KEY (userId) REFERENCES users(id)
        );
        `);

        await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS movies (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT NOT NULL,
            url TEXT NOT NULL,
            director TEXT NOT NULL,
            year INTEGER NOT NULL,
            rating TEXT NOT NULL,
            image TEXT NOT NULL,
            cast TEXT NOT NULL,
            createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
        `);

        await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS profiles (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            profileName TEXT NOT NULL,
            profileAvatar TEXT NOT NULL,
            profilePin INTEGER,
            Rratings TEXT NOT NULL,
            profileLock INTEGER DEFAULT 0,
            displayLanguage TEXT NOT NULL,
            audioSubtitle TEXT NOT NULL,
            autoPlaynext INTEGER DEFAULT 1,
            userId INTEGER,
            FOREIGN KEY (userId) REFERENCES users(id)
        );
        `);

        await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS roles (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL
        );
        `);

        await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS role_permissions (
            roleId INTEGER,
            permissionId INTEGER,
            PRIMARY KEY (roleId, permissionId),
            FOREIGN KEY (roleId) REFERENCES roles(id),
            FOREIGN KEY (permissionId) REFERENCES permissions(id)
        );
        `);

        await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS token (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            userId INTEGER NOT NULL,
            isActive BOOLEAN DEFAULT 1,
            token TEXT NOT NULL,
            FOREIGN KEY (userId) REFERENCES users(id)
        );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        DROP TABLE IF EXISTS token;
        `);

        await queryRunner.query(`
        DROP TABLE IF EXISTS role_permissions;
        `);

        await queryRunner.query(`
        DROP TABLE IF EXISTS roles;
        `);

        await queryRunner.query(`
        DROP TABLE IF EXISTS profiles;
        `);

        await queryRunner.query(`
        DROP TABLE IF EXISTS movies;
        `);

        await queryRunner.query(`
        DROP TABLE IF EXISTS creditcards;
        `);

        await queryRunner.query(`
        DROP TABLE IF EXISTS billing;
        `);

        await queryRunner.query(`
        DROP TABLE IF EXISTS users;
        `);

        await queryRunner.query(`
        DROP TABLE IF EXISTS permissions;
        `);
    }

}

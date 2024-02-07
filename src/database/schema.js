import { int, mysqlEnum, mysqlTable, varchar, json } from "drizzle-orm/mysql-core"

export const status = ["Contacted", "Interview Scheduled", "Offer Extended", "Hired", "Rejected"]

export const statusEnum = mysqlEnum("status", status)

export const candidates = mysqlTable("Candidates", {
	id: int("id").primaryKey().autoincrement(),
	fullName: varchar("fullName", { length: 256 }).notNull(),
	email: varchar("email", { length: 256 }).notNull(),
	phone: varchar("phone", { length: 256 }).notNull(),
	status: statusEnum.notNull(),
	expectedSalary: int("expectedSalary"),
	skills: json("skills")
})

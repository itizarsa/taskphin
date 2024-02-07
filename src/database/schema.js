import { int, mysqlEnum, mysqlTable, varchar, serial, primaryKey } from "drizzle-orm/mysql-core"
import { relations } from "drizzle-orm"

export const statusEnum = mysqlEnum("status", [
	"Contacted",
	"Interview Scheduled",
	"Offer Extended",
	"Hired",
	"Rejected"
])

export const candidates = mysqlTable("Candidates", {
	id: int("id").primaryKey().autoincrement(),
	fullName: varchar("fullName", { length: 256 }).notNull(),
	email: varchar("email", { length: 256 }).notNull(),
	phone: varchar("phone", { length: 256 }).notNull(),
	status: statusEnum.notNull(),
	expectedSalary: int("expectedSalary")
})

export const candidatesRelations = relations(candidates, ({ many }) => ({
	skills: many(candidatesSkills)
}))

export const skills = mysqlTable("Skills", {
	id: int("id").primaryKey().autoincrement(),
	name: varchar("name", { length: 256 }).notNull(),
	displayName: varchar("displayName", { length: 256 }).notNull()
})

export const skillsRelations = relations(skills, ({ many }) => ({
	candidates: many(candidatesSkills)
}))

export const candidatesSkills = mysqlTable(
	"CandidatesSkills",
	{
		candidateId: int("candidateId")
			.notNull()
			.references(() => candidates.id),
		skillId: int("skillId")
			.notNull()
			.references(() => skills.id)
	},
	t => ({
		pk: primaryKey({ columns: [t.candidateId, t.skillId] })
	})
)

export const candidateSkillsRelations = relations(candidatesSkills, ({ one }) => ({
	candidate: one(candidates, {
		fields: [candidatesSkills.candidateId],
		references: [candidates.id]
	}),
	skill: one(skills, {
		fields: [candidatesSkills.skillId],
		references: [skills.id]
	})
}))

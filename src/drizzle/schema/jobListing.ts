import {
  integer,
  pgEnum,
  pgTable,
  text,
  varchar,
  boolean,
  timestamp,
  index,
} from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelpers";
import { OrganizationTable } from "./organization";
import { relations } from "drizzle-orm";
import { JobListingApplicationTable } from "./jobListingApplication";

/*Tu crées des catégories dans lesquelles on n’a pas le droit d’inventer d'autres choix.*/
export const wageIntervals = ["hourly", "yearly"] as const;
export type WageInterval = (typeof wageIntervals)[number];
export const wageIntervalEnum = pgEnum(
  "job_listings_wage_interval",
  wageIntervals
);
/* C’est comme dire : “Le salaire peut être payé par heure ou par an. Rien d’autre !”r
 */
export const locationRequirements = ["in-office", "hybrid", "remote"] as const;
export type LocationRequirement = (typeof locationRequirements)[number];
export const locationRequirementEnum = pgEnum(
  "job_listings_location_requirement",
  locationRequirements
);

export const experienceLevels = ["junior", "mid-level", "senior"] as const;
export type ExperienceLevel = (typeof experienceLevels)[number];
export const experienceLevelEnum = pgEnum(
  "job_listings_experience_level",
  experienceLevels
);

export const jobListingStatuses = ["draft", "published", "delisted"] as const;
export type JobListingStatus = (typeof jobListingStatuses)[number];
export const jobListingStatusEnum = pgEnum(
  "job_listings_status",
  jobListingStatuses
);

export const jobListingTypes = [
  "internship",
  "part-time",
  "full-time",
] as const;
export type JobListingType = (typeof jobListingTypes)[number];
export const jobListingTypeEnum = pgEnum("job_listings_type", jobListingTypes);

/*
Ici, tu construis un classeur appelé "job_listings" (les offres d’emploi).

Chaque colonne du tableau représente une information sur l’offre d’emploi, comme :

title: le titre du poste

description: une description détaillée

wage: le salaire

wageInterval: payé par heure ou par an

locationRequirement: où le travail se fait

experienceLevel: niveau requis (junior, senior…)

type: stage, part-time, full-time

status: est-ce que l’offre est en brouillon, publiée, ou retirée

Tu as aussi des infos comme :
index: classeur ou etiquette
createdAt et updatedAt : pour savoir quand cette offre a été créée ou modifiée.
 */

export const JobListingTable = pgTable(
  "job_listings",
  {
    id,
    organizationId: varchar()
      .references(() => OrganizationTable.id, { onDelete: "cascade" })
      .notNull(), //Chaque offre d’emploi est liée à une entreprise. Si on supprime l’entreprise, on supprime aussi toutes ses offres (logique, non ?).
    title: varchar().notNull(),
    description: text().notNull(),
    wage: integer(),
    wageInterval: wageIntervalEnum(),
    stateAbbreviation: varchar(),
    city: varchar(),
    isFeatured: boolean().notNull().default(false),
    locationRequirement: locationRequirementEnum().notNull(),
    experienceLevel: experienceLevelEnum().notNull(),
    status: jobListingStatusEnum().notNull().default("draft"),
    type: jobListingTypeEnum().notNull(),
    postedAt: timestamp({ withTimezone: true }),
    createdAt,
    updatedAt,
  },
  (table) => [index().on(table.stateAbbreviation)]
);

export const jobListingReferences = relations(
  JobListingTable,
  ({ one, many }) => ({
    organization: one(OrganizationTable, {
      fields: [JobListingTable.organizationId],
      references: [OrganizationTable.id],
    }),
    applications: many(JobListingApplicationTable),
  })
);

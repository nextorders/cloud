import type { CompanyDraft, CompanyUnitDraft } from '../types'
import { eq } from 'drizzle-orm'
import { useDatabase } from '../database'
import { companies, companyUnits } from '../tables'
import { City } from './city'

export class Company {
  static async find(id: string) {
    return useDatabase().query.companies.findFirst({
      where: (companies, { eq }) => eq(companies.id, id),
    })
  }

  static async findBySlug(slug: string) {
    return useDatabase().query.companies.findFirst({
      where: (companies, { eq }) => eq(companies.slug, slug),
      with: {
        companyUnits: {
          with: {
            points: true,
          },
        },
        points: true,
      },
    })
  }

  static async findUnit(id: string) {
    return useDatabase().query.companyUnits.findFirst({
      where: (companyUnits, { eq }) => eq(companyUnits.id, id),
    })
  }

  static async list() {
    return useDatabase().query.companies.findMany()
  }

  static async listUnits() {
    return useDatabase().query.companyUnits.findMany()
  }

  static async listUnitsByCitySlug(slug: string) {
    const city = await City.findBySlug(slug)
    if (!city) {
      return []
    }

    return useDatabase().query.companyUnits.findMany({
      where: (companyUnits, { eq }) => eq(companyUnits.cityId, city.id),
      with: {
        company: true,
        points: true,
      },
    })
  }

  static async create(data: CompanyDraft) {
    const [company] = await useDatabase().insert(companies).values(data).returning()
    return company
  }

  static async createUnit(data: CompanyUnitDraft) {
    const [companyUnit] = await useDatabase().insert(companyUnits).values(data).returning()
    return companyUnit
  }

  static async update(id: string, data: Partial<CompanyDraft>) {
    const [company] = await useDatabase()
      .update(companies)
      .set(data)
      .where(eq(companies.id, id))
      .returning()
    return company
  }

  static async updateUnit(id: string, data: Partial<CompanyUnitDraft>) {
    const [companyUnit] = await useDatabase()
      .update(companyUnits)
      .set(data)
      .where(eq(companyUnits.id, id))
      .returning()
    return companyUnit
  }

  static async delete(id: string) {
    return useDatabase().delete(companies).where(eq(companies.id, id))
  }

  static async deleteUnit(id: string) {
    return useDatabase().delete(companyUnits).where(eq(companyUnits.id, id))
  }
}

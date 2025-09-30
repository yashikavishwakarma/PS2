import { type Measurement, type InsertMeasurement, measurements } from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  getMeasurement(id: string): Promise<Measurement | undefined>;
  getAllMeasurements(limit?: number): Promise<Measurement[]>;
  createMeasurement(measurement: InsertMeasurement): Promise<Measurement>;
}

export class DbStorage implements IStorage {
  async getMeasurement(id: string): Promise<Measurement | undefined> {
    const result = await db.select().from(measurements).where(eq(measurements.id, id)).limit(1);
    return result[0];
  }

  async getAllMeasurements(limit: number = 100): Promise<Measurement[]> {
    return await db
      .select()
      .from(measurements)
      .orderBy(desc(measurements.uploadedAt))
      .limit(limit);
  }

  async createMeasurement(insertMeasurement: InsertMeasurement): Promise<Measurement> {
    const result = await db.insert(measurements).values(insertMeasurement).returning();
    return result[0];
  }
}

export const storage = new DbStorage();

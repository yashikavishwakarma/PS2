import { type Measurement, type InsertMeasurement } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getMeasurement(id: string): Promise<Measurement | undefined>;
  getAllMeasurements(): Promise<Measurement[]>;
  createMeasurement(measurement: InsertMeasurement): Promise<Measurement>;
}

export class MemStorage implements IStorage {
  private measurements: Map<string, Measurement>;

  constructor() {
    this.measurements = new Map();
  }

  async getMeasurement(id: string): Promise<Measurement | undefined> {
    return this.measurements.get(id);
  }

  async getAllMeasurements(): Promise<Measurement[]> {
    return Array.from(this.measurements.values());
  }

  async createMeasurement(insertMeasurement: InsertMeasurement): Promise<Measurement> {
    const id = randomUUID();
    const measurement: Measurement = {
      ...insertMeasurement,
      beachType: insertMeasurement.beachType ?? null,
      location: insertMeasurement.location ?? null,
      id,
      uploadedAt: new Date(),
    };
    this.measurements.set(id, measurement);
    return measurement;
  }
}

export const storage = new MemStorage();

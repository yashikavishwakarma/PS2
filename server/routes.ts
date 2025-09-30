import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import multer from "multer";
import { z } from "zod";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  },
});

const uploadSchema = z.object({
  latitude: z.string().transform(Number).pipe(z.number().min(-90).max(90)),
  longitude: z.string().transform(Number).pipe(z.number().min(-180).max(180)),
  location: z.string().optional(),
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all measurements
  app.get("/api/measurements", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 100;
      const measurements = await storage.getAllMeasurements(limit);
      res.json(measurements);
    } catch (error) {
      console.error("Error fetching measurements:", error);
      res.status(500).json({ error: "Failed to fetch measurements" });
    }
  });

  // Get single measurement by ID
  app.get("/api/measurements/:id", async (req, res) => {
    try {
      const measurement = await storage.getMeasurement(req.params.id);
      if (!measurement) {
        return res.status(404).json({ error: "Measurement not found" });
      }
      res.json(measurement);
    } catch (error) {
      console.error("Error fetching measurement:", error);
      res.status(500).json({ error: "Failed to fetch measurement" });
    }
  });

  // Upload and analyze sand sample
  app.post("/api/predict", upload.single("image"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No image file provided" });
      }

      // Validate user input
      const validationResult = uploadSchema.safeParse(req.body);

      if (!validationResult.success) {
        return res.status(400).json({ 
          error: "Invalid input data", 
          details: validationResult.error.issues 
        });
      }

      const { latitude, longitude, location } = validationResult.data;

      // Simulate ML prediction (replace with actual model inference)
      const grainClasses = ["fine", "medium", "coarse"];
      const grainSizeClass = grainClasses[Math.floor(Math.random() * grainClasses.length)];
      const confidence = 0.85 + Math.random() * 0.13; // Random between 0.85 and 0.98

      // Convert image to base64
      const imageUrl = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;

      // Create measurement with prediction
      const measurement = await storage.createMeasurement({
        imageUrl,
        latitude,
        longitude,
        location: location || null,
        grainSizeClass,
        confidence,
        beachType: null,
      });

      res.status(201)
        .header('Location', `/api/measurements/${measurement.id}`)
        .json(measurement);
    } catch (error) {
      console.error("Error processing upload:", error);
      if (error instanceof multer.MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
          return res.status(413).json({ error: "File too large. Maximum size is 10MB" });
        }
      }
      res.status(500).json({ error: "Failed to process upload" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}

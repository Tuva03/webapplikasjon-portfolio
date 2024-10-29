// Laster miljøvariabler fra en .env-fil
// Laster miljøvariabler fra en .env-fil
import "dotenv/config";

// Importerer createEnv-funksjonen fra @t3-oss/env-core
import { createEnv } from "@t3-oss/env-core";
// Importerer zod for validering av miljøvariabler
import { z } from "zod";

// Definerer en TypeScript-type for miljøvariablene
export type ServerEnv = typeof env;

// Definerer og validerer miljøvariabler
export const env = createEnv({
  server: {
    // Tillater kun disse tre verdiene
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"), // Standardverdi er "development"
    // Konverterer verdien til en streng
    FRONTEND_URL: z.coerce.string(),
    // Konverterer verdien til et tall, standardverdi er 3000
    PORT: z.coerce.number().default(3000),
    // Må være en streng som slutter med ".db"
    DATABASE_URL: z.string().endsWith(".db"),
    // Tillater kun disse fire verdiene, standardverdi er "info"
    LOG_LEVEL: z.enum(["debug", "info", "warn", "error"]).default("info"),
  },
  // Bruker prosess.env som default (finnes alternativer)
  runtimeEnv: process.env,
  // Tolk tomme strenger som undefined
  emptyStringAsUndefined: true,
  // Hopp over validering hvis SKIP_ENV_VALIDATION er satt i .env
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});

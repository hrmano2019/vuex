# Healthcare Drone Delivery Platform

## Overview
This project integrates healthcare professional profiles, drone logistics, delivery requests, and telemedicine consultations into a unified platform. It uses PostgreSQL with Row Level Security (RLS) policies for data protection and Supabase for realtime updates.

## Features
- **Profiles**: Healthcare professionals with roles (doctor, nurse, pharmacist, etc.)
- **Drones**: Fleet management with battery, payload, and geolocation
- **Delivery Requests**: Medication, vaccines, blood, and equipment delivery
- **Telemedicine Consultations**: Secure scheduling between patients and doctors

## Database
Tables:
- `profiles`
- `drones`
- `delivery_requests`
- `telemedicine_consultations`

RLS policies ensure users can only access their own data.

## CI/CD Pipeline
- **Linting**: ESLint
- **Testing**: Jest unit tests
- **Build**: Vue frontend build
- **Deploy**: Vercel deployment via CircleCI

## Environment Variables
Set these in CircleCI project settings:
- `VERCEL_TOKEN` (for deployment)
- `DB_URL` (Postgres connection string)
- `SUPABASE_KEY` (for realtime subscriptions)

## API Contract
See [api.json](./api.json) for endpoint definitions.

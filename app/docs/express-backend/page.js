import Link from "next/link";
import CodeBlock from "../../components/CodeBlock";

export const metadata = {
    title: "Express Backend Template (Clean Architecture) | My Documentation",
    description:
        "Express backend template docs: routes/controllers/services/repos, Drizzle + Mongoose, asyncHandler, JWT + session auth",
};

export default function ExpressBackendTemplatePage() {
    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black">
            <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 sticky top-0 z-10">
                <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4">
                    <Link
                        href="/"
                        className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                    >
                        ← Back to Home
                    </Link>
                </div>
            </header>

            <main className="doc-container">
                <h1 className="doc-title">🧱 Express Backend Template (Clean OOP Structure)</h1>

                <p className="doc-text">
                    A practical Express template for building APIs with a clean separation of concerns:
                    routes → controllers → services → repositories, with centralized error handling and pluggable
                    persistence (in-memory, Mongoose, or Drizzle).
                </p>

                <div className="info-box">
                    <p className="text-blue-800 dark:text-blue-200">
                        💡 Goal: copy these files into a new backend folder and you have a strong baseline.
                    </p>
                </div>

                <div className="doc-divider" />

                <div className="part-header">📁 Suggested Folder Structure</div>

                <section className="doc-section">
                    <CodeBlock
                        language="bash"
                        code={`backend/
  index.js
  package.json
  .env.example
  nodemon.json
  src/
    app.js
    container.js
    config/
      env.js
    db/
      mongoose/
        connection.js
        models/
          User.js
      drizzle/
        db.js
        schema.js
    middlewares/
      asyncHandler.js
      notFound.js
      errorHandler.js
      auth/
        requireJwtAuth.js
        requireSessionAuth.js
    modules/
      health/
        health.routes.js
        health.controller.js
      auth/
        auth.routes.js
        auth.controller.js
        auth.service.js
    repositories/
      UserRepository.js
      memory/
        MemoryUserRepository.js
      mongoose/
        MongooseUserRepository.js
      drizzle/
        DrizzleUserRepository.js
    routes/
      index.js
    utils/
      ApiError.js
      jwt.js`}
                    />
                </section>

                <div className="doc-divider" />

                <div className="part-header">⚙️ Environment & Scripts</div>

                <section className="doc-section">
                    <h2 className="doc-step">.env.example</h2>
                    <CodeBlock
                        language="bash"
                        code={`# Server
NODE_ENV=development
PORT=4000

# Auth
JWT_SECRET=replace_me
JWT_EXPIRES_IN=7d
SESSION_SECRET=replace_me_too

# Repository implementation (memory | mongoose | drizzle)
USER_REPO=memory

# Mongo (only for USER_REPO=mongoose)
MONGO_URI=mongodb://127.0.0.1:27017/app

# Drizzle (example for Postgres)
DATABASE_URL=postgres://user:pass@localhost:5432/app`}
                    />
                </section>

                <section className="doc-section">
                    <h2 className="doc-step">package.json (minimal)</h2>
                    <CodeBlock
                        language="json"
                        code={`{
  "name": "backend",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "nodemon index.js",
    "start": "node index.js"
  },
  "dependencies": {
    "cookie-parser": "^1.4.6",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.8.3",
    "morgan": "^1.10.0"
  }
  }`}
                    />
                    <div className="warning-box">
                        <p className="text-amber-800 dark:text-amber-200">
                            ⚠️ For sessions, add <code className="code-inline">express-session</code>.
                            For Drizzle, add <code className="code-inline">drizzle-orm</code> + a driver (e.g. <code className="code-inline">pg</code>).
                        </p>
                    </div>
                </section>

                <div className="doc-divider" />

                <div className="part-header">🚪 Entry Points</div>

                <section className="doc-section">
                    <h2 className="doc-step">backend/index.js</h2>
                    <CodeBlock
                        language="javascript"
                        code={`import { createApp } from "./src/app.js";
import { env } from "./src/config/env.js";

const app = await createApp();

app.listen(env.PORT, () => {
  console.log("Server running on http://localhost:" + env.PORT);
});`}
                    />
                </section>

                <section className="doc-section">
                    <h2 className="doc-step">src/config/env.js</h2>
                    <CodeBlock
                        language="javascript"
                        code={`import dotenv from "dotenv";

dotenv.config();

function requireEnv(key) {
  const val = process.env[key];
  if (!val) throw new Error("Missing env: " + key);
  return val;
}

export const env = {
  NODE_ENV: process.env.NODE_ENV ?? "development",
  PORT: Number(process.env.PORT ?? 4000),

  JWT_SECRET: requireEnv("JWT_SECRET"),
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN ?? "7d",

  SESSION_SECRET: requireEnv("SESSION_SECRET"),

  USER_REPO: process.env.USER_REPO ?? "memory", // memory | mongoose | drizzle

  MONGO_URI: process.env.MONGO_URI,
  DATABASE_URL: process.env.DATABASE_URL,
};`}
                    />
                </section>

                <section className="doc-section">
                    <h2 className="doc-step">src/app.js</h2>
                    <CodeBlock
                        language="javascript"
                        code={`import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import { env } from "./config/env.js";
import { buildContainer } from "./container.js";
import { registerRoutes } from "./routes/index.js";
import { notFound } from "./middlewares/notFound.js";
import { errorHandler } from "./middlewares/errorHandler.js";

export async function createApp() {
  const app = express();

  app.use(cors({ origin: true, credentials: true }));
  app.use(express.json({ limit: "2mb" }));
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  if (env.NODE_ENV !== "test") app.use(morgan("dev"));

  const container = await buildContainer();
  registerRoutes(app, container);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}`}
                    />
                </section>

                <div className="doc-divider" />

                <div className="part-header">🧩 Dependency Injection (Container)</div>

                <section className="doc-section">
                    <h2 className="doc-step">src/container.js (choose repository implementation)</h2>
                    <CodeBlock
                        language="javascript"
                        code={`import { env } from "./config/env.js";

import { createMongooseConnection } from "./db/mongoose/connection.js";
import { createDrizzleDb } from "./db/drizzle/db.js";

import { MemoryUserRepository } from "./repositories/memory/MemoryUserRepository.js";
import { MongooseUserRepository } from "./repositories/mongoose/MongooseUserRepository.js";
import { DrizzleUserRepository } from "./repositories/drizzle/DrizzleUserRepository.js";

import { HealthController } from "./modules/health/health.controller.js";
import { AuthService } from "./modules/auth/auth.service.js";
import { AuthController } from "./modules/auth/auth.controller.js";

export async function buildContainer() {
  let userRepository;

  if (env.USER_REPO === "memory") {
    userRepository = new MemoryUserRepository();
  } else if (env.USER_REPO === "mongoose") {
    const conn = await createMongooseConnection();
    userRepository = new MongooseUserRepository(conn);
  } else if (env.USER_REPO === "drizzle") {
    const db = await createDrizzleDb();
    userRepository = new DrizzleUserRepository(db);
  } else {
    throw new Error("Unknown USER_REPO: " + env.USER_REPO);
  }

  const authService = new AuthService({ userRepository });
  const authController = new AuthController({ authService });
  const healthController = new HealthController();

  return {
    userRepository,
    authService,
    authController,
    healthController,
  };
}`}
                    />
                    <div className="info-box">
                        <p className="text-blue-800 dark:text-blue-200">
                            💡 This keeps the app clean: swap persistence by changing <code className="code-inline">USER_REPO</code>.
                        </p>
                    </div>
                </section>

                <div className="doc-divider" />

                <div className="part-header">🗄️ Database Connections</div>

                <section className="doc-section">
                    <h2 className="doc-step">Mongoose: src/db/mongoose/connection.js</h2>
                    <CodeBlock
                        language="javascript"
                        code={`import mongoose from "mongoose";
import { env } from "../../config/env.js";

export async function createMongooseConnection() {
  if (!env.MONGO_URI) throw new Error("MONGO_URI is required for mongoose repo");

  mongoose.set("strictQuery", true);
  await mongoose.connect(env.MONGO_URI);

  return mongoose.connection;
}`}
                    />
                </section>

                <section className="doc-section">
                    <h2 className="doc-step">Mongoose Model: src/db/mongoose/models/User.js</h2>
                    <CodeBlock
                        language="javascript"
                        code={`import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, index: true },
    passwordHash: { type: String, required: true },
  },
  { timestamps: true }
);

export const UserModel = mongoose.models.User ?? mongoose.model("User", userSchema);`}
                    />
                </section>

                <section className="doc-section">
                    <h2 className="doc-step">Drizzle: src/db/drizzle/db.js (Postgres example)</h2>
                    <CodeBlock
                        language="javascript"
                        code={`import { env } from "../../config/env.js";

// Example using node-postgres. Install: drizzle-orm pg
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";

export async function createDrizzleDb() {
  if (!env.DATABASE_URL) throw new Error("DATABASE_URL is required for drizzle repo");

  const pool = new pg.Pool({ connectionString: env.DATABASE_URL });
  return drizzle(pool);
}`}
                    />
                </section>

                <section className="doc-section">
                    <h2 className="doc-step">Drizzle schema: src/db/drizzle/schema.js</h2>
                    <CodeBlock
                        language="javascript"
                        code={`import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
        });`}
                    />
                    <div className="warning-box">
                        <p className="text-amber-800 dark:text-amber-200">
                            ⚠️ In real apps you&apos;ll likely use UUIDs + migrations.
                        </p>
                    </div>
                </section>

                <div className="doc-divider" />

                <div className="part-header">🧱 Repository Layer (OOP)</div>

                <section className="doc-section">
                    <h2 className="doc-step">src/repositories/UserRepository.js (interface / contract)</h2>
                    <CodeBlock
                        language="javascript"
                        code={`export class UserRepository {
  /**
   * @param {{ email: string }} params
   * @returns {Promise<{ id: string, email: string, passwordHash: string } | null>}
   */
  async findByEmail(params) {
    throw new Error("Not implemented");
  }

  /**
   * @param {{ email: string, passwordHash: string }} params
   * @returns {Promise<{ id: string, email: string, passwordHash: string }>}
   */
  async create(params) {
    throw new Error("Not implemented");
  }
}`}
                    />
                </section>

                <section className="doc-section">
                    <h2 className="doc-step">Memory repo: src/repositories/memory/MemoryUserRepository.js</h2>
                    <CodeBlock
                        language="javascript"
                        code={`import { randomUUID } from "crypto";
import { UserRepository } from "../UserRepository.js";

export class MemoryUserRepository extends UserRepository {
  constructor() {
    super();
    this.users = []; // {id,email,passwordHash}
  }

  async findByEmail({ email }) {
    return this.users.find((u) => u.email === email) ?? null;
  }

  async create({ email, passwordHash }) {
    const user = { id: randomUUID(), email, passwordHash };
    this.users.push(user);
    return user;
  }
}`}
                    />
                </section>

                <section className="doc-section">
                    <h2 className="doc-step">Mongoose repo: src/repositories/mongoose/MongooseUserRepository.js</h2>
                    <CodeBlock
                        language="javascript"
                        code={`import { UserRepository } from "../UserRepository.js";
import { UserModel } from "../../db/mongoose/models/User.js";

export class MongooseUserRepository extends UserRepository {
  constructor(connection) {
    super();
    this.connection = connection;
  }

  async findByEmail({ email }) {
    const doc = await UserModel.findOne({ email }).lean();
    if (!doc) return null;
    return { id: String(doc._id), email: doc.email, passwordHash: doc.passwordHash };
  }

  async create({ email, passwordHash }) {
    const doc = await UserModel.create({ email, passwordHash });
    return { id: String(doc._id), email: doc.email, passwordHash: doc.passwordHash };
  }
}`}
                    />
                </section>

                <section className="doc-section">
                    <h2 className="doc-step">Drizzle repo: src/repositories/drizzle/DrizzleUserRepository.js</h2>
                    <CodeBlock
                        language="javascript"
                        code={`import { randomUUID } from "crypto";
import { eq } from "drizzle-orm";
import { users } from "../../db/drizzle/schema.js";
import { UserRepository } from "../UserRepository.js";

export class DrizzleUserRepository extends UserRepository {
  constructor(db) {
    super();
    this.db = db;
  }

  async findByEmail({ email }) {
    const rows = await this.db.select().from(users).where(eq(users.email, email)).limit(1);
    return rows[0] ?? null;
  }

  async create({ email, passwordHash }) {
    const user = { id: randomUUID(), email, passwordHash };
    await this.db.insert(users).values(user);
    return user;
  }
}`}
                    />
                </section>

                <div className="doc-divider" />

                <div className="part-header">🧠 Services + Controllers</div>

                <section className="doc-section">
                    <h2 className="doc-step">src/modules/auth/auth.service.js</h2>
                    <CodeBlock
                        language="javascript"
                        code={`import { ApiError } from "../../utils/ApiError.js";
import { signAccessToken } from "../../utils/jwt.js";

export class AuthService {
  constructor({ userRepository }) {
    this.userRepository = userRepository;
  }

  async register({ email, passwordHash }) {
    const existing = await this.userRepository.findByEmail({ email });
    if (existing) throw new ApiError(409, "Email already exists");

    const user = await this.userRepository.create({ email, passwordHash });
    return { user, token: signAccessToken({ sub: user.id, email: user.email }) };
  }

  async login({ email, passwordHash }) {
    const user = await this.userRepository.findByEmail({ email });
    if (!user) throw new ApiError(401, "Invalid credentials");

    // Placeholder password check. In real apps compare with bcrypt.
    if (user.passwordHash !== passwordHash) throw new ApiError(401, "Invalid credentials");

    return { user, token: signAccessToken({ sub: user.id, email: user.email }) };
  }
}`}
                    />
                    <div className="warning-box">
                        <p className="text-amber-800 dark:text-amber-200">
                            ⚠️ Use <code className="code-inline">bcrypt</code> for real password hashing.
                        </p>
                    </div>
                </section>

                <section className="doc-section">
                    <h2 className="doc-step">src/modules/auth/auth.controller.js</h2>
                    <CodeBlock
                        language="javascript"
                        code={`import { asyncHandler } from "../../middlewares/asyncHandler.js";

export class AuthController {
  constructor({ authService }) {
    this.authService = authService;
  }

  register = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const result = await this.authService.register({
      email,
      passwordHash: password, // placeholder
    });
    res.status(201).json(result);
  });

  login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const result = await this.authService.login({
      email,
      passwordHash: password, // placeholder
    });
    res.json(result);
  });
}`}
                    />
                </section>

                <section className="doc-section">
                    <h2 className="doc-step">src/modules/auth/auth.routes.js</h2>
                    <CodeBlock
                        language="javascript"
                        code={`import { Router } from "express";

export function createAuthRouter({ authController }) {
  const router = Router();

  router.post("/register", authController.register);
  router.post("/login", authController.login);

  return router;
}`}
                    />
                </section>

                <section className="doc-section">
                    <h2 className="doc-step">Health module (example)</h2>
                    <CodeBlock
                        language="javascript"
                        code={`// src/modules/health/health.controller.js
import { asyncHandler } from "../../middlewares/asyncHandler.js";

export class HealthController {
  ping = asyncHandler(async (req, res) => {
    res.json({ ok: true, time: new Date().toISOString() });
  });
}

// src/modules/health/health.routes.js
import { Router } from "express";

export function createHealthRouter({ healthController }) {
  const router = Router();
  router.get("/ping", healthController.ping);
  return router;
}`}
                    />
                </section>

                <div className="doc-divider" />

                <div className="part-header">🧵 Routes Wiring</div>

                <section className="doc-section">
                    <h2 className="doc-step">src/routes/index.js</h2>
                    <CodeBlock
                        language="javascript"
                        code={`import { createHealthRouter } from "../modules/health/health.routes.js";
import { createAuthRouter } from "../modules/auth/auth.routes.js";

export function registerRoutes(app, container) {
  app.get("/", (req, res) => res.json({ ok: true }));

  app.use("/health", createHealthRouter({
    healthController: container.healthController,
  }));

  app.use("/auth", createAuthRouter({
    authController: container.authController,
  }));
}`}
                    />
                    <div className="warning-box">
                        <p className="text-amber-800 dark:text-amber-200">
                            ⚠️ Keep route wiring thin; do not put business logic here.
                        </p>
                    </div>
                </section>

                <div className="doc-divider" />

                <div className="part-header">🛡️ Middlewares (Async + Errors)</div>

                <section className="doc-section">
                    <h2 className="doc-step">src/middlewares/asyncHandler.js</h2>
                    <CodeBlock
                        language="javascript"
                        code={`export function asyncHandler(fn) {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}`}
                    />
                </section>

                <section className="doc-section">
                    <h2 className="doc-step">src/utils/ApiError.js</h2>
                    <CodeBlock
                        language="javascript"
                        code={`export class ApiError extends Error {
  constructor(statusCode, message, details) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.details = details;
  }
}`}
                    />
                </section>

                <section className="doc-section">
                    <h2 className="doc-step">src/middlewares/notFound.js</h2>
                    <CodeBlock
                        language="javascript"
                        code={`import { ApiError } from "../utils/ApiError.js";

export function notFound(req, res, next) {
  next(new ApiError(404, "Not found: " + req.method + " " + req.originalUrl));
}`}
                    />
                </section>

                <section className="doc-section">
                    <h2 className="doc-step">src/middlewares/errorHandler.js</h2>
                    <CodeBlock
                        language="javascript"
                        code={`import { ApiError } from "../utils/ApiError.js";

export function errorHandler(err, req, res, next) {
  const status = err instanceof ApiError ? err.statusCode : 500;

  const payload = {
    ok: false,
    message: err.message ?? "Server error",
  };

  if (err instanceof ApiError && err.details !== undefined) {
    payload.details = err.details;
  }

  if (process.env.NODE_ENV !== "production") {
    payload.stack = err.stack;
  }

  res.status(status).json(payload);
}`}
                    />
                </section>

                <div className="doc-divider" />

                <div className="part-header">🔐 Auth: JWT + Session (templates)</div>

                <section className="doc-section">
                    <h2 className="doc-step">JWT helpers: src/utils/jwt.js</h2>
                    <CodeBlock
                        language="javascript"
                        code={`import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export function signAccessToken(payload) {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN });
}

export function verifyAccessToken(token) {
  return jwt.verify(token, env.JWT_SECRET);
}`}
                    />
                </section>

                <section className="doc-section">
                    <h2 className="doc-step">JWT middleware: src/middlewares/auth/requireJwtAuth.js</h2>
                    <CodeBlock
                        language="javascript"
                        code={`import { ApiError } from "../../utils/ApiError.js";
import { verifyAccessToken } from "../../utils/jwt.js";

export function requireJwtAuth(req, res, next) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) return next(new ApiError(401, "Missing Bearer token"));

  const token = header.slice("Bearer ".length);

  try {
    const claims = verifyAccessToken(token);
    req.auth = claims; // { sub, email, iat, exp }
    next();
  } catch {
    next(new ApiError(401, "Invalid token"));
  }
}`}
                    />
                </section>

                <section className="doc-section">
                    <h2 className="doc-step">Session middleware: src/middlewares/auth/requireSessionAuth.js</h2>
                    <p className="doc-text">
                        Template assumes you&apos;re using <code className="code-inline">express-session</code> and you set
                        <code className="code-inline">req.session.userId</code> at login.
                    </p>
                    <CodeBlock
                        language="javascript"
                        code={`import { ApiError } from "../../utils/ApiError.js";

export function requireSessionAuth(req, res, next) {
  const userId = req.session?.userId;
  if (!userId) return next(new ApiError(401, "Not authenticated"));

  req.auth = { sub: userId };
  next();
}`}
                    />
                </section>

                <div className="doc-divider" />

                <section className="doc-section">
                    <h2 className="doc-step">✅ Checklist (what & why)</h2>
                    <ul className="doc-list">
                        <li>
                            Keep controllers thin: parse input + call service + return response
                        </li>
                        <li>
                            Business logic lives in services (unit-testable)
                        </li>
                        <li>
                            Persistence lives in repositories (swappable)
                        </li>
                        <li>
                            Use <code className="code-inline">asyncHandler</code> + centralized error handler
                        </li>
                        <li>
                            JWT auth for stateless APIs; sessions for web apps needing server-side session state
                        </li>
                    </ul>
                </section>
            </main>

            <footer className="border-t border-zinc-200 dark:border-zinc-800 mt-12">
                <div className="max-w-4xl mx-auto px-6 py-6 text-center text-zinc-500 dark:text-zinc-500 text-sm">
                    Personal Documentation Hub
                </div>
            </footer>
        </div>
    );
}

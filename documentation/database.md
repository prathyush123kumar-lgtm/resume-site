# Database

## Database Technology
- **Engine:** SQLite
- **ORM:** Prisma Client
- **Location:** `database/dev.db` (local file database)

## Schema
The database is defined in `database/prisma/schema.prisma`.

### Models

**`ContactMessage`**
Stores messages submitted via the Contact Form.

| Field | Type | Attributes | Description |
|-------|------|------------|-------------|
| `id` | Int | `@id @default(autoincrement())` | Primary key |
| `name` | String | | Sender's name |
| `email` | String | | Sender's email |
| `message` | String | | The message content |
| `createdAt` | DateTime | `@default(now())` | Timestamp of submission |

## Data Flow
1. User submits contact form on frontend.
2. Express server validates and sanitizes input.
3. Express server calls `prisma.contactMessage.create()`.
4. Prisma writes to the `dev.db` SQLite file.

## Security Considerations
The database file `dev.db` must never be committed to source control if it contains real user data. It should be added to `.gitignore`.

## How to Modify the Schema
1. Edit `database/prisma/schema.prisma`.
2. Run `npx prisma db push` inside the `backend/` folder to sync the SQLite file.
3. Run `npx prisma generate` if not done automatically, to update the Node.js client.

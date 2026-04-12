# Project Seed Script

This script populates your database with sample projects including engineering depth data (problem statements, technical challenges, decisions, and impact).

## Scripts Available

### 1. seedProjects.js - Add New Projects
Populates database with 6 complete sample projects with engineering depth.

### 2. updateExistingProjects.js - Update Existing Projects
Adds engineering depth to projects that don't have it yet.

## Prerequisites

1. MongoDB must be running
2. Backend environment variables configured in `.env` file
3. Node.js and pnpm installed

## Usage

### Add Sample Projects (Fresh Start)

From the `Backend` directory, run:

```bash
node scripts/seedProjects.js
```

### Update Existing Projects with Engineering Depth

From the `Backend` directory, run:

```bash
node scripts/updateExistingProjects.js
```

## What seedProjects.js Does

1. Connects to your MongoDB database using `MONGO_URI` from `.env`
2. **Clears all existing projects** from the database (optional - see below)
3. Inserts 6 sample projects with complete engineering depth data:
   - E-Commerce Platform
   - Task Management App
   - Fitness Tracker Mobile App
   - Portfolio Website Template
   - Content Management System
   - Weather Dashboard

Each project includes:
- Basic info (title, description, image, technologies)
- Demo and code links
- Problem statement
- Technical challenges (array)
- Technical decisions (array)
- Impact & results

## What updateExistingProjects.js Does

1. Connects to your MongoDB database
2. Fetches all existing projects
3. **Skips projects that already have engineering depth**
4. Adds sample engineering depth data to projects that don't have it
5. Uses 6 different templates, cycling through them for variety

**Features:**
- ✅ Safe - won't overwrite existing data
- ✅ Smart - skips projects that already have details
- ✅ Fast - updates multiple projects in seconds
- ✅ Informative - shows progress for each update

## Keeping Existing Projects

If you want to **add** sample projects without deleting existing ones when using seedProjects.js, comment out line 194 in the script:

```javascript
// await Project.deleteMany({});
```

## Running from pnpm

You can also add scripts to your `package.json`:

```json
{
  "scripts": {
    "seed": "node scripts/seedProjects.js",
    "update-projects": "node scripts/updateExistingProjects.js"
  }
}
```

Then run:

```bash
pnpm run seed
# or
pnpm run update-projects
```

## Output Examples

### seedProjects.js Output
```
Connecting to MongoDB...
✓ Connected to MongoDB
Clearing existing projects...
✓ Cleared existing projects
Inserting sample projects...
✓ Successfully inserted 6 projects
```

### updateExistingProjects.js Output
```
Connecting to MongoDB...
✓ Connected to MongoDB
Found 8 projects

Updating projects with engineering depth...

✓ Updated "My Portfolio Website"
  - Problem: Traditional approaches weren't scalable...
  - Challenges: 4 items
  - Decisions: 4 items
  - Impact: Achieved 40% faster load times...

⊘ Skipping "E-Commerce Platform" - already has engineering depth

✓ Update completed successfully!
  Total projects: 8
  Updated: 5
  Skipped: 3
```

## Troubleshooting

**Connection Error**: Ensure `MONGO_URI` in `.env` is correct and MongoDB is running

**Permission Error**: Make sure the database user has write permissions

**No Projects Found**: Run `seedProjects.js` first to add initial projects

**Duplicate Key Error**: When using seedProjects.js, the script deletes existing projects by default

## Customization

### Modify Sample Data in seedProjects.js
Edit the `sampleProjects` array in `seedProjects.js` to customize the 6 projects.

### Modify Engineering Templates in updateExistingProjects.js
Edit the `engineeringTemplates` array in `updateExistingProjects.js` to customize the engineering depth data patterns.

Each project follows the Project model schema defined in `Backend/models/Project.js`.

## Workflow Recommendation

1. **First Time Setup**: Run `seedProjects.js` to get 6 complete sample projects
2. **Add Your Own Projects**: Use the dashboard to add your real projects (without engineering depth initially)
3. **Bulk Update**: Run `updateExistingProjects.js` to add sample engineering depth to all projects
4. **Customize**: Edit each project through the dashboard to replace sample data with real details


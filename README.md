### Migrations

# Generate
npm run typeorm migration:generate ./src/migrations/CreatePost -- -d ./src/ormconfig.ts

# Run
npm run typeorm migration:run -- -d ./src/ormconfig.ts

# Show
npm run typeorm migration:show -- -d ./src/ormconfig.ts
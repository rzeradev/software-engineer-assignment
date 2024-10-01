# Start the containers
docker compose up -d

# Run migrations and install dependencies
docker compose exec app composer install
docker compose exec app php artisan migrate

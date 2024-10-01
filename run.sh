# Copy candidate-api/.env.example to candidate-api/.env
cp candidate-api/.env.example candidate-api/.env

# Start the containers
docker compose up -d

# Run migrations and install dependencies
docker compose exec app composer install
docker compose exec app php artisan migrate

# Run laravel tests
docker compose exec app php artisan test
# Copy candidate-api/.env.example to candidate-api/.env
cp candidate-api/.env.example candidate-api/.env

# Start the containers
export UID=$(id -u)
export GID=$(id -g)
docker compose up -d --build

# Run migrations and install dependencies
docker compose exec app composer install
docker compose exec app php artisan migrate

# Run laravel tests
docker compose exec app php artisan test
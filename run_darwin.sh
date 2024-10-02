#!/bin/bash
# Copy candidate-api/.env.example to candidate-api/.env
cp candidate-api/.env.example candidate-api/.env

# Start the containers
export UID=1000
export GID=1000
docker compose up -d --build

# Run migrations and install dependencies
docker compose exec app composer install
docker compose exec app php artisan migrate

# Run laravel tests
docker compose exec app php artisan test
FROM php:8.1-fpm

WORKDIR /var/www

RUN apt-get update && apt-get install -y \
    libpq-dev \
    libzip-dev \
    unzip \
    && docker-php-ext-install pdo pdo_pgsql zip

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

COPY . .

# Set UID and GID dynamically using build arguments to match the host user
ARG UID
ARG GID

# Change www-data's UID and GID to match the host user
RUN if [ -n "$UID" ] && [ -n "$GID" ]; then \
    usermod -u $UID www-data && groupmod -g $GID www-data; \
    fi

RUN chown -R www-data:www-data /var/www \
    && chmod -R 755 /var/www/storage \
    && chmod -R 755 /var/www/bootstrap/cache

EXPOSE 9000
CMD ["php-fpm"]

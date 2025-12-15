# Docker Deployment Guide

This guide explains how to deploy the CATs Medical Records System using Docker.

## Prerequisites

- Docker Engine 20.10+
- Docker Compose 2.0+
- (Optional) PostgreSQL for production database

## Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd CATs-Group-2
   ```

2. **Set up environment variables**
   ```bash
   # Backend
   cp backend/.env.example backend/.env
   # Edit backend/.env with your configuration
   
   # Frontend
   cp frontend/.env.example frontend/.env
   # Edit frontend/.env with your configuration
   ```

3. **Build and start containers**
   ```bash
   docker-compose up -d --build
   ```

4. **Run migrations** (first time only)
   ```bash
   docker-compose exec backend python manage.py migrate
   docker-compose exec backend python manage.py createsuperuser
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000/api
   - Admin Panel: http://localhost:8000/admin

## Configuration

### Environment Variables

#### Backend (.env)
- `SECRET_KEY`: Django secret key (generate with `python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"`)
- `DEBUG`: Set to `False` in production
- `ALLOWED_HOSTS`: Comma-separated list of allowed hosts
- `BLOCKFROST_API_KEY`: Your Blockfrost API key for Cardano integration
- `CARDANO_NETWORK`: Cardano network (preprod, preview, mainnet)

#### Frontend (.env)
- `NEXT_PUBLIC_API_URL`: Backend API URL
- `NEXT_PUBLIC_BLOCKFROST_API_KEY`: Blockfrost API key (public)

### Database

By default, the system uses SQLite. For production, uncomment the PostgreSQL service in `docker-compose.yml`:

```yaml
db:
  image: postgres:15-alpine
  # ... configuration
```

Then update `DATABASE_URL` in `backend/.env`.

## Docker Commands

### Start services
```bash
docker-compose up -d
```

### Stop services
```bash
docker-compose down
```

### View logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
```

### Run migrations
```bash
docker-compose exec backend python manage.py migrate
```

### Create superuser
```bash
docker-compose exec backend python manage.py createsuperuser
```

### Access backend shell
```bash
docker-compose exec backend python manage.py shell
```

### Rebuild containers
```bash
docker-compose up -d --build
```

### Remove all containers and volumes
```bash
docker-compose down -v
```

## Production Deployment

### 1. Update Environment Variables
- Set `DEBUG=False` in `backend/.env`
- Configure proper `ALLOWED_HOSTS`
- Use strong `SECRET_KEY`
- Set up PostgreSQL database
- Configure proper CORS origins

### 2. Use Production Dockerfile
The Dockerfiles are already configured for production. For additional optimizations:

- Use multi-stage builds (already implemented for frontend)
- Enable static file serving with Nginx
- Set up SSL/TLS certificates
- Configure proper logging

### 3. Reverse Proxy (Recommended)
Use Nginx or Traefik as a reverse proxy:

```nginx
# Nginx example
server {
    listen 80;
    server_name your-domain.com;

    location /api {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### 4. Security Considerations
- Never commit `.env` files
- Use secrets management (Docker secrets, AWS Secrets Manager, etc.)
- Enable HTTPS
- Configure firewall rules
- Regular security updates

## Troubleshooting

### Backend won't start
- Check logs: `docker-compose logs backend`
- Verify database connection (if using PostgreSQL)
- Check environment variables
- Ensure port 8000 is not in use

### Frontend won't start
- Check logs: `docker-compose logs frontend`
- Verify `NEXT_PUBLIC_API_URL` is correct
- Check if backend is running
- Ensure port 3000 is not in use

### Database migration errors
```bash
# Reset database (WARNING: deletes all data)
docker-compose down -v
docker-compose up -d
docker-compose exec backend python manage.py migrate
```

### Cardano integration not working
- Verify `BLOCKFROST_API_KEY` is set correctly
- Check network configuration
- Review Cardano service logs
- Ensure smart contracts are in `backend/smart-contracts/`

## File Structure

```
CATs-Group-2/
├── backend/
│   ├── Dockerfile
│   ├── requirements.txt
│   ├── .env.example
│   ├── smart-contracts/        # Cardano contracts
│   └── ...
├── frontend/
│   ├── Dockerfile
│   ├── .env.example
│   └── ...
└── docker-compose.yml
```

## Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Django Deployment Checklist](https://docs.djangoproject.com/en/stable/howto/deployment/checklist/)
- [Next.js Deployment](https://nextjs.org/docs/deployment)





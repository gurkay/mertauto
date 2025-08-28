# Docker Production Setup

## Prerequisites

1. Create environment file:
   ```bash
   cp env.prod.example .env
   # Edit .env with your production values
   ```

2. Create secrets directory and files:
   ```bash
   mkdir -p secrets
   echo "rootroot" > secrets/mysql_root_password.txt
   echo "mertauto123456" > secrets/mysql_password.txt
   chmod 600 secrets/*.txt
   ```

3. Create mysql-data directory:
   ```bash
   mkdir -p mysql-data
   ```

## Production Deployment

1. Build and start services:
   ```bash
   docker-compose -f docker-compose.prod.yml up -d
   ```

2. Check service status:
   ```bash
   docker-compose -f docker-compose.prod.yml ps
   ```

3. View logs:
   ```bash
   docker-compose -f docker-compose.prod.yml logs -f [service_name]
   ```

## Security Improvements

- MySQL port (3306) is only bound to localhost
- Passwords are stored in Docker secrets
- All volumes are mounted as read-only where possible
- Resource limits applied to prevent resource exhaustion
- Proper restart policies for production stability
- Container-to-container communication uses internal network
- Logging configured with rotation

## Monitoring

- Healthchecks configured for all services
- Logs are rotated automatically (10MB max, 3 files)
- Resource monitoring available through Docker stats

## SSL Certificate Management

The certbot service automatically manages SSL certificates. Make sure to:
1. Set the correct DOMAIN and CERTBOT_EMAIL in .env
2. Ensure DNS is pointing to your server
3. Run certbot service: `docker-compose -f docker-compose.prod.yml up certbot`

## Backup Strategy

Regular backups of mysql_data volume are recommended:
```bash
docker exec mysql mysqldump -u root -p mertautodb > backup_$(date +%Y%m%d).sql
```

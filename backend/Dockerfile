# Backend Dockerfile for CATs Medical Records System
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Environment variables
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    DJANGO_SETTINGS_MODULE=core.settings

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    postgresql-client \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements FIRST (important for caching)
COPY backend/requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Copy Django backend code
COPY backend/ .

# Create media directories
RUN mkdir -p media/qrcodes media/lab_results

# Collect static files (do not fail build)
RUN python manage.py collectstatic --noinput || true

# Expose port
EXPOSE 8000

# Health check (lightweight, no external deps)
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD python - <<EOF || exit 1
import socket
s = socket.socket()
s.settimeout(2)
s.connect(("127.0.0.1", 8000))
s.close()
EOF

# Run migrations and start server
CMD ["sh", "-c", "python manage.py migrate && gunicorn core.wsgi:application --bind 0.0.0.0:8000 --workers 2 --timeout 120"]

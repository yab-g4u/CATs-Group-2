FROM python:3.11-slim

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    DJANGO_SETTINGS_MODULE=core.settings

RUN apt-get update && apt-get install -y \
    gcc \
    postgresql-client \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt

COPY . .

RUN mkdir -p media/qrcodes media/lab_results
RUN python manage.py collectstatic --noinput || true

EXPOSE 8000

CMD ["sh", "-c", "rm -f db.sqlite3 && python manage.py migrate && gunicorn core.wsgi:application --bind 0.0.0.0:8000 --workers 2 --timeout 120"]


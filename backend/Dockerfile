# #FROM python:3.8-alpine
FROM python:3.9-alpine3.14

# ENV PYTHONUNBUFFERED 1
# ENV PYTHONDONTWRITEBYTECODE 1

# WORKDIR /app/backend

# COPY requirements.txt /app/backend/

# # Build psycopg2-binary from source -- add required required dependencies
# RUN apk add --virtual .build-deps --no-cache postgresql-dev gcc python3-dev musl-dev && \
#         python -m pip install --upgrade pip && \
#         apk add jpeg-dev zlib-dev libjpeg && \
#         pip install --no-cache-dir -r requirements.txt && \
#         apk --purge del .build-deps

# COPY . /app/backend/

# CMD [ "python", "manage.py", "runserver", "0.0.0.0:8000" ]

EXPOSE 8000

#FROM python:3.8-alpine

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

WORKDIR /app/backend

COPY requirements.txt /app/backend/

# Build psycopg2-binary from source -- add required required dependencies
RUN apk add --virtual .build-deps --no-cache postgresql-dev gcc python3-dev musl-dev && \
        python -m pip install --upgrade pip && \
        apk add jpeg-dev zlib-dev libjpeg && \
        pip install --no-cache-dir -r requirements.txt && \
        apk add postgresql-libs gcc libc-dev && \
        apk --purge del .build-deps

COPY . /app/backend/

CMD [ "python", "manage.py", "runserver", "0.0.0.0:8000" ]
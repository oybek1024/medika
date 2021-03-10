docker rm -f medika-frontend
docker build -t medika/medika-frontend -f Dockerfile-dev .
docker run -p 8080:8080 -d --env-file .env --name medika-frontend medika/medika-frontend:latest
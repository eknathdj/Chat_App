.PHONY: up down build logs shell


up:
docker-compose up --build


down:
docker-compose down -v


build:
docker-compose build


logs:
docker-compose logs -f


shell:
docker exec -it chat-backend sh
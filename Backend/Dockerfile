FROM node:24-alpine
WORKDIR /app
RUN sed -i -e 's/http:/https:/g' /etc/apk/repositories && \
    apk update && apk add --no-cache gcc g++ python3 py3-pip && \
    ln -sf python3 /usr/bin/python
COPY . .
RUN npm install
EXPOSE 4000
CMD ["node","index.js"]

# All commands discussed
# 1. docker info
# 2. docker build -t imageName // builds docker image of Name 'imageName'
# 3. docker images //shows all docker images
# 4. docker run -d imageName //used to run image(imageName), -d used to detach
# 5. docker container ls //
# 6. docker exec -it {container ID} sh
# 7. docker logs {container ID}
# 7. docker kill {container ID}
# 8. docker stop {container ID}
# 9. docker run -d -p {local PORT}:{docker PORT} imageName
# 10. 
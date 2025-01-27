### Docker Basics
1. Docker image is build of layers built from docker image.
2. Docker file run from top to bottom.
3. Docker registry is used for storing the docker images.

### Basic Commands
```Docker
docker version
docker info # Gives move info about installed docker version
docker login
docker container run -p 80:80 -d -n nameofcontainer nginx # Start basic nginx container in detached mode
docker container run -n mongodbname -d mongo # Start mongo db
docker container ls # list all the running containers 
docker ps # running docker container
docker container ls -a # list all the container including stoped
docker ps -a # list docker container running and non running
docker container stop containerID # stop the container
docker container start containerID # start the container 
docker container logs containername # show running container logs
docker container top # show process running on the container 
docker container rm -f containerID # stop and remove the container in one command

docker container run -it container-image-name # run docker container with interative terminal
export DOCKER_HOST=ssh://root@143.222.2222.121 # this connects to the remote docker container
```

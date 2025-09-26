FROM ubuntu:noble

RUN apt-get update
RUN apt-get install openjdk-21-jdk -y
RUN apt-get upgrade -y


WORKDIR /kafka

ENTRYPOINT ["./bin/zookeeper-server-start.sh","./config/zookeeper.properties"]




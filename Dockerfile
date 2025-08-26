FROM ubuntu:noble

RUN apt-get update
RUN apt-get install openjdk-21-jdk -y
RUN apt-get upgrade -y

WORKDIR /app

COPY ./demo/ .

RUN ./mvnw clean install -DskipTests

ENTRYPOINT ["./mvnw","clean","spring-boot:run"]




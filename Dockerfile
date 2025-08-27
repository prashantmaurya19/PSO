FROM ubuntu:noble

RUN apt-get update
RUN apt-get install openjdk-21-jdk -y
RUN apt-get upgrade -y

WORKDIR /prerun

COPY ./api/ .
 # Authentication
RUN cd Authentication/ && ./mvnw clean install -DskipTests
RUN cd Gateway/ && ./mvnw clean install -DskipTests
RUN cd RequestConsumerDispatcher/ && ./mvnw clean install -DskipTests
RUN cd ServiceRegistry/ && ./mvnw clean install -DskipTests
RUN cd UserServices/ && ./mvnw clean install -DskipTests

WORKDIR /app

ENTRYPOINT ["./mvnw","clean","spring-boot:run"]




FROM ubuntu:noble

RUN apt-get update
RUN apt-get install openjdk-21-jdk -y
RUN apt-get install maven -y
RUN apt-get upgrade -y

WORKDIR /prelib

COPY ./lib/ .

# RUN cd PsoUtility/ && mvn clean install
# RUN cd pso-web-mvc-util/ && mvn clean install
RUN for d in */; do \
    echo "Building service in $d"; \
    (cd "$d" && mvn clean install && cd ..); \
done

WORKDIR /prerun

COPY ./api/ .
# RUN cd ServiceRegistry/ && ./mvnw clean install -DskipTests
# RUN cd ViewService/ && ./mvnw clean install -DskipTests
# RUN cd Authentication/ && ./mvnw clean install -DskipTests
# RUN cd Gateway/ && ./mvnw clean install -DskipTests
# RUN cd RequestConsumerDispatcher/ && ./mvnw clean install -DskipTests
# RUN cd UserServices/ && ./mvnw clean install -DskipTests
RUN for d in */; do \
    echo "Building service in $d"; \
    (cd "$d" && rm -rf target/ && ./mvnw clean install -DskipTests && cd ..); \
done


WORKDIR /app

ENTRYPOINT ["./mvnw","clean","spring-boot:run"]
# ENTRYPOINT ["echo"]




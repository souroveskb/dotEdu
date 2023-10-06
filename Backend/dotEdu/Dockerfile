FROM maven:3.8.3-openjdk-17 AS build
WORKDIR /app
COPY target/dotEdu-0.0.1-SNAPSHOT.jar /app/dotedu.jar
ENTRYPOINT ["java", "-jar", "dotedu.jar"]
# --- Build stage: compile with Maven ---
FROM maven:3.9.4-eclipse-temurin-21 AS build
LABEL authors="seaum siddiqui"
WORKDIR /app
# Copy only pom.xml first to download dependencies (allows cache reuse)
COPY pom.xml .
RUN mvn dependency:go-offline -B
# Copy source and build JAR (skip tests for speed)
COPY src ./src
RUN mvn clean package -DskipTests -B

# --- Run stage: minimal Java 21 runtime ---
FROM eclipse-temurin:21-jre-alpine
# Create non-root user 'spring' and set as current user
RUN addgroup -S spring && adduser -S spring -G spring -h /app
USER spring:spring
WORKDIR /app
# Copy the built JAR from the build stage
COPY --from=build /app/target/*.jar app.jar
# Expose application port (default 8080)
EXPOSE 9090
# Run the Spring Boot JAR
ENTRYPOINT ["java","-jar","/app/app.jar"]

FROM eclipse-temurin:17-jdk

WORKDIR /app

COPY . .

RUN ./mvnw clean package -DskipTests

RUN cp target/*.jar app.jar

CMD ["java", "-jar", "app.jar"]

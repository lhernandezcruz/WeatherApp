#!/bin/sh

# download invoker if the file does not exist
FILE=./java-function-invoker-1.0.2.jar
if [ ! -f "$FILE" ]; then
    echo "$FILE does not exist. Downloading invoker"
  mvn dependency:copy \
    -Dartifact='com.google.cloud.functions.invoker:java-function-invoker:1.0.2' \
    -DoutputDirectory=.
fi

# build package
mvn clean package

# deploy
java -jar java-function-invoker-1.0.2.jar \
  --classpath target/deployment/lhernandezcruz-weather-1.0-SNAPSHOT-runner.jar \
  --target io.quarkus.gcp.functions.http.QuarkusHttpFunction

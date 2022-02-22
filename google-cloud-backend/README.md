# GCP backend for weather app

The backend proxies requests for the React app so that API credentials are not exposed.
It is built using Java and packaged using Quarkus. Quarkus packages the image into a 
linux executable that is then packaged in docker container. This allows for a faster
startup going from seconds to around a hundred milliseconds.

The docker container is then deployed to Cloud Run using Waypoint.

## Deploy locally

First, add an environment variable for `OPEN_WEATHER_API_KEY` which is the API key for Open Weather API.

The app can then be built and run locally using

```
mvn compile quarkus:dev
```

The app will be served at http://localhost:8080. 

## Deploy to GCP
The app is deployed to Cloud Run using the waypoint Cloud Run plugin.

### Google Cloud Platform setup

Follow the `Sign Up`, `Install gloud command`, `Enable Google Cloud Run`, `Authenticate to Google Cloud` steps in the Hashicorp tutorial for [Google Cloud Run](https://learn.hashicorp.com/tutorials/waypoint/google-cloud-run).

### Local env setup

Add environment variables for `WEATHER_API_KEY` with an API key from Weather API, `LOCATION_IQ_API_KEY` from Location IQ, and `GOOGLE_PROJECT_ID` with the GCP project id.

### Build

The package will be built as a Linux executable for performance boost.

If you are running Linux based system with GraalVM installed run the following:

```
mvn package -Pnative
```

Otherwise run,

```
mvn package -Pnative -Dquarkus.native.container-build=true
```

The parameter `Dquarkus.native.container-build` will biuld the Linux executable using a docker container.

# Deploy
Initialize the Waypoint project using `waypoint init`. This only needs to be ran once.

Deploy the API using using `waypoint up`. At completion a message will appear with the URL granted by Cloud Run. The application is now deployed.

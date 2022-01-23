project = "weather-api"

app "weather-api" {
  build {
    use "docker" {
      disable_entrypoint = true
    }

    registry {
      use "docker" {
        image = "gcr.io/${var.google_project_id}/weather-api"
        tag = "latest"
      }
    }
  }  

  deploy {
    use "google-cloud-run" {
      project = var.google_project_id
      location = "us-west1"
      port = 8080

      unauthenticated = true
      static_environment = {
        "OPEN_WEATHER_API_KEY" = var.open_weather_api_key
      }
    }
  }

  release {
    use "google-cloud-run" {}
  }
}

variable "open_weather_api_key" {
  type = string
  description = "key used to retrieve weather from Open Weather API"
  env = ["OPEN_WEATHER_API_KEY"]
}

variable "google_project_id" {
  type = string
  description = "google project id"
  env = ["GOOGLE_PROJECT_ID"]
}
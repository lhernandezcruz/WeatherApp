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
        "WEATHER_API_KEY" = var.weather_api_key
        "LOCATION_IQ_API_KEY" = var.location_iq_api_key
      }
    }
  }

  release {
    use "google-cloud-run" {}
  }
}

variable "weather_api_key" {
  type = string
  description = "key used to retrieve weather from Open Weather API"
  env = ["WEATHER_API_KEY"]
}

variable "location_iq_api_key" {
  type = string
  description = "key used to retrieve location from Location IQ"
  env = ["LOCATION_IQ_API_KEY"]
}

variable "google_project_id" {
  type = string
  description = "google project id"
  env = ["GOOGLE_PROJECT_ID"]
}
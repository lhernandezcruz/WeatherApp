variable "project" {
  type        = string
  description = "Google Cloud Platform Project ID"
}

variable "region" {
  default = "us-west1"
  type    = string
}

variable open_weather_api_key {
    description = "OpenWeather API Key"
    type = string
    sensitive = true
}
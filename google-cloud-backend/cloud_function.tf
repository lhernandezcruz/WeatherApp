# Create zip file
data "archive_file" "function_code_zip" {
  type        = "zip"
  source_dir  = "${path.module}/function/target/deployment"
  output_path = "${path.module}/temp/weather-function-jar.zip"
}

# Create bucket to store zip file
resource "google_storage_bucket" "weather_proxy_bucket" {
  name     = "weather-proxy"
  location = "US"
}

# Upload zip file
resource "google_storage_bucket_object" "archive" {
  name = "weather_proxy_function_${data.archive_file.function_code_zip.output_md5}.zip"

  bucket = google_storage_bucket.weather_proxy_bucket.name
  source = data.archive_file.function_code_zip.output_path

  depends_on = [data.archive_file.function_code_zip]
}

# Create cloud function
resource "google_cloudfunctions_function" "function" {
  name        = "weather-proxy-function"
  description = "Weather proxy function"
  runtime     = "java11"

  source_archive_bucket = google_storage_bucket.weather_proxy_bucket.name
  source_archive_object = google_storage_bucket_object.archive.name
  trigger_http          = true
  entry_point           = "io.quarkus.gcp.functions.http.QuarkusHttpFunction"

  environment_variables = {
    OPEN_WEATHER_API_KEY = var.open_weather_api_key
  }
}

# IAM entry for all users to invoke the function
resource "google_cloudfunctions_function_iam_member" "invoker" {
  project        = google_cloudfunctions_function.function.project
  region         = google_cloudfunctions_function.function.region
  cloud_function = google_cloudfunctions_function.function.name

  role   = "roles/cloudfunctions.invoker"
  member = "allUsers"
}

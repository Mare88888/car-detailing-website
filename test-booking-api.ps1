# Quick test for POST /api/booking (run while "npm run dev" is running)
$body = @{
  name    = "Test User"
  carType = "BMW 3 Series"
  service = "Full valet"
  date    = "2025-03-01"
  message = "This is a test message to verify the email is sent."
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/booking" -Method POST -Body $body -ContentType "application/json"

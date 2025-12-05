# Create datum for referral contract
@'
{
  "constructor": 0,
  "fields": [
    {
      "bytes": "issuer123"
    },
    {
      "bytes": "abcdef1234567890abcdef1234567890abcdef12"
    },
    {
      "int": 1703123456
    }
  ]
}
'@ | Out-File -FilePath "referral_datum.json" -Encoding UTF8

# Create redeemer (Void for our contract)
@'
{
  "constructor": 0,
  "fields": []
}
'@ | Out-File -FilePath "referral_redeemer.json" -Encoding UTF8

Write-Host "Datum and redeemer files created!"

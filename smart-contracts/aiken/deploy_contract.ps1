# Complete deployment script for Referral Contract
# This script will automatically cd to the correct directory

$networkMagic = 1  # Pre-production testnet
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptDir

Write-Host "Starting Referral Contract Deployment..." -ForegroundColor Green
Write-Host "Working directory: $(Get-Location)" -ForegroundColor Cyan

# Step 1: Create script address
Write-Host "Step 1: Creating script address..." -ForegroundColor Yellow
cardano-cli address build `
  --payment-script-file referral.script `
  --testnet-magic $networkMagic `
  --out-file referral.addr

$scriptAddress = Get-Content "referral.addr"
Write-Host "Script Address: $scriptAddress" -ForegroundColor Yellow

# Step 2: Create datum and redeemer files
Write-Host "Step 2: Creating datum and redeemer files..." -ForegroundColor Yellow
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

@'
{
  "constructor": 0,
  "fields": []
}
'@ | Out-File -FilePath "referral_redeemer.json" -Encoding UTF8

Write-Host "Datum and redeemer files created!" -ForegroundColor Green

# Step 3: Get protocol parameters
Write-Host "Step 3: Getting protocol parameters..." -ForegroundColor Yellow
cardano-cli query protocol-parameters `
  --testnet-magic $networkMagic `
  --out-file protocol.json

# Step 4: Get UTXOs from your wallet
Write-Host "Step 4: Getting wallet UTXOs..." -ForegroundColor Yellow
if (!(Test-Path "payment.addr")) {
    Write-Host "❌ Error: payment.addr not found. Please create wallet keys first!" -ForegroundColor Red
    exit 1
}

$walletAddress = Get-Content "payment.addr"
cardano-cli query utxo `
  --address $walletAddress `
  --testnet-magic $networkMagic `
  --out-file utxo.json

# Find a UTXO with ADA
$utxoData = Get-Content "utxo.json" | ConvertFrom-Json
$utxoKeys = $utxoData.PSObject.Properties.Name
$selectedUtxo = $null
$selectedUtxoIndex = $null

foreach ($utxoKey in $utxoKeys) {
    $utxo = $utxoData.$utxoKey
    if ($utxo.value.lovelace -gt 3000000) {  # At least 3 ADA
        $selectedUtxo = $utxoKey
        $selectedUtxoIndex = $utxo.output_index
        break
    }
}

if (!$selectedUtxo) {
    Write-Host "❌ Error: No UTXO with sufficient ADA found!" -ForegroundColor Red
    Write-Host "Please fund your wallet with test ADA from: https://docs.cardano.org/cardano-testnet/tools/faucet" -ForegroundColor Yellow
    exit 1
}

Write-Host "Using UTXO: $selectedUtxo#$selectedUtxoIndex" -ForegroundColor Cyan

# Step 5: Build transaction
Write-Host "Step 5: Building deployment transaction..." -ForegroundColor Yellow
cardano-cli transaction build `
  --tx-in "$selectedUtxo#$selectedUtxoIndex" `
  --tx-out "$scriptAddress+2000000" `
  --tx-out-datum-hash-file referral_datum.json `
  --change-address $walletAddress `
  --protocol-params-file protocol.json `
  --testnet-magic $networkMagic `
  --out-file tx.raw

# Step 6: Sign transaction
Write-Host "Step 6: Signing transaction..." -ForegroundColor Yellow
if (!(Test-Path "payment.skey")) {
    Write-Host "❌ Error: payment.skey not found. Please create wallet keys first!" -ForegroundColor Red
    exit 1
}

cardano-cli transaction sign `
  --tx-body-file tx.raw `
  --signing-key-file payment.skey `
  --testnet-magic $networkMagic `
  --out-file tx.signed

# Step 7: Submit transaction
Write-Host "Step 7: Submitting transaction..." -ForegroundColor Yellow
cardano-cli transaction submit `
  --tx-file tx.signed `
  --testnet-magic $networkMagic

# Step 8: Get transaction hash
Write-Host "Step 8: Getting transaction hash..." -ForegroundColor Yellow
$txHash = cardano-cli transaction txid --tx-file tx.raw
Write-Host "Transaction Hash: $txHash" -ForegroundColor Green

# Step 9: Verify deployment
Write-Host "Step 9: Verifying deployment..." -ForegroundColor Yellow
Start-Sleep -Seconds 30  # Wait for confirmation

cardano-cli query utxo `
  --address $scriptAddress `
  --testnet-magic $networkMagic

Write-Host ""
Write-Host "Deployment Complete!" -ForegroundColor Green
Write-Host "Script Address: $scriptAddress" -ForegroundColor Yellow
Write-Host "Transaction Hash: $txHash" -ForegroundColor Yellow
Write-Host "Explorer URL: https://preprod.cardanoscan.io/address/$scriptAddress" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next: Use your backend integration to create referrals!" -ForegroundColor Magenta

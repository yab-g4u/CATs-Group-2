# Setup wallet for Cardano testnet
# Run this first to create keys and get test ADA

$networkMagic = 1  # Pre-production testnet
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptDir

Write-Host "Setting up Cardano Testnet Wallet..." -ForegroundColor Green
Write-Host "Working directory: $(Get-Location)" -ForegroundColor Cyan

# Generate key pair
Write-Host "Generating key pair..." -ForegroundColor Yellow
cardano-cli address key-gen `
  --verification-key-file payment.vkey `
  --signing-key-file payment.skey

# Generate address
Write-Host "Generating address..." -ForegroundColor Yellow
cardano-cli address build `
  --payment-verification-key-file payment.vkey `
  --testnet-magic $networkMagic `
  --out-file payment.addr

$address = Get-Content "payment.addr"
Write-Host "Wallet Address: $address" -ForegroundColor Yellow
Write-Host "Send test ADA to this address from: https://docs.cardano.org/cardano-testnet/tools/faucet" -ForegroundColor Cyan
Write-Host ""
Write-Host "After funding your wallet, run: .\deploy_contract.ps1" -ForegroundColor Magenta

# Defina o caminho completo para o executável pnpm
$pnpmPath = "C:\Users\bruno\AppData\Roaming\npm"

# Defina o caminho para o primeiro diretório
$primeiroCaminho = "C:\Include Systems\videoUpload-ai-web\include-video-upload-ia-api"

# Execute o comando "pnpm run dev" no primeiro diretório
Start-Process -FilePath $pnpmPath -ArgumentList "run", "dev" -WorkingDirectory $primeiroCaminho -Wait

# Defina o caminho para o segundo diretório
$segundoCaminho = "C:\Include Systems\videoUpload-ai-web"

# Execute o comando "pnpm run dev" no segundo diretório
Start-Process -FilePath $pnpmPath -ArgumentList "run", "dev" -WorkingDirectory $segundoCaminho -Wait

# Aguarde alguns segundos (você pode ajustar esse valor)
Start-Sleep -Seconds 10

# Abra o navegador no endereço "http://localhost:5173"
Start-Process -FilePath "http://localhost:5173"

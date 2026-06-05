$prefix = "http://localhost:8000/"
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($prefix)
$listener.Start()
Write-Output "Serving $prefix from $(Get-Location)"
while ($true) {
  $ctx = $listener.GetContext()
  $req = $ctx.Request
  $raw = $req.Url.LocalPath.TrimStart('/')
  if ($raw -eq '') { $raw = 'index.html' }
  $file = Join-Path (Get-Location) $raw
  if (Test-Path $file) {
    try {
      $bytes = [System.IO.File]::ReadAllBytes($file)
      $lc = $file.ToLower()
      $ctype = 'application/octet-stream'
      if ($lc.EndsWith('.html')) { $ctype = 'text/html' }
      elseif ($lc.EndsWith('.css')) { $ctype = 'text/css' }
      elseif ($lc.EndsWith('.js')) { $ctype = 'application/javascript' }
      elseif ($lc.EndsWith('.png')) { $ctype = 'image/png' }
      elseif ($lc.EndsWith('.jpg') -or $lc.EndsWith('.jpeg')) { $ctype = 'image/jpeg' }
      elseif ($lc.EndsWith('.mp4')) { $ctype = 'video/mp4' }
      $ctx.Response.ContentType = $ctype
      $ctx.Response.ContentLength64 = $bytes.Length
      $ctx.Response.OutputStream.Write($bytes,0,$bytes.Length)
    } catch {
      $ctx.Response.StatusCode = 500
      $msg = $_.Exception.Message
      $buf = [System.Text.Encoding]::UTF8.GetBytes($msg)
      $ctx.Response.OutputStream.Write($buf,0,$buf.Length)
    }
  } else {
    $ctx.Response.StatusCode = 404
    $buf = [System.Text.Encoding]::UTF8.GetBytes('Not Found')
    $ctx.Response.OutputStream.Write($buf,0,$buf.Length)
  }
  $ctx.Response.OutputStream.Close()
}

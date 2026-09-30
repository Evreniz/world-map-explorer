@echo off
cd /d "%~dp0"

where python >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    set "PY_CMD=python"
) else (
    where py >nul 2>nul
    if %ERRORLEVEL% EQU 0 (
        set "PY_CMD=py"
    ) else (
        echo Python bulunamad^i. Python kurulu olmas^i gerekli.
        echo L^f^f^f^f: https://www.python.org/downloads/
        pause
        exit /b 1
    )
)

start "" http://localhost:8000
%PY_CMD% -m http.server 8000

if %ERRORLEVEL% NEQ 0 (
    echo Sunucu ba^xlat^xlamad^x.
    pause
)

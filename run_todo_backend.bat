@echo off
setlocal

REM Define paths
set "env_name=todo_env"
set "env_path=.\todo_backend\%env_name%"
set "requirements_file=.\todo_backend\requirements.txt"
set "app_script=.\todo_backend\app.py"
set "marker_file=.\todo_backend\%env_name%\requirements_installed.marker"

REM Step 1: Check if virtual environment already exists
if exist %env_path%\Scripts\activate.bat (
    echo Virtual environment already exists.
) else (
    REM Create the virtual environment
    echo Creating virtual environment...
    python -m venv %env_path%
    if %errorlevel% neq 0 (
        echo Failed to create virtual environment
        exit /b %errorlevel%
    )
)

REM Step 2: Activate the virtual environment
echo Activating virtual environment...
call %env_path%\Scripts\activate.bat
if %errorlevel% neq 0 (
    echo Failed to activate virtual environment
    exit /b %errorlevel%
)

REM Step 3: Install requirements if marker file does not exist
if not exist %marker_file% (
    echo Installing requirements...
    pip install -r %requirements_file%
    if %errorlevel% neq 0 (
        echo Failed to install requirements
        exit /b %errorlevel%
    )
    echo Creating marker file...
    echo Requirements installed on %date% at %time% > %marker_file%
) else (
    echo Requirements already installed.
)

REM Step 4: Execute app.py
echo Executing app.py...
python %app_script%
if %errorlevel% neq 0 (
    echo Failed to execute app.py
    exit /b %errorlevel%
)

echo Setup completed successfully.
endlocal

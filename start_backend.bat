@echo off
setlocal

REM Define paths
set "env_name=todo_env"
set "env_path=.\todo_backend\%env_name%"
set "app_script=.\todo_backend\app.py"

REM Step 1: Activate the virtual environment
echo Activating virtual environment...
call %env_path%\Scripts\activate.bat
if %errorlevel% neq 0 (
    echo Failed to activate virtual environment
    exit /b %errorlevel%
)

REM Step 2: Execute app.py
echo Executing app.py...
python %app_script%
if %errorlevel% neq 0 (
    echo Failed to execute app.py
    exit /b %errorlevel%
)
echo Backend started successfully.
endlocal

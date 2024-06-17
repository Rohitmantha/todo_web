@echo off
setlocal

REM Define paths
set "env_name=todo_env"
set "env_path=.\todo_backend\%env_name%"
set "requirements_file=.\todo_backend\requirements.txt"
set "create_db_script=.\todo_backend\create_db.py"
set "app_script=.\todo_backend\app.py"

REM Step 1: Create the virtual environment
echo Creating virtual environment...
python -m venv %env_path%
if %errorlevel% neq 0 (
    echo Failed to create virtual environment
    exit /b %errorlevel%
)

REM Step 2: Activate the virtual environment
echo Activating virtual environment...
call %env_path%\Scripts\activate.bat
if %errorlevel% neq 0 (
    echo Failed to activate virtual environment
    exit /b %errorlevel%
)

REM Step 3: Install requirements
echo Installing requirements...
pip install -r %requirements_file%
if %errorlevel% neq 0 (
    echo Failed to install requirements
    exit /b %errorlevel%
)

REM Step 4: Execute create_db.py
echo Executing create_db.py...
python %create_db_script%
if %errorlevel% neq 0 (
    echo Failed to execute create_db.py
    exit /b %errorlevel%
)

REM Step 5: Execute app.py
echo Executing app.py...
python %app_script%
if %errorlevel% neq 0 (
    echo Failed to execute app.py
    exit /b %errorlevel%
)

echo Setup completed successfully.
endlocal

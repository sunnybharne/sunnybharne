# Python

## Prerequsite

### Using pipenv
```zsh
brew install python (Installs python3 and pip3 globally)
brew install pipenv (This installs pipenv)
pipenv --python 3.9 (This creates the python environment and creates the pipfile)
pipenv install robotframework
pipenv install robotframework-seleniumlibrary
pipenv shell (start the env shell)
```

### Using Poetry
```Zsh
brew install python (Installs python3 and pip3 globally)
brew install poetry
poetry init
poetry add robotframework
poetry add robotframework-seleniumlibrary
poetry shell
```

### Project structure
- /Tests
    /ProductOne
        - Home.robot
        - Login.robot
    /ProductTwo
        - LoginApi.robot
        - LogoutApi.robot
- /Resources
    - Common.robot(Suite setup, open browser, Init stuff)
    - ProductOne
        - ProductApp.robot
        /PO (Page objects)
            - Home.robot
            - Login.robot
            - TopNav.robot
    - ProductTwo
        - Blah Blah
- /Libraries
- /Results
    - ProductOne


## How to run

- Create vertual env

    ```sh
    python3 -m venv .venv
    ```

- Activate virtual env

    ```sh
    source .venv/bin/activate
    ```

- Install dependencies

    ```sh
    pip install -r requirements.txt
    ```

- Apply migrations 

    ```sh
    python3 manage.py migrate
    ```

- Download fcm service account creadential json

- Create `run.sh` file under `backend` folder with env variables listed in `run.sh.example` file

- Making `run.sh` Executable

    ```sh
    chmod +x ./run.sh
    ```

- Run dev server

    ```sh
    ./run.sh
    ```

### References

- [Initialize the SDK in non-Google environments](https://firebase.google.com/docs/admin/setup#initialize_the_sdk_in_non-google_environments)
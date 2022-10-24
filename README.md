# Time manager

Time manager is a simple app to register work sessions.
<p>&nbsp;</p>

## <strong>Installation</strong>

### <strong> Linux (WSL2) installation : </strong>

The lastest versions of Elixir (1.13.4) and Erlang/OTP 25 has to be install as follow :


### 1. Retrieved latest package version for Elixir and Erlang
```bash
$ wget https://packages.erlang-solutions.com/erlang-solutions_2.0_all.deb && sudo dpkg -i erlang-solutions_2.0_all.deb
```
### 2. Update the packages
```bash
$ sudo apt update
```
### 3. Retrieved latest package version for Elixir and Erlang
```bash
$ sudo apt update
```
### 4. Retrieved latest package version for Elixir and Erlang
```bash
$ sudo apt install esl-erlang
```
### 5. Retrieved latest package version for Elixir and Erlang
```bash
$ sudo apt install elixir
```

### 6. Checkout the Elixir version, you should see :
```bash
$ elixir --version
Erlang/OTP 25 [erts-13.0.4] [source] [64-bit] [smp:12:12] [ds:12:12:10] [async-threads:1] [jit:ns]

Elixir 1.13.4 (compiled with Erlang/OTP 25)
```
### 7. Here's the command to install Hex (If you have Hex already installed, it will upgrade Hex to the latest version):
```bash
$ mix local.hex
```
### 8. Once we have Elixir and Erlang, we are ready to install the Phoenix application generator:
```bash
$ mix archive.install hex phx_new
```

<p>&nbsp;</p>

## <strong>Fisrt set-up</strong>

### <strong>Creating Phoenix application</strong>

### 1. Once you have everything installed you're ready to generate new Phoenix project by executing:
```bash
$ mix phx.new app_name
```

<p>&nbsp;</p>

## <strong>Docker set-up</strong>

### <strong>Prerequires: </strong>
You need to have install Docker Desktop and had link your Linux subsystem to docker Desktop in the parameters : Ressources --> WSL Integration --> Enable integration with additional distros:


### <strong>Build the docker images from the ground :</strong>

### 1. First we need to build our Docker image:
```bash
$ docker-compose build
```
### 2. Go to config/dev.ex and change the content for your database by this:
```bash
# Configure your database
config :myapp, Myapp.Repo,
  url: System.get_env("DATABASE_URL"),
  show_sensitive_data_on_connection_error: true,
  pool_size: 10
```

### 3. Update your endpoint IP to 0.0.0.0
```bash
config :time_manager, TimeManagerWeb.Endpoint,
  # Binding to loopback ipv4 address prevents access from other machines.
  # Change to `ip: {0, 0, 0, 0}` to allow access from other machines.
  http: [ip: {0, 0, 0, 0}, port: 4000],
```

### 4. Create a database to connect:
```bash
$ docker-compose run api mix ecto.create
```

### 5. Lunch docker !
```bash
$ docker-compose up
```


<p>&nbsp;</p>

## <strong>Docker usage</strong>

### <strong>From now you need to execute every command from Elixir and Phoenix from docker !!</strong>

### 1. For instance, this command... 
```bash
$ mix ecto.migrate
```
### ... is now this !
```bash
$ docker-compose run web mix ecto.migrate
```

Warning: "web" is the name of the container that include our API

So commands follows now this schema : 
### ... is now this !
```bash
$ docker-compose run container_name <command>
```

### 2. Stop containers from running : 
```bash
$ docker-compose stop
```

### 2. Remove containers and images (rollback to the state before the build) : 
```bash
$ docker-compose down -v
```

### 2. Restart the containers : 
```bash
$ docker-compose up -d
```

"-d" flag allow to not get the logs in the terminal


<p>&nbsp;</p>

## Contributing
Pull requests are welcome !

<p>&nbsp;</p>

## License
[MIT](https://choosealicense.com/licenses/mit/)
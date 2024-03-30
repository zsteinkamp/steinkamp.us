# steinkamp.us Compose Example

This directory contains a `docker-compose.yml` file that you can customize for your needs.

[Download the file to your computer now](/zsteinkamp/steinkamp.us/blob/main/compose_example/docker-compose.yml) so that you can modify it.

It will fetch pre-built containers from the Github Container Registry, so there
is nothing to do, aside from perhaps customizing the port if you want to expose
it.

```
  web:
    image: ghcr.io/zsteinkamp/steinkamp.us
    depends_on:
      - web
    ports:
      - '4125:3125'
```

## Start the application

You can then run `docker compose up -d` and it will start a server after pulling the latest images.

```
> docker compose up -d
[+] Running 1/1
 ✔ Container steinkamp.us-compose-web-1     Created        0.0s
>
```

The application is now running! You can check it out at http://hostname:4125/ (substituting the hostname where you're running these commands).

## Watching logs

To watch what is happening, you can run `docker compose logs -f`. This is just like `tail -f` that you may be familiar with. Press `Ctrl-C` to stop watching the logs.

## Stopping the application

While in the directory with your `docker-compose.yml` file, run:

```
docker compose down
```

The application will take about 10 seconds to stop.

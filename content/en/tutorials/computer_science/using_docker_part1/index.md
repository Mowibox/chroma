---
title: "Using Docker – Part 1"
summary: Introduction to Docker
weight: 2
icon: "docker"
---

<p align="center">
    <img src="/chroma/images/docker1.png" alt="Docker" class="w-full h-auto" />
</p>

This tutorial series will show you how to use Docker on a Linux computer. This part is dedicated to installing Docker.

## Docker?

Docker is an open-source tool that allows you to package an application and its dependencies into an isolated environment (called a container) that can run on any server.

_"So it's kind of like a [virtual machine](https://cloud.google.com/learn/what-is-a-virtual-machine?hl=en), right...?"_

Yes and no! A virtual machine isolates an entire system and has its own resources. Docker, however, shares the host system's kernel resources and interacts with containers, which reduces overhead and improves performance.

With Docker, you can create a specific image of your application, which will encapsulate all the necessary dependencies, libraries, operating system, and more. You can then share this Docker image and run it consistently on any system that supports Docker.

## Installation on Linux

{{< callout context="note" title="Note" icon="outline/info-circle" >}}
The installation procedure below can also be found on the [official Docker site](https://docs.docker.com/engine/install/ubuntu)
{{< /callout >}}

On your machine, open a terminal (Ctrl+Alt+T) and enter the following commands:

```bash {frame="none"}
curl -fsSL https://get.docker.com -o get-docker.sh
```

You can check that you have successfully downloaded the get-docker.sh file with the command `ls`.

Then execute the .sh file to start the Docker installation:

```bash {frame="none"}
sudo sh ./get-docker.sh
```

Once Docker is installed, there are still some post-installation commands to run:

Check that the "docker" group has been created with the command `sudo groupadd docker`:

```bash {frame="none"}
sudo groupadd docker
```

Example output if it already exists:

```bash {title="Terminal"}
mowibox@chroma$ sudo groupadd docker
[sudo] password for mowibox:
groupadd: group 'docker' already exists
```

Add your user (that's you!) to the docker group:

```bash {frame="none"}
sudo usermod -aG docker $USER
```

Then check if the docker service is enabled:

```bash {frame="none"}
systemctl is-enabled docker
```

If it is not, you can enable it by entering the following commands:

```bash {frame="none"}
sudo systemctl enable docker.service
sudo systemctl enable containerd.service
```

After entering all the commands, you can reboot your system for the changes to take effect:

```bash {frame="none"}
reboot
```

And there you go! Your Docker is ready to use. You can run the command `docker run hello-world` in the terminal to verify. You should get the output below:

```bash {title="Terminal"}
mowibox@chroma:~$ docker run hello-world
Unable to find image 'hello-world:latest' locally
latest: Pulling from library/hello-world
e6590344b1a5: Pull complete
Digest: sha256:940c619fbd418f9b2b1b63e25d8861f9cc1b46e3fc8b018ccfe8b78f19b8cc4f
Status: Downloaded newer image for hello-world:latest

Hello from Docker!
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 1. The Docker client contacted the Docker daemon.
 2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
    (amd64)
 3. The Docker daemon created a new container from that image which runs the
    executable that produces the output you are currently reading.
 4. The Docker daemon streamed that output to the Docker client, which sent it
    to your terminal.

To try something more ambitious, you can run an Ubuntu container with:
 $ docker run -it ubuntu bash

Share images, automate workflows, and more with a free Docker ID:
 https://hub.docker.com/

For more examples and ideas, visit:
 https://docs.docker.com/get-started/
```

The next tutorial explains the Docker concept of images and containers and teaches you how to handle them.

## Credits

* **Author:** [Ousmane THIONGANE](https://github.com/Mowibox)
* **Lastest update:** June 2025
* **Contributors:**

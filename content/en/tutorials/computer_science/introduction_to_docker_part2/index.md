---
title: "Introduction to Docker – Part 2"
summary: Images & containers
weight: 1007
icon: "docker"
---

<p align="center"> <img src="/chroma/images/docker1.png" alt="Docker" class="w-full h-auto" /> </p>

This tutorial series will show you how to use Docker on a Linux computer. This part focuses on Docker images and containers. The commands used in this section are those specified in the [official Docker documentation.](https://docs.docker.com/reference/cli/docker/)

## Images and containers – what are they?

### Image

If you're familiar with computers, you've probably heard of disk images: these are files that contain an exact copy of the structure and data of a disk. For example, this type of image is used to install an operating system on a machine (e.g., `.iso` files). Flashing an image to a disk means recreating a faithful copy of its contents.

Docker images follow the same principle.
A Docker image is a file containing all the files, libraries, dependencies, etc., of an environment at a given time. Like a disk image, it can be "flashed" — in Docker we call this "running it" — to get a functional system based on that image.

### Container

When you run an image, you create a container. It's like a disk where you flashed an image: you can access the container, run programs, create files, etc. Any modifications made to the container won’t alter the original image. Containers can be started or stopped at will, just like turning a computer on or off.

Running an image again will create a new container identical to the previous one — but without any modifications.

## Working with images

### Listing and adding images

You can list the images available in your Docker setup with this command:

```bash {frame="none"}
docker images
```

For example, if you ran the command `docker run hello-world` from the previous tutorial, you'll see the "hello-world" image listed:

```bash {title="Terminal"}
mowibox@chroma:~$ docker images
REPOSITORY    TAG      IMAGE ID       CREATED        SIZE
hello-world   latest   74cc54e27dc4   4 months ago   10.1kB
```

You can also add new images to your Docker setup. For instance, try adding the ROS 2 Humble image with the following command:

```bash {frame="none"}
docker pull ros:humble
```

You can verify the image was added with `docker images`:

```bash {title="Terminal"}
mowibox@chroma:~$ docker images
REPOSITORY    TAG      IMAGE ID       CREATED        SIZE
hello-world   latest   74cc54e27dc4   4 months ago   10.1kB
ros           humble   168e1f658ab5   3 years ago    753MB
```

{{< callout context="note" title="Note" icon="outline/info-circle" >}}
As you may have seen with the "hello-world" image in the [previous tutorial]({{< relref "tutorials/computer_science/introduction_to_docker_part1" >}}), if you try to run a container from an image that hasn't been added, Docker will automatically download it.
{{< /callout >}}

### Removing images

To remove an image, such as "hello-world", use:

```bash {frame="none"}
docker rmi hello-world
```

```bash {title="Terminal"}
mowibox@chroma:~$ docker rmi hello-world
Error response from daemon: conflict: unable to remove repository reference "hello-world" (must force) - container 55ccfd696889 is using its referenced image 74cc54e27dc4
```

It didn’t work! Likely the same happened for you. Why? Because we launched a container from this image, and it still exists (even if stopped), so Docker doesn’t allow deleting the image just like that. To force deletion, use the `-f` flag:

```bash {frame="none"}
docker rmi -f hello-world
```

Example :

```bash {title="Terminal"}
mowibox@chroma:~$ docker rmi -f hello-world
Untagged: hello-world:latest
Untagged: hello-world@sha256:940c619fbd418f9b2b1b63e25d8861f9cc1b46e3fc8b018ccfe8b78f19b8cc4f
Deleted: sha256:74cc54e27dc41bb10dc4b2226072d469509f2f22f1a3ce74f4a59661a1d44602

mowibox@chroma:~$ docker images
REPOSITORY    TAG      IMAGE ID       CREATED       SIZE
ros           humble   168e1f658ab5   3 years ago   753MB
```

The image is now removed from the list.

## Working with containers

### Creating a container

Now try running a container from the ROS 2 Humble image with the `run` command:

```bash {frame="none"}
docker run ros:humble
```

Ironically, if everything went well, nothing happened… By default, Docker opens the container and exits as soon as it finishes the default command. This is ideal for deploying applications — like in robotics — where a protocol runs and exits.

But for development purposes, we want to interact with the container. Use the `-it` flags (`i` for interactive, `t` for TTY):

```bash {frame="none"}
docker run -it ros:humble
```

Example :

```bash {title="root@2f7a757d7c23:/"}
mowibox@chroma:~$ docker run -it ros:humble
root@2f7a757d7c23:/#
```

Just like in any terminal, you can browse files (`ls`), create new ones (`touch`/`mkdir`), delete them (`rm`), etc.

### Listing and removing containers

Like images, you can list active containers. Without closing your container, open a second terminal and run:

```bash {frame="none"}
docker ps
```

Example :

```bash {title="Terminal n°2"}
mowibox@chroma:~$ docker ps
CONTAINER ID   IMAGE        COMMAND                  CREATED         STATUS         PORTS     NAMES
2f7a757d7c23   ros:humble   "/ros_entrypoint.sh …"   3 minutes ago   Up 3 minutes             suspicious_black
```

Inside the container, you can use ROS 2 commands without needing to install ROS on your host computer — amazing!

Example from inside the container:

```bash {title="root@2f7a757d7c23:/"}
root@2f7a757d7c23:/# ros2 topic list
/parameter_events
/rosout
```

Outside the container (assuming no native ROS installation):

```bash {title="Terminal n°2"}
mowibox@chroma:~$ ros2 topic list
bash: ros2: command not found
```

To exit the container, two methods:

* Inside the container: Press `CTRL + D` or run `exit`
* From the second terminal: Use `docker stop <name>`. `<name>` being the name of the container generated in the container list. In my case, the container is called “suspicious_black”, so I'll use:

```bash {frame="none"}
docker stop suspicious_black  # Adapt the command to the name of your container
```

Running `docker ps` will show the container is no longer active. To view all containers (including stopped ones), use:

```bash {frame="none"}
docker ps -a
```

Example :

```bash {title="Terminal"}
mowibox@chroma:~$ docker ps
CONTAINER ID   IMAGE        COMMAND                  CREATED         STATUS         PORTS     NAMES

mowibox@chroma:~$ docker ps -a
CONTAINER ID   IMAGE        COMMAND                  CREATED          STATUS         PORTS                NAMES
2f7a757d7c23   ros:humble   "/ros_entrypoint.sh …"   11 minutes ago   Exited (137)   About a minute ago   suspicious_black
```

To restart the container, you can use:

```bash {frame="none"}
docker start -i suspicious_black # Adapt the command to the name of your container
```

To delete an inactive container, use one of these two commands:

* Delete a specific container:

```bash {frame="none"}
docker rm <name>
```

* Delete all inactive containers

```bash {frame="none"}
docker container prune
```

### Using multiple terminals in one container

Sometimes you may want multiple terminals in the same container. First, launch it normally:

```bash {frame="none"}
docker run -it ros:humble
```

Then, in another terminal, use the following command:

```bash {frame="none"}
docker exec -it <name> /bin/bash
```

Example :

```bash {title="Terminal n°1"}
mowibox@chroma:~$ docker run -it ros:humble
root@a719943a59fc:/#
```

```bash {title="Terminal n°2"}
mowibox@chroma:~$ docker ps # Pour récupérer le nom du conteneur
CONTAINER ID   IMAGE        COMMAND                  CREATED          STATUS          PORTS     NAMES
a719943a59fc   ros:humble   "/ros_entrypoint.sh …"   12 seconds ago   Up 11 seconds             unruffled_cray

mowibox@chroma:~$ docker exec -it unruffled_cray /bin/bash
root@a719943a59fc:/#
```

The docker run command has useful flags:

* `--name` sets a custom name for your container. This avoids having to manage a random name each time a container is created:

```bash {frame="none"}
docker run --name <container_name> <image_name>
```

* `--rm` deletes the container automatically when it stops:

```bash {frame="none"}
docker run -rm <image name>
```

{{< callout context="caution" title="Tip" icon="outline/bulb" >}}
Multiple flags can be combined!
{{< /callout >}}

With these commands, you already have a solid foundation in how images and containers work. However, every time you create a new container, you lose changes made in previous ones using the same image — there's no persistent way to save files yet. This is where the Dockerfile comes in — the subject of the next tutorial.

---

## Credits

* **Writer:** [Ousmane THIONGANE](https://mowibox.github.io/)
* **Latest update:** September 2025
* **Reviewer:**

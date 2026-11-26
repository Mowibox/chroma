---
title: "Install the software"
description: "Flash the Chromapi OS image on the SD card with Raspberry Pi Imager."
summary: "Flash the Chromapi OS image on the SD card with Raspberry Pi Imager."
date: 2026-11-12
lastmod: 2026-11-13
draft: false
weight: 20
toc: true
icon: "download"
contributors: ["Ousmane THIONGANE"]

seo:
   title: ""
   description: "Install the Chromapi software: flash the Chromapi OS image on the SD card of the robot with Raspberry Pi Imager, step by step."
   canonical: ""
   noindex: false
   robots: "index, follow"
---

Chromapi's software, "**Chromapi OS**", is distributed as an image. The image is based on Ubuntu Server 24.04 (LTS), with the Chromapi SDK, the web app and the Raspberry Pi configuration already set up.

## Prerequisites

* The robot's SD card (16 GB minimum recommended).
* An SD card reader: it can be [external](/chroma/images/_sdcardreader.jpg), but some computers have a built-in slot.
* [Raspberry Pi Imager](https://www.raspberrypi.com/software/) version 2.0.
* The name and password of your Wi-Fi network.

## Flashing the image to the card

### 1. Adding Chromapi OS to Raspberry Pi Imager

{{< steps >}}
{{< step >}}
Open Raspberry Pi Imager and click **App Options**.

<p align="center">
 {{< img src="images/chromapi/chromapi_installation1.png" alt="Raspberry Pi Imager App Options" sizes="(max-width: 800px) 100vw, 800px" >}}
</p>
{{< /step >}}
{{< step >}}
In the **Content Repository** section, choose **Use custom URL** and enter the address below:

```text
https://github.com/Mowibox/chromapi/releases/latest/download/os_list.json
```

<p align="center">
 {{< img src="images/chromapi/chromapi_installation2.png" alt="Custom repository URL" sizes="(max-width: 800px) 100vw, 800px" >}}
</p>
{{< /step >}}
{{< step >}}
Once confirmed, Chromapi OS is loaded into Raspberry Pi Imager's list.
{{< /step >}}
{{< /steps >}}

{{< callout context="note" title="Alternative" icon="outline/info-circle" >}}
If the address does not work, download the `os_list.json` file from the [latest release](https://github.com/Mowibox/chromapi/releases/latest), then use it with **Use custom file** instead.
{{< /callout >}}

### 2. Choosing the configuration options

{{< steps >}}
{{< step >}}
In **Device**, choose **Raspberry Pi 4**.

<p align="center">
 {{< img src="images/chromapi/chromapi_installation3.png" alt="Device selection" sizes="(max-width: 800px) 100vw, 800px" >}}
</p>
{{< /step >}}
{{< step >}}
In **OS**, choose **Chromapi OS**.

<p align="center">
 {{< img src="images/chromapi/chromapi_installation4.png" alt="Chromapi OS selection" sizes="(max-width: 800px) 100vw, 800px" >}}
</p>
{{< /step >}}
{{< step >}}
In **Storage**, select your SD card.

<p align="center">
 {{< img src="images/chromapi/chromapi_installation5.png" alt="Storage selection" sizes="(max-width: 800px) 100vw, 800px" >}}
</p>
{{< /step >}}
{{< /steps >}}

### 3. Customizing the OS and writing the SD card

To customize your OS, fill in the fields as follows:

| Setting | What to enter |
| :--- | :--- |
| Hostname | Your robot's name on the network, for example `chromapi-livingroom`. Leave `chromapi` to have it rename itself automatically (as `chromapi-xxxx`). |
| Localisation | Choose your city/country, time zone and keyboard layout. |
| User | Keep the name `chromapi` and choose a password if you plan to program the robot (used for SSH login). |
| Wi-Fi | Your network's name and password. At first, it is a good idea to connect it to your phone's hotspot (in 2.4 GHz) so that Chromapi is not tied to a single place. |
| SSH (Remote Access) | Enable password authentication if you plan to program the robot. If you have a public SSH key, you can also set it with the "use public key authentication" option. |

{{< callout context="caution" title="Important" icon="outline/alert-triangle" >}}
The username must stay `chromapi`: it is the account already present in the image, and the password chosen here is assigned to it on first boot. The image contains no default password.
{{< /callout >}}

<p align="center">
    {{< img src="images/chromapi/chromapi_installation6.png" alt="Write summary" sizes="(max-width: 800px) 100vw, 800px" >}}
</p>

Once your settings are configured, review the card's configuration one last time, then start writing the SD card (Write). Once the verification step is over, you can remove the SD card.

## First boot

The robot does not need to be fully assembled for this part: the Raspberry Pi plugged into the motherboard and the batteries are enough.

{{< steps >}}
{{< step >}}
Insert the SD card into the Raspberry Pi.
{{< /step >}}
{{< step >}}
Turn on the motherboard with its switch.
{{< /step >}}
{{< step >}}
Wait a few minutes: on first boot, the system configures itself (network, name, keys).
{{< /step >}}
{{< /steps >}}

The Raspberry Pi is ready when its web app responds. From a phone or a computer **on the same Wi-Fi network as configured in Raspberry Pi Imager**, you can access the web app at:

```text
https://chromapi.local:5000
```

The hostname you set also works. For example, if it is `chromapi-livingroom`, you can open:

```text
https://chromapi-livingroom.local:5000
```

The next steps are described on the [First start]({{< relref "chromapi/getting-started/first-start/" >}}) page.

## Finding Chromapi on the network

* **If there is only one robot on the network**: the hostname `chromapi.local` is enough.
* **If there are two or more robots on the network**: each robot answers to its own name, `chromapi-xxxx.local`, where `xxxx` are the last four characters of its Raspberry Pi's serial number. As mentioned above, it can also be set by the user.
* **To find its name**: if you cannot find your Chromapi's name, turn off the robot, insert its SD card into a computer and open the `chromapi-name.txt` file on the `system-boot` partition. The name is written there after the first boot.

## Adding Wi-Fi networks manually

You can configure several Wi-Fi networks for the robot to connect to. To do so:

{{< steps >}}
{{< step >}}
Turn off Chromapi and insert its card into a computer.
{{< /step >}}
{{< step >}}
On the `system-boot` partition, open the `network-config.yaml` file with a text editor.
{{< /step >}}
{{< step >}}
Add or replace your network by editing the `access-points` section:

```yaml
network:
  version: 2
  wifis:
    wlan0:
      dhcp4: true
      optional: true
      access-points:
        "network name 1":
          password: "password 1"
        "network name 2":
          password: "password 2"
```

{{< /step >}}
{{< step >}}
Put the card back into the robot. The changes are applied on boot.
{{< /step >}}
{{< /steps >}}

{{< callout context="note" title="Note" icon="outline/info-circle" >}}
You can also edit this file while the robot is on by connecting to it over SSH (Developer mode).
{{< /callout >}}

## Manual installation

If you would rather start from an Ubuntu Server 24.04 you installed yourself on the Raspberry Pi, Chromapi's system configuration can be done manually with an install script. Once connected to Chromapi over SSH, run:

```bash
git clone https://github.com/Mowibox/chromapi.git && ./chromapi/deploy/setup_rpi.sh && sudo reboot
```

This clones the folder containing Chromapi's code and runs the setup script. The `setup_rpi.sh` script installs the packages, configures the Raspberry Pi's peripherals (serial port, camera, sound, fan), creates the Python environment and enables the required services. It can safely be run several times. Unlike the computer installation (`pip install chromapi`), the robot needs the full repository: the `deploy/` folder contains the services and system configuration, which are not part of the pip package.

---

title: "Set up an headless Raspberry Pi"
summary: Using SSH protocol
weight: 4002
icon: "chip"

---

<p align="center">
    <img src="/chroma/images/headless1.png" alt="Raspberry Pi Zero 2 W" class="w-full h-auto" />
</p>

Usually, a Raspberry Pi is set up using a screen, a keyboard, and a mouse. But maybe you don’t have that equipment — or simply don’t need it for your project. For example, if your project doesn’t require a graphical interface, it's more resource-efficient to skip the screen altogether.

This tutorial offers an alternative method to configure your Raspberry Pi without any external peripherals, by installing Ubuntu Server and accessing it remotely via SSH.

## Requirements

* A Raspberry Pi: This tutorial uses a [Raspberry Pi Zero 2W](https://www.raspberrypi.com/products/raspberry-pi-zero-2-w/), but it can easily be adapted to other boards such as the Raspberry Pi 4, 5, etc.
* A power supply for your Raspberry Pi.
* A computer running Linux — for example, Ubuntu.
* The [Raspberry Pi Imager](https://www.raspberrypi.com/software/) software.
* A microSD card: The size depends on your use case, but 8–16 GB is a reasonable minimum to get started.
* An SD card reader: It can be [external](/chroma/images/_sdcardreader.jpg), but some computers have one built in.

## Preparing the SD Card

Here’s the step-by-step guide to prepare your SD card:

* Insert the SD card into your computer and launch Raspberry Pi Imager. You should see an interface similar to this:

<p align="center">
    <img src="/chroma/images/headless2.png" alt="Raspberry Pi Imager" class="w-full h-auto" />
</p>

* Start by selecting your Raspberry Pi model via "Choose Device":

<p align="center">
    <img src="/chroma/images/headless3.png" alt="Choosing Device" class="w-full h-auto" />
</p>

* Click "Choose OS" to pick the operating system to flash onto the SD card. Select "Other general-purpose OS":

<p align="center">
    <img src="/chroma/images/headless4.png" alt="Choosing OS" class="w-full h-auto" />
</p>

* Among the available Ubuntu versions, pick a "Server" version — these don’t include graphical interface packages and dependencies, which is perfect since we won’t be using a screen:

<p align="center">
    <img src="/chroma/images/headless5.png" alt="Choosing Ubuntu Server 24.04" class="w-full h-auto" />
</p>

* Then select the SD card as your storage location. If it’s the only external storage connected, it should be easy to spot.

<p align="center">
    <img src="/chroma/images/headless6.png" alt="Choosing Storage" class="w-full h-auto" />
</p>

* Click "Next" — the software will ask whether you want to configure settings before writing the OS. Click "Edit Settings".

<p align="center">
    <img src="/chroma/images/headless7.png" alt="Editing Settings" class="w-full h-auto" />
</p>

* You should see a window similar to this one:

<p align="center">
    <img src="/chroma/images/headless8.png" alt="General Settings" class="w-full h-auto" />
</p>

* Adjust the following settings according to your needs:

  * Hostname — you can leave the default value.
  * Username and password for logging into the Pi.
  * Wi-Fi credentials the Pi will use at boot.
  * Locale and keyboard layout.

{{< callout context="caution" title="Tip" icon="outline/bulb" >}}
Instead of connecting the Pi to your home Wi-Fi, you can connect it to your phone’s mobile hotspot. That way, you can use your Pi anywhere!
{{< /callout >}}

{{< callout context="danger" title="Warning" icon="outline/alert-square-rounded" >}}
Make sure your chosen Wi-Fi network uses the 2.4 GHz band — Raspberry Pis cannot connect to 5 GHz networks.
{{< /callout >}}

* Finally, go to the "Services" section and enable SSH. Leave the authentication method set to "Use password authentication".

<p align="center">
    <img src="/chroma/images/headless9.png" alt="Enabling SSH" class="w-full h-auto" />
</p>

* Click "Save", then "Yes" to begin flashing the OS to the SD card. Once the process is complete, remove the SD card and insert it into your Raspberry Pi.

* Plug the Pi into a power source. A green LED should blink. Now, let’s try to connect to it from your computer.

## Connecting via SSH

### What is SSH?

SSH (Secure Shell) is a secure protocol that lets you remotely access and send commands to another computer. That’s how you’ll control your Raspberry Pi from your PC — no screen or keyboard required. But to use SSH, you first need to find your Pi’s IP address.

### Finding the Raspberry Pi’s IP Address

If you used the mobile hotspot trick, you can usually find the Pi's IP address in the hotspot settings — just look for the device name in the connected devices list.

_If your Pi doesn’t show up, check that your hotspot is using the 2.4 GHz band._

If you have the IP address, you can go straight to the [next section](#connecting-to-the-raspberry-pi). Otherwise, continue reading.

<p align="center">
    <img src="/chroma/images/headless10_en.png" alt="Hotspot tip" class="w-full h-auto" />
</p>

* On your computer, install the network tool package `net-tools`:

```bash {frame=none}
sudo apt install net-tools
```

* Connect your computer to the same Wi-Fi network that the Pi will use. Then run the following command to view your network info:

```bash {frame=none}
ifconfig
```

You should see something like this:

```bash {title="Terminal", hl_lines=[2]}
wlp0s20f3: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet x.x.x.x  netmask 255.255.255.0  broadcast x.x.x.255
```

Look for the interface matching your network (often `wlp...` for Wi-Fi, or `eth0` for Ethernet).

Next to `inet`, you’ll find your computer’s local IP address — we’ll use that to find the Pi.

* Install the `nmap` tool:

```bash {frame=none}
sudo apt install nmap
```

* Launch a network scan, replacing `x.x.x.x` with your own IP:

```bash {frame=none}
nmap -p 22 x.x.x.x/24
```

{{< callout context="note" title="What does this command do?" icon="outline/info-circle" >}}
`nmap` is a network exploration tool.

* The `-p 22` option tells it to scan only port 22, which is used for SSH.
* The `/24` suffix means we're scanning the full IP range from `x.x.x.1` to `x.x.x.254`. This is a ["subnet mask"](https://en.wikipedia.org/wiki/Subnet).

In short, this command lists all devices on your network that have port 22 open — making it easy to spot the Raspberry Pi.
{{< /callout >}}

Here’s an example output:

```bash {title="Terminal", hl_lines=[8,9,10,11,12]}
Starting Nmap 7.94SVN ( https://nmap.org ) at 2025-07-12 01:20 CEST
Nmap scan report for _gateway (z.z.z.z)
Host is up (0.023s latency).

PORT   STATE  SERVICE
22/tcp closed ssh

Nmap scan report for y.y.y.y
Host is up (0.071s latency).

PORT   STATE SERVICE
22/tcp open  ssh

Nmap scan report for mowibox-HP-EliteBook (x.x.x.x)
Host is up (0.00011s latency).

PORT   STATE  SERVICE
22/tcp closed ssh

Nmap done: 256 IP addresses (3 hosts up) scanned in 5.26 seconds
```

* Look for an IP address with port 22 marked as `open`. In this case, the Raspberry Pi’s IP address is `y.y.y.y`.

### Connecting to the Raspberry Pi

Once you have the Pi’s IP address, connect with:

```bash {frame=none}
ssh chromapi@x.x.x.x
```

Replace `chromapi` with the username you set in Raspberry Pi Imager, and `x.x.x.x` with the Pi’s IP address.

The first time, you’ll be asked to confirm the authenticity of the device. Type "yes" and enter the password you set during setup.

If everything went well, you should see a welcome message like this:

```bash {title="chromapi@chroma~"}
Welcome to Ubuntu 24.04.2 LTS (GNU/Linux 6.8.0-1018-raspi aarch64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/pro

 System information as of Sat Jul 12 01:27:32 CEST 2025

  System load:  0.26              Temperature:            38.6 C
  Usage of /:   7.4% of 28.69GB   Processes:              139
  Memory usage: 47%               Users logged in:        0
  Swap usage:   0%                IPv4 address for wlan0: x.x.x.x

...
chromapi@chroma:~$
```

Congratulations! You're now connected to your Raspberry Pi. A few final configuration steps remain before it’s fully ready.

### System Configuration

* Update Ubuntu packages (this may take a while):

```bash {frame=none}
sudo apt update
sudo apt upgrade
```

Ubuntu doesn’t come with the `raspi-config` tool found in Raspberry Pi OS, so you’ll need to install it manually:

```bash {frame=none}
sudo apt install raspi-config
sudo raspi-config
```

This will bring up a configuration menu where you can enable or disable various Pi-specific options.

Here are a few options I often enable:

* Interface options > Legacy camera
* Interface options > SPI
* Interface options > I2C
* Interface options > Serial Port
* Interface options > Remote GPIO
* Performance options > GPU Memory > 128 MB

Save your changes and reboot your Pi.

And that’s it! Your Raspberry Pi is now ready to use — no screen required!

---

## Credits

* **Writer:** [Ousmane THIONGANE](https://mowibox.github.io/)
* **Latest update:** July 2025
* **Reviewer:**

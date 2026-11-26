---
title: "SDK installation"
description: "Install the Chromapi Python SDK on your computer."
summary: "Install the Chromapi Python SDK on your computer."
date: 2026-11-12
lastmod: 2026-11-22
draft: false
weight: 10
toc: true
icon: "python"
contributors: ["Ousmane THIONGANE"]

seo:
   title: ""
   description: "Install the Chromapi Python SDK on your computer to start programming the quadruped robot, in simulation or on the real robot."
   canonical: ""
   noindex: false
   robots: "index, follow"
---

If you are a developer or researcher looking to create interactions or experiment with new movements on Chromapi, you are in the right place! Chromapi's SDK lets you program all kinds of behaviors on the robot in Python.

On the robot, the SDK is already installed in [Chromapi OS]({{< relref "chromapi/getting-started/installation/" >}}). This page walks you through installing it on your computer too, to work in [simulation]({{< relref "chromapi/developing/simulation/" >}}) or explore the code.

## Prerequisites

* Python 3.12 or newer.
* [pip](https://pip.pypa.io/) (bundled with Python) or [uv](https://docs.astral.sh/uv/).
* Some familiarity with [using a terminal]({{< relref "tutorials/computer-science/using-terminal" >}}): a tutorial is available on the site if it is your first time.

To develop in good conditions, it is recommended to install the SDK in a [virtual environment]({{< relref "tutorials/computer-science/setting-up-virtual-environment" >}}). This avoids dependency issues between your projects.

## Installing the SDK

There are two ways:

* **From PyPI**: the simplest way, to use the SDK in your own projects.
* **From source**: to contribute to the code or run the examples, which are not included in the package.

{{< tabs "install" >}}
{{< tab "PyPI" >}}
**With pip**

Create and activate a virtual environment, then install the SDK:

```bash
python3 -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install "chromapi[all]"
```

**With uv**

`uv` is a Python package manager that creates and manages the virtual environment for you. To install it (Linux and macOS):

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

For Windows, follow the [uv documentation](https://docs.astral.sh/uv/getting-started/installation/). Then create a project and add the SDK to it:

```bash
uv init my-project
cd my-project
uv add "chromapi[all]"
```

{{< /tab >}}
{{< tab "From source" >}}
You also need [Git](https://git-scm.com/). If this tool is new to you, [part 1 of the Git and GitHub tutorial]({{< relref "tutorials/computer-science/introduction-to-github-part1" >}}) explains the basics.

Clone the repository:

```bash
git clone https://github.com/Mowibox/chromapi
cd chromapi
```

**With pip**

Create and activate a virtual environment, then install the SDK in editable mode (with `-e`, your code changes are picked up without reinstalling every time), from the `chromapi` folder:

```bash
python3 -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -e ".[all]"
```

**With uv**

`uv` creates the virtual environment and installs all the extras in one command. In the `chromapi` folder:

```bash
uv sync --all-extras
```

{{< /tab >}}
{{< /tabs >}}

### Extras

The SDK is installed with one or more extras, depending on your needs:

| Extra | What it adds |
| :--- | :--- |
| `sim` | MuJoCo, for [simulation]({{< relref "chromapi/developing/simulation/" >}}) |
| `audio` | Sound playback |
| `hub` | Downloading [moves]({{< relref "chromapi/developing/moves/" >}}) from Hugging Face |
| `rl` | Running reinforcement learning policies (planned) |
| `all` | All of the above |

For example, for simulation only: `pip install "chromapi[sim]"` or `uv add "chromapi[sim]"`. Several extras can be combined with a comma: `"chromapi[sim,audio]"`.

## Checking the installation

Save this program in a file named `my_script.py`. It makes the simulated robot stand up then lie down:

```python
from chromapi.chromapi import Chromapi

with Chromapi(backend="mujoco", launch_viewer=True) as robot:
    robot.wake_up(wait=True)
    robot.rest(wait=True)
```

Then run the script:

{{< tabs "run" >}}
{{< tab "pip" >}}
With the virtual environment activated:

```bash
python my_script.py
```

{{< /tab >}}
{{< tab "uv" >}}

```bash
uv run python my_script.py
```

{{< /tab >}}
{{< /tabs >}}

If all went well, a MuJoCo window opens and Chromapi stands up.

<p align="center">
    <img src="/chroma/gifs/chromapi_sdk_wake_up.gif" alt="Chromapi stands up then lies down in MuJoCo" />
</p>

Congratulations! You are all set to develop on Chromapi! Next, get familiar with the [SDK basics]({{< relref "chromapi/developing/sdk-basics/" >}}).

## On the robot

If you want to test movements on a real robot, connect over SSH with the `chromapi` account and the password chosen during [installation]({{< relref "chromapi/getting-started/installation/" >}}).

```bash
ssh chromapi@chromapi.local
```

{{< callout context="danger" title="Warning!" icon="outline/alert-triangle" >}}
The web app holds the motherboard's serial port. Before running your own programs on the robot, stop it with **Settings › Power › Developer mode**. You can restart it with `sudo systemctl start chromapi@$USER` or on the next power-up.
{{< /callout >}}

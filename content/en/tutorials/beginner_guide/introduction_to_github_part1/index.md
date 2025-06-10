---
title: "Introduction to Git and GitHub – Part 1"
summary: Understanding the basics through drawings
weight: 4
icon: "git"
---


<p align="center">
    <img src="/chroma/images/gitgithub.png" alt="Git and GitHub" class="w-full h-auto" />
</p>

GitHub is a web-based platform for hosting and managing software development projects, built on the Git version control system. Like a cloud drive, it allows you to store and manage files, but goes far beyond that by offering complete version control, easy collaboration between developers, and issue tracking features. To understand how it works without diving into complex details, let me tell you a little story:

## Chrome and the "repository mine"

Meet Chrome.

<p align="center">
    <img src="/chroma/images/gitgithub1.png" alt="Chrome" class="w-full h-auto" />
    </br>
    <em style="font-size: 0.95em;">Chrome: Charmingly unstoppable!</em>
</p>

Chrome is a cheerful fellow who loves creating files and sharing them with his friends. He used to use all kinds of quirky methods to send them (letters, carrier pigeons—you name it!). It worked, but every time he wanted to make a change, he had to send the updated file to all his friends again. The problem went both ways: when a friend modified a file, they had to send it back, and others wouldn’t see the change right away. Worse still, if multiple friends sent him their modified versions, he’d end up overwhelmed with files!

One day, Chrome came up with a solution: he created a mine.

<p align="center">
    <img src="/chroma/images/gitgithub2.jpg" alt="Repository mine" class="w-full h-auto" />
    </br>
    <em style="font-size: 0.95em;">The repository mine.</em>
</p>

This mine allowed everyone to pick up files contributed and modified by the team in a centralized place, avoiding duplicate chaos. Let’s call this mine the **repository**. To make transferring files easier, Chrome created a local copy of the files from the repository, which he placed in a cart:

<p align="center">
    <img src="/chroma/images/gitgithub3.jpg" alt="" class="w-full h-auto" />
    </br>
    <em style="font-size: 0.95em;">The cart is a local copy of the mine's content.</em>
</p>

Since Chrome just created the repository, there are no files yet. So naturally, his cart is empty. The next step is to fill it up. For example, Chrome decides to create File A:

<p align="center">
    <img src="/chroma/images/gitgithub4.jpg" alt="" class="w-full h-auto" />
    </br>
    <em style="font-size: 0.95em;">Chrome creates File A — I think it’s a great file, don’t you?</em>
</p>

Pleased with File A, he wants to share it in the mine so his friends can see it. He does this in several steps:

First, he prepares File A for sending by **adding (add)** it to his cart:

<p align="center">
    <img src="/chroma/images/gitgithub5.jpg" alt="" class="w-full h-auto" />
    </br>
    <em style="font-size: 0.95em;">Chrome adds File A.</em>
</p>

So his friends don't get lost in the mine, he writes a little note about the change and attaches it to the cart. This **commitment (commit)** officially validates the content of the cart.

<p align="center">
    <img src="/chroma/images/gitgithub6.jpg" alt="" class="w-full h-auto" />
    </br>
    <em style="font-size: 0.95em;">Chrome describes the change: "Added File A." (Trust me, English-speaking friends, this is what's written on the drawing)</em>
</p>

<p align="center">
    <img src="/chroma/images/gitgithub7.jpg" alt="" class="w-full h-auto" />
    </br>
    <em style="font-size: 0.95em;">By attaching the label, he validates the change — ready to go!</em>
</p>

Once everything is ready, Chrome simply **pushes (push)** his cart into the mine to share it. Easy!

<p align="center">
    <img src="/chroma/images/gitgithub8.jpg" alt="" class="w-full h-auto" />
    </br>
    <em style="font-size: 0.95em;"><b>PUSH</b></em>
</p>

## Here's come a new challenger!

Now meet Nickel.

<p align="center">
    <img src="/chroma/images/gitgithub9.png" alt="" class="w-full h-auto" />
    </br>
    <em style="font-size: 0.95em;">Nickel: Distinguished by his aerodynamic bowler hat!</em>
</p>

Nickel is a good friend of Chrome and also loves creating files. When he hears that Chrome created a repository, he’s eager to join the project. Chrome trusts him, so he gives Nickel access to contribute.

To get File A, Nickel must also create a local copy of the repository, stored in his cart. Then he **pulls (pull)** the content of the mine into his cart:

<p align="center">
    <img src="/chroma/images/gitgithub10.jpg" alt="" class="w-full h-auto" />
    </br>
    <em style="font-size: 0.95em;"><b>PULL</b></em>
</p>

Nickel decides to improve File A and, feeling generous, also creates a new File B:

<p align="center">
    <img src="/chroma/images/gitgithub11.jpg" alt="" class="w-full h-auto" />
    </br>
    <em style="font-size: 0.95em;">Nickel modifies A and creates B — doing the whole alphabet would take too long!</em>
</p>

Nickel now follows the same steps as Chrome to share his updates:

He **adds** the modified A* and the new B files to his cart:

<p align="center">
    <img src="/chroma/images/gitgithub12.jpg" alt="" class="w-full h-auto" />
    </br>
    <em style="font-size: 0.95em;">Added files A* and B.</em>
</p>

Then he writes a note and attaches it to confirm the changes:

<p align="center">
    <img src="/chroma/images/gitgithub13.jpg" alt="" class="w-full h-auto" />
    </br>
    <em style="font-size: 0.95em;">Nickel </b>commits</b> his changes.</em>
</p>

Finally, he **pushes** his cart into the mine:

<p align="center">
    <img src="/chroma/images/gitgithub14.jpg" alt="" class="w-full h-auto" />
    </br>
    <em style="font-size: 0.95em;"><b>PUSH</b></em>
</p>

If Chrome or any other collaborator wants to get Nickel’s changes, they just need to **pull** the updates:

<p align="center">
    <img src="/chroma/images/gitgithub15.jpg" alt="" class="w-full h-auto" />
    </br>
    <em style="font-size: 0.95em;"><b>PULL</b></em>
</p>

Thanks to this mine, everyone can get the latest updates, contribute improvements, validate and share them, avoiding the confusion of traditional methods.

**THE END**

## Git and GitHub - Comparing to the Mine

Through this slightly wacky story, we’ve implicitly explored vocabulary and actions related to Git and GitHub. **Remember, Git and GitHub are not the same!** GitHub is the hosting service, while Git is the underlying technology managing versions.

It’s like GitHub gives you a visual interface to interact with Git commands (Git is the whole mine with the carts, and GitHub helps you see it more clearly). Let’s look at the terms we’ve discovered:

* **Repository:** The core element of GitHub. It’s the folder containing all the project’s components. As seen with Chrome & Nickel, a repository can have many collaborators and can be public or private.
* **Clone:** A clone is a local copy of the repository stored on your own computer instead of online. In the story, that’s "creating a cart." It’s within this local repository that you can work offline.

The other bolded terms you saw throughout the story — **add, commit, push, pull** — are Git commands used to manage files. To better illustrate them, we’ll explore them in the next part of this tutorial by creating our own repository.

<p align="center">
    <img src="/chroma/images/gitgithub16.jpg" alt="" class="w-full h-auto" />
    </br>
</p>

## Credits

* **Author:** [Ousmane THIONGANE](https://github.com/Mowibox)
* **Lastest update:** May 2025
* **Contributors:** Loubna LATRECHE

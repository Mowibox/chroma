---
title: "Using the Terminal"
summary: Practical commands
weight: 1001
icon: "terminal"
---

<p align="center">
    <img src="/chroma/images/using_terminal.png" alt="Tchoo tchoo" class="w-full h-auto" />
</p>

The terminal is a powerful tool for interacting with your operating system. Whether you’re on Linux, macOS, or Windows, learning the basic commands will help you better manage your environment and accomplish tasks more easily.

In this guide, I present the most useful terminal commands along with examples. Feel free to follow the same steps on your side, adapting paths and options according to your system.

## Terminal Commands

Let's start by opening a terminal window (PowerShell or Command Prompt (cmd) on Windows). On Linux distributions (and macOS), you can often open it with the “Ctrl + Alt + T” shortcut.

### pwd

The `pwd` command **displays the current directory from the root**.

```bash {title="Terminal"}
mowibox@chroma:~$ pwd
/home/mowibox
```

Here, you can see that I’m in the `/home/mowibox` folder.

### ls

The `ls` command **lists the contents of the current directory**.

```bash {title="Terminal"}
mowibox@chroma:~$ ls
Desktop    Downloads  Pictures  Templates
Documents  Music      Public    Videos
```

In this example, you see several folders: `Desktop`, `Downloads`, etc.

**On Windows**, the output looks more like this:

```bash {title="Command Prompt"}
mowibox@chroma:~$ ls
PS C:\Users\Mowibox> ls

    Directory: C:\Users\Mowibox

Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
d-r---        06/25/2025     15:57              Desktop
d-r---        03/14/2025     23:40              Documents
d-r---        06/27/2025     20:26              Downloads
d-r---        03/04/2025     21:21              Music
d-r---        06/27/2025     20:26              Pictures
d-r---        03/12/2025     15:53              Videos
```

For this tutorial, **we’ll illustrate commands in a Linux terminal**, so if you’re on Windows, don’t be surprised by the formatting: the commands work the same way.

You can also add the name of a directory after the command to view its contents. Let’s try with the `Documents` folder:

```bash {title="Terminal"}
mowibox@chroma:~$ ls Documents/
Folder_1  file.txt
```

You see the folder `Folder_1` and the text file `file.txt`. And this addition works for many commands we’ll see later!

### cd

The `cd` command **changes the current directory**. Let’s enter the `Documents` folder:

```bash {title="Terminal"}
mowibox@chroma:~$ cd Documents/
mowibox@chroma:~/Documents$
```

On each new prompt, the path `~` has become `~/Documents`, confirming you’re in the right place. You can list the folder contents again with `ls`:

```bash {title="Terminal"}
mowibox@chroma:~/Documents$ ls
Folder_1  file.txt
```

You see the same contents as before.

To go back up one level, use `..` with `cd`:

```bash {title="Terminal"}
mowibox@chroma:~/Documents$ cd ..
mowibox@chroma:~$
```

This returns you to the folder above `Documents`.

{{< callout context="caution" title="Tip" icon="outline/bulb" >}}
You can go up two levels with `cd ../..`, three levels with `cd ../../..`, and so on!
{{< /callout >}}

{{< callout context="caution" title="Tip" icon="outline/bulb" >}}

* To save time, start typing the folder name (e.g., `Doc` for `Documents`), then press **Tab** to autocomplete.
* If nothing or multiple suggestions appear, press **Tab twice** to list possible completions.

{{< /callout >}}

### mkdir

The `mkdir Folder` command **creates the folder `Folder` in the current location**.

Let’s create `Folder_2` in `Documents`:

```bash {title="Terminal"}
mowibox@chroma:~$ cd Documents/
mowibox@chroma:~/Documents$ mkdir Folder_2
mowibox@chroma:~/Documents$ ls
Folder_1  Folder_2  file.txt
```

You can also create multiple folders at once. For example, `Folder_3` and `Folder_4`:

```bash {title="Terminal"}
mowibox@chroma:~/Documents$ mkdir Folder_3 Folder_4
mowibox@chroma:~/Documents$ ls
Folder_1  Folder_2  Folder_3  Folder_4  file.txt
```

{{< callout context="danger" title="Warning" icon="outline/alert-square-rounded" >}}
Notice why you shouldn’t use spaces in file or folder names. What if you tried `mkdir Folder 5`?:
{{< /callout >}}

```bash {title="Terminal"}
mowibox@chroma:~/Documents$ mkdir Folder 5
mowibox@chroma:~/Documents$ ls
5  Folder  Folder_1  Folder_2  Folder_3  Folder_4  file.txt
```

It created folders `5` and `Folder`. That’s why we use hyphens ('-') or underscores ('_') instead of spaces.

### rmdir

Now we have unwanted folders—let’s remove them!

The `rmdir` command **deletes an empty directory**. Let’s remove the extra ones:

```bash {title="Terminal"}
mowibox@chroma:~/Documents$ ls
5  Folder  Folder_1  Folder_2  Folder_3  Folder_4  file.txt
mowibox@chroma:~/Documents$ rmdir 5 Folder Folder_3
Folder_1  Folder_2  Folder_4  file.txt
```

{{< callout context="caution" title="Tip" icon="outline/bulb" >}}
To delete a non-empty folder, use `rm -r folder_name`. Since we’re talking about `rm`, let’s move on to that next!
{{< /callout >}}

### rm

The `rm filename.ext` command **removes the file `filename.ext`**. Let’s test it—first create a file.

On Linux, you can use `touch` to create a file (we’ll cover that later). For now, let’s assume `goodbye.txt` exists and that it's nastily deleted (it's only goodbye):

```bash {title="Terminal"}
mowibox@chroma:~/Documents$ ls
Folder_1  Folder_2  Folder_4  file.txt  goodbye.txt
mowibox@chroma:~/Documents$ rm goodbye.txt
mowibox@chroma:~/Documents$ ls
Folder_1  Folder_2  Folder_4  file.txt
```

### mv

The `mv` command **moves or renames a file/folder**. Examples:

* `mv Folder_4/ Folder_3` renames `Folder_4` to `Folder_3` (since `Folder_3` did not exist in the current directory).

  ```bash {title="Terminal"}
  mowibox@chroma:~/Documents$ ls
  Folder_1  Folder_2  Folder_4  file.txt
  mowibox@chroma:~/Documents$ mv Folder_4/ Folder_3
  mowibox@chroma:~/Documents$ ls
  Folder_1  Folder_2  Folder_3 file.txt
  ```

* `mv Folder_3/ Folder_1/` moves `Folder_3` into `Folder_1` (since `Folder_1` already exists in the current directory).

  ```bash {title="Terminal"}
  mowibox@chroma:~/Documents$ ls
  Folder_1  Folder_2  Folder_3  file.txt
  mowibox@chroma:~/Documents$ mv Folder_3/ Folder_1
  mowibox@chroma:~/Documents$ ls
  Folder_1  Folder_2  file.txt
  mowibox@chroma:~/Documents$ ls Folder_1/
  Folder_3
  ```

* `mv Folder_2/ Folder_1/Folder_4` moves and renames `Folder_2` to `Folder_4` inside `Folder_1` (since `Folder_4` did not exist inside `Folder_1`).

  ```bash {title="Terminal"}
  mowibox@chroma:~/Documents$ ls
  Folder_1  Folder_2  file.txt
  mowibox@chroma:~/Documents$ mv Folder_2/ Folder_1/Folder_4
  mowibox@chroma:~/Documents$ ls
  Folder_1  file.txt
  mowibox@chroma:~/Documents$ ls Folder_1/
  Folder_3  Folder_4
  ```

{{< callout context="note" title="Note" icon="outline/info-circle" >}}
If the destination folder exists, **you’ll be prompted before overwriting.**
{{< /callout >}}

### cp

The `cp` command **copies a file or folder**. As with `mv`, there are several ways to use it:

* `cp file.txt file_copy.txt` creates a copy in the same directory.
* `cp file.txt Folder_1/file_copy.txt` copies into `Folder_1` with a new name. Or use cp file.txt Folder_1/ to keep the original name for the copy.
* `cp -r Folder_1/ Folder_copy/` recursively copies the folder.

```bash {title="Terminal"}
mowibox@chroma:~/Documents$ ls
Folder_1  file.txt
mowibox@chroma:~/Documents$ ls Folder_1/
Folder_3  Folder_4
mowibox@chroma:~/Documents$ cp -r Folder_1/ Folder_copy/
mowibox@chroma:~/Documents$ ls
Folder_1  Folder_copy  file.txt
mowibox@chroma:~/Documents$ ls Folder_copy/
Folder_3  Folder_4
```

{{< callout context="danger" title="Warning" icon="outline/alert-square-rounded" >}}
If the destination already exists, it will be **overwritten without confirmation**!
{{< /callout >}}

## Access Permissions

Each file/folder has **permissions** determining who can read, write, or execute it. Permissions apply to:

* **user:** file owner
* **group:** members of the file’s group
* **other:** everyone else

Three permission types:

* **Read (`r`):** view contents
* **Write (`w`):** modify
* **Execute (`x`):** run a program or enter a folder

On Linux, add `-l` to `ls` to view file and directory permissions:

```bash {title="Terminal"}
mowibox@chroma:~/Documents$ ls -l
total 4
drwxrwxr-x 2 mowibox mowibox 4096 Jun 30 10:19 Folder_1
-rw-rw-r-- 1 mowibox mowibox    0 Jun 30 10:19 file.txt
```

In :

* Folder_1/, `drwxrwxr-x` means that:
  * `d`: it's a folder.
  * `rwx`: the owner has all rights (read, write, execute).
  * `rwx`: the group also has all rights.
  * `r-x`: other users can read and enter the folder, but not modify it.

* file.txt, `-rw-rw-r--` means that :
  * `-`: It's a file.
  * `rw-`: the owner can read and modify the file (a text file cannot be run as a program, hence the absence of the `x`).
  * `rw-`: the group can also read and modify.
  * `r--`: other users can only read the file.

## Linux‑only Commands

The next commands are **exclusive to Linux**. Windows users can skip to the [summary table](#summary-table-of-commands).

### touch

The `touch` command **creates an empty file.** It can have any desired extension: text file (.txt), Python (.py), Markdown (.md)...

```bash {title="Terminal"}
mowibox@chroma:~/Documents$ touch file_2.txt
```

### cat

The `cat` command is used **to display the contents of a file in the terminal.** Let's take a look at the contents of the `file.txt` file, which has been waiting for its moment of glory since the beginning of this tutorial:

```txt {title="file.txt"}
Hello Chroma!

I love typing commands in a terminal!
```

We can use `cat` to display its contents:

```bash {title="Terminal"}
mowibox@chroma:~/Documents$ cat file.txt
Hello Chroma!

I love typing commands in a terminal!
```

### which

The `which` command is used **to display the path of an installed program.** For example, let's find out where the `python3` program is located:

```bash {title="Terminal"}
mowibox@chroma:~$ which python3
/usr/bin/python3
```

### find

The `find` command is used to **search for files/folders in the tree.**

```bash {title="Terminal"}
mowibox@chroma:~/Documents$ find . -name "file.txt"
./file.txt
```

Here we search the current directory (`.`) for all files called exactly `file.txt`.

{{< callout context="caution" title="Tip" icon="outline/bulb" >}}
To be case-insensitive ("File", "FILE", "fILE", etc.), you can replace the `name` option with `-iname`.
{{< /callout >}}

### grep

The `grep` command is used to **search for a word or pattern in a file.** Let's search for the term "Chroma" in the previous file:

```bash {title="Terminal"}
mowibox@chroma:~/Documents$ grep "Chroma" file.txt
Hello Chroma!
```

The system displays the line of interest and highlights the word found.

{{< callout context="caution" title="Tip" icon="outline/bulb" >}}
Several very useful options can be combined with the `grep` command:

* `-i`: Performs a case-insensitive search
* `-r` : Searches all sub-folders in the current directory
* `-n`: Displays the line number of occurrences found.

Here's an example combining all three:
{{< /callout >}}

```bash {title="Terminal"}
mowibox@chroma:~/Documents$ grep -irn "chRoMA!"
file.txt:1:Hello Chroma!
```

### chmod

The `chmod` command is used to **modify the access rights of a file or folder.**

To write it, there are two notations :

#### Symbolic notation

| Letter | Meaning           |
| ------ | ----------------- |
| u      | user              |
| g      | group             |
| o      | other             |
| a      | all               |
| +      | add permission    |
| -      | remove permission |
| =      | set exact rights  |

```bash {title="Terminal"}
mowibox@chroma:~/Documents$ chmod u+x file.txt  # add execute for owner
mowibox@chroma:~/Documents$ chmod g-w file.txt  # remove write for group
mowibox@chroma:~/Documents$ chmod o+r file.txt  # add read for others
```

#### Numeric notation

| Digit | Rights |
| ----- | ------ |
| 7     | rwx    |
| 6     | rw-    |
| 5     | r-x    |
| 4     | r--    |
| 3     | -wx    |
| 2     | -w-    |
| 1     | --x    |
| 0     | ---    |

```bash {title="Terminal"}
mowibox@chroma:~/Documents$ chmod 744 file.txt  # owner=rwx, group=r--, other=r--
mowibox@chroma:~/Documents$ chmod 655 file.txt  # owner=rw-, group=r-x, other=r-x
mowibox@chroma:~/Documents$ chmod 520 file.txt  # owner=r-x, group=-w-, other=---
```

{{< callout context="tip" title="Did you know?" icon="outline/message-dots" >}}
If you’re comfortable with binary, you’ll notice each triplet maps to a **binary number from 000 (no rights) to 111 (all rights).**
{{< /callout >}}

## Summary Table of Commands

This section acts as a **cheat sheet**, summarizing all the commands we've just seen in this tutorial. **Hope you'll find it useful!**

| Command           | Description                     | Example                        | Linux‑only? |
| ----------------- | ------------------------------- | ------------------------------ | ----------- |
| [`pwd`](#pwd)     | Show current directory          | `pwd`                          | No          |
| [`ls`](#ls)       | List directory contents         | `ls Documents/`                | No          |
| [`cd`](#cd)       | Change directory                | `cd Documents/`                | No          |
| [`mkdir`](#mkdir) | Create a directory              | `mkdir Folder_2`               | No          |
| [`rmdir`](#rmdir) | Remove an empty directory       | `rmdir Folder_2`               | No          |
| [`rm`](#rm)       | Remove a file                   | `rm bonjour.txt`               | No          |
| [`mv`](#mv)       | Move or rename a file/directory | `mv Folder_4/ Folder_3`        | No          |
| [`cp`](#cp)       | Copy a file or directory        | `cp -r Folder_1/ Folder_copy/` | No          |
| [`touch`](#touch) | Create an empty file            | `touch file_2.txt`             | Yes         |
| [`cat`](#cat)     | Display file contents           | `cat file.txt`                 | Yes         |
| [`which`](#which) | Show path to a program          | `which python3`                | Yes         |
| [`find`](#find)   | Search for files/folders        | `find . -name "file.txt"`      | Yes         |
| [`grep`](#grep)   | Search for patterns in files    | `grep "Chroma" file.txt`       | Yes         |
| [`chmod`](#chmod) | Change file/folder permissions  | `chmod 744 file.txt`           | Yes         |

---

## Credits

* **Writer:** [Ousmane THIONGANE](https://github.com/Mowibox)
* **Latest update:** Juillet 2025
* **Reviewer:**

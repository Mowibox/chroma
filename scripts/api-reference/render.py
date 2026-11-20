"""Sphinx's Markdown (sphinx-markdown-builder) -> a Doks page of the Chromapi section, in English or French.

Run by build.sh. conf.py writes each object's full id in its heading (``@@chromapi.chromapi.Chromapi.walk@@``):
it becomes the heading's Hugo id (``{#chromapi-walk}``) and Sphinx's cross-references point at it.
h2 sections and h3 classes/functions fill the table of contents; class members are h4.
The docstrings stay in English; Sphinx translates its own labels (-D language=fr).
"""

import re
import sys

TEXT = {
    "en": {
        "front": """---
title: "API Documentation"
description: "Classes and methods of the chromapi Python SDK."
summary: "Classes and methods of the chromapi Python SDK."
date: 2026-11-19
lastmod: {date}
draft: false
weight: 360
toc: true
icon: "code"
contributors: ["Ousmane THIONGANE"]

seo:
   title: ""
   description: "Reference of the chromapi Python SDK: the Chromapi class and its methods to connect, stand up, walk, read the sensors, light the LEDs and play moves."
   canonical: ""
   noindex: false
   robots: "index, follow"
---

{{{{< callout context="note" icon="outline/info-circle" >}}}}
Generated at each deployment of the website from the docstrings of `chromapi` {version}. Do not edit this page by hand.
{{{{< /callout >}}}}

""",
        "sections": {},
        "property": "Property:",
        "return_label": "Return type:",
        "source": "View Source",
    },
    "fr": {
        "front": """---
title: "Documentation API"
slug: "documentation-api"
description: "Classes et méthodes du SDK Python chromapi."
summary: "Classes et méthodes du SDK Python chromapi."
date: 2026-11-19
lastmod: {date}
draft: false
weight: 360
toc: true
icon: "code"
contributors: ["Ousmane THIONGANE"]

seo:
   title: ""
   description: "Référence du SDK Python chromapi : la classe Chromapi et ses méthodes pour se lever, marcher, lire les capteurs, allumer les LED et jouer des mouvements."
   canonical: ""
   noindex: false
   robots: "index, follow"
---

{{{{< callout context="note" icon="outline/info-circle" >}}}}
Générée à chaque déploiement du site depuis les docstrings de `chromapi` {version}, qui restent en anglais. Ne pas modifier cette page à la main.
{{{{< /callout >}}}}

""",
        "sections": {
            "Walking": "Marche",
            "Moves": "Mouvements",
            "Balance": "Équilibre",
            "Kinematics": "Cinématique",
            "State": "État",
            "LEDs": "LED",
        },
        "property": "Propriété :",
        "return_label": "Type renvoyé:",
        "source": "Voir le code source",
    },
}

HEADING = re.compile(r"^(#{3,4}) @@([^@|]+)\|([^@]*)@@(.*)$")  # level, full id, source URL, signature


def anchor(full_id: str) -> str:
    """``chromapi.chromapi.Chromapi.walk`` -> ``chromapi-walk``; ``chromapi.estimation.attitude.tilt`` -> ``tilt``.

    The module path is dropped: from the class on (capitalised), or the bare name for a module-level object.
    """
    parts = full_id.split(".")
    start = next((i for i, p in enumerate(parts) if p[:1].isupper() and i < len(parts) - 1), len(parts) - 1)
    return "-".join(parts[start:]).lower()


def clean_type(text: str) -> str:
    """``*Union* *[**str* *,* *Path* *]*`` -> ``Union[str, Path]``."""
    text = text.replace("*", "")
    text = re.sub(r"\s*([\[\],|])\s*", r"\1", text)
    return text.replace(",", ", ").replace("|", " | ")


def code(text: str) -> str:
    return text.replace("\\*", "*")  # Markdown escapes are literal in a code block


def source_link(url: str, t: dict) -> str:
    """``▸ View Source``, to the module's file on GitHub (its path as tooltip)."""
    path = url.split("/blob/", 1)[1].split("/", 1)[1]
    return f'<small>[▸ {t["source"]}]({url} "{path}")</small>'


def signature(level: str, full_id: str, rest: str, t: dict) -> list:
    hid = "{#" + anchor(full_id) + "}"
    rest = re.sub(r"\[([^\]]+)\]\(#[^)]*\)", r"\1", rest)  # no links inside a heading
    if m := re.match(r"^\*class\* (\w+)(\(.*\))?$", rest):
        return [f"{level} {m.group(1)} {hid}", "", "```python", f"class {m.group(1)}{code(m.group(2) or '')}", "```"]
    if m := re.match(r"^\*property\* (\w+) \*: (.+)\*$", rest):
        return [f"{level} {m.group(1)} {hid}", "", f"{t['property']} `{clean_type(m.group(2))}`"]
    if m := re.match(r"^(?:\*(\w+)\* )?(\w+)(\(.*\))$", rest):  # method or function, maybe *classmethod*
        deco = f"@{m.group(1)}\n" if m.group(1) else ""
        return [f"{level} {m.group(2)}() {hid}", "", "```python", f"{deco}{m.group(2)}{code(m.group(3))}", "```"]
    if m := re.match(r"^(\w+)(?: \*: (.+?)\*)?(?: \*= (.+)\*)?$", rest):  # attribute or constant
        sig = m.group(1) + (f": {clean_type(m.group(2))}" if m.group(2) else "") + (f" = {m.group(3)}" if m.group(3) else "")
        return [f"{level} {m.group(1)} {hid}", "", f"`{sig}`"]
    raise ValueError(f"heading not understood: {rest!r}")


def render(md: str, lang: str) -> str:
    t = TEXT[lang]
    ids = {m.group(2) for m in map(HEADING.match, md.splitlines()) if m}
    anchors = [anchor(i) for i in ids]
    dupes = {a for a in anchors if anchors.count(a) > 1}
    assert not dupes, f"two objects share an anchor: {dupes}"

    def link(m: re.Match) -> str:  # a cross-reference: to its anchor on this page, else plain text
        return f"[{m.group(1)}](#{anchor(m.group(2))})" if m.group(2) in ids else m.group(1)

    md = md.replace("```default", "```python")
    out = []
    section, shown = "", set()
    lines = md.splitlines()
    for i, line in enumerate(lines):
        if m := HEADING.match(line):
            block = signature(m.group(1), m.group(2), m.group(4), t)
            if m.group(3) and (section, m.group(3)) not in shown:  # once per module and section, under the title
                shown.add((section, m.group(3)))
                block[1:1] = ["", source_link(m.group(3), t)]
            out += block
            continue
        line = re.sub(r"\[([^\]]+)\]\(#(chromapi[^)]*)\)", link, line)
        if m := re.match(r"^# (.+)$", line):
            section = m.group(1)
            out.append(f"## {t['sections'].get(m.group(1), m.group(1))}")
        elif m := re.match(r"^(\s*\* \*\*.+?\*\* )\((.+?)\)( –.*)?$", line):
            out.append(f"{m.group(1)}(`{clean_type(m.group(2))}`){m.group(3) or ''}")
        elif i and lines[i - 1].strip() == f"* **{t['return_label']}**" and line.startswith("  "):
            out.append(f"  `{clean_type(line.strip())}`")
        else:
            out.append(line)
    body = "\n".join(out) + "\n"
    if lang == "fr":  # French typography: a space before the colon of the labels
        body = re.sub(r"^(\s*\* \*\*[^*]+?):\*\*", r"\1 :**", body, flags=re.M)
    return body


if __name__ == "__main__":
    src, dst, lang, version, date = sys.argv[1:6]
    body = render(open(src, encoding="utf-8").read(), lang)
    with open(dst, "w", encoding="utf-8") as f:
        f.write(TEXT[lang]["front"].format(version=version, date=date) + body)

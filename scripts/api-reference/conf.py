# Sphinx configuration of the API reference, see build.sh.
import os
# Same doc stack as Rhoban's bam and placo: Sphinx autodoc + napoleon (Google docstrings); Markdown out for Hugo.
project = "chromapi"
extensions = ["sphinx.ext.autodoc", "sphinx.ext.napoleon", "sphinx_markdown_builder"]
napoleon_google_docstring = True
napoleon_numpy_docstring = False
napoleon_use_ivar = True  # "Attributes:" as a field list: autodoc already lists the members
autodoc_member_order = "bysource"
autodoc_typehints = "description"
autodoc_typehints_description_target = "documented"  # no list of bare parameter types next to the documented ones
autodoc_default_options = {"members": True, "undoc-members": False}
add_module_names = False
autodoc_preserve_defaults = True       # DEFAULT_CONFIG_PATH, not the builder's absolute path
autoclass_content = "both"             # the __init__ docstring documents the constructor arguments
autodoc_typehints_format = "short"
python_use_unqualified_type_names = True


def source_url(module):
    """The module's file on GitHub, at the version tag if the SDK checkout sits on it, else at its commit."""
    import importlib
    import inspect
    from pathlib import Path

    import chromapi

    if not module:
        return ""
    path = Path(inspect.getsourcefile(importlib.import_module(module)))
    rel = path.relative_to(Path(chromapi.__file__).parents[2]).as_posix()
    return f"https://github.com/Mowibox/chromapi/blob/{_git_ref()}/{rel}"


def _git_ref():
    """The version tag if the SDK checkout sits on it, else its commit (a link that never moves)."""
    import importlib.metadata
    import subprocess

    tag = "v" + importlib.metadata.version("chromapi")
    git = ["git", "-C", os.environ.get("CHROMAPI_SDK", "."), "rev-parse"]
    head = subprocess.run(git + ["HEAD"], capture_output=True, text=True).stdout.strip()
    at_tag = subprocess.run(git + [f"{tag}^{{commit}}"], capture_output=True, text=True).stdout.strip()
    return tag if head and head == at_tag else head or "main"


def setup(app):
    """Write each object's full id and its module's source URL in its heading as ``@@id|url@@``.

    The Markdown builder drops Sphinx's anchors: render.py turns this mark into a Hugo heading id and points
    the cross-references at it.
    """
    from docutils import nodes
    from sphinx import addnodes

    def mark(app, doctree, docname):
        for sig in doctree.findall(addnodes.desc_signature):
            if sig["ids"]:
                url = source_url(sig.get("module"))
                sig.insert(0, nodes.Text(f"@@{sig['ids'][0]}|{url}@@"))

    app.connect("doctree-resolved", mark)

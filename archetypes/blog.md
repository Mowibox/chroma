---
# No weight: blog posts and Chromapi design notes sort by date (newest first). Design notes: hugo new --kind blog chromapi/design/<name>.md
title: "{{ replace .Name "-" " " | title }}"
description: ""
summary: ""
date: {{ .Date }}
lastmod: {{ .Date }}
draft: true
categories: []
tags: []
contributors: []
pinned: false
homepage: false
params:
  seo:
    title: "" # custom title (optional)
    description: "" # custom description (recommended)
    canonical: "" # custom canonical URL (optional)
    robots: "" # custom robot tags (optional)
---

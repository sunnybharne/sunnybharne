---
title: "Papliba"
description: "I’m building a tool to trace Azure network connections, inspect policy results, and edit workflows."
date: 2026-11-04
tags:
  - papliba
  - products
  - azure
  - developer-tools
draft: false
---

When a Logic App uses private storage, I want to see which subnet it uses and where the storage endpoint sits. Papliba puts that diagram next to the Azure configuration.

## What works in the preview

| Area | What I can do |
| --- | --- |
| Resources | Search by subscription and inspect networks, storage, Logic Apps, Foundry, landing zones, and policy assignments. |
| Networking | Follow VNet peerings, inspect subnet address ranges, and open the connected resources. The diagram shows configured paths. Traffic needs a separate test. |
| Policy | Check saved expectations against recorded Azure Policy evaluations, review past runs, and export results. Predicting whether a new deployment will be blocked needs a separate test. |
| Workflows | Connect steps, edit Python files, undo changes, and reopen saved projects. |

I’m developing previews for macOS, Windows, and VS Code. A local installation saves projects on the computer. Azure, GitHub, and optional AI features use their respective services.

## What I’m building next

I want to turn a request like “Find resources missing an owner tag” into a workflow I can inspect before it runs. I’d review the subscriptions, checks, and proposed changes in the editor, approve the run, then read the report.

As of 4 November 2026, the preview supports individual-script assistance. General workflow execution, scheduling, and managed cloud access are still planned.

## Project links

[Papliba](https://papliba.com/) returned a certificate-name error on 4 November. The [website repository](https://github.com/sunnybharne/papliba-site) was available. I publish the Azure lab notes in [Articles](/articles/).

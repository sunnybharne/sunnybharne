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

Select a Logic App to see its subnet and storage endpoint alongside the Azure configuration.

## Preview

| Area | Features |
| --- | --- |
| Resources | Search by subscription and inspect networks, storage, Logic Apps, Foundry, landing zones, and policy assignments. |
| Networking | Follow VNet peerings, inspect subnet address ranges, and open the connected resources. Live traffic needs a separate test. |
| Policy | Check saved expectations against recorded Azure Policy evaluations, review past runs, and export results. New deployments need their own validation. |
| Workflows | Connect steps, edit Python files, undo changes, and reopen saved projects. |

I’m developing previews for macOS, Windows, and VS Code. A local installation saves projects on the computer. Azure, GitHub, and optional AI features use their respective services.

## Planned

“Find resources missing an owner tag” would produce a workflow to review and approve. As of 4 November 2026, the editor supports script assistance. Workflow execution, scheduling, and managed cloud access are still planned.

[Papliba](https://papliba.com/) returned a certificate-name error on 4 November. The [website repository](https://github.com/sunnybharne/papliba-site) was available.

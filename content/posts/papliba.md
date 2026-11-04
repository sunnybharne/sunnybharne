---
title: "Papliba: what I’m building"
description: "My work on Papliba: exploring Azure infrastructure, checking policy results, and developing a workspace for practical automation."
date: 2026-11-04
tags:
  - papliba
  - products
  - azure
  - developer-tools
draft: false
---

Papliba is the product I’m working on to make Azure infrastructure easier to understand and work with. It brings resource exploration, network diagrams, policy checks, and a visual workflow editor into one workspace.

This is a snapshot of the product and the work around it as of **4 November 2026**. It is still in development.

## Why I’m building it

Platform work often starts with a question: what is connected to this network, how does this service reach its storage, or what does this policy result actually tell me?

Answering those questions can mean moving between resource lists, configuration screens, scripts, and diagrams. With Papliba, I want to keep the relationships visible while making the underlying configuration easy to inspect.

The same idea applies to automation: understand the task, see the steps, and keep the result available for review.

## What I’m working on

| Area | What the current implementation provides |
| --- | --- |
| Azure exploration | Resource search and subscription filters, with views for networks, storage, Logic Apps, Foundry, landing zones, and policy assignments. |
| Network context | VNet and subnet diagrams, peering details, address-space views, and drilldowns into related resources. |
| Policy validation | Saved expectations, manual checks against recorded Azure policy evaluations, run history, and exportable evidence. |
| Workflow editing | Projects, connected steps, Python files, undo, and saved workspace state. |

I’m working across the interface, backend, integrations, packaging, and documentation. A useful diagram needs accurate resource relationships; a useful check needs a result that explains what was checked and what remains unknown.

The explorer reads configuration. It does not prove that network traffic can pass. Policy validation reads existing evaluations; it does not establish whether a new deployment would be blocked. Those boundaries matter when using the results to make decisions.

## Bringing Papliba into everyday development

I’m developing Mac and Windows desktop previews alongside a VS Code extension. The extension brings the workspace into the editor, close to the scripts and project files I’m already using. Dedicated apps provide another way to work for people who prefer a separate window or use another editor.

The work here includes startup and shutdown behaviour, preserving a workspace across restarts, opening project files, and making the interface usable inside an editor panel. These integrations are previews, with installation and platform coverage still being developed.

For local installations, the workspace is stored on the computer. Connections to Azure, GitHub, and an optional AI provider still communicate with those services.

## The next direction: creating workflows through conversation

I’m exploring how someone could describe an Azure task and have AI propose a workflow they can inspect and refine. The initial focus is inventory, reports, policy checks, and explicitly approved changes.

For example:

> Check the selected subscriptions for resources missing an owner tag, include their recorded policy compliance, and prepare a report.

The experience I want is to review the proposed steps and scope, approve execution where needed, and inspect the results afterwards. The visual editor would help explain and adjust the workflow.

This is a development direction. General workflow execution and scheduling are not implemented yet, and managed Cloud access is not open. The existing editor and individual-script assistance are foundations for that work.

## Follow the product

- [Papliba product website](https://papliba.com/)
- [Public website project on GitHub](https://github.com/sunnybharne/papliba-site)
- [My technical articles](/articles/), where I write up the Azure concepts and implementation details behind this work.

**Website availability, checked 4 November 2026:** the product domain returned an HTTPS certificate-name mismatch during verification. The public website repository is available as a fallback while the product address is unavailable.

I’ll update this note as the product develops, keeping implemented features and future work clearly identified.

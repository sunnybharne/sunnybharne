# Terraform Top-Level Blocks

## Introduction
Terraform uses **top-level blocks** that define the core structure of a Terraform configuration file. These blocks are essential for defining infrastructure and interacting with providers. There are **eight** key top-level blocks categorized into three types:

1. **Fundamental Blocks**
2. **Variable Blocks**
3. **Calling/Referencing Blocks**

---

## 1. Fundamental Blocks
These blocks define Terraform settings, providers, and resources.

### a) `terraform` Block (Terraform Settings Block)
- Defines **Terraform CLI version** and **required provider versions**.
- Can include **backend configurations** for storing state remotely.
- Example:
  ```hcl
  terraform {
    required_version = ">= 1.0.0"
    required_providers {
      azurerm = {
        source  = "hashicorp/azurerm"
        version = "~> 3.0"
      }
    }
    backend "azurerm" {}
  }
  ```

### b) `provider` Block
- Defines **provider-specific configurations** (e.g., Azure, AWS, Google Cloud).
- Example:
  ```hcl
  provider "azurerm" {
    features {}
  }
  ```

### c) `resource` Block
- Used to create infrastructure resources (e.g., virtual machines, resource groups).
- Example:
  ```hcl
  resource "azurerm_resource_group" "example" {
    name     = "example-rg"
    location = "East US"
  }
  ```

---

## 2. Variable Blocks
These blocks handle inputs, outputs, and local values.

### d) `variable` Block (Input Variables)
- Defines input variables for configurations.
- Example:
  ```hcl
  variable "resource_group_name" {
    type    = string
    default = "example-rg"
  }
  ```

### e) `output` Block (Output Values)
- Used to output values after Terraform execution.
- Example:
  ```hcl
  output "resource_group_name" {
    value = azurerm_resource_group.example.name
  }
  ```

### f) `locals` Block (Local Values)
- Used to define local variables for readability and reuse.
- Example:
  ```hcl
  locals {
    rg_name = "example-rg"
  }
  ```

---

## 3. Calling/Referencing Blocks
These blocks reference existing infrastructure or reusable modules.

### g) `data` Block (Data Sources)
- Retrieves information from existing resources or APIs.
- Example:
  ```hcl
  data "azurerm_resource_group" "example" {
    name = "existing-rg"
  }
  ```

### h) `module` Block (Reusable Modules)
- Groups multiple resources into a reusable unit.
- Example:
  ```hcl
  module "network" {
    source = "./modules/network"
    vnet_name = "example-vnet"
  }
  ```

---

## Summary
Terraform has **eight** top-level blocks categorized into three types:

| Type | Block | Purpose |
|------|--------|----------|
| **Fundamental** | `terraform` | Defines Terraform settings and backend configurations |
|  | `provider` | Configures providers (Azure, AWS, etc.) |
|  | `resource` | Creates infrastructure resources |
| **Variable** | `variable` | Defines input variables |
|  | `output` | Outputs values after execution |
|  | `locals` | Stores local variables for reuse |
| **Calling/Referencing** | `data` | Retrieves existing resource information |
|  | `module` | Calls reusable Terraform modules |

These blocks form the **foundation** of any Terraform configuration.

---

## Additional Notes
- Terraform provides **syntax highlighting** in supported IDEs.
- Use **Ctrl + Space** to access block templates in some editors.
- In the next lecture, the focus will be on **live template writing**.

This completes the understanding of **Terraform Top-Level Blocks**.


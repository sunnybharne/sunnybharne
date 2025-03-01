---
title: "Step-by-Step Guide to Using Nix on Asahi Linux (Arch Linux ARM)"
description: "A structured guide for setting up and managing Nix with Home Manager and Flakes on Asahi Linux."
---

# Step-by-Step Guide to Using Nix on Asahi Linux (Arch Linux ARM) 🚀

## Introduction
Nix is a powerful package manager that ensures reproducibility, consistency, and ease of management. This guide will walk you through setting up Nix from scratch on **Asahi Linux (Arch Linux ARM)**, using Home Manager with Flakes for optimal configuration management.

---

## 1. Setting Up Nix
### Installing Nix
To install Nix and enable Flakes, run:

```sh
sh <(curl -L https://nixos.org/nix/install)
```

### Enabling Flakes
```sh
echo 'experimental-features = nix-command flakes' | sudo tee -a /etc/nix/nix.conf
```

### Loading Nix Environment
```sh
. ~/.nix-profile/etc/profile.d/nix.sh
```

If using `zsh`, add this to your `.zshrc`:
```sh
source ~/.nix-profile/etc/profile.d/nix.sh
```

---

## 2. Setting Up Home Manager with Flakes
### Installing Home Manager
```sh
nix run nixpkgs#home-manager -- init
```

### Configuring Home Manager
Create `~/.config/home-manager/flake.nix`:

```nix
{
  description = "Home Manager Configuration";
  
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    home-manager.url = "github:nix-community/home-manager";
    home-manager.inputs.nixpkgs.follows = "nixpkgs";
  };

  outputs = { nixpkgs, home-manager, ... }@inputs: {
    homeConfigurations."your-username" = home-manager.lib.homeManagerConfiguration {
      pkgs = import nixpkgs { system = "aarch64-linux"; };
      modules = [
        {
          home.username = "your-username";
          home.homeDirectory = "/home/your-username";
          
          home.packages = [ pkgs.git pkgs.neovim pkgs.zsh ];
          
          programs.zsh.enable = true;
          programs.git.enable = true;
          
          home.stateVersion = "23.11";
        }
      ];
    };
  };
}
```

### Applying Home Manager Configuration
```sh
nix run .#home-manager switch
```

---

## 3. Using Ad-Hoc Shell Environments
To temporarily use a package:
```sh
nix shell nixpkgs#git
```

---

## 4. Creating a Reproducible Script
To ensure scripts always have the required dependencies:

```sh
#!/usr/bin/env nix-shell
#!nix-shell -i bash -p curl jq
curl --version
jq --version
```

---

## 5. Setting Up a Declarative Shell Environment
Create `shell.nix`:

```nix
{ pkgs ? import <nixpkgs> {} }:
pkgs.mkShell {
  buildInputs = [ pkgs.git pkgs.curl ];
}
```

Run `nix-shell` in this directory to load the environment.

---

## 6. Pinning Nixpkgs for Consistency with Flakes
Modify your `flake.nix` to pin a version:

```nix
{
  inputs.nixpkgs.url = "github:NixOS/nixpkgs/<commit-hash>";
}
```

---

## 7. Understanding the Nix Language
### Variables:
```nix
myVar = "Hello, Nix!";
```

### Lists:
```nix
myList = [ "nix" "is" "awesome" ];
```

### Functions:
```nix
add = x: y: x + y;
result = add 2 3;  # result = 5
```

---

## 8. Creating Your First Nix Package
### Writing `default.nix`
```nix
derivation {
  name = "hello-nix";
  builder = "/bin/sh";
  args = [ "-c" "echo Hello, Nix! > $out" ];
}
```

### Building the Package
```sh
nix-build
```

---

## Conclusion
Nix simplifies package management, scripting, and system configuration. With **Home Manager and Flakes**, personal configurations become declarative and reproducible.

In future posts, we’ll explore advanced topics like overlays, Flakes customization, and optimizing Nix usage on **Asahi Linux (Arch Linux ARM)**.

Stay tuned and happy hacking with Nix! 🚀

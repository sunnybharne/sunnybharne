# AWS Landing Zone

## Introduction
This document summarizes key concepts from the AWS Landing Zone course, focusing on **AWS Organizations, Control Tower, and Multi-Account Strategies**.

---

## 📌 **Multi-Account Strategy in AWS**
- AWS initially lacked built-in multi-account management.
- Companies managed multi-account structures manually via networking, replication, and shared services.
- AWS introduced **Organizations** and **Control Tower** to streamline multi-account security and governance.

---

## 🏢 **AWS Organizations**
### 🔹 What is AWS Organizations?
AWS Organizations is a management service for consolidating multiple AWS accounts under a single structure. It allows:
- Centralized governance and access control.
- Multi-account billing and resource sharing.
- Service Control Policies (SCPs) for restricting permissions.

### 🔹 Key Components:
1. **Root Organization Unit (OU)**: The highest level of an AWS Organization.
2. **Management (Master) Account**: The root account that owns the organization.
3. **Member Accounts**: Child accounts managed within the organization.
4. **Organization Units (OUs)**: Logical groups of accounts (e.g., Security, Audit, Development).
5. **Service Control Policies (SCPs)**: Restrictions applied at the OU level.

### 🔹 Example Organizational Structure:
```
Root Organization (Master Account)
│
├── Security OU
│   ├── Security Account
│   ├── Audit Account
│
├── Production OU
│   ├── Prod Account 1
│   ├── Prod Account 2
│
└── Development OU
    ├── Dev Account 1
    ├── Dev Account 2
```
- SCPs apply at different levels to enforce security and operational policies.

---

## 🔑 **Service Control Policies (SCPs)**
- SCPs define permission boundaries across accounts.
- **SCPs do not grant permissions**, they only **restrict** access.
- Applied hierarchically:
  - Root OU SCPs apply to all accounts.
  - Nested OUs inherit SCPs from parent OUs.

**Example SCP:**
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Deny",
      "Action": "*",
      "Resource": "*",
      "Condition": {
        "StringNotEquals": {
          "aws:RequestedRegion": "us-east-1"
        }
      }
    }
  ]
}
```
➡️ This policy **denies all actions** outside **us-east-1**.

---

## 🔄 **Resource Sharing via AWS Resource Access Manager (RAM)**
- **AWS RAM** enables secure sharing of AWS resources between accounts.
- Example: **Transit Gateway** allows centralized networking across accounts.

---

## 🏗 **AWS Control Tower**
### 🔹 What is AWS Control Tower?
AWS Control Tower automates the setup of a **secure, multi-account AWS environment** using best practices.

### 🔹 Features:
- Automates landing zone creation.
- Implements **Security Guardrails** via SCPs.
- Ensures compliance and governance across accounts.
- Integrates with AWS Organizations.

### 🔹 How Control Tower Works:
- **Master Account** manages policies and governance.
- **Account Factory** provisions new accounts.
- **Guardrails** enforce security controls.
- Integrates with **AWS Organizations** for visibility.

**Example:**  
If a new account is created in Control Tower, it automatically appears in AWS Organizations.

---

## ⚠️ **Key Considerations**
- The **Management (Master) Account** has full control over all accounts.
- **SCPs should not be applied to the Master Account** (as they can block critical actions).
- **Billing is centralized**: All charges are billed to the Master Account by default.

---

## 🎯 **Summary**
| Feature | Purpose |
|---------|---------|
| **AWS Organizations** | Manages multiple AWS accounts under a single entity |
| **Organizational Units (OUs)** | Logical grouping of accounts |
| **Service Control Policies (SCPs)** | Restricts actions across accounts |
| **Resource Access Manager (RAM)** | Enables secure resource sharing |
| **AWS Control Tower** | Automates multi-account governance and setup |

---

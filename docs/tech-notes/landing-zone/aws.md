# AWS Landing Zone - Course Notes

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

## 🚀 **Implementing AWS Landing Zone**
### 🔹 Approaches to Implement AWS Landing Zone
There are multiple ways to implement an AWS Landing Zone, each with its own pros and cons.

#### 1️⃣ **Manual Setup of Separate Accounts**
- **Pros:**
  - Full isolation of accounts.
  - No maintenance required for a landing zone.
- **Cons:**
  - No centralized governance or security enforcement.
  - No central logging, networking, or billing.
  - High operational overhead.

#### 2️⃣ **AWS Organizations-Based Approach**
- **Pros:**
  - Enables account hierarchy and centralized billing.
  - Allows Service Control Policies (SCPs) for security.
  - Provides a single management point.
- **Cons:**
  - Fully manual setup and maintenance.
  - No built-in automation or Infrastructure-as-Code (IaC) support.
  - Requires experienced administrators.

#### 3️⃣ **AWS Control Tower-Based Approach**
- **Pros:**
  - Automates the setup of AWS Organizations.
  - Provides best-practice guardrails and policies.
  - Simplifies multi-account governance.
- **Cons:**
  - Limited flexibility in customization.
  - No built-in Infrastructure-as-Code (IaC) capabilities.

#### 4️⃣ **AWS Control Tower with Terraform (Best Approach)**
- **Pros:**
  - Full automation using **Terraform**.
  - Enables **Infrastructure-as-Code (IaC)** for account management.
  - Easily integrates with CI/CD pipelines (e.g., AWS CodePipeline, GitHub Actions).
  - Supports centralized security, logging, and compliance.
- **Cons:**
  - Requires Terraform expertise.
  - More complex initial setup.

### 🔹 Conclusion
If you require **manual control**, using AWS Organizations alone might work. If you need **automation and best practices**, AWS Control Tower is a better option. However, **AWS Control Tower with Terraform** is the most recommended approach for scalability, automation, and security.

---

## 🌐 **AWS Landing Zone Account Structure**
AWS recommends organizing accounts into logical **Organization Units (OUs)** to improve security, manageability, and compliance.

### 🔹 Core Accounts
1. **Management Account** (Master Account)
   - Controls all organization-wide policies.
   - Used only for governance, billing, and compliance.
2. **Security Account**
   - Manages security tools like AWS Security Hub and Amazon Inspector.
   - Stores security logs and audit records.
3. **Log Archive Account**
   - Central repository for AWS CloudTrail logs and AWS Config records.
   - Ensures compliance by storing logs securely.
4. **Networking Account**
   - Centralized control of networking resources (VPC, Transit Gateway, VPN, Direct Connect).
   - Manages ingress/egress traffic, NAT gateways, and firewall rules.
5. **Shared Services Account**
   - Hosts shared infrastructure like CI/CD pipelines, Active Directory, and monitoring tools.
   - Stores shared application resources like S3 buckets and DynamoDB tables.
   - Centralized license management through AWS License Manager.

### 🔹 Workload Accounts
6. **Sandbox Account**
   - Isolated environment for testing and learning.
   - Prevents security risks to production environments.
7. **Application Accounts**
   - Individual accounts for staging, development, and production workloads.
   - Ensures isolation between different workloads.

---

## 🎯 **Summary**
| Feature                             | Purpose                                                             |
| ----------------------------------- | ------------------------------------------------------------------- |
| **AWS Organizations**               | Manages multiple AWS accounts under a single entity                 |
| **Organizational Units (OUs)**      | Logical grouping of accounts                                        |
| **Service Control Policies (SCPs)** | Restricts actions across accounts                                   |
| **AWS Control Tower**               | Automates multi-account governance and setup                        |
| **AWS Control Tower + Terraform**   | Best approach for automation and Infrastructure-as-Code (IaC)       |
| **Networking Account**              | Centralized control of VPCs, routing, and firewall rules            |
| **Shared Services Account**         | Central hub for shared resources, CI/CD, AD, and license management |
| **Security Account**                | Centralized security monitoring, compliance, and alerting           |
| **Log Archive Account**             | Central storage for logs, security events, and compliance records   |
| **Application Accounts**            | Workload hosting for development and production                     |
| **Sandbox Accounts**                | Isolated environments for testing and innovation                    |

---

## 📌 **Next Steps**
- Learn about **Monitoring & Incident Response Strategies** in AWS Landing Zone.
- Implement **centralized log analysis and compliance reporting**.
- Prepare for **hands-on deployment of AWS Security & Logging Solutions**.

Stay tuned for more insights and hands-on learning! 🚀

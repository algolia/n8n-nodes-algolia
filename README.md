# n8n-nodes-algolia

This is an n8n community node. It lets you use Algolia in your n8n workflows.

Algolia is a hosted search API that provides search-as-a-service solutions. It offers powerful search capabilities including full-text search, faceting, geo-search, and instant search with typo tolerance.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)  
[Operations](#operations)  
[Credentials](#credentials)  
[Compatibility](#compatibility)  
[Resources](#resources)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

This node supports the following operations:

**Index**

- List Indices: List all indices in your Algolia application
- Search Index: Search for records in a specific index

**Objects**

- Add Object: Add a new object to an index

## Credentials

To use this node, you need to authenticate with Algolia using API credentials.

### Prerequisites

1. Sign up for an [Algolia account](https://www.algolia.com)
2. Create an application in your Algolia dashboard

### Authentication Setup

1. In your Algolia dashboard, go to Settings > API Keys
2. Copy your Application ID
3. Copy your Admin API Key (required for write operations)
4. In n8n, create new Algolia API credentials with:
   - **Application ID**: Your Algolia Application ID
   - **Admin API Key**: Your Algolia Admin API Key

## Compatibility

This node requires n8n version 1.0.0 or higher and Node.js 20.15 or higher.

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
- [Algolia API documentation](https://www.algolia.com/doc/api-reference/)
- [Algolia dashboard](https://www.algolia.com/apps)

# TOC

0. [Caching](#caching)
0. [DNS](#dns)
0. [Networking / Plumbing](#networkingplumbing)
0. [Service Discovery](#servicediscovery)
0. [Load Balancing](#loadbalancing)
0. [Logging / Parser](#loggingparserui)
0. [Sockets](#sockets)
0. [Database](#database)
0. [Storage](#storage)
0. [Build Process](#buildprocess)
0. [Hosting](#hosting)
0. [Environment](#environment)
0. [Scheduling](#scheduling)
0. [Testing & Continuous Integration](#testingcontinuousintegration)

---

# Software/Services to Help

+ [Prometheus](https://prometheus.io/)
+ [Graylog](https://www.graylog.org/)
+ [AutoPilot](https://github.com/joyent/containerbuddy)

---

# Caching

Considerations
- Cross appliance/app/service
- Memory Cache
- Redis

# DNS

Considerations
- Route 53 / Domain
- Push status to provider

# Networking / Plumbing

Considerations
- network meshes
- hosting provider / multi-tenant / multi-location
- docker network
- latency
- service discovery

# Service Discovery

Considerations
- Push to Discovery service
- Health checking
- Load balancing
- Notifications

Existing Posibilities
- Container Pilot

# Load Balancing

Considerations
- Read from discovery service
- HAProxy/Nginx

# Logging / Parser & UI

Considerations
- Central authority / Push logs to server
- Decentralized authority / Pull logs from server
- Web UI: Charting, searching
- API
- Notifications

Existing Posibilities
- Graylog

# Sockets

Considerations
- Multiple servers
- Fallback

# Database

Considerations
- ORM
- BYODB
- Replication
- Backup; Interval backup; roll up;

# Storage

Considerations
- Host storage
- Cloud storage
- Driver for accessing data 
    - Generally host will provide a set amount of storage. Provide a way to read/write from external filestore

# Build Process

Considerations
- Gulp/Webpack
- Live Reload
- Concatenation
- Transpiling

# Hosting

Considerations
- Docker should run on the platform
- Docker Swarm should take care of the handling of orchestration
- The host should not force methodologies/configurations outside of setting up host

# Environment

Considerations
- Environment based: Dev, Test, Production
- ENV is included in deploy.
- Never package env with service
- Provide dummy env for basic configuration
- Never store env with repository

# Scheduling / Deploying

Considerations
- Docker scheduling? Marathon? Kubernetes
- Autoscaling
- Container Health monitoring
- Notifications
- Continuous Integration

# Testing & Continuous Integration

Considerations
- Unit Tests
- Testing environments
- Mocking
- Continuous Integration
- Webhook
- Deploy
- Git Flow -> Testing

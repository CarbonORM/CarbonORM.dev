# [CarbonORM](https://carbonphp.com)


A compilation of our wikis and readmes for learning about CarbonORM.

## Deployment

The documentation is published as a static nginx container at:

https://carbonorm.miles.systems/

Container images are built from the `www` branch and pushed to GHCR as:

```text
ghcr.io/carbonorm/carbonorm.dev:<commit-sha>
ghcr.io/carbonorm/carbonorm.dev:latest
```

Harvester Kubernetes manifests live in `deploy/k8s/` and are applied with:

```bash
KUBECONFIG=$HOME/.kube/local.yaml kubectl apply -k deploy/k8s
```

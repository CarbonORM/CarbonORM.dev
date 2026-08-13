# [CarbonORM](https://carbonphp.com)


A compilation of our wikis and readmes for learning about CarbonORM.

## Deployment

The documentation is published as a static nginx container at:

https://carbonorm.miles.systems/

Harvester Kubernetes manifests live in `deploy/k8s/`. The pod builds the static
site from the public `www` branch in an init container, then serves the build
with nginx.

Apply with:

```bash
KUBECONFIG=$HOME/.kube/local.yaml kubectl apply -k deploy/k8s
```

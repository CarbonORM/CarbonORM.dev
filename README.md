# [CarbonORM](https://carbonphp.com)


A compilation of our wikis and readmes for learning about CarbonORM.

## Deployment

The documentation is published as a static nginx container at:

https://carbonorm.miles.systems/

Harvester Kubernetes manifests live in `deploy/k8s/`. GitHub Actions builds the
static site from `www` into the `harvester-site` branch; the Harvester pod clones
that prebuilt artifact branch and serves it with nginx.

Apply with:

```bash
KUBECONFIG=$HOME/.kube/local.yaml kubectl apply -k deploy/k8s
```

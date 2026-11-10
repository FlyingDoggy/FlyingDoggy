# Profile maintenance

The public profile is https://github.com/FlyingDoggy. Edit `README.md` and the referenced files in `assets/` to update it.

The widget workflow runs daily at 09:17 Asia/Shanghai and can also be run manually from Actions. `METRICS_TOKEN` is configured for public account statistics; Pac-Man can also use the repository's automatic GitHub token. If `METRICS_TOKEN` is removed, Metrics keeps its checked-in, verified snapshot.

To enable Metrics updates, create a **classic personal access token with no scopes selected** and save it as the `METRICS_TOKEN` Actions secret in this repository. Set an expiration and replace it before it expires. Do not put the token in a file or commit it. See the [upstream Metrics setup instructions](https://github.com/lowlighter/metrics/blob/65836723097537a54cd8eb90f61839426b4266b6/.github/readme/partials/documentation/setup/action.md).

The repository-scoped `GITHUB_TOKEN` is not used for Metrics: it can produce a successful render while only including the profile repository in the language distribution. The initial deployment verified this behavior and restored the full snapshot.

Runs are serialized. Each queued run checks out the current branch head, and the generated-image commit rebases onto any changes made during generation before pushing. Conflicting edits stop the update instead of overwriting remote content.

The project thumbnails use demonstration material. Atlas uses synthetic data; EIX uses placeholder reference components. Screenshot sources, audit records, credentials, and local project checkouts are not part of this repository.

# Goal: Speed Up Test Execution with Sharding

This section explains how to use Playwright's sharding feature to significantly reduce the time it takes to run your test suite. You'll learn how to split your tests across multiple parallel jobs, both locally and within a GitHub Actions workflow.

# Understanding Sharding

**What is Sharding?**

Sharding is a technique used to divide a large test suite into smaller, independent chunks (shards). Each shard contains a subset of the total tests. The key benefit is that these shards can be run simultaneously (in parallel) on different machines or processes. This dramatically reduces the total time required to execute the entire test suite compared to running all tests sequentially on a single machine.

## How to Use Sharding in Playwright

Playwright makes sharding easy with the `--shard` command-line option. This option tells Playwright which shard to run and the total number of shards.

**Running Shards Locally:**

You specify the shard to run using the format `currentShard/totalShards` (where shards are 1-indexed).

For example, to split your tests into 4 shards and run the *second* shard, you would use:

```bash
npx playwright test --shard=2/4
```
You would typically run each shard command in a separate terminal or process to achieve parallelism locally.


## Sharding in GitHub Actions

Sharding is particularly powerful in CI/CD environments like GitHub Actions, where you can easily spin up multiple runners (jobs) to execute shards in parallel.

Modify the `Run Playwright tests` step in your workflow (e.g., `.github/workflows/playwright.yml`) to use sharding. You'll typically use the GitHub Actions matrix strategy to create multiple jobs, each running a different shard.

**Example Workflow Snippet (using matrix):**

```yaml
name: Playwright Tests
on: [push]
jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest
    strategy:
      fail-fast: false # Keep running other shards even if one fails
      matrix:
        shardIndex: [1, 2, 3, 4] # Define the shards
        shardTotal: [4]         # Define the total number of shards
    steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: 18
    - name: Install dependencies
      run: npm ci
    - name: Install Playwright Browsers
      run: npx playwright install --with-deps
    - name: Run Playwright tests (Shard \${{ matrix.shardIndex }} of \${{ matrix.shardTotal }})
      run: npx playwright test --shard=\${{ matrix.shardIndex }}/\${{ matrix.shardTotal }} # Use matrix variables
    - uses: actions/upload-artifact@v4
      if: always()
      with:
        name: playwright-report-\${{ matrix.shardIndex }}-\${{ matrix.shardTotal }}
        path: playwright-report/
        retention-days: 30
```

## Check-in

By completing this section, you should understand:
*   What sharding is and why it's beneficial for large test suites.
*   How to run a specific shard of your tests locally using the `--shard` command-line option.
*   How to configure your GitHub Actions workflow to run tests in parallel across multiple shards, leading to faster feedback cycles.

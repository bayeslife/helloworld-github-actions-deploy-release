# Hello World GitHub Actions Deploy from Project Actions

This is an example demonstrating how it is possible to achieve deployment actions from activity on a github project board.

The github action workflow `main.yml`  listens for project card changes

```
on:
 project_card:
    types: [moved]
```

The steps which follow derive the card name and the project column.

As a result it is possible to trigger the deployment of a release to some environment if the card represented a release and the column represented a movement.
The product owner for instance could choose to move release 0.5.0 to test simply by moving the card.

![](./images/DeployActions.gif)
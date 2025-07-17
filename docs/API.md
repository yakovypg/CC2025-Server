# API

Our API provides endpoints for managing users and cards. You can try it out in Swagger or with the commands provided in this document.

## Table Of Contents

*    [Overview](#overview)
     *    [Get Cards](#get-cards)
     *    [Get User](#get-user)
     *    [Add User](#add-user)
     *    [Save User Answers](#save-user-answers)
     *    [Get User Statistics](#get-user-statistics)
     *    [Update User Statistics](#update-user-statistics)
     *    [Get User Achievements](#get-user-achievements)
     *    [Update User Achievements](#update-user-achievements)
     *    [Get User Mistakes](#get-user-mistakes)
     *    [Add User Mistakes](#add-user-mistakes)
     *    [Delete User Mistakes](#delete-user-mistakes)

## Overview

We assume that these commands are used during development; therefore, `localhost` is used as the host. However, you can easily change it to suit your deployment environment.

### Get Cards

You can retrieve cards using the following command.

```bash
curl -X GET 'https://localhost:8080/api/card' -k
```

You can pass `cardsCount` and `cardIds` parameters to customize your query.

```bash
curl -X GET 'https://localhost:8080/api/card?cardsCount=3' -k
```

```bash
curl -X GET 'https://localhost:8080/api/card?cardIds=1&cardIds=3&cardIds=5' -k
```

### Get User

You can retrieve a user by their ID using the following command.

```
curl -X GET 'https://localhost:8080/api/user/1' -k
```

### Add User

You can add a user using the following command. You should pass the user's VK identifier in the body of the request.

```bash
curl -X POST 'https://localhost:8080/api/user' -H "Content-Type: application/json" -d '{"id": 1}' -k
```

### Save User Answers

You can save user answers using the following command. You should pass the answers in the body of the request: `cardId` is the identifier of the card, and `isCorrect` indicates whether the answer was correct (0 - incorrect, 1 - correct).

```bash
curl -X POST 'https://localhost:8080/api/user/1/answers' -H "Content-Type: application/json" -d '[{"cardId": 1, "isCorrect": 1}, {"cardId": 3, "isCorrect": 0}, {"cardId": 5, "isCorrect": 1}]' -k
```

### Get User Statistics

You can retrieve user statistics using the following command.

```bash
curl -X GET 'https://localhost:8080/api/user/1/statistics' -k
```

### Update User Statistics

You can update user statistics using the following command. You should pass the statistics fields you wish to update in the body of the request. All supported fields can be found in the `Statistics` interface.

```bash
curl -X PATCH 'https://localhost:8080/api/user/1/statistics' -H "Content-Type: application/json" -d '{"bestSeries": 9, "strikeCounter": 7}' -k
```

### Get User Achievements

You can retrieve user achievements using the following command.

```bash
curl -X GET 'https://localhost:8080/api/user/1/achievements' -k
```

### Update User Achievements

You can update user achievements using the following command. You should pass the achievements you wish to update in the body of the request. All supported achievements can be found in the `Achievements` interface.

```bash
curl -X PATCH 'https://localhost:8080/api/user/1/achievements' -H "Content-Type: application/json" -d '{"veteran": {"currentProgress": 9, "nextLevelProgress": 10, "level": 5, "hasMaxLevel": false}}' -k
```

### Get User Mistakes

You can retrieve user mistakes using the following command.

```bash
curl -X GET 'https://localhost:8080/api/user/1/mistakes' -k
```

### Add User Mistakes

You can add user mistakes using the following command. You should pass the identifiers of the cards in which the user made mistakes in the body of the request.

```bash
curl -X POST 'https://localhost:8080/api/user/1/mistakes' -H "Content-Type: application/json" -d '[1,3,5,6]' -k
```

### Delete User Mistakes

You can delete user mistakes using the following command. You should pass identificators of the cards that the user has corrected in the body of the request.

```bash
curl -X DELETE 'https://localhost:8080/api/user/1/mistakes' -H "Content-Type: application/json" -d '[3,6]' -k
```

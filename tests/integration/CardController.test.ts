jest.mock("../../src/infrastructure/loggers");

const cards: Card[] = [
  { id: 1, frontText: "frontText1", backText: "backText1" },
  { id: 2, frontText: "frontText2", backText: "backText2" },
  { id: 3, frontText: "frontText3", backText: "backText3" },
  { id: 4, frontText: "frontText4", backText: "backText4" },
  { id: 5, frontText: "frontText5", backText: "backText5" }
];

jest.mock("../../src/infrastructure/data/repositories", () => {
  return {
    __esModule: true,
    cardRepository: {
      findAll: jest.fn().mockResolvedValue(cards),
      findById: jest.fn(async (id) => cards.find((c) => c.id === id) ?? null),
      findByIds: jest.fn(async (ids) => cards.filter((c) => ids.includes(c.id)))
    }
  };
});

import express, { Application } from "express";
import StatusCode from "status-code-enum";
import request from "supertest";

import { Card } from "../../src/models";
import { configureApp } from "../../src/utils";

function createApp(): Application {
  const app = express();
  configureApp(app);

  return app;
}

describe("CardController Integration", () => {
  let app: Application;

  beforeAll(() => {
    app = createApp();
  });

  it("GET /api/card - without params should return all cards", async () => {
    const res = await request(app)
      .get("/api/card")
      .expect("Content-Type", /json/)
      .expect(StatusCode.SuccessOK);

    expect(Array.isArray(res.body)).toBe(true);

    const actualCardIds = res.body.map((t: Card) => t.id).sort();
    const expectedCardIds = cards.map((t) => t.id);

    expect(actualCardIds).toEqual(expectedCardIds);
  });

  it("GET /api/card - with cardIds param should return specified cards", async () => {
    const res = await request(app)
      .get("/api/card")
      .query({ cardIds: ["1", "2", "3"] })
      .expect("Content-Type", /json/)
      .expect(StatusCode.SuccessOK);

    expect(Array.isArray(res.body)).toBe(true);

    const actualCardIds = res.body.map((t: Card) => t.id).sort();
    const expectedCardIds = [1, 2, 3];

    expect(actualCardIds).toEqual(expectedCardIds);
  });

  it("GET /api/card - with cardsCount param should return specified number of cards", async () => {
    const res = await request(app)
      .get("/api/card")
      .query({ cardsCount: 2 })
      .expect("Content-Type", /json/)
      .expect(StatusCode.SuccessOK);

    expect(Array.isArray(res.body)).toBe(true);

    const actualCardIds = res.body.map((t: Card) => t.id);
    const expectedCardIdsLength = 2;

    expect(actualCardIds.length).toBe(expectedCardIdsLength);
  });
});

const { expect } = require("chai");
const {
  calculateHoursSinceEvent,
  displayTime,
} = require("../utils/reminder-helper.js");

describe("Reminder helper", () => {
  describe("calculate hours since event", () => {
    it("calculates a duration just under 1h", () => {
      const event = {
        startTime: new Date(new Date() - 1000 * 60 * 59).toISOString(),
      };
      expect(calculateHoursSinceEvent(event)).to.equal(0);
    });

    it("calculates a duration over 1h", () => {
      const event = {
        startTime: new Date(new Date() - 1000 * 60 * 61).toISOString(),
      };
      expect(calculateHoursSinceEvent(event)).to.equal(1);
    });
  });

  describe("display number of hours in a string", () => {
    it("displays a duration less than 1 hour", () => {
      expect(displayTime(0.5)).to.equal("1 hour");
    });
    it("displays a duration less than 1 day", () => {
      expect(displayTime(12)).to.equal("12 hours");
    });
    it("displays a duration 1h longer than 1 day", () => {
      expect(displayTime(25)).to.equal("1 day 1 hour");
    });
    it("displays a duration many hours longer than 1 day", () => {
      expect(displayTime(30)).to.equal("1 day 6 hours");
    });
    it("displays a duration many hours longer than a few days", () => {
      expect(displayTime(80)).to.equal("3 days 8 hours");
    });
  });
});

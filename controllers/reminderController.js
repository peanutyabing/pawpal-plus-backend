const getUserIdFromToken = require("../utils/auth-helper.js");
const { Op } = require("sequelize");
const {
  calculateHoursSinceEvent,
  displayTime,
} = require("../utils/reminder-helper.js");

class ReminderController {
  constructor(eventsModel, petsModel, subcategoriesModel) {
    this.eventsModel = eventsModel;
    this.petsModel = petsModel;
    this.subcategoriesModel = subcategoriesModel;
  }

  getReminders = async (req, res) => {
    const userId = getUserIdFromToken(req);
    const remindableEvents = await this.getRemindableEvents(userId);
    const reminders = this.buildReminders(remindableEvents, userId);
    return res.json(reminders);
  };

  getRemindableEvents = async (userId) => {
    let usersPets;
    try {
      usersPets = await this.petsModel.findAll({
        where: { userId },
        attributes: ["id"],
      });
    } catch (err) {
      console.log(err);
    }
    usersPets = usersPets.map((pet) => pet.dataValues.id);
    try {
      const remindableEvents = await this.eventsModel.findAll({
        where: {
          remindMe: true,
          latest: true,
          petId: { [Op.in]: usersPets },
        },
        order: [["subcategoryId"]],
        include: [
          {
            model: this.subcategoriesModel,
            attributes: ["name", "minHoursLapsed"],
          },
          {
            model: this.petsModel,
            attributes: ["name"],
          },
        ],
      });
      return remindableEvents;
    } catch (err) {
      console.log(err);
    }
  };

  buildReminders = (events, userId) => {
    const reminders = [];
    for (const event of events) {
      const hoursSince = calculateHoursSinceEvent(event);
      if (hoursSince >= event.subcategory.minHoursLapsed) {
        reminders.push({
          userId: parseInt(userId),
          petId: event.petId,
          eventId: event.id,
          content: `Reminder: it has been ${displayTime(hoursSince)} since ${
            event.pet.name
          }'s last ${event.subcategory.name.toLowerCase()}`,
          showReminder: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    }
    return reminders;
  };
}

module.exports = ReminderController;

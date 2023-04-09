import { NextFunction, Request, Response } from "express";
const { Op } = require('sequelize');
const Ajv = require("ajv");
var Analytics = require('../models/analytics');
const moment = require('moment');

const eventSchema = {
   type: "object",
   properties: {
      type: { type: "string" },
      user: { type: "number" },
   },
   required: ["type", "user"],
   additionalProperties: false
}

const validateArray = {
   type: "array",
}

const ajv = new Ajv();

const postAnalytics = async (req: Request, res: Response, next: NextFunction) => {
   try {

      const eventList = req.body;

      const isArray = ajv.validate(validateArray, eventList);

      if (!isArray) {
         return res.status(400).json({ error: ajv.errors });
      }

      let totalIngested = 0;
      for (const event of eventList) {
         const isValidEvent = ajv.validate(eventSchema, event);

         if (!isValidEvent) {
            console.log("invalid event", event);
            continue;
         }

         const newEvent = {
            ...event,
            date: new Date(),
         }

         const findEventsInWindow = await Analytics.findOne({
            where: {
               user: newEvent.user,
               date: {
                  [Op.gte]: moment().subtract(newEvent.eventType === 'event1' ? 10 : 30, 'seconds').toDate(),
               }
            },
         })

         if (!findEventsInWindow) {
            const ingested = await Analytics.create(newEvent);
            if (ingested) {
               totalIngested++;
            }
         } else {
            console.log("Not ingested", newEvent);
         }
      };

      res.json({ totalIngested });
   } catch (e) {
      next(e)
   }
}

const getAnalytics = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const total = await Analytics.findAll();
      res.json(total);
   } catch (e) {
      next(e)
   }
}


module.exports = {
   postAnalytics,
   getAnalytics
};

import express, { NextFunction, Request, Response } from "express";
var router = express.Router();

router.get('/', function (_req: Request, res: Response, _next: NextFunction) {
   res.render("layout");
});

module.exports = router;
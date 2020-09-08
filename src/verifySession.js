import express, { request, response } from "express";

const admin = (request, response, next) => {
  try {
    let userId = request.session.userId;
    if (userId == null || (userId == "undefined" && userId != 1)) {
      return response.status(403).redirect("/");
    }
    next();
  } catch (err) {
    console.error(err);
    return response.status(403).send({ message: err.message });
  }
};

const user = (request, response, next) => {
  try {
    let userId = request.session.userId;
    if (userId == null || (userId == "undefined" && userId != 0)) {
      return response.status(403).redirect("/");
    }
    next();
  } catch (err) {
    console.error(err);
    return response.status(403).send({ message: err.message });
  }
};

export { admin, user };

import express, { request, response } from "express";

const admin = (request, response, next) => {
  try {
    let userId = request.session.userId;
    if (userId == null || userId == "undefined") {
      return response.status(403).redirect("/");
    }
    if (userId == 1) {
      next();
    } else if (userId == 0) {
      return response.status(403).redirect("/mainpage");
    }
  } catch (err) {
    console.error(err);
    return response.status(403).send({ message: err.message });
  }
};

const user = (request, response, next) => {
  try {
    let userId = request.session.userId;
    if (userId == null || userId == "undefined") {
      return response.status(403).redirect("/");
    }
    if (userId == 0) {
      next();
    } else if (userId == 1) {
      return response.status(403).redirect("/admin/mainpage");
    }
  } catch (err) {
    console.error(err);
    return response.status(403).send({ message: err.message });
  }
};

export { admin, user };

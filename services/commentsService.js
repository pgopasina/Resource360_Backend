const commentsSchema = require("../models/commentsModel");

const upsertComments = async (req, res) => {
  try {
    const {
      id,
      senderName,
      date,
      statusSlot,
      comments,
      commentTime,
      receiverName,
    } = req.body;

    if (
      !senderName ||
      !date ||
      !statusSlot ||
      !comments ||
      !commentTime ||
      !receiverName
    ) {
      return res.status(400).json({
        message: "Please provide All required fields",
      });
    }
    const [comment, commentCreated] = await commentsSchema.upsert({
      id: id || undefined,
      senderName: senderName ? senderName : "",
      date: date ? date : "",
      statusSlot: statusSlot ? statusSlot : "",
      comments: comments ? comments : "",
      commentTime: commentTime ? commentTime : "",
      receiverName: receiverName ? receiverName : "",
    });

    if (commentCreated) {
      res.status(201).json({
        message: "Your Comments is Saved",
        Comments: comment,
      });
    } else {
      res.status(200).json({
        message: "Your Comments is Updated",
        Comments: comment,
      });
    }
  } catch (error) {
    console.error("Error while upserting comments:", error);
    res.status(500).send({
      message: "Unable to save your Comments",
      error: error.message || "Internal Server Error",
    });
  }
};

const fetchAllStatus = async (req, res) => {
  try {
    // const { senderName, date, statusSlot } = req.body;

    // Validate required fields
    if (!req.params.date) {
      return res.status(400).json({
        message: "Please provide Date",
      });
    }
    // if (!senderName || !date || !statusSlot) {
    //   return res.status(400).json({
    //     message: "Please provide all required fields",
    //   });
    // }

    // Fetch all comments matching the criteria
    const allComments = await commentsSchema.findAll({
      where: {
        date: req.params.date,
      },
    });
    // const allComments = await commentsSchema.findAll({
    //     where: {
    //       senderName: senderName,
    //       date: date,
    //       statusSlot: statusSlot,
    //     },
    //   });

    // Check if no comments are found
    if (allComments.length === 0) {
      return res.status(200).send({
        message: "No comments found for the provided criteria",
      });
    }

    // Return all comments
    const response = allComments.map((comment) => ({
      id: comment.id ? comment.id : "",
      senderName: comment.senderName ? comment.senderName : "",
      date: comment.date ? comment.date : "",
      statusSlot: comment.statusSlot ? comment.statusSlot : "",
      comments: comment.comments ? comment.comments : "",
      commentTime: comment.commentTime ? comment.commentTime : "",
      receiverName: comment.receiverName ? comment.receiverName : "",
    }));

    res.status(200).json(response);
  } catch (error) {
    console.error("Error while fetching comments:", error);
    res.status(500).send({
      message: "Unable to fetch comments",
      error: error.message || "Internal Server Error",
    });
  }
};

module.exports = { upsertComments, fetchAllStatus };

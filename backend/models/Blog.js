import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    content: {
      type: String,
      required: true,
    },
    excerpt: {
      type: String,
      maxlength: 500,
    },
    author: {
      type: String,
      required: true,
      default: "Admin",
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt
  },
);
// // Index for better query performance
blogSchema.index({ createdAt: -1 });
blogSchema.index({ published: 1 });
blogSchema.index({ tags: 1 });
// Virtual for formatted creation date
blogSchema.virtual("formattedDate").get(function () {
  return this.createdAt.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
});

// Ensure virtual fields are serialized
blogSchema.set("toJSON", {
  virtuals: true,
});
// Pre-save middleware to update the updatedAt field
blogSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model("Blog", blogSchema);
